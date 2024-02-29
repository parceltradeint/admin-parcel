/**
 * Created by mahfuz on 16/9/20.
 */
 const admin  = require('firebase-admin');
module.exports =  async function (req, res, next) {
  console.log('Check if request is authorized with Firebase ID token');

  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    );
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send('Unauthorized');
    return;
  }
  // console.log("idToken", idToken);
  try {

    let checkRevoked = true;

     admin.auth().verifyIdToken(idToken, checkRevoked)
    .then((payload) => {
      // Token is valid.
      if (payload) {
        req.user = payload;
        next();
      }
    })
  .catch((error) => {
    if (error.code == 'auth/id-token-revoked') {
      // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
      res.status(403).send('Unauthorized');
    } else {
      // Token is invalid.
      res.status(403).send('Unauthorized');
    }
  });

  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  }
};
