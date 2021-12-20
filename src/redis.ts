import Redis from "ioredis";
const redis = new Redis(); // uses defaults unless given configuration object

export { redis };
