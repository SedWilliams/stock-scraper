import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs"; 
const url = "https://stockcircle.com";

class App {

    constructor(site) {
        this.site = site;
        this.data = undefined;
    }

    async getSiteData() {
        this.site = await axios.get(this.site, (response) => {
            return response.data;
        });
       
        this.data = cheerio.load(this.site);

    }

    async traverseData(elements) {
        this.data = this.data(elements);
    }

    displayData() {
        console.log(this.data);
    }
}

const app = new App(url);

await app.getSiteData();
await app.traverseData('h2.home-box__title');
app.displayData();

/*
 * Problem:
 * cheerio is not finding anything by searching elements passed to app.traverseData();
 */
