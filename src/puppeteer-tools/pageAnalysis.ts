import { Page } from 'puppeteer';
import BrowserBase from './browserBase';

class PageAnalysis extends  BrowserBase{

  async main(url: String){
    await this.openPage(url);
    const bodyHandle = await this.page.$('body');
    const html = await this.page.evaluate(body => body.innerHTML, bodyHandle);
    return html;
  }

}

export default PageAnalysis;