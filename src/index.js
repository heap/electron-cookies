const tough = require('tough-cookie');
const WebStorageCookieStore = require('tough-cookie-web-storage-store');

const { Cookie } = tough;

// This should resemble a real URI, but have a fake TLD. We don't want to have it so that
// it's possible to send these cookies to a domain someone could register after the fact, but
// for Heap, we need a parseable URI because internally we try to determine the right level to set
// a cookie, rather than having a known set of public suffix domains.
const FAKE_APP_URI = 'https://yourdomain.heap/';

const FAKE_APP_URI = 'https://' + window.location.host;  

(function(document) {
const store = new WebStorageCookieStore(localStorage);
const cookiejar = new tough.CookieJar(store);
const cookiejar = new tough.CookieJar(store, false); //false here sets the rejectPublicSuffix flag
Object.defineProperty(document, "cookie", {
get() {
return cookiejar.getCookieStringSync(FAKE_APP_URI);
    }
  });
})(document);
