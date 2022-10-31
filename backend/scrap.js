import puppeteer from "puppeteer";
import * as dotenv from "dotenv";
dotenv.config();

export const getPharmacies = async () => {
  let pharmacies = [];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${process.env.URL}`);

  const [updateData] = await page.$$(".appointment-tab>em>small>strong");
  const lastUpdated = await (
    await updateData.getProperty("textContent")
  ).jsonValue();

  const names = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('.pro-content>h3>span[itemprop="name"]'),
      (element) => element.textContent
    )
  );

  const hours = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".available-info>li>strong>time"),
      (element) => element.textContent
    )
  );

  const phones = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        '.available-info>li>span[itemprop="telephone"]'
      ),
      (element) => element.textContent
    )
  );

  const addresses = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        '.available-info>li>address[itemprop="address"]'
      ),
      (element) => element.textContent
    )
  );

  for (let i = 0; i < names.length; i++) {
    pharmacies[i] = {
      name: names[i],
      time: hours[i],
      phone: phones[i],
      address: addresses[i],
    };
  }
  await browser.close();

  const data = { lastUpdated: lastUpdated, pharmacies: pharmacies };
  return data;
};
