import { PuppeteerTool } from '../js'


var puppeteerTool;

beforeAll(()=>{
      puppeteerTool = new PuppeteerTool('http://www.baidu.com');
})

afterAll(()=>{
      puppeteerTool.clearAll();
})

describe('test puppeteerTool', ()=>{
      test('test deault query', async ()=>{
            const htmlModal = await puppeteerTool.getEleModal();
            // console.log(JSON.stringify(htmlModal));
            expect(htmlModal.length).toBe(1);
      })

      test('test appointed query', async ()=>{
            const htmlModal = await puppeteerTool.getEleModal('body>div>div>div');
            expect(htmlModal.length).toBe(3);
      })

      test('test click', async ()=>{
            const htmlModal = await puppeteerTool.getEleModal('.pf');
            expect(htmlModal.length).toBe(2);
            const eleOperatorModel = {
                  selector: htmlModal[1].elementSelectKey,
                  eventType: 'Click'
            }
            const htmlModal1 = await puppeteerTool.operator(eleOperatorModel, '.bdpfmenu');
            expect(htmlModal).toBeDefined();
            expect(htmlModal1[0].className).toBe('bdpfmenu');
      })

      test('test hover', async ()=>{
            const htmlModal = await puppeteerTool.getEleModal('.soutu-btn');
            expect(htmlModal.length).toBe(1);
            const eleOperatorModel = {
                  selector: htmlModal[0].elementSelectKey,
                  eventType: 'Hover'
            }
            const htmlModal1 = await puppeteerTool.operator(eleOperatorModel, '.s_ipt_wr');
            expect(htmlModal).toBeDefined();
            expect(htmlModal1[0].className).toBe('bg s_ipt_wr quickdelete-wrap ipthover');
      })

      test('test focus', async ()=>{
            const htmlModal = await puppeteerTool.getEleModal('#kw');
            expect(htmlModal.length).toBe(1);
            const eleOperatorModel = {
                  selector: htmlModal[0].elementSelectKey,
                  eventType: 'Focus'
            }
            const htmlModal1 = await puppeteerTool.operator(eleOperatorModel, '.s_ipt_wr');
            expect(htmlModal).toBeDefined();
            expect(htmlModal1[0].className).toBe('bg s_ipt_wr quickdelete-wrap ipthover iptfocus');
      })

      test('test shotEle', async ()=>{
            await puppeteerTool.shotEle({path: '1.png'})
            const htmlModal = await puppeteerTool.getEleModal('.mnav');
            const eleOperatorModel = {
                  selector: htmlModal[1].elementSelectKey,
                  eventType: 'Hover'
            }
            await puppeteerTool.operator(eleOperatorModel);
            await puppeteerTool.shotEle({path: '2.png'}, htmlModal[1].elementSelectKey)
      })
})