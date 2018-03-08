import hello from './hello'
import { connect, launch } from 'puppeteer';

function test1(){
  (async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.screenshot({path: 'example.png'});
  
    await browser.close();
  })();
}

export {
  hello,
  test1
}
