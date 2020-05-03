// Examples of requests and how they are handle:

// thumbs/ requests!!!

// * Requests made by the web page without knowledge of zip file:
// --------------------------------------------------------------
//
// GET /f8c71567-4d70-45fb-aa95-6554c48f90fa/geometry/geometry_0.bin
//
// Actually fetched from /f8c71567-4d70-45fb-aa95-6554c48f90fa.zip
// with offsets from preloaded json file: /f8c71567-4d70-45fb-aa95-6554c48f90fa.zip.entries.json.
// This JSON file contains mapping from filename inside zip file to [start_offset, end_offset].
//
// Cached as /f8c71567-4d70-45fb-aa95-6554c48f90fa/geometry/geometry_0.bin

// * Standard requests:
// --------------------
//
// GET /js/PSPackerPlayer.min.js
//
// Use browser default behavior (just passthrough the ServiceWorker).


// GET /view_page.html?guid=f8c71567-4d70-45fb-aa95-6554c48f90fa

var workbox_folder  = "js/workbox-v4.3.1/";
importScripts(workbox_folder + "workbox-sw.js");
workbox.setConfig({
  modulePathPrefix: workbox_folder,
  debug: false
});

var _general_cache = "general_cache_v1";
var _seadragon_cache = "seadragon_cache_v1";
var _thumbnails_entries = {};
var _max_concurrent_synth_preloaded = 10;
var _preloaded_synths = {};

var _mime_types_by_extension = {
  'json': 'application/json',
  'jpg': 'image/jpeg',
  'bin': 'application/octet-stream',
  'mp4': 'video/mp4',
  'dzi': 'application/xml',
  'dsc': 'application/xml',
  'xml': 'application/xml'
};

const _general_cache_manager = new workbox.expiration.CacheExpiration(
  _general_cache,
  {
    maxAgeSeconds: 24 * 60 * 60, // 24h
    maxEntries: 300,
  }
);

const _seadragon_cache_manager = new workbox.expiration.CacheExpiration(
  _seadragon_cache,
  {
    maxAgeSeconds: 5 * 60, // 5min
    maxEntries: 300,
  }
);

// http://jsfiddle.net/Ng4UA/26/
var _guid_regexp = new RegExp('([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})', 'i');

function ExtractGuid(str) {
    var match = _guid_regexp.exec(str);
    // result is an array containing:
    // [0] the entire string that was matched by our RegEx
    // [1] the first (only) group within our match, specified by the
    // () within our pattern, which contains the GUID value
    return match ? {guid: match[1], index: match.index} : null;
}

function IsCached(guid) {
  return _preloaded_synths[guid] != undefined;
}

function GetSynthArchiveType(guid) {
	if (guid == "0a7ab281-c25a-4f9e-88ef-d3240d93c574" || guid == "d9f87d84-e0bf-4b5d-9a43-80f15edc8550") {
		// These 2 synths have more than 65k files in them (the limit internet archive support).
        // Thus I've just tar the original zip file instead.		
		return "tar";
	} else {
		return "zip";
	}
}

function GetContentType(filename) {
  var extension = filename.split('.').pop();
  return _mime_types_by_extension[extension] || 'text/plain';
}

function PurgeOldestPreloadedSynth() {
  // Check if there are more entries than the cache can handle.
  var num_synths_preloaded = Object.keys(_preloaded_synths).length;

  if (num_synths_preloaded <= _max_concurrent_synth_preloaded) {
    // Not enough entry yet, no need to purge any.
    return;
  }

  // Remove oldest entry.
  var oldest_entry_date = new Date();
  var oldest_entry_guid = "";
  for (var guid in _preloaded_synths) {
    var synth = _preloaded_synths[guid];
    if (synth.last_acces_time < oldest_entry_date) {
      oldest_entry_date = synth.last_acces_time;
      oldest_entry_guid = guid;
    }
  }

  if (oldest_entry_guid != "") {
    delete _preloaded_synths[oldest_entry_guid];
  }
}

function AddSynthToCache(guid, archive_entries) {
  _preloaded_synths[guid] = {
    archive_entries: archive_entries,
    last_acces_time: new Date()
  };
}

function EmptyCache() {
  _preloaded_synths = {};
}

function BroadcastMessage(message) {
	self.clients.matchAll().then(function(clients) {
		clients.forEach(function(client) {
			client.postMessage(message);
		});
	});
}

