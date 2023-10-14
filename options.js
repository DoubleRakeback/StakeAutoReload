
// Load the selected mirrors from storage when the options page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Fetching selected mirrors
    chrome.storage.sync.get('selectedMirrors', function(data) {
        if (chrome.runtime.lastError) {
            alert("Error fetching selected mirrors: " + chrome.runtime.lastError.message);
            return;
        }

        if (data.selectedMirrors) {
            data.selectedMirrors.forEach(function(mirror) {
                document.getElementById(mirror.split("//")[1].split("/")[0]).checked = true;
            });
        }
    });

    // Saving selected mirrors
    document.getElementById('saveButton').addEventListener('click', function() {
        var selectedMirrors = [];
        var checkboxes = document.querySelectorAll('#mirrorForm input[type=checkbox]');
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                selectedMirrors.push(checkbox.value);
            }
        });

        chrome.storage.sync.set({ 'selectedMirrors': selectedMirrors }, function() {
            if (chrome.runtime.lastError) {
                alert("Error saving settings: " + chrome.runtime.lastError.message);
            } else {
                alert('Settings saved!');
            }
        });
    });
});
