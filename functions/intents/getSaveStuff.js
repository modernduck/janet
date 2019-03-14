const userController = require('../controllers/user.controller')


module.exports = {
    saveStuff:(req, agent) => ( () => {
        console.log('save stuff intent')
        var params = req.body.queryResult.parameters;
        if(req.body.originalDetectIntentRequest.source == 'line'){
            var lineId = req.body.originalDetectIntentRequest.payload.data.source.userId;
            return userController.saveUserStuff(lineId, params.name, params.stuff ).then(result =>{
                return agent.add("Done Save")
            })
        }
    }),
    getStuff:(req, agent) => ( () => {
        console.log('get stuff intent')
        var params = req.body.queryResult.parameters;
        if(req.body.originalDetectIntentRequest.source == 'line'){
            var lineId = req.body.originalDetectIntentRequest.payload.data.source.userId;
            return userController.getUserStuff(lineId, params.name).then(snap => {
            if(snap && snap.val())
                return agent.add(snap.val());
            else
                return agent.get(`Cant find ${params.name}.`)
            })
        }
    })

}