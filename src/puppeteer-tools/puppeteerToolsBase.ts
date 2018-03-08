import { launch , Browser, Page } from 'puppeteer';
/**
 * tool基类，具有初始化功能，打开网页。
 * 
 * @class PuppeteerToolsBase
 */
class PuppeteerToolsBase {

  constructor(){
  }

  page: Page;

  browser: Browser;

  protected async init(){
    if(this.browser){
      this.browser.close();
    }
    this.browser = await launch();
    this.page = await this.browser.newPage();
  }

  async analysisPage(url: String){
    if(!this.page){
      await this.init();
    }
    await this.page.goto(url.toString());
  }

  async clearAll(){
    if(this.browser){
      await this.browser.close();
    }
  }

}

export default PuppeteerToolsBase;