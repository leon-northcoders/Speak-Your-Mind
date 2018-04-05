const { keys } = require('../config');
const Twit = require('twit');
const colour = require('colour');

const file = './tweets'

const T = new Twit(keys)

exports.fetchTweets = (twitter_handle, cb) => {
    T.get('statuses/user_timeline', { screen_name: twitter_handle, count: 100, include_rts: false, tweet_mode: 'extended' }, function(err, data, res) {
        if(Array.isArray(data)){
            console.log(`\n${data[0].user.name.blue}`+`: latest tweets on timeline are:`.cyan)
            let tweets = data.map(obj => {
                return obj.full_text.replace(/(http|@)\S+|\r?\n|\r|#/g, '')
            });
            tweets = tweets.join(' ')
            .replace(/\s{2,}|(undefined)/g, ' ')
            .replace(/&amp;/g, '&')
            console.log(tweets);
            console.log(`\n Character count: ${tweets.length}`)
            cb(null, tweets)
        }
        else console.log(`${user}': 404 page does not exist\n`.red)
    })
}