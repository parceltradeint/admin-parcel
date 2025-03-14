import { updateUser } from "@/lib/authFun/authFun";
import { dbClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function balanceAPI(req, res) {
  const { client, db } = await dbClient();
  const collection = db.collection("balance");

  if (req.method == "POST") {
    try {
      const result = await collection.insertOne({...req.body});
      console.log("result", result.insertedId);
      res.status(200).json({ status: 200, data: result });
      await client.close();
    } catch (error) {
      res.status(500).json({ status: false, data: error });
    }
  } else if (req.method == "GET") {
    if (req?.query?.id) {
      const objectId = new ObjectId(req?.query?.id);
      let response = await collection.findOne({ _id: objectId });
      res.status(200).json(response);
    } else {
      let response = await collection.find({}).toArray();
      res.status(200).json(response);
    }
  } else if (req.method == "PATCH") {
    try {
      let data;
      const objectId = new ObjectId(req?.query?.id);
      data = await collection.updateOne(
        { _id: objectId }, // Filter criteria to find the document
        { $set: { ...req.body } } // Fields to update
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
      // console.log("req,", req.query);
      const objectId = new ObjectId(req.query.id);
      data = await collection.deleteOne({ _id: objectId });
      // console.log("res Data", data);
      // console.log("id", objectId);
      res.status(200).json(data);
      await client.close();
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ status: false, data: {} });
    }
  }

  // Close the MongoDB client connection when done
}
