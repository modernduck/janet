const votingGameController = require('../controllers/voting-game.controller')

module.exports = {
    setProfile : (req, agent, lineClient) => (() => {
        //do if line only
        if(req.body.originalDetectIntentRequest.source == 'line'){
            var lineId = req.body.originalDetectIntentRequest.payload.data.source.userId;
            return lineClient.getProfile(lineId)
                .then(profile => votingGameController.setProfile(lineId, profile.displayName, profile.pictureUrl) )
                .then(result => agent.add("Done seting profile. Please wait for futher question and answer wheather yes or no."));
        }else
            return agent.add("Sorry we support only line platform for now")
    }),
    voteYes : (req, agent) => (() => {
        if(req.body.originalDetectIntentRequest.source == 'line'){
            var lineId = req.body.originalDetectIntentRequest.payload.data.source.userId;
            return votingGameController.vote(lineId, true).then(() => agent.add("You have vote yes."));
        }else
            return agent.add("Sorry we support only line platform for now")
    }),
    voteNo : (req, agent) => (() => {
        if(req.body.originalDetectIntentRequest.source == 'line'){
            var lineId = req.body.originalDetectIntentRequest.payload.data.source.userId;
            
            return votingGameController.vote(lineId, false).then(() => agent.add("You have vote false."));
        }else
            return agent.add("Sorry we support only line platform for now")
    }),
    removeVote : (req, agent) => (() => {
        if(req.body.originalDetectIntentRequest.source == 'line'){
            var lineId = req.body.originalDetectIntentRequest.payload.data.source.userId;
            return votingGameController.removeVote(lineId).then(() => agent.add("you have done playing voting game"))
        }else
        return agent.add("Sorry we support only line platform for now")
    })
}//voting-game.setProfile - done