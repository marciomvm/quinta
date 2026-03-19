import { neon } from '@neondatabase/serverless';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);

    // Create products table (using JSONB to store the complex TS interfaces without multiple relations)
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        data JSONB NOT NULL
      )
    `;

    // Create settings table
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        key VARCHAR(255) PRIMARY KEY,
        value JSONB NOT NULL
      )
    `;

    return res.status(200).json({ message: 'Neon Database tables initialized successfully' });
  } catch (error) {
    console.error('Database setup failed:', error);
    return res.status(500).json({ error: 'Database setup failed', details: (error as Error).message });
  }
}
