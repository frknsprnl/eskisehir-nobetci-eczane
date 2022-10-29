import * as cheerio from "cheerio";
import axios from "axios";

export const getPharmacies = async () => {
  
  let pharmacies = [];
  let names = [];
  let hours = [];
  let phones = [];
  let addresses = [];

  const myResponse = await axios
    .request(
      `http://api.scraperapi.com/?api_key=${import.meta.env.VITE_KEY}&url=${
        import.meta.env.VITE_URL
      }`
    )
    .then(function (res) {
      const html = res.data;
      const $ = cheerio.load(html);

      const lastUpdated = $(".appointment-tab>em>small>strong").text();
      const nameDOM = $('.pro-content>h3>span[itemprop="name"]');
      const hoursDOM = $(".available-info>li>strong>time");
      const phoneDOM = $('.available-info>li>span[itemprop="telephone"]');
      const addressDOM = $('.available-info>li>address[itemprop="address"]');

      nameDOM.each(function (i, element) {
        names.push($(this).text());
      });

      hoursDOM.each(function (i, element) {
        hours.push($(this).text());
      });

      phoneDOM.each(function (i, element) {
        phones.push($(this).text());
      });

      addressDOM.each(function (i, element) {
        addresses.push($(this).text());
      });

      for (let i = 0; i < names.length; i++) {
        pharmacies[i] = {
          name: names[i],
          time: hours[i],
          phone: phones[i],
          address: addresses[i],
        };
      }

      const data = { lastUpdated: lastUpdated, pharmacies: pharmacies };
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return myResponse;
};
