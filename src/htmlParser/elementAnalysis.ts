import ElementTypes from '../model/elementTypes.model';
import ElementModel from '../model/element.model';
const htmlparser = require("htmlparser2");

class ElementAnalysis {

  private calCurLevel(curLevel: number, lastLevel: number ,enterEle: boolean){
    if(enterEle){
      if(!curLevel){
        return 1;
      }else if(lastLevel && curLevel < lastLevel){
        return (curLevel*10+lastLevel%10+1)
      }else{
        return curLevel*10
      }
    }else{
      return Number.parseInt((curLevel/10).toString());
    }
  }

  main(html: String){
    let rootElementModel: Array<ElementModel>, curElementNode: ElementModel , eleNodes: Array<ElementModel>;
    rootElementModel = new Array<ElementModel>();
    eleNodes = new Array<ElementModel>();
    var parser = new htmlparser.Parser({
      onopentag: (name, attributes)=>{
        try {
          if(!eleNodes.length){
            rootElementModel.push(new ElementModel(name));
            curElementNode = rootElementModel[rootElementModel.length - 1 ];
            eleNodes.push(curElementNode);
          }else {
            curElementNode = eleNodes[eleNodes.length - 1];
            curElementNode = curElementNode.addChildren(name);
            eleNodes.push(curElementNode);
          }
          Object.keys(attributes).map(value=>{
            curElementNode.setAttribute(value, attributes[value]);
          })
        } catch (error) {
          console.log(JSON.stringify(eleNodes));
          console.log(JSON.stringify(rootElementModel));
          throw new Error(error);
        }
      },
      ontext: function(text){
        if(curElementNode){
          curElementNode.content = text;
        }
      },
      onclosetag: (tagname)=>{
        eleNodes.pop();
        curElementNode = eleNodes[eleNodes.length - 1];
      }
    }, {decodeEntities: true});
    parser.write(html);
    parser.end();
    return rootElementModel;
  }

}

export default ElementAnalysis;