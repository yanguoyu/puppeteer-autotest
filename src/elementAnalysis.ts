import ElementTypes from './model/elementTypes.model';
import ElementModel from './model/element.model';
const htmlparser = require('htmlparser2');

class ElementAnalysis {
  constructor() {
    this.rootElementModel = new Array<ElementModel>();
    this.eleNodes = new Array<ElementModel>();
    this.selectKeyMap = new Map<String, Number>();
  }

  private rootElementModel: Array<ElementModel>;
  private curElementNode: ElementModel;
  private eleNodes: Array<ElementModel>;
  private eleNodeSelect: String;
  private selectKeyMap: Map<String, Number>;
  private preSelector: String;

  private onOpenTag = (name, attributes) => {
    try {
      const newEle = new ElementModel(name);
      this.updateCurSelect(true, name);
      let curSelectIndex = 0;
      if(this.selectKeyMap.has(this.eleNodeSelect)){
        curSelectIndex = <number>this.selectKeyMap.get(this.eleNodeSelect) + 1;
      }
      this.selectKeyMap.set(this.eleNodeSelect, curSelectIndex);
      newEle.elementSelectKey.select = this.eleNodeSelect.toString();
      newEle.elementSelectKey.sameSelectIndex = curSelectIndex;
      if (this.curElementNode) {
        this.curElementNode.addChildren(newEle);
      } else {
        this.rootElementModel.push(newEle);
      }
      this.eleNodes.push(newEle);
      this.curElementNode = newEle;
      Object.keys(attributes).map(value => {
        this.curElementNode.setAttribute(value, attributes[value]);
      });
    } catch (error) {
      console.log(JSON.stringify(this.eleNodes));
      console.log(JSON.stringify(this.rootElementModel));
      throw new Error(error);
    }
  };

  private onText = text => {
    if (this.curElementNode) {
      this.curElementNode.content = text;
    }
  };

  private onCloseTag = tagName => {
    this.eleNodes.pop();
    this.updateCurEle();
    this.updateCurSelect(false);
  };

  private updateCurEle() {
    if (this.eleNodes.length) {
      this.curElementNode = this.eleNodes[this.eleNodes.length - 1];
    } else {
      this.curElementNode = null;
    }
  }

  private updateCurSelect(addOrMove: boolean, curType?: String){
    if(addOrMove){
      if(!this.eleNodeSelect){
        this.eleNodeSelect = this.preSelector || curType;
      }else {
        this.eleNodeSelect += ('>' + curType);
      }
    }else if(this.eleNodeSelect){
      const lastIndex = this.eleNodeSelect.lastIndexOf('>');
      if(lastIndex !== -1){
        this.eleNodeSelect = this.eleNodeSelect.substr(0, lastIndex);
      }else{
        this.eleNodeSelect = null;
      }
    }
  }

  main(html: String, preSelector?: String): Array<ElementModel> {
    this.preSelector = preSelector;
    const parser = new htmlparser.Parser(
      {
        onopentag: this.onOpenTag,
        ontext: this.onText,
        onclosetag: this.onCloseTag
      },
      { decodeEntities: true }
    );
    parser.write(html);
    parser.end();
    return this.rootElementModel;
  }
}

export default ElementAnalysis;
