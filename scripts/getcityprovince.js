const puppeteer = require('puppeteer');
process.setMaxListeners(Number.MAX_SAFE_INTEGER);
(async function() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let wikiLink = '';
    let province = '';
    await page.setViewport({ width: 1920, height: 926 });
    const cityName = 'brielle'
    await page.goto(`https://www.google.com/search?client=ubuntu&channel=fs&q=${cityName}+netherlands+wiki&ie=utf-8&oe=utf-8`);
    await page.evaluate(() => {
        wikiLink = document.querySelector('#rso > div:nth-child(1) > div > div:nth-child(1) > div > div > div.r > a').href;
        console.log(wikiLink);
    });

    const page2 = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(wikiLink);
    page.evaluate(_=> {
        province = document.querySelector('#mw-content-text > div > table.infobox.geography.vcard > tbody > tr:nth-child(8) > td > a').innerText;
        console.log(province);
    })


})();