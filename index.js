require("dotenv").config();
var async = require('async');
var pg = require('pg');

const Discord = require("discord.js");
const bot = new Discord.Client();

bot.login(process.env.DISCORD_TOKEN);


var config = {
    user: 'maxroach',
    host: '104.196.201.188',
    database: 'story',
    port: 26257
};

// Create a pool.
var pool = new pg.Pool(config);


bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`)
})

bot.on("message", msg => {
  if(msg.content.split(" ")[1] == "start" && msg.mentions.has(bot.user)){
    msg.channel.send("STARTING...")
  }
})
