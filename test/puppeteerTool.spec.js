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

      // test('test appointed query', async ()=>{
      //       const htmlModal = await puppeteerTool.getEleModal({select: 'body>div>div>div'});
      //       expect(htmlModal.length).toBe(3);
      // })

      // test('test click', async ()=>{
      //       const htmlModal = await puppeteerTool.getEleModal({ select: '.pf'});
      //       expect(htmlModal.length).toBe(2);
      //       const eleOperatorModel = {
      //             selector: htmlModal[1].elementSelectKey,
      //             eventType: 'Click'
      //       }
      //       const htmlModal1 = await puppeteerTool.operator(eleOperatorModel, { select: '.bdpfmenu'});
      //       expect(htmlModal).toBeDefined();
      //       expect(htmlModal1[0].className).toBe('bdpfmenu');
      // })

      // test('test hover', async ()=>{
      //       const htmlModal = await puppeteerTool.getEleModal({ select: '.soutu-btn'} );
      //       expect(htmlModal.length).toBe(1);
      //       const eleOperatorModel = {
      //             selector: htmlModal[0].elementSelectKey,
      //             eventType: 'Hover'
      //       }
      //       const htmlModal1 = await puppeteerTool.operator(eleOperatorModel, {select : '.s_ipt_wr'} );
      //       expect(htmlModal).toBeDefined();
      //       expect(htmlModal1[0].className).toBe('bg s_ipt_wr quickdelete-wrap ipthover');
      // })

      // test('test focus', async ()=>{
      //       const htmlModal = await puppeteerTool.getEleModal({ select: '#kw'});
      //       expect(htmlModal.length).toBe(1);
      //       const eleOperatorModel = {
      //             selector: htmlModal[0].elementSelectKey,
      //             eventType: 'Focus'
      //       }
      //       const htmlModal1 = await puppeteerTool.operator(eleOperatorModel,{select: '.s_ipt_wr'});
      //       expect(htmlModal).toBeDefined();
      //       expect(htmlModal1[0].className).toBe('bg s_ipt_wr quickdelete-wrap ipthover iptfocus');
      // })

      // test('test shotEle', async ()=>{
      //       // await puppeteerTool.shotEle({path: '1.png'})
      //       const htmlModal = await puppeteerTool.getEleModal({ select: '.mnav'});
      //       const eleOperatorModel = {
      //             selector: htmlModal[1].elementSelectKey,
      //             eventType: 'Hover'
      //       }
      //       await puppeteerTool.operator(eleOperatorModel);
      //       await puppeteerTool.shotEle({path: '1-1.png'})
      // })

      test('test requestfinish', async ()=>{
            jest.setTimeout(10000);
            const htmlModal = await puppeteerTool.getEleModal({ select: '#kw'});
            const eleOperatorModel = {
                  selector: htmlModal[0].elementSelectKey,
                  eventType: 'Input',
                  value: "张顺",
                  waitForRequest: true,
                  waitForNavigation: true
            }
            console.log('eleOperatorModel')
            await puppeteerTool.operator(eleOperatorModel);
            console.log('eleOperatorModel finish')
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

      // test('test BlinkDiff', ()=>{
      //       jest.setTimeout(100000);
      //       var diff = new BlinkDiff({
      //             imageAPath: 'http://lc-hagzpvnm.cn-n1.lcfile.com/0f72cfb8ea2ed76bc546.png', // Use file-path
      //             imageBPath: 'http://lc-HAGzPVNM.cn-n1.lcfile.com/009c2d1db5982714ce3d.png',
      //             thresholdType: BlinkDiff.THRESHOLD_PIXEL,
              
      //             threshold: 0.01, // 1% threshold
              
      //             imageOutputPath: './compare2.png',
      //             imageOutputLimit: BlinkDiff.OUTPUT_SIMILAR,
      //             delta: 0
      //         });
              
      //         return diff.runWithPromise().then(value=>{
      //               console.log(diff.hasPassed(value.code) ? "Passed": "Failed");
      //               console.log("succ ",value);
      //         }).catch(error=>{
      //               console.log("err ", error);
      //         })
      // })
})