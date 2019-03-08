const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: false});

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
    if(cmd === `${prefix}pay`){
     let Embed = new Discord.RichEmbed()
     .setDescription("Select one of these payment methods.")
     .addField("**Paypal Payment.**", "https://paypal.me/ColoredProductions")
     .addField("**Robux Payment.", "To pay in robux you need to have the funds in your group and ready for purchase, your sales rep should tell you how much you need to pay wich is equivilant to paypal."
               
        message.channel.send(Embed)
    }    
});

bot.login(process.env.BOT_TOKEN);
