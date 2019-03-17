const pexelsController = require('../controllers/pexels.controller')
const { Card, Suggestion } = require("dialogflow-fulfillment");

module.exports = {
    
    sendPicture: (req, agent) => (() => {
        var params = req.body.queryResult.parameters;
        return pexelsController.searchPhoto(params.query).then(result => {
            console.log('send picture with random')
            console.log(result.data)
            if(result.data.photos && result.data.photos.length > 0 ){
                var photosIndex = Math.round(Math.random() * result.data.photos.length)
                if(photosIndex >= result.data.photos.length )
                    photosIndex = result.data.photos.length - 1;
                return agent.add(new Card({
                    title: `Here is picture of ${params.query}`,
                    imageUrl: result.data.photos[photosIndex].src.medium
                }));
            }else
                return agent.add("Sorry don't have any picture")
        })
    })

}