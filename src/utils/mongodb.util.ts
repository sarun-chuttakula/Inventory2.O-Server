import { mongoClient, mongoConfig } from "../configs";
import logger from "./logger.util";

// Connect to MongoDB
mongoClient.connect().catch((error) => {
  logger.exception("Error connecting to MongoDB", String(error));
});

// Function to retrieve data from the cache
export const getFromCache = async (key: string) => {
  try {
    const database = mongoClient.db(mongoConfig.dbName);
    const cacheCollection = database.collection(mongoConfig.collectionName);
    const cachedData = await cacheCollection.findOne({ key });
    return cachedData ? cachedData.value : null;
  } catch (error) {
    logger.exception("Error retrieving from cache", String(error));
    return null;
  }
};

// Function to store data into the cache
export const storeIntoCache = async (
  key: string,
  value: any,
  expiresAt = Number(mongoConfig.expiresAt) * 1000
) => {
  try {
    const database = mongoClient.db(mongoConfig.dbName);
    const cacheCollection = database.collection(mongoConfig.collectionName);
    await cacheCollection.updateOne(
      { key },
      { $set: { key, value, expiresAt } },
      { upsert: true }
    );
  } catch (error) {
    logger.exception("Error storing into cache", String(error));
  }
};

// Function to remove data from the cache
export const removeFromCache = async (key: string) => {
  try {
    const database = mongoClient.db(mongoConfig.dbName);
    const cacheCollection = database.collection(mongoConfig.collectionName);
    await cacheCollection.deleteOne({ key });
  } catch (error) {
    logger.exception("Error removing from cache", String(error));
  }
};

// Function to flush the entire cache (clear all cached data)
export const flushCache = async () => {
  try {
    const database = mongoClient.db(mongoConfig.dbName);
    const cacheCollection = database.collection(mongoConfig.collectionName);
    await cacheCollection.deleteMany({});
  } catch (error) {
    logger.exception("Error flushing cache", String(error));
  }
};
