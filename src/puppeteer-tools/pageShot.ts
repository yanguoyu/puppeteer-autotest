import BrowserBase from './browserBase';

class PageShot extends BrowserBase{

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