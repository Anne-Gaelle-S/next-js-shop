import { NextApiHandler } from 'next';

const handleLogin: NextApiHandler = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end(); // Method not allowed
    return;
  }
  console.log('req.body:', req.body);
  res.status(200).json({});
};

export default handleLogin;