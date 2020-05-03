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

function ExtractGuid(json_entries_filepath) {
	var filename = path.basename(json_entries_filepath).replace(".entries.json", "");
	var ext = path.extname(filename); // contains the .
	var guid = path.basename(filename, ext);

	return guid;	
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

	var template_view_page = fs.readFileSync("view_page_template.html", "utf8");
	var template_embed_page = fs.readFileSync("embed_page_template.html", "utf8");

	for (var i=0; i<jsons.length; ++i) {
		var json_content = JSON.parse(fs.readFileSync(jsons[i]));
		if (json_content["properties.json"]) {
			var guid = ExtractGuid(jsons[i]);
			var properties = ReadJsonFromArchive(json_content["properties.json"], jsons[i]);
			
			if (!properties.StaffPickedDate) {
				properties["StaffPickedDate"] = properties.UploadDate;
			}
			properties["CollectionUrl"] = guid + "/0.json";
			properties["ThumbnailUrl"] = guid + "/thumbs/default/0.jpg";

			// View page generation from template.
			{
				var json = {
					"CollectionId": guid,
					"CreatedDate": properties.UploadDate,
					"OwnerUsername": properties.OwnerUsername,
					"StaffPickedDate": properties.StaffPickedDate,
					"Topology": properties.SynthPacket.Topology,
					"Viewings": properties.Viewings,
					"ImageCount": properties.ImageCount,
					"CollectionDescription": properties.Description,
					"CollectionTitle": properties.Name,
					"PrivacyLevel": properties.PrivacyLevel,
					"CommentCount": properties.CommentCount,
					"FavoriteCount": properties.FavoriteCount,
					"GeoTag": null,
					"MapZoomLevel": null,
					"PacketUrl": guid + "/",
					"License": properties.SynthPacket.License,
					"StartingImageIndex": properties.SynthPacket.StartingImageIndex,
					"OmittedCount": properties.SynthPacket.OmittedCount,
					"WarningsBaseUrl": properties.SynthPacket.WarningsBaseUrl,
					"PS2PlayerConfig": {
						"MovieUrl": guid + "/thumbs/default/share.mp4",
						"MoviePosterUrl": guid + "/thumbs/default/poster.jpg",
						"ViewerShimUrl": "ps2_viewer.html?guid=" + guid
					}
				};
				if (properties.GeoTag && properties.GeoTag.Latitude && properties.GeoTag.Longitude) {
					json.GeoTag = properties.GeoTag;
					json.MapZoomLevel = properties.MapZoomLevel ? properties.MapZoomLevel : 15;
				}
				var synth_json = "Microsoft.Photosynth.Page.ViewPage = " + JSON.stringify({"serverDataModel" : json}) + ";";

				var comments = ReadJsonFromArchive(json_content["comments.json"], jsons[i]);
				var comments_json = "Microsoft.Photosynth.Page.Comments = " + JSON.stringify(comments) + ";";
				
				var view_page = template_view_page;
				view_page = view_page.replace("/*JSON_CONTENT*/", synth_json);
				view_page = view_page.replace("/*COMMENTS_CONTENT*/", comments_json);
				view_page = view_page.replace("<!--PAGE_TITLE-->", properties.Name);
				fs.writeFileSync(path.join(_output_folder, "view_page_" + guid + ".html"), view_page);
			}

			// Embed page generation from template.
			{
				var json = {
					"CollectionId": guid,
					"EmbedThumbUrl": guid + "/thumbs/default/poster.jpg",
					"License": properties.SynthPacket.License,
					"MovieUrl": guid + "/thumbs/default/share.mp4",
					"MoviePosterUrl": guid + "/thumbs/default/poster.jpg",
					"StartingImageIndex": properties.SynthPacket.StartingImageIndex,
					"ViewerShimUrl": 'ps2_viewer.html?guid=' + guid,
					"PacketUrl": guid + "/"
				}
				var synth_json = "Microsoft.Photosynth.Page.EmbedPage = " + JSON.stringify({"PS2PlayerConfig" : json}) + ";";

				var embed_page = template_embed_page;
				embed_page = embed_page.replace("/*JSON_CONTENT*/", synth_json);
				embed_page = embed_page.replace("<!--PAGE_TITLE-->", properties.Name);
				fs.writeFileSync(path.join(_output_folder, "embed_page_" + guid + ".html"), embed_page);
			}

		} else {
			console.log("Missing properties.json in file: " + jsons[i]);
		}
	}
	
});
