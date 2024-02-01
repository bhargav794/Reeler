import { SlashCommandBuilder } from "discord.js";
import { CommandInteraction } from "discord.js";

import express, { json } from "express";
import axios from "axios";
import cheerio from "cheerio";
import qs from "qs";

export const data = new SlashCommandBuilder()
  .setName("reeler")
  .setDescription("Returns the download link")
  .addStringOption((option) =>
    option
        .setName("link")
        .setDescription("Provide the link")
        .setRequired(true)
  );

export async function execute(interaction,client) {
    await interaction.reply({
      content: `your reel is downloading`,
      ephemeral: true,
    });
    if (!interaction.channelId) {
      console.log("stopped");
      return;
    }
    const channel = await client.channels.fetch(interaction.channelId);
    if (!channel) {
      console.log(`stopped! ${channel.type}`);
      return;
    }
    const threads = await channel.threads.create({
      name: `Reel - ${Date.now()}`,
      reason: `Reel: ${Date.now()}`,
    });

    const userLink = interaction.options.getString("link");
    const bothLinks = await getVideo(userLink);
    const { user } = interaction;
    if(bothLinks != null) {
      threads.send(`[download link](${bothLinks.downloadLink})`);
    }
    else {
        console.log("sending error")
        threads.send(`${userLink} sent by ${user} cannot be downloaded.Please check the link and try again.`);
         return;
    }
        
}

async function getVideo(link) {
let scraper = "https://saveig.app/api/ajaxSearch";

    const data = {
      q: `${link}`,
      t: "media",
      lang: "en"
    };

    const headers = {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.5",
      Connection: "keep-alive",
      "Content-Length": "105",
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "v3.saveig.app",
      Origin: "https://saveig.app",
      Referer: "https://saveig.app/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
    };
    return axios.post(scraper, qs.stringify(data), { headers }).then((res) => {
       const response = res.data;
       const html = response.data;
         const $ = cheerio.load(html);
         const filter1 = $(".download-items");
         const thumbNail = filter1
           .find(".download-items__thumb")
           .find("img")
           .attr("src");
         const mainData = filter1
           .find(".download-items__btn")
           .find("a")
           .attr("href");
         return { downloadLink: mainData, imgLink: thumbNail };
     }).catch((err) => {
        return null;
     })
 };
