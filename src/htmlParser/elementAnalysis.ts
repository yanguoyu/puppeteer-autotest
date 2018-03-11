import ElementTypes from '../model/elementTypes.model';
import ElementModel from '../model/element.model';
const htmlparser = require("htmlparser2");

class ElementAnalysis {

  calCurLevel(curLevel: number, lastLevel: number ,enterEle: boolean){
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
    let elementMap = new Map<Number, ElementModel>();
    let curLevel: number, lastLevel: number;
    var parser = new htmlparser.Parser({
      onopentag: (name, attributes)=>{
        curLevel = this.calCurLevel(curLevel, lastLevel, true);
        elementMap.set(curLevel ,new ElementModel(name));
        Object.keys(attributes).map(value=>{
          elementMap.get(curLevel).setAttribute(value, attributes[value]);
        })
      },
      ontext: function(text){
        if(elementMap.has(curLevel)){
          elementMap.get(curLevel).content = text;
        }
      },
      onclosetag: (tagname)=>{
          lastLevel = curLevel;
          curLevel = this.calCurLevel(curLevel, lastLevel, false);
      }
    }, {decodeEntities: true});
    parser.write(html);
    parser.end();
    return elementMap;
  }

}

export default ElementAnalysis;