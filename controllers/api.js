const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const { piCredentials } = require('../config')
const fs = require('fs');
const { fetchTweets } = require('../models/api')
// const { promisify } = require('util');
// const readFileWithPromise = promisify(fs.readFile)

const pi = new PersonalityInsightsV3(piCredentials)

exports.getPersonalityInsight = (req, res, next) => {

    const { twitter_handle } = req.params
    fetchTweets(twitter_handle, (err, tweets) => {
        console.log(pi.profile)
        pi.profile({
            content: tweets,
            content_type: 'text/plain',
            charset: 'utf-8'
        }), (err, watsonData) => {
            console.log(watsonData)
            if(err) {
                console.log('Error:', err)
            }else res.send(watsonData);
        }
    })    
}