"use strict";


// Search for .entries.json in output folder and produce _api_compact_list.json & _api_full_list.json.
// For each synth it's using the .entries.json to find location of Properties.json in the synth archive.
// Then it's combining them to produce the output of the photosynth rest api.
//
// Create the fake answer that should have been answered by photosynth rest API.
// The gallery view is both querying first the compact version and then the full one.

var http      = require('http');
var fs        = require('fs');
var path      = require('path');
var klaw      = require('klaw');
var async     = require('async');

var _input_folder = "output"; // contains .zip.entries.json
var _synths_folder = "../"; // contains .zip (synths)
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

function FixOutput(output) {
	output.Collections = output.Collections.sort(function(a, b) {
		return b.sort_order-a.sort_order;
	});
	output.Collections.forEach(function(c) {
		delete c.sort_order;
	});
	output.TotalResults = output.Collections.length;

	return output;
}

GetAllJsonEntriesFiles(function(jsons) {
	var compact_output = {"Collections": [], "TotalResults": 0};
	var full_output = {"Collections": [], "TotalResults": 0};

	for (var i=0; i<jsons.length; ++i) {
		var json_content = JSON.parse(fs.readFileSync(jsons[i]));
		if (json_content["properties.json"]) {
			
			var chunk = json_content["properties.json"];
			var filename = path.basename(jsons[i]).replace(".entries.json", "");
			var ext = path.extname(filename); // contains the .
			var guid = path.basename(filename, ext);

			var buffer = Buffer.allocUnsafe(chunk[1]);
			var fd = fs.openSync(path.join(_synths_folder, filename), "r");
			fs.readSync(fd, buffer, 0, chunk[1], chunk[0]);
			var properties = JSON.parse(buffer);
			fs.closeSync(fd);
			
			if (!properties.StaffPickedDate) {
				properties["StaffPickedDate"] = properties.UploadDate;
			}
			properties["sort_order"] = parseInt(properties.StaffPickedDate.replace("/Date(", ""), 10);

			// Compact output.
			compact_output.Collections.push({
				"Id": guid,
				"Status": "Available",
				"SynthPacket": {
					"DominantColor": properties.SynthPacket.DominantColor
				},
				"sort_order": properties.sort_order
			});

			// Full output
			delete properties["StaffPickedDate"];
			delete properties["ModifiedDate"];
			delete properties["CapturedDate"];
			delete properties["PrivacyLevel"];
			delete properties["Description"];
			delete properties["HasPaidTag"];
			delete properties["Committed"];
			delete properties["ImageCount"];
			delete properties["SourceApplication"];
			delete properties["SynthPacket"]["License"];
			delete properties["SynthPacket"]["OmittedCount"];
			delete properties["SynthPacket"]["WarningBaseUrl"];
			properties["CollectionUrl"] = guid + "/0.json";
			properties["ThumbnailUrl"] = guid + "/thumbs/default/0.jpg";
			

			full_output.Collections.push(properties);
		} else {
			console.log("Missing properties.json in file: " + jsons[i]);
		}
	}

	compact_output = FixOutput(compact_output);
	fs.writeFileSync(path.join(_output_folder, "_api_compact_list.json"), JSON.stringify(compact_output));

	full_output = FixOutput(full_output);
	fs.writeFileSync(path.join(_output_folder, "_api_full_list.json"), JSON.stringify(full_output));
});
