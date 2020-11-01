require("dotenv").config();
const {prompts,creepyGifs} = require("./data")
var async = require('async');
var pg = require('pg');
const { v1: uuidv1 } = require('uuid');

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
const PREF ="!boo"

let story = []
let flag = false;
const constructStory = () => {
  let str = story.join(" ")
  return str;
}


(async () => {
  const client = await pool.connect();
  console.log("j1")
  var lol = await client.query('CREATE TABLE IF NOT EXISTS story_tb_1 (id UUID PRIMARY KEY, server STRING, channel STRING, story STRING, endv BOOL);');
  console.log(lol)
  client.release()
})();


async function clearCurrentStories(server, channel){
  const client = await pool.connect();
  console.log("clear")
  var tmp = await client.query(`UPDATE story_tb_1 SET endv=true WHERE (server='${server}' AND channel='${channel}' AND endv=false);`);
  console.log(tmp);
  client.release()
};


bot.on("message", msg => {
  msgarr = msg.content.split(" ");

  if(msgarr[0] == `${PREF}` && msgarr[1] == `story`){
    let server = msg.guild.id, channel = msg.channel.id;
    if(msgarr[2] == `random`){
      clearCurrentStories(server, channel);
      (async () => {
        const client = await pool.connect();
        console.log("j10")
        var tmp = await client.query(`SELECT story FROM story_tb_1 WHERE (endv=true AND story IS NOT NULL) ORDER BY random() LIMIT 1;`);
        console.log(tmp);
        msg.channel.send(tmp.rows[0]['story']);
        client.release()
      })();
    }
    else if(msgarr[2] == `list`){
      clearCurrentStories(server, channel);
      (async () => {
        const client = await pool.connect();
        console.log("j10")
        var tmp = await client.query(`SELECT story from story_tb_1 WHERE (server='${server}' AND channel='${channel}' AND endv=true AND story IS NOT NULL);`);
        function iterate(item, index) {
          msg.channel.send(`**Story #${index+1}:**\n ${item['story']}`);
        }
        tmp.rows.forEach(iterate);
        client.release()
      })();
    }

  }

  else if(msg.content == `${PREFIX}start`){
    let server = msg.guild.id, channel = msg.channel.id;
    //Get all records from db and check if any unended story for the channel exists. If yes, end them
    clearCurrentStories(server, channel);

    story = []
    let index = Math.floor(Math.random() * 6);
    msg.channel.send(prompts[index].content);
    flag=1;
    id = uuidv1();

    (async () => {
      const client = await pool.connect();
      console.log("j2")
      var lol = await client.query(`INSERT INTO story_tb_1 (id, server, channel, story, endv) VALUES ('${id}', '${server}', '${channel}', '${prompts[index].content}', false);`);
      console.log(lol)
      client.release()
    })();

  }

  else if (msg.content == `${PREFIX}end`){
    let server = msg.guild.id, channel = msg.channel.id;
    (async () => {
      console.log("end");
      const client = await pool.connect();
      var tmp = await client.query(`SELECT story FROM story_tb_1 WHERE (server='${server}' AND channel='${channel}' AND endv=false);`);
      let index = Math.floor(Math.random() * 3);
      msg.channel.send(`The end. Or is it?\n${creepyGifs[index]}`);
      msg.channel.send(`${tmp.rows[0]['story']}`);
      client.release()
      clearCurrentStories(server, channel);
    })();
    /*
    flag=0;
    setTimeout(()=>{
      msg.channel.send(constructStory())
    },2000)
    */
  }
  else if(msgarr[0] == `${PREF}`){
    msg.react('❓')
  }
  else{
    //If story is currently running
    //Get open story for that channel
    //Append
    let server = msg.guild.id, channel = msg.channel.id;

    (async () => {
      const client = await pool.connect();
      console.log("j3")
      var tmp = await client.query(`SELECT story FROM story_tb_1 WHERE (server='${server}' AND channel='${channel}' AND endv=false);`);
      if (tmp.rowCount!=0){
        //console.log(tmp);
        if(tmp.rows[0]['story']){
          var ns = tmp.rows[0]['story']+'\n'+msg.content
        }
        else{
          var ns = msg.content
        }
        var lol = await client.query(`UPDATE story_tb_1 SET story='${ns}' WHERE (server='${server}' AND channel='${channel}' AND endv=false);`);
        console.log(lol)
        msg.react('💀')
      }
      client.release()
      //story.push(msg.content);
    })();

  }


})
