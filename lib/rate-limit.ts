import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const isConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const limiter = isConfigured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "cozmobot:contact",
    })
  : null;

let warned = false;

/**
 * Allows at most five contact sends per IP per hour.
 *
 * Fails open. A contact form that drops real leads because Redis blipped is
 * worse than one that lets a spammer through, so every failure path here —
 * unconfigured, unknown IP, Redis unreachable — returns true.
 */
export async function allowContactSend(ip: string | null): Promise<boolean> {
  if (!limiter) {
    if (!warned) {
      warned = true;
      console.warn(
        "[contact] UPSTASH_REDIS_REST_URL/TOKEN unset — contact form is not rate limited.",
      );
    }
    return true;
  }

  if (!ip) return true;

  try {
    const { success } = await limiter.limit(ip);
    return success;
  } catch (error) {
    console.error("[contact] rate limiter unreachable, allowing request", error);
    return true;
  }
}
