const axios = require("axios");
const https = require("https");
const jsdom = require("jsdom");
const ExchangeRate = require("../models/ExchangeRate");

class WebCrawler {
  responseData = null;
  exchangeRates = [];
  async makeRequest(url) {
    try {
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
      const { data } = await axios.get(url, { httpsAgent });
      this.responseData = data;
      return this;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  scrapData() {
    try {
      const dom = new jsdom.JSDOM(this.responseData);
      const rateTable = dom.window.document
        .getElementById("table_3")
        .querySelector("tbody");
      const tableRows = rateTable.querySelectorAll("tr");
      this.exchangeRates = [
        ...[...tableRows].map((row) => {
          const colData = row.querySelectorAll("td");
          return {
            date: new Date(colData[0].textContent),
            currency: colData[1].textContent,
            currencyPair: colData[2].textContent,
            buying: parseFloat(colData[3].textContent),
            selling: parseFloat(colData[4].textContent),
            midRate: parseFloat(colData[5].textContent),
          };
        }),
      ];
      return this;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  saveToDB() {
    try {
      const bulkUpdate = this.exchangeRates.map((rate) => ({
        updateOne: {
          filter: { currencyPair: rate.currencyPair },
          update: { $set: { ...rate } },
          upsert: true,
        },
      }));
      ExchangeRate.bulkWrite(bulkUpdate);
      return {};
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = { WebCrawler };
