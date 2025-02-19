/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const path = require('path');

const extensionPath = path.resolve(__dirname, '../../');
let extensionId;

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

describe('Chrome Extension: Edit Note Test', () => {
  let browser;
  let page;
  let popupPage;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });

    page = await browser.newPage();
    await page.goto('chrome://extensions');

    extensionId = await page.evaluate(() => {
      const extensionsItemElement = document.querySelector('body > extensions-manager')
        ?.shadowRoot.querySelector('#items-list')
        ?.shadowRoot.querySelector('extensions-item');

      return extensionsItemElement ? extensionsItemElement.getAttribute('id') : null;
    });

    const popupUrl = `chrome-extension://${extensionId}/src/components/hello.html`;
    popupPage = await browser.newPage();
    await popupPage.goto(popupUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('✅ Extension Popup Opened Successfully!');
  }, 60000);

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test(
    'User can edit a note',
    async () => {
      console.log('📝 Adding a note before editing...');
      await popupPage.type('#noteinput', 'Original Note');
      await popupPage.click('#addnote');
      await delay(2000);

      console.log('✏ Clicking the first note before editing...');
      await popupPage.waitForSelector('#tasks-display tr', { timeout: 10000 });
      await popupPage.click('#tasks-display tr:first-child'); // Click the first note

      console.log('✏ Waiting for input field to be editable...');
      await popupPage.waitForSelector('#noteinput', { timeout: 10000 });

      // Get the original note text
      const originalText = await popupPage.$eval('#noteinput', (el) => el.value);
      console.log('📝 Original Note:', originalText);

      console.log('⌨ Editing the note...');
      await popupPage.evaluate(() => document.querySelector('#noteinput').value = '');
      await popupPage.type('#noteinput', 'Updated Note');

      console.log('🖱 Clicking the save button...');
      await popupPage.click('#addnote');
      await delay(2000);

      console.log('🔄 Reloading the popup...');
      await popupPage.reload({ waitUntil: 'load' });
      await delay(3000);

      const notesList = await popupPage.evaluate(() => Array.from(document.querySelectorAll('#tasks-display tr')).map((el) => el.innerText));

      console.log('📝 Notes in UI After Reload:', notesList);
      expect(notesList.some((text) => text.includes('Updated Note'))).toBe(true);

      console.log('✅ Test Passed! The note was successfully edited.');
    },
    60000,
  );
});
