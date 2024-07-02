// import type { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     res.status(200).json({ message: 'GET request' });
//   } else if (req.method === 'POST') {
//     // Implement POST request to json-server
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  const res = await fetch("http://localhost:3001/students");
  const data = await res.json();
  return Response.json({ data });
}

// post, update, delete