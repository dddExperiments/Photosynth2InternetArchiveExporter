"use strict";
(function () {
	function bt(n) {
		if (ot) {
			var t = $(ei),
			i = "ps-sq-darker";
			t.show();
			n ? t.hasClass(i) || t.addClass(i) : t.removeClass(i)
		} else
			o.SetVignetteDarkMode(n)
	}
	function st() {
		$("#bigplay-button-container").toggle(window.innerWidth >= 1024 && n.ChromeVisible && wt)
	}
	function oi(i) {
		i = i || t.NullFunction;
		e.Media.getAsync(n.CollectionId(), function (r) {
			if (i(!0), _.isString(r.Name) ? n.CollectionTitle(r.Name) : console.warn("reloadCollectionProperties() got back an invalid CollectionTitle value: " + r.Name), _.isString(r.Description) ? n.CollectionDescription(r.Description) : console.warn("reloadCollectionProperties() got back an invalid Description value: " + r.Description), r.SynthPacket) {
				if (r.SynthPacket.License) {
					var u = d.IndexMap.FindLicenseByValue(r.SynthPacket.License);
					n.License(u)
				}
				t.isInteger(r.SynthPacket.StartingImageIndex) && n.StartingImageIndex(r.SynthPacket.StartingImageIndex)
			} else
				console.warn("reloadCollectionProperties() got back an invalid License value: " + (r.SynthPacket ? r.SynthPacket.License : "null"));
			r.PrivacyLevel === "Public" || r.PrivacyLevel === "Unlisted" ? n.PrivacyLevel(r.PrivacyLevel) : console.warn("reloadCollectionProperties() got back an invalid PrivacyLevel value: " + r.PrivacyLevel);
			n.GeoTag(r.GeoTag);
			n.Edit.Revert();
			a()
		}, function (n) {
			console.warn("Get collection failed with status: " + n);
			i(!1);
			a()
		})
	}
	function si() {
		e.Users.Favorites.getStatusAsync(k.ViewPage.viewModel.CollectionId(), function (t) {
			n.IsFavorited(t.IsFavorited)
		})
	}
	function hi() {
		$("#report-abuse").click(function () {
			window.open(f.buildReportAbuseUrl(f.getViewUrl(n.CollectionId())), "_blank")
		})
	}
	function ci() {
		var t = n.WarningsBaseUrl(),
		i = /^#warnings$/.test(window.location.hash),
		u = $("#show-warnings").off("click");
		n.OmittedCount() <= 0 || $.getJSON(t + "warnings.json", function (n) {
			function a(n) {
				var i = [];
				return $.each(n, function () {
					i.push(new e.ThumbBasedOmittedInfo(t + this, ""))
				}),
				i
			}
			var e = r.OmittedDialog,
			o = [],
			c = [],
			s,
			h,
			l;
			n.UnmatchedImage instanceof Array && ($.each(n.UnmatchedImage, function (n, t) {
					c = c.concat(t.visualizations)
				}), o.push(new e.OmittedDataSet("unmatched images", "These images couldn't be matched with any others you uploaded.", a(c))));
			n.InsufficientOverlap instanceof Array && $.each(n.InsufficientOverlap, function (n, t) {
				o.push(new e.OmittedDataSet(n === 0 ? "not enough overlap" : "", n === 0 ? "Photosynth needs to see each feature in at least three photos. Check out our getting started information on creating synths." : "", a(t.visualizations)))
			});
			s = [];
			h = function (n, t) {
				n && s.push(new e.ListBasedOmittedInfo(t))
			};
			h(n.DimensionMismatch, "They had differing aspect ratios. Use photos of the same shape and size. Don't crop your photos or mix portrait and landscape orientations.");
			h(n.MissingFocal, "We couldn't determine their focal length. Preserve EXIF information in your photos before uploading them.");
			h(n.TrimmedLoop, "They were shot before or after the looped path that was detected.");
			s.length > 0 && o.push(new e.OmittedDataSet("problematic photos", "Photosynth omitted some photos from your synth for these reasons:", s));
			o.length > 0 && (l = new e(o, {
						onLeftButtonClick: function () {
							window.open(f.gettingStartedUrl)
						}
					}), u.click(function () {
					l.show()
				}), i && l.show())
		}).fail(function (n, t, i) {
			console.log("Warnings file error: " + t + ", " + i)
		})
	}
	function li() {
		var e = this,
		s = $("#comments-container"),
		t = $(at),
		o = $("#comment-overlay"),
		h = $("#comment-status"),
		i = null,
		f = null;
		this.currentComment = function (n) {
			if (_.isUndefined(n))
				return t.val();
			t.val(n)
		};
		this.handlePostCommentError = function (n) {
			i === null && (i = new r.ConfirmWindow(ut, {
						okText: "Yes",
						onCancelClick: function () {
							e.activateCommentEntry()
						},
						hideOnDocumentClick: !1,
						hideOnButtonClick: !0
					}), i.message("Your comment did not post. Try again?"));
			i.confirm(null, n)
		};
		this.handleCommentsRefreshed = function () {
			n.CommentSet().length > 0 && (h.hide(), s.show());
			a()
		};
		this.handleDeleteConfirmation = function (n) {
			f === null && (f = new r.ConfirmWindow(ut, {
						okText: "Yes",
						cancelText: "No",
						hideOnDocumentClick: !1,
						hideOnButtonClick: !0
					}), f.message("Are you sure you want to delete this comment?"));
			f.confirm(null, n)
		};
		this.activateCommentEntry = function () {
			t.removeAttr("disabled");
			t.attr("placeholder", "Add your comment");
			o.hide()
		};
		this.deactivateCommentEntry = function () {
			t.attr("disabled", "disabled");
			t.removeAttr("placeholder");
			o.show()
		};
		u.viewModel.isPhotosynthUser ? e.activateCommentEntry() : e.deactivateCommentEntry()
	}
	function ai() {
		function tt() {
			return '<a target="_blank" href="' + o() + '">' + n.CollectionTitle() + '<\/a> by <a target="_blank" href="' + t.schemeUrl(n.OwnerUserProfileUrl()) + '">' + n.OwnerUsername() + '<\/a> on <a target="_blank" href="' + t.schemeUrl(f.siteBaseUrl) + '">Photosynth<\/a>'
		}
		function a(n) {
			window.open(n, "share", "height=480,width=640")
		}
		function w() {
			return n.CollectionTitle() + " by " + n.OwnerUsername()
		}
		function o() {
			return t.schemeUrl(f.getViewUrl(n.CollectionId()))
		}
		function it() {
			function it(i) {
				var e = {
					width: parseInt(a.val(), 10),
					height: parseInt(w.val(), 10),
					delayload: b.is(":checked"),
					autoplay: k.is(":checked"),
					showannotations: g.is(":checked"),
					showpromo: nt.is(":checked")
				},
				u = p.getIFrameHtml(t.schemeUrl(f.getEmbedUrl(n.CollectionId())), e);
				d.is(":checked") && (u += "<p>" + tt() + "<\/p>");
				r.find("#embed-raw").text(u);
				i && r.is(":visible") && t.selectElementText(r[0])
			}
			function c() {
				it(!1)
			}
			function h() {
				it(!0)
			}
			var r = u.find("#embed-html"),
			s = u.find("#embed-toggle"),
			i = u.find("#embed-options"),
			a = i.find("#embed-width"),
			w = i.find("#embed-height"),
			b = i.find("#delay-download-toggle"),
			k = i.find("#auto-play-toggle"),
			d = i.find("#show-caption-toggle"),
			g = i.find("#show-annotations-toggle"),
			nt = i.find("#show-promo-toggle"),
			o = p.getEmbedDefaultOptions();
			return a.val(o.width),
			w.val(o.height),
			o.delayload && b.attr("checked", "checked"),
			o.autoplay && k.attr("checked", "checked"),
			o.showcaption && d.attr("checked", "checked"),
			o.showannotations && g.attr("checked", "checked"),
			o.showpromo && nt.attr("checked", "checked"),
			r.click(function () {
				t.selectElementText(r[0])
			}),
			s.click(function () {
				s.hasClass(l) ? (s.removeClass(l), s.addClass(y), v.text("Show Options")) : (s.removeClass(y), s.addClass(l), v.text("Hide Options"));
				i.slideToggle("fast")
			}),
			a.blur(c),
			w.blur(c),
			b.click(h),
			k.click(h),
			d.click(h),
			g.click(h),
			nt.click(h),
			e.focus = function () {
				return r.focus(),
				e
			},
			e.select = function () {
				return c(),
				t.selectElementText(r[0]),
				e
			},
			c(),
			e
		}
		var i = $("#metadata-share"),
		b = i.find(".ps-sq-facebook"),
		k = i.find(".ps-sq-twitter"),
		d = i.find(".ps-sq-tumblr"),
		g = i.find(".ps-sq-link"),
		nt = i.find(".ps-sq-embed"),
		s = i.find("#share-url"),
		c = i.find("#share-url-pane"),
		u = i.find("#embed-pane"),
		v = i.find("#toggle-label"),
		l = "ps-sq-show-less",
		y = "ps-sq-show-more",
		e = {};
		it();
		b.click(function () {
			a(p.getFacebookShareUrl(o()));
			h.sendEvent(h.EventNames.ShareFacebook)
		});
		k.click(function () {
			a(p.getTwitterShareUrl(w(), {
					url: o()
				}));
			h.sendEvent(h.EventNames.ShareTwitter)
		});
		d.click(function () {
			var i = t.schemeUrl(f.getEmbedUrl(n.CollectionId())),
			r = '<a target="_blank" href="' + o() + '">' + w() + "<\/a>";
			a(p.getTumblrShareUrl(p.getIFrameHtml(i), r));
			h.sendEvent(h.EventNames.ShareTumblr)
		});
		c.removeAttr("style");
		u.removeAttr("style");
		s.attr("value", window.location.href).click(function () {
			s.select()
		});
		g.click(function (n) {
			r.ToggleControlPoppedValue(n, c) && s.select().focus()
		});
		c.click(function (n) {
			n.stopPropagation()
		});
		nt.click(function (n) {
			r.ToggleControlPoppedValue(n, u) && e.focus()
		});
		u.click(function (n) {
			n.stopPropagation()
		})
	}
	function kt() {
		var t = $("#" + rt).find(".psc-top-warning");
		n.ChromeVisible ? t.hide() : t.show()
	}
	function dt() {
		return "center"
	}
	function gt() {
		$("#metadata-date-author").find("a").focus()
	}
	function ni(t) {
		(t.keyCode === 27 && n.ChromeVisible || t.keyCode === 33 && !n.ChromeVisible) && n.ToggleChrome()
	}
	function vi() {
		function h() {
			nt.refreshSpacing();
			a()
		}
		var u = null,
		f = !0,
		i = $(l).find("[contenteditable=true]"),
		e = t.NullFunction,
		o,
		s;
		if (it.isWindowsPhone() || (u = new r.FauxScrollbar(l, ".ps-sq-metadata-pane"), e = function () {
				h();
				f && window.setTimeout(e, 400)
			}, a = function () {
				n.ChromeVisible && window.requestAnimationFrame(u.refresh)
			}, $("body, html").css("-ms-overflow-style", "auto"), yt = function (n) {
				u.changeBottomOffset(n)
			}), i.length > 0)
			if (window.MutationObserver)
				o = {
					attributes: !1,
					characterData: !0,
					childList: !0,
					subtree: !0
				},
		s = new window.MutationObserver(function () {
				h()
			}),
		s.observe(i[0], o),
		s.observe(i[1], o);
		else
			i.on("focus", function () {
				f = !0;
				e()
			}).on("blur", function () {
				f = !1
			})
	}
	function yi() {
		pt = new u.Navigation.Synth2SynthControl(lt, new u.Navigation.Synth2SynthDA(!0), n.CollectionId(), !n.ChromeVisible)
	}
	function pi() {
		var r = i.PS2PlayerConfig,
		u = $("#share-url");
		return r.OnCameraChanged = function (i) {
			n.StartingImageIndex.edit(i);
			u.attr("value", t.schemeUrl(f.getViewUrl(n.CollectionId())) + "?startat=" + i);
			u.select()
		},
		r.CollectionId = n.CollectionId(),
		r.AnnotationEditingEnabled = n.CanEdit(),
		r.PacketUrl = n.PacketUrl(),
		r.ForceMode = b.mode,
		r.SendCurrentCameraIndex = !0,
		r.VignetteEnabled = !0,
		r.AnnotationThumbnailGalleryEnabled = !0,
		r.AnnotationsVisible = b.autoplay === "true",
		r.BottomControlsHeight = 68,
		r.LogoUrl = f.siteBaseUrl,
		r.LogoTarget = "_top",
		r.EnableLogo = !1,
		r.ProgressPosition = dt(),
		r.ToolbarPosition = "center",
		r.ToolbarVisible = !n.ChromeVisible,
		r.VignetteDarkMode = n.ChromeVisible,
		r.OnCanvasCreated = function () {
			n.ChromeVisible && gt()
		},
		r.OnGeometryLoaded = function () {
			wt = !0;
			st();
			$(window).resize(st)
		},
		r.SetChromeVisibility = function (t, i) {
			$("header nav").toggleDisplayNone(t && !i);
			$(l).toggleDisplayNone(t);
			$(tt).toggleDisplayNone(t);
			$(lt).toggleDisplayNone(t && !n.ChromeVisible)
		},
		r.ZoomOutModeMinimumSize = {
			width: 1024,
			height: 720
		},
		r.KeyUp = ni,
		r.AnnotationViewingEnabled = b.showannotations !== "false" && window.screen.width >= 1024 && window.screen.height >= 720 && !it.isWindowsPhone(),
		r.AutoStart = !n.ChromeVisible,
		r.ContainerDivId = rt,
		r.WarningDivId = rt,
		r.StartingImageIndex = t.parseIntOrDefault(b.startat, n.StartingImageIndex()),
		r
	}
	var s = Microsoft.Photosynth,
	ti = s.Resources,
	ht = s.Easing,
	k = s.Page,
	u = k.MasterPage,
	f = u.Links,
	it = s.Compatibility,
	r = s.Controls,
	t = s.Util,
	d = s.RestClient,
	v = t.Fader,
	p = s.Social,
	h = s.Analytics,
	g = s.Maps,
	o = s.PacketPlayer,
	ct = "data-psc-edit-mode",
	ii = "No comments yet! Be the first.",
	c = {},
	w = null,
	n = {},
	rt = "viewer-container",
	l = "#metadata-container",
	lt = "#synth2synth-container",
	ut = "#confirmations-container",
	at = "#comment-entry",
	ri = ".ps-sq-back-to-top",
	tt = "#toggle-chrome",
	ui = "#metadata-edit-title",
	fi = "#metadata-edit-description",
	vt,
	ei = ".ps-sq-fixed-vignette",
	a = t.NullFunction,
	yt = t.NullFunction,
	e,
	pt,
	y,
	ft,
	et,
	ot = !1,
	i = k.ViewPage.serverDataModel,
	b = t.buildObjectFromQueryString(),
	wt = !1,
	nt;
	k.ViewPage.viewModel = n;
	n.CollectionId = ko.observable(i.CollectionId);
	n.CreatedDate = ko.observable(Date.parseMSDate(i.CreatedDate));
	n.UploadDateString = ko.computed(function () {
			var i = n.CreatedDate();
			return _.isDate(i) ? "Uploaded " + t.formatDateDefault(i) : "Created"
		});
	n.OwnerUsername = ko.observable(i.OwnerUsername);
	n.OwnerUserProfileUrl = ko.computed(function () {
			return f.getUsersUrl(n.OwnerUsername())
		});
	n.IsOwner = ko.computed({
			read: function () {
				var i = u.viewModel.currentUser.username();
				return _.isString(i) ? t.stringEquals(n.OwnerUsername(), i, !0) : !1
			},
			deferEvaluation: !0
		});
	n.CanEdit = ko.computed({
			read: function () {
				return u.serverDataModel.IsModeratorOrAdmin || n.IsOwner()
			},
			deferEvaluation: !0
		});
	n.ExportState = ko.observable("unknown");
	n.ExportDownloadUri = ko.observable("");
	n.StartExport = function () {
		e.Media.startExportAsync(n.CollectionId(), function (t) {
			n.ExportDownloadUri(t.DownloadUri);
			n.ExportState(t.Status)
		}, function () {
			n.ExportState("Failed")
		})
	};
	n.StaffPickedDate = ko.observable(i.StaffPickedDate);
	n.Viewings = ko.observable(i.Viewings);
	n.Topology = ko.observable(i.Topology);
	n.ImageCount = ko.observable(i.ImageCount);
	n.OmittedCount = ko.observable(i.OmittedCount);
	n.PacketUrl = ko.observable(i.PacketUrl);
	n.WarningsBaseUrl = ko.observable(i.WarningsBaseUrl);
	n.CollectionTitle = ko.observable(i.CollectionTitle).editable();
	n.MoreCollectionTitle = ko.observable(!0);
	n.CanToggleMoreCollectionTitle = ko.computed({
			read: function () {
				var i = n.CollectionTitle(),
				t = $("#metadata-title").find("h2");
				return i && t[0].scrollHeight > t.outerHeight(!0)
			},
			deferEvaluation: !0
		});
	n.ToggleMoreCollectionTitle = function () {
		n.MoreCollectionTitle(!n.MoreCollectionTitle());
		a()
	};
	n.CollectionDescription = ko.observable(i.CollectionDescription).editable();
	n.MoreCollectionDescription = ko.observable(!0);
	n.CanToggleMoreCollectionDescription = ko.computed({
			read: function () {
				var i = n.CollectionDescription(),
				t = $("#metadata-description").find("p");
				return i && t[0].scrollHeight > t.outerHeight(!0)
			},
			deferEvaluation: !0
		});
	n.ToggleMoreCollectionDescription = function () {
		n.MoreCollectionDescription(!n.MoreCollectionDescription());
		a()
	};
	n.StartingImageIndex = ko.observable(i.StartingImageIndex).editable();
	n.GeoTag = ko.observable(i.GeoTag).editable();
	n.MapZoomLevel = ko.observable(i.MapZoomLevel).editable();
	n.MetadataMapTrailerText = ko.observable("").editable();
	n.MapTileUrl = ko.computed({
			read: function () {
				var t = n.GeoTag();
				return t ? (n.MetadataMapTrailerText("Updating location"), g.requestLocationFromPointAsync(t.Latitude, t.Longitude, function (i) {
						i && i.resourceSets && i.resourceSets[0] && i.resourceSets[0].resources && i.resourceSets[0].resources[0] ? n.MetadataMapTrailerText(i.resourceSets[0].resources[0].name) : n.MetadataMapTrailerText("Lat: " + t.Latitude + ", Long: " + t.Longitude)
					}), g.getMapTileUrl(t.Latitude, t.Longitude, {
						width: $(".ps-sq-metadata-pane").width(),
						zoom: 10
					})) : (n.MetadataMapTrailerText("Your synth is not yet on the map. Click to locate it."), g.getEmptyGeoTagTileUrl($(".ps-sq-metadata-pane").width()))
			},
			deferEvaluation: !0
		});
	n.MapUrl = ko.observable("");
	n.GeoExploreUrl = ko.computed({
			read: function () {
				var i = n.GeoTag(),
				r;
				return i && u.viewModel ? (r = f.getMapUrl({
							id: n.CollectionId(),
							lat: i.Latitude,
							lon: i.Longitude,
							zoom: t.numberOrDefault(n.MapZoomLevel(), 15)
						}), n.MapUrl(r), r) : null
			},
			write: function (t) {
				n.MapUrl(t)
			},
			owner: n
		});
	n.PrivacyLevel = ko.observable(i.PrivacyLevel).editable();
	n.Licenses = ko.observableArray(d.IndexMap.Licenses);
	n.License = ko.observable(d.IndexMap.FindLicenseByValue(i.License)).editable();
	n.followModel = new u.Social.FollowViewModel(!1);
	n.following = new u.Social.Following(n.followModel);
	n.toggleFollow = function () {
		n.IsOwner() || n.following.toggleFollowing(n.followModel, n.OwnerUsername())
	};
	n.Edit = {
		IsSaving: ko.observable(!1),
		IsDirty: ko.computed(function () {
			return n.CollectionTitle.isDirty() || n.CollectionDescription.isDirty() || n.StartingImageIndex.isDirty() || n.PrivacyLevel.isDirty() || n.License.isDirty() || n.GeoTag.isDirty()
		}),
		Commit: function () {
			n.CollectionTitle.commit();
			n.CollectionDescription.commit();
			n.StartingImageIndex.commit();
			n.PrivacyLevel.commit();
			n.License.commit();
			n.GeoTag.commit();
			n.MapZoomLevel.commit();
			n.MetadataMapTrailerText.commit()
		},
		Revert: function () {
			n.CollectionTitle.revert();
			n.CollectionDescription.revert();
			n.PrivacyLevel.revert();
			n.License.revert();
			n.GeoTag.revert();
			n.MapZoomLevel.revert();
			n.MetadataMapTrailerText.revert()
		},
		Cancel: function () {
			n.ShowEdit(!1);
			n.Edit.Revert();
			n.Edit.SetStartingImageClicked(!1);
			n.Edit.TitleErrorMessage("");
			$(l).scrollTop(0).attr(ct, "false");
			$(window).off("beforeunload");
			nt.refreshSpacing();
			a()
		},
		EditGeoTag: function (t, i) {
			if (w == null) {
				var f = $("#metadata-geo-edit"),
				r = $(document),
				e = $("#metadata-edit"),
				o = Math.max((r.width() - e.width()) * .8, 600),
				s = Math.max(r.height() * .8, 400);
				f.css("left", e.width() + (r.width() - e.width()) / 2 - o / 2);
				f.css("top", r.height() / 2 - s / 2);
				w = new u.ExternalControls.GeoEdit(f[0], {
						currentGeoTag: n.GeoTag.edit(),
						editEvents: {
							tagchanged: function (t, i) {
								t && (n.GeoTag.edit(t), n.MapZoomLevel.edit(Math.floor(i)), n.Edit.SaveGeoTag(!0))
							}
						},
						enableTopBanner: !0,
						size: {
							height: s,
							width: o
						}
					})
			}
			w.show();
			i.stopPropagation()
		},
		Save: function (u, f) {
			function o() {
				var t = {
					Name: n.CollectionTitle.edit(),
					Description: n.CollectionDescription.edit(),
					PrivacyLevel: n.PrivacyLevel.edit() === "Public" ? 0 : 1,
					SynthPacket: {
						License: n.License.edit().value
					}
				};
				n.StartingImageIndex.isDirty() && (t.SynthPacket.StartingImageIndex = n.StartingImageIndex.edit());
				n.GeoTag.isDirty() && (t.GeoTag = n.GeoTag.edit() === null || !n.Edit.SaveGeoTag() ? {}
					 : n.GeoTag.edit(), t.MapZoomLevel = n.MapZoomLevel.edit());
				n.Edit.IsSaving(!0);
				e.Media.editAsync(n.CollectionId(), t, function () {
					oi(function (t) {
						t || n.Edit.Commit();
						n.Edit.IsSaving(!1);
						n.Edit.Cancel();
						n.MoreCollectionDescription(!0)
					})
				}, function (t) {
					n.Edit.IsSaving(!1);
					console.warn("Edit failed with status: " + t)
				})
			}
			if (t.stringNullOrWhitespace(n.CollectionTitle.edit())) {
				n.Edit.TitleErrorMessage(ti.Strings.EnterCollectionTitleError);
				return
			}
			n.Edit.TitleErrorMessage("");
			i.GeoTag && n.GeoTag.edit() == null ? (et.reinitialize(), et.confirm(f, function (t) {
					t === r.ConfirmWindow.WindowResultType.Ok ? o() : t === r.ConfirmWindow.WindowResultType.Cancelled && n.GeoTag.edit(null)
				})) : o()
		},
		SetStartingImage: function () {
			n.StartingImageIndex.isDirty() && n.Edit.SetStartingImageClicked(!0)
		},
		SetStartingImageClicked: ko.observable(!1),
		SetViewerParametersEnabled: function () {
			return !n.Edit.SetStartingImageClicked() && n.StartingImageIndex.isDirty() && n.WebGLMode()
		},
		MapTileUrl: ko.computed({
			read: function () {
				var t = n.GeoTag.edit();
				return t ? g.getMapTileUrl(t.Latitude, t.Longitude, {
					width: $(".ps-sq-metadata-pane").width(),
					zoom: 10
				}) : g.getEmptyGeoTagTileUrl($(".ps-sq-metadata-pane").width())
			},
			deferEvaluation: !0
		}),
		SaveGeoTag: ko.computed({
			read: function () {
				var t = n.GeoTag.edit();
				return t != null
			},
			write: function (t) {
				t || (n.GeoTag.edit(null), w && (w.hide(), w.reset()))
			},
			owner: n,
			deferEvaluation: !0
		}),
		TitleErrorMessage: ko.observable(""),
		TogglePrivacySettingsTip: function (n, t) {
			ft !== null && ft.toggleVisibility(t)
		}
	};
	n.CheckToggleVideoControls = function (n) {
		o.CreateResult.Video && (n === !0 ? o.CreateResult.Video.setAttribute("controls", "controls") : o.CreateResult.Video.removeAttribute("controls"))
	};
	n.CommentsHasMore = ko.observable(!1);
	n.CommentsRefreshed = ko.observable(!1);
	n.CommentStatus = ko.observable("Loading comments...");
	n.CommentSet = ko.observableArray();
	n.CommentCount = ko.observable(i.CommentCount);
	n.MergeCommentSet = function (i, r) {
		for (var s, o = [], e = 0, h = i.Comments.length; e < h; e++)
			o.push({
				canDelete: i.Comments[e].Commenter === u.viewModel.currentUser.username() || n.CanEdit(),
				comment: i.Comments[e].Text,
				id: i.Comments[e].Id,
				posted: Date.parseMSDate(i.Comments[e].Posted),
				profileUrl: f.getUsersUrl(i.Comments[e].Commenter),
				username: i.Comments[e].Commenter
			});
		return o.length > 0 ? (s = _.sortBy(_.union(n.CommentSet(), o), function (n) {
					return -n.posted.getTime()
				}), o = _.uniq(s, !0, function (n) {
					return n.id
				})) : o = [],
		n.CommentsRefreshed(t.booleanOrDefault(r, !0)),
		n.CommentSet(o),
		n.CommentCount(i.TotalResults),
		n.CommentsHasMore(i.TotalResults > n.CommentSet().length),
		o
	};
	n.CommentAction = function (t, i) {
		if (i.keyCode === 13) {
			var o = c.currentComment();
			if (o.trim() === "")
				return !0;
			i.preventDefault();
			c.deactivateCommentEntry();
			e.Comments.addAsync(n.CollectionId(), o, null, null, function (t) {
				var r = u.viewModel.currentUser.shouldPromptForEmail;
				c.activateCommentEntry();
				c.currentComment("");
				r() && (r(!1), y.show(i));
				n.MergeCommentSet(t)
			}, function (t) {
				t === 401 ? window.location.href = f.signupUrl : c.handlePostCommentError(function (t) {
						t === r.ConfirmWindow.WindowResultType.Ok && n.CommentAction(null, i)
					})
			})
		}
		return !0
	};
	n.DeleteCommentAction = function (t) {
		return c.handleDeleteConfirmation(function (i) {
			i === r.ConfirmWindow.WindowResultType.Ok && e.Comments.deleteAsync(n.CollectionId(), t.id, null, null, function (i) {
				var r = _.find(n.CommentSet(), function (n) {
						return n.id === t.id
					});
				n.CommentSet(_.without(n.CommentSet(), r));
				c.activateCommentEntry();
				n.MergeCommentSet(i, !1)
			})
		}),
		!0
	};
	n.FavoriteAction = function () {
		u.viewModel.isPhotosynthUser ? n.IsFavorited() ? e.Users.Favorites.deleteAsync(n.CollectionId(), function (i) {
			var r = t.numberOrDefault(i.TimesFavorited);
			n.FavoriteCount(r);
			n.IsFavorited(!1)
		}, null) : e.Users.Favorites.addAsync(n.CollectionId(), function (i) {
			var r = t.numberOrDefault(i.TimesFavorited);
			n.FavoriteCount(r);
			r > 0 && n.IsFavorited(!0)
		}, null) : window.location.href = f.signupUrl
	};
	n.MoreCommentsAction = function () {
		e.Comments.getAsync(n.CollectionId(), null, n.CommentSet().length, function (t) {
			n.MergeCommentSet(t, !1)
		})
	};
	n.FavoriteCount = ko.observable(i.FavoriteCount);
	n.IsFavorited = ko.observable(!1);
	n.OpenDelete = function (n, t) {
		vt.confirm(t)
	};
	n.OpenEdit = function () {
		n.ShowEdit(!0);
		$(l).scrollTop(0).attr(ct, "true");
		$(window).on("beforeunload", function () {
			if (n.Edit.IsDirty())
				return "Any changes you have made will be lost."
		});
		t.stringNullOrWhitespace(n.CollectionTitle.edit()) && r.resetContentEditables(ui);
		t.stringNullOrWhitespace(n.CollectionDescription.edit()) && r.resetContentEditables(fi);
		nt.refreshSpacing();
		a()
	};
	n.ShowEdit = function (n) {
		var i = $("#metadata-readonly"),
		t = $("#metadata-edit"),
		r = $("#metadata-edit-buttons");
		if (arguments.length === 0)
			return t.is(":visible");
		n ? (i.hide(), t.show(), r.show()) : (t.hide(), r.hide(), i.show())
	};
	n.ToggleCommentsPane = function () {
		var n = $("#metadata-license");
		$(l).animate({
			scrollTop: n.offset().top + n.height() - n.parent().offset().top
		}, "fast", function () {
			$(at).focus()
		})
	};
	n.WebGLMode = ko.observable(!0);
	n.ChromeVisible = b.autoplay !== "true" && b.chromeup !== "false";
	nt = new function () {
		function s() {
			return r || !n.ShowEdit() ? r : (r = !0, e = $(window), t = $(l), o = t.find("#metadata-bottom-scroll-line"), u = $("#metadata-edit"), i = $("#metadata-edit-buttons"), f = parseInt(t.css("margin-bottom"), 10), !0)
		}
		var r = !1,
		e,
		t,
		o,
		u,
		i,
		f;
		this.refreshSpacing = function () {
			if (s()) {
				var h = 0,
				r = 0;
				n.ShowEdit() && (h = f - i.outerHeight(), r = e.height() - (u.offset().top + u.height()), r = Math.max(f, r));
				t.css("margin-bottom", r);
				yt(r);
				o.css("bottom", r);
				i.css("bottom", r - i.outerHeight() - h)
			}
		}
	};
	k.ViewPage.ready = function () {
		function i(n) {
			y.inputsEnabled(!1);
			e.Users.Settings.setEmailNotificationSettingsAsync({
				EmailAddress: n
			}, function () {
				var t = u.viewModel.currentUser;
				t.email(n);
				t.emailWasNeverSet(!1);
				y.hide();
				y.inputsEnabled(!0)
			}, function (n) {
				y.errorMessage("fail to save email, status:" + n);
				y.inputsEnabled(!1)
			})
		}
		var t = $(l);
		vt = new r.ConfirmWindow(ut, {
				okText: "Yes",
				cancelText: "Cancel",
				message: "Do you really want to delete this synth?",
				onOkClick: function () {
					e.Media.deleteAsync(n.CollectionId(), function () {
						window.location.href = n.OwnerUserProfileUrl()
					}, null)
				}
			});
		y = new r.SaveEmailWindow({
				emailMaxLength: d.GlobalConfig.EmailMaxLength(),
				onSaveClick: i,
				onDontAskMeAgainClick: function () {
					i("")
				}
			});
		ft = $("#privacy-settings-tip").length > 0 ? new r.Tooltip("#privacy-settings-tip") : null;
		et = new r.ConfirmWindow("#metadata-map-settings", {
				okText: "Yes",
				cancelText: "No",
				message: "Are you sure you want to remove your synth's location? This will permanently erase the GPS coordinates found in your synth's photos.",
				hideOnDocumentClick: !0
			}),
		function () {
			function c() {
				var n = $(tt);
				n.fadeIn("fast", function () {
					n.removeAttr("style")
				})
			}
			function p(i) {
				var u = i === 0 && !n.ChromeVisible,
				f = i === 1 && n.ChromeVisible;
				u ? (t.attr(r.MinimizedAttribute, u), o.StartPlaying(), c()) : f && (c(), gt());
				y(i)
			}
			var u = new ht.easeOut(new ht.sinusoidal).interpolate,
			i = new v.MultiFader,
			f = 800,
			e = "#chrome-up-vignette",
			s = $(e),
			y = v.createSlideInPercentageCallback(l, !1, !1);
			n.InitializeChrome = function () {
				var h = 1;
				n.ChromeVisible ? s.show() : (s.hide(), h = 0);
				i.addFader(new v(v.createOpacityCallback(e), f, h, u));
				i.addFader(new v(p, f, h, u));
				t.attr(r.MinimizedAttribute, !n.ChromeVisible);
				ot ? n.CheckToggleVideoControls(!n.ChromeVisible) : (o.SetToolbarVisible(!n.ChromeVisible), o.SetAnnotationsVisible(!n.ChromeVisible));
				bt(n.ChromeVisible)
			};
			n.ToggleChrome = function () {
				var u = n.ChromeVisible;
				n.ShowEdit() || (o.StopPlaying(), $(tt).hide(), n.ChromeVisible = !n.ChromeVisible, n.CheckToggleVideoControls(u), o.SetToolbarVisible(u), o.SetProgressPercentPosition(dt()), o.SetViewerFocus(u), o.SetAnnotationsVisible(u), pt.setVisible(u), bt(n.ChromeVisible), st(), n.ChromeVisible && t.attr(r.MinimizedAttribute, !1), i.startAnimating(n.ChromeVisible ? v.Direction.Forward : v.Direction.Backward), n.ChromeVisible ? (a(), h.sendEvent(h.EventNames.ShowInfoPane)) : (t.scrollTop(0), h.sendEvent(h.EventNames.HideInfoPane)), kt())
			}
		}
		();
		vi()
	};
	$(function () {
		var s = $(l),
		h = $(".ps-sq-metadata-pane"),
		a = h.width() + h.offset().left,
		t,
		r;
		(yi(), it.isBrowserUnsupported()) || (e = new d, n.following.init(n.followModel, e, "#confirmations-container", n.OwnerUsername()), c = new li, ai(), s.click(function (t) {
				t.clientX > a && n.ChromeVisible ? n.ToggleChrome() : n.ChromeVisible || n.ToggleChrome()
			}), s.find(ri).click(function () {
				s.scrollTop(0)
			}), $(tt).click(function (t) {
				n.ToggleChrome();
				t.stopPropagation()
			}), u.viewModel.isPhotosynthUser && si(), $(window).on("beforeunload", function () {
				if (c.currentComment().length > 0)
					return "Your comment has not been posted yet and will be lost."
			}).resize(function () {
				nt.refreshSpacing()
			}), n.CommentSet.subscribe(function () {
				c.handleCommentsRefreshed()
			}), i.CommentCount > 0 ? e.Comments.getAsync(n.CollectionId(), null, null, function (t) {
				t.Comments.length === 0 ? n.CommentStatus() : n.MergeCommentSet(t)
			}) : n.CommentStatus(ii), hi(), ci(), $(document).keyup(ni), t = o.Create(pi()), t.Video ? (ot = !0, n.WebGLMode(!1)) : t.Poster ? n.WebGLMode(!1) : t.Player && n.WebGLMode(!0), n.InitializeChrome(), kt(), r = n.GeoTag(), r && n.GeoExploreUrl(f.getMapUrl({
					id: n.CollectionId(),
					lat: r.Latitude,
					lon: r.Longitude,
					zoom: 15
				})), n.CanEdit() && e.Media.getExportStatusAsync(n.CollectionId(), function (t) {
				n.ExportDownloadUri(t.DownloadUri);
				n.ExportState(t.Status)
			}, function () {
				n.ExportState("Failed")
			}))
	})
})()
