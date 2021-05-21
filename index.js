const axios = require("axios").default;
const schedule = require("node-schedule");
var CronJob = require("cron").CronJob;
const fs = require("fs");
require("dotenv").config();
const data = require("./data.json");
let chatIds = process.env.CHAT_IDS.split(",");
console.log(chatIds);

console.log(data.length);
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// const job = schedule.scheduleJob(process.env.TIME, () => {
//   console.log("cron job executed");
//   sendMessage(data[randomNumber(1, 1643)]);
// });

var dailyJob = new CronJob({
  cronTime: process.env.TIME,
  onTick: function () {
    // Do daily function
    chatIds.forEach((id) => {
      sendMessage(data[randomNumber(1, 1643)], id);
    });
  },
  start: false,
});

dailyJob.start();
//sendMessage(data[randomNumber(1, 1643)]);

function sendMessage(inputMessage, id) {
  var author = inputMessage.author;
  var quote = inputMessage.Quote;
  var botMessage = `Hi , 
Today's Quote for you : 
${quote}  
-- ${author}`;
  console.log(botMessage);
  axios
    .get(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${id}&text=${botMessage}`
    )
    .then((response) => {
      // handle success
      console.log("message sent " + JSON.stringify(response.data));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
