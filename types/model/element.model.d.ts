import ElementTypes from './elementTypes.model';
import ElementSelectKey from './elementSelectKey.model';
export default class ElementModel {
    constructor(type: ElementTypes);
    setAttribute(name: String, value: String): void;
    addChildren(typeOrNode: any): ElementModel;
    removeChildren(index?: number): void;
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
    elementSelectKey: ElementSelectKey;
}
