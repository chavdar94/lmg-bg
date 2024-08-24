"use server";

import { redisExpire } from "./constants";
import { redis } from "./redis";

export const getOrSetCache = async <T,>(
  key: string,
  cb: () => Promise<T>
): Promise<T> => {
  try {
    // Try to get the data from Redis
    const cachedData = await redis.get(key);

    if (cachedData !== null) {
      // If data is found in cache, return it
      return JSON.parse(cachedData) as T;
    }

    // If data is not found, get it from the callback
    const freshData = await cb();

    // Set the data in Redis with expiration time
    await redis.setex(key, redisExpire, JSON.stringify(freshData));

    return freshData;
  } catch (error) {
    console.error("Error in getOrSetCache:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};
