import { REST, SlashCommandBuilder } from "discord.js";
import { Routes } from "discord-api-types/v9";
import config from "./config.js";
import * as commandModules from "./commands/index.js"


const commands = [];

for(const module of Object.values(commandModules)){
    commands.push(module.data);
}

const rest = new REST({ version: "9" }).setToken(config.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {body:commands}).then(() =>{
                                                                                                console.log("bot registered successfully");
                                                                                            }).catch(error => {console.error(error)});


