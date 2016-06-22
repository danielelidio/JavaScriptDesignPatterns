$(function($) {
	function GalleryItem1024x768(options) {
		this.width = options.width || 300;
		this.height = options.height || 300;
		this.container = $(options.container || "body");
	}

	GalleryItem1024x768.prototype.createElement = function() {
		var galleryItemElem = $("<div/>").css("width", this.width).css("height", this.height).css("background-color", "#F5F5F5").html("Gallery Item");
		galleryItemElem.appendTo(this.container);
	}

	function GalleryItem800x600(options) {
		this.width = options.width || 200;
		this.height = options.height || 200;
		this.container = $(options.container || "body");
	}

	GalleryItem800x600.prototype.createElement = function() {
		var galleryItemElem = $("<div/>").css("width", this.width).css("height", this.height).css("background-color", "#F5F5F5").html("Gallery Item");
		galleryItemElem.appendTo(this.container);
	}

	function GalleryItem640x480(options) {
		this.width = options.width || 100;
		this.height = options.height || 100;
		this.container = $(options.container || "body");
	}

	GalleryItem640x480.prototype.createElement = function() {
		var galleryItemElem = $("<div/>").css("width", this.width).css("height", this.height).css("background-color", "#F5F5F5").html("Gallery Item");
		galleryItemElem.appendTo(this.container);
	}


	function GalleryItemFactory() {}
	GalleryItemFactory.prototype.types = {};
	GalleryItemFactory.prototype.galleryItemClass = null;
	GalleryItemFactory.prototype.registerClass = function(type, Class) {
		if(typeof Class.prototype.createElement !== "function") {
			throw {err: "Ocorreu um erro!"};
		}
		else {
			this.types[type] = Class;
		}
	};

	GalleryItemFactory.prototype.createGalleryItem = function (options) {
		var galleryItemTypeWidth;
		var galleryItemTypeHeight;

		if(options === undefined) {
			galleryItemTypeWidth = window.innerWidth;
			galleryItemTypeHeight = window.innerHeight;
			options = {
				galleryItemType: galleryItemTypeWidth + "x" + galleryItemTypeHeight
			};
		}

		console.log(options);

		var keys = Object.keys(this.types);
		var sizes = [];

		keys.forEach(function(value, index, arr) {
			var brokenSize = value.split('x');
			var width = brokenSize[0];
			var height = brokenSize[1];
			sizes.push({
				"width": width,
				"height": height
			});
		});

		var bestWidthIndex;
		var bestWidthDistance = Infinity;
		var bestHeightIndex;
		var bestHeightDistance = Infinity;

		console.log(sizes);

		sizes.forEach(function(size, index, arr) {
			if(Math.abs(size.width - galleryItemTypeWidth) < bestWidthDistance) {
				bestWidthDistance = Math.abs(size.width - galleryItemTypeWidth);
				bestWidthIndex = index;
			}

			if(Math.abs(size.height - galleryItemTypeHeight) < bestWidthDistance) {
				bestHeightDistance = Math.abs(size.height - galleryItemTypeHeight);
				bestHeightIndex = index;
			}
		});

		bestIndex = bestWidthIndex;

		options.galleryItemType = sizes[bestIndex].width + "x" + sizes[bestIndex].height;
		console.log(options);


		if(this.types.length == 0)
			throw {err: "Ocorreu um erro!"};

		var type = options.galleryItemType;
		
		if(this.types[type] !== undefined) {
			this.galleryItemClass = this.types[type];
		}

		return new this.galleryItemClass(options);
	}

	var galleryItemFactory = new GalleryItemFactory();
	galleryItemFactory.registerClass("1024x768", GalleryItem1024x768);
	galleryItemFactory.registerClass("800x600", GalleryItem800x600);
	galleryItemFactory.registerClass("640x480", GalleryItem640x480);

	var galleryItem = galleryItemFactory.createGalleryItem();

	console.log(galleryItem);
	galleryItem.createElement();
});