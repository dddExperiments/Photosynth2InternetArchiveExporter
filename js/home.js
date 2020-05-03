"use strict";
(function () {
	function k(n) {
		kt.store(t.getAvailableItems(), n)
	}
	function ai(n) {
		var i = $("#bg-image0"),
		t = $("#bg-image1"),
		u,
		f = function (n, t) {
			var i = "url('" + t + "')";
			n.css("background-image", i)
		},
		e = function (n, t) {
			n.css("background-image", t.css("background-image"))
		};
		e(i, t);
		i.show();
		t.hide();
		f(t, n);
		o == null && (u = r.createOpacityCallback(t.selector), o = new r(function (n) {
					u(n)
				}, 1e3, 0, new c.easeOut(new c.sinusoidal).interpolate));
		o.setPosition(0);
		o.startAnimating(r.Direction.Forward)
	}
	function lt(n) {
		var t = "#page-header, #bg-image",
		i,
		u;
		n && (t += ", " + n);
		i = r.createOpacityCallback(t, !0);
		u = new r(i, b, 0, ct);
		u.startAnimating(r.Direction.Forward)
	}
	function d() {
		if (w = null, n && t.getDataForIndex) {
			var f = n.getSelectedItem(),
			r = t.getDataForIndex(f),
			i,
			u = new Image;
			r && r.Status === "Available" && _.isString(r.ThumbnailUrl) && (o == null || !o.isAnimating()) ? (i = r.ThumbnailUrl, i = i.substr(0, i.lastIndexOf("/")) + "/bg.jpg", u.onload = function () {
				ai(i);
				h = !1
			}, u.onerror = function () {
				h = !1
			}, u.src = i) : h = !0
		}
	}
	function at() {
		var u = n.getSelectedItem(),
		i = t.getDataForIndex(u),
		r = e.viewModel.Media;
		i && i.Name && (r.sliderIndex(u), r.id(i.Id), r.title(i.Name.trim()), r.author(i.OwnerUsername), r.uploadDate(Date.parseMSDate(i.UploadDate)), r.topology(i.SynthPacket.Topology.toLowerCase()))
	}
	function vi() {
		at();
		h && d()
	}
	function yi() {
		if (n) {
			var r = n.getSelectedItem(),
			u = t.getIdForIndex(r);
			at();
			a.savePageInfo(r, u);
			i && i.setSelectedItem(r, rt);
			t && t.setSelectedIndex && t.setSelectedIndex(r);
			h = !1;
			window.clearTimeout(w);
			w = window.setTimeout(d, li)
		}
	}
	function pi() {
		var t,
		r;
		i && (t = i.getSelectedItem(), n && (r = n.getSelectedItem(), r !== t && n.setSelectedItem(t, gt)))
	}
	function wi(t) {
		!l && i && (i.setSelectedItem(n.getSelectedItem(), !1), i.setCurrentPosition(t, !1))
	}
	function bi(t) {
		l && n && (n.setSelectedItem(i.getSelectedItem(), !1), n.setCurrentPosition(t, !1))
	}
	function vt(n) {
		var i = t.getDataForIndex(n.index);
		i && s.isGuid(i.Id) && i.Status === "Available" && (k(n.index), window.location = f.viewModel.getViewUrl(i.Id))
	}
	function ki(n) {
		i.setSelectedItem(n.index, rt);
		n.returnKey && vt(n)
	}
	function yt() {
		l = !1
	}
	function pt() {
		l = !0
	}
	function wt() {
		var o = 1,
		s = 1,
		u = 0,
		f = null,
		h = window.innerWidth,
		c = window.innerHeight,
		t = 0,
		e = $("#media-title"),
		l = $("#selected-media-content .ps-sq-head"),
		r = $(it);
		h < st && (o = h / st);
		c < ht && (s = c / ht);
		t = Math.min(o, s);
		t = Math.max(t, ci);
		n && (y.style.width = window.innerWidth + "px", n.setSizes(t * ni, t * ti, t * ii, t * ri, t * ut, t * ft + et, t * hi), n.setMetadataScale(t));
		u = t * ut;
		$("#selected-media-content").css({
			top: 2 * t * ft + et,
			left: u,
			"max-width": window.innerWidth - u
		});
		e.css({
			"transform-origin": "top left",
			transform: "scale(" + t + ")"
		});
		$("#selected-media-content .ps-sq-head").css("margin-top", e[0].getBoundingClientRect().height - e.outerHeight());
		i && (f = document.getElementById(p), f.style.height = 2 * ot + "px", f.style.width = window.innerWidth + "px", i.setSizes(ui, fi, ei, oi, t * si, ot, 0));
		r.show();
		l.offset().top + l.outerHeight() > r.offset().top ? r.hide() : r.show();
		// Commenting some javascript code which was referring to some DOM elements which have been removed.
		//nt || ($("#actions-container").show(), $("#selected-media-content").offset().top > $("#action-upload").offset().top ? $("#actions-container").hide() : $("#actions-container").show())
	}
	function di(r, o, h) {
		var l = e.serverDataModel.ExploreFilter.toLowerCase(),
		c = l === "featured" ? e.serverDataModel.FeaturedMaxResults : 100;
		t = new v.LibrarySliderDataProvider({
				baseUrl: u.RestClient.GlobalConfig.RestBaseUri(),
				compactPath: e.serverDataModel.CompactPath,
				compactInfoNumRows: c,
				initLookAroundNumRows: c * 2,
				// Increase number of elements fetched so that a single xhr call
				// can fetch all ~400 photosynth ps2 heroes.
				fullDataNumRows: 500,
				initSelectedId: o,
				initSelectedIndexHint: h,
				dataUpdated: vi,
				pollForPendingItems: !1,
				getUrlForItem: function (n) {
					return n && s.isGuid(n.Id) ? f.viewModel.getViewUrl(n.Id) : null
				},
				ready: function (u) {
					if (t.getLength() === 0) {
						lt();
						return
					}
					$("#selected-media-content").css("opacity", 0).show();
					n = new v.Slider(y, t, {
							selectedItemChanged: yi,
							itemTapped: vt,
							itemLinkClicked: k,
							pointerDown: yt,
							discreteChange: yt,
							currentPositionChanged: wi
						});
					i = new v.Slider(document.getElementById(p), t.getChipDataSource(), {
							requirePreciseItemTapped: !1,
							selectedItemChanged: pi,
							itemTapped: ki,
							pointerDown: pt,
							discreteChange: pt,
							currentPositionChanged: bi,
							pageNavigationEnabled: !1,
							pageUpCalled: n.previousPage,
							pageDownCalled: n.nextPage,
							pagingAffordanceVisible: !1,
							offsetY: 25
						});
					r(u);
					wt();
					d()
				}
			})
	}
	var u = Microsoft.Photosynth,
	bt = u.Compatibility,
	g = u.Page,
	f = g.MasterPage,
	e = g.HomePage,
	a = u.Paging,
	v = u.Controls,
	s = u.Util,
	r = s.Fader,
	c = u.Easing,
	nt = !!f.serverDataModel.CurrentUser,
	kt = new f.Navigation.Synth2SynthDA,
	y = null,
	p = "chip-div",
	tt = "#slider-div",
	it = "#" + p,
	dt = it + " div",
	t,
	n,
	i,
	rt = !0,
	gt = !0,
	ni = 153,
	ti = 226,
	ii = 305,
	ri = 299,
	ut = 355,
	ft = 180,
	et = 163,
	ui = 10,
	fi = 15,
	ei = 22,
	oi = 22,
	si = 355,
	ot = 32,
	hi = 21.5,
	st = 1280,
	ht = 800,
	ci = .5,
	l = !1,
	w = null,
	h = !1,
	li = 1e3,
	o,
	b = 800,
	ct = new c.easeOut(new c.sinusoidal).interpolate;
	e.viewModel = function (t) {
		var i = {};
		return i.Media = function () {
			var t = {};
			return t.sliderIndex = ko.observable(0),
			t.id = ko.observable(""),
			t.title = ko.observable("..."),
			t.author = ko.observable("..."),
			t.uploadDate = ko.observable(null),
			t.topology = ko.observable(""),
			t.uploadDateString = ko.computed(function () {
					var n = t.uploadDate();
					return _.isDate(n) ? s.formatDateDefault(n) : ""
				}),
			t.authorUrl = ko.computed(function () {
					var n = f.viewModel,
					i = t.author();
					return n ? n.getUsersUrl(i) : ""
				}),
			t.viewUrl = ko.computed(function () {
					var n = f.viewModel,
					i = t.id();
					return n ? n.getViewUrl(i) : ""
				}),
			t.linkClick = function () {
				return k(n.getSelectedItem()),
				!0
			},
			t
		}
		(),
		i.serverModel = t,
		i
	}
	(e.serverDataModel);

	// This is the gallery page entry point.	
	navigator.serviceWorker.addEventListener('message', function(event) {	
		if (event.data.cmd == "activated") {	
			OnServiceWorkerReady();	
		} else if (event.data.cmd == "thumbnails_preloaded") {	
			OnThumbnailsPreloaded();	
		}	
	});	
	if (navigator.serviceWorker.controller) {	
		OnServiceWorkerReady();	
	} else {	
		navigator.serviceWorker.register('service_worker.js', {	
  			scope: ''	
		});	
	}	
	function OnServiceWorkerReady() {	
		console.log("Service worker ready!");	
		navigator.serviceWorker.controller.postMessage({	
			cmd: "preload_thumbnails",	
		});	
	}	
	function OnThumbnailsPreloaded() {	
		$(function () {	
				
			function f() {	
				if (!u) {	
					var t = a.getPageInfo();	
					u = !0;	
					di(function (u) {	
						var o = r.createSlideInCallback(tt + ", " + dt, 0, !0, !1),	
						f = null,	
						e = "#selected-media-content";	
						(u > 0 || t.id) && (n.setSelectedItem(u, !1), i.setSelectedItem(u, !1), b = 0);	
						f = new r(o, b, 0, ct);	
						f.startAnimating(r.Direction.Forward);	
						nt || (e += ", #actions-container a");	
						lt(e)	
					}, t.id, t.indexHint)	
				}	
			}	
			var t = $(tt),	
			u = !1;	
			bt.isBrowserUnsupported() || (s.enforceRefresh(), y = t[0], $(window).bind("hashchange", function () {	
					var t = a.getPageInfo().indexHint;	
					n.setSelectedItem(t, !0)	
				}), t.css("left", "100%"), f())	
					
		});	
		$(window).resize(wt)	
	}	
})()