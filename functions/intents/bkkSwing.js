const bkkController = require("../controllers/bkkswing.controller")

module.exports = {
    getSocialSchedule:(req, agent) => (() => {
        console.log('intent bkkswing!!')
        return bkkController.getSocialSchedule().then(schedules => {
            var now = new Date();
            var topSchedule = schedules.filter(sc => {
                var d = new Date(sc.date);
                return now.getTime() < d.getTime()
            }).splice(0, 5)
            console.log(topSchedule);
            topSchedule.forEach(item => {
                var humanDate = new Date(item.date).toDateString()
                agent.add(`${humanDate} DJ ${item.dj1} w/ Teacher ${item.teacher1}`)
            })            

            return agent.add("That's so far lindy schedule that I know")
        })
    })
}