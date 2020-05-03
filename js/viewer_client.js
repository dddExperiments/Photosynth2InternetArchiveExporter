"use strict";
(function () {
	function s(n) {
		v.getMetadata(n.PacketUrl + "0.json", function (t) {
			var i = t.DominantColor(),
			r;
			i && (r = "rgb(" + i.join(",") + ")", document.getElementById(n.ContainerDivId).style.background = r)
		})
	}
	function y(n) {
		var t,
		r;
		if (!i) {
			console.warn("Ignoring message since there is no child iframe");
			return
		}
		if (n.source !== i.contentWindow) {
			console.warn("Ignoring message from window other than the child iframe");
			return
		}
		// I don't know why, but it seems that there was an extra JSON.parse here.
		(t = n.data, t) && (r = u[t.command], r ? r(t) : (_.isUndefined(t.bubble) || !t.bubble) && console.warn("Unknown command " + t.command), t.bubble && p(t))
	}
	function t(n) {
		if (!i || !i.contentWindow || !i.contentWindow.postMessage) {
			console.warn("Could not send message since there is no child iframe or postMessage is unavailable");
			return
		}
		var t = JSON.stringify(n);
		i.contentWindow.postMessage(t, "*")
	}
	function p(n) {
		if (!window.parent || !window.parent.postMessage) {
			console.warn("Cannot send message since there's no parent or postMessage is unavailable");
			return
		}
		e === null && (e = new MessageChannel, window.parent.postMessage("ParentChannelRequest", "*", [e.port2]));
		e.port1.postMessage(n)
	}
	function w(n) {
		i = document.createElement("iframe");
		i.setAttribute("src", n.ViewerShimUrl);
		i.setAttribute("frameborder", "0");
		i.setAttribute("allowfullscreen", "allowfullscreen");
		i.id = "viewer-iframe";
		$(i).load(function () {
			n.command = "create";
			t(n);
			r.PacketPlayer.SetVignetteDarkMode(n.VignetteDarkMode)
		});
		var u = $("#" + n.ContainerDivId);
		u.append(i)
	}
	function b() {
		return r.Page.ViewPage && (f.isiPhone() || f.isiPod())
	}
	function k(n) {
		var t,
		i,
		r,
		u;
		return (b() && (window.location = n.MovieUrl), t = document.createElement("video"), t.canPlayType && t.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/)) ? (s(n), t.setAttribute("class", "video-fallback-content"), t.setAttribute("loop", "loop"), n.AutoStart && n.AutoLoad && t.setAttribute("autoplay", "autoplay"), t.setAttribute("poster", n.MoviePosterUrl), t.setAttribute("controls", "controls"), i = document.createElement("source"), i.setAttribute("src", n.MovieUrl), i.setAttribute("type", "video/mp4"), t.appendChild(i), n.BottomControlsHeight > 0 && (r = function () {
				t.style.height = $(window).innerHeight() - n.BottomControlsHeight + "px"
			}, r(), $(window).resize(r)), u = $("#" + n.ContainerDivId), u.append(t), t) : undefined
	}
	function d(n) {
		function r() {
			var n = i.height / i.width,
			r = window.innerHeight / window.innerWidth;
			n < r ? (t.style.width = "100%", t.style.height = "", t.style.left = "0px", t.style.top = Math.floor((window.innerHeight - t.height) / 2) + "px") : (t.style.width = "", t.style.height = "100%", t.style.left = Math.floor((window.innerWidth - t.width) / 2) + "px", t.style.top = "0px")
		}
		var t,
		i;
		return s(n),
		t = document.createElement("img"),
		t.setAttribute("src", n.MoviePosterUrl),
		t.style.position = "absolute",
		i = new Image,
		i.src = n.MoviePosterUrl,
		t.onload = r,
		$("#" + n.ContainerDivId).append(t),
		$(window).resize(r),
		t
	}
	function h(n, t, i, r, u) {
		var f = document.createElement("a"),
		e,
		o;
		f.href = r;
		f.target = "_blank";
		f.innerHTML = i;
		e = [document.createTextNode(t), f, document.createTextNode(u)];
		o = new a.TopWarning("#" + n, {
				content: e
			})
	}
	function g(n) {
		h(n, "We can't display this as an interactive synth. See ", '<span class="normal-text">Photosynth<\/span> system requirements', "/preview/help#FAQ-About-Requirements", ".")
	}
	function nt(n, t) {
		h(n, "This website is running in compatibility mode and an interactive synth cannot be displayed. Click ", "here", t, " to see the interactive version of the synth.")
	}
	var c = window.PS,
	r = Microsoft.Photosynth,
	f = r.Compatibility,
	l = r.Page,
	a = r.Controls,
	n = r.Util,
	o = r.RestClient,
	v = r.SynthPacket,
	i = null,
	e = null,
	u = {};
	r.PacketPlayer = {
		SetLogoVisible: function (n) {
			t({
				command: "setLogoVisibility",
				isVisible: n
			})
		},
		SetProgressPercentPosition: function (n) {
			t({
				command: "setProgressPercentPosition",
				mode: n
			})
		},
		SetToolbarVisible: function (n) {
			t({
				command: "setToolbarVisibility",
				isVisible: n
			})
			// Hide photosynth top menu.
			document.getElementById("header-left-nav").style.display = n ? "none" : "inline-block";
		},
		SetToolbarBottomOffset: function (n) {
			t({
				command: "setToolbarBottomOffset",
				offset: n
			})
		},
		SetAnnotationsVisible: function (n) {
			t({
				command: "setAnnotationVisibility",
				isVisible: n
			})
		},
		SetVignetteDarkMode: function (n) {
			t({
				command: "setVignetteDarkMode",
				darkMode: n
			})
		},
		SetViewerFocus: function (n) {
			t({
				command: "setViewerFocus",
				focused: n
			})
		},
		Create: function (i) {
			function y(n, t) {
				var i = v[n];
				return i === undefined ? (console.warn("Unknown visibility preset: " + n), t) : i
			}
			var e = {
				AnnotationEditingEnabled: n.booleanOrDefault(i.AnnotationEditingEnabled, !1),
				AnnotationViewingEnabled: n.booleanOrDefault(i.AnnotationViewingEnabled, !0),
				AnnotationsVisible: n.booleanOrDefault(i.AnnotationsVisible, !1),
				AnnotationThumbnailGalleryEnabled: n.booleanOrDefault(i.AnnotationThumbnailGalleryEnabled, !1),
				AutoLoad: n.booleanOrDefault(i.AutoLoad, !0),
				AutoStart: n.booleanOrDefault(i.AutoStart, !0),
				BottomControlsHeight: i.BottomControlsHeight,
				CollectionId: i.CollectionId,
				ContainerDivId: i.ContainerDivId,
				EmbedThumbUrl: n.stringOrDefault(i.EmbedThumbUrl),
				EnableFullscreen: n.booleanOrDefault(i.EnableFullscreen, !0),
				EnableLogo: n.booleanOrDefault(i.EnableLogo, !0),
				EnablePlayToggle: n.booleanOrDefault(i.EnablePlayToggle, !0),
				KeyUp: n.functionOrDefault(i.KeyUp),
				ProgressPosition: n.stringOrDefault(i.ProgressPosition, "center"),
				SetChromeVisibility: n.functionOrDefault(i.SetChromeVisibility),
				ToolbarPosition: n.stringOrDefault(i.ToolbarPosition, "right"),
				ToolbarVisible: n.booleanOrDefault(i.ToolbarVisible, !0),
				ToolbarBottomOffset: n.numberOrDefault(i.ToolbarBottomOffset, 10),
				VignetteDarkMode: !!i.VignetteDarkMode,
				VignetteEnabled: n.booleanOrDefault(i.VignetteEnabled, !1),
				ZoomOutModeMinimumSize: n.objectOrDefault(i.ZoomOutModeMinimumSize, {
					width: 0,
					height: 0
				}),
				ForceMode: n.oneOfOrDefault(i.ForceMode, ["webgl", "movie", "poster"], ""),
				IncrementViewType: n.stringOrDefault(i.IncrementViewType, "Site"),
				LogoTarget: n.stringOrDefault(i.LogoTarget, "_top"),
				LogoUrl: n.stringOrDefault(i.LogoUrl, "/preview"),
				MoviePosterUrl: i.MoviePosterUrl,
				MovieUrl: i.MovieUrl,
				OnCanvasCreated: n.functionOrDefault(i.OnCanvasCreated),
				OnCameraChanged: n.functionOrDefault(i.OnCameraChanged),
				OnGeometryLoaded: n.functionOrDefault(i.OnGeometryLoaded),
				OnStartAnimating: n.functionOrDefault(i.OnStartAnimating),
				OnStopAnimating: n.functionOrDefault(i.OnStopAnimating),
				ReverseDirection: n.booleanOrDefault(i.ReverseDirection, !1),
				SendCurrentCameraIndex: n.booleanOrDefault(i.SendCurrentCameraIndex, !1),
				StartingImageIndex: n.numberOrDefault(i.StartingImageIndex, -1),
				ViewerShimUrl: i.ViewerShimUrl,
				PacketUrl: i.PacketUrl,
				WarningDivId: i.WarningDivId
			},
			h = new o,
			a = function (n) {
				h.Media.incrementViewsAsync(e.CollectionId, e.IncrementViewType, n ? o.Enum.ViewModes.Movie : null)
			},
			v,
			s;
			return u.canvasCreated = function () {
				a(!1);
				e.OnCanvasCreated()
			},
			u.startAnimating = function () {
				e.OnStartAnimating()
			},
			u.stopAnimating = function () {
				e.OnStopAnimating()
			},
			u.keyUp = function (n) {
				e.KeyUp({
					keyCode: n.keyCode
				})
			},
			u.currentCameraIndex = function (n) {
				e.OnCameraChanged(n.index)
			},
			u.logoClicked = function () {
				window.location = e.LogoUrl
			},
			v = {
				Auto: 0,
				0: "Auto",
				All: 1,
				1: "All",
				One: 2,
				2: "One",
				Manual: 3,
				3: "Manual"
			},
			u.publishAnnotation = function (n) {
				var i = n.thumbInfo.radius * 1.2,
				r = {
					Description: n.annotation.text,
					Placement: {
						BoxCorner: [Math.round(n.thumbInfo.x - i), Math.round(n.thumbInfo.y - i)],
						BoxDiameter: Math.round(i * 2),
						ImageIndex: n.annotation.imgIndex,
						Orientation: n.annotation.surfaceOrientation,
						QueryPoint: n.annotation.queryPoint,
						Radius: n.annotation.radius,
						Visibility: n.annotation.visibility,
						VisibilityPreset: y(n.annotation.visibilityPreset, "Manual"),
						WorldPoint: n.annotation.worldPoint
					}
				},
				u = n.annotation.dbid;
				u ? h.Annotations.updateAsync(e.CollectionId, parseInt(u), r, function (i) {
					t({
						command: "publishedAnnotation",
						annotation: i,
						viewerAnnotationId: n.viewerAnnotationId,
						success: !0
					})
				}, function () {
					t({
						command: "publishedAnnotation",
						viewerAnnotationId: n.viewerAnnotationId,
						success: !1
					});
					console.error("Failed to update annotation")
				}) : h.Annotations.createAsync(e.CollectionId, r, function (i) {
					t({
						command: "publishedAnnotation",
						annotation: i,
						viewerAnnotationId: n.viewerAnnotationId,
						success: !0
					})
				}, function () {
					t({
						command: "publishedAnnotation",
						viewerAnnotationId: n.viewerAnnotationId,
						success: !1
					});
					console.error("Failed to add annotation")
				})
			},
			u.deleteAnnotation = function (n) {
				h.Annotations.deleteAsync(e.CollectionId, n.annotationId, function () {
					t({
						command: "deletedAnnotation",
						viewerAnnotationId: n.viewerAnnotationId
					})
				}, function () {
					console.error("Failed to delete annotation " + n.annotationId)
				})
			},
			u.loadAnnotations = function () {
				h.Annotations.getForCollectionAsync(e.CollectionId, function (n) {
					t({
						command: "loadAnnotations",
						annotations: n.map(function (n) {
							return {
								AnnotationId: n.AnnotationId,
								MediaId: n.MediaId,
								Description: n.Description,
								CreatedBy: n.CreatedBy,
								Created: n.Created,
								LastModified: n.LastModified,
								ThumbnailUrl: n.ThumbnailUrl,
								Placement: {
									dbid: n.AnnotationId.toString(),
									imgIndex: n.Placement.ImageIndex,
									queryPoint: n.Placement.QueryPoint,
									radius: n.Placement.Radius,
									surfaceOrientation: n.Placement.Orientation,
									text: n.Description,
									visibility: n.Placement.Visibility ? n.Placement.Visibility : n.Placement.ImageIndex.toString(),
									visibilityPreset: y(n.Placement.VisibilityPreset, 3),
									worldPoint: n.Placement.WorldPoint
								}
							}
						})
					})
				}, function () {
					console.error("Unable to get annotations")
				})
			},
			u.setChromeVisibility = function (n) {
				e.SetChromeVisibility(n.visible, n.zoomoutButtonVisible)
			},
			u.onGeometryLoaded = function () {
				e.OnGeometryLoaded()
			},
			s = r.PacketPlayer.CreateResult = {},
			e.ForceMode === "webgl" || e.ForceMode === "" && c.isWebGLEnabled() ? (w(e), s.Player = !0) : ((e.ForceMode === "movie" || e.ForceMode === "") && (s.Video = k(e), s.Video && a(!0)), e.ForceMode !== "poster" && s.Video || (s.Poster = d(e)), f.isRunningInCompatMode() ? nt(e.WarningDivId, l.MasterPage.viewModel.getViewUrl(e.CollectionId)) : f.isBrowserUpgradable() && g(e.WarningDivId)),
			s
		},
		StopPlaying: function () {
			var n = r.PacketPlayer.CreateResult;
			n.Player ? t({
				command: "stop"
			}) : n.Video && n.Video.pause()
		},
		StartPlaying: function () {
			var n = r.PacketPlayer.CreateResult;
			n.Player ? t({
				command: "start"
			}) : n.Video && n.Video.play()
		}
	};
	$(function () {
		window.addEventListener("message", y, !1)
	})
})()
