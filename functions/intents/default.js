const fallBackAnswers = [
    "I didn't get that. Can you say it again?",
    "I missed what you said. What was that?",
    "Sorry, could you say that again?",
    "Sorry, can you say that again?",
    "Can you say that again?",
    "Sorry, I didn't get that. Can you rephrase?",
    "Sorry, what was that?",
    "One more time?",
    "What was that?",
    "Say that one more time?",
    "I didn't get that. Can you repeat?",
    "I missed that, say that again?"
]

const sayRandomStuff = () =>{
    var rand =  Math.floor(Math.random() * fallBackAnswers.length)
    if(rand == fallBackAnswers.length)
        rand = fallBackAnswers.length - 1;
    return fallBackAnswers[rand];
    //return agent.add(fallBackAnswers[rand])
}

module.exports = {
    fallback:(req, agent) => {
        console.log('fall back !!!')
        return () => {
            var params = req.body.queryResult.parameters;
            if(req.body.originalDetectIntentRequest.source == 'line'){
                //shut up when in the group
                var type = req.body.originalDetectIntentRequest.payload.data.source.type;
                if(type == "room")
                    return null;
                else
                    return agent.add(sayRandomStuff());
            }else
                return agent.add(sayRandomStuff());
        }
    },
    talkToLineContact: (req, agent, client) => {
        if(req.body.originalDetectIntentRequest.source == 'line'){
            //push notification
            //get contact
            //Send message to sompop(contact in entity) "go fuck your self"
            //userController.getContact(entity_name).then(contact => client.pushMessage(contact.lineUID, params.message))
            //client.pushMessage()
        }else
            return agent.add("Sorry we support only line channel")
    }


}