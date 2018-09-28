import ElementModel from './model/element.model';
declare class ElementAnalysis {
    constructor();
    private rootElementModel;
    private curElementNode;
    private eleNodes;
    private eleNodeSelect;
    private selectKeyMap;
    private preSelector;
    private onOpenTag;
    private onText;
    private onCloseTag;
    private updateCurEle();
    private updateCurSelect(addOrMove, curType?);
    main(html: String, preSelector?: String): Array<ElementModel>;
}
export default ElementAnalysis;
