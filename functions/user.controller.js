var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://janet-3e832.firebaseio.com"
});
const firestore = admin.firestore();

const createUserObjectFromChannelName = channelName => {
  console.log('create user object :', channelName)
    var obj = { channels:{} };
    obj.channels[channelName] = true;
    console.log(channelName)
    return obj;
}

module.exports = {

  validateEmail: (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    },

    checkIfAvailableEmail:(email) => {
        return validateEmail(email)
    },
    createUserProfile:(userKey, channelName) => firestore.collection('users').doc(userKey).set(createUserObjectFromChannelName(channelName)),
    getUserProfile:(userKey) => firestore.collection('users').doc(userKey).get()

}