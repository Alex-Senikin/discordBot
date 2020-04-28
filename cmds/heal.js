const Discord = module.require('discord.js');
const fs = require('fs');
const profile = require('../profile.json')
const client = new Discord.Client();

module.exports.run = async (client,message,args) =>{
    let userid=message.author.id;
    let p=profile[userid]
    let h=((5*p.lvl)+parseInt(p.int/10))
    if (p.mana<5){
        //недостаточно маны
        message.channel.send({embed:{color:0xFFA500, description:"недостаточно маны"}})
    }else{
        p.mana=p.mana-5
        if(p.mhp-p.hp>h){//восстановление меньше чем необходимо
            p.hp=p.hp+h
            message.channel.send({embed:{color:0xFFA500, description:"вы восстановили " + h + " хп ("+p.hp+"/"+p.mhp+")"}})
        }else if(p.mhp-p.hp<=h){//восстановление беольше чем необходимо
            p.hp=p.mhp
            message.channel.send({embed:{color:0xFFA500, description:"хп восстановлено до максимума ("+p.hp+"/"+p.mhp+")"}})
        }
    }
    fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
        if(err) console.log(err);
    })
}

module.exports.help = {
    name: "heal"
};