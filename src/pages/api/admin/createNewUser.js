const { admin } = require("@/lib/authFun/firebaseAdmin");


const createNewUser = async (data, context) => {
  // Checking that the user is authenticated.
  
  try {
    const user = await admin.auth().createUser({
      email: data.email,
      password: data.password,
      displayName: data.displayName,
      phoneNumber: data.phoneNumber,
    });
    if (data?.customClaims?.update) {
      delete data.customClaims?.update;
      await admin
        .auth()
        .setCustomUserClaims(user.uid, { ...data?.customClaims });
    }

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
    };
    const store_employee = {
      user: { ...newUser },
      type: {
        isEmployee: data?.customClaims?.isEmployee || false,
        role: data?.customClaims?.role,
        createdBy: context.auth?.displayName,
      },
    };
    await processUserSignUp(store_employee);
    return newUser;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  createNewUser,
};
