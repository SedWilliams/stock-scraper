import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs"; 
const url = 'http://stockcircle.com/best-investors';
const url2 = 'https://www.google.com';


class HTTPApi {

    static siteURL;

    constructor(siteURL) {
        this.siteURL = siteURL;
    }

    async getSiteDOM() {
        const response = await axios.get(this.siteURL);
        return response.data;
    }

    async setTopThreeInvestors(elements) {
        const $ = cheerio.load(await this.getSiteDOM());
        return {
                //string template -> cheerio query -> newline
                first: `1. ${$(elements).eq(1).text()} \n`,
                second: `2. ${$(elements).eq(2).text()} \n`,
                third: `3. ${$(elements).eq(3).text()} \n`
            };
    }

    getInvestors() {
        const topThreeInvestorData = setTopThreeInvestors();
        console.log(topThreeInvestorData.first + topThreeInvestorData.second + topThreeInvestorData.third);
    }
}

const HTTPApi = new HTTPApi(url);

console.log("Top Investors...\n");
await HTTPApi.setTopThreeInvestors('h2.home-box__title');
HTTPApi.getInvestors();
console.log("<--------------------->");
