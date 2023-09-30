const puppeteer = require("puppeteer");
const fs = require("fs");

const getData = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://www.isaaa.org/gmapprovaldatabase/advsearch/default.asp?CropID=Any&TraitTypeID=Any&DeveloperID=Any&CountryID=Any&ApprovalTypeID=Any", {
    waitUntil: "domcontentloaded",
  });

  const links = await page.evaluate(async () => {
    const table = document.querySelectorAll("table")[1];
    const tags = table.querySelectorAll("a");

    return Array.from(tags).map((link) => {
        return link.getAttribute('href')
    })
  });

  let arr = []

  for (let i = 0; i < links.length; i++){
    const link = links[i]

    await page.goto(`https://www.isaaa.org${link}`, {
      waitUntil: "domcontentloaded",
    });
    const event = await page.evaluate(async () => {
      const eventName = document.querySelectorAll(".contenttext h1")[0].innerText
      const eventCode = document.querySelectorAll(".contenttext p")[0].innerText
      const eventCrop = document.querySelectorAll(".contenttext p")[1].innerText

      return {
        eventName,
        eventCode,
        eventCrop,
        url: window.location.href
      }
    })

    arr.push(event)
  }


try {
  fs.writeFileSync('./scrap.json', JSON.stringify(arr));

} catch (err) {
  console.error(err);
}
  await browser.close();
};

getData();