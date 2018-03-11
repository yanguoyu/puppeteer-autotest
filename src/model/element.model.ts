import ElementTypes from './elementTypes.model';
import AttributeTypes from './attributeTypes.model';

export default class ElementModel{

  constructor(type: ElementTypes){
    this.type = type;
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
};