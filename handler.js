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
    'play': function () {
        this.emit('PlayAudio');
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
        this.response.audioPlayerStop();
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':tell', 'Alexaがチャーハンを作ってくれます。チャーハンを炒めてと言ってください。');
    },
    'AMAZON.NextIntent': function () {
        this.emit(':tell', 'まだ、半焼けです');
    },
    'AMAZON.StartOverIntent': function () {
        this.emit(':tell', 'そんな、もったいない');
    },
    'AMAZON.ShuffleOnIntent': function () {
        this.emit(':tell', 'たくさん炒めますね');
    },
    'AMAZON.ShuffleOffIntent': function () {
        this.emit(':tell', '控えめに炒めますね');
    },
    'AMAZON.LoopOnIntent': function () {
        this.emit(':tell', 'そんなに食べれます？');
    },
    'AMAZON.LoopOffIntent': function () {
        this.emit(':tell', '一生懸命作ります');
    },
    'AMAZON.PreviousIntent': function () {
        this.emit(':tell', '前の人のチャーハンがそんなに美味しかったですか、そうですか');
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':tell', 'たくさん食べたいんですね');
    },


    'Unhandled': function () {
        this.response.audioPlayerStop();
    },
};

module.exports.main = (event, context, callback) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

