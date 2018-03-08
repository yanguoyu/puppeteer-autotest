import ElementTypes from './elementTypes.model';

export interface ElementModel {
/**
 * 标签类型
 * 
 * @type {ElementTypes}
 * @memberof ElementModel
 */
labelType: ElementTypes;
/**
 * 
 * @type {String}
 * @memberof ElementModel
 */
className: String;

innerHtml: String;

childrens: Array<ElementModel>;

}