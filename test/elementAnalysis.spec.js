import { ElementAnalysis } from '../js'
import ElementModel from '../js/model/element.model';
import ElementTypes from '../js/model/elementTypes.model'

const html = "<body id = '1' class='1c'>" + 
"<div id='10' class='10c'>"+ 
  "<div id='100' class='100c'>"+ 
    "<span id='1000' class='1000c'>1-10-100-1000 span</span>"+ 
    "<span id='1001' class='1001c'>1-10-100-1001 span</span>"+ 
    "<span id='1002' class='1002c'>1-10-100-1002 span</span>"+ 
  "</div>"+ 
  "<div id='101'><span id='1010'></span></div>"+
"</div>"+ 
"<div id= '11' class='11c'><span disabled data-grid='dataGrid'></span>\
1-11 div</div><li id='12' class = '12c'><span>120</span>12 li</li></body>";
const elementAnalysis = new ElementAnalysis();
let res;

beforeAll(()=>{
  res = elementAnalysis.main(html);
  console.log(res);
})

describe("test class ElementAnalysis", ()=>{

  test('test basic', () => {
    const bodyEle = res.get(1);
    expect(bodyEle).not.toBeNull();
    expect(bodyEle.type).toBe(ElementTypes.body);
    expect(bodyEle.className).toBe('1c');
    expect(bodyEle.id).toBe('1');
  });

  test('test brother node', () => {
    const firstDiv = res.get(10)
    expect(firstDiv).not.toBeNull();
    expect(firstDiv.type).toBe(ElementTypes.div);
    expect(firstDiv.className).toBe('10c');
    expect(firstDiv.id).toBe('10');
    expect(firstDiv.content).toBeUndefined();
  });

  test('test brother node', () => {
    const firstDiv = res.get(11)
    expect(firstDiv).not.toBeNull();
    expect(firstDiv.type).toBe(ElementTypes.div);
    expect(firstDiv.className).toBe('11c');
    expect(firstDiv.id).toBe('11');
    expect(firstDiv.content).toBe('1-11 div');
  });

  test('test brother node', () => {
    const brotherEle = res.get(1002)
    expect(brotherEle).not.toBeNull();
    expect(brotherEle.className).toBe('1002c');
    expect(brotherEle.id).toBe('1002');
    expect(brotherEle.content).toBe('1-10-100-1002 span');
  });

  test('test no match node', () => {
    const noMatchEle = res.get(12);
    expect(noMatchEle).not.toBeNull();
    expect(noMatchEle.type).toBe('li');
    expect(noMatchEle.className).toBe('12c');
    expect(noMatchEle.id).toBe('12');
    expect(noMatchEle.content).toBe('12 li');
  });

  test('test child node', () => {
    const childEle = res.get(100);
    expect(childEle).not.toBeNull();
    expect(childEle.type).toBe(ElementTypes.div);
    expect(childEle.className).toBe('100c');
    expect(childEle.id).toBe('100');
    expect(childEle.content).toBeUndefined();
  });

  test('test child child node', () => {
    const childChildEle = res.get(1000);
    expect(childChildEle).not.toBeNull();
    expect(childChildEle.type).toBe(ElementTypes.span);
    expect(childChildEle.className).toBe('1000c');
    expect(childChildEle.id).toBe('1000');
    expect(childChildEle.content).toBe('1-10-100-1000 span');
  });

  test('test child brother node', () => {
    const childChildEle = res.get(120);
    expect(childChildEle).not.toBeNull();
    expect(childChildEle.content).toBe('120');
  });

  test('test other attribute', ()=>{
    const testAttEle = res.get(110);
    expect(testAttEle).not.toBeNull();
    expect(testAttEle.type).toBe(ElementTypes.span);
    expect(testAttEle.attributes.get('disabled')).toBeTruthy();
    expect(testAttEle.attributes.get('data-grid')).toBe('dataGrid');
    expect(testAttEle.attributes.get('noexit')).toBeUndefined();
  })
  
})