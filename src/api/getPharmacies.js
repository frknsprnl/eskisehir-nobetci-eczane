import axios from "axios";
import * as cheerio from 'cheerio';

export const getPharmacies = async () => {
  const myResponse = axios(`http://api.scraperapi.com?api_key=${import.meta.env.VITE_KEY}&url=${import.meta.env.VITE_URL}`)
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);
      let pharmacies = [];

      const lastUpdated = $('.appointment-tab>em>small>strong').text();

      const names = $('h3>span[itemprop=name]').map((i, element) => {
        return $(element).text();
      });

      const hours = $('.available-info>li>strong>time').map((i, element) => {
        return $(element).text();
      });
      
      const phones = $('.available-info>li>span[itemprop="telephone"]').map((i, element) => {
        return $(element).text();
      });

      const addresses = $('.available-info>li>address[itemprop="address"]').map((i, element) => {
        return $(element).text();
      });

      for (let i = 0; i < names.length; i++) {
        pharmacies[i] = {
          name: names[i],
          time: hours[i],
          phone: phones[i],
          address: addresses[i],
        };
      }

      const data = { lastUpdated, pharmacies};
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return myResponse;
};
