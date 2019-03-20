const userController = require("./user.controller")
const db = userController.firebaseDB;

module.exports = {

    setProfile:(profileID, name, picture) => {
        return db.ref('votingGame').child('profile').child(profileID).set({
            name:name,
            picture:picture
        })
    },
    vote : ( profileID, isAgree) => {
        return  db.ref('votingGame').child('status').child(profileID).set(isAgree);
    },
    removeVote : (profileID) => {
        return db.ref('votingGame').child('status').child(profileID).remove();
    },
    getVotes : () => {
        return db.ref('votingGame').once('value')
    }

}