"use strict";

// Same as in 3. But if Properties.json is missing, try to rebuild one from metadata.json + 0.json + _dump.json.
// -> only useful for dddexperiments account which was recovered before export tool add Properties.json.
// THIS IS NOT FUNCTIONNAL YET
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
	var dump_json = ReadDumpJson();

	var list = [];
	klaw(_input_folder, {depthLimit: 0}).on('data', function (item) {
		if (item.path.endsWith(".entries.json") && path.basename(item.path) != "_thumbnails.entries.json") {
			list.push(item.path);
		}
	}).on('end', function () {		
		onComplete(list, dump_json);
	});	
}

function ReadDumpJson() {
	return JSON.parse(fs.readFileSync("_dump.json"));
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

function ReadJsonFromArchive(chunk, json_entries_filepath) {
	var filename = path.basename(json_entries_filepath).replace(".entries.json", "");
	var ext = path.extname(filename); // contains the .
	var guid = path.basename(filename, ext);

	var buffer = Buffer.allocUnsafe(chunk[1]);
	var fd = fs.openSync(path.join(_synths_folder, filename), "r");
	fs.readSync(fd, buffer, 0, chunk[1], chunk[0]);
		
	var json = JSON.parse(buffer);
	fs.closeSync(fd);	
	
	return json;
}

function RgbToHex(rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
}

function ToHexaColor(arr) {
	return "#" + RgbToHex(arr[0]) + RgbToHex(arr[1]) + RgbToHex(arr[2]);
}

function DateAsEpoch(date_str) {
	return new Date(date_str).getTime();
}

GetAllJsonEntriesFiles(function(jsons, dump_json) {
	var compact_output = {"Collections": [], "TotalResults": 0};
	var full_output = {"Collections": [], "TotalResults": 0};

	var synths = {};
	for (var i=0; i<dump_json.length; ++i) {
		var json = dump_json[i];
		synths[json.guid] = json;
	}

	for (var i=0; i<jsons.length; ++i) {
		var json_content = JSON.parse(fs.readFileSync(jsons[i]));
		if (json_content["properties.json"]) {
			var properties = ReadJsonFromArchive(json_content["properties.json"], jsons[i]);
			
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
			if (json_content["metadata.json"] && json_content["0.json"]) {
				var metadata = ReadJsonFromArchive(json_content["metadata.json"], jsons[i]);
				var zero_json = ReadJsonFromArchive(json_content["0.json"], jsons[i]);		
				
				var synth_guid = metadata.id;
				var title = metadata.title;
				var description = metadata.description;
				var num_favorites = 0;
				var num_comments = 0;
				var num_views = 0;
				var username = "username";
				var latitude = 0;
				var longitude = 0;
				var zoom_level = -1;
				var upload_date = 0;
				var topology = "Spin";
				if (synths[synth_guid]) {
					var synth = synths[synth_guid];
					title = synth.name;
					description = synth.description;
					num_favorites = synth.nbFavorites;
					num_comments = synth.nbComments;
					num_views = synth.nbViews;
					username = synth.username;
					if (synth.zoomLevel && synth.latitude && synth.longitude) {
						zoom_level = synth.zoomLevel;
						latitude = synth.latitude;
						longitude = synth.longitude;
					}
					upload_date = DateAsEpoch(synth.date);
					topology = synth.topology;

				} else {
					console.log(synth_guid + " is missing in _dump.json");
				}

				var compact_properties = {
					"Id": synth_guid,
					"Status": "Available",
					"SynthPacket": {
						"DominantColor":  ToHexaColor(zero_json.dominant_colors[0])
					},
					"sort_order": upload_date
				};
				compact_output.Collections.push(compact_properties);

				var properties = {
					"Id": synth_guid,
					"Name": title,
					"Status": "Available",
					"SynthPacket": {
						"DominantColor":  ToHexaColor(zero_json.dominant_colors[0]),
						"Topology": topology,
						"StartingImageIndex": -1,
						"WarningsBaseUrl": null
					},
					"CollectionUrl": synth_guid + "/0.json",
					"ThumbnailUrl": synth_guid + "/thumbs/default/0.jpg",
					"ViewUrl": "https://photosynth.net/view/" + synth_guid,
					"EditUrl": "https://photosynth.net/view/" + synth_guid,
					"UploadDate": "/Date(" + upload_date + "+0000)/",
					"OwnerUsername": username,
					"Viewings": num_views,
					"FavoriteCount": num_favorites,
					"CommentCount": num_comments,
					"Rank": 0,					
					"sort_order": upload_date				
				};
				if (zoom_level > 0) {
					properties.MapZoomLevel = zoom_level;
					properties.GeoTag = {
						"Latitude" : latitude,
						"Longitude" : longitude
					};
				}
				full_output.Collections.push(properties);
			} else {
				console.log("Missing properties.json in file: " + jsons[i]);	
			}
		}
	}

	compact_output = FixOutput(compact_output);
	fs.writeFileSync(path.join(_output_folder, "_api_compact_list.json"), JSON.stringify(compact_output));

	full_output = FixOutput(full_output);
	fs.writeFileSync(path.join(_output_folder, "_api_full_list.json"), JSON.stringify(full_output));
});
