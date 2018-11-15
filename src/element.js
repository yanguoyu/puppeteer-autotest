import { ElementSelectKey } from './models';

/**
 *
 * 元素的model
 * @export
 * @class ElementModel
 */
export default class ElementModel{

  constructor(type){
    this.type = type;
    this.childrens = [];
    this.attributes = {};
    this.elementSelectKey = new ElementSelectKey();
  }

  /**
   *
   *
   * @param {*} name 属性名称
   * @param {*} value 属性值
   * @memberof ElementModel
   */
  setAttribute(name, value){
    this.attributes = {
      ...this.attributes,
      [name]: value
    };
  }

  addChildren(node){
    this.childrens.push(node);
    return node;
  }

  addChildrenByType(type) {
    this.childrens.push(new ElementModel(type));
    return this.childrens[this.childrens.length-1];
  }

  removeChildren(index){
    if (this.childrens){
      if (index === undefined || index === null){
        this.childrens.pop();
      }
      else if(this.childrens.length > index){
        this.childrens.splice(index , 1);
      }
    }
  }
}
