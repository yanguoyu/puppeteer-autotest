import expect from 'expect.js'
import { PageAnalysis, ElementAnalysis } from '../js'
import _ from 'lodash'
import path from 'path'

describe(`Test func hello`, () => {
  it('Should return string', async () => {
      var pageAnalysis  = new PageAnalysis();
      const html = await pageAnalysis.main('http://www.baidu.com');
      const elementAnalysis = new ElementAnalysis();
      const openTags = elementAnalysis.main(html);
      console.log(openTags);
  })
})
