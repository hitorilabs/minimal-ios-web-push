document.querySelector('#app').innerHTML = `
  <div>
    <h1>iOS Web Push Example</h1>
    <button id="request-permission">enable notifications</button>
    <button id="send-notification">send notification</button>
  </div>
`
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
            console.log("Registration succeeded.");
        })
        .catch((error) => {
            console.error(`Registration failed with ${error}`);
        });
}

async function requestPermission() {
    const permissionResult = await Notification.requestPermission();
    if (permissionResult) {
        if (permissionResult !== 'granted') {
            console.error("We weren't granted permission.");
        }
    }
}

async function sendNotification() {
    const title = "Push title";
    const sw = await navigator.serviceWorker.ready
    await sw.showNotification(title);
}

document.getElementById('request-permission').addEventListener('click', requestPermission)
document.getElementById('send-notification').addEventListener('click', sendNotification)