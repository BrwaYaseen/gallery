import type {IRateLimiterOptions} from 'rate-limiter-flexible';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiterConfig: IRateLimiterOptions = {
  points: 10, // Number of Upload requests
  duration: 60, // Per 60 seconds
};

export const rateLimiter = new RateLimiterMemory(rateLimiterConfig);