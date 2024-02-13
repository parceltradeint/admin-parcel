/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
const { AuthenticationError } = require("apollo-server-core");
const { admin } = require("../lib/firebaseAdmin");
const uniqid = require("uniqid");

// eslint-disable-next-line consistent-return
async function customToken(data, context) {
  if (!context.auth.token?.isEmployee) {
    // eslint-disable-next-line promise/catch-or-return
    return (response = { message: "Unauthorise!", status: 400 });
  }
  try {
    let getCustomToken = new Promise((resolve, reject) => {
      admin
        .auth()
        .createCustomToken(data.uid)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
    return await getCustomToken;
    
  } catch (error) {
    return (response = { message: "Something went wrong", status: 400 });
  }
}

module.exports = {
  customToken,
};
