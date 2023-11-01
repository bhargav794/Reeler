import express from 'express';
import httpProxy from "http-proxy-middleware";
import cors from 'cors';
import axios from 'axios';
import cheerio from 'cheerio';
import path from 'path';
import url from "url";

let userLink = "https://www.instagram.com/";


const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//parse JSON and urlEncoded so that json and url data are parsed into req.body
 app.use(express.json());
 app.use(cors());
 app.use(express.urlencoded({extended: true}));
app.use(express.static("src"));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "src/index.html"));
// })
const getVideo = async (userLin) => {
  console.log(userLin);
  // calls axios to go to the page and stores the result in the html variable
  const html = await axios.get(userLin);
  // calls cheerio to process the html received
   //console.log(html);
    const $ = cheerio.load(html.data);
    const videoString = $;
    // returns the videoString
   // console.log($);
   console.log("cheer")
    console.log(videoString);
};


const httpOptions = {
  target:  userLink,
  changeOrigin: true,
};

const proxy = httpProxy.createProxyMiddleware(httpOptions);
console.log(userLink);

app.use('/reels', proxy);
//send link to server everytime it is update
 app.post('/setUrl', (req, res) => {
   userLink = req.body.newURL;
     res.sendStatus(200);
     console.log(userLink);
    getVideo(userLink);

 });
//console.log(`proxy with ${JSON.stringify(httpOptions)}`);

const port = 3000;

app.listen(port, () => {
    console.log("server running");
})
