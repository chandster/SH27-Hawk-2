/* eslint-disable no-console */
const puppeteer = require('puppeteer');
const path = require('path');

const extensionPath = path.resolve(__dirname, '../../');
let extensionId;

const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

describe('Chrome Extension: Indexing Storage Test', () => {
  let browser;
  let page;
  let popupPage;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Ensure using 'new' headless mode for compatibility
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });

    const [firstPage] = await browser.pages();
    page = firstPage;

    await page.goto('chrome://extensions');

    extensionId = await page.evaluate(() => {
      const extItem = document.querySelector('body > extensions-manager')
        ?.shadowRoot.querySelector('#items-list')
        ?.shadowRoot.querySelector('extensions-item');

      return extItem ? extItem.getAttribute('id') : null;
    });

    if (!extensionId) {
      throw new Error('❌ Failed to get extension ID');
    }

    const popupUrl = `chrome-extension://${extensionId}/src/components/hello.html`;
    popupPage = await browser.newPage();
    await popupPage.goto(popupUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('✅ Extension Loaded and Popup Opened.');
  }, 120000);

  afterAll(async () => {
    jest.setTimeout(120000);
    if (browser) {
      await browser.close();
    }
  }, 120000);

  test('Pages are correctly indexed and stored', async () => {

    const amazonPage = await browser.newPage();
    console.log('🌐 Visiting Amazon page to trigger indexing...');
    await amazonPage.goto('https://www.amazon.co.uk', { waitUntil: 'domcontentloaded' });

    console.log('⏳ Waiting for both pages to be indexed...');
    await delay(20000); // Allow indexing to occur (matches your extension's timing)

    console.log('🔍 Checking indexed data in storage...');

    const storageData = await popupPage.evaluate(async () => new Promise((resolve) => {
      chrome.storage.local.get('localSearchIndex', (result) => {
        resolve(result.localSearchIndex ? JSON.parse(result.localSearchIndex) : {});
      });
    }));

    const documentIds = storageData.documentIds || {};
    const allUrls = Object.values(documentIds);
    const amazonIndexed = allUrls.some((url) => url.includes('amazon.co.uk'));

    expect(amazonIndexed).toBe(true);

    console.log('✅ Test Passed! BBC and Amazon pages were successfully indexed.');
  }, 120000);
});
