import { PageAnalysis, ElementAnalysis } from '../js'

test(`Test func hello`, async () => {
      var pageAnalysis  = new PageAnalysis();
      const html = await pageAnalysis.main('http://www.baidu.com');
      const elementAnalysis = new ElementAnalysis();
      const openTags = elementAnalysis.main(html);
      console.log(openTags);
})
