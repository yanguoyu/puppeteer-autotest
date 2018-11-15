import ElementModel from './element';
import htmlparser from 'htmlparser2';

export default class ElementAnalysis {
  constructor() {
    this.rootElementModel = []
    this.eleNodes = []
    this.selectKeyMap = {};
    this.curElementNode = null;
    this.eleNodes = [];
    this.eleNodeSelect = undefined;
    this.selectKeyMap = {};
    this.preSelector = undefined;
  }

  onOpenTag = (name, attributes) => {
    try {
      const newEle = new ElementModel(name);
      this.updateCurSelect(true, name);
      let curSelectIndex = 0;
      if(this.selectKeyMap[this.eleNodeSelect] !== null && this.selectKeyMap[this.eleNodeSelect] !== undefined){
        curSelectIndex = this.selectKeyMap[this.eleNodeSelect] + 1;
      }
      this.selectKeyMap[this.eleNodeSelect] = curSelectIndex;
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

  onText = text => {
    if (this.curElementNode) {
      this.curElementNode.content = text;
    }
  };

  onCloseTag = () => {
    this.eleNodes.pop();
    this.updateCurEle();
    this.updateCurSelect(false);
  };

  updateCurEle() {
    if (this.eleNodes.length) {
      this.curElementNode = this.eleNodes[this.eleNodes.length - 1];
    } else {
      this.curElementNode = null;
    }
  }

  updateCurSelect(addOrMove, curType){
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

  main(html, preSelector) {
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
