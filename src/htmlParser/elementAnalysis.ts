import ElementTypes from '../model/elementTypes.model';
import ElementModel from '../model/element.model';
const htmlparser = require("htmlparser2");

class ElementAnalysis {

  calCurLevel(curLevel: number, lastLevel: number ,enterOrLeave: boolean){
    if(enterOrLeave){
      if(!curLevel){
        return 1;
      }else if(lastLevel){
        return (curLevel*10+lastLevel%10+1)
      }else{
        return curLevel*10
      }
    }else{
      return Number.parseInt((curLevel/10).toFixed(0));
    }
  }

  main(html: String){
    let elementMap = new Map<String, ElementModel>();
    let curLevel: number, lastLevel: number;
    var parser = new htmlparser.Parser({
      onopentag: (name, attributes)=>{
        curLevel = this.calCurLevel(curLevel, lastLevel, true);
        if(name in ElementTypes){
          elementMap[curLevel] = new ElementModel(name);
          Object.keys(attributes).map(value=>{
            elementMap[curLevel].setAttribute(value, attributes[value]);
          })
        }
      },
      ontext: function(text){
        if(elementMap[curLevel]){
          elementMap[curLevel].content = text;
        }
      },
      onclosetag: (tagname)=>{
        if(tagname in ElementTypes){
          lastLevel = curLevel;
          curLevel = this.calCurLevel(curLevel, lastLevel, false);
        }
      }
    }, {decodeEntities: true});
    parser.write(html);
    parser.end();
    return elementMap;
  }

}

export default ElementAnalysis;