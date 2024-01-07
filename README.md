# Minimal Client-side Web Push Example for iOS

Every guide I see for getting push notifications working on iOS take way too
long to get through because they implement both client and server. However,
once you get through all of the setup, something still doesn't work and you
have no idea where you messed up. It turns out, there are very particular
prerequesites to get everything working correctly on iOS:

1. Get the PWA installed (not just a bookmark) 
2. Enable Web Push
3. Serve over HTTPS

In this guide, I'm just creating a `vite` project and tunneling it through
`cloudflared` for testing.

## Get a PWA Working

Basically the only things you need the following: 
- `app.webmanifest` file (must have at least one icon)
-  register a service worker `sw.js` (standard)

`app.webmanifest`
```json
{
    "name": "Web Push Example",
    "short_name": "Web Push Example",
    "start_url": "/",
    "display": "standalone",
    "icons": [
        {
            "src": "/android-chrome-512x512.png",
            "type": "image/png",
            "sizes": "512x512"
        }
    ]
}
```

Register service worker (`sw.js` doesn't expect anything special, see example)
```
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("sw.js", { scope: "/" })
        .then((registration) => {
            console.log("Registration succeeded.");
        })
        .catch((error) => {
            console.error(`Registration failed with ${error}`);
        });
}
```

## Enable Push Notifications

When requesting permission, you can only trigger a request through user gesture (i.e. pressing a button)
```
async function requestPermission() {
    const permissionResult = await Notification.requestPermission();
    if (permissionResult) {
        if (permissionResult !== 'granted') {
            console.error("We weren't granted permission.");
        }
    }
}
```

The notification must be pushed from the service worker (i.e. not by creating an instance of `Notification`)
```
async function sendNotification() {
    const title = "Push title";
    const sw = await navigator.serviceWorker.ready
    await sw.showNotification(title);
}
```

## Serve over HTTPS

The last step is just to make sure that in your local testing, you are serving the site over HTTPS. The simplest way you can do this is through `ngrok` or `cloudflared` (I personally use cloudflared)

```
pnpm dev
```

```
cloudflared --tunnel <ip_address>
```
