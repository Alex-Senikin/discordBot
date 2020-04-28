const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const config = require('./config.json')
const prefix = config.prefix
const fs = require('fs')

fs.readdir('./cmds/',(err,files)=>{
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) console.log("Нет команд для загрузки");
    console.log(`Загружено ${jsfiles.length} комманд` );
    jsfiles.forEach((f,i) =>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} загружен`);
        client.commands.set(props.help.name,props);
    })
});

client.on('ready', () => {
    console.log(`Logged in!`)
  })


client.on("message",(message) =>{

    
    let user = message.author.username;
    let messageArray = message.content.split(" ");
    let commands = messageArray[0].toLowerCase();
    let temp = messageArray.slice(1);
    let args = new Array()
    let j = 0;
    for(var i = 0; i < temp.length; i++)
    {
      if (temp[i] != ' ' && temp[i] != '')
      {
        args[j] = temp[i]
        j++;
      }
    }
    if (!message.content.startsWith(prefix)) return;
    let cmd = client.commands.get(commands.slice(prefix.length));
    if(cmd) cmd.run(client,message,args);
})


client.login(config.token);