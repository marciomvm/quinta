import { neon } from '@neondatabase/serverless';
import { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sql = neon(process.env.DATABASE_URL!);

  // Disable caching for serverless functions
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  try {
    if (req.method === 'GET') {
      const rows = await sql`SELECT data FROM products`;
      console.log(`[API/Products] GET returned ${rows.length} products`);
      const products = rows.map((row: any) => row.data);
      return res.status(200).json(products);
    }
    
    if (req.method === 'POST' || req.method === 'PUT') {
      const product = req.body;
      if (!product || !product.id) return res.status(400).json({ error: 'Invalid product' });
      
      const payloadSize = JSON.stringify(product).length;
      console.log(`[API/Products] UPSERT call for ID: ${product.id}. Payload size: ${payloadSize} chars`);
      
      try {
        const result = await sql`
          INSERT INTO products (id, data) 
          VALUES (${product.id}, ${product}::jsonb)
          ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data
          RETURNING data
        `;
        const savedProduct = result[0].data;
        console.log(`[API/Products] UPSERT success for ID: ${product.id}. Stored image length: ${savedProduct.imageUrl?.length || 0}`);
        return res.status(req.method === 'POST' ? 201 : 200).json(savedProduct);
      } catch (sqlError) {
        console.error(`[API/Products] SQL Error during UPSERT:`, sqlError);
        return res.status(500).json({ 
          error: 'Database error', 
          details: (sqlError as Error).message 
        });
      }
    }
    
    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid ID' });
      await sql`DELETE FROM products WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Products API Error:', error);
    return res.status(500).json({ error: 'Database error', details: (error as Error).message });
  }
}
