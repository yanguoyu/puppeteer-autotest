import AttributeTypes from './attributeTypes.model';
import ElementSelectKey from './elementSelectKey.model';
export default class ElementModel {
    constructor(type) {
        this.type = type;
        this.childrens = new Array();
        this.elementSelectKey = new ElementSelectKey();
    }
    setAttribute(name, value) {
        if (name.toString() in AttributeTypes) {
            this[AttributeTypes[name.toString()]] = value;
        }
        else {
            if (!this.attributes) {
                this.attributes = new Map();
            }
            this.attributes.set(name, value || true);
        }
    }
    addChildren(typeOrNode) {
        if (typeOrNode instanceof ElementModel) {
            this.childrens.push(typeOrNode);
            return typeOrNode;
        }
        else {
            this.childrens.push(new ElementModel(typeOrNode));
            return this.childrens[this.childrens.length - 1];
        }
    }
    removeChildren(index) {
        if (this.childrens) {
            if (!index) {
                this.childrens.pop();
            }
            else if (this.childrens.length > index) {
                this.childrens.splice(index, 1);
            }
        }
    }
}
;
