const axios = require('axios');

const BKKSWING_ENDPOINT = {
    social_schedule: "https://script.googleusercontent.com/macros/echo?user_content_key=jS3z6g036EqsVPgfKWhLslvFHacW3PyIShtunYLTTMyZ0K-imUtJRpCLNvNvdf8iK-V2y420QMrxYTR2h70Z_z1qIHkDNt6Im5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGfm6FoYhiz-ieohWryuDyVZn_mIYiUgqaX7azpbZLIC2dCfwCaeqy0D1cJ4KBdkwrxy_u9Yn2NR&lib=MYivbcdEcW_0NFJfN8dDl8w5P-Idvl_o1"
}

module.exports = {

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
    }
}