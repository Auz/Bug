// Saves options to chrome.storage
function save_options() {
  var bugs = document.getElementById('bugs').checked;
  var spiders = document.getElementById('spiders').checked;

  var max = parseInt(document.getElementById('maxnum').value);
  var min = parseInt(document.getElementById('minnum').value);
  var delay = document.getElementById('delay').value;
  var odds = parseInt(document.getElementById('odds').value);
  
  chrome.storage.sync.set({
    bugBugs: bugs,
    bugSpiders: spiders,
    bugMax: max,
    bugMin: min,
    bugDelay: delay,
    bugOdds: odds
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    bugBugs: false,
    bugSpiders: true,
    bugMax: 3,
    bugMin: 1,
    bugDelay: 3.5,
    bugOdds: 70
  }, function(items) {
    document.getElementById('bugs').checked = items.bugBugs;
    document.getElementById('spiders').checked = items.bugSpiders;
    document.getElementById('maxnum').value = items.bugMax;
    document.getElementById('minnum').value = items.bugMin;
    document.getElementById('delay').value = items.bugDelay;
    document.getElementById('odds').value = items.bugOdds;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);