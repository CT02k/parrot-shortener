import { notFound, redirect } from "next/navigation";
import { getUrl } from "../db";

export default async function Short({ params }: { params: Promise<{ short: string }> }) {
  const short = (await params).short;
  const url = await getUrl(short);

  if (url && typeof url === "string") return redirect(url);

  notFound();
}