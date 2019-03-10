const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: false});

const ownerID = '481171799204429834';

const YTDL = require("ytdl-core");



//---------------------------------------------------------------\\//---------------------------------------------------------------\\

function changing_status() {

    let status = ['Say :help for help', 'If you need anyone higher, contact support.']

    let random = status[Math.floor(Math.random() * status.length)]

    bot.user.setActivity(random)

}



bot.on("ready", () => {

    console.log("Changed");

    setInterval(changing_status, 2000);

})



//---------------------------------------------------------------\\//---------------------------------------------------------------\\
//---------------------------------------------------------------\\//---------------------------------------------------------------\\ 


bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


  let prefix = botconfig.prefix;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}purge`){
  message.channel.bulkDelete(args[0]);
 return;
}  
 
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\

    if(cmd === `${prefix}help`){
     let Embed = new Discord.RichEmbed()
     .setDescription("Welcome to the help menu, select one of the options below:")
     .addField("**Commands.**", "use :cmds for a list of commands.")
     .addField("**External Help.**", "Message a member of the support team for extra help.")
     .addField("**Owner.**", "Message Color3fromHSL if you urgently need him.")
     .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL)
     .setTimestamp(); 

        message.channel.send(Embed)
    }  
    
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\
 
 if(cmd === `${prefix}cmds`){
    let Embed = new Discord.RichEmbed()
    .setDescription("Welcome to the commands menu, select an option from below.")
    .addField("**Current Commands:**", ":pay, :help, :cmds, :servers, :reboot")
    .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL)
    .setTimestamp();    

              
       message.channel.send(Embed)
   }  
   
//---------------------------------------------------------------\\//---------------------------------------------------------------\\   
   
if(cmd === `${prefix}pay`){
     let Embed = new Discord.RichEmbed()
     .setDescription("Select one of these payment methods.")
     .addField("**Paypal Payment.**", "https://paypal.me/ColoredProductions")
     .addField("**Robux Payment.**", "To pay in robux you need to have the funds in your group and ready for purchase, your sales rep should tell you how much you need to pay wich is equivilant to paypal.")
     .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL)     
     .setTimestamp();

        message.channel.send(Embed)
    }  
    
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\

 if(cmd === `${prefix}servers`){

   if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");
   let string = '';

   bot.guilds.forEach(guild => {
       string += '**Server Name:** ' + guild.name + '\n' + '**Server ID:**` ' + guild.id + ' ` ' + '\n\n';

   })

   let botembed = new Discord.RichEmbed()
       .addField("Bot is On ", string)
       .setTimestamp()
       .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL);
   message.channel.send(botembed);

  }  
  
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\ 

 if(cmd === `${prefix}reboot`){

   if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");
        
        bot.destroy()
        
        bot.login(process.env.BOT_TOKEN)
      message.channel.send(":gear: Reload has been done")
        
        }   

//---------------------------------------------------------------\\//---------------------------------------------------------------\\ 

function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {
        filter: "audioonly"
    }));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });

}
var servers = {};
client.on("message", async message => {
    var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
    switch (args[0].toLowerCase()) {
        case "mplay":
            if (!message.guild.member(client.user).hasPermission('SPEAK')) return message.channel.send('**Sorry, but i cant join/speak in this channel!**').catch(console.error);
            if (!args[1]) {
                message.channel.send("**Please provide a URL YouTube link to me to play song.**");
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            if (console.error) {
                message.channel.send("**Sorry, but i cant search videos in YouTube! Provide a link to play!**");
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            message.channel.sendMessage('``You song has been added to the queue.``')
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "mstop":
            var server = servers[message.guild.id];
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.channel.send('``The queue of songs removed.``');
            break;
        case "mskip":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            message.channel.send('``The song has been sucessfully skipped.``');
            break;
        case "mpause":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.pause();
            message.channel.send('``The song is paused.``');
            break;
        case "mresume":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.resume();
            message.channel.send('``The song is sucessfully continued.``');
            break;
    }
});



});
bot.login(process.env.BOT_TOKEN);
