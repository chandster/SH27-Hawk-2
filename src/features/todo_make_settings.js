const defaultRegexList = [
  '^https://[^/]+\\.amazon\\.com/.*$',
  '^https://atoz\\.amazon\\.work/.*$',
  '^https://quip-amazon\\.com/.*$',
  '^https://quip\\.com/.*$',
];

let curTags = null;
let curNotes = null;
let curTasks = null;
let curIndexEntries = null;
const maxStringLength = 64;
const taskList = $('#selective-task-list');

function normalizeURL(url) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function loadCustomBackground() {
  chrome.storage.local.get('bg', (result) => {
    if (!$('body').hasClass('popup') && !$('body').hasClass('settings-body')) {
      if (result.bg !== '' && result.bg !== undefined) {
        $('body').css('background-image', `url(${result.bg})`);
      } else {
        $('body').css('background-image', 'var(--comic-bg)');
      }
    }
  });
}
function adjustColorBrightness(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);

  const R = Math.min(255, Math.max(0, Math.floor(num / 65536) + amt));
  const G = Math.min(255, Math.max(0, Math.floor((num / 256) % 256) + amt));
  const B = Math.min(255, Math.max(0, (num % 256) + amt));

  // Convert back to hex with padding
  const rHex = R.toString(16).padStart(2, '0');
  const gHex = G.toString(16).padStart(2, '0');
  const bHex = B.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`.toUpperCase();
}

function loadAppearance(usepreference) {
  $('.settings-container').addClass('changing');
  chrome.storage.local.get('theme', (result) => {
    let decision = result.theme;
    if (usepreference === true && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        decision = 'dark';
      } else {
        decision = 'light';
      }
    }
    if (decision === 'dark') {
      $('html').addClass('dark');
      $('html').attr('data-bs-theme', 'dark');
    } else {
      $('html').removeClass('dark');
      $('html').attr('data-bs-theme', 'light');
    }
    loadCustomBackground();
  });
  setTimeout(() => {
    $('.settings-container').removeClass('changing');
  }, 500);
  chrome.storage.local.get('themeColor', (result) => {
    if (result.themeColor) {
      document.documentElement.style.setProperty('--primary-color', result.themeColor);
      document.documentElement.style.setProperty('--accent-color', result.themeColor);
      document.documentElement.style.setProperty('--primary-hover', adjustColorBrightness(result.themeColor, -10));
      const alpha = '0.1';
      document.documentElement.style.setProperty('--ui-pane-color', `${result.themeColor}${alpha}`);
      document.documentElement.style.setProperty('--settings-section-color', `${result.themeColor}${alpha}`);
    }
  });
}

const noneMsg = `
  <div class="row justify-content-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="warn-2 mt-0 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98
           1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 
           1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>
  </div>
  <div class="row justify-contents-center text-center">
      <div class="warn-text-2">
      </div>
  </div>
