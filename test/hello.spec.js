import { PuppeteerTool } from '../js'
import BlinkDiff from "blink-diff";


var puppeteerTool;
var puppeteerToolInput;

beforeAll(()=>{
      puppeteerToolInput = new PuppeteerTool('https://github.com/login');
      puppeteerTool = new PuppeteerTool('http://www.baidu.com');
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

      test('test input', async ()=>{
            jest.setTimeout(10000);
            const eleOperatorModel = [
                  {
                        "selector": {
                              "select": ".auth-form-body>input",
                              "sameSelectIndex": 0
                        },
                        "eventType": "Input",
                        "value": "841185308@qq.com"
                  },
                  {
                        "selector": {
                              "select": ".auth-form-body>input",
                              "sameSelectIndex": 1
                        },
                        "eventType": "Input",
                        "value": "149162ygy"
                  },
                        {
                        "selector": {
                              "select": ".auth-form-body>input",
                              "sameSelectIndex": 2
                        },
                        "eventType": "Click",
                        waitForNavigation: true
                  }
            ]
            for(let i = 0; i <  eleOperatorModel.length; ++i){
                  await puppeteerToolInput.operator( eleOperatorModel[i]);
            }
            await puppeteerToolInput.shotEle({path: '4.png'})
      })

      // test('test BlinkDiff', ()=>{
      //       var diff = new BlinkDiff({
      //             imageAPath: '/Users/mac/Documents/GitHub/puppeteer-autotest/1/2.png', // Use file-path
      //             imageBPath: '/Users/mac/Documents/GitHub/puppeteer-autotest/2/2.png',
      //             thresholdType: BlinkDiff.THRESHOLD_PIXEL,
              
      //             threshold: 0.01, // 1% threshold
              
      //             imageOutputPath: '/Users/mac/Documents/GitHub/puppeteer-autotest/1/tmp.png',
      //             imageOutputLimit: BlinkDiff.OUTPUT_SIMILAR,
      //             delta: 0
      //         });
              
      //         return diff.runWithPromise().then(value=>{
      //               console.log(value);
      //         }).catch(error=>{
      //               console.log(error);
      //         })
      // })
})