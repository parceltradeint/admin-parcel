import { dbClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function shipmentInfo(req, res) {
  const { client, db } = await dbClient();
  const { year, month, shipmentBy, type } = req.query;
  const shipmentCollection = db.collection(`${type==="customer"? "outbound_bill" : "inbound_bill"}`);

  const sort = {
    deliveryDate: -1,
  };
  const search = req?.query?.search || "";
  const regexPattern = new RegExp(search, "i");

  const searchQuery = {
    $and: [
      {
        type: new RegExp(`^${type}$`, "i"),
      },
      {
        // year: new RegExp(year, "i"),
        year: new RegExp(`^${year}$`, "i"),
        // { $regex: new RegExp(`^${year}$`, "i") },
      },
      {
        // month: new RegExp(`^${month}$`, 'i'),
        month: new RegExp(`^${month}$`, "i"),
        // { $regex: new RegExp(`^${month}$`, "i") },
      },
      {
        // shipmentBy: new RegExp(`^${shipmentBy}$`, 'i')
        shipmentBy: new RegExp(`^${shipmentBy}$`, "i"),
        // { $regex: new RegExp(`^${shipmentBy}$`, "i") },
      },
    ],
  };

  //   const options = {
  //     skip: limit,
  //     limit: parseInt(limit),
  //     sort: sort,
  //   };

  const totalDocuments = await shipmentCollection.countDocuments(searchQuery);
  const documents = await shipmentCollection.find(searchQuery).toArray();
  //   const updateCondition = { shipmentBy: 'Air' };
  //   const updateOperation = {
  //     $set: { type: 'customer' }
  //     // You can include other update operators here
  //   };

  //   // Update multiple documents that match the condition
  //   const result = await shipmentCollection.updateMany(updateCondition, updateOperation);
  // console.log("res", result);

  const response = {
    data: documents,
    total: totalDocuments,
    // currentPage: page,
    // limit: limit,
    // totalPages: Math.ceil(totalDocuments / limit),
  };
  res.status(200).json({ ...response });
}
