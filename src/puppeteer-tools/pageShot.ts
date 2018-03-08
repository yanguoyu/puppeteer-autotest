import PuppeteerToolsBase from './puppeteerToolsBase';

class PageShot extends PuppeteerToolsBase{

  async pageShot(options){
    await this.init();
    if(options && options.url){
      let { url, ...otherOptions} = options;
      await this.page.goto(url);
      await this.page.screenshot(otherOptions);
    }
  }
}

export default PageShot;