// Variables to store interval IDs
let loadVipTabInterval;
let clickButtonInterval;

// Fetch the enabled mirrors from storage
chrome.storage.sync.get('selectedMirrors', function(data) {
    console.log('[DEBUG] Fetched selectedMirrors:', data.selectedMirrors);
    
    console.log('[DEBUG] Current domain:', window.location.origin);
    if (data.selectedMirrors) {
        console.log('[DEBUG] selectedMirrors contains the current domain:', data.selectedMirrors.includes(window.location.origin));
    } else {
        console.log('[DEBUG] selectedMirrors is either undefined or empty.');
    }
    if (data.selectedMirrors && data.selectedMirrors.includes(window.location.origin)) {
        // Only run the extension's functionality if the current domain matches an enabled mirror
        
        // Function to start the extension's functionality
        function startExtension() {
            console.log('[DEBUG] Starting extension functionality');
            
            // Load VIP tab
            loadVipTabInterval = setInterval(function() {
                window.location.replace(window.location.origin + "/casino/home?tab=reload&modal=vip&c=doublerakeback");
            }, 300000);

            // Function to click buttons based on their inner text
            function clickButtonByText(text) {
                const buttons = document.querySelectorAll('button');
                for (const button of buttons) {
                    if (button.innerText.includes(text)) {
                        button.click();
                        console.log("[DEBUG] Clicked button with text:", text);
                    }
                }
            }

            // Click buttons every 5 seconds
            clickButtonInterval = setInterval(function() {
                clickButtonByText("Claim Reload");
            }, 5000);
        }

        startExtension();
    }
});
