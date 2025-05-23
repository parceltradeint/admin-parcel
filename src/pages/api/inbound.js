import { dbClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function newShipmentBill(req, res) {
  const { client, db } = await dbClient();
  const collection = db.collection("inbound_bill");
  const shipmentCollection = db.collection("shipments_info");
  const shipmentInfo = {
    year: `${new Date().getFullYear()}`,
    month: req.body.month,
    shipmentNo: req.body.shipmentNo,
    shipmentBy: req.body.shipmentBy,
    type: req.body.type,
  };

  if (req.method == "POST") {
    try {
      const result = await collection.insertOne({ ...req.body });
      // shipmentData(shipmentCollection, { ...shipmentInfo });
      const shipmentInfoData = await shipmentCollection.insertOne({
        ...shipmentInfo,
      });
      res
        .status(200)
        .json({ status: 200, data: { ...result, ...shipmentInfoData } });
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
      const { page, limit, type, shipmentNo, month, year } = req.query;
      const filter = req.query?.filter || {};
      const sort = {
        deliveryDate: -1,
      };
      const search = req?.query?.search || "";
      const regexPattern = new RegExp(search, "i");

      const searchQuery = {
        $and: [
          {
            shipmentNo: new RegExp("^" + shipmentNo + "$", "i"),
          },
          {
            shipmentBy: new RegExp(type, "i"),
          },
          {
            month: new RegExp(month, "i"),
          },
          {
            year: new RegExp("^" + year + "$", "i"),
          },
          {
            $or: [
              { invoiceNumber: regexPattern },
              { shipmentBy: regexPattern },
              { shipmentNo: regexPattern },
              { deliveryDate: regexPattern },
              { customerName: regexPattern },
              { phoneNumber: regexPattern },
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

      const aggregationResult = await collection
        .aggregate([
          {
            $match: {
              // Your condition here
              shipmentBy: new RegExp(type, "i"),
              shipmentNo: new RegExp(shipmentNo, "i"),
            },
          },
          {
            $group: {
              _id: null,
              totalKg: { $sum: { $toDouble: "$totalKg" } },
              totalCtn: { $sum: { $toDouble: "$totalCtn" } },
              totalAmount: { $sum: { $toDouble: "$totalAmount" } }
            },
          },
        ])
        .toArray();

      const response = {
        data: documents,
        total: totalDocuments,
        currentPage: page,
        limit: limit,
        totalPages: Math.ceil(totalDocuments / limit),
        aggregationResult: aggregationResult[0],
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
      // console.log("res Data", data);
      // const objectId = new ObjectId(req?.body?.id);
      // shipmentData(shipmentCollection);
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
      data = await collection.deleteOne({ _id: objectId });
      // console.log("res Data", data);
      await client.close();
      res.status(200).json(data.deletedCount);
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ status: false, data: {} });
    }
  }
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
    const collection = db.collection("shipment_bill");

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
