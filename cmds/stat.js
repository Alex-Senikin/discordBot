const Discord = module.require('discord.js');
const fs = require('fs');
const profile = require('../profile.json')
const client = new Discord.Client();

module.exports.run = async (client,message,args) =>{
    let userid=message.author.id
    let p=profile[userid]
    if (!profile[userid]){return}
    if (profile[userid]){
       // message.channel.send(message.author.username)
       // message.channel.send("Количество хп = " + p.hp)
       // message.channel.send("Ваш уровень = " + p.lvl)
      //  message.channel.send("Текущее количество опыта = " + p.xp)
       // message.channel.send("Ваш урон = " + p.dmg)

        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: message.author.username,
              icon_url: message.author.avatarURL
            },
            fields: [{
                name: "Количество хп",
                value: p.hp + "/"+p.mhp
              },
              {
                name: "Ваш уровень",
                value: p.lvl
              },
              {
                name: "Ваш опыт",
                value: p.xp + "/" + p.lvl*5
              },
              {
                name: "Ваш урон",
                value: p.dmg
              },
              {
                name: "Шанс уворота",
                value: p.ev+"%"
              },
              {
                name: "Доступные очки характеристик",
                value: p.stat
              },
              {
                name: "Золотых монет",
                value: p.gold
              },
              {
                name: "Серебряных монет",
                value: p.silver
              },
              {
                name: "Медных монет",
                value: p.copper
              },
              {
                name: "Ваша сила",
                value: p.str
              },
              {
                name: "Ваша ловкость",
                value: p.agi
              },
              {
                name: "Ваш интелект",
                value: p.int
              },
              {
                name: "Ваша выносливость",
                value: p.vit
              }
            ],
            
          }
        });
        message.delete(100)
    }
}

module.exports.help = {
    name: "stat"
};