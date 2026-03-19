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

  try {
    if (req.method === 'GET') {
      const rows = await sql`SELECT value FROM settings WHERE key = 'aboutImages'`;
      if (rows.length > 0) {
        return res.status(200).json(rows[0].value);
      }
      return res.status(200).json(['', '', '', '']);
    }
    
    if (req.method === 'PUT') {
      const aboutImages = req.body;
      if (!Array.isArray(aboutImages)) return res.status(400).json({ error: 'Invalid payload' });
      
      // Upsert
      await sql`
        INSERT INTO settings (key, value) 
        VALUES ('aboutImages', ${JSON.stringify(aboutImages)}::jsonb)
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `;
      return res.status(200).json(aboutImages);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('Settings API Error:', error);
    return res.status(500).json({ error: 'Database error', details: (error as Error).message });
  }
}
