const puppeteer = require('puppeteer');

const EXTENSION_PATH = process.cwd();
let EXTENSION_ID;
let browser;
let page;
const TESTDATA = 'tests/taskData.json';

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  page = await browser.newPage();
  await page.goto('chrome://extensions');

  EXTENSION_ID = await page.evaluate(() => {
    const extensionsItemElement = document.querySelector('body > extensions-manager')
      ?.shadowRoot.querySelector('#items-list')
      ?.shadowRoot.querySelector('extensions-item');
    return extensionsItemElement ? extensionsItemElement.getAttribute('id') : null;
  });
});

afterEach(async () => {
  await browser.close();
  browser = undefined;
});

test('Test the restore of Index', async () =>{
    await page.goto(`chrome-extension://${EXTENSION_ID}/settings.html`);
    const fileInputSelector = '#jsonIndexInput';
    const filePath = TESTDATA;

    await page.waitForSelector(fileInputSelector);
    const input = await page.$(fileInputSelector);
    await input.uploadFile(filePath);

    await page.waitForTimeout(2000);

    const updatedIndex = await page.evaluate(() => new Promise((resolve) => {
      chrome.storage.local.get('indexed', (result) => {
        resolve(result.indexed);
      });
    }));

    expect(updatedIndex).toMatchObject({
      "corpus": [
        {
          "body": "Skip main content Deliver Departments Arts & Crafts Automotive Baby Beauty & Personal Care Books Boys' Fashion Computers Deals Digital Music Electronics Girls' Fashion Health & Household Home & Kitchen Industrial &  Ktion  – right door Inc. its affiliates",
          "id": 1,
          "title": "Amazon.com. Spend less. Smile more.",
          "url": "https://www.amazon.com/"
        }
      ],
      "links": [
        "https://www.amazon.com/"
      ]
    });
});

test('Test the restore of notes', async () => {
  await page.goto(`chrome-extension://${EXTENSION_ID}/settings.html`);
  const fileInputSelector = '#jsonNoteInput';
  const filePath = TESTDATA;

  await page.waitForSelector(fileInputSelector);
  const input = await page.$(fileInputSelector);
  await input.uploadFile(filePath);

  await page.waitForTimeout(2000);

  const updatedNotes = await page.evaluate(() => new Promise((resolve) => {
    chrome.storage.local.get('notes', (result) => {
      resolve(result.notes);
    });
  }));
  expect(updatedNotes).toMatchObject([
    {
      content: 'Test Note ',
      id: '1708876013999',
      title: 'Test Note',
    },
  ]);
});

test('Test the restore of Tags and Tasks', async () => {
  await page.goto(`chrome-extension://${EXTENSION_ID}/settings.html`);
  const fileInputSelector = '#jsonInput';
  const filePath = TESTDATA;

  await page.waitForSelector(fileInputSelector);
  const input = await page.$(fileInputSelector);
  await input.uploadFile(filePath);

  await page.waitForTimeout(2000);

  const updatedTags = await page.evaluate(() => new Promise((resolve) => {
    chrome.storage.local.get('tags', (result) => {
      resolve(result.tags);
    });
  }));

  const updatedTasks = await page.evaluate(() => new Promise((resolve) => {
    chrome.storage.local.get('tasks', (result) => {
      resolve(result.tasks);
    });
  }));

  expect(updatedTags['1708875962865-169']).toMatchObject({ tagColour: '#dc143c', tagName: 'Test Tag' });
  expect(updatedTasks).toMatchObject({
    '1708875969067Test Task 1': {
      description: 'Test Description',
      due: '2024-02-25T15:45:00.000Z',
      id: '1708875969067Test Task 1',
      recentlyDeleted: false,
      scheduledDeletion: '',
      tags: ['1708875962865-169'],
      title: 'Test Task 1',
    },
    '1708875985100Delete Test Task': {
      description: 'Delete Task',
      due: '2024-02-25T15:46:00.000Z',
      id: '1708875985100Delete Test Task',
      recentlyDeleted: true,
      scheduledDeletion: '2024-03-26T15:46:27.781Z',
      tags: ['1708875962865-169'],
      title: 'Delete Test Task',
    },
  });
});
