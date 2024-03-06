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
    displayName: data.displayName ?? null,
    disabled: data.disabled ?? false,
  };
  if (data?.phoneNumber?.length >= 11) {
    updateData["phoneNumber"] = `+88${data.phoneNumber}`;
  }
  if (data?.password?.length >= 6) {
    updateData["password"] = data.password;
  }
  if (data?.photoURL) {
    updateData["photoURL"] = data.photoURL;
  }
  try {
    const user = await admin
      .auth()
      .createUser({
        ...updateData,
      })
      .then(
        (res) => res,
        (err) => err
      );
    if (user?.uid) {
      if (data?.customClaims?.update) {
        delete data.customClaims?.update;
        await admin
          .auth()
          .setCustomUserClaims(user?.uid, { ...data?.customClaims });
      }
      const newUser = {
        ...user,
        customClaims: data?.customClaims,
      };
      try {
        const result = await collection.insertOne({ ...newUser });
        // res.status(200).json({ status: 200, data: result });
        res.status(200).json(newUser);
        await client.close();
      } catch (error) {
        res.send({ status: false, message: "User Created but didn't store user data. Please delete user and again try it." });
      }
    } else {
      res.send({ ...user.errorInfo, status: false });
    }
  } catch (err) {
    console.log("err", err);
    return err;
  }
};

export default createNewEmployee;
