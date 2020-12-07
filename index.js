const puppeteer = require("puppeteer");
const Discord = require('discord.js');
const client = new Discord.Client();
const status = require(__dirname + "/switch.js");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'monitorStatus') {
    if(msg.author.id === Discord_Overlord || msg.author.id === Discord_Overlord2){
      msg.channel.send('ok');
      status.s();
    }else{
      msg.channel.send('no');
    }
  }
});

client.login(LOGIN_TOKEN);
