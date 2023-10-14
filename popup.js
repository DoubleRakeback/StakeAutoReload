document.addEventListener('DOMContentLoaded', function() {
    // Open the VIP tabs for all enabled mirrors when the "Start" button is clicked
    document.getElementById('startButton').addEventListener('click', function() {
        chrome.storage.sync.get('selectedMirrors', function(data) {
            if (chrome.runtime.lastError) {
                alert("Error fetching selected mirrors: " + chrome.runtime.lastError.message);
                return;
            }
            
            if (data.selectedMirrors) {
                data.selectedMirrors.forEach(function(mirror) {
                    // Open a new tab for each enabled mirror's VIP URL
                    chrome.tabs.create({ url: mirror + "/casino/home?tab=reload&modal=vip&c=doublerakeback" });
                });
            }
        });
    });
});
