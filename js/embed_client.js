"use strict";
(function () {
	function c(n) {
		function c() {
			t.fadeIn("slow");
			i = !0;
			window.setTimeout(function () {
				t.fadeOut("slow")
			}, s * 1e3)
		}
		var o = 10,
		s = 10,
		u = "psc-default-embed-promo",
		f = _.uniqueId(u + "-"),
		h = $(n),
		t = null,
		i = !1,
		e = null;
		h.append('<div id="' + f + '" class="' + u + '" style="display: none"><b class="ps-sq-close" tabindex="0"><\/b><h2><a id="promo-link" target="_blank" href="' + r.MasterPage.viewModel.siteBaseUrl + '"><span>See more on<\/span><br /><span class="normal-text">Photosynth<\/span><\/a><\/h2><\/div>');
		t = $("#" + f);
		t.find(".ps-sq-close").click(function () {
			t.hide()
		});
		this.start = function () {
			i || (e = window.setTimeout(c, o * 1e3))
		};
		this.stop = function () {
			i || window.clearTimeout(e)
		}
	}
	var i = Microsoft.Photosynth,
	e = i.Compatibility,
	r = i.Page,
	u = i.Util,
	o = i.PacketPlayer,
	f = r.EmbedPage,
	s = i.RestClient,
	n = f.PS2PlayerConfig,
	h = f.viewModel = {},
	t;
	document.addEventListener("mousewheel", function () {}, !1);
	t = u.buildObjectFromQueryString();
	n.AnnotationEditingEnabled = !1;
	n.AnnotationsVisible = !0;
	n.AnnotationViewingEnabled = t.showannotations !== "false" && window.innerHeight >= 350 && window.innerWidth >= 500 && !e.isWindowsPhone();
	n.AutoLoad = t.delayload === "false";
	n.AutoStart = t.autoplay !== "false";
	n.ContainerDivId = "viewer-container";
	n.EnableFullscreen = t.controls !== "false";
	n.EnableLogo = t.branding !== "false";
	n.EnablePlayToggle = t.controls !== "false";
	n.ForceMode = t.mode;
	n.IncrementViewType = t.fromsite === "true" ? "Site" : "Embed";
	n.LogoTarget = "_blank";
	n.SetChromeVisibility = function (n, i) {
		$("#metadata").toggle(!i && t.attribution !== "false")
	};
	n.StartingImageIndex = u.parseIntOrDefault(t.startat, n.StartingImageIndex);
	n.WarningDivId = "warning-container";
	n.ZoomOutModeMinimumSize = {
		width: 500,
		height: 300
	};
	h.License = ko.observable(s.IndexMap.FindLicenseByValue(n.License));
	$(function () {
		if (t.showpromo === "true") {
			var i = new c("#viewer-container");
			n.OnStartAnimating = i.start;
			n.OnStopAnimating = i.stop
		}
		$("#metadata").toggle(t.attribution !== "false");
		n.LogoUrl = r.MasterPage.viewModel.getViewUrl(n.CollectionId);
		o.Create(n)
	})
})()
