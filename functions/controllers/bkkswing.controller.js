const axios = require('axios');

const BKKSWING_ENDPOINT = {
    social_schedule: "https://script.googleusercontent.com/macros/echo?user_content_key=jS3z6g036EqsVPgfKWhLslvFHacW3PyIShtunYLTTMyZ0K-imUtJRpCLNvNvdf8iK-V2y420QMrxYTR2h70Z_z1qIHkDNt6Im5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGfm6FoYhiz-ieohWryuDyVZn_mIYiUgqaX7azpbZLIC2dCfwCaeqy0D1cJ4KBdkwrxy_u9Yn2NR&lib=MYivbcdEcW_0NFJfN8dDl8w5P-Idvl_o1"
}


const displayDJ = name =>{
    if(name == '')
        return 'TBC'
    else
        return name
}

const getDateObj = apiStrDate =>{
    var humanDate = new Date(apiStrDate)
    humanDate = new Date(humanDate.setTime(humanDate.getTime() + 86400000))
    console.log('get actual date', humanDate)
    return humanDate
}

module.exports = {
    getActualDate : (apiDate) => { return getDateObj(apiDate)},
    getDisplaySocialText : (singleSchedule, isShowDate = true) => {
        var humanDate = getDateObj(singleSchedule.date).toDateString();// new Date(singleSchedule.date)
        //humanDate = new Date(humanDate.setTime(humanDate.getTime() + 86400000)).toDateString();
        var displayText =  ''
        if(isShowDate)
            displayText = humanDate;
        if(singleSchedule.dj1 !="x"){
            if(singleSchedule.dj2 != "x" && singleSchedule.dj2 !='')
                displayText += ` DJ ${displayDJ(singleSchedule.dj1)} x DJ ${displayDJ(singleSchedule.dj2)}`
            else
                displayText += ` DJ ${displayDJ(singleSchedule.dj1)}`
            if(singleSchedule.teacher2 != "x" && singleSchedule.teacher2 != '')
                displayText += ` w/ Teacher ${displayDJ(singleSchedule.teacher1)} & ${displayDJ(singleSchedule.teacher2)}`
            else
                displayText += ` w/ Teacher ${displayDJ(singleSchedule.teacher1)}`
            //`${humanDate} DJ  ${item.dj1} w/ Teacher ${item.teacher1}`
            return displayText;
        }else
            return ''
    },

    isSameDay: (dateObject, dateStringFromApi ) => {
        var apiDate = new Date(dateStringFromApi)
        //plus one day cause it need to be plus
        apiDate = new Date(apiDate.setTime(apiDate.getTime() + 86400000))
        return apiDate.getDate() == dateObject.getDate() && apiDate.getMonth() == dateObject.getMonth() && apiDate.getFullYear() == dateObject.getFullYear()
    },

    getTopSchedule: (schedules, number = 5) => {
        var now = new Date();
        return schedules.filter(sc => {
            var d = new Date(sc.date);
            return now.getTime() < d.getTime()
        }).splice(0, number)
    },

    getSocialSchedule:() => {
        //{dates: Array(105), dj1: Array(105), dj2: Array(105), teacher1: Array(105), teacher2: Array(105), …}
        return axios.get(BKKSWING_ENDPOINT.social_schedule).then(response =>{
            console.log('current social schedule!!')
            console.log(response.data)
            return response.data.dates.map((date, index) => ({
                date: date,
                dj1: response.data.dj1[index],
                dj2: response.data.dj2[index],
                teacher1: response.data.teacher1[index],
                teacher2: response.data.teacher2[index]
            }))
        })
    },

}