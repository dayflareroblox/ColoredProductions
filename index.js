const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: false});

const ownerID = '481171799204429834';




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

if(cmd === `${prefix}play`){

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        const playlist = await youtube.getPlaylist(url);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
            const video2 = await youtube.getVideoByID(video.id);
            await handleVideo(video2, message, voiceChannel, true);
        }
        return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
    } else {
        try {
            var video = await youtube.getVideo(url);
        } catch (error) {
            try {
                var videos = await youtube.searchVideos(searchString, 10);
                let index = 0;
                message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the 🔎 results ranging from 1-10.
            `);
                try {
                    var response = await message.channel.awaitMessages(message => message.content > 0 && message.content < 11, {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                } catch (err) {
                    console.error(err);
                    return message.channel.send('No or invalid value entered, cancelling video selection.');
                }
                const videoIndex = parseInt(response.first().content);
                var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                console.error(err);
                return message.channel.send('🆘 I could not obtain any search results.');
            }
        }
        return handleVideo(video, message, voiceChannel);
    }
}
         
});

bot.login(process.env.BOT_TOKEN);
