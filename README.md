# Description

This is the repo containing the scripts that I used to prepare Photosynth2 content for upload to the Internet Archive.

I used a new technique using service worker so that the dynamic WebGL viewer can fetch content directly from zip file.

The technique has been described in a [medium post](https://link.medium.com/25hLO7Q215).

The result can be seen on the [Internet Archive](https://archive.org/download/photosynth_ps2_heroes/index.html)


# How to upload the Photosynth2 that you have exported to the Internet Archive?

## Produce files:

Install npm (node.js).

Go to scripts/ folder.

Run ```npm install```

Place all your Photosynth2 synths at the root folder (where the other existing ps2 is).

Run ```node 1_produce_view_page_zip_entries.js```

Run ```node 2_produce_gallery_zip_entries.js```

Run ```node 3_produce_gallery_api_results.js```

Run ```4_produce_page_from_template.js```

Move all the files from ```scripts/output``` to the root folder.

## View produced files:

Install node static-server.

Run ```static-server``` from the root folder.

Open your browser and go to ```localhost:9080``` you should see your synth there.

## Upload to Internet Archive:

Edit ```service_worker.js```, comment the static-server version and uncomment the InternetArchive version.

(static-server has an off-by-one error when requesting 206 partial request)

Create a new Item on the InternetArchive using a dummy empty file.
Please add a Photosynth tag to it!
Then on Linux, use the ia commandline.
ia upload ....
