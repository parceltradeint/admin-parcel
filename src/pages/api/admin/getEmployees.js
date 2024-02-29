// const { admin } = require("../../src/lib/firebaseAdmin");

import admin from "../firebaseAdmin";

// const getEmployees = async (filter, limit, page, context) => {
//   // Checking that the user is authenticated.

//   try {
//     let employees;
//     if (filter) {
//       employees = await (await userRef.where("email", "==", filter).get()).docs;
//     } else {
//       employees = await (await userRef.get()).docs;
//     }
//     let getEmployees = new Promise((resolve, reject) => {
//       const newData = [];
//       employees.forEach((doc) => {
//         if (context?.user?.uid !== doc.id) {
//           newData.push({ ...doc.data(), uid: doc.id });
//         }
//         // newData.push({ ...doc.data(), uid: doc.id });
//       });
//       if (newData?.length > 0) {
//         resolve(newData);
//       } else {
//         // eslint-disable-next-line prefer-promise-reject-errors
//         reject("error data not found");
//       }
//     });
//     // const getAuthEmployees = await (
//     //   await admin.auth().listUsers()
//     // ).users.filter((user) => user["customClaims"]?.isEmployee === true);
//     // let getEmployees = new Promise((resolve, reject) => {
//     //   if (getAuthEmployees) {
//     //     resolve(getAuthEmployees);
//     //   } else {
//     //     // eslint-disable-next-line prefer-promise-reject-errors
//     //     reject("error data not found");
//     //   }
//     // });
//     return await getEmployees;
//   } catch (error) {
//     return (response = { message: "Something went wrong", status: 400 });
//   }
// };

// module.exports = {
//   getEmployees,
// };

// pages/api/users.js


export default async function handler(req, res) {
  try {
    // Perform Firebase Admin SDK operations
    const users = await admin.auth().listUsers();
    res.status(200).json({...users});
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
