"use strict";

// Test if service_worker are supported.
var service_worker_supported = false;
if ('serviceWorker' in navigator) {
  service_worker_supported = true;
}

// If not, redirect to not_supported.html.
if (!service_worker_supported) {
    location.replace("service_worker_not_supported.html");
}
