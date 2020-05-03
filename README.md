# Description

This is the repo containing the scripts that I used to prepare Photosynth2 content for upload to the Internet Archive.

I used a new technique using service worker so that the dynamic WebGL viewer can fetch content directly from zip file.

The technique has been described in a [medium post](https://link.medium.com/25hLO7Q215).

The result can be seen on the [Internet Archive](https://archive.org/download/photosynth_ps2_heroes/index.html)


# How to upload the Photosynth2 that you have exported to the Internet Archive?

## Produce files:

Place all your Photosynth2 synths at the root folder (where the other existing ps2 ZIP file is).

Install npm (node.js).

Go to ```scripts``` folder.

Run ```npm install```

Run ```node 1_produce_view_page_zip_entries.js```

Run ```node 2_produce_gallery_zip_entries.js```

Run ```node 3_produce_gallery_api_results.js```

Run ```node 4_produce_page_from_template.js```

Move all the files from ```scripts/output``` to the root folder.

## View produced files:

Install node static-server: ```npm -g install static-server```.

Run ```static-server``` from the root folder.

Open your browser and go to ```localhost:9080```: you should see your synths there.

## Upload to Internet Archive:

Edit ```service_worker.js```:

- Uncomment the following line:
 ```  // var end = offset + length - 1; // Internet Archive```

- Comment the following line:
 ```var end = offset + length; // Node static-server```
 
 static-server has an off-by-one error when requesting 206 partial request :-(.

Create a new Item on the InternetArchive by uploading a dummy empty file.
Add a Photosynth tag to your item!
Then on Linux, use the ia commandline.
```
pip install internetarchive
ia upload your_item_name js
ia upload your_item_name css
ia upload your_item_name images
ia upload your_item_name *.html
ia upload your_item_name service_worker.js
ia upload your_item_name *.entries.json
ia upload your_item_name *.zip
[...]
```

Please **consider [donating](https://archive.org/donate/) to the Internet Archive** if your are using this script.

