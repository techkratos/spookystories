require("dotenv").config();
const {prompts,creepyGifs} = require("./data")
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

const PREFIX ="!boo "

let story = []
let flag = false;
const constructStory = () => {
  let str = story.join(" ")
  return str;
}

bot.on("message", msg => {

  if(msg.content == `${PREFIX}start`){

    story = []
    let index = Math.floor(Math.random() * 6);
    msg.channel.send(prompts[index].content);
    flag=1;
  }

  else if (msg.content == `${PREFIX}end`){
    let index = Math.floor(Math.random() * 3);
    msg.channel.send(`The end. Or is it?\n${creepyGifs[index]}`);
    flag=0;
    setTimeout(()=>{
      msg.channel.send(constructStory())
    },2000)
  }

  else if(flag){
    story.push(msg.content);
    msg.react('💀')
  }


})
