import { dbClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function usersAPI(req, res) {
  const { client, db } = await dbClient();
  const collection = db.collection("users");

  if (req.method == "POST") {
    try {
      const lastDocument = await collection.findOne(
        {},
        { sort: { customerId: -1 } }
      );
      const result = await collection.insertOne({ ...req.body });
      res.status(200).json({ status: 200, data: result });

      await client.close();
    } catch (error) {
      res.status(500).json({ status: false, data: {} });
    }
  } else if (req.method == "GET") {
    if (req?.query?.uid) {
      const uid = req?.query?.uid;
      let response = await collection.findOne({ uid: uid });
      res.status(200).json(response);
    }
  } else if (req.method == "PATCH") {
    try {
      let data;
      const uid = req?.query?.uid;
      data = await collection.updateOne(
        { uid: uid }, // Filter criteria to find the document
        { $set: req.body.data } // Fields to update
      );

      await client.close();
      res.status(200).json(data);
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ status: false, data: {} });
    }
  } else if (req.method == "DELETE") {
    try {
      let data;
      const uid = req?.query?.uid;
      data = await collection.deleteOne({ uid: uid });
      await client.close();
      res.status(200).json(data.deletedCount);
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ status: false, data: {} });
    }
  }
  // Close the MongoDB client connection when done
}

// const { dbClient } = require("@/lib/mongodb");

export async function getFilteredAndPaginatedData(
  filter,
  pageNumber,
  pageSize,
  sortOptions
) {
  const { client, db } = await dbClient();
  try {
    await client.connect();
    const collection = db.collection("customers");

    const query = filter || {}; // Set the filter query, or an empty object for no filter

    // Count the total number of documents matching the filter
    const totalDocuments = await collection.countDocuments(query);

    // Calculate the skip value based on the page number and page size
    const skip = (pageNumber - 1) * pageSize;

    // Set the sort options
    const sort = sortOptions || {}; // Set the sort options, or an empty object for no sorting

    // Find the documents matching the filter, apply pagination and sorting
    const documents = await collection
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(pageSize)
      .toArray();

    return {
      data: documents,
      total: totalDocuments,
      currentPage: pageNumber,
      pageSize: pageSize,
      totalPages: Math.ceil(totalDocuments / pageSize),
    };
  } finally {
    await client.close();
  }
}
