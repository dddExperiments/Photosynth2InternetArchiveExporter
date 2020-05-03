"use strict";

// Search for .zip files and produce .zip.entries json files in output folder.
//
// Create zip entries used by the view page.
// This contains all the entries of the zip file of a single synth.

var http      = require('http');
var fs        = require('fs');
var path      = require('path');
var klaw      = require('klaw');
var async     = require('async');
var StreamZip = require('node-stream-zip');

var _synths_folder = "../";
var _output_folder = "output";
var _zip_entries_concurrency = 2;

function GetAllZipFiles(onComplete) {
	var list = [];
	klaw(_synths_folder).on('data', function (item) {
		if (path.extname(item.path) == ".zip") {
			list.push(item.path);
		}
	}).on('end', function () {		
		onComplete(list);
	});	
}

function SanitizeName(name) {
	return name.replace(/\\/g, "/");
}

function ProduceJsonFile(filename, onComplete) {
	console.log("Processing: " + filename);
	var use_tree_version = false;

	var zip = new StreamZip({
		file: filename,
	    storeEntries: true,
		skipEntryNameValidation: true
	});
	
	function ComputeOffset(entry) {
		var LOCHDR = 30;
		return entry.offset + LOCHDR + entry.fnameLen;
	}

	zip.on('ready', function() {
		var json = {};
		for (const entry of Object.values(zip.entries())) {
			if (!entry.isDirectory) {
				if (use_tree_version) {
					var folders = entry.name.split('/');
					var node = json;
					for (var i=0; i<folders.length-1; ++i) {
						var folder = folders[i];
						if (node[folder] == undefined) {
							node[folder] = {};
						}
						node = node[folder];
					}
					node[folders[folders.length-1]] =  [ComputeOffset(entry), entry.size];				
				} else {
					var entry_name = SanitizeName(entry.name);
					json[entry_name] = [ComputeOffset(entry), entry.size];
				}
			}
		}
		zip.close();
		var filepath = path.join(_output_folder, path.basename(filename) + ".entries.json");
		fs.writeFile(filepath, JSON.stringify(json), function() {
			onComplete();
		});
	});
}

GetAllZipFiles(function(zip_files) {
	console.log("Producing zip entries for: " + zip_files.length + " zip files.");
	var q = async.queue(function(task, callback) {
		ProduceJsonFile(task, callback);
	}, _zip_entries_concurrency);
	for (var i=0; i<zip_files.length; ++i) {
		q.push(zip_files[i]);
	}
});
