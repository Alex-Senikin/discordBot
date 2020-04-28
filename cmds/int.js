const Discord = module.require('discord.js');
const fs = require('fs');
const profile = require('../profile.json')
const client = new Discord.Client();

module.exports.run = async (client,message,args) =>{
    let arg = message.content.split(" ")
    let userid=message.author.id;
    let p = profile[userid]
    if (parseInt(arg.slice(1))<1){
        message.channel.send({embed:{color:0xFFA500, description:"введено неверное число"}})
    }else
    if (arg.length!=2){
        message.channel.send({embed:{color:0xFFA500, description:"Команда введена неверно. %int <количество характеристик>"}})
    }else{
        if(parseInt(arg.slice(1))>p.stat){
            message.channel.send({embed:{color:0xFFA500, description:"у вас недостаточно характеристик"}})
        }else{
            p.int=p.int+parseInt(arg.slice(1))
            p.stat=p.stat-parseInt(arg.slice(1))
            fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
                if(err) console.log(err);
            })
            //message.channel.send("добавлено " +parseInt(arg.slice(1)) +" очков к интелекту")
            message.channel.send({embed: {
                color:0xFFA500,
                fields:[{
                  name:"Добавление характеристик",
                  value: "Интеллект повышен на "+parseInt(arg.slice(1))
               }],
            }})
        }
    }   
}

module.exports.help = {
    name: "int"
};