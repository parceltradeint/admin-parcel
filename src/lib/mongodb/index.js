const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://parceltradeint:RKRmfdS6GyC4GIx4@parcel.xdjxbov.mongodb.net/?retryWrites=true&w=majority";

export async function dbClient() {
  try {
    // Connection URL
    const url = uri;

    // Database Name
    const dbName = "parcelDB";

    // Create a new MongoClient
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected to MongoDB server");

    // Access the database
    const db = client.db(dbName);

    // Return the client and database objects
    return { client, db };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
