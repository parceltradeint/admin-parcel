import admin from "../firebaseAdmin";

const updateEmployee = async (req, res) => {
  // Checking that the user is authenticated.
  const data = req.body;
  const updateData = {
    email: data.email,
    emailVerified: true,
    displayName: data.displayName?? null,
    photoURL: data.photoURL?? null,
    disabled: data.disabled?? false
  }
  console.log("data", data );
  if (data?.phoneNumber?.length >= 11) {
    updateData["phoneNumber"] = data.phoneNumber
  }
  if (data?.password?.length >= 6) {
    updateData["password"] = data.password
  }
  try {
    const res = await admin.auth().updateUser(data?.uid, {
      ...updateData
    });

    if (data?.customClaims?.update) {
      delete data?.customClaims?.update;
     await admin
        .auth()
       .setCustomUserClaims(data?.uid, { ...data?.customClaims });
    }
    return res;
  } catch (err) {
    console.log("err", err);
    return {
      success: false,
      message: "Something went wrong! Please try again.",
    };
  }
};

export default updateEmployee;
