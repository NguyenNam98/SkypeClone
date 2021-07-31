var admin = require("firebase-admin");

var serviceAccount = require("./config/firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://skype-44adc-default-rtdb.firebaseio.com"
});
const db = admin.firestore();
module.exports = {
    db,
    admin
}