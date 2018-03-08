import { Page } from 'puppeteer';

class PageAnalysis {

  constructor(page: Page){
    this.page = page;
  }

  page: Page;

  async main(){
    return this.page.$eval('body', (element)=>{
      return element;
    })
  }
}

export default PageAnalysis;