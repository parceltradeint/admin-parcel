// import { admin } from "@/lib/authFun/firebaseAdmin";

import { dbClient } from "@/lib/mongodb";
import admin from "../firebaseAdmin";

const createNewEmployee = async (req, res) => {
  // Checking that the user is authenticated.
  const { client, db } = await dbClient();
  const collection = db.collection("users");
  const data = req.body;
  const updateData = {
    email: data.email,
    emailVerified: true,
    displayName: data.displayName?? null,
    disabled: data.disabled ?? false
  }
  if (data?.phoneNumber?.length >= 11) {
    updateData["phoneNumber"] = `+88${data.phoneNumber}`
  }
  if (data?.password?.length >= 6) {
    updateData["password"] = data.password
  }
  if (data?.photoURL) {
    updateData["photoURL"] = data.photoURL
  }
  try {
    const user = await admin.auth().createUser({
      ...updateData
    });
    if (data?.customClaims?.update) {
      delete data.customClaims?.update;
      await admin
        .auth()
        .setCustomUserClaims(user?.uid, { ...data?.customClaims });
      }

    const newUser = {
      ...user,
      customClaims: data?.customClaims
    };
    try {
      const result = await collection.insertOne({ ...newUser });
      // res.status(200).json({ status: 200, data: result });
      res.status(200).json(newUser);
      await client.close();
    } catch (error) {
      res.status(500).json({ status: false, data: {} });
    }
    // await processUserSignUp(store_employee);
    return newUser;
  } catch (err) {
    console.log(err);
    return err;
  }
  res.status(200).json({ name: "John Doe" });
};

export default createNewEmployee;