self.addEventListener('install', function(evt) {
  EmptyCache();
  evt.waitUntil(self.skipWaiting()); 
});

self.addEventListener('activate', function(evt) {
  EmptyCache();
  evt.waitUntil(self.clients.claim().then(BroadcastMessage({cmd: 'activated'})));
});

self.addEventListener('message', function(evt) {
  if (evt.data.cmd == "is_cached") {
    var guid = evt.data.guid;
    BroadcastMessage({
        cmd: "is_cached",
        guid: guid,
        cached: IsCached(guid)
      });
  } else if (evt.data.cmd == "preload") {
    var guid = evt.data.guid;

    if (IsCached(guid)) {
      // Do not preload if already preloaded!
      BroadcastMessage({
        cmd: "preloaded",
        guid: guid
      });
      return;
    }

    var archive_type = GetSynthArchiveType(guid);
    console.log("ServiceWorker is preloading " + archive_type + " entries of synth: " + guid);
    fetch(guid + "." + archive_type + ".entries.json").then(function(response) {
      return response.json();
    }).then(function(json) {
      PurgeOldestPreloadedSynth();
      var archive_entries = json;
      AddSynthToCache(guid, archive_entries);
      BroadcastMessage({
        cmd: "preloaded",
        guid: guid
      });
    });
  } else if (evt.data.cmd == "preload_thumbnails") {
    /*
    "d9f87d84-e0bf-4b5d-9a43-80f15edc8550": {
        "chunks": {
          "bg.jpg": [139494400, 34090],
          "poster.jpg": [139530240, 88470],
          "share.mp4": [139619328, 39533374],
          "0.jpg": [139205632, 13862],
          "1.jpg": [139220480, 13867],
          "2.jpg": [139378688, 13893],
          "3.jpg": [139393536, 13869],
          "4.jpg": [139408384, 13765],
          "5.jpg": [139422720, 13720],
          "6.jpg": [139437056, 13677],
          "7.jpg": [139451392, 13601],
          "8.jpg": [139465728, 13578],
          "9.jpg": [139480064, 13605],
          "10.jpg": [139235328, 13522],
          "11.jpg": [139249664, 13511],
          "12.jpg": [139264000, 13498],
          "13.jpg": [139278336, 13403],
          "14.jpg": [139292672, 13474],
          "15.jpg": [139307008, 13423],
          "16.jpg": [139321344, 13401],
          "17.jpg": [139335680, 13418],
          "18.jpg": [139350016, 13384],
          "19.jpg": [139364352, 13380]
        }
      },
    */    
    _thumbnails_entries = {};
    fetch("_thumbnails.entries.json").then(function(response) {
      return response.json();
    }).then(function(json) {
      _thumbnails_entries = json;
      BroadcastMessage({
        cmd: "thumbnails_preloaded"
      });      
    });

  } else {
    console.log("Unknown message: " + JSON.stringify(evt.data));
  }
});

