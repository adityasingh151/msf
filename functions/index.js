import functions from "firebase-functions";
import admin from "firebase-admin";
admin.initializeApp();

// Cloud Function to assign admin role
export const addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return {error: "Only admins can add other admins."};
  }

  return admin.auth().getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {admin: true});
    })
    .then(() => {
      return {message: `Success! ${data.email} is now an admin.`};
    })
    .catch((err) => {
      return {error: err.message};
    });
});
