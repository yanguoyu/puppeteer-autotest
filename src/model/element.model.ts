import ElementTypes from './elementTypes.model';
import AttributeTypes from './attributeTypes.model';
import ElementSelectKey from './elementSelectKey.model';

export default class ElementModel{

  constructor(type: ElementTypes){
    this.type = type;
    this.childrens = new Array<ElementModel>();
    this.elementSelectKey = new ElementSelectKey();
  }

  setAttribute(name: String, value: String){
    if(name.toString() in AttributeTypes){
      this[AttributeTypes[name.toString()]] = value;
    }else{
      if(!this.attributes){
        this.attributes = new Map<String, String>();
      }
      this.attributes.set(name, value || true);
    }
  }

  addChildren(typeOrNode: any){
    if( typeOrNode instanceof ElementModel ){
      this.childrens.push(typeOrNode);
      return typeOrNode;
    }else {
      this.childrens.push(new ElementModel(<ElementTypes>typeOrNode));
      return this.childrens[this.childrens.length-1];
    }
  }

  removeChildren(index: number){
    if(this.childrens && this.childrens.length > index){
      this.childrens.splice(index , 1);
    }
  }

  /**
   * 标签类型
   *
   * @type {ElementTypes}
   * @memberof ElementModel
   */
  type: ElementTypes;
  /**
   *
   * @type {String}
   * @memberof ElementModel
   */
  className?: String;

  innerHtml?: String;

  inlineStyle?: String;

  id?: String;

  childrens?: Array<ElementModel>;

  attributes?: Map<String, any>;

  content?: String;

  elementSelectKey: ElementSelectKey
};