self.addEventListener('fetch', function(evt) {
  var url = evt.request.url;

  if (url.indexOf(".html") != -1) {
    // This service worker does nothing with HTML element.
    // Thus by returning now it just fallback to browser default behavior.
    return;
  }

  // Catch requests made by the photosynth preview page (bubble list).
  if (url.indexOf("/thumbs/default/") != -1) {

    // http://localhost:9080/preview/32112c21-19b3-4a17-9904-f889f99d27fc/thumbs/default/0.jpg
    var tmp = url.split("/thumbs/default/");
    // ["http://localhost:9080/preview/32112c21-19b3-4a17-9904-f889f99d27fc", "0.jpg"]
    var synth_guid = tmp[0].split("/").pop();
    var filename = tmp[1];

    var chunk;
    // Check if this synth has already been preloaded.
    if (_preloaded_synths[synth_guid]) {
      chunk = _preloaded_synths[synth_guid].archive_entries["thumbs/default/" + filename];
    }
    // Check if this synth has been preloaded as part of all thumbnails (used by gallery view).
    else if (_thumbnails_entries[synth_guid]) {
      var synth = _thumbnails_entries[synth_guid];
      chunk = synth.chunks[filename];
    }
    // Synth has not been preloaded, fallback to 404.
    else {
      return;
    }

    if (!chunk) {
      return;
    }

    var internal_archive_url = "thumbs/default/" + filename;
    var cache_key = "/" + synth_guid + "/" + internal_archive_url;
    var archive_entry = chunk;

    return LoadFromCacheOrArchiveFile(evt, cache_key, synth_guid, internal_archive_url, archive_entry);
  }
  
  // Check if the URL is referring to a synth has has been preloaded by the ServiceWorker.
  var guid_match = ExtractGuid(url);
  var guid_position = -1;
  var current_synth_guid = "";
  if (guid_match == null || !IsCached(guid_match.guid)) {
    // Use browser default behavior: fetch and cache from network.
    // Note: this is happening in 2 cases:
    // - URL doesn't contain the guid of preloaded synth (viewer static stuff).    
    // - ServiceWorker has not preloaded this synth yet.
    return;
  } else {
    current_synth_guid = guid_match.guid;
    guid_position = guid_match.index;
  }

  // Catch requests related to the current preloaded synth.
  var internal_archive_url = url.substr(guid_position + current_synth_guid.length + 1);
  if (internal_archive_url == "" || internal_archive_url == "html") {
    // This case are caught by web_page_{GUID}.html.
    return;
  }

  var archive_entry = _preloaded_synths[current_synth_guid].archive_entries[internal_archive_url];
  if (archive_entry != undefined) {
    var cache_key = evt.request.url;
    return LoadFromCacheOrArchiveFile(evt, cache_key, current_synth_guid, internal_archive_url, archive_entry);
  } else {
    console.log("Missing file: " + internal_archive_url + " in archive of synth: " + current_synth_guid);
    // Return a 404 by using browser default behavior.
    return;
  }
  
});

function LoadFromCacheOrArchiveFile(evt, cache_key, synth_guid, local_url, archive_entry) {
  evt.respondWith(
    caches.match(cache_key).then(function(response) {
      if (response) {
        // Return cached result if it exist.
        
        // Update usage timestamp.
        if (cache_key.indexOf("/undistorted/") != -1) { // seadragon request
          _seadragon_cache_manager.updateTimestamp(cache_key);
        } else {
          _general_cache_manager.updateTimestamp(cache_key);
        }

        return response;
      } else {
        // Otherwise fetch and also cache for next time.
        return FetchFromArchiveAndCache(evt.request, cache_key, synth_guid, local_url, archive_entry);
      }
    })
  );
}

function FetchFromArchiveAndCache(request, cache_key, synth_guid, local_url, archive_entry) {
  var offset = archive_entry[0];
  var length = archive_entry[1];

  var start = offset
  // var end = offset + length - 1; // Internet Archive
  var end = offset + length; // Node static-server

  var headers = new Headers();
  headers.append('Range', 'bytes='+start+'-'+end);

  var request_config = {
    method: 'GET',
    headers: headers,
    mode: "cors",
    cache: request.cache,
    credentials: "same-origin"
  };

  var archive_url = synth_guid + "." + GetSynthArchiveType(synth_guid);
  var req = new Request(archive_url, request_config);

  return fetch(req).then(function(response) {
    if (!response.ok) {
      // Don't cache 404.
      return;
    }

    var network_response_init = {
        status:     response.status,
        statusText: response.statusText,
        headers: new Headers()
    };
  
    response.headers.forEach(function(v,k){
        network_response_init.headers.append(k, v);
    });
    var content_type = GetContentType(local_url);
    network_response_init.headers.set("Content-Type", content_type);

    return response.blob().then(function(body){
        var network_response = new Response(body, network_response_init);

        // Save the response to cache as 200 (Browsers do not support caching 206).
        var cache_response_init = {
          status: 200,
          statusText: "Ok",
          url: cache_key,
          headers: {
            "Content-Type": content_type,
            "Content-Length": length
          }
        };


        if (cache_key.indexOf("/undistorted/") != -1) { // Seadragon request
          var cache_response = new Response(body, cache_response_init);
          caches.open(_seadragon_cache).then(function(cache) {
            cache.put(cache_key, cache_response);
            _seadragon_cache_manager.updateTimestamp(cache_key);
            _seadragon_cache_manager.expireEntries();
          });
        } else { // General request.
          var cache_response = new Response(body, cache_response_init);
          caches.open(_general_cache).then(function(cache) {
            cache.put(cache_key, cache_response);
            _general_cache_manager.updateTimestamp(cache_key);
            _general_cache_manager.expireEntries();
          });
        }
        return network_response;
    });
  });
}