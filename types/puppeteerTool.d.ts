/// <reference types="node" />
import { Browser, Page } from 'puppeteer';
import ElementModel from './model/element.model';
import EleOperatorModel from './model/elementOperator.model';
import EleEventTypes from './model/eleEventTypes.model';
import ElementSelectKey from './model/elementSelectKey.model';
/**
 *
 * @class browserBase
 */
declare class puppeteerTool {
    constructor(url: String);
    page: Page;
    browser: Browser;
    url: String;
    eventFunMap: Map<EleEventTypes, Function>;
    private init();
    private getErrorInfo(selector);
    private getEleHandle(selector);
    clearAll(): Promise<void>;
    getEleModal(selector?: ElementSelectKey): Promise<Array<ElementModel>>;
    shotEle(options: any, selector?: ElementSelectKey): Promise<Buffer>;
    waitForRequestPromise(waitForRequest: Boolean, returnRes: any): Promise<any>;
    operator(eleOperatorModel: EleOperatorModel, selector?: ElementSelectKey, regetEle?: boolean): Promise<Array<ElementModel>>;
    private createOperator(operator, needValue?);
}
export default puppeteerTool;
