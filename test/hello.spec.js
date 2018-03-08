import expect from 'expect.js'
import { PuppeteerToolsCore } from '../js'
import _ from 'lodash'
import path from 'path'

describe(`Test func hello`, () => {
  it('Should return string', () => {
    (async () => {
      var puppeteerToolsCore  = new PuppeteerToolsCore();
      await puppeteerToolsCore.init();
      const title = await puppeteerToolsCore.analysisPage('http://www.baidu.com');
      await puppeteerToolsCore.pageShot();
      await puppeteerToolsCore.clearAll();
      console.log(title);
      console.log('test end');
    })();
  })
})
