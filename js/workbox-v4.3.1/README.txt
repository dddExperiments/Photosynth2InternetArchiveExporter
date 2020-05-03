Generated using:
npm install workbox-cli --global

then in js/ folder run:

workbox copyLibraries .

It should create the folder workbox-v4.3.1 with this content.

Then update service_worker.js to point to the new folder.