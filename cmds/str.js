const Discord = module.require('discord.js');
const fs = require('fs');
const profile = require('../profile.json')
const client = new Discord.Client();

module.exports.run = async (client,message,args) =>{
    let arg = message.content.split(" ")
    let userid=message.author.id;
    let p = profile[userid]
    if (parseInt(arg.slice(1))<1){ //если число меньше нуля
        message.channel.send({embed:{color:0xFFA500, description:"введено неверное число"}})
    }else
    if (arg.length!=2){ //слишком много или мало аргументов
        message.channel.send({embed:{color:0xFFA500, description:"Команда введена неверно. %str <количество характеристик>"}})
    }else{
        if(parseInt(arg.slice(1))>p.stat){ //не хватает статов
            message.channel.send({embed:{color:0xFFA500, description:"у вас недостаточно характеристик"}})
        }else{//добавление статов
            p.str=p.str+parseInt(arg.slice(1))
            p.cstr=p.cstr+parseInt(arg.slice(1))
            p.stat=p.stat-parseInt(arg.slice(1))
            fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
                if(err) console.log(err);
            })
            message.channel.send({embed: {
                color:0xFFA500,
                fields:[{
                  name:"Добавление характеристик",
                  value: "Сила повышена на "+parseInt(arg.slice(1))
               }],
            }})
            let i = parseInt(p.cstr/3)
            if (p.cstr>=3){
            while(i!=0){
                    p.cstr=p.cstr-3
                    p.dmg++
                    fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
                    if(err) console.log(err);
                    })
                    i--
                }
            }  
        }
    }   
}

module.exports.help = {
    name: "str"
};