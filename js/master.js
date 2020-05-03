"use strict";
(function () {
	function n(n) {
		return typeof n == "string" ? n.replace(/\xa0/g, " ") : n
	}
	typeof Function.prototype.addPrototype != "function" && (Function.prototype.addPrototype = function (n, t) {
		return this.prototype[n] = t,
		this
	});
	typeof Function.prototype.addStatic != "function" && (Function.prototype.addStatic = function (n, t) {
		return this[n] = t,
		this
	});
	Date.parseMSDate || (Date.parseMSDate = function (n) {
		var t = n.substring(6, n.lastIndexOf(")")),
		i,
		r;
		return t.indexOf("+") >= 0 ? (i = t.split("+"), r = new Date(parseInt(i[0], 10))) : t.indexOf("-") >= 0 ? (i = t.split("-"), r = new Date(parseInt(i[0], 10))) : r = new Date(parseInt(t, 10)),
		r
	});
	Date.now || (Date.now = function () {
		return (new Date).getTime()
	});
	window.ArrayBuffer && !window.ArrayBuffer.prototype.slice && (window.ArrayBuffer.prototype.slice = function (n, t) {
		var r = new Uint8Array(this).subarray(n, t),
		i = new Uint8Array(t - n);
		return i.set(r),
		i.buffer
	});
	typeof window.requestAnimationFrame == "undefined" && (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) {
		window.setTimeout(n, 1e3 / 60)
	});
	$.easing.psEaseOutBounce = function (n) {
		return n < .8 ? n / .9 : n < .9 ? 1 : n < .95 ? 1 - (.95 - n) : n
	};
	$.fn.trimBetweenBlocks = function () {
		var n = 3,
		t = /\S/;
		return this.contents().filter(function () {
			return this.nodeType === n && !t.test(this.nodeValue)
		}).remove(),
		this
	};
	$.fn.addClassOnce = function (n) {
		return this.hasClass(n) || this.addClass(n),
		this
	};
	$.fn.toggleDisplayNone = function (n) {
		return this.css("display", n ? "" : "none")
	};
	_.isObject(ko) && (ko.observable.fn.editable = function (n) {
		var t = this,
		i = ko.observable(t()),
		r = n || function (n, t) {
			return n !== t
		};
		return t.subscribe(function (n) {
			i(n)
		}),
		this.edit = i,
		this.revert = function () {
			i(t())
		},
		this.commit = function () {
			t(i())
		},
		this.isDirty = function () {
			return r(t(), i())
		},
		this
	}, ko.bindingHandlers.editableText = {
			init: function (t, i) {
				var r = $(t),
				u = ko.utils.unwrapObservable(i());
				r.text(u).on("keyup paste", function () {
					i()(n(r.text()))
				})
			},
			update: function (t, i) {
				var r = $(t),
				u = n(ko.utils.unwrapObservable(i())),
				f = n(r.text());
				f !== u && (r.text(u), r.attr("data-placeholderisset", u.length > 0 ? 0 : 1))
			}
		})
})();
window.Microsoft = window.Microsoft || {};
Microsoft.Photosynth = Microsoft.Photosynth || {};
Microsoft.Photosynth.Compatibility = Microsoft.Photosynth.Compatibility || {}, function () {
	var n = Microsoft.Photosynth.Compatibility;
	n.hasWebGl = function () {
		try {
			var n = document.createElement("canvas");
			return !!(window.WebGLRenderingContext && (n.getContext("experimental-webgl") || n.getContext("webgl")))
		} catch (t) {
			return !1
		}
	}
	();
	n.hasFileAPIs = function () {
		return !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob
	}
	();
	n.hasStorageAPIs = function () {
		var n = ".";
		try {
			return localStorage.setItem(n, n),
			localStorage.removeItem(n),
			sessionStorage.setItem(n, n),
			sessionStorage.removeItem(n),
			!0
		} catch (t) {
			return !1
		}
	}
	();
	n.isWindowsPhone = function (n) {
		return (n ? /(windows phone)/i : /(windows phone|wpdesktop|zunewp7)/i).test(navigator.userAgent)
	};
	n.isiPad = function () {
		return /iPad/i.test(navigator.userAgent)
	};
	n.isiPhone = function () {
		return /iPhone/i.test(navigator.userAgent)
	};
	n.isiPod = function () {
		return /iPod/i.test(navigator.userAgent)
	};
	n.isiOSDevice = function () {
		return n.isiPad() || n.isiPhone() || n.isiPod()
	};
	n.isBrowserUpgradable = function () {
		return !n.isiOSDevice()
	};
	n.isRunningInCompatMode = function () {
		var n,
		t,
		i,
		r,
		u;
		if (navigator.userAgent.indexOf("MSIE") === -1 || (n = navigator.userAgent.indexOf("Trident/"), n === -1) || (t = n + 8, i = navigator.userAgent.indexOf(".", t), i === -1))
			return !1;
		r = navigator.userAgent.substring(t, i);
		try {
			if (u = parseInt(r, 10), u >= 7)
				return !0
		} catch (f) {
			return !1
		}
		return !1
	};
	n.isBrowserUnsupported = function () {
		return $("html").is(".ie6, .ie7, .ie8, .ie9")
	};
	n.isBrowserOlderThanIE9 = function () {
		return $("html").is(".ie6, .ie7, .ie8")
	};
	n.isIE11OrNewer = function () {
		return /Trident\/.*\srv:[1-9]{2}/i.test(navigator.userAgent)
	};
	n.supportBackgroundVideo = function () {
		return !(n.isiPhone() || n.isiPod() || n.isWindowsPhone())
	}
}
();
Microsoft.Photosynth.Page = Microsoft.Photosynth.Page || {};
Microsoft.Photosynth.Resources = Microsoft.Photosynth.Resources || {};
Microsoft.Photosynth.Resources.Strings = Microsoft.Photosynth.Resources.Strings || {};
Microsoft.Photosynth.Resources.Links = Microsoft.Photosynth.Resources.Links || {}, function () {
	var i = Microsoft.Photosynth,
	t = i.Resources,
	n = t.Strings,
	r = t.Links;
	n.UseModernBrowser = "The Photosynth technical preview requires the latest versions of Internet Explorer, Chrome, or Firefox.";
	n.ListedDescription = "Anyone can search for and view this synth";
	n.UnlistedDescription = "Only those who have the link to this synth can view it";
	n.UsernameError = {
		CannotBeBlank: "Please specify a user name",
		TooLong: "User name is too long",
		CharactersNotAllowed: "User name can only include letters, numbers, periods, underscores, and hyphens",
		MustBeginWithLetter: "User name must begin with letter",
		InvalidFormat: "User name cannot end with a period or a hypen",
		AlreadyInUse: "User name is already in use, try another one",
		FailedToUpdate: "Server failed to update user",
		Default: "Unknown error while setting user profile"
	};
	n.UserProfileServerError = {
		BadRequest: "Must specify a change to user name or description",
		Forbidden: "You are forbidden from modifying this user profile",
		AlreadyRegistered: "User is already registered with Photosynth",
		LoginExpired: "Must be authenticated to register",
		FailedToUpdate: "Server failed to update user profile",
		Default: "Server error encountered while setting user profile"
	};
	n.InvalidEmailFormat = "Email should be formatted as someone@example.com";
	n.EmailRequiredForNotifications = "We need your email address for notifications";
	n.EnterCollectionTitleError = "Please type in a title";
	r.ShootingGuideUrl = "http://go.microsoft.com/?linkid=9841039"
}
();
Microsoft.Photosynth.Util = Microsoft.Photosynth.Util || {}, function () {
	var t = Microsoft.Photosynth,
	n = t.Util,
	i = t.Compatibility,
	r = "[object Array]";
	n.MimeTypes = {
		Jpeg: "image/jpeg"
	};
	n.MonthsStringArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	n.RestMethod = {
		Delete: "DELETE",
		Get: "GET",
		Post: "POST",
		Put: "PUT"
	};
	n.NullFunction = function () {};
	n.KeyCode = {
		Esc: 27,
		Return: 13
	};
	n.UrlRegex = /(^|\s)(((ht|f)tp(s?):\/\/)((([\w-]+\.)+[\w-]+)([\w-.\/?%&=:~!@#$+]*)?))/ig;
	n.WWWUrlRegex = /(^|[^\/])((www\.)(((([\w-]+\.)+[\w-]+)([\w-.\/?%&=:~!@#$+]*)?)))/ig;
	n.NewLineRegex = /(\r\n|\n|\r)/g;
	n.Constants = function () {
		var n = {},
		i = Object.prototype.hasOwnProperty,
		r = {
			string: 1,
			number: 1,
			boolean: 1
		},
		t = (Math.random() + "_").slice(2);
		return {
			set: function (u, f) {
				return this.isDefined(u) ? !1 : i.call(r, typeof f) ? (n[t + u] = f, !0) : !1
			},
			isDefined: function (r) {
				return i.call(n, t + r)
			},
			get: function (i) {
				return this.isDefined(i) ? n[t + i] : null
			}
		}
	};
	n.RawXhrRequest = function (t, i) {
		var u = i || {},
		l = u.onComplete || n.NullFunction,
		a = u.onProgress || n.NullFunction,
		o = u.onError || n.NullFunction,
		s = u.responseType || "",
		v = u.method || n.RestMethod.Get,
		y = u.content || null,
		h = u.headers || [],
		p = u.onUploadProgress || n.NullFunction,
		r = new XMLHttpRequest,
		f,
		e,
		c;
		for (r.open(v, t, !0), f = 0, c = h.length; f < c; ++f)
			e = h[f], r.setRequestHeader(e.name, e.value);
		s && (r.responseType = s);
		r.onload = function () {
			r.readyState === 4 && (r.status >= 400 && r.status <= 500 ? o(r) : l(r))
		};
		r.onerror = function () {
			o(r)
		};
		r.upload.onprogress = function (n) {
			p(n)
		};
		r.onprogress = function (n) {
			a(n)
		};
		r.send(y)
	};
	n.ConcurrencyWorker = function (t, i) {
		function l() {
			++o;
			--e;
			o === h ? r.onComplete() : s()
		}
		function s() {
			while (e < r.concurrency && f.length > 0)
				++e, setTimeout(function () {
					var n = f.shift();
					return function () {
						r.onProcess(n.item, n.index, l)
					}
				}
					(), 0)
		}
		for (var r = {
				concurrency: 1,
				onProcess: n.NullFunction,
				onComplete: n.NullFunction
			}, f = [], h = t.length, o = 0, e = 0, c = function (n, t) {
			this.item = n;
			this.index = t
		}, u = 0; u < t.length; ++u)
			f.push(new c(t[u], u));
		n.extend(i, r);
		s()
	};
	n.Fader = function (n, t, i, r) {
		function c() {
			var n = Date.now(),
			t = n - h;
			u += s * a * t;
			s > 0 && u >= 1 ? (u = 1, f = !1) : s < 0 && u <= 0 && (u = 0, f = !1);
			o ? e(o(u)) : e(u);
			f && (h = n, requestAnimationFrame(c))
		}
		var e = n,
		l = i,
		o = r,
		f = !1,
		a = 1 / t,
		s = 1,
		h,
		u = i;
		e(l);
		this.startAnimating = function (n) {
			(n !== 1 && n !== -1 && console.error("direction must be positive or negative 1"), s = n, (n !== 1 || u !== 1) && (n !== -1 || u !== 0)) && (f || (f = !0, h = Date.now(), requestAnimationFrame(c)))
		};
		this.setPosition = function (n) {
			(n < 0 || n > 1) && console.error("position must be between 0 and 1");
			u = n;
			o ? e(o(u)) : e(u)
		};
		this.isAnimating = function () {
			return f
		}
	};
	n.Fader.Direction = {
		Forward: 1,
		Backward: -1
	};
	n.Fader.createOpacityCallback = function (n, t) {
		return function (i) {
			i !== 0 || t ? $(n).show() : $(n).hide();
			$(n).css({
				opacity: i
			})
		}
	};
	n.Fader.createSlideInCallback = function (n, t, i, r) {
		var u = $(n);
		return u.css("position", "absolute"),
		function (n) {
			var o = 1 - n,
			s = i ? "left" : "top",
			f = i ? $(window).width() : $(window).height(),
			e = o * f + n * t;
			e - f < -1 ? (u.show(), u.css(s, e)) : r && u.hide()
		}
	};
	n.Fader.createSlideInPercentageCallback = function (n, t) {
		var i = $(n);
		return i.css("position", "absolute"),
		function (n) {
			i.css(t ? "left" : "top", (1 - n) * 100 + "%")
		}
	};
	n.Fader.MultiFader = function () {
		var n = [];
		this.addFader = function (t) {
			n.push(t)
		};
		this.startAnimating = function (t) {
			for (var i = 0; i < n.length; i++)
				n[i].startAnimating(t)
		}
	};
	n.extend = function (t, i, r) {
		i = r !== !1 ? i || {}
		 : n.extend(i);
		for (var u in t)
			t.hasOwnProperty(u) && (i[u] = t[u]);
		return i
	};
	n.extendDeep = function (t, i) {
		var r;
		i = i || {};
		for (r in t)
			t.hasOwnProperty(r) && (typeof t[r] == "object" ? (i[r] = n.isArray(t[r]) ? [] : {}, n.extendDeep(t[r], i[r])) : i[r] = t[r]);
		return i
	};
	n.isArray = function (n) {
		return typeof n != "undefined" && Object.prototype.toString.call(n) === r
	};
	n.arrayHasIndex = function (n, t) {
		return t >= 0 && n.length > t
	};
	n.arrayFindFirstIndex = function (n, t) {
		for (var i = 0; i < n.length; ++i)
			if (t(n[i]))
				return i;
		return -1
	};
	n.arrayGetMostOccurrence = function (t, i) {
		var r = {},
		f = t[0],
		u = 0;
		return (i = n.booleanOrDefault(i), !n.isArray(t) || t.length === 0) ? null : (t.forEach(function (n) {
				(n !== null || i) && (_.isNumber(r[n]) ? ++r[n] : r[n] = 1, r[n] > u && (f = n, u = r[n]))
			}), u > 0 ? f : null)
	};
	n.tryParseJson = function (n, t) {
		try {
			var i = JSON.parse(n);
			return t.value = i,
			!0
		} catch (r) {}
		return !1
	};
	n.boolParse = function (t) {
		return n.stringEquals(t, "true", !0)
	};
	n.repeatString = function (n, t) {
		return t <= 0 ? "" : new Array(t + 1).join(n)
	};
	n.transformStringToHtml = function (n) {
		return _.escape(n).replace(/(\r\n|\n|\r)/g, "<br/>").replace(/&#x2F;/ig, "/")
	};
	n.stringEquals = function (n, t, i) {
		return !i ? n === t : n.toLowerCase() === t.toLowerCase()
	};
	n.stringIsEmpty = function (n) {
		return n === ""
	};
	n.stringNullOrWhitespace = function (n, t) {
		return _.isNull(n) || t && _.isUndefined(n) || $.trim(n) === ""
	};
	n.stringStartsWith = function (n, t) {
		return n.slice(0, t.length) === t
	};
	n.stringEndsWith = function (n, t) {
		return n.slice(-t.length) === t
	};
	n.stringOrDefault = function (n, t) {
		return typeof n == "string" ? n : arguments.length === 2 ? t : ""
	};
	n.numberOrDefault = function (n, t) {
		return typeof n == "number" ? n : arguments.length === 2 ? t : 0
	};
	n.objectOrDefault = function (n, t) {
		return typeof n == "object" ? n : arguments.length === 2 ? t : {}
	};
	n.parseIntOrDefault = function (n, t) {
		var i = parseInt(n);
		return isNaN(i) ? arguments.length === 2 ? t : 0 : i
	};
	n.arrayOrDefault = function (t, i) {
		return n.isArray(t) ? t : arguments.length === 2 ? i : []
	};
	n.booleanOrDefault = function (n, t) {
		return typeof n == "boolean" ? n : arguments.length === 2 ? t : !1
	};
	n.functionOrDefault = function (t, i) {
		return typeof t == "function" ? t : arguments.length === 2 ? i : n.NullFunction
	};
	n.oneOfOrDefault = function (n, t, i) {
		return _.contains(_.isArray(t) ? t : [], n) ? n : arguments.length === 3 ? i : undefined
	};
	n.isGuid = function (n) {
		return _.isString(n) && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(n)
	};
	n.isInteger = function (n) {
		return _.isNumber(n) && n % 1 == 0
	};
	n.isValidEmailAddress = function (n) {
		return /(?=^[^@]{1,64}@([^@\.]{1,63}\.)+[^@\.]{2,63}$)(?=^[^@]{1,64}@[^@]{3,253}$)/.test(n)
	};
	n.browserIgnoreEmptyLink = function () {
		$('a[href="#"]').click(function (n) {
			n.preventDefault()
		})
	};
	n.buildQueryStringFromObject = function (t, i) {
		var f = n.stringOrDefault(i, "?"),
		r;
		for (var u in t)
			t.hasOwnProperty(u) && (r = t[u], f += _.isNull(r) ? "" : encodeURIComponent(u) + "=" + encodeURIComponent(r) + "&");
		return f.slice(0, -1)
	};
	n.buildObjectFromQueryString = function (n) {
		var t = (n || window.location.search).substr(1),
		i = {};
		return _.isString(t) && t.split("&").forEach(function (n) {
			var t = n.split("=");
			t.length === 2 && (i[t[0].toLowerCase()] = decodeURIComponent(t[1]))
		}),
		i
	};
	n.trailUrl = function (t) {
		var i = n.stringOrDefault(t);
		return n.stringEndsWith(i, "/") ? i : i + "/"
	};
	n.selectElementText = function (n) {
		var i = document,
		t,
		r;
		i.body.createTextRange ? (t = i.body.createTextRange(), t.moveToElementText(n), t.select()) : window.getSelection && (r = window.getSelection(), t = i.createRange(), t.selectNodeContents(n), r.removeAllRanges(), r.addRange(t))
	};
	n.getSelectedTextInfo = function () {
		var f = 3,
		n = window.getSelection ? window.getSelection().getRangeAt(0) : null,
		t = null,
		i = 0,
		r = 0,
		u = "";
		if (n === null)
			return console.warn("window.getSelection() is not available"), null;
		if (i = n.startOffset, !n.collapsed) {
			if (t = n.startContainer, t.nodeType === f)
				u = t.nodeValue, r = Math.max(i, n.endOffset);
			else if (t.firstChild && t.firstChild.nodeType === f)
				u = t.firstChild.nodeValue, r = u.length;
			else
				return console.warn("Unable to find text node"), {
					start: 0,
					end: 0,
					data: null,
					length: 0
				};
			i >= n.endOffset && (r = u.length)
		}
		return {
			start: i,
			end: Math.max(i, r),
			data: u,
			length: Math.max(r - i, 0)
		}
	};
	n.replaceSelectedText = function (n) {
		var t = window.getSelection ? window.getSelection().getRangeAt(0) : null;
		t && document.createRange && (t.deleteContents(), t.insertNode(document.createTextNode(n)), t = document.createRange(), t.collapse(!1))
	};
	n.setCaretPosition = function (t, i, r, u) {
		function o() {
			try {
				var o = t.childNodes[n.numberOrDefault(u)];
				r = n.numberOrDefault(r, i);
				f.setStart(o, i);
				i === r ? f.collapse(!0) : f.setEnd(o, r);
				e.removeAllRanges();
				e.addRange(f);
				t.focus()
			} catch (s) {}
		}
		var f = document.createRange ? document.createRange() : null,
		e = window.getSelection ? window.getSelection() : null;
		f && e ? (o(), setTimeout(o, 1)) : (f === null && console.warn("document.createRange() is not available"), e === null && console.warn("window.getSelection() is not available"))
	};
	n.getClipboardText = function (n) {
		return window.clipboardData ? window.clipboardData.getData("Text") : (n.originalEvent || n).clipboardData.getData("text/plain")
	};
	n.initCoveredVideo = function (n, t) {
		var i = $(n);
		i.removeAttr("controls");
		i.bind("contextmenu", function () {
			return !1
		});
		_.isFunction(t) && i.bind("loadstart", function () {
			t()
		})
	};
	n.anchorLinks = function (t, i) {
		return (i ? t : n.transformStringToHtml(t)).replace(n.UrlRegex, '$1<a href="$2" target="_blank">$2<\/a>').replace(n.WWWUrlRegex, '$1<a href="http://$2" target="_blank">$2<\/a>').replace(/<\/a> <a /g, "<\/a>&nbsp;<a ")
	};
	n.enforceRefresh = function () {
		var t = $("#refresh"),
		r = "1",
		n = !1,
		u;
		if (!i.isIE11OrNewer())
			return !1;
		u = window.setInterval(function () {
				n || t.val() !== r || (n = !0, window.clearInterval(u), t.val(""), window.location.reload())
			}, 200);
		$(window).on("beforeunload", function () {
			n || (n = !0, t.val(r))
		});
		return !0
	};
	n.areColliding = function (n, t) {
		var i = $(n)[0].getBoundingClientRect(),
		r = $(t)[0].getBoundingClientRect();
		return i.left < r.right && i.right > r.left && i.top < r.bottom && i.bottom > r.top
	};
	n.setCookie = function (n, t, i, r, u, f) {
		var e = n + "=" + escape(t) + (i ? "; expires=" + i.toGMTString() : "") + (r ? "; path=" + r : "") + (u ? "; domain=" + u : "") + (f ? "; secure" : "");
		document.cookie = e
	};
	n.getCookie = function (n) {
		var i = new RegExp("(^|;)\\s?" + n + "=(.*?)(;|$)", "i"),
		t = document.cookie.match(i);
		return t ? decodeURIComponent(t[2]) : null
	};
	n.resetInputs = function (n) {
		var t = $(n);
		t.wrap("<form>").closest("form").each(function () {
			this.reset()
		});
		t.unwrap()
	};
	n.byteToMByte = function (n) {
		return n / 1048576
	};
	n.formatDateDefault = function (t) {
		if (!_.isDate(t)) {
			console.warn("'date' is not a valid Date object");
			return
		}
		return n.MonthsStringArray[t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear()
	};
	n.schemeUrl = function (t, i) {
		return _.isString(t) ? (i = i || window.location.protocol, n.stringEndsWith(i, ":") || (i += ":"), n.stringStartsWith(t, "//") ? i + t : t) : t
	}
}
();
Microsoft.Photosynth.Paging = Microsoft.Photosynth.Paging || {}, function () {
	function i(n, t) {
		return n + (t != null ? "," + t : "")
	}
	var n = Microsoft.Photosynth.Paging,
	t = Microsoft.Photosynth.Util;
	n.getPageInfo = function (n) {
		var e = arguments.length === 1 ? n : {
			indexHint: 0,
			id: null
		},
		r = null,
		i = null,
		f = window.location.hash,
		u = (_.isString(f) && f.length) > 1 ? f.substr(1).split(",", 2) : [];
		return u.length >= 1 ? (r = parseInt(u[0], 10), isNaN(r) || r < 0) ? e : (u.length === 2 && (i = u[1].trim(), i = t.isGuid(i) ? i : null), {
			indexHint: r,
			id: i
		}) : e
	};
	n.savePageInfo = function (n, t) {
		window.history && window.history.replaceState && window.history.replaceState(null, null, location.pathname + location.search + "#" + i(n, t))
	}
}
(), function () {
	function u(t, i, r) {
		var u = {
			done: t || n.NullFunction,
			error: i || n.NullFunction,
			outDataIsArgumentsArray: !1,
			outDataTransformFunc: s,
			passOutDataToDone: !0,
			requestType: n.RestMethod.Get,
			validateFunc: o
		};
		_.isString(r) ? u.requestType = r : _.isObject(r) && n.extend(r, u);
		this.done = u.done;
		this.error = u.error;
		this.outDataIsArgumentsArray = u.outDataIsArgumentsArray;
		this.outDataTransformFunc = u.outDataTransformFunc;
		this.passOutDataToDone = u.passOutDataToDone;
		this.requestType = u.requestType;
		this.validateFunc = u.validateFunc
	}
	function f(n, t, r) {
		t = new u(null, null, t);
		var f = {
			type: t.requestType,
			url: n,
			dataType: i,
			success: function (n, i, r) {
				if (!t.validateFunc(n)) {
					t.error(r.status, r);
					return
				}
				t.passOutDataToDone ? t.outDataIsArgumentsArray ? t.done.apply(null, t.outDataTransformFunc(n)) : t.done(t.outDataTransformFunc(n)) : t.done()
			},
			error: function (n) {
				t.error(n.status, n)
			}
		};
		arguments.length === 3 && (f.data = JSON.stringify(r));
		$.ajax(f)
	}
	var t = Microsoft.Photosynth,
	e = t.Page,
	n = t.Util,
	i = "json",
	o = function () {
		return !0
	},
	s = function (n) {
		return n
	},
	r = {
		restBaseUri: "//photosynth.net/rest/v1.0/",
		maxPhotosForUpload: 200
	};
	e.MasterPage && e.MasterPage.serverDataModel && _.isString(e.MasterPage.serverDataModel.RestBaseUrl) && (r.restBaseUri = e.MasterPage.serverDataModel.RestBaseUrl);
	t.RestClient = function () {
		var c = t.RestClient,
		r = c.GlobalConfig.RestBaseUri(),
		o = r + "me",
		s = o + "/favorites",
		k = s + "/{id}",
		l = o + "/settings/notifications",
		d = o + "/queue",
		h = r + "media",
		a = h + "/{mediaId}/annotations",
		y = a + "/{annotationId}",
		g = h + "/list",
		e = r + "media/{id}",
		p = e + "/export",
		nt = r + "media/compact/geo/{id}",
		tt = h + "/{id}/files",
		w = e + "/stats/views?client={viewType}",
		it = w + "&mode={viewMode}",
		b = o + "/follow",
		v = e + "/comments",
		rt = r + "search/bbox/compact?collectionTypeFilter={collectionTypeFilter}&slat={slat}&wlon={wlon}&nlat={nlat}&elon={elon}&numRows={numRows}&offset={offset}",
		ut = r + "places/geo/interesting";
		this.Users = {
			isLoggedInAsync: function (t, r) {
				var f = t || n.NullFunction,
				u = r || n.NullFunction;
				$.ajax({
					url: o,
					dataType: i,
					success: function (n, t, i) {
						var e = n.Username,
						r = n.UserStatus;
						i.status === 200 && _.isString(e) && _.isString(r) ? f(e, r.toLowerCase() === "ok", r) : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			},
			createAsync: function (i, u, f, e) {
				var s = f || n.NullFunction,
				o = e || n.NullFunction;
				if (!_.isString(i) || t.RestClient.Validation.validateUsername(i) !== t.RestClient.Enum.UsernameValidationState.Valid)
					throw "ArgumentException: createAsync(), username is invalid";
				if (_.isString(u) && u.length > 0 && !n.isValidEmailAddress(u))
					throw "ArgumentException: createAsync(), email address is invalid";
				$.ajax({
					type: n.RestMethod.Put,
					url: r + "users/" + i,
					data: JSON.stringify({
						EmailAddress: u == null ? null : u
					}),
					success: function (n, t, i) {
						i.status === 201 ? s() : o(i.status, i)
					},
					error: function (n) {
						o(n.status, n)
					}
				})
			},
			editAsync: function (i, u, f, e) {
				var h = f || n.NullFunction,
				s = e || n.NullFunction,
				o = {};
				if (!_.isString(i) || t.RestClient.Validation.validateUsername(i) !== t.RestClient.Enum.UsernameValidationState.Valid)
					throw "ArgumentException: createAsync(), username is invalid";
				_.isString(u.Username) && (o.Username = u.Username);
				_.isString(u.Description) && (o.Description = u.Description);
				$.ajax({
					type: n.RestMethod.Post,
					url: r + "users/" + i,
					data: JSON.stringify(o),
					success: function (n, t, i) {
						i.status === 202 ? h() : s(i.status, i)
					},
					error: function (n) {
						s(n.status, n)
					}
				})
			},
			getAsync: function (t, i, u) {
				var e = i || n.NullFunction,
				f = u || n.NullFunction;
				$.ajax({
					type: n.RestMethod.Get,
					url: r + "users/" + t,
					success: function (n, t, i) {
						i.status === 200 ? e(n) : f(i.status, i)
					},
					error: function (n) {
						f(n.status, n)
					}
				})
			},
			verifyEmailAsync: function (t, i, r) {
				var f = {
					Email: {}
				},
				e = i || n.NullFunction,
				u = r || n.NullFunction;
				if (!_.isString(t)) {
					u(400);
					return
				}
				f.Email.VerificationCode = t;
				$.ajax({
					type: n.RestMethod.Post,
					url: l,
					data: JSON.stringify(f),
					success: function (n, t, i) {
						i.status === 200 ? e() : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			}
		};
		this.Users.Favorites = {
			addAsync: function (t, i, r) {
				var f = i || n.NullFunction,
				u = r || n.NullFunction;
				$.ajax({
					type: n.RestMethod.Post,
					url: s + "?id=" + t,
					success: function (n, t, i) {
						var r = n.TimesFavorited;
						i.status === 200 && _.isNumber(r) ? f(n) : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			},
			deleteAsync: function (t, i, r) {
				var f = i || n.NullFunction,
				u = r || n.NullFunction;
				$.ajax({
					type: n.RestMethod.Delete,
					url: s + "?id=" + t,
					success: function (n, t, i) {
						var r = n.TimesFavorited;
						i.status === 200 && _.isNumber(r) ? f(n) : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			},
			getAllAsync: function (t, i, r) {
				var f = i || n.NullFunction,
				u = r || n.NullFunction;
				$.ajax({
					url: s + n.buildQueryStringFromObject(safeParam),
					success: function (n, t, i) {
						i.status === 200 && _.isNumber(n.TotalResults) && _.isArray(n.Collections) ? f(n) : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			},
			getStatusAsync: function (t, i, r) {
				var f = i || n.NullFunction,
				u = r || n.NullFunction;
				$.ajax({
					url: k.replace("{id}", t),
					success: function (n, t, i) {
						i.status === 200 && _.isBoolean(n.IsFavorited) ? f(n) : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			}
		};
		this.Users.Settings = {
			getNotificationSettingsAsync: function (t, r) {
				var f = t || n.NullFunction,
				u = r || n.NullFunction;
				$.ajax({
					url: l,
					dataType: i,
					success: function (n, t, i) {
						i.status === 200 ? f(n) : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			},
			getEmailNotificationSettingsAsync: function (t, i) {
				var u = t || n.NullFunction,
				r = i || n.NullFunction;
				this.getNotificationSettingsAsync(function (n, t) {
					var i = n.Email;
					i || i === null ? u(i) : r(t.status, t)
				}, r)
			},
			setNotificationSettingsAsync: function (t, i, r) {
				var u = {},
				o = t || {},
				f = o.Email || null,
				s = i || n.NullFunction,
				e = r || n.NullFunction;
				if (f === null) {
					console.warn("setNotificationSettingsAsync(): nothing to update");
					return
				}
				u.Email = f;
				$.ajax({
					type: n.RestMethod.Post,
					url: l,
					data: JSON.stringify(u),
					success: function (n, t, i) {
						i.status === 200 ? s() : e(i.status, i)
					},
					error: function (n) {
						e(n.status, n)
					}
				})
			},
			setEmailNotificationSettingsAsync: function (n, t, i) {
				this.setNotificationSettingsAsync({
					Email: n
				}, t, i)
			}
		};
		this.Users.Queue = {
			getQueueAsync: function (t, r) {
				var f = t || n.NullFunction,
				u = r || n.NullFunction;
				$.ajax({
					url: d,
					dataType: i,
					success: function (n, t, i) {
						i.status === 200 ? f(n) : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			}
		};
		this.Media = {
			createAsync: function (t, r, u) {
				var e = r || n.NullFunction,
				f = u || n.NullFunction;
				if (_.isNumber(t)) {
					if (!_.contains(c.Enum.UploadType, t))
						throw "ArgumentException: createAsync(), unknown uploadTypeId: " + t;
				} else
					throw "ArgumentException: createAsync(), uploadTypeId is not a number";
				$.ajax({
					type: n.RestMethod.Put,
					url: h,
					data: JSON.stringify({
						UploadType: t
					}),
					dataType: i,
					success: function (t, i, r) {
						var u = t.Id;
						_.isString(u) && n.isGuid(u) ? e(u) : f(r.status, !1, r)
					},
					error: function (t) {
						var i = {},
						r = n.tryParseJson(t.responseText, i) && i.value && i.value.ErrorCode === "MaxConcurrentCloudSynthsReached";
						f(t.status, r)
					}
				})
			},
			addFilesAsync: function (t, r, u, f) {
				var v = u || n.NullFunction,
				l = f || n.NullFunction,
				a = [],
				o = [],
				h = _.isArray(r) ? r.length : 0,
				e,
				s,
				c;
				if (!_.isString(t) || !n.isGuid(t) || h === 0)
					throw "ArgumentException: addFilesAsync()";
				for (e = 0; e < h; ++e)
					o[e] = {
						info: r[e],
						originalIndex: e
					};
				for (o = o.sort(function (n, t) {
							var i = n.info.fileUploadObject.name,
							r = t.info.fileUploadObject.name;
							return i === r ? 0 : i < r ? -1 : 1
						}), s = 0; s < o.length; ++s)
					c = o[s], a[c.originalIndex] = {
						Extension: "jpg",
						Id: c.info.id,
						ChunkCount: 1,
						Order: "" + s
					};
				$.ajax({
					type: n.RestMethod.Put,
					url: tt.replace("{id}", t),
					data: JSON.stringify({
						Files: a
					}),
					dataType: i,
					success: function (t, i, r) {
						var u = t.Files;
						n.isArray(u) && u.length === h ? v(t) : l(r.status, r)
					},
					error: function (n) {
						l(n.status, n)
					}
				})
			},
			deleteAsync: function (t, i, r) {
				var f = i || n.NullFunction,
				u = r || n.NullFunction;
				if (!_.isString(t) || !n.isGuid(t))
					throw "ArgumentException: deleteAsync()";
				$.ajax({
					type: n.RestMethod.Delete,
					url: e.replace("{id}", t),
					success: function (n, t, i) {
						i.status === 200 ? f() : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			},
			editAsync: function (t, i, r, u) {
				var o = r || n.NullFunction,
				f = u || n.NullFunction;
				if (!_.isString(t) || !n.isGuid(t) || !_.isObject(i))
					throw "ArgumentException: editAsync()";
				$.ajax({
					type: n.RestMethod.Post,
					url: e.replace("{id}", t),
					data: JSON.stringify(i),
					success: function (n, t, i) {
						i.status === 200 ? o() : f(i.status, i)
					},
					error: function (n) {
						f(n.status, n)
					}
				})
			},
			getAsync: function (t, r, u) {
				var o = r || n.NullFunction,
				f = u || n.NullFunction;
				if (!_.isString(t) || !n.isGuid(t))
					throw "ArgumentException: getAsync()";
				$.ajax({
					type: n.RestMethod.Get,
					url: e.replace("{id}", t),
					dataType: i,
					success: function (n, t, i) {
						i.status === 200 ? o(n) : f(i.status, i)
					},
					error: function (n) {
						f(n.status, n)
					}
				})
			},
			getExportStatusAsync: function (t, i, r) {
				var o = i || n.NullFunction,
				s = r || n.NullFunction,
				e;
				if (!_.isString(t) || !n.isGuid(t))
					throw "ArgumentException: getExportStatusAsync()";
				e = new u(o, s);
				f(p.replace("{id}", t), e)
			},
			getListAsync: function (t, i, r) {
				var e = new u(i, r, n.RestMethod.Post);
				f(g, e, {
					Ids: t
				})
			},
			getGeoCompactAsync: function (t, i, r) {
				var o = i || n.NullFunction,
				s = r || n.NullFunction,
				e;
				if (!_.isString(t) || !n.isGuid(t))
					throw "ArgumentException: getGeoCompactAsync()";
				e = new u(o, s, n.RestMethod.Get);
				f(nt.replace("{id}", t), e)
			},
			incrementViewsAsync: function (t, i, r, u, f) {
				var o = u || n.NullFunction,
				e = f || n.NullFunction;
				if (!_.isString(t) || !n.isGuid(t))
					throw "ArgumentException: incrementViewsAsync()";
				$.ajax({
					type: n.RestMethod.Post,
					url: (r ? it : w).replace("{id}", t).replace("{viewType}", i || "Site").replace("{viewMode}", r),
					success: function (n, t, i) {
						i.status === 200 ? o() : e(i.status, i)
					},
					error: function (n) {
						e(n.status, n)
					}
				})
			},
			startExportAsync: function (t, i, r) {
				var o = i || n.NullFunction,
				s = r || n.NullFunction,
				e;
				if (!_.isString(t) || !n.isGuid(t))
					throw "ArgumentException: startExportAsync()";
				e = new u(o, s, n.RestMethod.Post);
				f(p.replace("{id}", t), e)
			}
		};
		this.Following = {
			startFollowingUserAsync: function (t, i, r) {
				var f = i || n.NullFunction,
				u = r || n.NullFunction;
				$.ajax({
					type: n.RestMethod.Post,
					url: b,
					data: JSON.stringify({
						Username: t
					}),
					success: function (n, t, i) {
						i.status === 200 ? f() : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			},
			stopFollowingUserAsync: function (t, i, r) {
				var f = i || n.NullFunction,
				u = r || n.NullFunction;
				$.ajax({
					type: n.RestMethod.Delete,
					url: b,
					data: JSON.stringify({
						Username: t
					}),
					success: function (n, t, i) {
						i.status === 200 ? f() : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			}
		};
		this.Comments = {
			addAsync: function (t, i, r, u, f, e) {
				var s = f || n.NullFunction,
				o = e || n.NullFunction,
				h = n.numberOrDefault(r, 100),
				c = n.numberOrDefault(u, 0);
				$.ajax({
					type: n.RestMethod.Post,
					url: v.replace("{id}", t) + "?" + $.param({
						numRows: h,
						offset: c
					}),
					data: JSON.stringify({
						Text: i
					}),
					success: function (n, t, i) {
						i.status === 200 ? s(n) : o(i.status, i)
					},
					error: function (n) {
						o(n.status, n)
					}
				})
			},
			deleteAsync: function (t, i, r, u, f, e) {
				var s = f || n.NullFunction,
				o = e || n.NullFunction,
				h = n.numberOrDefault(r, 100),
				c = n.numberOrDefault(u, 0);
				$.ajax({
					type: n.RestMethod.Delete,
					url: n.trailUrl(v.replace("{id}", t)) + i + "?" + $.param({
						numRows: h,
						offset: c
					}),
					success: function (n, t, i) {
						i.status === 200 ? s(n) : o(i.status, i)
					},
					error: function (n) {
						o(n.status, n)
					}
				})
			},
			getAsync: function (t, i, r, u, f) {
				// Instead of loading comments from "/comments" xhr request, I read them from the
				// embedded json in the view page: Microsoft.Photosynth.Page.Comments.
				var callback = u,	
				raw_comments = Microsoft.Photosynth.Page.Comments,	
				json_comments = {	
					"Comments": raw_comments,	
					"TotalResults": raw_comments.length	
				};	
				callback(json_comments);
			}
		};
		this.Annotations = {
			createAsync: function (t, i, r, u) {
				var o = r || n.NullFunction,
				f = u || n.NullFunction,
				e;
				if (!n.isGuid(t) || !_.isObject(i) || !_.isString(i.Description) || !_.isObject(i.Placement))
					throw "ArgumentException: createAsync()";
				e = {
					Description: i.Description,
					Placement: i.Placement
				};
				$.ajax({
					type: n.RestMethod.Put,
					url: a.replace("{mediaId}", t),
					data: JSON.stringify(e),
					success: function (n, t, i) {
						i.status === 200 ? o(n) : f(i.status, i)
					},
					error: function (n) {
						f(n.status, n)
					}
				})
			},
			deleteAsync: function (t, i, r, u) {
				var f = r || n.NullFunction,
				e = u || n.NullFunction;
				if (!n.isGuid(t) || !n.isInteger(i))
					throw "ArgumentException: deleteAsync()";
				$.ajax({
					type: n.RestMethod.Delete,
					url: y.replace("{mediaId}", t).replace("{annotationId}", i),
					success: function (n, t, i) {
						i.status === 200 ? f(!0) : e(i.status, i)
					},
					error: function (n) {
						n.status === 404 ? f(!1) : e(n.status, n)
					}
				})
			},
			getForCollectionAsync: function (t, i, r) {
				var f = i || n.NullFunction,
				u = r || n.NullFunction;
				if (!n.isGuid(t))
					throw "ArgumentException: getForCollectionAsync()";
				$.ajax({
					type: n.RestMethod.Get,
					url: a.replace("{mediaId}", t),
					success: function (n, t, i) {
						i.status === 200 ? f(n) : u(i.status, i)
					},
					error: function (n) {
						u(n.status, n)
					}
				})
			},
			updateAsync: function (t, i, r, u, f) {
				var s = u || n.NullFunction,
				e = f || n.NullFunction,
				o;
				if (!n.isGuid(t) || !n.isInteger(i) || !_.isObject(r) || r.Description != null && !_.isString(r.Description) || r.Placement != null && !_.isObject(r.Placement) || r.Thumbnail != null && !_.isObject(r.Thumbnail))
					throw "ArgumentException: updateAsync()";
				if (r.Description == null && r.Placement == null && r.Thumbnail == null)
					throw "ArgumentException: updateAsync() Nothing is being changed!";
				o = {
					Description: r.Description,
					Placement: r.Placement,
					Thumbnail: r.Thumbnail
				};
				$.ajax({
					type: n.RestMethod.Post,
					url: y.replace("{mediaId}", t).replace("{annotationId}", i),
					data: JSON.stringify(o),
					success: function (n, t, i) {
						i.status === 200 ? s(n) : e(i.status, i)
					},
					error: function (n) {
						e(n.status, n)
					}
				})
			}
		};
		this.Search = {
			bboxAsync: function (t, i, r) {
				var o = i || n.NullFunction,
				f = r || n.NullFunction,
				u = t || {},
				s = n.stringOrDefault(u.collectionTypeFilter, c.Enum.CollectionTypeFilters.SynthPackets),
				h = u.nlat,
				l = u.wlon,
				a = u.slat,
				v = u.elon,
				y = n.numberOrDefault(u.numRows, 1e3),
				p = n.numberOrDefault(u.offset, 0),
				e = n.stringOrDefault(u.userName, null);
				return $.ajax({
					type: n.RestMethod.Get,
					url: rt.replace("{collectionTypeFilter}", s).replace("{slat}", a).replace("{wlon}", l).replace("{nlat}", h).replace("{elon}", v).replace("{numRows}", y).replace("{offset}", p) + (e ? "&userName=" + e : ""),
					success: function (n, t, i) {
						i.status === 200 ? o(n) : f(i.status, i)
					},
					error: function (n) {
						f(n.status, n)
					}
				})
			}
		};
		this.Places = {
			geoInterestingAsync: function (n, t) {
				f(ut, {
					done: n,
					error: t
				})
			}
		}
	}
	.addStatic("GlobalConfig", {
		RestBaseUri: function (n) {
			if (arguments.length === 0)
				return r.restBaseUri;
			_.isString(n) || console.warn("RestBaseUri(), value is not a string");
			r.restBaseUri = n
		},
		MaxContentLengthForUpload: function () {
			return 20971520
		},
		MinContentLengthForUploadWarning: function () {
			return 10485760
		},
		MinPhotosForUpload: function () {
			return 3
		},
		MinPhotosForUploadString: function () {
			return "three"
		},
		MaxPhotosForUpload: function (i) {
			if (arguments.length === 0)
				return r.maxPhotosForUpload;
			var u = t.RestClient.GlobalConfig.MinPhotosForUpload();
			(!n.isInteger(i) || i < u) && console.warn("MaxPhotosForUpload(), value is not an integer or is at least " + u);
			r.maxPhotosForUpload = i
		},
		MediaTitleMaxLength: function () {
			return 128
		},
		UsernameMaxLength: function () {
			return 23
		},
		EmailMaxLength: function () {
			return 254
		},
		MediaDescriptionMaxLength: function () {
			return 3702
		},
		CommentMaxLength: function () {
			return 980
		}
	}).addStatic("IndexMap", {
		Topologies: [{
				value: "Spin",
				friendlyName: "Spin"
			}, {
				value: "Panorama",
				friendlyName: "Panorama"
			}, {
				value: "Wall",
				friendlyName: "Wall"
			}, {
				value: "Walk",
				friendlyName: "Walk"
			}
		],
		Licenses: [{
				value: "CCAttribution",
				friendlyName: "CC - Attribution",
				link: "http://creativecommons.org/licenses/by/3.0/"
			}, {
				value: "CCAttributionShareAlike",
				friendlyName: "CC - Attribution Share Alike",
				link: "http://creativecommons.org/licenses/by-sa/3.0/"
			}, {
				value: "CCAttributionNoDerivatives",
				friendlyName: "CC - Attribution No Derivatives",
				link: "http://creativecommons.org/licenses/by-nd/3.0/"
			}, {
				value: "CCAttributionNonCommercial",
				friendlyName: "CC - Attribution Non-Commercial",
				link: "http://creativecommons.org/licenses/by-nc/3.0/"
			}, {
				value: "CCAttributionNonCommercialShareAlike",
				friendlyName: "CC - Attribution Non-Commercial Share Alike",
				link: "http://creativecommons.org/licenses/by-nc-sa/3.0/"
			}, {
				value: "CCAttributionNonCommercialNoDerivatives",
				friendlyName: "CC - Attribution Non-Commercial No Derivatives",
				link: "http://creativecommons.org/licenses/by-nc-nd/3.0/"
			}, {
				value: "PublicDomain",
				friendlyName: "Public Domain",
				link: "#"
			}, {
				value: "AllRightsReserved",
				friendlyName: "All Rights Reserved",
				link: "#"
			}
		],
		FindLicenseByValue: function (n) {
			return _.find(t.RestClient.IndexMap.Licenses, function (t) {
				return t.value === n
			})
		}
	}).addStatic("Enum", {
		Privacy: {
			Listed: 0,
			Unlisted: 1
		},
		UploadType: {
			CubeFacePano: 1,
			RawImagePano: 2,
			RawImageSpin: 3
		},
		UsernameValidationState: {
			Valid: 0,
			CannotBeBlank: 1,
			TooLong: 2,
			CharactersNotAllowed: 3,
			MustBeginWithLetter: 4,
			InvalidFormat: 5
		},
		MediaStatus: {
			Available: {
				string: "Available"
			},
			Pending: {
				string: "Pending"
			},
			Committed: {
				string: "Committed"
			},
			Queued: {
				string: "Queued"
			},
			Processing: {
				string: "Processing"
			},
			Succeeded: {
				string: "Succeeded"
			},
			InsufficientCameras: {
				string: "InsufficientCameras"
			},
			Failed: {
				string: "Failed"
			},
			Unknown: {
				string: "Unknown"
			},
			UserCanceled: {
				string: "UserCanceled"
			}
		},
		ViewModes: {
			Standard: "Standard",
			Movie: "Movie"
		},
		ViewTypes: {
			Site: "Site",
			Embed: "Embed"
		},
		CollectionTypeFilters: {
			Synths: "Synths",
			Panos: "Panos",
			Photos: "Photos",
			SynthPackets: "SynthPackets",
			All: "Synths,Panos,Photos,SynthPackets"
		}
	}).addStatic("Validation", {
		validateUsername: function (i) {
			var r = i.trim();
			if (r === "")
				return t.RestClient.Enum.UsernameValidationState.CannotBeBlank;
			if (r.length > t.RestClient.GlobalConfig.UsernameMaxLength)
				return t.RestClient.Enum.UsernameValidationState.TooLong;
			if (/^([a-zA-Z0-9\._\-]+)$/.test(r))
				if (/^[a-zA-Z]/.test(r)) {
					if (n.stringEndsWith(r, ".") || n.stringEndsWith(r, "-") || n.stringEndsWith(r, "._") || n.stringEndsWith(r, "-_"))
						return t.RestClient.Enum.UsernameValidationState.InvalidFormat
				} else
					return t.RestClient.Enum.UsernameValidationState.MustBeginWithLetter;
			else
				return t.RestClient.Enum.UsernameValidationState.CharactersNotAllowed;
			return t.RestClient.Enum.UsernameValidationState.Valid
		}
	}).addStatic("AddFileInfo", function (n, t) {
		this.id = n;
		this.fileUploadObject = t
	}).addStatic("Uploader", function (i, r) {
		var e = {
			NotStarted: 0,
			Started: 1,
			Failed: 2,
			Succeeded: 3
		},
		ct = function (n) {
			this.File = n;
			this.State = e.NotStarted;
			this.UploadUri = null;
			this.UploadedSize = 0;
			this.Omitted = !1
		},
		u = this,
		h = t.RestClient,
		tt = new t.RestClient,
		lt = h.Enum.UploadType.RawImageSpin,
		s = i || {},
		at = "Untitled",
		vt = "",
		v = s.title,
		y = s.description,
		it = s.isListed,
		p = s.notifyOnComplete,
		st = null,
		w = s.topologyHintIndex,
		b = s.license,
		l = null,
		a = null,
		yt = _.isNumber(s.maxParallelUploads) && s.maxParallelUploads > 0 ? s.maxParallelUploads : 2,
		o = null,
		f = [],
		rt = [],
		k = !1,
		d = !1,
		g = !1,
		nt = !1,
		c = r || {},
		ht = function () {
			var n = 0;
			return $.each(f, function () {
				this.UploadUri !== null && ++n
			}),
			n
		},
		ut = function (n, t) {
			var i = function () {
				$.each(f, function () {
					this.State = e.Failed
				});
				t.apply(this, arguments)
			},
			r = function () {
				for (var u = [], t = 0, r; t < f.length; ++t)
					r = f[t], r.Omitted || u.push(new h.AddFileInfo(t, r.File));
				tt.Media.addFilesAsync(o, u, function (t) {
					for (var i = 0, r, u; i < t.Files.length; ++i)
						r = t.Files[i], u = f[r.ClientId], u.UploadUri = r.Chunks[0].UploadUri, u.UploadedSize = 0;
					n()
				}, i)
			};
			o === null ? tt.Media.createAsync(lt, function (n) {
				o = n;
				r()
			}, i) : r()
		},
		pt = function (t) {
			function r(n, r, e) {
				var o = 0,
				s = u.getTotalSize();
				i.UploadedSize = n;
				$.each(f, function () {
					o += Math.min(this.UploadedSize, this.File.size)
				});
				o = Math.min(o, s);
				u.onUploadProgressing(t, r, o, s, e)
			}
			var i = f[t];
			i.State = e.Started;
			new n.RawXhrRequest(i.UploadUri, {
				method: n.RestMethod.Post,
				content: i.File,
				uriAbsolute: !0,
				onComplete: function (n) {
					if (n.status === 200) {
						i.UploadedSize = i.File.size;
						i.State = e.Succeeded;
						u.onUploadSucceed(t);
						if (u.isAllUploadsCompleted()) {
							u.onAllUploadsComplete(o);
							u.commitAsync()
						}
					} else {
						i.State = e.Failed;
						u.onUploadFail(t, n.status)
					}
					ft()
				},
				onError: function (n) {
					i.State = e.Failed;
					u.onUploadFail(t, n.status);
					r(0, 0, !0);
					ft()
				},
				onUploadProgress: function (n) {
					var t = Math.round(100 * n.loaded / n.totalSize);
					r(n.loaded, t, !1)
				}
			})
		},
		ft = function () {
			var n = rt.shift();
			typeof n == "undefined" ? k = !1 : (k = !0, pt(n))
		},
		et = function (n) {
			var t = f[n];
			t.Omitted || (f[n].State = e.NotStarted, rt.push(n))
		},
		ot = function () {
			if (!k)
				for (var n = 0; n < yt; ++n)
					ft()
		};
		this.onUploadSucceed = c.onUploadSucceed || n.NullFunction;
		this.onUploadFail = c.onUploadFail || n.NullFunction;
		this.onUploadProgressing = c.onUploadProgressing || n.NullFunction;
		this.onUploadInitFail = c.onUploadInitFail || n.NullFunction;
		this.onAllUploadsComplete = c.onAllUploadsComplete || n.NullFunction;
		this.onCommitSucceed = c.onCommitSucceed || n.NullFunction;
		this.onCommitFail = c.onCommitFail || n.NullFunction;
		this.title = function (n) {
			if (arguments.length === 0)
				return v;
			v = _.isString(n) && n.trim().length > 0 ? n : at
		};
		this.description = function (n) {
			if (arguments.length === 0)
				return y;
			y = _.isString(n) && n.trim().length > 0 ? n : vt
		};
		this.listed = function (n) {
			if (arguments.length === 0)
				return it;
			it = n;
			st = _.isBoolean(n) && !n ? h.Enum.Privacy.Unlisted : h.Enum.Privacy.Listed
		};
		this.topologyHintIndex = function (t) {
			if (arguments.length === 0)
				return w;
			w = _.isNumber(t) && n.arrayHasIndex(h.IndexMap.Topologies, t) ? t : 0
		};
		this.license = function (n) {
			var t = h.IndexMap.Licenses,
			i;
			if (arguments.length === 0)
				return b;
			i = _.find(t, function (t) {
					return t.value === n
				});
			b = i ? n : t[0].value
		};
		this.geoTag = function (n) {
			if (arguments.length === 0)
				return l;
			l = n
		};
		this.mapZoomLevel = function (n) {
			if (arguments.length === 0)
				return a;
			a = n
		};
		this.notifyOnComplete = function (n) {
			if (arguments.length === 0)
				return p;
			p = !!n
		};
		u.title(v);
		u.description(y);
		u.topologyHintIndex(w);
		u.listed(it);
		u.license(b);
		u.geoTag(l);
		u.mapZoomLevel(a);
		u.notifyOnComplete(p);
		this.reset = function () {
			var n = f.length;
			return f = [],
			rt = [],
			o = null,
			d = !1,
			g = !1,
			nt = !1,
			u.listed(null),
			u.title(null),
			u.description(null),
			u.topologyHintIndex(null),
			u.license(null),
			u.geoTag(null),
			u.mapZoomLevel(null),
			n
		};
		this.addFiles = function (n) {
			if (k)
				throw "InvalidOperationException: addFiles(), cannot add files while uploading";
			for (var t = 0, i = n.length; t < i; ++t)
				f.push(new ct(n[t]))
		};
		this.omitFile = function (n) {
			if (n >= f.length)
				throw "IndexOutOfRangeException: omitFile(), index";
			f[n].Omitted = !0
		};
		this.getUploadedFilenames = function () {
			return _.map(_.filter(f, function (n) {
					return !n.Omitted
				}), function (n) {
				return n.File.name
			})
		};
		this.getTotalFiles = function (t) {
			var i = 0,
			r = n.booleanOrDefault(t, !1);
			return $.each(f, function () {
				(r || !this.Omitted) && ++i
			}),
			i
		};
		this.getTotalFilesUploaded = function () {
			var n = 0;
			return $.each(f, function () {
				this.State === e.Succeeded && ++n
			}),
			n
		};
		this.getTotalFilesFailed = function () {
			var n = 0;
			return $.each(f, function () {
				this.State === e.Failed && ++n
			}),
			n
		};
		this.getTotalSize = function () {
			var n = 0;
			return $.each(f, function () {
				this.Omitted || (n += this.File.size)
			}),
			n
		};
		this.isAllUploadsCompleted = function () {
			return u.getTotalFilesUploaded() === u.getTotalFiles()
		};
		this.isComitted = function () {
			return d
		};
		this.markReadyForCommit = function () {
			nt = !0
		};
		this.commitAsync = function () {
			var t = function () {
				d = !0;
				u.onCommitSucceed()
			},
			i = function () {
				g = !1;
				u.onCommitFail()
			},
			n = {
				Name: v,
				Description: y,
				ImageCount: u.getTotalFiles(),
				PrivacyLevel: st,
				CapturedDate: "/Date(" + Date.now() + "+0000)/",
				Committed: 1,
				UploadHints: h.IndexMap.Topologies[w].value,
				SynthPacket: {
					License: b
				},
				NotifyOnComplete: p
			};
			(l && (n.GeoTag = l, a !== null && (n.MapZoomLevel = a)), d || !nt || g) || (nt = !0, o !== null && (g = !0, tt.Media.editAsync(o, n, t, i)))
		};
		this.uploadAsync = function () {
			var n = function () {
				for (var n = 0; n < f.length; ++n)
					et(n);
				ot()
			};
			ut(n, u.onUploadInitFail)
		};
		this.retryUploadAsync = function (n) {
			var t = function () {
				et(n);
				ot()
			},
			i = ht();
			o === null || f.length > i ? (i > 0 && (o = null), ut(t, u.onUploadInitFail)) : t()
		};
		this.retryAllUploadsAsync = function () {
			var n = function () {
				for (var n = 0, t; n < f.length; ++n)
					t = f[n], t.State === e.Failed && et(n);
				ot()
			};
			o === null || f.length > ht() ? ut(n, u.onUploadInitFail) : n()
		}
	})
}
();
Microsoft.Photosynth.Controls = Microsoft.Photosynth.Controls || {}, function () {
	function i(t) {
		$("[" + n.PoppedAttribute + '="true"]').attr(n.PoppedAttribute, !1);
		t.stopPropagation()
	}
	var r = Microsoft.Photosynth,
	n = r.Controls,
	t = r.Util,
	f = r.Resources,
	u = t.Fader;
	n.StyledAttribute = "data-psc-styled";
	n.PoppedAttribute = "data-psc-popped";
	n.MinimizedAttribute = "data-psc-minimized";
	$(document).click(i);
	$(window).blur(i);
	document.execCommand("AutoUrlDetect", !1, !1);
	_.isObject(ko) && (ko.bindingHandlers.styleControls = {
			init: function (t, i) {
				ko.utils.unwrapObservable(i()) && n.styleAll(null, t)
			}
		});
	n.AlertWindow = function (n) {
		var e = "psc-default-alert",
		y = e + "-parent",
		o = _.uniqueId(e + "-"),
		i = "#" + o,
		p = $("body"),
		r = n || {},
		u = r.title || "",
		s = r.message || "",
		w = r.okText || "OK",
		b = r.cancelText || "Cancel",
		k = r.showCancel || !1,
		l = function (n, t) {
			return function () {
				var i = !1,
				r = {
					preventDefault: function () {
						i = !0
					}
				};
				n(r);
				i || $(t).hide()
			}
		},
		a = l(r.onOkClick || t.NullFunction, i),
		v = l(r.onCancelClick || t.NullFunction, i),
		h = "ps-sq-ok",
		c = "ps-sq-cancel",
		f;
		p.addClassOnce(y).append('<div id="' + o + '" class="' + e + '" style="display:none"><div class="ps-sq-transparent-film"><\/div><div class="ps-sq-box"><section/><\/div><\/div>');
		f = function () {
			$(i + " ." + h).off("click", a);
			$(i + " ." + c).off("click", v);
			$(i + " section").html((u !== "" ? "<h2>" + _.escape(u) + "<\/h2>" : "") + "<p>" + _.escape(s) + '<\/p><nav><button class="' + h + '">' + _.escape(w) + "<\/button>" + (k ? '&nbsp;<button class="' + c + '">' + _.escape(b) + "<\/button>" : "") + "<\/nav>");
			$(i + " ." + h).click(a);
			$(i + " ." + c).click(v)
		};
		f();
		this.id = o;
		this.title = function (n) {
			if (arguments.length === 0)
				return u;
			u = n;
			f()
		};
		this.message = function (n) {
			if (arguments.length === 0)
				return s;
			s = n;
			f()
		}
	}
	.addPrototype("alert", function () {
		var n = $("#" + this.id),
		t = n.children(".ps-sq-box");
		n.show();
		t.css({
			"margin-top": -t.height() / 2
		})
	});
	n.ConfirmWindow = function (i, r) {
		if (typeof i != "string")
			throw "ArgumentException: new ConfirmWindow(),  parentSelector is invalid";
		var o = n.ConfirmWindow.WindowResultType,
		v = this,
		e = "psc-default-confirm",
		k = e + "-parent",
		s = _.uniqueId(e + "-"),
		u = "#" + s,
		d = $(i).filter(":first"),
		f = r || {},
		h = f.message || "",
		g = f.okText || "OK",
		nt = f.cancelText || "Cancel",
		tt = "hideOnDocumentClick" in f ? f.hideOnDocumentClick : !0,
		it = "hideOnButtonClick" in f ? f.hideOnButtonClick : !0,
		y = function (n, t, i) {
			return function (t) {
				var r = !1,
				u = {
					preventDefault: function () {
						r = !0
					}
				};
				n(u);
				!r && it && v.hide(t, i)
			}
		},
		p = y(f.onOkClick || t.NullFunction, u, o.Ok),
		w = y(f.onCancelClick || t.NullFunction, u, o.Cancelled),
		c = "ps-sq-ok",
		l = "ps-sq-cancel",
		a = null,
		b = t.NullFunction;
		d.addClassOnce(k).append('<div id="' + s + '" class="' + e + '" style="display:none"/>');
		a = function () {
			$(u + " ." + c).off("click", p);
			$(u + " ." + l).off("click", w);
			$(u).html("<p>" + _.escape(h) + '<\/p><nav><button class="' + c + '">' + _.escape(g) + '<\/button>&nbsp;<button class="' + l + '">' + _.escape(nt) + "<\/button><\/nav>");
			$(u + " ." + c).click(p);
			$(u + " ." + l).click(w)
		};
		a();
		$("." + e).click(function (n) {
			n.stopPropagation()
		});
		tt && $(document).click(function (n) {
			$(u).is(":visible") && v.hide(n, o.Ignored)
		});
		this.id = s;
		this.message = function (n) {
			if (arguments.length === 0)
				return h;
			h = n;
			$(u + " p").html(n)
		};
		this.confirm = function (n, i) {
			b = i || t.NullFunction;
			$(u).show();
			n && n.stopPropagation && n.stopPropagation()
		};
		this.hide = function (n, t) {
			b(t);
			$(u).hide();
			n && n.stopPropagation && n.stopPropagation()
		};
		this.reinitialize = function () {
			a()
		}
	}
	.addStatic("WindowResultType", {
		Ok: 0,
		Cancelled: 1,
		Ignored: 2
	});
	n.SaveEmailWindow = function (i) {
		function at() {
			var n = $(r + " ." + a).val().trim();
			t.isValidEmailAddress(n) ? st(n) : o.errorMessage(f.Strings.InvalidEmailFormat)
		}
		function vt() {
			o.hide(null, e.Cancelled);
			ht()
		}
		function yt() {
			ct()
		}
		var e = n.SaveEmailWindow.WindowResultType,
		o = this,
		s = "psc-default-save-email",
		it = s + "-parent",
		v = _.uniqueId(s + "-"),
		r = "#" + v,
		b = $("body"),
		u = i || {},
		y = u.message || "We need an email address to notify you about replies to your comment.                 You can control what notifications you get, and cancel at any time. We won't spam you.",
		rt = u.saveText || "Save",
		ut = u.cancelText || "Ask me later",
		ft = u.dontAskMeAgainText || "Don't ask me again",
		et = "hideOnDocumentClick" in u ? u.hideOnDocumentClick : !0,
		ot = "hideOnButtonClick" in u ? u.hideOnButtonClick : !1,
		p = function (n, t, i) {
			return function (t) {
				var r = !1,
				u = {
					preventDefault: function () {
						r = !0
					}
				};
				n(u);
				!r && ot && o.hide(t, i)
			}
		},
		st = u.onSaveClick || t.NullFunction,
		ht = u.onCancelClick || t.NullFunction,
		ct = u.onDontAskMeAgainClick || t.NullFunction,
		k = p(at, r, e.Saved),
		d = p(vt, r, e.Cancelled),
		g = p(yt, r, e.DontAskMeAgain),
		lt = u.emailMaxLength || 254,
		h = "ps-sq-ok",
		c = "ps-sq-cancel",
		l = "ps-sq-dama",
		a = "ps-sq-email",
		nt = "ps-sq-error-message",
		w = null,
		tt = t.NullFunction;
		b.addClassOnce(it);
		b.append('<div id="' + v + '" class="' + s + '" style="display:none"/>');
		w = function () {
			$(r + " ." + h).off("click", k);
			$(r + " ." + c).off("click", d);
			$(r + " ." + l).off("click", g);
			$(r).html("<h4>help us keep you in the loop<\/h4><br /><p>" + _.escape(y) + '<\/p><input type="text" class="' + a + ' psc-default" placeholder="enter your email" maxlength="' + lt + '" /><div class="' + nt + ' ps-sq-error">&nbsp;<\/div><nav><button class="' + h + '">' + _.escape(rt) + '<\/button>&nbsp;<button class="' + c + '">' + _.escape(ut) + '<\/button>&nbsp;<button class="' + l + '">' + _.escape(ft) + "<\/button><\/nav>");
			$(r + " ." + h).click(k);
			$(r + " ." + c).click(d);
			$(r + " ." + l).click(g);
			$(r + " ." + a).keydown(function () {
				o.errorMessage("&nbsp;")
			})
		};
		w();
		$("." + s).click(function (n) {
			n.stopPropagation()
		});
		et && $(document).click(function (n) {
			$(r).is(":visible") && o.hide(n, e.Ignored)
		});
		this.id = v;
		this.message = function (n) {
			if (arguments.length === 0)
				return y;
			y = n;
			$(r + " p").html(n)
		};
		this.errorMessage = function (n) {
			$(r + " ." + nt).html(n)
		};
		this.show = function (n, i) {
			tt = i || t.NullFunction;
			$(r).show();
			n && n.stopPropagation && n.stopPropagation()
		};
		this.hide = function (n, t) {
			tt(t);
			$(r).hide();
			n && n.stopPropagation && n.stopPropagation()
		};
		this.inputsEnabled = function (n) {
			var i = "disabled",
			t = $(r),
			u = [t.find("." + h), t.find("." + c), t.find("." + l), t.find("." + a)];
			n ? u.forEach(function (n) {
				n.removeAttr(i)
			}) : u.forEach(function (n) {
				n.attr(i, i)
			})
		};
		this.reinitialize = function () {
			w()
		}
	}
	.addStatic("WindowResultType", {
		Saved: 0,
		Cancelled: 1,
		Ignored: 2,
		DontAskMeAgain: 3
	});
	n.OmittedDialog = function (i, r) {
		function tt(n) {
			var t = '<div class="ps-sq-info ps-sq-thumbs">';
			return $.each(n, function () {
				if (!(this instanceof e.ThumbBasedOmittedInfo))
					throw "InvalidTypeException: _getThumbBasedSectionHtml, expected all objects to be of type ThumbBasedOmittedInfo";
				t += '<img src="' + this.url + '" title="' + this.filename + '" alt="' + this.filename + '" height="' + d + 'px" />'
			}),
			t + "<\/div>"
		}
		function it(n) {
			var t = '<div class="ps-sq-info ps-sq-list"><ul>';
			return $.each(n, function () {
				if (!(this instanceof e.ListBasedOmittedInfo))
					throw "InvalidTypeException: _getListBasedSectionHtml, expected all objects to be of type ListBasedOmittedInfo";
				t += "<li>" + this.text + "<\/li>"
			}),
			t + "<\/ul><\/div>"
		}
		function p() {
			var n = "";
			$.each(h, function () {
				var i = t.arrayOrDefault(this.infoList);
				if (!(this instanceof e.OmittedDataSet))
					throw "InvalidTypeException: _refreshHtml, expected all objects to be of type OmittedDataSet";
				if (n += '<div class="ps-sq-dataset"><h4>' + this.title + "<\/h4><h5>" + this.subtitle + "<\/h5>", i.length !== 0)
					if (i[0]instanceof e.ThumbBasedOmittedInfo)
						n += tt(this.infoList);
					else if (i[0]instanceof e.ListBasedOmittedInfo)
						n += it(this.infoList);
					else
						throw "InvalidTypeException: OmittedDialog, omittedDataSetList contains an object that isn't of type *OmittedInfo";
				n += "<\/div>"
			});
			$(b).html(n)
		}
		var e = n.OmittedDialog,
		o = "psc-default-omitted-dialog",
		w = o + "-parent",
		s = _.uniqueId(o + "-"),
		u = "#" + s,
		b = u + " .ps-sq-content",
		k = $("body"),
		h = t.arrayOrDefault(i),
		f = r || {},
		d = f.thumbHeight || 120,
		l = _.isUndefined(f.leftButtonText) ? "Getting Started Tutorial" : f.leftButtonText,
		a = _.isUndefined(f.rightButtonText) ? "Close" : f.rightButtonText,
		c = function (n, t) {
			return function (i) {
				var r = !1,
				u = {
					preventDefault: function () {
						r = !0
					}
				};
				n(u);
				r || ($(t).hide(), $("html").removeClass("ps-sq-hide-overflow"));
				i.preventDefault()
			}
		},
		g = c(f.onLeftButtonClick || t.NullFunction, u),
		nt = c(f.onRightButtonClick || t.NullFunction, u),
		v = "ps-sq-left",
		y = "ps-sq-right";
		k.addClassOnce(w).append('<div id="' + s + '" class="' + o + '"><div class="ps-sq-transparent-film"><\/div><section><div class="ps-sq-content psc-default-scrollbar"><\/div><nav class="cf">' + (l === null ? "" : '<a class="' + v + '" href="#">' + _.escape(l) + "<\/a>") + (a === null ? "" : '<a class="' + y + '" href="#">' + _.escape(a) + "<\/a>") + "<\/nav><\/section><\/div>");
		$(u).hide();
		$(u + " ." + v).click(g);
		$(u + " ." + y).click(nt);
		$(u + " .ps-sq-transparent-film").click(c(t.NullFunction, u));
		p();
		this.id = s;
		this.omittedDataSetList = function (n) {
			if (arguments.length === 0)
				return h;
			h = t.arrayOrDefault(n);
			p()
		};
		this.show = function () {
			var n = $(u),
			t = n.children("section");
			$("html").addClass("ps-sq-hide-overflow");
			n.show();
			t.css({
				"margin-top": -t.height() / 2
			})
		}
	}
	.addStatic("OmittedDataSet", function (n, i, r) {
		this.title = t.stringOrDefault(n);
		this.subtitle = t.stringOrDefault(i);
		this.infoList = t.arrayOrDefault(r)
	}).addStatic("ThumbBasedOmittedInfo", function (n, i) {
		this.url = t.stringOrDefault(n);
		this.filename = t.stringOrDefault(i)
	}).addStatic("ListBasedOmittedInfo", function (n) {
		this.text = n
	});
	n.DropList = function (r, u) {
		var y = this,
		l = "psc-default-droplist",
		ut = l + "-parent",
		h = $(r).filter(":first"),
		p = h.is("select"),
		ft = p ? h.parent() : h,
		w = p ? h.attr("id") : _.uniqueId(l + "-select"),
		b = _.uniqueId(l + "-"),
		k = "#" + b,
		a = u || {},
		f = a.data || null,
		e = a.selectedIndex || null,
		d = a.placeholder || null,
		g = a.change || t.NullFunction,
		et = '<div id="' + b + '" class="' + l + '"><div/><p/><b class="cf"/><ul/><\/div>',
		nt = function (n) {
			var i = "";
			return t.isArray(n) && $.each(n, function () {
				i += '<li data-value="' + this.value + '">' + this.text + "<\/li>"
			}),
			i
		},
		tt = function (n) {
			var i = "";
			return t.isArray(n) && $.each(n, function () {
				i += '<option value="' + this.value + '">' + this.text + "<\/option>"
			}),
			i
		},
		it = "ps-sq-selected",
		rt = function (n) {
			y.selectedIndex($(this).index());
			i(n)
		},
		s,
		c,
		o,
		v;
		if (w === "")
			throw "ArgumentException: new DropList(),  parentSelector is a select element but has no ID";
		ft.addClassOnce(ut);
		p || h.append('<select id="' + w + '"/>');
		s = $("#" + w).wrap(et);
		s.parent().hide();
		c = $(k);
		o = $(k + " ul");
		v = $(k + " p");
		f === null ? (f = [], s.children("option").each(function () {
				var n = $(this);
				f.push({
					value: n.val(),
					text: n.text()
				})
			})) : s.html(tt(f));
		c.attr(n.PoppedAttribute, !1).click(function (n) {
			c.children("b").trigger("click", n);
			n.stopPropagation()
		}).children("b").click(function (r) {
			var u = !t.boolParse(c.attr(n.PoppedAttribute));
			i(r);
			c.attr(n.PoppedAttribute, u);
			r.stopPropagation()
		});
		o.html(nt(f));
		o.children("li").click(rt);
		this.id = b;
		this.options = function (n) {
			if (arguments.length === 0)
				return f;
			f = n;
			s.html(tt(f));
			o.children("li").off("click");
			o.html(nt(f));
			o.children("li").click(rt);
			y.selectedIndex(0)
		};
		this.selectedData = function () {
			if (_.isNumber(e) && e > -1)
				return f[e]
		};
		this.selectedIndex = function (n) {
			if (arguments.length === 0)
				return e;
			if (f.length === 0) {
				v.text(" ");
				e = -1;
				return
			}
			e = n;
			s.prop("selectedIndex", n);
			v.text(f[n].text.length > 0 ? f[n].text : " ");
			o.children("li").removeClass(it).eq(n).addClass(it);
			g.call({
				text: f[n].text,
				value: f[n].value
			})
		};
		this.change = g;
		d === null ? y.selectedIndex(t.numberOrDefault(e, 0)) : v.text(d)
	};
	n.ComboBox = function (i, r) {
		function l() {
			u.removeClass(s);
			u.show();
			o = null
		}
		function w() {
			for (var n in e.items)
				c.append($("<li>" + e.items[n] + "<\/li>"));
			u = c.find("li");
			u.on("mouseover", function () {
				u.removeClass(s)
			});
			u.click(function () {
				y()
			})
		}
		function b() {
			u.length > 0 && h.attr(n.PoppedAttribute, "true")
		}
		function v() {
			u.length > 0 && h.attr(n.PoppedAttribute, "false")
		}
		function k(n) {
			var i = o + n,
			t;
			o = (n + o) % u.length;
			do {
				if (t = u.eq(o), t.is(":visible")) {
					u.removeClass(s);
					t.addClassOnce(s);
					break
				}
				o = (n + o) % u.length
			} while (o != i)
		}
		function d(n) {
			var n = n || "";
			u.each(function (t, i) {
				var f = $(i),
				r;
				f.text().toUpperCase().indexOf(n.toUpperCase()) ? (f.hide(), r = u.filter(":visible"), r.length ? r.length === 1 ? r.addClassOnce(s) : u.removeClass(s) : (u.show(), u.removeClass(s), v())) : (f.show(), b())
			})
		}
		var a = this,
		p = "psc-default-combobox",
		h = $(i),
		s = "ps-sq-selected",
		o = null,
		u,
		e,
		f,
		c,
		y;
		h.length === 0 && console.error("No element at selector: " + i);
		e = {
			placeholder: "",
			items: [],
			valueChanged: t.NullFunction,
			selectedItem: null,
			selectValueOnSet: !0
		};
		$.extend(!0, e, r);
		h.empty();
		h.addClassOnce(p);
		h.attr(n.PoppedAttribute, "false");
		a.Id = "psComboBox" + $("." + p).length;
		f = $('<input class="psc-glass" type="text" placeholder="' + e.placeholder + '" />');
		c = $("<ul><\/ul>");
		e.items && e.items.length > 0 ? w() : f.attr("disabled", "disabled");
		y = function () {
			v();
			e.valueChanged(f.val());
			f[0].select();
			f.one("click", function () {
				f.val("")
			});
			l()
		};
		f.keydown(function (n) {
			var i = n.keyCode;
			return i === 13 ? (c.is(":visible") && f.val() === "" && f.val(u.filter("." + s).text()), y(), n.preventDefault()) : i === 38 && u.length > 0 ? (o = t.numberOrDefault(o, u.length), k(-1), n.preventDefault()) : i === 40 && u.length > 0 ? (o = t.numberOrDefault(o, -1), k(1), n.preventDefault()) : i === 9 && u.length > 0 && (f.val(u.filter("." + s).text()), v(), l(), n.preventDefault()),
			!0
		});
		f.keyup(function (n) {
			var t = n.keyCode;
			t != 13 && t != 38 && t != 40 && t != 9 && (l(), d(f.val()))
		});
		f.click(function () {
			f.val() === "" && l();
			b()
		});
		c.on("mouseout", function (n) {
			n.toElement.parentNode != c[0] && (v(), l())
		});
		h.append(f);
		h.append(c);
		t.numberOrDefault(e.selectedItem, null) != null && (e.selectedItem = Math.min(e.selectedItem, e.items.length - 1), c[e.selectedItem].addClassOnce(s));
		a.setPlaceholder = function (n) {
			e.placeholder = t.stringOrDefault(n, "");
			f.attr("placeholder", n)
		};
		a.setValue = function (n, i) {
			f.val(n);
			var r = t.booleanOrDefault(i, e.selectValueOnSet);
			r && f[0].select()
		};
		a.setItems = function (n) {
			e.items = t.arrayOrDefault(n, []);
			w();
			f.removeAttr("disabled")
		}
	};
	n.FlipBook = function (n, t) {
		var f = "psc-default-flipbook",
		c = f + "-parent",
		e = _.uniqueId(f + "-"),
		l = "#" + e,
		a = $(n).filter(":first"),
		i = t || {},
		v = i.imageStripUrl || "",
		y = i.height || "",
		o = i.width || "",
		s = i.y || 0,
		r = i.currentFrame || 0,
		p = i.totalFrames || 1,
		w = i.fps || 1,
		u = null,
		b = 1e3 / w,
		h;
		a.addClassOnce(c).prepend('<i id="' + e + '" class="' + f + '" style="background: url(\'' + v + "') no-repeat " + -r * o + "px " + -s + "px;display: inline-block; height: " + y + "px; width: " + o + 'px"><\/i>');
		h = $(l);
		this.id = e;
		this.play = function () {
			this.stop();
			u = window.setInterval(function () {
					++r >= p && (r = 0);
					h.css("background-position", -r * o + "px " + -s + "px");
					r === 0 && window.clearInterval(u)
				}, b)
		};
		this.stop = function () {
			r = 0;
			u !== null && window.clearInterval(u);
			h.css("background-position", "0px " + -s + "px")
		}
	};
	n.Tooltip = function (i) {
		var o = this,
		u = "psc-default-tooltip",
		f = u + "-parent",
		r = $(i).filter(":first"),
		e = r.parent();
		if (r.length === 0)
			throw "ArgumentException: new Tooltip(),  selector does not exist";
		e.addClassOnce(f);
		r.addClass(u).attr(n.PoppedAttribute, !1);
		this.show = function (t) {
			r.attr(n.PoppedAttribute, !0);
			t && t.stopPropagation && t.stopPropagation()
		};
		this.toggleVisibility = function (r) {
			var u = $(i),
			f = !t.boolParse(u.attr(n.PoppedAttribute));
			u.attr(n.PoppedAttribute, f);
			r && r.stopPropagation && r.stopPropagation()
		}
	};
	n.TopWarning = function (n, i) {
		var l = $(n).filter(":first"),
		o = i || {},
		a = t.booleanOrDefault(o.hideAtFirst, !1),
		c = o.hideAfterMilliseconds || 0,
		v = o.content || [],
		r = document.createElement("div"),
		f,
		e,
		s,
		h;
		r.setAttribute("class", "psc-top-warning");
		f = document.createElement("div");
		f.setAttribute("class", "psc-top-warning-content");
		_.each(v, function (n) {
			f.appendChild(n)
		});
		r.appendChild(f);
		e = document.createElement("b");
		e.setAttribute("class", "psc-top-warning-closer");
		s = Microsoft.Photosynth.Easing;
		h = new u(u.createOpacityCallback(".psc-top-warning"), 300, a ? 0 : 1, new s.easeOut(new s.sinusoidal).interpolate);
		this.hide = function () {
			h.startAnimating(u.Direction.Backward)
		};
		this.show = function () {
			h.startAnimating(u.Direction.Forward)
		};
		e.onclick = this.hide;
		r.appendChild(e);
		c > 0 && setTimeout(this.hide, c);
		l.prepend(r)
	};
	n.UnsupportedBrowserCover = function () {
		var e = this,
		i = "psc-default-unsupported-browser-cover",
		u = "." + i,
		f = $("body"),
		t = n.UnsupportedBrowserCover.prototype;
		if (t.instance)
			return t.instance;
		t.instance = this;
		f.append('<div class="' + i + '" style="display:none">' + r.Resources.Strings.UseModernBrowser + "<\/div>");
		this.show = function () {
			$(u).show()
		};
		this.hide = function () {
			$(u).hide()
		}
	};
	n.PhotosynthProgressIndicator = function (n) {
		function it() {
			u || t != 32 ? (r(b, t), r(c, (t + 25) % 100), r(k, (t + 50) % 100), r(f, (t + 75) % 100), r(d, t), r(tt, (t + 25) % 100), r(nt, (t + 50) % 100), r(g, (t + 75) % 100), ++t, t >= 100 && (t = 0)) : (f.setAttribute("stroke-opacity", parseFloat(f.getAttribute("stroke-opacity")) + .08), c.setAttribute("stroke-opacity", parseFloat(c.getAttribute("stroke-opacity")) + .01), f.getAttribute("stroke-opacity") >= 1 && (clearInterval(a), o = !1));
			e && t === 50 && (e = !1)
		}
		function r(n, t) {
			n.setAttribute("r", 10 + t / 4);
			e ? n.setAttribute("stroke-opacity", t < 50 ? 1 : (t - 80) / -30) : n.setAttribute("stroke-opacity", t <= 20 ? t / 20 : t < 50 ? 1 : (t - 80) / -30)
		}
		var y = this,
		p = $(n).filter(":first"),
		l = "psc-default-spinner",
		s = _.uniqueId(l + "-"),
		h = "#" + s,
		w = '<div id="' + s + '" class="' + l + '" style="position: absolute; z-index: 5; top: 50%; left: 50%; margin: -33.5px 0 0 -33.5px; height: 67px; width: 67px; display: none;"><svg height="67" width="67" style="position: absolute; top: 0; left: 0;" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.8)"><g transform="translate(12, 0)"><circle cx="31" cy="31" r="17.75" stroke-opacity="1" style="stroke: #fff; stroke-width: 1.5px; fill: none;"><\/circle><circle cx="31" cy="31" r="17.75" stroke-opacity="1" style="stroke: #000; stroke-width: 4px; fill: none;" opacity="0.05" ><\/circle><\/g><g transform="translate(24, 12)"><circle cx="31" cy="31" r="11.5" stroke-opacity="1" style="stroke: #fff; stroke-width: 1.5px; fill: none;"><\/circle><circle cx="31" cy="31" r="11.5" stroke-opacity="1" style="stroke: #000; stroke-width: 4px; fill: none;" opacity="0.05" ><\/circle><\/g><g transform="translate(12, 24)"><circle cx="31" cy="31" r="30.25" stroke-opacity="0" style="stroke: #fff; stroke-width: 1.5px; fill: none;"><\/circle><circle cx="31" cy="31" r="30.25" stroke-opacity="0" style="stroke: #000; stroke-width: 4px; fill: none;" opacity="0.05" ><\/circle><\/g><g transform="translate(0, 12)"><circle cx="31" cy="31" r="24" stroke-opacity="1" style="stroke: #fff; stroke-width: 1.5px; fill: none;"><\/circle><circle cx="31" cy="31" r="24" stroke-opacity="1" style="stroke: #000; stroke-width: 4px; fill: none;" opacity="0.05" ><\/circle><\/g><\/g> <\/svg><\/div>';
		p.append(w);
		var i = $(h + " circle"),
		b = i[0],
		f = i[2],
		k = i[4],
		c = i[6],
		d = i[1],
		g = i[3],
		nt = i[5],
		tt = i[7],
		e = !0,
		o = !1,
		u = !1,
		t = 0,
		a,
		v = this;
		this.id = s;
		this.setPercent = function (n) {
			n >= 100 ? v.stop() : v.start()
		};
		this.start = function () {
			(y.show(), u) || (u = !0, e = !0, o || (t = 32, a = setInterval(function () {
							window.requestAnimationFrame(it)
						}, 25)), o = !1)
		};
		this.stop = function () {
			if (u)
				u = !1, o = !0;
			else
				return
		};
		this.show = function () {
			$(h).show()
		};
		this.hide = function () {
			$(h).hide()
		}
	};
	n.FauxScrollbar = function (n, i, r) {
		function nt() {
			if (!window.MutationObserver)
				return null;
			var n = new window.MutationObserver(function () {
					l.refresh()
				}),
			t = {
				childList: !0,
				characterData: !0,
				subtree: !0
			};
			return {
				start: function () {
					n.observe(d, t)
				},
				stop: n.disconnect
			}
		}
		function tt() {
			window.clearTimeout(b);
			b = window.setTimeout(function () {
					s = !1
				}, w)
		}
		function it() {
			window.clearTimeout(k);
			k = window.setTimeout(function () {
					h = !1
				}, w)
		}
		function c() {
			var n = f.scrollTop();
			n > 0 ? u.addClassOnce(v) : u.removeClass(v);
			n >= p.scrollHeight - f.outerHeight() ? u.addClassOnce(y) : u.removeClass(y)
		}
		var l = this,
		a = "psc-default-faux-scrollbar-body",
		v = "ps-sq-scrolled",
		y = "ps-sq-scroll-end",
		u = $(n),
		d = u[0],
		g = u.find(i),
		f = null,
		p = null,
		e = null,
		s = !1,
		h = !1,
		w = 500,
		b = null,
		k = null,
		o = null;
		u.length > 1 && console.error("contentSelector can only contain one element");
		(u.length === 0 || u.hasClass(a)) && console.error(n + " has already been assigned a faux scrollbar");
		u.addClassOnce(a);
		f = u.after('<div class="psc-default-faux-scrollbar"><\/div>').next();
		p = f[0];
		e = f.append("<div><\/div>").children().filter(":first");
		this.changeBottomOffset = function (n) {
			e.css("margin-bottom", n)
		};
		this.changeTopMargin = function (n) {
			e.css("margin-top", n)
		};
		this.getDynamicContentObserver = function () {
			return o
		};
		this.refresh = function () {
			e.height(g.filter(":visible").height());
			c()
		};
		f.scroll(function () {
			var t = $(this),
			n = t.scrollTop(),
			i = u.scrollTop();
			c();
			h || n === i || (s = !0, u.scrollTop(n), tt())
		});
		u.scroll(function () {
			var t = f.scrollTop(),
			n = $(this).scrollTop();
			s || t === n || (h = !0, f.scrollTop(n), it())
		});
		t.booleanOrDefault(r) ? (o = nt(), o && o.start()) : $(window).resize(function () {
			window.requestAnimationFrame(c)
		});
		l.refresh()
	};
	n.ToggleControlPoppedValue = function (r, u) {
		var f = !t.boolParse(u.attr(n.PoppedAttribute));
		return i(r),
		u.attr(n.PoppedAttribute, f),
		f
	};
	n.registerCoveredElement = function (i, r, u, f, e, o) {
		function l() {
			var r = $(document),
			n = r.width(),
			t = r.height(),
			o,
			h = $(window),
			l = h.width(),
			v = h.height(),
			e,
			i;
			(n > l || t > v) && (s.width(l).height(v), n = r.width(), t = r.height());
			o = n / t;
			o > c ? (i = n / c, s.width(n).height(i), s.css({
					"margin-top": (t - i) / 2 + "px",
					"margin-left": 0
				}), e = "scale(" + n / u + ")") : (i = c * t, s.height(t).width(i), s.css({
					"margin-top": 0,
					"margin-left": (n - i) / 2 + "px"
				}), e = "scale(" + t / f + ")");
			a && a.css({
				transform: e,
				"-webkit-transform": e
			})
		}
		var h = "psc-default-covered-element",
		s = $(i || "." + h, r),
		a = _.isString(o) ? s.children(o) : null,
		c = u / f;
		if (s.length > 1)
			throw "ArgumentException: registerCoveredElement(), selector can only contain one element";
		if (s.length !== 0 && !t.booleanOrDefault(s.data(n.StyledAttribute), !1))
			return s.hasClass(h) || s.addClass(h), s.css({
				position: "absolute",
				"z-index": e
			}), s.data(n.StyledAttribute, !0), l(), $(window).resize(l), l
	};
	n.stylePullDown = function (r, u) {
		var s = '<div class="psc-default-pulldown"><\/div>',
		f = $(r || ".psc-default-pulldown-content", u).filter(function () {
				return !$(this).data(n.StyledAttribute)
			}),
		e = f.filter("ul"),
		o = f.filter("div");
		if (e.length + o.length !== f.length)
			throw "ArgumentException: stylePullDown(), selector must all be either &lt;ul&gt; and/or &lt;div&gt;";
		f.each(function () {
			function f(f) {
				var o = !t.boolParse(r.attr(n.PoppedAttribute)),
				e = r.offset().top;
				u.css("padding-top", e + r.outerHeight()).css("top", -e);
				i(f);
				r.attr(n.PoppedAttribute, o);
				o && u.css("top", -e - u.outerHeight()).animate({
					top: -e
				}, 500, "psEaseOutBounce");
				f.stopPropagation()
			}
			var u = $(this),
			e = u.is("div"),
			r;
			u.data(n.StyledAttribute, !0);
			r = u.wrap(s).parent().attr(n.PoppedAttribute, !1).addClass(e ? "ps-sq-pane" : "ps-sq-menu");
			r.parent().trimBetweenBlocks();
			u.before('<b tabindex="0" />').prev("b").click(function (n) {
				f(n)
			}).keydown(function (i) {
				i.which === t.KeyCode.Return ? f(i) : i.which === t.KeyCode.Esc && r.attr(n.PoppedAttribute, !1)
			});
			r.prev("a.ps-sq-pulldown-title").click(function (n) {
				f(n)
			});
			r.prev(".ps-sq-pulldown-title").children("a").click(function (n) {
				f(n)
			})
		});
		e.children("a").click(i);
		o.click(function (n) {
			n.stopPropagation()
		})
	};
	n.openPulldown = function (n) {
		$(n).siblings("b").click()
	};
	n.styleRadio = function (i, r) {
		var u = "psc-default",
		f = $(i || "input.psc-default[type=radio]", r);
		if (f.not("input[type=radio]").length > 0)
			throw "ArgumentException: styleRadio(), selector contains non-radio elements";
		f.each(function () {
			var i = $(this),
			r = t.booleanOrDefault(i.data(n.StyledAttribute), !1);
			r || (i.hasClass(u) || i.addClass(u), i.data(n.StyledAttribute, !0).next("label").prepend("<b/>"))
		})
	};
	n.styleCheckbox = function (i, r) {
		var u = "psc-default",
		f = $(i || "input.psc-default[type=checkbox]", r);
		if (f.not("input[type=checkbox]").length > 0)
			throw "ArgumentException: styleCheckbox(), selector contains non-checkbox elements";
		f.each(function () {
			var i = $(this),
			r = t.booleanOrDefault(i.data(n.StyledAttribute), !1);
			r || (i.hasClass(u) || i.addClass(u), i.data(n.StyledAttribute, !0).next("label").prepend("<b/>"))
		})
	};
	n.styleContentEditable = function (i, r) {
		var u = "psc-default",
		f = $(i || ".psc-default[contenteditable=true]", r);
		f.each(function () {
			var i = $(this),
			r = t.booleanOrDefault(i.data(n.StyledAttribute), !1);
			r || (i.hasClass(u) || i.addClass(u), i.data(n.StyledAttribute, !0).on("focus activate", function () {
					var n = $(this),
					i,
					r;
					t.parseIntOrDefault(n.attr("data-placeholderisset")) === 1 && (n.attr("data-placeholderisset", "0"), n.html(""), n.height() === 0 && n.html("<br/>"));
					t.stringNullOrWhitespace(n.text()) && (this.hasChildNodes() && document.createRange && window.getSelection ? (i = document.createRange(), i.selectNodeContents(this), r = window.getSelection(), r.removeAllRanges(), r.addRange(i)) : document.selection && document.body.createTextRange && (i = document.body.createTextRange(), i.moveToElementText(this), i.select()))
				}).on("keydown", function (n) {
					var i = $(this),
					r = t.getSelectedTextInfo(),
					u = i.data("maxlength");
					_.contains([8, 46, 33, 34, 35, 36, 37, 38, 39, 40], n.which) || n.ctrlKey && _.contains([65, 67, 86, 88, 90], n.which) || (n.which === 13 || _.isNumber(u) && i.text().length >= u && (!r || r.length === 0)) && n.preventDefault()
				}).on("paste", function (n) {
					try {
						var i = $(this),
						e = i.data("maxlength"),
						o = i.text(),
						u = t.getSelectedTextInfo(),
						r = t.getClipboardText(n).replace(t.NewLineRegex, " "),
						f = o.length;
						u && (f -= u.length, f + r.length > e && (r = r.substr(0, e - f)), t.replaceSelectedText(r), i.html(i.text().replace(/((\s)\s|\s$)/g, "$2&nbps;")), t.setCaretPosition(i[0], u.start + r.length))
					} catch (s) {}
					n.preventDefault()
				}).on("drop", function (n) {
					n.preventDefault()
				}).blur(function () {
					var n = $(this);
					t.parseIntOrDefault(n.attr("data-placeholderisset")) === 0 && t.stringNullOrWhitespace(n.text()) && (n.html(n.attr("placeholder")), n.attr("data-placeholderisset", "1"))
				}))
		})
	};
	n.styleCollapsibleContent = function (n, t) {
		var i = $(n || ".psc-default-collapsible", t);
		i.click(function () {
			var n = $(this),
			t = n.next("div");
			n.hasClass("ps-sq-expanded") ? (n.removeClass("ps-sq-expanded"), t.height(0).css("opacity", .01)) : (n.addClass("ps-sq-expanded"), t.height("auto").height(t.height()).css("opacity", 1))
		})
	};
	n.resetContentEditables = function (n) {
		var t = $(n || ".psc-default[contenteditable=true]");
		t.each(function () {
			var n = $(this);
			n.html(n.attr("placeholder"));
			n.attr("data-placeholderisset", "1")
		})
	};
	n.styleAll = function (i, r) {
		var f,
		u;
		i = i || null;
		f = null;
		for (u in n)
			n.hasOwnProperty(u) && t.stringStartsWith(u, "style") && u !== "styleAll" && (f = n[u], _.isFunction(f) && f(i, r))
	};
	n.Ps1PanoHiresRotator = function (n, i, r, u) {
		function c() {
			f.animate({
				left: "0px"
			}, o / 2, "swing", function () {
				f.is(":hidden") || f.animate({
					left: -1 * (f.width() - e.width())
				}, o, "swing", function () {
					if (!f.is(":hidden")) {
						var n = "0px",
						t = o;
						s === 1 && (n = (f.width() - e.width()) / -2, t = o / 2);
						f.animate({
							left: n
						}, t, "swing", function () {
							s--;
							s > 0 && f.is(":visible") && c()
						})
					}
				})
			})
		}
		function a(n) {
			var t = e.height(),
			i = t / n.height;
			f = $("<img>", {
					src: n.src,
					id: "pano-hover-img"
				}).css("position", "relative").css("top", "0").css("left", (n.width * i - t) / -2 + "px").css("height", t + "px");
			e.append(f[0]);
			f.width() > t && (o = f.width() / l * 1e3, c())
		}
		var h = this,
		e = $(n),
		l = t.numberOrDefault(r, 100),
		f,
		o,
		s = t.numberOrDefault(u, 10);
		e.empty();
		h.start = function () {
			var n = new Image;
			n.onload = function () {
				a(n)
			};
			n.src = i
		};
		h.stop = function () {
			f && f.hide()
		}
	}
}
();
Microsoft.Photosynth.Social = Microsoft.Photosynth.Social || {}, function () {
	function o(n, t) {
		for (var i, u = document.getElementsByTagName("meta"), r = 0; r < u.length; ++r)
			if (i = u[r], i.attributes[n] && i.attributes[n].value === t)
				return i;
		return console.error('getMetaTagByAttributeValue() unable to find attribute "' + n + '" with value "' + t + '"'), {
			attributes: {
				content: {
					value: ""
				}
			}
		}
	}
	function s() {
		return o("property", "fb:app_id").attributes.content.value
	}
	var i = Microsoft.Photosynth,
	n = i.Social,
	t = i.Util,
	u = i.Page,
	f = u.MasterPage,
	e = {
		frameborder: 0,
		delayLoad: !0,
		autoplay: !1,
		width: 500,
		height: 300
	},
	r = {
		height: 350,
		width: 500,
		delayload: !0,
		autoplay: !0,
		showcaption: !0,
		showannotations: !0,
		showpromo: !0
	};
	n.EmbedMinWidth = 250;
	n.EmbedMinHeight = 250;
	n.getTweetMaxLength = function (n) {
		var t = n || window.location.href;
		return 140 - Math.min(t.length, 20)
	};
	n.getTwitterShareUrl = function (i, r) {
		var u = r || {},
		f = {},
		e;
		return u.text = i,
		f.url = u.url || window.location.href,
		f.via = u.via || "photosynth",
		f.hashtags = [].concat(u.hashtags || "photosynth").join(","),
		f.related = [].concat(u.related || ["bing", "microsoft", "msftnews", "msftnext", "bingmaps", "windows", "windowsphone", "surface", "ie", "skydrive", "PPIbyMicrosoft", "fareologist", "xbox", "office"]).join(","),
		u.text && (e = n.getTweetMaxLength(u.url), f.text = u.text.length > e ? u.text.substring(0, e - 1) : u.text),
		u.lang && (f.lang = u.lang),
		u.counturl && (f.counturl = u.counturl),
		u.dnt && (f.dnt = u.dnt),
		"https://twitter.com/share" + t.buildQueryStringFromObject(f)
	};
	n.getFacebookShareUrl = function (n, i, r) {
		var u = {},
		e;
		return _.isUndefined(r) && (e = t.trailUrl(f.serverDataModel.SiteBaseUrl) + "_callback.html#fbclose", e.substring(0, 2) === "//" && (e = window.location.protocol + e), u.redirect_uri = e),
		u.app_id = i || s(),
		u.display = "popup",
		u.link = n || window.location.href,
		"https://www.facebook.com/dialog/feed" + t.buildQueryStringFromObject(u)
	};
	n.getTumblrShareUrl = function (n, i) {
		var r = {
			embed: n,
			caption: i
		};
		return "http://www.tumblr.com/share/video" + t.buildQueryStringFromObject(r)
	};
	n.getIFrameHtml = function (i, u) {
		var e,
		f,
		h,
		s,
		o;
		u = t.extend(u, r, !1);
		e = {
			height: Math.max(n.EmbedMinHeight, u.height).toString(),
			width: Math.max(n.EmbedMinWidth, u.width).toString(),
			frameborder: (u.frameborder || 0).toString()
		};
		f = {
			delayload: u.delayload.toString(),
			autoplay: u.autoplay.toString(),
			showannotations: u.showannotations.toString(),
			showpromo: u.showpromo.toString()
		};
		u.attribution === !1 && (f.attribution = "false");
		u.branding === !1 && (f.branding = "false");
		u.controls === !1 && (f.controls = "false");
		u.twitter === !0 && (f.twitter = "true");
		h = i + t.buildQueryStringFromObject(f);
		s = "<iframe ";
		for (o in e)
			e.hasOwnProperty(o) && (s += o + '="' + e[o] + '" ');
		return s + ('src="' + h + '" webkitallowfullscreen mozallowfullscreen allowfullscreen><\/iframe>')
	};
	n.getPs1IFrameHtml = function (i, r) {
		var u,
		o,
		f;
		r = t.extend(r, e, !1);
		u = {
			height: Math.max(n.EmbedMinHeight, r.height).toString(),
			width: Math.max(n.EmbedMinWidth, r.width).toString(),
			frameborder: (r.frameborder || 0).toString()
		};
		o = "<iframe ";
		for (f in u)
			u.hasOwnProperty(f) && (o += f + '="' + u[f] + '" ');
		return o + ('src="' + i + '"><\/iframe>')
	};
	n.getEmbedDefaultOptions = function () {
		return t.extend(r)
	}
}
();
Microsoft.Photosynth.Easing = Microsoft.Photosynth.Easing || {}, function () {
	function i(n, t, i) {
		return t - i * n
	}
	var n = Microsoft.Photosynth.Easing,
	t = Math.PI / 2;
	n.linear = function () {
		this.interpolate = function (n) {
			return n
		};
		this.getInitSlope = function () {
			return 1
		};
		this.getFinalSlope = function () {
			return 1
		}
	};
	n.sinusoidal = function () {
		this.interpolate = function (n) {
			return Math.sin(n * t)
		};
		this.getInitSlope = function () {
			return t
		};
		this.getFinalSlope = function () {
			return 0
		}
	};
	n.quadratic = function () {
		this.interpolate = function (n) {
			var t = n - 1;
			return 1 - t * t
		};
		this.getInitSlope = function () {
			return 2
		};
		this.getFinalSlope = function () {
			return 0
		}
	};
	n.cubic = function () {
		this.interpolate = function (n) {
			var t = n - 1;
			return 1 + t * t * t
		};
		this.getInitSlope = function () {
			return 3
		};
		this.getFinalSlope = function () {
			return 0
		}
	};
	n.quartic = function () {
		this.interpolate = function (n) {
			var t = n - 1,
			i = t * t;
			return 1 - i * i
		};
		this.getInitSlope = function () {
			return 4
		};
		this.getFinalSlope = function () {
			return 0
		}
	};
	n.easeOut = function (n) {
		this.interpolate = n.interpolate;
		this.getInitSlope = n.getInitSlope;
		this.getFinalSlope = n.getFinalSlope
	};
	n.easeIn = function (n) {
		this.interpolate = function (t) {
			return 1 - n.interpolate(1 - t)
		};
		this.getInitSlope = function () {
			return n.getFinalSlope()
		};
		this.getFinalSlope = function () {
			return n.getInitSlope()
		}
	};
	n.easeInOut = function (n) {
		this.interpolate = function (t) {
			var i,
			r;
			return t < .5 ? (i = 1 - 2 * t, r = n.interpolate(i), .5 * (1 - r)) : (i = 2 * t - 1, r = n.interpolate(i), .5 * (1 + r))
		};
		this.getInitSlope = function () {
			return n.getFinalSlope()
		};
		this.getFinalSlope = function () {
			return n.getFinalSlope()
		}
	};
	n.linearToEase = function (n, t) {
		var f,
		r,
		e,
		s;
		if ((t < 0 || t > 1) && console.error("linearFraction must be between 0 and 1.  Passed value is: " + t), f = t === 1, f)
			r = 1;
		else {
			var h = .0001,
			c = n.getInitSlope() / (1 - t),
			u = .5,
			o = .25;
			for (r = c * u, e = i(t, 1 - u, r), s = 0; Math.abs(e) > h && s < 100; )
				e > 0 ? u += o : u -= o, o /= 2, r = c * u, e = i(t, 1 - u, r), s++;
			Math.abs(e) > h && (console.warn("linearToEase - failed to fit ease to the line slope"), f = !0)
		}
		f && (r = 1);
		this.interpolate = function (i) {
			if (i <= t)
				return i * r;
			var f = (i - t) / (1 - t),
			e = n.interpolate(f);
			return e * u + (1 - u)
		};
		this.getInitSlope = function () {
			return r
		};
		this.getFinalSlope = function () {
			return f ? r : n.getFinalSlope() * u / (1 - t)
		}
	}
}
();
Microsoft.Photosynth.Analytics = Microsoft.Photosynth.Analytics || {}, function () {
	var n = Microsoft.Photosynth.Analytics;
	n.sendEvent = function () {};
	n.EventNames = {
		UploadStarted: "event2",
		UploadCompleted: "event3",
		UploadError: "event4",
		ShareFacebook: "event5",
		ShareTwitter: "event6",
		ShareTumblr: "event7",
		HeavyLoad: "event8",
		Throttled: "event9",
		ShowInfoPane: "event10",
		HideInfoPane: "event11"
	}
}
();
Microsoft.Photosynth.Maps = Microsoft.Photosynth.Maps || {}, function () {
	var r = Microsoft.Photosynth,
	n = r.Maps,
	t = r.Util,
	i = "//dev.virtualearth.net/REST/v1/";
	n.MapsApiKey = "AmkY6sqdkKpjUdtUJtXzv_3z3T96R6uvBqvey3NjPW-xlaz_DK4oo1jouB-6xnmS";
	n.getEmptyGeoTagTileUrl = function (r, u) {
		var f = t.numberOrDefault(u, 98),
		e = t.numberOrDefault(r, 300);
		return i + "Imagery/Map/Aerial?mapArea=-65,-124,84,70&mapSize=" + e + "," + f + "&key=" + n.MapsApiKey
	};
	n.getMapTileUrl = function (r, u, f) {
		f = f || {};
		var o = t.stringOrDefault(f.imagery, "Road"),
		e = r + "," + u,
		s = {
			declutterPins: t.booleanOrDefault(f.declutter, !0) ? 1 : 0,
			mapSize: t.numberOrDefault(f.width, 300) + "," + t.numberOrDefault(f.height, 98),
			pushpin: t.booleanOrDefault(f.pincenter, !0) ? e : null,
			key: n.MapsApiKey
		},
		h = t.numberOrDefault(f.zoom, 4);
		return (i + "Imagery/Map/{imagerySet}/{centerPoint}/{zoomLevel}" + t.buildQueryStringFromObject(s)).replace("{imagerySet}", o).replace("{centerPoint}", e).replace("{zoomLevel}", h)
	};
	n.requestLocationFromPointAsync = function (t, r, u) {
		var f = t + "," + r,
		e = (i + "Locations/{point}?includeNeighborhood=1&key=" + n.MapsApiKey).replace("{point}", f);
		$.ajax({
			url: e,
			dataType: "jsonp",
			jsonp: "jsonp",
			success: u
		})
	};
	n.locationFromSearchTermAsync = function (t, r, u) {
		$.ajax({
			url: i + "Locations",
			data: {
				key: n.MapsApiKey,
				q: t
			},
			success: function (n, t, i) {
				_.isFunction(r) && r(n, t, i)
			},
			error: function (n, t, i) {
				_.isFunction(u) && u(n, t, i)
			}
		})
	}
}
();
Microsoft.Photosynth.SynthPacket = Microsoft.Photosynth.SynthPacket || {}, function () {
	var i = Microsoft.Photosynth,
	n = i.SynthPacket,
	t = i.Util;
	n.getMetadata = function (i, r, u, f) {
		var e = i;
		typeof i != "string" && (e = i.CollectionUrl);
		var o = t.booleanOrDefault(f, !1),
		s = r || t.NullFunction,
		h = u || t.NullFunction;
		$.ajax({
			url: e,
			dataType: "json",
			error: h,
			success: function (t, i, r) {
				s(new n.Metadata(t), i, r)
			},
			async: o
		})
	};
	n.Metadata = function (n) {
		var i = this,
		t = {};
		$.extend(!0, t, n);
		i.DominantColor = function () {
			return _.isArray(t.dominant_colors) && t.dominant_colors.length > 0 && _.isArray(t.dominant_colors[0]) && t.dominant_colors[0].length >= 3 ? t.dominant_colors[0] : null
		};
		i.MedianAspectRatio = function () {
			for (var r, i = [], n = 0; n < t.cameras.length; ++n)
				i.push({
					aspectRatio: parseFloat(t.cameras[n].intrinsics[1])
				});
			for (r = [], n = 0; n < i.length; ++n)
				r.push(i[n].aspectRatio);
			return r.sort(function (n, t) {
				return n - t
			}),
			r[Math.floor(i.length / 2)]
		}
	}
}
();
Microsoft.Photosynth.Page.MasterPage = Microsoft.Photosynth.Page.MasterPage || {}, function () {
	var r = Microsoft.Photosynth,
	t = r.Util,
	f = r.Page,
	u = f.MasterPage,
	n = {},
	i = u.serverDataModel;
	u.Links = n;
	n.siteBaseUrl = t.trailUrl(i.SiteBaseUrl);
	n.legacyBaseUrl = t.trailUrl(i.LegacyBaseUrl);
	n.reportAbuseBaseUrl = i.ReportAbuseBaseUrl;
	n.exploreFeaturedUrl = n.siteBaseUrl;
	n.exploreRecentSynthsUrl = n.siteBaseUrl + "?explore=recent_synths";
	n.exploreRecentFavoritesUrl = n.siteBaseUrl + "?explore=recent_favorites";
	n.exploreAllTimeFavoritesUrl = n.siteBaseUrl + "?explore=all_time_favorites";
	n.gettingStartedUrl = n.siteBaseUrl + "help#get-started";
	n.aboutUrl = n.siteBaseUrl + "about/";
	n.helpUrl = n.siteBaseUrl + "help/";
	n.uploadUrl = n.siteBaseUrl + "upload/";
	n.usersBaseUrl = n.siteBaseUrl + "users/";
	n.viewBaseUrl = n.siteBaseUrl + "view/";
	n.embedBaseUrl = n.siteBaseUrl + "embed/";
	n.signupUrl = n.siteBaseUrl + "signup?returnUrl=" + window.encodeURIComponent(location.href);
	n.mapBaseUrl = n.siteBaseUrl + "map/";
	n.legacyProfileUrl = n.legacyBaseUrl + "userprofilepage.aspx?user={username}";
	n.legacyEmbedUrl = n.legacyBaseUrl + "embed.aspx?cid={cid}&delayLoad={delayload}&slideShowPlaying={autoplay}";
	n.legacyViewUrl = n.legacyBaseUrl + "view.aspx?cid={cid}";
	n.buildReportAbuseUrl = function (i) {
		return i = i || window.location.href,
		n.reportAbuseBaseUrl + escape(t.schemeUrl(i)).replace(/&/g, "%26")
	};
	n.getMapUrl = function (i) {
		var e;
		if (_.isUndefined(i))
			return n.mapBaseUrl;
		var r = t.numberOrDefault(i.lat, null),
		u = t.numberOrDefault(i.lon, null),
		f = t.numberOrDefault(i.zoom, null);
		return r != null && u == null || u != null && r == null ? (r = null, u = null, f = null) : r && u && f == null ? f = 9 : r == null && u == null && f != null && (f = null),
		e = {
			lat: r,
			lon: u,
			cid: t.isGuid(i.id) ? i.id : null,
			user: t.stringOrDefault(i.user, null),
			zoom: f
		},
		n.mapBaseUrl + t.buildQueryStringFromObject(e, "#")
	};
	n.getEmbedUrl = function (i) {
		return t.isGuid(i) ? n.embedBaseUrl + i : ""
	};
	n.getLegacyEmbedUrl = function (i, r, u) {
		var f = n.legacyEmbedUrl;
		if (t.isGuid(i))
			f = f.replace("{cid}", i);
		else
			return "";
		return r = t.booleanOrDefault(r, !0),
		f = f.replace("{delayload}", r),
		u = t.booleanOrDefault(u, !0),
		f.replace("{autoplay}", u)
	};
	n.getViewUrl = function (i, r) {
		// Returns static html page with comments embedded as json.
		return "view_page_" + i + ".html";
	};
	n.getLegacyViewUrl = function (i) {
		return t.isGuid(i) ? n.legacyViewUrl.replace("{cid}", i) : ""
	};
	n.getUsersUrl = function (t) {
		return _.isString(t) ? n.usersBaseUrl + t : ""
	};
	n.getLegacyUsersUrl = function (t) {
		return _.isString(t) ? n.legacyProfileUrl.replace("{username}", t) : ""
	};
	n.getUsersFeedUrl = function (t) {
		return _.isString(t) ? n.usersBaseUrl + t + "?content=feed" : ""
	};
	n.getUsersFavoritesUrl = function (t) {
		return _.isString(t) ? n.usersBaseUrl + t + "?content=favorites" : ""
	}
}
(), function () {
	var r = Microsoft.Photosynth,
	n = r.Util,
	u = r.Controls,
	h = r.Compatibility,
	c = r.RestClient,
	f = r.Page,
	l = r.Maps,
	t = f.MasterPage,
	o = {},
	e = {},
	s = {},
	i = {};
	t.ExternalControls = e;
	t.Social = o;
	t.Navigation = i;
	t.User = s;
	o.FollowViewModel = function (n) {
		var t = this;
		this.isFollowing = ko.observable(!!n);
		this.toggleFollowComplete = ko.observable(!0);
		this.allowFollow = ko.observable(!1);
		this.followButtonClass = ko.computed(function () {
				return "psc-default-sprite " + (t.isFollowing() ? "ps-sq-unfollow" : "ps-sq-follow") + (t.toggleFollowComplete() ? "" : " ps-sq-disabled")
			});
		this.followLinkClass = ko.computed(function () {
				return t.toggleFollowComplete() ? "level2" : "level4"
			});
		this.followLinkText = ko.computed(function () {
				return t.isFollowing() ? "Unfollow" : "Follow"
			});
		this.restClient = null;
		this.errorWindow = null;
		this.errorWindowParentSelector = null
	};
	o.Following = function () {
		function f(n, i) {
			return function (r) {
				r === 401 ? window.location.href = t.viewModel.signupUrl : (n.message("Something went wrong and you didn't successfully " + i + " this account."), n.confirm(null))
			}
		}
		var i = this,
		r = {};
		this.init = function (r, u, f, e) {
			r.restClient = u;
			r.errorWindowParentSelector = f;
			t.viewModel.isPhotosynthUser ? _.isString(e) && !n.stringEquals(e, t.viewModel.currentUser.username(), !0) && u.Users.getAsync(e, function (n) {
				i.followingUser(e, n.IsFollowing);
				r.isFollowing(n.IsFollowing);
				r.allowFollow(!0)
			}, function () {
				i.followingUser(e, !1);
				r.isFollowing(!1);
				r.allowFollow(!0)
			}) : (r.isFollowing(!1), r.allowFollow(!0))
		};
		this.toggleFollowing = function (n, t) {
			n.toggleFollowComplete() && (n.toggleFollowComplete(!1), n.errorWindow === null && (n.errorWindow = new u.ConfirmWindow(n.errorWindowParentSelector, {
							okText: "Try again",
							onCancelClick: function () {
								n.errorWindow.hide()
							},
							onOkClick: function () {
								n.errorWindow.hide();
								i.toggleFollowing(n, t)
							},
							hideOnDocumentClick: !1,
							hideOnButtonClick: !1
						})), n.isFollowing() ? n.restClient.Following.stopFollowingUserAsync(t, function () {
					i.followingUser(t, !1);
					n.isFollowing(!1);
					n.toggleFollowComplete(!0)
				}, f(n.errorWindow, "unfollow")) : n.restClient.Following.startFollowingUserAsync(t, function () {
					i.followingUser(t, !0);
					n.isFollowing(!0);
					n.toggleFollowComplete(!0)
				}, f(n.errorWindow, "follow")))
		};
		this.followingUser = function (n, t) {
			if (_.isString(n)) {
				if (arguments.length === 1)
					return r[n];
				r[n] = !!t
			}
		}
	};
	s.FavoritesActions = function () {
		var n = new Microsoft.Photosynth.RestClient;
		this.AddFavorite = function (t, i, r) {
			f.MasterPage.viewModel.isPhotosynthUser ? n.Users.Favorites.addAsync(t, function (n) {
				i && i(n)
			}, function (n, t) {
				r && r(n, t)
			}) : window.location.href = f.MasterPage.viewModel.signupUrl
		};
		this.RemoveFavorite = function (t, i, r) {
			f.MasterPage.viewModel.isPhotosynthUser ? n.Users.Favorites.deleteAsync(t, function (n) {
				i && i(n)
			}, function (n, t) {
				r && r(n, t)
			}) : window.location.href = f.MasterPage.viewModel.signupUrl
		}
	};
	e.GeoBrowse = function (t, i) {
		function v(n) {
			var t = r.Map.tryLocationToPixel(r.Map.getCenter(), Microsoft.Maps.PixelReference.page),
			f = n,
			u = f.offset(),
			e = r.Map.tryPixelToLocation({
					x: u.left - i.exclusionAreaMargin - t.x,
					y: u.top - i.exclusionAreaMargin - t.y
				}, Microsoft.Maps.PixelReference.viewport),
			o = r.Map.tryPixelToLocation({
					x: u.left + f.outerWidth() + i.exclusionAreaMargin - t.x,
					y: u.top + f.outerHeight() + i.exclusionAreaMargin - t.y
				}, Microsoft.Maps.PixelReference.viewport);
			return Microsoft.Maps.LocationRect.fromCorners(e, o)
		}
		function y(n) {
			return _.isUndefined(h) ? !0 : (h.geocode({
					count: 1,
					where: n,
					callback: function (n) {
						if (n.results.length == 0)
							return e.setValue("No such place"), !0;
						r.Map.setView({
							bounds: n.results[0].bestView
						})
					}
				}), !0)
		}
		function a() {
			var t = r.Map.getImageryId(),
			n = $(".map-nav-element");
			switch (t) {
			case "Road":
				n.removeClass("map-nav-light-tone");
				n.addClassOnce("map-nav-dark-tone");
				break;
			case "Aerial":
			case "Birdseye":
			case "NativeBirdseye":
			default:
				n.removeClass("map-nav-dark-tone");
				n.addClassOnce("map-nav-light-tone")
			}
		}
		var r = this,
		s = $('<div id="map-nav-wrapper" class="map-nav-element"><div id="map-styles-container"><\/div><\/div>'),
		p = new Microsoft.Photosynth.RestClient,
		h,
		f = {
			exclusionAreaMargin: 0,
			startingView: null,
			mapEvents: {
				click: n.NullFunction,
				controlReady: n.NullFunction,
				imageryChanged: n.NullFunction,
				viewChangeStart: n.NullFunction,
				viewChangeEnd: n.NullFunction
			},
			enableInterestingPlaces: !0,
			additionalMapModules: []
		},
		e,
		o,
		c;
		i && $.extend(!0, f, i);
		e = $('<input class="psc-glass" type="text" placeholder="move map to..." disabled="disabled">');
		o = $('<div id="jump-to-container"><\/div>');
		o.append(e);
		e.click(function (n) {
			e.focus();
			e.val("");
			n.stopPropagation()
		});
		e.keydown(function (t) {
			t.keyCode === n.KeyCode.Return && (e[0].select(), y(e.val()))
		});
		s.append(o);
		c = function () {
			var v = $(t),
			y,
			i,
			b,
			c,
			p,
			w;
			if (r.Map = new Microsoft.Maps.Map(v[0], {
						backgroundColor: v.css("background-color"),
						credentials: l.MapsApiKey,
						customizeOverlays: !0,
						disableAnalytics: !0,
						enableSearchLogo: !1,
						mapTypeId: Microsoft.Maps.MapTypeId.auto,
						showMapTypeSelector: !0,
						showScalebar: !1,
						useInertia: !1
					}), Microsoft.Maps.loadModule("Microsoft.Maps.Search", {
					callback: function () {
						h = new Microsoft.Maps.Search.SearchManager(r.Map);
						e.removeAttr("disabled")
					}
				}), y = $(".MicrosoftMap"), y.find("#map-nav-wrapper").length === 0 && y.prepend(s), i = $("#map-styles-container"), b = new u.DropList(i, {
						data: [{
								value: "auto",
								text: "auto"
							}, {
								value: "r",
								text: "road"
							}, {
								value: "a",
								text: "aerial"
							}, {
								value: "be",
								text: "birdseye"
							}
						],
						change: function () {
							if (this.value !== "none" && r.Map.getMapTypeId() !== this.value) {
								var n = Microsoft.Maps.MapTypeId.auto;
								switch (this.value) {
								case "r":
									n = Microsoft.Maps.MapTypeId.road;
									break;
								case "a":
									n = Microsoft.Maps.MapTypeId.aerial;
									break;
								case "be":
									n = Microsoft.Maps.MapTypeId.birdseye
								}
								r.Map.setMapType(n)
							}
						},
						placeholder: "map style"
					}), v.find(".psc-default-droplist,.psc-default-combobox").addClassOnce("psc-geo-list"), $(".psc-geo-list > ul").addClassOnce("map-nav-element"), a(), Microsoft.Maps.Events.addHandler(r.Map, "mousedown", function (n) {
					if (n.isPrimary && n.isTouchEvent) {
						var t = $(document.elementFromPoint(n.pageX, n.pageY));
						i.find(t).length === 1 ? (t.is("li") ? t.trigger("click", n.originalEvent) : i.find("b").trigger("click", n.originalEvent), n.handled = !0) : o.find(t).length === 1 && t.is("input") && t.trigger("click", n.originalEvent)
					}
				}), Microsoft.Maps.Events.addHandler(r.Map, "imagerychanged", function (n) {
					f.mapEvents.imageryChanged(r.Map, n);
					a()
				}), c = function (n) {
				return function (t) {
					n(r.Map, t)
				}
			}, f.mapEvents.viewChangeStart && f.mapEvents.viewChangeStart != n.NullFunction && Microsoft.Maps.Events.addHandler(r.Map, "viewchangestart", c(f.mapEvents.viewChangeStart)), f.mapEvents.viewChangeEnd && f.mapEvents.viewChangeEnd != n.NullFunction && Microsoft.Maps.Events.addHandler(r.Map, "viewchangeend", c(f.mapEvents.viewChangeEnd)), f.mapEvents.click && f.mapEvents.click != n.NullFunction && Microsoft.Maps.Events.addHandler(r.Map, "click", c(f.mapEvents.click)), f.additionalMapModules && f.additionalMapModules.length > 0) {
				p = function (t) {
					var i = f.additionalMapModules[t],
					u;
					i.path && Microsoft.Maps.registerModule(i.name, i.path);
					u = n.NullFunction;
					i.callback && (u = function () {
						i.callback(r.Map)
					});
					Microsoft.Maps.loadModule(i.name, {
						callback: u
					})
				};
				for (w in f.additionalMapModules)
					p(w)
			}
			f.startingView && r.Map.setView(f.startingView);
			f.mapEvents.controlReady()
		};
		Microsoft.Maps.loadModule("Microsoft.Maps.Overlays.Style", {
			callback: c
		});
		r.getExclusions = function () {
			return _.map([s], v)
		}
	}
	.addStatic("DefaultInterestingPlaces", [{
				name: "Istanbul",
				center: {
					latitude: 41.01391,
					longitude: 28.96383
				},
				zoom: 10
			}, {
				name: "Grand Canyon",
				center: {
					latitude: 36.15754,
					longitude: -112.74149
				},
				zoom: 9
			}, {
				name: "Cape Town",
				center: {
					latitude: -33.92111,
					longitude: 18.42423
				},
				zoom: 11
			}, {
				name: "Kyoto",
				center: {
					latitude: 35.00896,
					longitude: 135.76777
				},
				zoom: 10
			}, {
				name: "St Petersburg",
				center: {
					latitude: 59.92955,
					longitude: 30.31882
				},
				zoom: 11
			}, {
				name: "Las Vegas",
				center: {
					latitude: 36.16853,
					longitude: -115.1571
				},
				zoom: 10
			}, {
				name: "Crete",
				center: {
					latitude: 35.24143,
					longitude: 24.90402
				},
				zoom: 9
			}, {
				name: "Hawaii",
				center: {
					latitude: 20.18093,
					longitude: -157.70818
				},
				zoom: 7
			}, {
				name: "Himalayas",
				center: {
					latitude: 28.84245,
					longitude: 82.88733
				},
				zoom: 7
			}, {
				name: "Mexico City",
				center: {
					latitude: 19.37992,
					longitude: -99.15447
				},
				zoom: 11
			}
		]);
	e.GeoEdit = function (t, i) {
		function w(n, t) {
			if (r.enableTopBanner || r.enableBottomBanner) {
				var i = (r.enableTopBanner ? 1 : 0) + (r.enableBottomBanner ? 1 : 0),
				u = {
					height: n - i * 25,
					width: t
				};
				h.Map.setOptions(u)
			}
		}
		function a(n) {
			var t = k(n);
			if (t) {
				h.Map.entities.clear();
				s = new Microsoft.Maps.Pushpin(t, {
						draggable: !1
					});
				h.Map.entities.push(s);
				o && (o.removeAttr("disabled", "disabled"), o.prop("checked", !0));
				return
			}
			o && (o.prop("checked", !1), o.attr("disabled", "disabled"));
			s = null
		}
		function k(n) {
			if (!n)
				return null;
			var t = {
				latitude: n.Latitude || n.latitude,
				longitude: n.Longitude || n.longitude
			};
			return {
				latitude: parseFloat(t.latitude.toFixed(6)),
				longitude: parseFloat(t.longitude.toFixed(6))
			}
		}
		function b(n) {
			return {
				center: {
					latitude: _.isUndefined(n.latitude) ? n.Latitude : n.latitude,
					longitude: _.isUndefined(n.longitude) ? n.Longitude : n.longitude
				},
				zoom: 19
			}
		}
		function d(n, t) {
			var i,
			u;
			if (t && t.originalEvent && t.originalEvent.stopPropagation && t.originalEvent.stopPropagation(), (t.isPrimary || t.isTouchEvent) && t.targetType === "map") {
				if (t.handled = !0, n.getZoom() < 10 && !v) {
					n.entities.clear();
					s = null;
					i = f.find("#geo-edit-alert");
					i.show();
					i.css("top", (r.size.height - i.height()) / 2);
					i.css("left", (r.size.width - i.width()) / 2);
					i.find("#geo-edit-alert-ok").one("click", function (n) {
						i.hide();
						v = !0;
						n.stopPropagation()
					});
					return
				}
				u = n.tryPixelToLocation({
						x: t.getX(),
						y: t.getY()
					});
				a(u);
				r.editEvents.tagchanged({
					Latitude: parseFloat(u.latitude.toFixed(6)),
					Longitude: parseFloat(u.longitude.toFixed(6))
				}, n.getZoom())
			}
		}
		var c = this,
		r = {
			currentGeoTag: null,
			editEvents: {
				tagchanged: n.NullFunction
			},
			enableTopBanner: !1,
			enableBottomBanner: !1,
			size: {
				height: 360,
				width: 640
			},
			standalone: !0
		},
		y,
		p,
		l,
		h;
		$.extend(!0, r, i);
		var f = $(t),
		s,
		v = !1,
		o = null;
		f.empty();
		f.height(r.size.height);
		f.width(r.size.width);
		f.addClass("psc-geo-edit");
		y = $('<div id="geo-edit-map"><\/div><div id="geo-edit-alert" class="psc-geo-edit-prompt"><p>Warning: The map is zoomed out too far for accurate geotagging. Please zoom in as far as possible, then click to place the pin at the exact location.<\/p><button id="geo-edit-alert-ok" class="psc-default ps-sq-ok psc-geo-edit-button">OK<\/button><\/div>');
		r.enableTopBanner && f.append('<div id="geo-edit-top-banner" class="psc-geo-edit-banner">Move the map to the location of this synth, then click to choose the position.<\/div>');
		f.append(y);
		r.enableBottomBanner && (f.append('<div id="geo-edit-bottom-banner" class="psc-geo-edit-banner"><input id="geo-edit-location-alert" type="checkbox" class="psc-default" /><label for="geo-edit-location-alert">save the synth\'s location and show it to viewers<\/label><\/div>'), u.styleCheckbox("#geo-edit-location-alert", f), o = f.find("#geo-edit-location-alert"));
		p = function () {
			w(f.height(), f.width());
			a(r.currentGeoTag);
			o && o.click(function () {
				o.is(":checked") || (h.Map.entities.remove(s), s = null, o.attr("disabled", "disabled"), o.prop("checked", !1), r.editEvents.tagchanged(null))
			})
		};
		l = null;
		r.currentGeoTag && (l = b(r.currentGeoTag));
		h = new e.GeoBrowse("#geo-edit-map", {
				mapEvents: {
					click: d,
					controlReady: p
				},
				enableInterestingPlaces: !1,
				startingView: l
			});
		$(document).click(function () {
			f.is(":visible") && c.hide()
		});
		$(window).resize(function () {
			f.is(":visible") && c.hide()
		});
		c.reset = function (n) {
			var t = {
				center: {
					latitude: 0,
					longitude: 0
				},
				zoom: 1
			};
			a(n);
			s && (t = b(s.getLocation()));
			h.Map.entities.clear();
			h.Map.setView(t)
		};
		c.show = function () {
			r.standalone && f.show()
		};
		c.hide = function () {
			r.standalone && f.hide()
		};
		c.resize = function (n, t) {
			_.isNumber(n) && _.isNumber(t) && (f.height(n), f.width(t), w(n, t))
		}
	};
	i.Synth2SynthItem = function (n) {
		this.Id = n.Id || null;
		this.ThumbnailUrl = n.ThumbnailUrl || null;
		this.Name = n.Name || null;
		this.OwnerUsername = n.OwnerUsername || null;
		this.Id == null && console.error("rawItem does not have an ID")
	};
	i.Synth2SynthData = function (t) {
		this.items = _.map(n.arrayOrDefault(t, []), function (n) {
				return new i.Synth2SynthItem(n)
			})
	}
	.addStatic("parse", function (t) {
		var r;
		try {
			if (r = $.parseJSON(t), n.isArray(r.items))
				return new i.Synth2SynthData(r.items)
		} catch (u) {}
		return null
	});
	i.Synth2SynthPair = function (n, t) {
		this.previous = n || null;
		this.next = t || null
	};
	i.Synth2SynthDA = function (r) {
		function y() {
			function u() {
				var r = i + (n.stringEndsWith(i, "/") ? "" : "/");
				return n.stringEndsWith(r, t.viewModel.siteBaseUrl)
			}
			function f() {
				return !!_.find(r, function (n) {
					if (i.indexOf(n.toLowerCase()) > -1)
						return !0
				})
			}
			var r = [t.viewModel.exploreFeaturedUrl, t.viewModel.exploreRecentSynthsUrl, t.viewModel.exploreRecentFavoritesUrl, t.viewModel.exploreAllTimeFavoritesUrl, t.viewModel.usersBaseUrl, t.viewModel.viewBaseUrl],
			i = document.referrer.toLowerCase();
			return i.length > 0 && (u() || f())
		}
		function p() {
			r && y() && (v = i.Synth2SynthData.parse(window.sessionStorage.getItem(s)))
		}
		var e = 1001,
		o = e / 2,
		s = "Synth2SynthData",
		f = this,
		l = !0,
		a = !1,
		v = null,
		u = null;
		this.store = function (t, r) {
			var u = 0;
			n.isArray(t) && n.isInteger(r) && t.length > r && r >= 0 && (t.length > e && r >= o && (u = r - o), window.sessionStorage.setItem(s, JSON.stringify(new i.Synth2SynthData(t.slice(u, u + e)))))
		};
		this.getFullData = function () {
			return a || (a = !0, p()),
			v
		};
		this.hasData = function () {
			var n = f.getFullData();
			return n !== null && n.items.length > 0
		};
		this.getCurrentPairAsync = function (t, r) {
			function a() {
				u.previous && u.previous.ThumbnailUrl == null && (u.previous = null);
				u.next && u.next.ThumbnailUrl == null && (u.next = null);
				r(u)
			}
			if (u || !f.hasData(!0)) {
				u = u || new i.Synth2SynthData;
				r(u);
				return
			}
			var v = new c,
			e = f.getFullData(),
			s = n.arrayFindFirstIndex(e.items, function (i) {
					return n.stringEquals(i.Id, t, !0)
				}),
			h = s - 1,
			l = s + 1,
			o = [];
			if (u = new i.Synth2SynthPair, h >= 0 && (u.previous = e.items[h], u.previous.ThumbnailUrl || o.push(u.previous.Id)), l < e.items.length && (u.next = e.items[l], u.next.ThumbnailUrl || o.push(u.next.Id)), o.length === 0) {
				r(u);
				return
			}
			v.Media.getListAsync(o, function (n) {
				var r,
				t;
				if (_.isArray(n.Collections)) {
					for (r = n.Collections, t = 0; t < r.length; ++t)
						u.previous && r[t].Id === u.previous.Id ? (u.previous = new i.Synth2SynthItem(r[t]), e.items[h] = r[t]) : u.next && r[t].Id === u.next.Id && (u.next = new i.Synth2SynthItem(r[t]), e.items[l] = r[t]);
					f.store(e.items, s);
					a(u)
				}
			}, function () {
				console.warn("Unable to get media data for current Synth2Synth pair");
				a(u)
			})
		};
		this.isAvailable = function () {
			return l
		};
		h.hasStorageAPIs || (l = !1, this.store = this.clear = n.NullFunction, console.info("Storage API not available: Synth2Synth feature will be disabled"))
	};
	i.Synth2SynthControl = function (n, i, r, f) {
		function p(n) {
			var t = null,
			i = null,
			r = !1;
			return {
				fadeIn: function () {
					window.clearTimeout(t);
					t = null;
					i = window.setTimeout(function () {
							n.fadeIn()
						}, l * 1e3)
				},
				fadeOut: function () {
					window.clearTimeout(t);
					window.clearTimeout(i);
					r || (t = window.setTimeout(function () {
								n.fadeOut("slow")
							}, c * 1e3))
				}
			}
		}
		function s(n, i) {
			var e = n.find(".ps-sq-thumb").css("background-image", "url('" + i.ThumbnailUrl + "')"),
			o = n.find(".ps-sq-link, .ps-sq-title"),
			s = n.find(".ps-sq-title"),
			h = n.prev("b"),
			f = t.viewModel.getViewUrl(i.Id, !0),
			r = p(n);
			n.data("rotator", new u.ThumbnailRotator(e[0], !1, new u.BasicImageSource(i.ThumbnailUrl), 20, 100, new u.PriorityDownloader, 3, 1e3, null)).mouseenter(function () {
				r.fadeIn()
			}).mouseleave(function () {
				r.fadeOut()
			});
			o.attr({
				href: f,
				title: i.Name
			});
			s.text(i.Name);
			n.find(".ps-sq-author").attr({
				href: t.viewModel.getUsersUrl(i.OwnerUsername),
				title: i.OwnerUsername
			}).text(i.OwnerUsername);
			h.click(function (n) {
				window.location.href = f;
				n.stopPropagation()
			}).mouseenter(function () {
				r.fadeIn()
			}).mouseleave(function () {
				r.fadeOut()
			})
		}
		function h(n) {
			return e.append('<b class="psc-default-sprite ' + n + '"><\/b><div class="' + o + " " + n + '"><div class="ps-sq-thumb"><a class="ps-sq-link"><\/a><\/div><a class="nowrap-ellipsize level1 ps-sq-title"><\/a><a class="nowrap-ellipsize ps-sq-author"><\/a><\/div>'),
			e.toggle(f).find("div." + n)
		}
		var c = .2,
		l = .4,
		o = "ps-sq-synth",
		a = "ps-sq-next",
		v = "ps-sq-previous",
		e = $(n),
		y = null;
		i.getCurrentPairAsync(r, function (n) {
			y = n;
			n.previous && s(h(v), n.previous);
			n.next && s(h(a), n.next);
			e.find("." + o).mouseenter(function () {
				$(this).data("rotator").start()
			}).mouseleave(function () {
				$(this).data("rotator").stop()
			})
		});
		this.setVisible = function (n) {
			e.toggleDisplayNone(n)
		}
	}
}
(), function () {
	var t = Microsoft.Photosynth,
	n = t.Util,
	r = t.Page,
	u = r.MasterPage,
	i = {};
	u.Controls = i;
	i.ProfileTabControl = function (t, i) {
		function ct() {
			t.isSaving(!1);
			e.hide()
		}
		function lt(n) {
			t.isSaving(!1);
			w.text(n)
		}
		function at(n) {
			t.isSaving(!1);
			b.text(n)
		}
		function g() {
			w.text("");
			b.text("")
		}
		function f(n) {
			var t = "level2",
			i = "level4",
			r = "ps-sq-disabled",
			u = s.hasClass(t),
			f = n ^ u;
			return f ? (n ? (s.removeClass(i).addClass(t), p.removeClass(r)) : (s.removeClass(t).addClass(i), p.addClass(r)), !0) : !1
		}
		function nt() {
			t.isSaving(!0);
			g();
			it(ct, lt, at);
			u = !1
		}
		function tt() {
			var n = t.notify,
			i;
			t.username.revert();
			t.email.revert();
			for (i in n)
				n.hasOwnProperty(i) && n[i].revert();
			u = !1;
			f(!0);
			e.hide();
			g()
		}
		function vt(t) {
			t.which === n.KeyCode.Esc ? tt() : t.which !== n.KeyCode.Return || v.is(":disabled") || nt()
		}
		var e = this,
		o = i || {},
		it = o.onSaveClick || function (n, t) {
			t()
		},
		rt = o.onResendVerificationClick || n.NullFunction,
		c = "#profile-tab-control",
		l = $(c),
		a = $(c + " > .ps-sq-tab"),
		ut = $("#profile-loading-tab"),
		r = "#profile-edit-tab",
		ft = $(r),
		v = $(r + " .ps-sq-ok"),
		et = $(r + " .ps-sq-cancel"),
		ot = $("#edit-email"),
		y = $("#resend-verification-container"),
		s = $("#resend-verification"),
		p = $("#resend-verification-container i"),
		w = $("#edit-username-error"),
		b = $("#edit-email-error"),
		st = n.booleanOrDefault(o.editEnabled, !1),
		h = $("body"),
		k = ".psc-default-faux-scrollbar",
		ht = h.css("overflow-y"),
		d = null,
		u = !1;
		st || (a.hide(), ut.show());
		y.children().click(function () {
			f(!1) && rt(t.email(), n.NullFunction, function () {
				f(!0)
			})
		});
		ot.blur(function () {
			var r = t.email.edit().trim(),
			n = t.notify,
			i;
			if (f(!t.email.isDirty()), r !== t.email() && r.length === 0 && !u) {
				for (i in n)
					n.hasOwnProperty(i) && n[i].edit(!1);
				u = !0
			}
		});
		$(r + " input").keydown(vt);
		v.click(nt);
		et.click(tt);
		this.enableEdit = function () {
			a.hide();
			ft.show();
			(t.email().trim().length === 0 || t.verified()) && e.hideEmailVerification()
		};
		this.hideEmailVerification = function () {
			y.hide()
		};
		this.hide = function () {
			l.hide();
			h.css("overflow-y", ht);
			d && $(k).show()
		};
		this.show = function () {
			var n = $(k);
			l.show();
			h.css("overflow-y", "hidden");
			d = n.is(":visible");
			n.hide()
		}
	}
}
(), function () {
	var f = Microsoft.Photosynth,
	e = f.Page,
	o = f.Compatibility,
	s = f.Controls,
	t = f.Util,
	r = f.Resources,
	u = f.RestClient,
	i = e.MasterPage,
	h = i.Controls,
	n = i.Links;
	$(function () {
		function y(n, i, r) {
			n.ownCommentedEnabled(r && t.booleanOrDefault(i.OwnCommented));
			n.replyCommentedEnabled(r && t.booleanOrDefault(i.ReplyCommented));
			n.followedEnabled(r && t.booleanOrDefault(i.Followed));
			n.ownFeaturedEnabled(r && t.booleanOrDefault(i.OwnFeatured));
			n.ownLikedEnabled(r && t.booleanOrDefault(i.OwnLiked))
		}
		var l = {},
		p = $("#show-settings"),
		c = new u,
		v = [],
		a = "saveEmailPopupShown",
		f;
		o.isBrowserUnsupported() && (o.isBrowserOlderThanIE9() || $("body").is(".ps-sq-home, .ps-sq-view, .ps-sq-users")) && (new s.UnsupportedBrowserCover).show();
		i.viewModel = function (i) {
			var e = i || {},
			o = e.CurrentUser || {},
			u = o.Notification || {},
			r = {},
			f = !1;
			return r.isPhotosynthUser = _.isObject(e.CurrentUser),
			r.currentUser = {
				username: ko.observable(o.Username).editable(),
				email: ko.observable(t.stringOrDefault(u.Email).trim()).editable(function (n, t) {
					return n.trim() != t.trim()
				}),
				emailWasNeverSet: ko.observable(u.Email === null),
				verified: ko.observable(t.booleanOrDefault(u.Verified)),
				shouldPromptForEmail: function (n) {
					if (arguments.length === 0)
						return f;
					_.isBoolean(n) && f !== n && (t.setCookie(a, (!n).toString(), null, "/", null, null), f = n)
				},
				notify: {
					ownCommentedEnabled: ko.observable(!1).editable(),
					replyCommentedEnabled: ko.observable(!1).editable(),
					followedEnabled: ko.observable(!1).editable(),
					ownFeaturedEnabled: ko.observable(!1).editable(),
					ownLikedEnabled: ko.observable(!1).editable()
				}
			},
			y(r.currentUser.notify, u, r.currentUser.email().length > 0),
			f = r.currentUser.emailWasNeverSet() && t.getCookie(a) !== (!0).toString(),
			r.currentUser.isSaving = ko.observable(!1),
			r.currentUser.areEmailSettingsDirty = ko.computed(function () {
					var i = r.currentUser,
					n = i.notify,
					t;
					if (i.email.isDirty())
						return !0;
					for (t in n)
						if (n.hasOwnProperty(t) && n[t].isDirty())
							return !0;
					return !1
				}),
			r.currentUser.areSettingsDirty = ko.computed(function () {
					var n = r.currentUser;
					return n.username.isDirty() || n.areEmailSettingsDirty()
				}),
			r.isBetaUser = i.IsBetaUser,
			r.siteBaseUrl = n.siteBaseUrl,
			r.legacyBaseUrl = n.legacyBaseUrl,
			r.exploreFeaturedUrl = n.exploreFeaturedUrl,
			r.exploreRecentSynthsUrl = n.exploreRecentSynthsUrl,
			r.exploreRecentFavoritesUrl = n.exploreRecentFavoritesUrl,
			r.exploreAllTimeFavoritesUrl = n.exploreAllTimeFavoritesUrl,
			r.gettingStartedUrl = n.gettingStartedUrl,
			r.aboutUrl = n.aboutUrl,
			r.helpUrl = n.helpUrl,
			r.uploadUrl = n.uploadUrl,
			r.usersBaseUrl = n.usersBaseUrl,
			r.viewBaseUrl = n.viewBaseUrl,
			r.embedBaseUrl = n.embedBaseUrl,
			r.signupUrl = n.signupUrl,
			r.mapBaseUrl = n.mapBaseUrl,
			r.legacyProfileUrl = n.legacyProfileUrl,
			r.legacyEmbedUrl = n.legacyEmbedUrl,
			r.legacyViewUrl = n.legacyViewUrl,
			r.getMapUrl = function (t) {
				return n.getMapUrl(t)
			},
			r.getEmbedUrl = function (t) {
				return n.getEmbedUrl(t)
			},
			r.getLegacyEmbedUrl = function (t, i, r) {
				return n.getLegacyEmbedUrl(t, i, r)
			},
			r.getViewUrl = function (t, i) {
				return n.getViewUrl(t, i)
			},
			r.getLegacyViewUrl = function (t) {
				return n.getLegacyViewUrl(t)
			},
			r.getUsersUrl = function (t) {
				return n.getUsersUrl(t)
			},
			r.getLegacyUsersUrl = function (t) {
				return n.getLegacyUsersUrl(t)
			},
			r.getUsersFeedUrl = function (t) {
				return n.getUsersFeedUrl(t)
			},
			r.getUsersFavoritesUrl = function (t) {
				return n.getUsersFavoritesUrl(t)
			},
			r
		}
		(i.serverDataModel);
		for (f in e)
			e.hasOwnProperty(f) && t.stringEndsWith(f, "Page") && f !== "MasterPage" && (v.push(f), _.isFunction(e[f].ready) && e[f].ready());
		v.forEach(function (n) {
			var t = e[n].viewModel;
			_.isObject(t) && !_.isFunction(t) && (i.viewModel[n] = t)
		});
		s.styleAll();
		ko.applyBindings(i.viewModel);
		l.onSaveClick = function (n, f, e) {
			function k() {
				for (var n in s)
					if (s.hasOwnProperty(n) && s[n].edit())
						return !0;
				return !1
			}
			function d(n) {
				p ? c.Users.editAsync(o.username(), {
					Username: h
				}, n, function (n) {
					switch (n) {
					case 400:
						f(r.Strings.UserProfileServerError.BadRequest);
					case 403:
						f(r.Strings.UserProfileServerError.Forbidden);
						break;
					case 409:
						f(r.Strings.UsernameError.AlreadyInUse);
						break;
					case 422:
						f(r.Strings.UsernameError.InvalidFormat);
						break;
					default:
						f(r.Strings.UserProfileServerError.Default)
					}
				}) : n()
			}
			function g(n) {
				var t = {
					Types: {
						OwnCommented: s.ownCommentedEnabled.edit(),
						ReplyCommented: s.replyCommentedEnabled.edit(),
						Followed: s.followedEnabled.edit(),
						OwnFeatured: s.ownFeaturedEnabled.edit(),
						OwnLiked: s.ownLikedEnabled.edit()
					}
				};
				v && (t.EmailAddress = l);
				w ? c.Users.Settings.setEmailNotificationSettingsAsync(t, function () {
					o.email.commit();
					for (var t in s)
						s.hasOwnProperty(t) && s[t].commit();
					n()
				}, function () {
					e("Unable to update email, make sure it's valid")
				}) : n()
			}
			function nt() {
				o.username.commit();
				n();
				tt()
			}
			function tt() {
				$("body").hasClass("ps-sq-users") && p && (window.history && _.isFunction(window.history.replaceState) ? (document.title = h + "'s Library", window.history.replaceState(null, null, h + location.search + location.hash)) : window.location = i.viewModel.getUsersUrl(h))
			}
			var o = i.viewModel.currentUser,
			s = o.notify,
			h = o.username.edit(),
			l = o.email.edit().trim(),
			y = l.length === 0,
			p = o.username() !== h,
			v = o.email.isDirty(),
			w = o.areEmailSettingsDirty() || v,
			b = u.Validation.validateUsername(h),
			a = !1;
			o.email.edit(l);
			switch (b) {
			case u.Enum.UsernameValidationState.CannotBeBlank:
				f(r.Strings.UsernameError.CannotBeBlank);
				break;
			case u.Enum.UsernameValidationState.TooLong:
				f(r.Strings.UsernameError.TooLong);
				break;
			case u.Enum.UsernameValidationState.CharactersNotAllowed:
				f(r.Strings.UsernameError.CharactersNotAllowed);
				break;
			case u.Enum.UsernameValidationState.MustBeginWithLetter:
				f(r.Strings.UsernameError.MustBeginWithLetter);
				break;
			case u.Enum.UsernameValidationState.InvalidFormat:
				f(r.Strings.UsernameError.InvalidFormat);
				break;
			case u.Enum.UsernameValidationState.Valid:
				a = !0;
				break;
			default:
				f(r.Strings.UsernameError.Misc)
			}
			!w || y || t.isValidEmailAddress(l) ? y && k() && (e(r.Strings.EmailRequiredForNotifications), a = !1) : (e(r.Strings.InvalidEmailFormat), a = !1);
			a && g(function () {
				v && (o.emailWasNeverSet(!1), o.shouldPromptForEmail(!1));
				d(nt)
			})
		};
		l.onResendVerificationClick = function (n, t, i) {
			c.Users.Settings.setEmailNotificationSettingsAsync({
				EmailAddress: n
			}, function () {
				t()
			}, function () {
				i("Unable to update email, make sure it's valid")
			})
		};
		i.profileTabControl = new h.ProfileTabControl(i.viewModel.currentUser, l);
		p.click(i.profileTabControl.show);
		t.browserIgnoreEmptyLink();
		i.viewModel.isPhotosynthUser && c.Users.Settings.getEmailNotificationSettingsAsync(function (n) {
			var r = i.viewModel.currentUser,
			f = r.notify,
			u = !1;
			r.email(t.stringOrDefault(n.EmailAddress));
			r.emailWasNeverSet(n.EmailAddress === null);
			u = r.email().length > 0;
			r.verified(t.booleanOrDefault(n.Verified) && u);
			r.shouldPromptForEmail(r.emailWasNeverSet() && t.getCookie(a) !== (!0).toString());
			y(f, n.Types, u);
			i.profileTabControl.enableEdit()
		})
	})
}
()
