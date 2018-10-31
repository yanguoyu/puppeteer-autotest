import puppeteer, {  Browser, Page, JSHandle } from 'puppeteer';
import ElementModel from './model/element.model';
import EleOperatorModel from './model/elementOperator.model';
import EleEventTypes from './model/eleEventTypes.model';
import ElementSelectKey from './model/elementSelectKey.model';
import ElementAnalysis from './elementAnalysis';
import { NavigationOptions } from 'puppeteer';
/**
 * 
 * @class browserBase
 */
class puppeteerTool {

  constructor(url: String){
    this.url = url;
    this.eventFunMap.set(EleEventTypes.Click, this.createOperator('click', true));
    this.eventFunMap.set(EleEventTypes.Hover, this.createOperator('hover'));
    this.eventFunMap.set(EleEventTypes.Focus, this.createOperator('focus'));
    this.eventFunMap.set(EleEventTypes.Input, this.createOperator('type', true));
  }

  page: Page;

  browser: Browser;

  url: String;

  eventFunMap = new Map<EleEventTypes, Function>();

  private async init(){
    this.browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    this.page = await this.browser.newPage();
    await this.page.goto(this.url.toString(), { waitUntil : ['load', 'domcontentloaded']});
  }

  private getErrorInfo(selector :ElementSelectKey) {
    const curUrl = this.page.url();
    return `在${curUrl}这个页面，使用document.querySelectorAll(${selector.select})查找到的元素没有第${selector.sameSelectIndex}个`;
  }

  private async getEleHandle(selector :ElementSelectKey): Promise<any>{
    const eleHandle = await this.page.$$(selector.select);
    if(selector.sameSelectIndex!== null && selector.sameSelectIndex !== undefined) {
      if(eleHandle.length > selector.sameSelectIndex){
        return eleHandle[selector.sameSelectIndex];
      } else {
        throw new Error(this.getErrorInfo(selector))
      } 
    }
    return eleHandle;
  }

  async clearAll(){
    if(this.browser){
      await this.browser.close();
    }
  }

  async getEleModal(selector? :ElementSelectKey):Promise<Array<ElementModel>>
  {
    if(!this.page){
      await this.init();
    }
    selector = selector || {
      select: 'body',
      sameSelectIndex: null
    }
    let eleHandle = await this.getEleHandle(selector);
    let html = '';
    const eleHandleLength = eleHandle.length;
    for(let index = 0; index < eleHandleLength; ++index){
      html += await this.page.evaluate(body => body.outerHTML, eleHandle[index]);
    }
    return new ElementAnalysis().main(html, selector.select);
  }

  async shotEle(options: any, selector? :ElementSelectKey): Promise<any>
  {
    if(!this.page){
      await this.init();
    }
    if(selector && selector.select){
      const eleHandle = await this.getEleHandle(selector);
      return await eleHandle.screenshot(options);
    }else{
      return await this.page.screenshot(options);
    }
  }

  async waitForRequestPromise(waitForRequest: Boolean, returnRes: any): Promise<any>{
    let newPromise = new Promise((resolve, reject)=>{
      if(waitForRequest === true) {
        this.page.on('requestfinished', ()=>{
          resolve(returnRes);
        })
      }else {
        resolve(returnRes);
      }
    })
    return newPromise;
  }

  async operator(eleOperatorModel: EleOperatorModel, selector: ElementSelectKey = null, regetEle: boolean = false): Promise<Array<ElementModel>>
  {
    if(!this.page){
      await this.init();
    }
    if(this.eventFunMap.has(eleOperatorModel.eventType)){
      await this.eventFunMap.get(eleOperatorModel.eventType)(eleOperatorModel);
    }

    if(regetEle === false && selector === null ){
      return null; //await this.waitForRequestPromise(eleOperatorModel.waitForRequest, null);
    }
    const res = this.getEleModal(selector);
    return res //await this.waitForRequestPromise(eleOperatorModel.waitForRequest, res);
  }

  private createOperator(operator: string, needValue?: Boolean) {
    return async (eleOperatorModel: EleOperatorModel): Promise<any> => {
      let allWaitPromise = [];
      //如果有页面跳转或者reload
      if(eleOperatorModel.waitForNavigation){
        const waitOptions: NavigationOptions = {
          timeout: 10000,
          waitUntil: 'networkidle0'
        };
        allWaitPromise.push(this.page.waitForNavigation(waitOptions));
      }
      if(eleOperatorModel.selector.sameSelectIndex){
        const eleHandles = await this.getEleHandle(eleOperatorModel.selector);
        allWaitPromise.push(needValue? eleHandles[operator](eleOperatorModel.value): eleHandles[operator]());
      }else{
        allWaitPromise.push(needValue? 
          this.page[operator](eleOperatorModel.selector.select, eleOperatorModel.value):
          this.page[operator](eleOperatorModel.selector.select));
      }
      return Promise.all(allWaitPromise)
    }
  }

}

export default puppeteerTool;