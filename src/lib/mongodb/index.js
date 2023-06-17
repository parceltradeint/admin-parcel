const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://techparcelexportimport:tech.parcelexportImport2023@parcel.nvpz5um.mongodb.net/?retryWrites=true&w=majority";

export async function dbClient() {
  try {
    // Connection URL
    const url = uri;

    // Database Name
    const dbName = 'parcelDB';

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected to MongoDB server');

    // Access the database
    const db = client.db(dbName);

    // Return the client and database objects
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}