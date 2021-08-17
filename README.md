# Speak Your Mind
Soundboard that reads out selected Twitter user's tweets based on their emotional content

## Prerequisites
This application was built with JavaScript and uses:
* [Node.js](https://nodejs.org/en/) - JavaScript run-time environment
* [Express](https://expressjs.com/) - Web framework
* [EJS](http://ejs.co/) - Javascript templating language
* [Nodemon](https://nodemon.io/) - Monitors for changes and automatially restarts server 
* [ResponsiveVoice.js](https://responsivevoice.org) - Javascript text to voice library
* [Twit](https://github.com/ttezel/twit) - Twitter API Client for node 
* [Tone Analyzer](https://www.ibm.com/watson/developercloud/tone-analyzer/api/v3/curl.html?curl) - IBM Watson TA uses linguistic analysis to detect emotional and language tones in written text 

## Installation

You will need to have Node installed before installing other dependencies. Information on how to do this can be found at the Node website.

1. Download a copy of the project through GitHub:
```
git clone https://github.com/leon-northcoders/Speak-Your-Mind.git
```
2. Download the necessary dependencies:
```
npm i
```

## Config

Before proceeding, you will need to create a `config` directory within the root of the project. Create a file that will contain the credentials for the Twit API & IBM Watson Tone Analyzer. Credentials can be accessed once signed up to the respective API websites.

## Running the app in localhost

1. To run server locally:
```
npm start
```
2. To access your app within a browser, visit:
```
http://localhost:9090/
```
