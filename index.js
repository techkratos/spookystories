require("dotenv").config();

const Discord = require("discord.js");
const bot = new Discord.Client();

bot.login(process.env.DISCORD_TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`)
})

bot.on("message", msg => {
  if(msg.content.split(" ")[1] == "start" && msg.mentions.has(bot.user)){
    msg.channel.send("STARTING...")
  }
})
