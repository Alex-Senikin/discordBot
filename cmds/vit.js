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
        message.channel.send({embed:{color:0xFFA500, description:"Команда введена неверно. %vit <количество характеристик>"}})
    }else{
        if(parseInt(arg.slice(1))>p.stat){
            message.channel.send({embed:{color:0xFFA500, description:"у вас недостаточно характеристик"}})
        }else{
            p.vit=p.vit+parseInt(arg.slice(1))
            p.cvit=p.cvit+parseInt(arg.slice(1))
            p.stat=p.stat-parseInt(arg.slice(1))
            fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
                if(err) console.log(err);
            })
            //message.channel.send("добавлено " +parseInt(arg.slice(1)) +" очков к выносливости")
            message.channel.send({embed: {
                color:0xFFA500,
                fields:[{
                  name:"Добавление характеристик",
                  value: "Выносливость повышена на "+parseInt(arg.slice(1))
               }],
            }})
            let n = parseInt(p.cvit/5)
            if (p.cvit>=5){
                while (n!=0){
                    p.cvit=p.cvit-5
                    p.mhp++
                    p.hp++
                    fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
                        if(err) console.log(err);
                    })
                    n--
                }
            }
        }
    }   
}

module.exports.help = {
    name: "vit"
};