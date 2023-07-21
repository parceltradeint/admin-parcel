import { dbClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function shipmentInfo(req, res) {
  const { client, db } = await dbClient();
  const shipmentCollection = db.collection("shipments_info");

  const { year, month, shipmentBy } = req.query;

  const sort = {
    deliveryDate: -1,
  };
  const search = req?.query?.search || "";
  const regexPattern = new RegExp(search, "i");

  const searchQuery = {
    $and: [
      {
        year: new RegExp(year, "i"),
      },
      {
        month: new RegExp(month, "i"),
      },
      {
        shipmentBy: new RegExp(shipmentBy, "i"),
      }
    ],
  };

  //   const options = {
  //     skip: limit,
  //     limit: parseInt(limit),
  //     sort: sort,
  //   };

  const totalDocuments = await shipmentCollection.countDocuments(searchQuery);
  const documents = await shipmentCollection.find(searchQuery).toArray();

  const response = {
    data: documents,
    total: totalDocuments,
    // currentPage: page,
    // limit: limit,
    // totalPages: Math.ceil(totalDocuments / limit),
  };
  res.status(200).json({ ...response });
}
