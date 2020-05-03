"use strict";

// Search for .entries.json in output folder and produce _thumbnails.entries.json with only the entry needed for the gallery page.
// TAR zip entries must thus be copied in output before running this script.
//
// Extract only the zip entries necessary for the gallery view but for all the synths.

var http      = require('http');
var fs        = require('fs');
var path      = require('path');
var klaw      = require('klaw');
var async     = require('async');

var _input_folder = "output";
var _output_folder = "output";

function GetAllJsonEntriesFiles(onComplete) {
	var list = [];
	klaw(_input_folder, {depthLimit: 0}).on('data', function (item) {
		if (item.path.endsWith(".entries.json") && path.basename(item.path) != "_thumbnails.entries.json") {
			list.push(item.path);
		}
	}).on('end', function () {		
		onComplete(list);
	});
}


var _filenames = [
	// "thumbs/default/x.json" // x = [0, 19];
	"thumbs/default/bg.jpg",
	"thumbs/default/poster.jpg",
	"thumbs/default/share.mp4"
];

function InitFilenames() {
	for (var i=0; i<20; ++i) {
		_filenames.push("thumbs/default/" + i + ".jpg");
	}
}

GetAllJsonEntriesFiles(function(jsons) {

	InitFilenames();

	var output = {};

	for (var i=0; i<jsons.length; ++i) {
		var json_content = JSON.parse(fs.readFileSync(jsons[i]));

		var filename = path.basename(jsons[i]).replace(".entries.json", "");
		var ext = path.extname(filename); // contains the .
		var guid = path.basename(filename, ext);

		output[guid] = {
			"chunks": {}
		};

		var chunks = output[guid]["chunks"];
		for (var j=0; j<_filenames.length; ++j) {
			var filename = _filenames[j];
			var chunk = json_content[filename];
			if (!chunk && filename == "thumbs/default/19.jpg") {
				// Missing 19 was apparently an issue at launch which was fixed afterward.
				console.log("Missing: " + filename  + " in " + jsons[i] + " replaced with 18.jpg");
				chunks["19.jpg"] = chunks["18.jpg"];
			} else if (!chunk) {
				console.log("Missing: " + filename  + " in " + jsons[i]);
				return;
			}
			chunks[filename.replace("thumbs/default/", "")] = chunk;
		}
	}
	fs.writeFileSync(path.join(_output_folder, "_thumbnails.entries.json"), JSON.stringify(output));
});