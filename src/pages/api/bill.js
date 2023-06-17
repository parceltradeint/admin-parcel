import { dbClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function newShipmentBill(req, res) {
  const { client, db } = await dbClient();
  const collection = db.collection("shipment_bill");

  if (req.method == "POST") {
    try {
      const result = await collection.insertOne({ ...req.body });
      res.status(200).json({ status: 200, data: result });
      await client.close();
    } catch (error) {
      res.status(500).json({ status: false, data: {} });
    }
  } else if (req.method == "GET") {
    try {
      let data;
      if (req?.query?.id) {
        const objectId = new ObjectId(req?.query?.id);
        data = await collection.findOne({ _id: objectId });
      } else if (req?.query?.search) {
        const regexQuery = { $regex: req?.query?.search, $options: "i" };
        data = await collection.find({ fieldName: regexQuery }).toArray();
      } else {
        data = await collection.find({}).limit(50).toArray();
      }
      // console.log("res Data", data);
      await client.close();
      res.status(200).json(data);
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ status: false, data: {} });
    }
  }else if(req.method == "PATCH"){
    try {
      let data;
      const objectId = new ObjectId(req?.body?.id);
      data = await collection.updateOne(
        { _id: objectId }, // Filter criteria to find the document
        { $set: req.body.data } // Fields to update
      );
      // console.log("res Data", data);
      await client.close();
      res.status(200).json(data);
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ status: false, data: {} });
    }
  }
  // Close the MongoDB client connection when done
}
