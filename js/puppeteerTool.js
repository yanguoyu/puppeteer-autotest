var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { launch } from 'puppeteer';
import EleEventTypes from './model/eleEventTypes.model';
import ElementAnalysis from './elementAnalysis';
/**
 *
 * @class browserBase
 */
class puppeteerTool {
    constructor(url) {
        this.eventFunMap = new Map();
        this.url = url;
        this.eventFunMap.set(EleEventTypes.Click, this.createOperator('click', true));
        this.eventFunMap.set(EleEventTypes.Hover, this.createOperator('hover'));
        this.eventFunMap.set(EleEventTypes.Focus, this.createOperator('focus'));
        this.eventFunMap.set(EleEventTypes.Input, this.createOperator('type', true));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            this.page = yield this.browser.newPage();
            yield this.page.goto(this.url.toString(), { waitUntil: ['load', 'domcontentloaded'] });
        });
    }
    getErrorInfo(selector) {
        const curUrl = this.page.url();
        return `在${curUrl}这个页面，使用document.querySelectorAll(${selector.select})查找到的元素没有第${selector.sameSelectIndex}个`;
    }
    getEleHandle(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const eleHandle = yield this.page.$$(selector.select);
            if (selector.sameSelectIndex !== null && selector.sameSelectIndex !== undefined) {
                if (eleHandle.length > selector.sameSelectIndex) {
                    return eleHandle[selector.sameSelectIndex];
                }
                else {
                    throw new Error(this.getErrorInfo(selector));
                }
            }
            return eleHandle;
        });
    }
    clearAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.browser) {
                yield this.browser.close();
            }
        });
    }
    getEleModal(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.page) {
                yield this.init();
            }
            selector = selector || {
                select: 'body',
                sameSelectIndex: null
            };
            let eleHandle = yield this.getEleHandle(selector);
            let html = '';
            const eleHandleLength = eleHandle.length;
            for (let index = 0; index < eleHandleLength; ++index) {
                html += yield this.page.evaluate(body => body.outerHTML, eleHandle[index]);
            }
            return new ElementAnalysis().main(html, selector.select);
        });
    }
    shotEle(options, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.page) {
                yield this.init();
            }
            if (selector && selector.select) {
                const eleHandle = yield this.getEleHandle(selector);
                return yield eleHandle.screenshot(options);
            }
            else {
                return yield this.page.screenshot(options);
            }
        });
    }
    waitForRequestPromise(waitForRequest, returnRes) {
        return __awaiter(this, void 0, void 0, function* () {
            let newPromise = new Promise((resolve, reject) => {
                if (waitForRequest === true) {
                    this.page.on('requestfinished', () => {
                        resolve(returnRes);
                    });
                }
                else {
                    resolve(returnRes);
                }
            });
            return newPromise;
        });
    }
    operator(eleOperatorModel, selector = null, regetEle = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.page) {
                yield this.init();
            }
            if (this.eventFunMap.has(eleOperatorModel.eventType)) {
                yield this.eventFunMap.get(eleOperatorModel.eventType)(eleOperatorModel);
            }
            if (regetEle === false && selector === null) {
                return null; //await this.waitForRequestPromise(eleOperatorModel.waitForRequest, null);
            }
            const res = this.getEleModal(selector);
            return res; //await this.waitForRequestPromise(eleOperatorModel.waitForRequest, res);
        });
    }
    createOperator(operator, needValue) {
        return (eleOperatorModel) => __awaiter(this, void 0, void 0, function* () {
            let allWaitPromise = [];
            //如果有页面跳转或者reload
            if (eleOperatorModel.waitForNavigation) {
                const waitOptions = {
                    timeout: 10000,
                    waitUntil: 'networkidle0'
                };
                allWaitPromise.push(this.page.waitForNavigation(waitOptions));
            }
            if (eleOperatorModel.selector.sameSelectIndex) {
                const eleHandles = yield this.getEleHandle(eleOperatorModel.selector);
                allWaitPromise.push(needValue ? eleHandles[operator](eleOperatorModel.value) : eleHandles[operator]());
            }
            else {
                allWaitPromise.push(needValue ?
                    this.page[operator](eleOperatorModel.selector.select, eleOperatorModel.value) :
                    this.page[operator](eleOperatorModel.selector.select));
            }
            return Promise.all(allWaitPromise);
        });
    }
}
export default puppeteerTool;
