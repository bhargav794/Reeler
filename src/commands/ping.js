import { SlashCommandBuilder } from "discord.js";
import { CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder().setName("ping").setDescription("Replies pong!");


 export async function execute(interaction) {
    return interaction.reply("pong!");
}