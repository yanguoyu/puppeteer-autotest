import { ElementAnalysis } from '../js'
import ElementModel from '../js/model/element.model';
import ElementTypes from '../js/model/elementTypes.model'

const html = "<body id = '1' class='1c'>" + 
"<div id='10' class='10c'>"+ 
  "<div id='100' class='100c'>"+ 
    "<span id='1000' class='1000c'>1-10-100-1000 span</span>"+ 
    "<span id='1001' class='1001c'>1-10-100-1001 span</span>"+ 
    "<span id='1002' class='1002c'>1-10-100-1002 span</span>"+ 
    "<span id='1003' class='1003c'>1-10-100-1003 span</span>"+ 
    "<span id='1004' class='1004c'>1-10-100-1004 span</span>"+ 
    "<span id='1005' class='1005c'>1-10-100-1005 span</span>"+ 
    "<span id='1006' class='1006c'>1-10-100-1006 span</span>"+ 
    "<span id='1007' class='1007c'>1-10-100-1007 span</span>"+ 
    "<span id='1008' class='1008c'>1-10-100-1008 span</span>"+ 
    "<span id='1009' class='1009c'>1-10-100-1009 span</span>"+ 
    "<span id='1010' class='1010c'>1-10-100-1010 span</span>"+ 
    "<span id='1011' class='1011'>1-10-100-1011 span</span>"+ 
    "<span id='1012' class='1012c'>1-10-100-1012 span</span>"+ 
  "</div>"+ 
  "<div id='101'><span id='1010'></span></div>"+
"</div>"+ 
"<div id= '11' class='11c'><span disabled data-grid='dataGrid'></span>\
1-11 div</div><li id='12' class = '12c'><span>120</span>12 li</li></body>";
const elementAnalysis = new ElementAnalysis();
let res;

beforeAll(()=>{
  res = elementAnalysis.main(html);
  res = res[0];
})

describe("test class ElementAnalysis", ()=>{

  test('test basic', () => {
    const rootElm = res;
    expect(rootElm).not.toBeNull();
    expect(rootElm.type).toBe(ElementTypes.body);
    expect(rootElm.className).toBe('1c');
    expect(rootElm.id).toBe('1');
  });

  test('test brother node', () => {
    const firstDiv = res.childrens[0];
    expect(firstDiv).not.toBeNull();
    expect(firstDiv.type).toBe(ElementTypes.div);
    expect(firstDiv.className).toBe('10c');
    expect(firstDiv.id).toBe('10');
    expect(firstDiv.content).toBeUndefined();
  });

  test('test brother node', () => {
    const firstDiv = res.childrens[1];
    expect(firstDiv).not.toBeNull();
    expect(firstDiv.type).toBe(ElementTypes.div);
    expect(firstDiv.className).toBe('11c');
    expect(firstDiv.id).toBe('11');
    expect(firstDiv.content).toBe('1-11 div');
  });

  test('test child length', () => {
    const child = res.childrens[0] && res.childrens[0].childrens;
    expect(child).not.toBeNull();
    expect(child.length).toBe(2);
    const childChild = child[0].childrens;
    expect(childChild.length).toBe(13);
  });

  test('test no match node', () => {
    const noMatchEle = res.childrens[2];
    expect(noMatchEle).not.toBeNull();
    expect(noMatchEle.type).toBe('li');
    expect(noMatchEle.className).toBe('12c');
    expect(noMatchEle.id).toBe('12');
    expect(noMatchEle.content).toBe('12 li');
  });

  test('test other attribute', ()=>{
    const testAttEle = res.childrens[1].childrens[0];
    expect(testAttEle).not.toBeNull();
    expect(testAttEle.type).toBe(ElementTypes.span);
    expect(testAttEle.attributes.get('disabled')).toBeTruthy();
    expect(testAttEle.attributes.get('data-grid')).toBe('dataGrid');
    expect(testAttEle.attributes.get('noexit')).toBeUndefined();
  })
  
})