const bkkController = require("../controllers/bkkswing.controller")
const { Card, Suggestion } = require("dialogflow-fulfillment");



const displaySchedule = (schedules, req, agent) => {
    var mapStuff = schedules.map(item => bkkController.getDisplaySocialText(item));
    console.log('mapStuff', mapStuff.join("\n"))
    agent.add(new Card({
        title: "We have Socials every Tuesday and Sat and 8PM at The Hop",
        text: mapStuff.join("\n")
    }));
   
}


module.exports = {
    getSocialSchedule:(req, agent) => (() => {
        console.log('intent bkkswing 3.9')
        return bkkController.getSocialSchedule().then(schedules => {
            var topSchedule = bkkController.getTopSchedule(schedules);
           
            displaySchedule(topSchedule, req, agent);
            console.log('done display card')
            return agent.add("That's so far lindy schedule that I know")
        })
    }),
    whatDayIsToday:(req, agent) => (() => {
        var toDay = new Date();
        return agent.add(`to day is ${toDay.getDay()} or ${toDay.toDateString()}`)
    }),
    doWeHaveSocialAtTime:(req, agent) => (() => {
        console.log('iniate social at time v7')
        return bkkController.getSocialSchedule().then(schedules => {
            var params = req.body.queryResult.parameters;
            console.log(params)
            if(params.time){
                var filterSc = schedules.filter(sc => bkkController.isSameDay(new Date(params.time), sc.date) )
                if(filterSc.length > 0)
                {
                    return  agent.add("Yes we have " + bkkController.getDisplaySocialText(filterSc[0], false))
                }else
                    return agent.add(`Nope we dont have social on ${new Date(params.time).toDateString()}`)
            }else if(params['date-period']){
                console.log(params['date-period']);
                var fromDate  = new Date(params['date-period'].startDate);
                var endDate = new Date(params['date-period'].endDate);
                var filterSc =schedules.filter(sc => {
                    return fromDate.getTime() <= bkkController.getActualDate(sc.date).getTime() && endDate.getTime() >= bkkController.getActualDate(sc.date).getTime()
                })
                displaySchedule(filterSc, req, agent);
                return agent.add(`that's all i know`)
            }else if(params.Social){
                var filterSc = schedules.filter(sc => bkkController.isSameDay(new Date(), sc.date) )
                if(filterSc.length > 0)
                {
                    return  agent.add("Yes we have " + bkkController.getDisplaySocialText(filterSc[0], false))
                }else
                    return agent.add(`Nope we dont have social on ${new Date(params.time).toDateString()}`)
            }else
                return agent.add(`Nopeeeee`)
            /*switch(params.time.toLowerCase()){
                case "today":
                    var filterSc = schedules.filter(sc => bkkController.isSameDay(new Date(), sc.date) )
                    if(filterSc.length > 0)
                    {
                        return  agent.add("Yes we have social today " + bkkController.getDisplaySocialText(filter[0]))
                    }else
                        return agent.add(`Nope we dont have social today`)
                
                    break;
                case "tomorrow":
                    return agent.add('nope')
                    break;
                case "next week":
                    return agent.add('nope')
                    break;
                default:
                    return     agent.add('nope')

            }*/
            
            //bkkController.getTopSchedule(schedules, 1)[0];
        });
    })
}