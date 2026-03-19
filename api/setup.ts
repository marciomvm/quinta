import { neon } from '@neondatabase/serverless';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const sql = neon(process.env.DATABASE_URL!);

  try {
    // Create products table
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

    // Populate seeds if empty
    const productCountResult = await sql`SELECT count(*) FROM products`;
    const count = parseInt(productCountResult[0].count);

    if (count === 0) {
      const seedProducts = [
        { id: '1', name: 'Stihl 235 Strimmer', desc: { en: 'Powerful strimmer...', pt: 'Roçadora potente...' }, price: { day1: '35€', following: '30€/day', deposit: '150€' }, imageUrl: '' },
        { id: '2', name: 'Stihl MH600 Rotavator', desc: { en: 'Heavy-duty rotavator...', pt: 'Motoenxada resistente...' }, price: { day1: '50€', following: '45€/day', deposit: '200€' }, imageUrl: '' },
        { id: '3', name: 'Stihl RE90 Pressure Washer', desc: { en: '1,800 PSI pressure washer...', pt: 'Lavadora de alta pressão...' }, price: { day1: '25€', following: '20€/day', deposit: '50€' }, imageUrl: '' },
        { id: '4', name: 'Cement Mixer 150L', desc: { en: 'Electric 150-litre cement mixer...', pt: 'Betoneira eléctrica...' }, price: { day1: '40€', following: '35€/day', deposit: '100€' }, imageUrl: '' },
        { id: '5', name: 'DeWalt SDS Max Hammer Drill/Breaker', desc: { en: 'Combined hammer drill...', pt: 'Martelo perfurador...' }, price: { day1: '50€', following: '45€/day', deposit: '300€' }, imageUrl: '' },
        { id: '6', name: 'DeWalt 230mm Disc Grinder', desc: { en: 'Large disc grinder...', pt: 'Rebarbadora de disco grande...' }, price: { day1: '20€', following: '15€/day', deposit: '30€' }, imageUrl: '' },
        { id: '7', name: 'Stanley 2900W 7HP Petrol Generator', desc: { en: 'Single-phase petrol generator...', pt: 'Gerador a gasolina monofásico...' }, price: { day1: '40€', following: '35€/day', deposit: '100€' }, imageUrl: '' },
        { id: '8', name: '90KG Whacker Plate/Compactor', desc: { en: 'Petrol-powered plate compactor...', pt: 'Placa compactadora a gasolina...' }, price: { day1: '50€', following: '45€/day', deposit: '300€' }, imageUrl: '' },
        { id: '9', name: 'SDS Max Breaker Chisel Set', desc: { en: 'Set of 5 chisel tips...', pt: 'Conjunto de 5 ponteiras...' }, price: { day1: '10€/day', following: '—', deposit: '—' }, imageUrl: '' },
      ];

      for (const p of seedProducts) {
        await sql`INSERT INTO products (id, data) VALUES (${p.id}, ${JSON.stringify(p)}::jsonb)`;
      }
    }

    return res.status(200).json({ message: 'Neon Database tables initialized and seeded successfully' });
  } catch (error) {
    console.error('Database setup failed:', error);
    return res.status(500).json({ error: 'Database setup failed', details: (error as Error).message });
  }
}
