const Index = require('../amd/index').default;
const PuppeteerTool = Index.PuppeteerTool;

var puppeteerTool;
var puppeteerToolInput;

beforeAll(()=>{
      puppeteerToolInput = new PuppeteerTool('https://github.com/login');
      puppeteerTool = new PuppeteerTool('https://www.baidu.com');
})

afterAll(()=>{
      puppeteerToolInput.clearAll();
      puppeteerTool.clearAll();
})

describe('test puppeteerTool', ()=>{
      test('test deault query', async ()=>{
            const htmlModal = await puppeteerTool.getEleModal();
            expect(htmlModal.length).toBe(1);
      })

      test('test appointed query', async ()=>{
            const htmlModal = await puppeteerTool.getEleModal({select: 'body>div>div>div'});
            expect(htmlModal.length).toBe(4);
      })

      test('test click or hover', async ()=>{
            const htmlModal = await puppeteerTool.getEleModal({ select: '.pf'});
            expect(htmlModal.length).toBe(2);
            const eleOperatorModel = {
                  selector: htmlModal[1].elementSelectKey,
                  eventType: 'hover'
            }
            await puppeteerTool.operator(eleOperatorModel);
            const htmlModal1 = await puppeteerTool.getEleModal({ select: '.bdpfmenu'})
            expect(htmlModal1).toBeDefined();
            expect(htmlModal1[0].attributes['class']).toBe('bdpfmenu');
      })

      test('test hover', async ()=>{
            const puppeteerToolTemp = new PuppeteerTool('https://www.baidu.com');
            const htmlModal = await puppeteerToolTemp.getEleModal({ select: '.soutu-btn'} );
            expect(htmlModal.length).toBe(1);
            const eleOperatorModel = {
                  selector: htmlModal[0].elementSelectKey,
                  eventType: 'hover'
            }
            await puppeteerToolTemp.operator(eleOperatorModel);
            const htmlModal1 = await puppeteerToolTemp.getEleModal({ select: '.s_ipt_wr'})
            expect(htmlModal1).toBeDefined();
            expect(htmlModal1[0].attributes['class']).toBe('bg s_ipt_wr quickdelete-wrap ipthover');
            puppeteerToolTemp.clearAll();
      })

      test('test focus', async ()=>{
            const puppeteerToolTemp = new PuppeteerTool('https://www.baidu.com');
            const htmlModal = await puppeteerToolTemp.getEleModal({ select: '#kw'});
            expect(htmlModal.length).toBe(1);
            const eleOperatorModel = {
                  selector: htmlModal[0].elementSelectKey,
                  eventType: 'focus'
            }
            await puppeteerToolTemp.operator(eleOperatorModel);
            const htmlModal1 = await puppeteerToolTemp.getEleModal({ select: '.s_ipt_wr'})
            expect(htmlModal1).toBeDefined();
            expect(htmlModal1[0].attributes['class']).toBe('bg s_ipt_wr iptfocus quickdelete-wrap');
            puppeteerToolTemp.clearAll();
      })

      test('test shotEle', async ()=>{
            await puppeteerTool.shotEle({path: '1.png'})
            const htmlModal = await puppeteerTool.getEleModal({ select: '.mnav'});
            const eleOperatorModel = {
                  selector: htmlModal[1].elementSelectKey,
                  eventType: 'hover'
            }
            await puppeteerTool.operator(eleOperatorModel);
            await puppeteerTool.shotEle({path: '1-1.png'})
      })

      test('test requestfinish', async ()=>{
            jest.setTimeout(10000);
            const htmlModal = await puppeteerTool.getEleModal({ select: '#kw'});
            const eleOperatorModel = {
                  selector: htmlModal[0].elementSelectKey,
                  eventType: 'input',
                  value: "张顺",
                  waitForRequest: true,
                  waitForNavigation: true
            }
            await puppeteerTool.operator(eleOperatorModel);
            await puppeteerTool.shotEle({path: '1-2.png'})
      })

      // test('test input', async ()=>{
      //       jest.setTimeout(10000);
      //       const eleOperatorModel = [
      //             {
      //                   "selector": {
      //                         "select": ".auth-form-body>input",
      //                         "sameSelectIndex": 0
      //                   },
      //                   "eventType": "Input",
      //                   "value": "841185308@qq.com"
      //             },
      //             {
      //                   "selector": {
      //                         "select": ".auth-form-body>input",
      //                         "sameSelectIndex": 1
      //                   },
      //                   "eventType": "Input",
      //                   "value": "149162ygy"
      //             },
      //                   {
      //                   "selector": {
      //                         "select": ".auth-form-body>input",
      //                         "sameSelectIndex": 2
      //                   },
      //                   "eventType": "Click",
      //                   waitForNavigation: true
      //             }
      //       ]
      //       for(let i = 0; i <  eleOperatorModel.length; ++i){
      //             await puppeteerToolInput.operator( eleOperatorModel[i]);
      //       }
      //       await puppeteerToolInput.shotEle({path: '4.png'})
      // })
})