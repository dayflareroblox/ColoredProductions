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
    .addField("**Current Commands:**", ":pay, :help, :cmds, :servers, :kickbot")
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

 if(cmd === `${prefix}kickbot`){

   if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");

   var error17 = new Discord.RichEmbed()
       .setDescription('**Please enter a valid server ID.**')
       .setColor(0xff0000)

   var error18 = new Discord.RichEmbed()
       .setDescription('**You cannot kick the bot from this server!**')
       .setColor(0xff0000)


   if (isNaN(args[0])) return message.channel.send(error17).then(msg => {
       msg.delete(9000)
   });

   //If tried kick bot from a main server (like for emote provider) will return error18
   if (args[0] !== 373950345153609729 || 481663437705838602) return message.channel.send(error18).then(msg => {
       msg.delete(9000)
   });

   client.guilds.get(args[0]).leave();
   message.channel.send(`**Bot was been removed from server id [${args[0]}]**`)

  }   

});
bot.login(process.env.BOT_TOKEN);
