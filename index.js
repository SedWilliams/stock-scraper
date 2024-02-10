import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs"; 
const url = 'http://stockcircle.com';
const uri = 'https://www.google.com';

class App {

    constructor(site) {
        this.site = site;
        this.data = " not undefined ";
    }

    async getSiteData() {
        const response = await axios.get(this.site + '/best-investors');
        return response.data;
    }

    async setInvestors(elements) {
        const $ = cheerio.load(await this.getSiteData());
        this.data = {
            first: `1. ${$(elements).eq(1).text()} \n`,
            second: `2. ${$(elements).eq(2).text()} \n`,
            third: `3. ${$(elements).eq(3).text()} \n`
        };
    }

    getInvestors() {
        console.log(this.data.first + this.data.second + this.data.third);
    }
}

const app = new App(url);

console.log("Top Investors...\n");
await app.setInvestors('h2.home-box__title');
app.getInvestors();
console.log("<--------------------->");
