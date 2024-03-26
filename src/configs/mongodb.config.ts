import { MongoClient } from "mongodb";

export const mongoConfig = {
  expiresAt: process.env.MONGODB_EXPIRY_TIME,
  url: process.env.MONGODB_URL || "",
  dbName: process.env.MONGODB_DB_NAME || "",
  collectionName: "tokens",
};
const uri = `mongodb://localhost:27017/Inventory`;

export const mongoClient = new MongoClient(
  `${uri}`
  //   {
  //   useNewUrlParser: true, // Make sure to include the options if needed
  //   useUnifiedTopology: true,
  // }
);

(async () => {
  try {
    await mongoClient.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
