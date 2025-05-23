import { dbClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function customersAPI(req, res) {
  const { client, db } = await dbClient();
  const collection = db.collection("customers_marketing");

  if (req.method == "POST") {
    try {
      const lastDocument = await collection.findOne({}, { sort: { customerId: -1 } });
      const result = await collection.insertOne({ ...req.body});
      res.status(200).json({ status: 200, data: result });

      await client.close();
    } catch (error) {
      res.status(500).json({ status: false, data: {} });
    }
  } else if (req.method == "GET") {
    if (req?.query?.id) {
      const objectId = new ObjectId(req?.query?.id);
      let response = await collection.findOne({ _id: objectId });
      res.status(200).json(response);
    } else {
      const { page, limit, type } = req.query;
      const filter = req.query?.filter || {};
      const sort = {
        deliveryDate: 1,
      };
      const search = req?.query?.search || "";
      const regexPattern = new RegExp(search, "i");
      // const searchQuery = { customerName: { $regex: search, $options: 'i' } };

      const searchQuery = {
        $and: [
          {
            $or: [
              { customerId: { $regex: search, $options: 'i' } },
              { shipmentBy: { $regex: search, $options: 'i' } },
              { customerName: { $regex: search, $options: 'i' } },
              { customerPhone: { $regex: search, $options: 'i' } },
              { weChatId: { $regex: search, $options: 'i' } },
            ],
          },
        ],
      };

      const options = {
        skip: limit, // calculate the number of documents to skip based on the page and limit
        limit: parseInt(limit),
        sort: sort,
      };

      const totalDocuments = await collection.countDocuments(searchQuery);
      const documents = await collection.find(searchQuery, options).toArray();

      const response = {
        data: documents,
        total: totalDocuments,
        currentPage: page,
        limit: limit,
        totalPages: Math.ceil(totalDocuments / limit),
      };
      res.status(200).json(response);
    }
  } else if (req.method == "PATCH") {
    try {
      let data;
      const objectId = new ObjectId(req?.body?.id);
      data = await collection.updateOne(
        { _id: objectId }, // Filter criteria to find the document
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
      const objectId = new ObjectId(req?.query?.id);
      data = await collection.deleteOne({ customerId: req?.query?.customerId });
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
