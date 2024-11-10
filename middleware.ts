import { NextResponse } from 'next/server';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'DELETE'],
  origin: 'https://niicodev.vercel.app',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function runCors(req: any, res: any) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });
}

export async function middleware(req: Request) {
  const res = NextResponse.next();

  if (req.url.startsWith('https://tu-dominio.com/api')) {
    await runCors(req, res);
  }

  return res;
}
