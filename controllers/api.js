const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const { piCredentials , taCredentials, ttsCredentials} = require('../config');
const fs = require('fs');
const { fetchTweets } = require('../models/api')

const pi = new PersonalityInsightsV3(piCredentials);

const ta = new ToneAnalyzerV3(taCredentials);

const tts = new TextToSpeechV1(ttsCredentials);


exports.getTone = (req, res, next) => {
    const { twitter_handle } = req.params;
    fetchTweets(twitter_handle, (err, tweets) => {
        ta.tone({
            tone_input: tweets,
            content_type: 'text/plain'
        }, (err, watsonData) => {
            if(err) console.log(err);
            const emotionalTweets = watsonData.sentences_tone.reduce((acc, sentence) => {
                sentence.tones.forEach(tone => {
                    if (acc[tone] === undefined) {
                        acc[tone.tone_name] = {text: sentence.text, score: tone.score};
                    } else if (acc[tone].score < tone.score) {
                        acc[tone.tone_name] = {text: sentence.text, score: tone.score};
                    }
                })
                return acc;
            }, {})
            fs.mkdir(`./speech/${twitter_handle}`, err => {
                for(key in emotionalTweets) {
                    pipeSpeechFile(twitter_handle, key, emotionalTweets[key].text);
                }
                res.send(emotionalTweets);
            })
        })        
    })    
}

pipeSpeechFile = (handle, tone, sentence) => {
    tts.synthesize({
        text: sentence,
        voice: "en-GB_KateVoice",
        accept: "audio/wav"
    }).pipe(fs.createWriteStream(`./speech/${handle}/${tone}.wav`));
}

exports.getPersonalityInsight = (req, res, next) => {

    const { twitter_handle } = req.params;
    fetchTweets(twitter_handle, (err, tweets) => {
        pi.profile({
            content: tweets,
            content_type: 'text/plain'
        }, (err, watsonData) => {
            if(err) console.log(err);
            res.send(watsonData);
        })        
    })    
}