'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "57c079443a9a22e5846761adecdfd555",
"assets/AssetManifest.json": "11f1713047ffba3a3ba4c2d969fd60b9",
"assets/assets/images/ic_add.svg": "716bf342bcacf9d2e36fb27242ff8ab2",
"assets/assets/images/ic_add_customer.svg": "fcd78a62d04f8c50a2713e0d41f48cf1",
"assets/assets/images/ic_app_icon.png": "e7ad73cf870068e7c9b93f13a57f6d4f",
"assets/assets/images/ic_back.svg": "37a0a41b9eeac12f5f133cacd8d9cb64",
"assets/assets/images/ic_card.svg": "84d8e4151d7286f972f06c94cd9a8fc3",
"assets/assets/images/ic_cash.svg": "6ed75fa630c3c824ad294d894bc55c7f",
"assets/assets/images/ic_drawer.svg": "8d95367fae91601837b6ecf9ca0fe40a",
"assets/assets/images/ic_dropdown.svg": "1d2c6bee7af36a0b2f81865963bb5d1e",
"assets/assets/images/ic_e_wallet.svg": "ef35a2e0bd25d0afdffba4692671d997",
"assets/assets/images/ic_forget_back.svg": "059e949033aa5771f46c1523b2dd315c",
"assets/assets/images/ic_forget_pass.svg": "6be2bf5fc8588f3420cd2e02a62d60cf",
"assets/assets/images/ic_mail.svg": "73066113e784275d7bd85963b9d0fb6d",
"assets/assets/images/ic_next.svg": "52a77b834ec3e1533f6611a0fb9da729",
"assets/assets/images/ic_note.svg": "07366a9987f470648b6ea356ec10dea7",
"assets/assets/images/ic_prev.svg": "a1b4bb983a5973af6a33f1f6b8137664",
"assets/assets/images/ic_remove.svg": "43e0b79a024ad9681c14ef0b421535c6",
"assets/assets/images/ic_search.svg": "d42fa16a77a17a8b9f237baaf864588b",
"assets/assets/images/img_drink_example.png": "caf47e46f81e6fb0ca1da6688e5f7a99",
"assets/assets/images/img_sign_in_background.png": "d6d1f5b3ef5070ddee54258b86b3dd86",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "32fce58e2acb9c420eab0fe7b828b761",
"assets/NOTICES": "3bd6cb1dca674fd01a180d1b88c05992",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "af6a64b74a375b4d18b5258fb0db7acb",
"/": "af6a64b74a375b4d18b5258fb0db7acb",
"main.dart.js": "200362f329ccb8e37f729a36ad5be3a0",
"manifest.json": "c7233ea3c3b79044a99fc1d99a42dc1d",
"splash/img/dark-1x.png": "0e65aca187e8fd233469afd036115e3a",
"splash/img/dark-2x.png": "0ef895bb153edb5a0ba9c752d0eb8340",
"splash/img/dark-3x.png": "7608998bcc1fb7a017c31e4082b8fe90",
"splash/img/dark-4x.png": "c52722f5eeaa67d2a84cde97f6bc19a8",
"splash/img/light-1x.png": "0e65aca187e8fd233469afd036115e3a",
"splash/img/light-2x.png": "0ef895bb153edb5a0ba9c752d0eb8340",
"splash/img/light-3x.png": "7608998bcc1fb7a017c31e4082b8fe90",
"splash/img/light-4x.png": "c52722f5eeaa67d2a84cde97f6bc19a8",
"version.json": "36115488b67daef9816ea41c53bba391"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
