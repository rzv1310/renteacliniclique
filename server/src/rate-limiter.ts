import type { RateLimitConfig, RateLimitsResponse } from "./types.js";

export const createRateLimiter = (limits: RateLimitConfig) => {
  const requestsByIp = new Map<string, number[]>();

  const getRateSnapshot = (ip: string): RateLimitsResponse => {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const oneHourAgo = now - 60 * 60 * 1000;
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    const allTimestamps = requestsByIp.get(ip) || [];
    const recentDay = allTimestamps.filter((timestamp) => timestamp >= oneDayAgo);
    requestsByIp.set(ip, recentDay);

    const minuteUsed = recentDay.filter((timestamp) => timestamp >= oneMinuteAgo).length;
    const hourUsed = recentDay.filter((timestamp) => timestamp >= oneHourAgo).length;
    const dayUsed = recentDay.length;

    const minuteRemaining = Math.max(0, limits.perMinute - minuteUsed);
    const hourRemaining = Math.max(0, limits.perHour - hourUsed);
    const dayRemaining = Math.max(0, limits.perDay - dayUsed);

    let limitType: RateLimitsResponse["limitType"] = null;
    if (minuteRemaining === 0) limitType = "minute";
    else if (hourRemaining === 0) limitType = "hour";
    else if (dayRemaining === 0) limitType = "day";

    return {
      limits: {
        minute: { used: minuteUsed, limit: limits.perMinute, remaining: minuteRemaining },
        hour: { used: hourUsed, limit: limits.perHour, remaining: hourRemaining },
        day: { used: dayUsed, limit: limits.perDay, remaining: dayRemaining },
      },
      canGenerate: minuteRemaining > 0 && hourRemaining > 0 && dayRemaining > 0,
      limitType,
    };
  };

  const recordRequest = (ip: string) => {
    const existing = requestsByIp.get(ip) || [];
    existing.push(Date.now());
    requestsByIp.set(ip, existing);
  };

  return { getRateSnapshot, recordRequest };
};
