import { dbClient } from "@/lib/mongodb";
import { sumBy } from "lodash";
import { ObjectId } from "mongodb";

export default async function newShipmentBill(req, res) {
  const { client, db } = await dbClient();
  const collection = db.collection("customer_bill");
  const shipmentCollection = db.collection("shipments_info");
  const shipmentInfo = {
    year: `${new Date().getFullYear()}`,
    month: req.body.month,
    shipmentNo: req.body.shipmentNo,
    shipmentBy: req.body.shipmentBy?.toLowerCase(),
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
    if (req?.query?.customerId) {
      // const objectId = new ObjectId(req?.query?.id);
      let response = await collection.findOne({
        customerId: req?.query?.customerId,
        balance: { $exists: true, $ne: 0 },
      });

      const aggregationResult = await collection
        .aggregate([
          {
            $match: {
              // Your condition here
              customerId: req?.query?.customerId,
              // shipmentNo: new RegExp("^" + shipmentNo + "$", "i"),
              // year: new RegExp("^" + year + "$", "i")
            },
          },
          {
            $group: {
              _id: null,
              totalKg: { $sum: { $toDouble: "$totalKg" } },
              totalCtn: { $sum: { $toDouble: "$totalCtn" } },
              totalAmount: { $sum: { $toDouble: "$totalAmount" } },
              totalBalance: { $sum: { $toDouble: "$balance" } },
            },
          },
        ])
        .toArray();

      res.status(200).json({ res: {...response}, ...aggregationResult[0] });
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
            balance: { $exists: true, $ne: 0 },
          },
          {
            customerId: { $exists: true },
          },
          {
            $or: [
              { invoiceNumber: regexPattern },
              { shipmentBy: regexPattern },
              { shipmentNo: regexPattern },
              { deliveryDate: regexPattern },
              { customerName: regexPattern },
              { customerPhone: regexPattern },
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
      // const aggregationResult = await collection
      //   .aggregate([
      //     {
      //       $match: {
      //         // Your condition here
      //         //   shipmentBy: new RegExp(type, "i"),
      //         //   shipmentNo: new RegExp("^" + shipmentNo + "$", "i"),
      //         //   year: new RegExp("^" + year + "$", "i"),
      //         due: { $exists: true },
      //       },
      //     },
      //     //   {
      //     //     $group: {
      //     //       _id: null,
      //     //       totalKg: { $sum: { $toDouble: "$totalKg" } },
      //     //       totalCtn: { $sum: { $toDouble: "$totalCtn" } },
      //     //       totalAmount: { $sum: { $toDouble: "$totalAmount" } },
      //     //     },
      //     //   },
      //   ])
      //   .toArray();

      //     const updatedDocuments = documents.map((document) => {
      //       return {
      //         ...document,
      //         totalAmount: sumBy(document.data, (item) => Number(item.totalAmount)),
      //       };
      //     });

      //     const bulkOperations = updatedDocuments.map(document => ({
      //       updateOne: {
      //         filter: { _id: document._id },
      //         update: { $set: document }
      //       }
      //     }));
      // console.log("bulkOperations", bulkOperations);
      // // Perform the bulk update
      // const updateResults = await collection.bulkWrite(bulkOperations);
      const response = {
        data: documents,
        total: totalDocuments,
        currentPage: page,
        limit: limit,
        totalPages: Math.ceil(totalDocuments / limit),
        // aggregationResult: aggregationResult[0],
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

// export const shipmentData = async (shipmentCollection, data) => {
//   console.log("data", shipmentCollection, data);
//   let result = await shipmentCollection.insertOne({
//     year: new Date().getFullYear(),
//     ...data
//   });
//   console.log("res", result);
//   return result;
// };
