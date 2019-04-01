//curl 'https://www.museumkaart.nl/Services/SchatkamerService.svc/GetSchatkamerKaart?&start=0&count=600' -H 'Accept: application/json, text/javascript, */*; q=0.01' > museums.json
let museums = require('./museums2');
// museums = museums.slice(0, 10);
const puppeteer = require('puppeteer');
process.setMaxListeners(Number.MAX_SAFE_INTEGER);
let newMuseums = [];
let newMuseumPromises = [];

(async function() {
  const browser = await puppeteer.launch({ headless: true });

  function extendMuseumData(start, step) {
    console.log(start, '/', museums.length);
    if (start >= museums.length) {
      return;
    }

    return Promise.all(
      museums.slice(start, start + step).map(museum => {
        console.log(museum.details);
        return parseMuseumData('https://www.museumkaart.nl' + museum.details)
          .then(museumData => {
            museum.description = museumData.description;
            museum.address = museumData.address;
            museum.link = museumData.link;
            museum.coordinates = getGeo(museumData.link);
            museum.opentime = museumData.opentime;
            newMuseums.push(museum);
          })
          .catch(error => console.log(error));
      })
    ).then(_ => {
      return extendMuseumData(start + step, step);
    });
  }

  function getGeo(link) {
    const url = require('url');
    const params = new URLSearchParams(url.parse(link).search);
    return params
      .get('q')
      .split('@')[1]
      .split(',')
      .map(Number);
  }

  async function parseMuseumData(detailsUrl) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(detailsUrl);
    return page.evaluate(() => {
      if (
        !document.querySelector(
          '#dnn_ctr422_ModuleContent > div > div.museum-details__summary > p'
        ) ||
        !document.querySelector(
          '#dnn_ctr422_ModuleContent > div > div.museum-details__meta > div.museum-details__meta__left > p.museum-details__address'
        ) ||
        !document.querySelector(
          '#dnn_ctr422_ModuleContent > div > div.museum-details__meta > div.museum-details__meta__left > p.museum-details__maplink > a'
        ) ||
        !document.querySelector(
          '#dnn_ctr422_ModuleContent > div > div.museum-details__meta > div.museum-details__meta__left > p.museum-details__openinghours'
        )
      ) {
        console.log('problems with ' + detailsUrl);
      }

      return {
        description: document.querySelector(
          '#dnn_ctr422_ModuleContent > div > div.museum-details__summary > p'
        ).innerText,
        address: document.querySelector(
          '#dnn_ctr422_ModuleContent > div > div.museum-details__meta > div.museum-details__meta__left > p.museum-details__address'
        ).innerText,
        link: document.querySelector(
          '#dnn_ctr422_ModuleContent > div > div.museum-details__meta > div.museum-details__meta__left > p.museum-details__maplink > a'
        ).href,
        opentime: document.querySelector(
          '#dnn_ctr422_ModuleContent > div > div.museum-details__meta > div.museum-details__meta__left > p.museum-details__openinghours'
        ).innerText
      };
    });
  }

  extendMuseumData(0, 10).then(_ => {
    console.log(newMuseums.length);

    const fs = require('fs');
    fs.writeFile('./museums4.json', JSON.stringify(newMuseums), function(err) {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved!');
    });
  });
})();
