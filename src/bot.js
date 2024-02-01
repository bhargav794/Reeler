import { Client, GatewayIntentBits } from "discord.js";
import config from "./config.js";
import * as commandModules  from "./commands/index.js";

const commands = { ...commandModules };

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once("ready", () =>{
    console.log("Bot ready");
})

client.on("interactionCreate", (interaction) => {
    if(!interaction.isCommand()) return;
    const { commandName } = interaction;
    commands[commandName].execute(interaction, client);  
})

client.login(config.DISCORD_TOKEN);