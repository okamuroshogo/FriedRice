'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.dab29912-64b6-4424-8748-26e22dc21589";

const handlers = {
    'LaunchRequest': function () {
        this.emit('PlayAudio');
    },
    'PlayAudioIntent': function () {
        this.emit('PlayAudio');
    },
    'PlayAudio': function () {
        const audioUrl = 'https://s3-ap-northeast-1.amazonaws.com/alexa-fried-rice/nc121703.mp3';
        this.response.audioPlayerPlay('REPLACE_ALL', audioUrl, audioUrl, null, 0);
        this.emit(':responseReady');
    },
    'AMAZON.ResumeIntent': function () {
        this.emit('PlayAudio');
    },
    'AMAZON.PauseIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function() {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Alexaがチャーハンを作ってくれます。チャーハンを炒めてと言ってください。');
    },
    'Unhandled': function () {
        this.emit('AMAZON.HelpIntent');
    },
};

module.exports.main = (event, context, callback) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

