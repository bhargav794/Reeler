import express from 'express';
import httpProxy from "http-proxy-middleware";
import cors from 'cors';
import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';
import path from 'path';
import url from "url";


let scraper = "https://saveig.app/api/ajaxSearch";


const app = express();



// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static("src"));
  //  app.get('/', (req, res) => {
  //     res.sendFile(path.join(__dirname, "src/index.htm"));
  //     console.log(__dirname);
  // });

  app.post("/setUrl", (req, res) => {
    const userLink = req.body.newURL;
    res.sendStatus(200);
    getVideo(userLink);
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
     console.log(data);
     axios.post(scraper, qs.stringify(data), { headers }).then((res) => {
       const response = res.data;
       const html = response.data;
         const $ = cheerio.load(html);
         const filter1 = $(".download-items");
         console.log(filter1);
         // TODO get thumbnail, place it on the screen and pass the download link into a btn.
         const mainData = filter1
           .find(".download-items__btn")
           .find("a")
           .attr("href");
         console.log(mainData);
         console.log(res);

     }).catch((err) => {
       console.log(err);
     })
 };


const port = 3000;

app.listen(port, () => {
    console.log("server running");
})
