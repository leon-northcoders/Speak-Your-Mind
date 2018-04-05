const { keys } = require('../config');
const fs = require('fs');
const Twit = require('twit');
const colour = require('colour');

const file = './tweets'

const T = new Twit(keys)
let count = 0;

exports.fetchTweets = (twitter_handle, cb) => {
    let users = [twitter_handle]
fs.mkdir(file, (err) => {
    users.forEach((user) => {
            T.get('statuses/user_timeline', { screen_name: user, count: 40, include_rts: false, tweet_mode: 'extended' }, function(err, data, res) {
                count++
                if(Array.isArray(data)){
                    console.log(`\n${data[0].user.name.blue}`+`: latest tweets on timeline are:`.cyan)
                    let tweets = data.map(obj => {
                        return obj.full_text.replace(/(http|@)\S+|\r?\n|\r|#/g, '')
                    });
                    tweets = tweets.join(' ')
                    .replace(/\s{2,}|(undefined)/g, ' ')
                    .replace(/&amp;/g, '&')
                    console.log(tweets)
                    console.log(`\n Character count: ${tweets.length}`)

                    fs.writeFile(file + `/${user}.json`, JSON.stringify({tweets: tweets}, null, 2), (err) => {
                        if (err) throw err;
                        else if(count === users.length){
                        console.log(`\nEach user's tweets have been stored in new separate file.`.red) 
                        cb(null, tweets)
                        }
                    });
                }
                else console.log(`${user}': 404 page does not exist\n`.red)
            })
        })
    })
}