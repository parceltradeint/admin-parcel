import { dbClient } from "@/lib/mongodb";
import admin from "../firebaseAdmin";

const deleteEmployee = async (req, res) => {
  // Checking that the user is authenticated.
  const { client, db } = await dbClient();
  const collection = db.collection("users");
  const data = req.body;
  try {
    const res = await admin.auth().deleteUser(data?.uid);
    await collection.deleteOne({ uid: data.uid });
    client.close();
    res.send({
      success: true,
      message: "Deleted employee!",
    });
  } catch (err) {
    console.log("err", err);
    res.send({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
};

export default deleteEmployee;
