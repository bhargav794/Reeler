import express, { json } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';


let scraper = "https://saveig.app/api/ajaxSearch";

const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static("src"));

  app.post("/setUrl", async (req, res) => {
    try{
    const userLink = req.body.newURL;
      const sharedVar = { };
      Object.assign(sharedVar, await getVideo(userLink));
      console.log(sharedVar);
      res.json(sharedVar);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }  
  });

  async function getVideo(link) {
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
       console.log(err);
     })
 };

const port = 3000;

app.listen(port, () => {
    console.log("server running");
})
