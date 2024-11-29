import { notFound, redirect } from 'next/navigation';
import { openDb } from '../db';

export default async function Short({ params }: { params: { short: string } }) {
  const db = await openDb();

  const short = params.short;

  const result = await db.get("SELECT url FROM urls WHERE short = ?", [short]);
  const url = result?.url;

  if (url) return redirect(url);
  
  notFound();
}