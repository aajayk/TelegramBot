const axios = require("axios").default;
const schedule = require("node-schedule");
const fs = require("fs");
require("dotenv").config();
const data = require("./data.json");
//console.log(process.env.BOT_TOKEN);

console.log(data.length);
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const job = schedule.scheduleJob(process.env.TIME, () => {
  console.log("cron job executed");
  sendMessage(data[randomNumber(1, 1643)]);
});

//sendMessage(data[randomNumber(1, 1643)]);

function sendMessage(inputMessage) {
  var author = inputMessage.author;
  var quote = inputMessage.Quote;
  var botMessage = `Hi , 
Today's Quote for you : 
${quote}  
-- ${author}`;
  console.log(botMessage);
  axios
    .get(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${botMessage}`
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
