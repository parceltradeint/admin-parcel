import { dbClient } from "@/lib/mongodb";
import admin from "../firebaseAdmin";

const updateEmployee = async (req, res) => {
  // Checking that the user is authenticated.
  const { client, db } = await dbClient();
  const collection = db.collection("users");
  const data = req.body;
  const updateData = {
    email: data.email,
    emailVerified: true,
    displayName: data.displayName ?? null,
    photoURL: data.photoURL ?? null,
    disabled: data.disabled ?? false,
  };

  if (data?.phoneNumber?.length >= 5) {
    updateData["phoneNumber"] = `${data.phoneCode}${data.phoneNumber}`;
  }
  if (data?.password?.length >= 6) {
    updateData["password"] = data.password;
  }
  try {
    const resUpdate = await admin
      .auth()
      .updateUser(data?.uid, {
        ...updateData,
      })
      .then(
        (res) => res,
        (err) => err
      );
    if (resUpdate?.uid) {
      if (data?.customClaims?.update) {
        delete data?.customClaims?.update;
        await admin
          .auth()
          .setCustomUserClaims(data?.uid, { ...data?.customClaims });
      }

      const updateUser = {
        ...resUpdate,
        customClaims: data?.customClaims,
      };

      try {
        const result = await collection.updateOne(
          { uid: updateUser.uid },
          { $set: updateUser }
        );
        res.status(200).json({ status: true, ...updateUser });
        await client.close();
      } catch (error) {
        res.send({
          status: false,
          message:
            "User Updated but didn't Update Database. Please again try it.",
        });
      }
    } else {
      res.send({ ...resUpdate.errorInfo, status: false });
    }
  } catch (err) {
    console.log("err", err);
    return {
      success: false,
      message: "Something went wrong! Please try again.",
    };
  }
};

export default updateEmployee;
