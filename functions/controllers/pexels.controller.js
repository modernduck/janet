const functions = require('firebase-functions');
const axios = require('axios');
//API_KEY = 
//563492ad6f91700001000001ee5a9d24c2ed41829049378e630cdec7
const PEXEL_API_KEY = functions.config().pexel.api_key;

const queryToQuery = (query) =>{
    return query.trim().split(' ').join('+')
}

module.exports = {
    searchPhoto : (query) => axios({
        url :`https://api.pexels.com/v1/search?query=${queryToQuery(query)}`,
        headers: {'Authorization':PEXEL_API_KEY}
    })
}
