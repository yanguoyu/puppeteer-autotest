import { launch , Browser, Page } from 'puppeteer';
import ElementModel from './model/element.model';
import ElementAnalysis from './elementAnalysis';
/**
 * 
 * @class browserBase
 */
class puppeteerTool {

  constructor(url: String){
    this.url = url;
  }

  page: Page;

  browser: Browser;

  url: String;

  private async init(){
    this.browser = await launch();
    this.page = await this.browser.newPage();
    await this.page.goto(this.url.toString());
  }

  async clearAll(){
    if(this.browser){
      await this.browser.close();
    }
  }

  async getEleModal(selector?: String):Promise<Array<ElementModel>>
  {
    if(!this.page){
      await this.init();
    }
    selector = selector||'body';
    const eleHandle = await this.page.$$(selector.toString());
    let html = '';
    const eleHandleLength = eleHandle.length;
    for(let index = 0; index < eleHandleLength; ++index){
      html += await this.page.evaluate(body => body.outerHTML, eleHandle[index]);
    }
    return new ElementAnalysis().main(html);
  }

  async shotEle(options: any, selector? :String): Promise<Buffer>
  {
    if(!this.page){
      await this.init();
    }
    if(selector){
      const eleHandle = await this.page.$(selector.toString() || 'body');
      return eleHandle.screenshot(options);
    }else{
      this.page.screenshot(options);
    }
  }

}

export default puppeteerTool;