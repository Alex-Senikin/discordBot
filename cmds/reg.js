const Discord = module.require('discord.js');
const fs = require('fs');
const profile = require('../profile.json')
const client = new Discord.Client();

module.exports.run = async (client,message,args) =>{
    let userid=message.author.id
    if (!profile[userid]){
        profile[userid]={
            hp:10,
            lvl:1,
            xp:0,
            dmg:1,
            ev:5
        }
        fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
            if(err) console.log(err);
        })
    }
    message.delete(100)
}

module.exports.help = {
    name: "reg"
};