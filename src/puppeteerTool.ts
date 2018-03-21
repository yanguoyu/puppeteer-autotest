import { launch , Browser, Page, JSHandle } from 'puppeteer';
import ElementModel from './model/element.model';
import EleOperatorModel from './model/elementOperator.model';
import EleEventTypes from './model/eleEventTypes.model';
import ElementSelectKey from './model/elementSelectKey.model';
import ElementAnalysis from './elementAnalysis';
/**
 * 
 * @class browserBase
 */
class puppeteerTool {

  constructor(url: String){
    this.url = url;
    this.eventFunMap.set(EleEventTypes.Click, this.clickSelector);
    this.eventFunMap.set(EleEventTypes.Hover, this.hoverSelector);
    this.eventFunMap.set(EleEventTypes.Focus, this.focusSelector);
  }

  page: Page;

  browser: Browser;

  url: String;

  eventFunMap = new Map<EleEventTypes, Function>();

  private async init(){
    this.browser = await launch();
    this.page = await this.browser.newPage();
    await this.page.goto(this.url.toString(), { waitUntil : ['load', 'domcontentloaded']});
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
    return new ElementAnalysis().main(html, selector);
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

  clickSelector = async (eleOperatorModel: EleOperatorModel) => {
    if(eleOperatorModel.selector.sameSelectIndex){
      const eleHandles = await this.page.$$(eleOperatorModel.selector.select);
      await eleHandles[eleOperatorModel.selector.sameSelectIndex].click(eleOperatorModel.value);
    }else{
      await this.page.click(eleOperatorModel.selector.select, eleOperatorModel.value);
    }
  }

  hoverSelector = async (eleOperatorModel: EleOperatorModel) => {
    if(eleOperatorModel.selector.sameSelectIndex){
      const eleHandles = await this.page.$$(eleOperatorModel.selector.select);
      await eleHandles[eleOperatorModel.selector.sameSelectIndex].hover();
    }else{
      await this.page.hover(eleOperatorModel.selector.select);
    }
  }

  focusSelector = async (eleOperatorModel: EleOperatorModel) => {
    if(eleOperatorModel.selector.sameSelectIndex){
      const eleHandles = await this.page.$$(eleOperatorModel.selector.select);
      await eleHandles[eleOperatorModel.selector.sameSelectIndex].focus();
    }else{
      await this.page.focus(eleOperatorModel.selector.select);
    }
  }


  async operator(eleOperatorModel: EleOperatorModel, selector?: String): Promise<Array<ElementModel>>
  {
    if(this.eventFunMap.has(eleOperatorModel.eventType)){
      await this.eventFunMap.get(eleOperatorModel.eventType)(eleOperatorModel);
    }
    return this.getEleModal(selector);
  }

}

export default puppeteerTool;