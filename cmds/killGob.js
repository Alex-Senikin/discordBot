const Discord = module.require('discord.js');
const fs = require('fs');
const fight = require('../fight.json')
const profile = require('../profile.json')
const client = new Discord.Client();

module.exports.run = async (client,message,args) =>{
    let userid=message.author.id;
    let u=fight[userid]
    let p=profile[userid]
    let now = new Date();
    let dietime=now.getTime()
    let so =(now.getTime()-p.dt)/1000
    let m=59-parseInt(so/60)
    let s =60-parseInt(so%60)
    //let a = b-dietime
    if (now.getTime()-p.dt<1*60*60*1000){
        //message.channel.send("вы погибли в бою вы возродитесь через " + m +":" +s)
        message.channel.send({embed: {
            color:0xff0000,
            fields:[{
              name:"Вы погибли в бою",
              value: "вы возродитесь через " + m +":" +s
           }
            ],
        }})
    }else{
        //если не разу не убивали гоблина
        if (!fight[userid] || u.heals==0){
        fight[userid]={
           heals:9
         }
        fs.writeFile("./fight.json", JSON.stringify(fight), (err) => {
           if(err) console.log(err);
       })
        message.channel.send("вы нанесли 1 урона гоблину осталось хп: 9/10")
        }else
        if (u.heals<=p.dmg){
            //убили гоблина
            message.channel.send({embed:{color:0x00ff00, description:"Вы убили гоблина"}})
            fight[userid]={
            heals:10
       }
       let gdrop=parseInt(Math.random()*(5-0)+0)//дроп валюты
       let drop=""
       if (gdrop<1){
           drop="ничего"
       }else{
            p.copper=p.copper+gdrop//без конвертации
           if(p.copper+gdrop>=100){//конвертация в серебро
               p.silver++
               p.copper=p.copper-100
               if(p.silver>=100){//конвертация в золото
                   p.gold++
                   p.silver=p.silver-100
               }
           }
        
        drop=gdrop+" медных монет"
       }
       
            fs.writeFile("./fight.json", JSON.stringify(fight), (err) => {
               if(err) console.log(err);
           })
           message.channel.send({embed: {
            color:0x8b00ff,
            fields:[{
              name:"Из гоблина выпало",
              value:drop
           }
            ],
        }})
          //экспа за убийство
          if(p.xp>=p.lvl*5-1){
               p.lvl++
               p.stat=p.stat+5
               p.xp=0
               fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
                   if(err) console.log(err);
               })
            }else{
             p.xp++
            }
        
          fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
             if(err) console.log(err);
          })
         } else{
              let gdmg=""
              let ydmg=""
              let evade=Math.random()*(100-1)+1
         //урон от гоблина и шанс уклонения
              if (u.heals>p.dmg){
                  if (evade>=1 && evade<=p.ev){
                   gdmg="Вы увернулись от атаки гоблина"
                 }else{
                    if (p.hp<=1){    
                        p.dt=dietime
                        p.hp=p.mhp
                        gdmg="вы погибли"
                        fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
                            if(err) console.log(err);
                      })
                       // a=b - dietime
                    }else{
                    p.hp=p.hp-1
                    fs.writeFile("./profile.json", JSON.stringify(profile), (err) => {
                        if(err) console.log(err);
                  })
                   gdmg="Гоблин нанес вам 1 еденицу урона"
                   }
                }
            }
           let dodge = Math.random()*(100-1)+1
           if (dodge>=1 && dodge<=5){
               ydmg="Гоблин увернулся от вашей атаки"
            }else{
                //урон гоблину
                if (fight[message.author.id])
                u.heals=u.heals-p.dmg
                fs.writeFile("./fight.json", JSON.stringify(fight), (err) => {
                   if(err) console.log(err);
              })
                 ydmg="вы нанесли " +p.dmg+ " урона гоблину осталось хп: "+u.heals+"/10"
         }
            message.channel.send({embed: {
               fields:[{
                 name:"Вы атакуете гоблина",
                 value: ydmg
              },
              {
                    name:"Гоблин атакует вас",
                    value: gdmg
                }
               ],
           }})
      }
    }
};

module.exports.help = {
    name: "killgob"
};