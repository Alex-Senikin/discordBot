const Discord = module.require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

module.exports.run = async (client,message,args) =>{
    message.delete()
    message.channel.send("tested")
};

module.exports.help = {
    name: "test"
};