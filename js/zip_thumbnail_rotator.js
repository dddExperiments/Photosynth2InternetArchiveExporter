"use strict";

/* exported ThumbnailRotator */

function SynthThumbnailRotator() {
	var _img;
	var _timer;
	var _name;
	var _nbImages         = 20;
	var _interval         = 50; //in ms
	var _currentIndex     = 0;
	var _currentDirection = 1;
	var _images;

	function updateImage() {
		if (_img && _images[_currentIndex].src) {
			_img.src = _images[_currentIndex].src;
		}
	}

	function getNext() {
		var index     = _currentIndex + _currentDirection;
		var direction = _currentDirection;
		if (index === _nbImages) {
			index = _nbImages-2;
			direction *= -1;
		}
		else if (index === -1) {
			index = 1;
			direction *= -1;
		}
		return {
			index: index,
			direction: direction
		};
	}

	function preloadImages(zip_url, chunks) {
		for (var i=0; i<chunks.length; ++i) {
			PreloadImage(_images[i], zip_url, chunks[i]);
		}
	}

	function clearTimer() {
		if (_timer) {
			clearInterval(_timer);
		}
	}

	this.Start = function(img, synth) {
		var chunks = synth.thumbnails;
		var zip_url = "synths/" + synth.guid + ".zip";

		if (chunks.length != _nbImages) {
			console.log(chunks.length + " chunks, but " + _nbImages + " expected.");
			return;
		}
		_img  = img;
		_currentIndex = 0;
		clearTimer();

		_images = new Array(_nbImages);
		for (var i=0; i<_nbImages; ++i) {
			_images[i] = new Image();
		}

		preloadImages(zip_url, chunks);
		updateImage();

		_timer = setInterval(function() {
			var next = getNext();
			if (!_images[next.index].complete) { //do not switch to next image if the image is not loaded
				return;
			}
			else {
				_currentIndex     = next.index;
				_currentDirection = next.direction;
				updateImage();
			}
		}, _interval);
	};

	this.Stop = function() {
		_currentIndex     = 0;
		_currentDirection = 1;
		updateImage();
		for (var i=0; i<_nbImages; ++i) {
			URL.revokeObjectURL(_images[i].src);
		}
		clearTimer();
	};
}
