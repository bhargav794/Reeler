import express from 'express';
import httpProxy from "http-proxy-middleware";
import cors from 'cors';
import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';
import path from 'path';
import url from "url";

let userLink = "https://www.instagram.com/reel/CzIOitJIeVA/?utm_source=ig_web_copy_link";

let scraper = "https://saveig.app/api/ajaxSearch";


const app = express();



// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// //parse JSON and urlEncoded so that json and url data are parsed into req.body
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static("src"));
   app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, "src/index.html"));
  });

  async function getVideo(link) {
    const data = {
      q: link,
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
     
    axios.post(scraper, qs.stringify(data), { headers }).then((res) => {
      const response = res.data;
      const html = response.data;
        const $ = cheerio.load(html);
        const filter1 = $(".download-items");
        const mainData = filter1
          .find(".download-items__btn")
          .find("a")
          .attr("href");
        console.log(mainData);
      //console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
 };

 getVideo();

// const httpOptions = {
//   target:  userLink,
//   changeOrigin: true,
// };

// const proxy = httpProxy.createProxyMiddleware(httpOptions);
// console.log(userLink);

// app.use('/reels', proxy);
// //send link to server everytime it is update
  app.post('/setUrl', (req, res) => {
    userLink = req.body.newURL;
      res.sendStatus(200);
      console.log(userLink);
     getVideo(userLink)
  });
//console.log(`proxy with ${JSON.stringify(httpOptions)}`);

// const port = 3000;

// app.listen(port, () => {
//     console.log("server running");
// })
