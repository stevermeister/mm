import { browser, by, element } from 'protractor';

export class MuseumkaartPage {
  navigateTo(detailsUrl) {
    return browser.get('https://www.museumkaart.nl/' + detailsUrl);
  }

  async getDescription() {
    return await await element(by.css('#dnn_ctr422_ModuleContent > div > div.museum-details__summary > p')).getText();
  }
}

  let page: MuseumkaartPage;
  page = new MuseumkaartPage();
  page.navigateTo('Museum+Kasteel+Wijchen.aspx');
  browser.sleep(5000);
  console.log(page.getDescription());
