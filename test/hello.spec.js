import { PuppeteerTool } from '../js'

describe('test puppeteerTool', ()=>{
      test('test deault query', async ()=>{
            var puppeteerTool  = new PuppeteerTool('http://www.baidu.com');
            const htmlModal = await puppeteerTool.getEleModal();
            expect(htmlModal.length).toBe(1);
      })

      test('test appointed query', async ()=>{
            var puppeteerTool  = new PuppeteerTool('http://www.baidu.com');
            const htmlModal = await puppeteerTool.getEleModal('body>div>div>div');
            console.log(JSON.stringify(htmlModal));
            expect(htmlModal.length).toBe(3);
      })
})