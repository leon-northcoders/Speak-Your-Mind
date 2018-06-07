// const { keys } = require('../config');
const Twit = require('twit');

const T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
})

// const T = new Twit(keys)

exports.fetchTweets = (twitter_handle, cb, res) => {
    T.get('statuses/user_timeline', { screen_name: twitter_handle, count: 100, include_rts: false, exclude_replies: true, tweet_mode: 'extended' }, function(err, data, res) {
        if(err) {
            if(err.code === 34) cb({status:404});
        } else {
            if(Array.isArray(data)){
                if(data[0] === undefined) cb({status:400});
                else {
                    let tweets = data.reduce((acc, cur) => {
                        let replaced = cur.full_text.replace(/http\S+|\r?\n|\r|(undefined)|\.{2,}|[^ a-z0-9'.?!,;:]/ig, '').replace(/&amp;/g, 'and').replace(/\s+$/, '').replace(/[.?!;:]+/g, ',').replace(/,$/, '.');
                        if(replaced.slice(-1) !== '.') replaced += '.';
                        if(replaced.length > 50) acc += replaced + ' ';
                        return acc;
                    }, '');
                    tweets = tweets.slice(0,-1).replace(/\s{2,}/g, ' ');
                    console.log(twitter_handle);
                    console.log(tweets.length);
                    const profileImgURL = data[0].user.profile_image_url.replace('_normal', '')
                    cb(null, tweets, profileImgURL)
                };
            };
        };
    });
};

// const { keys } = require('../config');
// const Twit = require('twit');
// const colour = require('colour');

// const file = './tweets'

// const T = new Twit(keys)

// let profileImgURL;
// exports.fetchTweets = (twitter_handle, cb) => {
//     T.get('statuses/user_timeline', { screen_name: twitter_handle, count: 100, include_rts: false, tweet_mode: 'extended' }, function(err, data, res) {
//         if(Array.isArray(data)){
//             console.log(`\n${data[0].user.name.blue}`+`: latest tweets on timeline are:`.cyan)
//             let tweets = data.map(obj => {
//                 return obj.full_text.replace(/(http|@)\S+|\r?\n|\r|#/g, '')
//             });
//             tweets = tweets.join(' ')
//             profileImgURL = data[0].user.profile_image_url.replace('_normal', '')

//             .replace(/\s{2,}|(undefined)/g, ' ')
//             .replace(/&amp;/g, '&')
//             console.log(tweets);
//             console.log(`\n Character count: ${tweets.length}`)
//             cb(null, tweets, profileImgURL)
//         }
//         else console.log(`404 page does not exist\n`.red)
//     })
// }