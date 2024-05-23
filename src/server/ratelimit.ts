// rateLimiter.ts
import type {IRateLimiterOptions} from 'rate-limiter-flexible';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Define the rate limiter configuration with proper types
const rateLimiterConfig: IRateLimiterOptions = {
  points: 2, // Number of requests
  duration: 60, // Per 60 seconds
};

// Create a typed RateLimiterMemory instance
export const rateLimiter = new RateLimiterMemory(rateLimiterConfig);