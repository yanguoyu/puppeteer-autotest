import puppeteer from 'puppeteer';
import { EventTypes } from './types';
import ElementAnalysis from './elementAnalysis';
/**
 * 
 * @class browserBase
 */
export default class PuppeteerTool {

  page;

  browser;

  eventFunMap = new Map();
  
  constructor(url){
    this.url = url;
    this.hasLoad = false;
    this.eventFunMap.set(EventTypes.CLICK, this.createOperator('click', true));
    this.eventFunMap.set(EventTypes.HOVER, this.createOperator('hover'));
    this.eventFunMap.set(EventTypes.FOCUS, this.createOperator('focus'));
    this.eventFunMap.set(EventTypes.INPUT, this.createOperator('type', true));
  }

  /**
   * private function
  */
  async init(){
    this.browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    this.page = await this.browser.newPage();
    await this.page.goto(this.url.toString(), { waitUntil : ['load', 'domcontentloaded']});
  }

  getErrorInfo(selector) {
    const curUrl = this.page.url();
    return `in ${curUrl} page, document.querySelectorAll(${selector.select})[${selector.sameSelectIndex}] === undefined`;
  }

  async getEleHandle(selector){
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

  createOperator(operator, needValue) {
    return async (eleOperatorModel) => {
      let allWaitPromise = [];
      if(eleOperatorModel.waitForNavigation){
        allWaitPromise.push(this.page.waitForNavigation(eleOperatorModel.waitForNavigation));
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

  /**
   * 对外的方法
  */


  /**
   *
   * 清空资源，主要是关闭网页
   * @memberof PuppeteerTool
   */
  async clearAll(){
    if(this.browser){
      await this.browser.close();
    }
  }

  /**
   * 获取selector.select 下的元素信息
   *
   * @param {string} [selector={ select: 'body' }]
   * @returns
   * @memberof PuppeteerTool
   */
  async getEleModal(selector = { select: 'body' })
  {
    if(!this.page){
      await this.init();
    }
    let eleHandle = await this.getEleHandle(selector);
    let html = '';
    const eleHandleLength = eleHandle.length;
    for(let index = 0; index < eleHandleLength; ++index){
      html += await this.page.evaluate(body => body.outerHTML, eleHandle[index]);
    }
    return new ElementAnalysis().main(html, selector.select);
  }

  /**
   * 对selector使用options进行截图
   *
   * @param {*} options
   * @param {*} selector
   * @returns
   * @memberof PuppeteerTool
   */
  async shotEle(options, selector)
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

  /**
   * 操作
   *
   * @param {*} eleOperatorModel
   * @memberof PuppeteerTool
   */
  async operator(eleOperatorModel)
  {
    if(!this.page){
      await this.init();
    }
    if(this.eventFunMap.has(eleOperatorModel.eventType)){
      await this.eventFunMap.get(eleOperatorModel.eventType)(eleOperatorModel);
    }
  }

  /**
   * 跳转到另一个网页
   *
   * @param {*} url
   * @param {*} options
   * @memberof PuppeteerTool
   */
  async goto(url, options) {
    if(!this.page) {
      this.browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
      this.page = await this.browser.newPage();
    }
    await this.page.goto(url, options || { waitUntil : ['load', 'domcontentloaded']});
  }

}
