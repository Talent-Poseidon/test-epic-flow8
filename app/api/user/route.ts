import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '../../../lib/supabase/client';

const supabase = createClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('name, email')
    .eq('id', req.query.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json(data[0]);
}
