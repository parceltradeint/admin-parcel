// const { HttpsError } = require("firebase-functions/v1/auth");
// const { admin } = require("../../src/lib/firebaseAdmin");

// const updateUser = async (data, context) => {
//   // Checking that the user is authenticated.
//   if (!context.auth) {
//     throw new HttpsError("unauthenticated", "User not authenticated");
//   }
//   const isITAdmin = context?.auth?.token?.isEmployee;
//   if (!isITAdmin) {
//     throw new HttpsError(
//       "permission-denied",
//       "User not allowed to perform this action"
//     );
//   }

//   try {
//     const res = await admin.auth().updateUser(data?.uid, {
//       ...data,
//     });
//     if (data?.customClaims?.update) {
//       delete data?.customClaims?.update;
//       await admin
//         .auth()
//         .setCustomUserClaims(data?.uid, { ...data.customClaims });
//     }
//     return (response = { ...res });
//   } catch (err) {
//     console.log("err", err);
//     return (response = {
//       success: false,
//       message: "Something went wrong! Please try again.",
//     });
//   }
// };

// module.exports = {
//   updateUser,
// };
