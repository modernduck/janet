var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://janet-3e832.firebaseio.com"
});
const db = admin.database();

const createUserObjectFromChannelName = channelName => {
  console.log('create user object :', channelName)
    var obj = { channels:{} };
    obj.channels[channelName] = true;
    console.log(channelName)
    return obj;
}

module.exports = {

  firebaseDB:db,

  validateEmail: (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    },

    checkIfAvailableEmail:(email) => {
        return validateEmail(email)
    },
    createUserProfile:(userKey, channelName) => db.ref('users').child(userKey).set(createUserObjectFromChannelName(channelName)),
    getUserProfile:(userKey) => db.ref('users').child(userKey).toJSON() ,
    saveUserStuff:(userKey, key, value) =>{
      console.log(`key ${key} value ${value}`);
      //return  firestore.collection('users').doc(userKey).collection('stuff').doc(key).set(value)
      return db.ref('users').child(userKey).child('stuff').child(key).set(value);
    } ,
    getUserStuff:(userKey, key) =>  db.ref('users').child(userKey).child('stuff').child(key).once('value') //firestore.collection('users').doc(userKey).collection('stuff').doc(key).get()

}