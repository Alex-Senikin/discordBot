const Discord = module.require('discord.js');
const fs = require('fs');
const profile = require('../profile.json')
const client = new Discord.Client();

module.exports.run = async (client,message,args) =>{
    //надо ли тайм аут на отдых?
    let userid=message.author.id;
    let p=profile[userid]
    if (p.gold==0 && p.silver==0 && p.copper < 30){
        //недостаточно денег
    }else if(p.copper > 30){
        //снимает комнату 
    }else if(p.copper < 30 && p.silver >= 1){
        //снимает комнату с конвертацией серебра
    }else if(p.copper < 30 && p.silver == 0 && p.gold>=1){
        //снимает комнату с конвертацие золота

    }
}

module.exports.help = {
    name: "rent"
};