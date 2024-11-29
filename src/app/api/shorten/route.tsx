import { setUrl } from "../../db";

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return new Response(JSON.stringify({ error: "No URL" }), { status: 400 });
  }

  const short = Math.random().toString(36).slice(2);

  await setUrl(short, url);

  return new Response(JSON.stringify({ short }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}