`;

const noSites = 'No site rules found.';
const noUrls = 'No URL rules found.';
const noStringMatches = 'No string match rules found.';
const noRegex = 'No RegEx rules found';

function hideLists() {
  taskList.hide();
}

function removeHash() {
  window.history.pushState('', document.title, window.location.pathname + window.location.search);
}

function exportAll() {
  chrome.storage.local.get(null, (data) => {
    // Create a clean copy of the data
    const exportData = { ...data };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'hawk_backup_data.json';
    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href);
  });
}

function updateWallpaperPreview() {
  chrome.storage.local.get('bg', (result) => {
    const imgElement = $('.settings-wallpaper-preview img');
    if (result.bg !== '' && result.bg !== undefined) {
      imgElement.attr('src', result.bg);
    } else {
      const imgSrc = '../../assets/images/comic_bg.png';
      imgElement.attr('src', imgSrc);
    }
  });
}

function constrainStringLength(inputString, length) {
  return inputString.length > length ? `${inputString.substring(0, length)}...` : inputString;
}

function overwriteTasks(tasks) {
  const currentDate = new Date();
  const tasksArray = Object.values(tasks);
  const filteredTasks = tasksArray.filter((task) => !task.recentlyDeleted || (task.scheduledDeletion && new Date(task.scheduledDeletion) > currentDate));

  const newTasks = {};
  filteredTasks.forEach((task) => {
    newTasks[task.id] = task;
  });

  // Instead of reassigning `tasks`, create a new variable
  const updatedTasks = newTasks;

  chrome.storage.local.set({ tasks: updatedTasks }, () => {
    chrome.alarms.clearAll();
    $.each(filteredTasks, (key, task) => {
      if (task.recentlyDeleted) {
        const alarmName = `${task.id}_deletion_alarm`;
        const deletionDate = new Date(task.scheduledDeletion);
        chrome.alarms.create(alarmName, { when: deletionDate.getTime() });
      } else {
        const taskDue = new Date(task.due);
        if (taskDue > currentDate) {
          chrome.alarms.create(task.id, { when: taskDue.getTime() });
        }
      }
    });
  });
}

function restoreLastTitles(lastTitles) {
  chrome.storage.local.set({ allLastTitles: lastTitles }, () => {
  });
}

function restoreTags(tagsObj) {
  chrome.storage.local.set({ tags: tagsObj }, () => {
  });
}

function retrieveSitesList() {
  chrome.storage.local.get(['allowedSites'], (result) => {
    const storedSiteList = result.allowedSites;
    const sitesList = storedSiteList || [];
    $('#sites-list').empty();
    if (sitesList.length > 0) {
      Object.values(sitesList).forEach((expr) => {
        $('#sites-list').append(`
          <div class="row sites-item align-items-center mt-2"> 
              <div class="col-8">${expr}</div>
              <div class="col-4 d-flex justify-content-end">
                  <button class="btn btn-danger sites-del" rule-to-del="${expr}" data-bs-toggle="modal" data-bs-target="#deleteRuleModal">
                    Delete
                  </button>
              </div>
          </div>
        `);
      });
    } else {
      $('#sites-list').append(noneMsg).find('.warn-text-2').text(noSites);
    }
  });
}

function retrieveStringMatchesList() {
  chrome.storage.local.get(['allowedStringMatches'], (result) => {
    const storedMatchesList = result.allowedStringMatches;
    const matchesList = storedMatchesList || [];
    $('#string-matches-list').empty();
    if (matchesList.length > 0) {
      Object.values(matchesList).forEach((expr) => {
        $('#string-matches-list').append(`
          <div class="row urls-item align-items-center mt-2"> 
              <div class="col-8">${expr}</div>
              <div class="col-4 d-flex justify-content-end">
                  <button class="btn btn-danger string-matches-del" rule-to-del="${expr}" data-bs-toggle="modal" data-bs-target="#deleteRuleModal">
                    Delete
                  </button>
              </div>
          </div>
        `);
      });
    } else {
      $('#string-matches-list').append(noneMsg).find('.warn-text-2').text(noStringMatches);
    }
  });
}

function retrieveUrlsList() {
  chrome.storage.local.get(['allowedURLs'], (result) => {
    const storedUrlsList = result.allowedURLs;
    const urlsList = storedUrlsList || [];
    $('#urls-list').empty();
    if (urlsList.length > 0) {
      Object.values(urlsList).forEach((expr) => {
        $('#urls-list').append(`
          <div class="row urls-item align-items-center mt-2"> 
              <div class="col-8">${expr}</div>
              <div class="col-4 d-flex justify-content-end">
                  <button class="btn btn-danger urls-del" rule-to-del="${expr}" data-bs-toggle="modal" data-bs-target="#deleteRuleModal">
                    Delete
                  </button>
              </div>
          </div>
        `);
      });
    } else {
      $('#urls-list').append(noneMsg).find('.warn-text-2').text(noUrls);
    }
  });
}

function retrieveRegexList() {
  chrome.storage.local.get(['allowedRegex'], (result) => {
    const storedRegexList = result.allowedRegex;
    const regexList = storedRegexList || [];
    $('#regex-list').empty();
    if (regexList.length > 0) {
      Object.values(regexList).forEach((expr) => {
        $('#regex-list').append(`
          <div class="row regex-item align-items-center mt-2"> 
              <div class="col-8">${expr}</div>
              <div class="col-4 d-flex justify-content-end">
                  <button class="btn btn-danger regex-del" rule-to-del="${expr}" data-bs-toggle="modal" data-bs-target="#deleteRuleModal">
                    Delete
                  </button>
              </div>
          </div>
        `);
      });
    } else {
      $('#regex-list').append(noneMsg).find('.warn-text-2').text(noRegex);
    }
  });
}

function deleteRule(ruleLoc, rule) {
  chrome.storage.local.get([ruleLoc], (result) => {
    const storedList = result[ruleLoc];
    if (storedList) {
      const updatedList = storedList.filter((expr) => expr !== rule);
      chrome.storage.local.set({ [ruleLoc]: updatedList }, () => {
        switch (ruleLoc) {
          case 'allowedSites':
            retrieveSitesList();
            break;
          case 'allowedURLs':
            retrieveUrlsList();
            break;
          case 'allowedRegex':
            retrieveRegexList();
            break;
          case 'allowedStringMatches':
            retrieveStringMatchesList();
            break;
          default:
            break;
        }
      });
    }
  });
}

function showIndexEntries(indexEntries) {
  const selectiveList = $('#index-selection-list');
  selectiveList.empty();

  $.each(indexEntries[0], (key) => {
    selectiveList.append(`
      <div class="row zero-margin zero-padding align-items-center mb-2">
        <input class="d-block backup-checkbox" forIndexEntryId="${key}" type="checkbox"> ${indexEntries[1][key]} <br>
      </div>
    `);
  });
  curIndexEntries = indexEntries;
}

function overwriteIndex(indexArray) {
  chrome.storage.local.get(['indexed'], () => {
    const newIndexed = {
      corpus: indexArray[0],
      links: indexArray[1],
    };
    chrome.storage.local.set({ indexed: newIndexed });
  });
}

function overwriteNotes(notesArray) {
  chrome.storage.local.set({ notes: notesArray }, () => {
  });
}

function showCombinedData(tasksArray, notesArray) {
  const $dataList = $('#data-selection-list');
  $dataList.empty();

  // Show tasks first
  if (tasksArray && tasksArray.length > 0) {
    $dataList.append('<h5>Tasks</h5>');

    tasksArray.forEach((task) => {
      if (task && task.text) {
        const taskItem = $(`
          <div class="selectable-item">
            <input type="checkbox" id="task-${task.id}" class="selection-checkbox task-checkbox" data-id="${task.id}">
            <label for="task-${task.id}" class="selection-label">${task.text.substring(0, maxStringLength)}</label>
          </div>
        `);
        $dataList.append(taskItem);
      }
    });
  }

  // Then show notes
  if (notesArray && notesArray.length > 0) {
    $dataList.append('<h5 class="mt-3">Notes</h5>');

    notesArray.forEach((note) => {
      if (note && note.title) {
        const noteItem = $(`
          <div class="selectable-item">
            <input type="checkbox" id="note-${note.id}" class="selection-checkbox note-checkbox" data-id="${note.id}">
            <label for="note-${note.id}" class="selection-label">${note.title.substring(0, maxStringLength)}</label>
          </div>
        `);
        $dataList.append(noteItem);
      }
    });
  }

  if ((!tasksArray || tasksArray.length === 0) && (!notesArray || notesArray.length === 0)) {
    $dataList.append('<p>No tasks or notes found in the backup file.</p>');
  }
}

function restoreSelectedData() {
  // Get selected tasks
  const selectedTaskIds = [];
  $('.task-checkbox:checked').each(function () {
    selectedTaskIds.push($(this).data('id'));
  });

  // Get selected notes
  const selectedNoteIds = [];
  $('.note-checkbox:checked').each(function () {
    selectedNoteIds.push($(this).data('id'));
  });

  // Restore selected tasks and notes
  if (selectedTaskIds.length > 0 && curTasks) {
    const tasksToRestore = {};
    selectedTaskIds.forEach((id) => {
      const task = curTasks.find((t) => t.id === id);
      if (task) {
        tasksToRestore[id] = task;
      }
    });

    if (Object.keys(tasksToRestore).length > 0) {
      chrome.storage.local.get(['tasks'], (result) => {
        const currentTasks = result.tasks || {};
        const updatedTasks = { ...currentTasks, ...tasksToRestore };
        chrome.storage.local.set({ tasks: updatedTasks });
      });
    }
  }

  // Restore selected notes
  if (selectedNoteIds.length > 0 && curNotes) {
    const notesToRestore = {};
    selectedNoteIds.forEach((id) => {
      const note = curNotes.find((n) => n.id === id);
      if (note) {
        notesToRestore[id] = note;
      }
    });

    if (Object.keys(notesToRestore).length > 0) {
      chrome.storage.local.get(['notes'], (result) => {
        const currentNotes = result.notes || {};
        const updatedNotes = { ...currentNotes, ...notesToRestore };
        chrome.storage.local.set({ notes: updatedNotes });
      });
    }
  }
}

function restoreSelectedIndexEntries() {
  if (curIndexEntries) {
    const toRestore = [[], []];
    const selectiveList = $('#index-selection-list');
    selectiveList.find('.backup-checkbox').each(function _() {
      const elt = $(this);
      if (elt.is(':checked')) {
        const key = elt.attr('forIndexEntryId');
        toRestore[0].push({ ...curIndexEntries[0][key] });
        toRestore[1].push(curIndexEntries[1][key]);
      }
    });
    overwriteIndex(toRestore);
  }
}

if (window.location.href.startsWith(chrome.runtime.getURL(''))) {
  $(() => {
    hideLists();
    retrieveSitesList();
    retrieveUrlsList();
    retrieveStringMatchesList();
    retrieveRegexList();
    setTimeout(() => {
      updateWallpaperPreview();
    }, 100);
    $('#rule-search').on('input', function _() {
      const query = $(this).val();
      $('#urls-list, #sites-list, #string-matches-list, #regex-list').filter(function filterLists() {
        const ruleText = $(this).text();
        const found = ruleText.indexOf(query) > -1;
        $(this).toggle(found);
        return found;
      });
    });

    $('#selection-search').on('input', function _() {
      const query = $(this).val();
      $('#notes-selection-list, #tasks-selection-list, #index-selection-list').find('.row').each((idx, obj) => {
        const checkbox = $(obj);
        const resultText = checkbox.text();
        const found = resultText.indexOf(query) > -1;
        checkbox.toggle(found);
      });
    });

    $(document).on('click', '.sites-del', (event) => {
      const $delBtn = $(event.currentTarget);
      $('#deleteRuleModal').attr('rule-loc', 'allowedSites');
      $('#deleteRuleModal').attr('rule-to-delete', $delBtn.attr('rule-to-del'));
    });

    $(document).on('click', '#sites-tab', () => {
      $('.index-heading').text('Allowed sites');
      $('.index-info').text('Indexing will occur whenever these host names are visited. Enter rules starting "www".');
      $('#addRuleModal').attr('rule-loc', 'allowedSites');
    });

    $(document).on('click', '.urls-del', (event) => {
      const $delBtn = $(event.currentTarget);
      $('#deleteRuleModal').attr('rule-loc', 'allowedURLs');
      $('#deleteRuleModal').attr('rule-to-delete', $delBtn.attr('rule-to-del'));
    });

    $(document).on('click', '#urls-tab', () => {
      $('.index-heading').text('Allowed URLs');
      $('.index-info').text('Indexing will occur whenever these specific URLs are visited.');
      $('#addRuleModal').attr('rule-loc', 'allowedURLs');
    });

    $(document).on('click', '.string-matches-del', (event) => {
      const $delBtn = $(event.currentTarget);
      $('#deleteRuleModal').attr('rule-loc', 'allowedStringMatches');
      $('#deleteRuleModal').attr('rule-to-delete', $delBtn.attr('rule-to-del'));
    });

    $(document).on('click', '.regex-del', (event) => {
      const $delBtn = $(event.currentTarget);
      $('#deleteRuleModal').attr('rule-loc', 'allowedRegex');
      $('#deleteRuleModal').attr('rule-to-delete', $delBtn.attr('rule-to-del'));
    });

    $(document).on('click', '.rule-delete-btn', () => {
      deleteRule($('#deleteRuleModal').attr('rule-loc'), $('#deleteRuleModal').attr('rule-to-delete'));
    });

    $(document).on('click', '#confirm-erase-data-btn', () => {
      chrome.storage.local.clear();
      chrome.alarms.clearAll();
      chrome.storage.local.set({ allowedSites: [] }, () => {
      });

      chrome.storage.local.set({ allowedURLs: [] }, () => {
      });

      chrome.storage.local.set({ allowedStringMatches: [] }, () => {
      });

      chrome.storage.local.set({ allLastTitles: [] }, () => {
      });

      chrome.storage.local.set({ allowedRegex: defaultRegexList }, () => {
        window.location.reload();
      });
    });

    $(document).on('click', '#string-matches-tab', () => {
      $('.index-heading').text('Allowed string matches');
      $('.index-info').text('Indexing will occur whenever the URL contains any one of these strings.');
      $('#addRuleModal').attr('rule-loc', 'allowedStringMatches');
    });

    $(document).on('click', '#regex-tab', () => {
      $('.index-heading').text('Allowed RegEx');
      $('.index-info').text('Indexing will occur whenever the visited URL matches any one of these regular expressions.');
      $('#addRuleModal').attr('rule-loc', 'allowedRegex');
    });

    $(document).on('click', '.add-rule-btn', () => {
      $('#addRuleInput').val('');
    });

    $('#addRuleForm').on('submit', (event) => {
      event.preventDefault();
      const ruleLoc = $('#addRuleModal').attr('rule-loc');
      const rule = $('#addRuleInput').val();
      const normalizedRule = normalizeURL(rule);

      // Retrieve all rules across different sections
      chrome.storage.local.get(['allowedSites', 'allowedURLs', 'allowedRegex', 'allowedStringMatches'], (result) => {
        const allRules = [
          ...result.allowedSites || [],
          ...result.allowedURLs || [],
          ...result.allowedRegex || [],
          ...result.allowedStringMatches || [],
        ];

        // Check if the rule already exists in any of the sections
        /* eslint-disable no-restricted-syntax */
        for (const existingRule of allRules) {
          const normalizedExistingRule = normalizeURL(existingRule);
          if (
            normalizedRule === normalizedExistingRule
            || normalizedExistingRule.startsWith(normalizedRule)
            || normalizedRule.startsWith(normalizedExistingRule)
          ) {
            $('#ruleErrorModal').modal('show');
            return;
          }
        }/* eslint-disable no-restricted-syntax */

        // If no conflict, add the rule only to the specific section
        chrome.storage.local.get({ [ruleLoc]: [] }, (res) => {
          const existingRules = res[ruleLoc] || [];
          existingRules.push(rule);
          chrome.storage.local.set({ [ruleLoc]: existingRules }, () => {
            // Update the UI accordingly for the specific section
            switch (ruleLoc) {
              case 'allowedSites':
                retrieveSitesList();
                break;
              case 'allowedURLs':
                retrieveUrlsList();
                break;
              case 'allowedRegex':
                retrieveRegexList();
                break;
              case 'allowedStringMatches':
                retrieveStringMatchesList();
                break;
              default:
                break;
            }
          });
        });
      });
    });
    $('#addCurrentSite').on('click', () => {
      console.log('🔵 Add current site button clicked');

      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          console.log('⚠️ No active tab found.');
          return;
        }

        const currentURL = tabs[0].url; // Get full URL of the active tab
        console.log('🌍 Adding current URL:', currentURL);

        // Check if the URL is already in the allowed list
        chrome.storage.local.get(['allowedURLs'], (result) => {
          const allowedURLs = result.allowedURLs || [];

          if (!allowedURLs.includes(currentURL)) {
            allowedURLs.push(currentURL);
            chrome.storage.local.set({ allowedURLs }, () => {
              console.log('✅ Current URL added:', currentURL);
              retrieveUrlsList(); // Refresh the URLs tab UI
            });
          } else {
            console.log('⚠️ URL already in allow list:', currentURL);
            $('#ruleErrorModal').modal('show'); // Show error if already added
          }
        });
      });
    });

    $(document).on('click', '.btn.btn-secondary.backup-btn', (event) => {
      const $backupBtn = $(event.currentTarget);
      exportAll();
      $backupBtn.text('Downloaded data backup');
      setTimeout(() => {
        $backupBtn.text('Export extension data to JSON file');
      }, 1000);
    });

    $(document).on('click', '.btn.btn-secondary.restore-selection-btn', (event) => {
      const $restoreBtn = $(event.currentTarget);

      // Restore selected data
      if (curTags) {
        restoreTags(curTags);
      }

      restoreSelectedData();

      // Handle index entries
      restoreSelectedIndexEntries();

      // Show success message
      $restoreBtn.text('Restored selected data!');
      setTimeout(() => {
        $restoreBtn.text('Perform overwriting restore of selected data');
      }, 1000);
    });

    $(document).on('click', '.btn.btn-primary.background-reset-btn', () => {
      chrome.storage.local.set({ bg: '' }, () => {
        updateWallpaperPreview();
        chrome.runtime.sendMessage(null, 'wallpaper');
      });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      setTimeout(() => {
        updateWallpaperPreview();
      }, 500);
    });

    $(document).on('change', '#backgroundInput', (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          chrome.storage.local.set({ bg: e.target.result }, () => {
            updateWallpaperPreview();
            chrome.runtime.sendMessage(null, 'wallpaper');
          });
        };
        reader.readAsDataURL(selectedFile);
      }
    });

    $(document).on('click', '.settings-entry', (event) => {
      const $entry = $(event.currentTarget);
      $('.settings-entry').removeClass('selected');
      $entry.addClass('selected');
      $('.settings-pane').addClass('d-none');
      $(`#${$entry.attr('id')}-pane`).removeClass('d-none');
    });

    if (window.location.hash) {
      const $entry = $(window.location.hash.slice(0, -1));
      removeHash();
      $('.settings-entry').removeClass('selected');
      $entry.addClass('selected');
      $('.settings-pane').addClass('d-none');
      $(`#${$entry.attr('id')}-pane`).removeClass('d-none');
    }

    $(document).on('change', '#jsonDataInput', (event) => {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = JSON.parse(e.target.result);

            // Restore both tasks and notes if they exist
            if (content.tasks) {
              overwriteTasks(content.tasks);
            }
            if (content.notes) {
              overwriteNotes(Object.values(content.notes));
            }
            if (content.tags) {
              restoreTags(content.tags);
            }

            // Show success message
            const $btn = $('.data-restore-btn');
            $btn.text('Data restored successfully!');
            setTimeout(() => {
              $btn.text('Upload data to restore tasks and notes');
            }, 1000);
          } catch (error) {
            console.error('Error parsing backup file:', error);
            $('#ruleErrorModal').modal('show');
          }
        };
        reader.readAsText(selectedFile);
      }
    });

    $(document).on('change', '#jsonSelectiveInput', (event) => {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = JSON.parse(e.target.result);

            // Store the data for later use when selections are made
            if (content.tags) {
              curTags = content.tags;
            }

            // Handle tasks
            let tasksArray = [];
            if (content.tasks) {
              tasksArray = Object.values(content.tasks);
              curTasks = tasksArray;
            }

            // Handle notes
            let notesArray = [];
            if (content.notes) {
              notesArray = Object.values(content.notes);
              curNotes = notesArray;
            }

            // Handle indexed items
            if (content.indexed) {
              const indexArray = Object.values(content.indexed);
              curIndexEntries = indexArray;
              showIndexEntries(indexArray);
            }

            // Show combined tasks and notes
            showCombinedData(tasksArray, notesArray);

            // Show the selection container
            $('#backup-select-col').removeClass('d-none');

            // Update button text to indicate success
            $('.import-selection-btn').text('Data imported for selection');
            setTimeout(() => {
              $('.import-selection-btn').text('Import data for selection');
            }, 1000);
          } catch (error) {
            console.error('Error parsing backup file:', error);
            $('#ruleErrorModal').modal('show');
          }
        };
        reader.readAsText(selectedFile);
      }
    });

    $(document).on('change', '#jsonIndexInput', (event) => {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = JSON.parse(e.target.result);

          if (Object.prototype.hasOwnProperty.call(content, 'indexed')) {
            const indexArray = Object.values(content.indexed);
            overwriteIndex(indexArray);
          }
        };
        reader.readAsText(selectedFile);
      }
    });

    $(document).on('change', '#jsonNoteInput', (event) => {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = JSON.parse(e.target.result);

          if (Object.prototype.hasOwnProperty.call(content, 'notes')) {
            const notesArray = Object.values(content.notes);
            overwriteNotes(notesArray);
          }
        };
        reader.readAsText(selectedFile);
      }
    });

    // Pane navigation setup for settings
    const paneMap = {
      appearance: 'appearance-pane',
      indexing: 'indexing-pane',
      backup: 'backup-pane',
      about: 'about-pane',
    };

    // Function to handle sidebar navigation
    function handleSidebarNavigation() {
      const sidebarButtons = document.querySelectorAll('.settings-entry');
      sidebarButtons.forEach((button) => {
        button.addEventListener('click', () => {
          // Remove 'selected' class from all buttons
          sidebarButtons.forEach((btn) => btn.classList.remove('selected'));

          // Add 'selected' class to clicked button
          button.classList.add('selected');

          // Hide all panes
          Object.values(paneMap).forEach((paneId) => {
            const pane = document.getElementById(paneId);
            if (pane) {
              pane.classList.add('d-none');
            }
          });

          // Show the correct pane
          const paneToShow = paneMap[button.id];
          if (paneToShow) {
            const pane = document.getElementById(paneToShow);
            if (pane) {
              pane.classList.remove('d-none');
            }
          }
        });
      });

      // Display the default pane (e.g., "Appearance") when the page loads
      const defaultPane = document.getElementById('appearance-pane');
      if (defaultPane) {
        defaultPane.classList.remove('d-none');
      }
    }

    handleSidebarNavigation();

    // Theme color functionality
    function updateThemeColor(color) {
      document.documentElement.style.setProperty('--primary-color', color);
      document.documentElement.style.setProperty('--accent-color', color);
      document.documentElement.style.setProperty('--primary-hover', adjustColorBrightness(color, -10));

      const alpha = '0.1';
      document.documentElement.style.setProperty('--ui-pane-color', `${color}${alpha}`);
      document.documentElement.style.setProperty('--settings-section-color', `${color}${alpha}`);

      // Save to storage and broadcast change
      chrome.storage.local.set({ themeColor: color }, () => {
        chrome.runtime.sendMessage({ type: 'themeColorChanged', color });
      });

      // Update active state of buttons
      $('.theme-color-btn').removeClass('active');
      $(`.theme-color-btn[data-color="${color}"]`).addClass('active');
    }

    const colorPicker = $('#themeColorPicker');
    const defaultColor = '#e65100';

    // Load saved color
    chrome.storage.local.get('themeColor', (result) => {
      if (result.themeColor) {
        colorPicker.val(result.themeColor);
        updateThemeColor(result.themeColor);
      }
    });

    // Handle color changes
    colorPicker.on('input', (event) => {
      const newColor = event.target.value;
      updateThemeColor(newColor);
    });

    colorPicker.on('change', (event) => {
      const newColor = event.target.value;
      chrome.storage.local.set({ themeColor: newColor }, () => {
        chrome.runtime.sendMessage({ type: 'themeColorChanged', color: newColor });
      });
    });

    // Reset color to default
    $('#resetThemeColor').on('click', () => {
      colorPicker.val(defaultColor);
      chrome.storage.local.set({ themeColor: defaultColor }, () => {
        updateThemeColor(defaultColor);
        chrome.runtime.sendMessage({ type: 'themeColorChanged', color: defaultColor });
      });
    });

    // Theme color button handlers
    $(document).on('click', '.theme-color-btn', function () {
      const newColor = $(this).data('color');
      updateThemeColor(newColor);
    });

    // Load saved theme color
    chrome.storage.local.get('themeColor', (result) => {
      if (result.themeColor) {
        updateThemeColor(result.themeColor);
      } else {
        // Set default color
        updateThemeColor('#e65100');
      }
    });
  });
}
