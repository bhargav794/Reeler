import { SlashCommandBuilder } from "discord.js";
import { CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Creates a help ticket")
  .addStringOption((option) => 
    option
        .setName("description")
        .setDescription("Describe your issue")
        .setRequired(true)
  );



export async function execute(interaction, client) {
  if(!interaction.channelId){
    console.log("stopped");
    return
  }
  const channel = await client.channels.fetch(interaction.channelId);
  if(!channel){
    console.log(`stopped! ${channel.type}`);
    return
  }
  const threads = await channel.threads.create({
    name : `support - ${Date.now()}`,
    reason: `support-ticket: ${Date.now()}`
  })

  const problemDescription = interaction.options.getString("description");
  const { user } = interaction;
  threads.send(`**${user}'s** Problem is noted as *${problemDescription}*.You will recieve help in this thread`)
    

  return interaction.reply({
   content: `${user}'s help ticket is created`,
   ephemeral: true
  });
}
