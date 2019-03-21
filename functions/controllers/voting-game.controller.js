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
    },
    resetVotes : (profileID) => {
        console.log('doing reset')
        return userController.isAdmin(profileID).then(isAdmin => {
            console.log('yo!! is admin', isAdmin)
            if(isAdmin)
                {
                    db.ref('votingGame').child('status').remove(com => { console.log('complete'); console.log(com)}).then(result => {
                        console.log('try remove')
                        console.log(result)
                    })
                    return true;
                } 
            return false;
        })
    }

}