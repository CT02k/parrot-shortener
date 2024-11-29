import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function setUrl(short: string, url: string) {
  await redis.set(short, url, {
    nx: true,
  });
}

export async function getUrl(short: string) {
  return await redis.get(short);
}