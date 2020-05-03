"use strict";
window.Microsoft = window.Microsoft || {};
Microsoft.Photosynth = Microsoft.Photosynth || {};
Microsoft.Photosynth.Controls = Microsoft.Photosynth.Controls || {};
Microsoft.Photosynth.Controls.extend = function (n, t) {
	for (var i in t)
		t.hasOwnProperty(i) && (typeof t[i] == "object" && typeof n[i] == "object" ? Microsoft.Photosynth.Controls.extend(n[i], t[i]) : n[i] = typeof t[i] == "object" ? Microsoft.Photosynth.Controls.extend({}, t[i]) : t[i]);
	return n
};
Microsoft.Photosynth.Controls.GestureHelper = function (n, t) {
	function k(n) {
		n.type = "gestureStart";
		ni(n)
	}
	function it(n) {
		n.type = "gestureChange";
		ti(n)
	}
	function a(n) {
		n.type = "gestureEnd";
		ii(n);
		i.focus()
	}
	function ht(n) {
		n.type = "discreteZoom";
		ri(n)
	}
	function ct(n) {
		ui(n)
	}
	function lt(n) {
		fi(n)
	}
	function u(t) {
		for (var r = 0, u = 0, i = n, o = document.fullscreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement, f, e; i != null && i != o && !isNaN(i.offsetLeft) && !isNaN(i.offsetTop); )
			r += i.offsetLeft - i.scrollLeft, u += i.offsetTop - i.scrollTop, i = i.offsetParent;
		return f = t.clientX - r,
		e = t.clientY - u, {
			x: f,
			y: e
		}
	}
	function at(n) {
		if (n.pointerType !== "mouse" || n.button === 0)
			try {
				b.addPointer(n.pointerId);
				var t = u(n);
				r++;
				r > 1 && a({
					layerX: t.x,
					layerY: t.y,
					screenX: n.screenX,
					screenY: n.screenY,
					translationX: e,
					translationY: o,
					scale: s,
					pointersStillDown: !0
				});
				k({
					layerX: t.x,
					layerY: t.y,
					screenX: n.screenX,
					screenY: n.screenY,
					pointerCount: r
				});
				e = 0;
				o = 0;
				s = 1
			} catch (n) {}
	}
	function vt(n) {
		if (n.pointerType !== "mouse" || n.button === 0) {
			r--;
			r < 0 && (r = 0);
			var t = u(n),
			i = r > 0;
			a({
				layerX: t.x,
				layerY: t.y,
				screenX: n.screenX,
				screenY: n.screenY,
				translationX: e,
				translationY: o,
				scale: s,
				pointersStillDown: i
			});
			i && (k({
					layerX: t.x,
					layerY: t.y,
					screenX: n.screenX,
					screenY: n.screenY,
					pointerCount: r
				}), e = 0, o = 0, s = 1)
		}
	}
	function yt() {}
	function pt(n) {
		if (r > 0) {
			e += n.translationX;
			o += n.translationY;
			s *= n.scale;
			var t = u(n);
			n.detail & n.MSGESTURE_FLAG_INERTIA ? a({
				layerX: t.x,
				layerY: t.y,
				screenX: n.screenX,
				screenY: n.screenY,
				translationX: e,
				translationY: o,
				scale: s
			}) : it({
				layerX: t.x,
				layerY: t.y,
				screenX: n.screenX,
				screenY: n.screenY,
				translationX: e,
				translationY: o,
				scale: s
			})
		}
	}
	function wt(n) {
		if (r > 0) {
			var t = u(n);
			a({
				layerX: t.x,
				layerY: t.y,
				screenX: n.screenX,
				screenY: n.screenY,
				translationX: e,
				translationY: o,
				scale: s
			})
		}
	}
	function bt(n) {
		if (n.button === 0) {
			var t = u(n);
			k({
				layerX: t.x,
				layerY: t.y,
				screenX: n.screenX,
				screenY: n.screenY,
				pointerCount: 1
			});
			h = {
				x: t.x,
				y: t.y
			};
			n.preventDefault();
			document.addEventListener("mousemove", rt, !1);
			document.addEventListener("mouseup", p, !1)
		}
	}
	function rt(n) {
		if (h != null) {
			var t = u(n);
			it({
				layerX: t.x,
				layerY: t.y,
				screenX: n.screenX,
				screenY: n.screenY,
				translationX: t.x - h.x,
				translationY: t.y - h.y,
				scale: 1
			});
			n.preventDefault()
		}
	}
	function p(n) {
		if (h != null) {
			var t = u(n);
			a({
				layerX: t.x,
				layerY: t.y,
				screenX: n.screenX,
				screenY: n.screenY,
				translationX: t.x - h.x,
				translationY: t.y - h.y,
				scale: 1
			});
			h = null;
			n.preventDefault();
			document.removeEventListener("mousemove", rt, !1);
			document.removeEventListener("mouseup", p, !1)
		}
	}
	function v(n) {
		var r = n.detail ? n.detail * -1 : n.wheelDelta / 40,
		t,
		i;
		r > 0 ? t = 1 : r < 0 && (t = -1);
		i = u(n);
		ht({
			layerX: i.x,
			layerY: i.y,
			screenX: n.screenX,
			screenY: n.screenY,
			direction: t
		});
		n.preventDefault()
	}
	function d(n) {
		var t = u(n);
		ht({
			layerX: t.x,
			layerY: t.y,
			screenX: n.screenX,
			screenY: n.screenY,
			direction: 1
		});
		n.preventDefault()
	}
	function w(n) {
		n.length === 0 && (y = {
				primary: null,
				secondary: null
			});
		n.length === 1 ? y = {
			primary: n[0].identifier,
			secondary: null
		}
		 : n.length == 2 && (y = {
				primary: n[0].identifier,
				secondary: n[1].identifier
			})
	}
	function l(n) {
		var t,
		r,
		i;
		if (y == null)
			return null;
		for (t = {
				primary: null,
				secondary: null
			}, r = 0; r < n.length; r++)
			if (i = n[r], i.identifier == y.primary ? (t.primary = i, t.primary.layerXY = u(i)) : i.identifier == y.secondary && (t.secondary = i, t.secondary.layerXY = u(t.secondary)), t.primary != null && t.secondary != null)
				return t;
		return t
	}
	function ft(n, t) {
		var i = n.primary,
		r = n.secondary,
		f = (i.layerXY.x + r.layerXY.x) / 2,
		e = (i.layerXY.y + r.layerXY.y) / 2,
		l = (i.screenX + r.screenX) / 2,
		a = (i.screenY + r.screenY) / 2,
		o = i.layerXY.x - r.layerXY.x,
		s = i.layerXY.y - r.layerXY.y,
		h = Math.sqrt(o * o + s * s),
		u = {
			layerX: f,
			layerY: e,
			screenX: l,
			screenY: a,
			pointerCount: n.secondary == null ? 1 : 2
		};
		return t ? (u.translationX = f - c.x, u.translationY = e - c.y, u.scale = h / ut) : (c = {
				x: f,
				y: e
			}, ut = h),
		u
	}
	function g(n) {
		k(n);
		f = n;
		f.translationX = 0;
		f.translationY = 0;
		f.scale = 1
	}
	function kt(n) {
		it(n);
		f = n
	}
	function nt(n, t) {
		n.pointersStillDown = t;
		a(n)
	}
	function et(n) {
		var t;
		n.targetTouches.length === 1 ? (w(n.targetTouches), t = l(n.targetTouches), g({
				layerX: t.primary.layerXY.x,
				layerY: t.primary.layerXY.y,
				screenX: t.primary.screenX,
				screenY: t.primary.screenY,
				pointerCount: t.secondary == null ? 1 : 2
			}), c = {
				x: t.primary.layerXY.x,
				y: t.primary.layerXY.y
			}) : n.targetTouches.length === 2 && (t = l(n.targetTouches), nt(f, !0), w(n.targetTouches), t = l(n.targetTouches), g(ft(t, !1)))
	}
	function dt(n) {
		n.preventDefault();
		var t = l(n.targetTouches);
		(t == null || t.primary == null) && (et(n), t = l(n.targetTouches));
		t.secondary == null ? kt({
			layerX: t.primary.layerXY.x,
			layerY: t.primary.layerXY.y,
			screenX: t.primary.screenX,
			screenY: t.primary.screenY,
			translationX: t.primary.layerXY.x - c.x,
			translationY: t.primary.layerXY.y - c.y,
			scale: 1
		}) : kt(ft(t, !0))
	}
	function gt(n) {
		var t,
		r,
		i;
		n.targetTouches.length === 0 ? (w(n.targetTouches), nt(f), c = null, ut = null) : n.targetTouches.length === 1 ? (nt(f, !0), w(n.targetTouches), i = l(n.targetTouches), t = i.primary, g({
				layerX: t.layerXY.x,
				layerY: t.layerXY.y,
				screenX: t.screenX,
				screenY: t.screenY,
				pointerCount: i.secondary == null ? 1 : 2
			}), c = {
				x: t.layerXY.x,
				y: t.layerXY.y
			}) : (r = l(n.targetTouches), (r.primary == null || r.secondary == null) && (nt(f, !0), w(n.targetTouches), i = l(n.targetTouches), g(ft(i, !1))))
	}
	function ei() {
		var t = n.firstChild;
		t ? n.insertBefore(i, t) : n.appendChild(i);
		i.addEventListener("keydown", ct, !1);
		i.addEventListener("keyup", lt, !1);
		i.focus()
	}
	function oi() {
		i.removeEventListener("keydown", ct, !1);
		i.removeEventListener("keyup", lt, !1);
		i.parentNode && i.parentNode.removeChild(i)
	}
	var n = n,
	ni = t.gestureStart || function () {},
	ti = t.gestureChange || function () {},
	ii = t.gestureEnd || function () {},
	ri = t.discreteZoom || function () {},
	ui = t.keyDown || function () {},
	fi = t.keyUp || function () {},
	tt = !1,
	b,
	r = 0,
	e,
	o,
	s,
	h = null,
	c = null,
	ut = null,
	f = null,
	y = {
		primary: null,
		secondary: null
	},
	ot,
	st,
	i;
	window.navigator.msPointerEnabled && window.MSGesture ? (ot = function () {
		b = new MSGesture;
		b.target = n;
		n.addEventListener("MSPointerDown", at, !1);
		n.addEventListener("MSPointerUp", vt, !1);
		n.addEventListener("MSGestureStart", yt, !0);
		n.addEventListener("MSGestureChange", pt, !0);
		n.addEventListener("MSGestureEnd", wt, !0);
		n.addEventListener("dblclick", d, !1);
		n.addEventListener("mousewheel", v, !1)
	}, st = function () {
		n.removeEventListener("MSPointerDown", at, !1);
		n.removeEventListener("MSPointerUp", vt, !1);
		n.removeEventListener("MSGestureStart", yt, !0);
		n.removeEventListener("MSGestureChange", pt, !0);
		n.removeEventListener("MSGestureEnd", wt, !0);
		n.removeEventListener("dblclick", d, !1);
		n.removeEventListener("mousewheel", v, !1);
		b = null
	}) : (ot = function () {
		document.body.addEventListener("touchstart", function () {}, !1);
		n.addEventListener("touchstart", et, !1);
		n.addEventListener("touchmove", dt, !1);
		n.addEventListener("touchend", gt, !1);
		n.addEventListener("mousedown", bt, !1);
		n.addEventListener("mousewheel", v, !1);
		n.addEventListener("DOMMouseScroll", v, !1);
		n.addEventListener("dblclick", d, !1);
		window.parent && window != window.parent && document.addEventListener("mouseout", p, !1)
	}, st = function () {
		n.removeEventListener("touchstart", et, !1);
		n.removeEventListener("touchmove", dt, !1);
		n.removeEventListener("touchend", gt, !1);
		n.removeEventListener("mousedown", bt, !1);
		n.removeEventListener("mousemove", rt, !1);
		n.removeEventListener("mouseup", p, !1);
		n.removeEventListener("mousewheel", v, !1);
		n.removeEventListener("DOMMouseScroll", v, !1);
		n.removeEventListener("dblclick", d, !1);
		window.parent && window != window.parent && document.removeEventListener("mouseout", p, !1)
	});
	i = document.createElement("input");
	i.readOnly = !0;
	i.style.width = "0px";
	i.style.height = "0px";
	i.style.opacity = 0;
	this.enable = function () {
		ot();
		ei();
		tt = !0
	};
	this.disable = function () {
		st();
		oi();
		tt = !1
	};
	this.isEnabled = function () {
		return tt
	};
	this.userCurrentlyInteracting = function () {
		return r > 0
	};
	this.focusKeyboardElement = function () {
		i.focus()
	}
};
Microsoft.Photosynth.Controls.GestureVelocity = function () {
	function s(f) {
		var c = Date.now(),
		s = c - i,
		l = f.translationX - r,
		a = f.translationY - u,
		h;
		s != 0 && n != null && (s > o && (n.x = 0, n.y = 0), h = {
				x: l / s,
				y: a / s
			}, n.x = (n.x * t + h.x) / (t + 1), n.y = (n.y * t + h.y) / (t + 1), t++, t > e && (t = e), i = Date.now(), r = f.translationX, u = f.translationY)
	}
	var i = null,
	r = 0,
	u = 0,
	n = null,
	t = 0,
	f,
	e = 5,
	o;
	this.onGestureStart = function (e) {
		i = Date.now();
		r = 0;
		u = 0;
		n = {
			x: 0,
			y: 0
		};
		t = 0;
		f = e.pointerCount
	};
	o = 100;
	this.onGestureChange = function (n) {
		s(n)
	};
	this.onGestureEnd = function (t) {
		return s(t),
		n == null || f !== 1 || t.pointersStillDown ? {
			x: 0,
			y: 0
		}
		 : {
			x: n.x,
			y: n.y
		}
	}
};
Microsoft.Photosynth.Controls.KeyboardVelocity = function (n) {
	function a() {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.isZero = function () {
			return this.x == 0 && this.y == 0 && this.z == 0
		}
	}
	function c(n, t) {
		return n && t || !n && !t ? 0 : n ? 1 : -1
	}
	function v() {
		t.x = c(u, r);
		t.y = c(e, f);
		t.z = c(o, s)
	}
	function p(n, t) {
		return n == null || t == null ? 0 : t - n
	}
	function w(n, t, i) {
		return Math.min(Math.max(n, t), i)
	}
	function l(n, t, i) {
		var u = !1,
		r;
		if (t == 0) {
			if (n == 0)
				return 0;
			t = n < 0 ? 1 : -1;
			u = !0
		}
		return (r = w(n + t * i, -1, 1), u && Math.abs(r) < Math.abs(i)) ? 0 : r
	}
	var y = n,
	r = !1,
	u = !1,
	f = !1,
	e = !1,
	o = !1,
	s = !1,
	t = new a,
	i = new a,
	h = null;
	this.keyDown = function (n) {
		t.isZero() && i.isZero() && (h = Date.now());
		n.keyCode == "37" ? r = !0 : n.keyCode == "38" ? f = !0 : n.keyCode == "39" ? u = !0 : n.keyCode == "40" ? e = !0 : n.keyCode == "107" || n.keyCode == "187" ? o = !0 : (n.keyCode == "109" || n.keyCode == "189") && (s = !0);
		v()
	};
	this.keyUp = function (n) {
		n.keyCode == "37" ? r = !1 : n.keyCode == "38" ? f = !1 : n.keyCode == "39" ? u = !1 : n.keyCode == "40" ? e = !1 : n.keyCode == "107" || n.keyCode == "187" ? o = !1 : (n.keyCode == "109" || n.keyCode == "189") && (s = !1);
		v()
	};
	this.getKeydownDirection = function () {
		return t
	};
	this.getVelocity = function () {
		return i
	};
	this.update = function () {
		var r = Date.now(),
		u = p(h, r),
		n;
		u != 0 && (n = y * u / 1e3, i.x = l(i.x, t.x, n), i.y = l(i.y, t.y, n), i.z = l(i.z, t.z, n));
		h = r
	};
	this.updateNeeded = function () {
		return !t.isZero() || !i.isZero()
	};
	this.anyKeysDown = function () {
		return !t.isZero()
	}
};
Microsoft.Photosynth.Controls.DownloadType = {
	Image: {}
};
Microsoft.Photosynth.Controls.ImageDownloader = function (n) {
	function o(n) {
		var t = n.target.__PS_ImageDownloader_Url;
		u(t, !0)
	}
	function f(n) {
		var t = n.target.__PS_ImageDownloader_Url;
		u(t, !1)
	}
	function s(n) {
		u(n, !1)
	}
	function u(n, u) {
		var f = r[n];
		f && (delete r[n], f.onload = null, f.onerror = null, f.onabort = null, t[n] && (delete t[n], window.clearTimeout(t[n])), i.downloadCompleted(n, u))
	}
	var e = Microsoft.Photosynth.Controls,
	i = {
		useCors: !1,
		downloadTimeout: 1e4,
		downloadCompleted: function () {}
	},
	r,
	t;
	e.extend(i, n || {});
	r = {};
	t = {};
	this.download = function (n) {
		var u = document.createElement("img");
		r[n] = u;
		u.onload = o;
		u.onerror = f;
		u.onabort = f;
		t[n] = window.setTimeout(function () {
				s(n)
			}, i.downloadTimeout);
		i.useCors && (u.crossOrigin = "");
		u.__PS_ImageDownloader_Url = n;
		u.src = n
	}
};
Microsoft.Photosynth.Controls.PriorityDownloader = function (n) {
	function c() {
		if (!(e >= u.downloadSlots) && i.length !== 0) {
			i.sort(function (n, t) {
				return n.priority - t.priority
			});
			var n = i.shift();
			if (n.downloadType === v.Image)
				y.download(n.url);
			else {
				o[n.url] = !0;
				l(n.url, !1);
				return
			}
			s[n.url] = !0;
			e++
		}
	}
	function l(n, t) {
		var u = r[n],
		i;
		if (u)
			for (i = 0; i < u.length; i++)
				u[i] != null && u[i](n, t)
	}
	function p(n) {
		delete r[n];
		delete t[n]
	}
	function w(n, t) {
		l(n, t);
		p(n);
		e--;
		t ? h[n] = !0 : o[n] = !0;
		delete s[n];
		c()
	}
	function a(n) {
		var r = Infinity,
		i;
		if (t[n])
			for (i = 0; i < t[n].length; i++)
				t[n] != null && (r = Math.min(r, t[n][i]));
		return r
	}
	var f = Microsoft.Photosynth.Controls,
	u = {
		useCors: !1,
		downloadSlots: 6,
		downloadTimeout: 1e4
	};
	f.extend(u, n || {});
	var v = f.DownloadType,
	i = [],
	e = 0,
	r = {},
	t = {},
	h = {},
	o = {},
	s = {},
	y = new f.ImageDownloader({
			useCors: u.useCors,
			downloadTimeout: u.downloadTimeout,
			downloadCompleted: w
		});
	this.download = function (n, u, f, e) {
		var v,
		y,
		l;
		if (h[n]) {
			e(n, !0);
			return
		}
		if (o[n]) {
			e(n, !1);
			return
		}
		for (r[n] = r[n] || [], r[n].push(e), t[n] = t[n] || [], t[n].push(f), v = a(n), y = !1, l = 0; l < i.length; l++)
			if (i[l].url === n) {
				i[l].priority = v;
				y = !0;
				continue
			}
		return y || s[n] || i.push({
			url: n,
			downloadType: u,
			priority: v
		}),
		c(),
		r[n].length - 1
	};
	this.setPriority = function (n, r, u) {
		var e,
		f;
		if (t[n] && r < t[n].length)
			for (t[n][r] = u, e = a(n), f = 0; f < i.length; f++)
				if (i[f].url === n) {
					i[f].priority = e;
					return
				}
	}
};
Microsoft.Photosynth.Controls.RestApi = function (n) {
	this.sendRequest = function (t, i, r, u) {
		function o(n) {
			if (n.currentTarget.status !== 200) {
				r(!1, null);
				return
			}
			try {
				var t = JSON.parse(n.currentTarget.responseText)
			} catch (i) {
				r(!1, null);
				return
			}
			r(!0, t)
		}
		function e() {
			r(!1, null)
		}
		var f = new XMLHttpRequest;
		f.open(t, n + i, !0);
		f.onload = o;
		f.onerror = e;
		f.onabort = e;
		f.ontimeout = e;
		f.send(u)
	}
};
Microsoft.Photosynth.Controls.BucketPriorityChooser = function (n, t) {
	var i = new Array(Math.ceil(n / t));
	this.chooseNextBucket = function (n) {
		for (var f = Math.floor(n / t), u = 0, r = null; f - u >= 0 || f + u <= i.length; ) {
			if ((r = f + u, r < i.length && !i[r]) || (r = f - u, r >= 0 && !i[r]))
				return r;
			++u
		}
		return null
	};
	this.markBucketAsDownloaded = function (n) {
		i[n] = !0
	}
};
Microsoft.Photosynth.Controls.Color = function (n, t, i) {
	function e(n) {
		if (typeof n != "number" || n < 0 || n > 255)
			throw "ArgumentException: value outside range of 0 to 255";
		return Math.floor(n)
	}
	function s(n) {
		var t = n.toString(16);
		return t.length < 2 ? "0" + t : t
	}
	var o = Microsoft.Photosynth.Controls.Color,
	c = this,
	h = 50,
	r = e(n),
	u = e(t),
	f = e(i);
	this.r = function (n) {
		return arguments.length === 1 && (r = e(n)),
		r
	};
	this.g = function (n) {
		return arguments.length === 1 && (u = e(n)),
		u
	};
	this.b = function (n) {
		return arguments.length === 1 && (f = e(n)),
		f
	};
	this.getHex = function () {
		return "#" + s(r) + s(u) + s(f)
	};
	this.getLightVersion = function () {
		var i = Math.max(r, u, f),
		e = r + u + f,
		n = e / 3,
		s = h / n,
		c = 255 / i,
		t = Math.min(s, c);
		return n >= h ? new o(r, u, f) : n === 0 ? new o(127, 127, 127) : new o(Math.floor(t * r), Math.floor(t * u), Math.floor(t * f))
	}
};
Microsoft.Photosynth.Controls.Color.fromHex = function (n) {
	return new Microsoft.Photosynth.Controls.Color(parseInt(n.substr(1, 2), 16), parseInt(n.substr(3, 2), 16), parseInt(n.substr(5, 2), 16))
};
Microsoft.Photosynth.Controls.BasicImageSource = function (n) {
	var t = [];
	this.getUrl = function (i) {
		if (t[i] == null) {
			var r = n.split("/");
			r[r.length - 1] = i + ".jpg";
			t[i] = r.join("/")
		}
		return t[i]
	}
};
Microsoft.Photosynth.Controls.ThumbnailRotator = function (n, t, i, r, u, f, e, o, s) {
	function nt(n) {
		n.parentElement && n.parentElement.removeChild(n)
	}
	function b() {
		y && (nt(v[c]), it.appendChild(v[c]))
	}
	function ot() {
		var n = c + a;
		return n == h ? (n = h - 2, a *= -1) : n == -1 && (n = 1, a *= -1),
		n
	}
	function st() {
		for (var n = 0; n < h; ++n)
			if (!d[n])
				return;
		y = !0
	}
	function ht(n) {
		var t;
		return rt ? (t = document.createElement("div"), t.style.backgroundImage = "url('" + n + "')") : (t = document.createElement("img"), t.src = n),
		t.style.width = "100%",
		t.style.height = "100%",
		t.style.position = "absolute",
		t.style.zIndex = 1,
		t
	}
	function ct(n) {
		return function (t, i) {
			d[n] = i;
			delete l[n];
			v[n] = ht(t);
			st()
		}
	}
	function lt() {
		var n,
		t,
		i;
		if (!y) {
			for (n = 0; n < h; ++n)
				t = k.getUrl(n), i = ft + n / h, g ? l[n] != null && p.setPriority(t, l[n], i) : l[n] = p.download(t, Microsoft.Photosynth.Controls.DownloadType.Image, i, ct(n));
			g = !0
		}
	}
	function tt() {
		w && clearInterval(w)
	}
	function at() {
		var n,
		t;
		if (!y)
			for (n = 0; n < l.length; n++)
				l[n] != null && (t = k.getUrl(n), p.setPriority(t, l[n], et))
	}
	var it = n,
	rt = t,
	k = i,
	h = r,
	ut = u,
	p = f,
	ft = e,
	et = o,
	w,
	c = 0,
	a = 1,
	d = new Array(h),
	l = new Array(h),
	v = new Array(h),
	g = !1,
	y = !1;
	this.start = function () {
		c = 0;
		tt();
		lt();
		b();
		w = setInterval(function () {
				y && (c = ot(), b(), c === 0 && a === -1 && s && s())
			}, ut)
	};
	this.stop = function () {
		c = 0;
		a = 1;
		b();
		tt();
		at();
		for (var n = 0; n < h; n++)
			v[n] != null && nt(v[n])
	}
};
Microsoft.Photosynth.Controls.LibrarySliderDataProvider = function (n) {
	function ri() {
		this.getRenderable = function (n) {
			var t = k[n];
			return t ? t : k[n] = pt(n, !0)
		};
		this.animateRenderable = function () {
			return !1
		};
		this.getLength = function () {
			return u
		}
	}
	function ot(n, i) {
		if (n.length > 0) {
			var r = '{Ids:["' + n.join('","') + '"]}';
			// Switch the xhr method used to fetch the list of all synths from POST to GET.
			et.sendRequest("GET", t.fullDataPath, i, r)
		}
	}
	function ui(n, i) {
		var r = [],
		f = t.compactPath,
		u;
		if (r.push("offset=" + n.toFixed()), r.push("numRows=" + i.toFixed()), r.push("maxDate=" + ni.toFixed()), t.compactParams && t.compactParams.length > 0)
			for (u = 0; u < t.compactParams.length; u++)
				r.push(t.compactParams[u]);
		return f + (f.indexOf("?") > -1 ? "&" : "?") + r.join("&")
	}
	function fi(n, i, u) {
		var e,
		o;
		if (!n) {
			console.error("failed to download full metadata for some items");
			return
		}
		for (var f = 0, s = i.TotalResults, c = u * t.fullDataNumRows; f < s; f++)
			e = c + f, o = r[e] = i.Collections[f], rt(e), w(o.Status) && (h[o.Id] = e);
		it();
		ft()
	}
	function ei(n) {
		return function (t, i) {
			fi(t, i, n)
		}
	}
	function oi(n) {
		var t = h[n.Id];
		n.Status !== i[t].Status && (w(n.Status) || (h[n.Id] = undefined), r[t] = n, i[t] = n, rt(t))
	}
	function si(n, i) {
		if (!n) {
			console.error("failed to download full metadata when checking on pending items");
			return
		}
		for (var r = 0, u = i.TotalResults; r < u; r++)
			oi(i.Collections[r]);
		ft();
		setTimeout(st, t.pendingItemsPollTime)
	}
	function st() {
		var i,
		r,
		n;
		if (t.pollForPendingItems) {
			i = 0;
			r = [];
			for (n in h)
				h.hasOwnProperty(n) && typeof h[n] != "undefined" && (r.push(n), i++, i > t.fullDataNumRows);
			ot(r, si)
		}
	}
	function it() {
		var r = d.chooseNextBucket(o),
		f,
		e,
		n,
		s;
		if (r == null) {
			st();
			return
		}
		for (f = [], e = !0, n = r * t.fullDataNumRows, s = Math.min((r + 1) * t.fullDataNumRows, u); n < s; n++)
			if (i[n] && i[n].Id)
				f.push(i[n].Id);
			else {
				e = !1;
				break
			}
		e && f.length > 0 ? (d.markBucketAsDownloaded(r), ot(f, ei(r))) : setTimeout(it, 100)
	}
	function rt(n) {
		var t = s[n];
		t && vt(t.elem, n);
		t = v[n];
		t && ut(t.elem, n, !0);
		t = y[n];
		t && ut(t.elem, n, !1);
		t = k[n];
		t && lt(t.elem, n)
	}
	function w(n) {
		return dt.hasOwnProperty(n)
	}
	function ht(n) {
		return gt.hasOwnProperty(n)
	}
	function ct(n, t) {
		if (!n.__slashSet) {
			n.__slashSet = !0;
			var r = document.createElement("div"),
			i = r.style,
			u = .3,
			f = t * u,
			e = t * (.5 - u / 2);
			i.position = "relative";
			i.top = "0px";
			i.left = e + "px";
			i.width = f + "px";
			i.height = "100%";
			i.backgroundColor = "rgba(255, 0, 0, 0.5)";
			i.transform = i.msTransform = i.webkitTransform = i.mozTransform = "rotate(-45deg)";
			n.appendChild(r)
		}
	}
	function lt(n, r) {
		var e,
		u,
		o;
		n.style.overflow = "hidden";
		e = t.defaultChipColor;
		u = i[r];
		u && (u.SynthPacket && u.SynthPacket.DominantColor && (e = u.SynthPacket.DominantColor, t.lightenChipColors && (e = f.Color.fromHex(e).getLightVersion().getHex())), u.Status !== c && (o = u.Status, ht(o) ? ct(n, t.chipWidth) : w(o) || console.warn("Status of synth (" + o + ") is not a known possible state")));
		n.style.backgroundColor = e
	}
	function at(n) {
		var i = o + t.downloadPriorityOffset;
		return Math.abs(n - i)
	}
	function vt(n, u) {
		var o,
		s,
		h,
		l,
		f;
		n.style.backgroundColor = "#AAAAAA";
		n.style.overflow = "hidden";
		o = r[u];
		o && (n.style.backgroundSize = "cover", n.style.backgroundPosition = "center", s = o.ThumbnailUrl, i[u].Status !== c && (h = i[u].Status, w(h) ? s = t.pendingImage : ht(h) ? (s = t.failedImage, ct(n, t.itemWidth)) : console.warn("Status of synth (" + h + ") is not a known possible state")), o.PrivacyLevel === "Unlisted" && t.visibilityIconVisible && (l = yt(t.visibilityIconSpriteClassName, t.visibilityIconUrl), f = l.style, f.position = "absolute", f.left = (t.itemWidth - t.visibilityIconWidth) / 2 + "px", f.bottom = t.visibilityIconBottomOffset + "px", f.zIndex = 2, n.appendChild(l)), hi(u, s, n, e))
	}
	function yt(n, t) {
		var i;
		return n ? (i = document.createElement("i"), i.className = n) : t && t.length > 0 && (i = document.createElement("img"), i.src = t),
		i
	}
	function hi(n, t, i, r) {
		nt[n] = t;
		l[n] = g.download(t, f.DownloadType.Image, at(n), function (t, u) {
				nt[n] = undefined;
				l[n] = undefined;
				u ? (i.style.backgroundImage = "url('" + t + "')", i.style.backgroundColor = "transparent") : r()
			})
	}
	function pt(n, i) {
		var u = document.createElement("div"),
		r = u.style,
		f = i ? t.chipWidth : t.itemWidth;
		return r.width = r.height = f + "px",
		r.left = r.top =  - (f / 2) + "px",
		r.position = "absolute",
		r.borderRadius = "50%",
		i ? lt(u, n) : vt(u, n), {
			elem: u,
			width: f
		}
	}
	function ut(n, i, u) {
		var o = r[i],
		f,
		s,
		h,
		c,
		e;
		!n.__styleSet && o && (n.__styleSet = !0, u ? (f = o.Viewings, s = t.viewsIconUrl, h = t.viewsIconSpriteClassName) : (f = o.FavoriteCount, s = t.heartsIconUrl, h = t.heartsIconSpriteClassName), f > 0 && (c = yt(h, s), e = document.createElement("span"), c.style.verticalAlign = "middle", n.appendChild(c), e.appendChild(document.createTextNode(" " + f)), e.style.verticalAlign = "middle", n.appendChild(e)))
	}
	function wt(n, i) {
		var r = document.createElement("div"),
		u,
		f;
		return i ? (u = t.viewsIconOffsetX, f = t.viewsIconOffsetY) : (u = t.heartsIconOffsetX, f = t.heartsIconOffsetY),
		r.style.position = "absolute",
		r.style.left = -u + "px",
		r.style.top = -f + "px",
		r.style.transformOrigin = u + "px " + f + "px",
		r.style.verticalAlign = "middle",
		r.style.color = "white",
		ut(r, n, i), {
			elem: r
		}
	}
	function ci(n, t) {
		r[n] = t;
		r[n].Status = c
	}
	function b(n, i, r, s, h, c) {
		et.sendRequest("GET", ui(i, r), function (l, a) {
			var k = !1,
			w = 0,
			p,
			nt;
			if (!l) {
				console.error("failed to get library data");
				return
			}
			if (p = a[t.compactCollectionsPropertyName], w = p.length, n) {
				if (u = a.TotalResults == null ? w : a.TotalResults, u === 0) {
					t.ready(null);
					return
				}
				if (i >= u) {
					b(!0, Math.max(0, u - r), r, s, !0, !0);
					return
				}
				o = Math.min(u - 1, o)
			}
			w > 0 && (t.compactPathReturnsFullData ? (bt(p, i, function (n, t) {
						ci(n, t);
						s(n, t)
					}), k = !0) : bt(p, i, s));
			var v = t.compactInfoNumRows,
			y = i - r,
			g = i + r;
			h && y > -v && (nt = y >= 0 ? v : y + v, b(!1, Math.max(0, y), y >= 0 ? v : y + v, e, !0, !1));
			c && g < u && b(!1, g, v, e, !1, !0);
			n && (t.compactPathReturnsFullData || (d = new f.BucketPriorityChooser(u, t.fullDataNumRows), it()), t.ready(o));
			k && ft()
		}, null)
	}
	function bt(n, r, u) {
		for (var f = 0, o = n.length, e; f < o; f++)
			e = r + f, i[e] = t.compactMediaProperty == null ? n[f] : n[f][t.compactMediaProperty], u(e, i[e]), rt(e)
	}
	function ft() {
		for (var n = 0; n < p.length; n++)
			p[n]()
	}
	var f = Microsoft.Photosynth.Controls,
	kt = this,
	dt = {
		Pending: {},
		Committed: {},
		Queued: {},
		Processing: {},
		Succeeded: {}
	},
	gt = {
		InsufficientCameras: {},
		Failed: {},
		Unknown: {},
		UserCanceled: {}
	},
	c = "Available",
	e = function () {},
	t = {
		baseUrl: "//photosynth.net/rest/v1.0/",
		compactPath: "media/featured",
		compactInfoNumRows: 100,
		compactParams: [],
		compactPathReturnsFullData: !1,
		compactCollectionsPropertyName: "Collections",
		compactMediaProperty: null,
		// Use a static json instead of calling the rest api to get 
		// the full list of all synths.
		fullDataPath: "_api_full_list.json",
		fullDataNumRows: 10,
		itemWidth: 305,
		chipWidth: 22,
		initSelectedIndexHint: 0,
		initSelectedId: null,
		initLookAroundNumRows: 200,
		downloadPriorityOffset: 2,
		defaultChipColor: "#AAAAAA",
		lightenChipColors: !0,
		pendingImage: null,
		failedImage: null,
		pollForPendingItems: !0,
		pendingItemsPollTime: 1e4,
		viewsIconVisible: !0,
		viewsIconSpriteClassName: "psc-default-sprite ps-sq-views",
		viewsIconUrl: null,
		viewsIconOffsetX: 13,
		viewsIconOffsetY: 9,
		heartsIconVisible: !0,
		heartsIconSpriteClassName: "psc-default-sprite ps-sq-hearts",
		heartsIconUrl: null,
		heartsIconOffsetX: 10.5,
		heartsIconOffsetY: 10,
		visibilityIconVisible: !0,
		visibilityIconSpriteClassName: "psc-default-sprite ps-sq-unlist",
		visibilityIconUrl: null,
		visibilityIconWidth: 16,
		visibilityIconBottomOffset: 10,
		thumbnailAnimationFrameCount: 20,
		thumbnailAnimationInterval: 100,
		thumbnailAnimationMaxLoops: 10,
		thumbnailAnimationPriority: 3,
		thumbnailAnimationStoppedPriority: 1e3,
		getUrlForItem: function () {
			return null
		},
		ready: e,
		dataUpdated: e,
		compactItems: [],
		fullItems: [],
		loadData: !0
	};
	f.extend(t, n || {});
	var ni = Date.now(),
	u = 0,
	s = {},
	v = {},
	y = {},
	k = {},
	i = t.compactItems,
	r = t.fullItems,
	h = {},
	d = null,
	o = Math.max(0, t.initSelectedIndexHint),
	et = new f.RestApi(t.baseUrl),
	g = new f.PriorityDownloader({}),
	l = {},
	nt = {},
	a = [],
	tt = 0,
	ti = new ri,
	ii = Math.max(t.initSelectedIndexHint - Math.ceil(t.initLookAroundNumRows / 2), 0),
	p = [];
	t.dataUpdated !== e && p.push(t.dataUpdated);
	this.getLength = function () {
		return t.loadData ? u : i.length
	};
	this.getRenderable = function (n) {
		var t = s[n];
		return t ? t : s[n] = pt(n, !1)
	};
	this.getTopRenderable = function (n) {
		return t.viewsIconVisible ? (v[n] || (v[n] = wt(n, !0)), v[n]) : null
	};
	this.getBottomRenderable = function (n) {
		return t.heartsIconVisible ? (y[n] || (y[n] = wt(n, !1)), y[n]) : null
	};
	this.animateRenderable = function (n, u) {
		if (r && n < r.length && r[n].Id && s && s[n] && i[n].Status === c) {
			var e = s[n].elem,
			o = r[n].ThumbnailUrl;
			return a[n] || (a[n] = new f.ThumbnailRotator(e, !0, new f.BasicImageSource(o), t.thumbnailAnimationFrameCount, t.thumbnailAnimationInterval, g, t.thumbnailAnimationPriority, t.thumbnailAnimationStoppedPriority, function () {
						tt++;
						tt >= t.thumbnailAnimationMaxLoops && a[n].stop()
					})),
			u ? (tt = 0, a[n].start()) : a[n].stop(),
			!0
		}
		return !1
	};
	this.getChipDataSource = function () {
		return ti
	};
	this.setSelectedItem = function (n) {
		var i,
		t;
		o = Math.max(0, n);
		for (t in l)
			l.hasOwnProperty(t) && (i = nt[t], i && g.setPriority(i, l[t], at(t)))
	};
	this.getLinkForIndex = function (n) {
		var i = this.getDataForIndex(n);
		return i == null ? null : t.getUrlForItem(i)
	};
	this.getTitleForIndex = function (n) {
		var t = this.getDataForIndex(n);
		return t == null ? null : t.Name
	};
	this.getIdForIndex = function (n) {
		return i && n < i.length && i[n] ? i[n].Id : null
	};
	this.getDataForIndex = function (n) {
		return r && n < r.length && r[n] ? r[n] : null
	};
	this.addDataUpdatedCallback = function (n) {
		p.push(n)
	};
	this.getAvailableItems = function () {
		for (var u = [], n, t = 0; t < i.length; ++t)
			n = i[t], n && n.Id && n.Status === c && u.push(r[t] || {
				Id: n.Id
			});
		return u
	};
	t.loadData && b(!0, ii, t.initLookAroundNumRows, t.initSelectedId == null ? e : function (n, i) {
		n != o && i.Id === t.initSelectedId && kt.setSelectedItem(n)
	}, !0, !0)
}, function () {
	var n = Microsoft.Photosynth.Controls;
	n.Slider = function (t, i, r) {
		function wi() {
			window.clearInterval(pt);
			ei(yi);
			pt = null;
			ui.focusKeyboardElement()
		}
		function bi() {
			window.clearInterval(wt);
			ei(pi);
			wt = null;
			ui.focusKeyboardElement()
		}
		function tr() {
			var n = o + k;
			k != 0 && n >= 0 && n < i.getLength() && (v = !0, s.setSelectedItem(n, !0), at = setTimeout(tr, u.keyboardTimeout))
		}
		function fi(n) {
			var t = k;
			lt.keyDown(n);
			k = lt.getKeydownDirection().x;
			n.keyCode === 13 && u.itemTapped({
				index: o,
				returnKey: !0
			});
			n.keyCode === 36 ? s.setSelectedItem(0, !0) : n.keyCode === 35 ? s.setSelectedItem(e.getLength(), !0) : n.keyCode === 33 ? (u.pageNavigationEnabled && s.previousPage(), u.pageUpCalled()) : n.keyCode === 34 && (u.pageNavigationEnabled && s.nextPage(), u.pageDownCalled());
			t === 0 && k !== 0 && (v = !0, s.setSelectedItem(o + k, !0), at = setTimeout(tr, u.keyboardInitialTimeout))
		}
		function ei(n) {
			lt.keyUp(n);
			k = lt.getKeydownDirection().x;
			k == 0 && at !== null && (clearTimeout(at), at = null)
		}
		function dr(n) {
			u.pointerDown();
			v = !0;
			var t = Math.round(f);
			gt(t);
			oi = !e.getLinkForIndex && Math.abs(f - o) < wr && Math.abs(y) < di;
			ki = f;
			kt = !0;
			ct = !0;
			ri.onGestureStart(n)
		}
		function gr(n, t, i, r, f, e, o) {
			var s = document.createElement("a");
			return s.href = n,
			s.style.display = "block",
			s.style.position = "absolute",
			s.style.left = t + "px",
			s.style.top = i + "px",
			s.style.width = r + "px",
			s.style.height = f + "px",
			s.tabIndex = -1,
			s.onclick = function () {
				u.itemLinkClicked(o)
			},
			s.onmousedown = function (n) {
				n.preventDefault()
			},
			s.title = e,
			s
		}
		function ir(n) {
			var r,
			a,
			f,
			o,
			i,
			c,
			v,
			y,
			l,
			t;
			if (e.getLinkForIndex && (!it || n)) {
				while (rt.length > 0)
					si(rt.pop());
				for (r = er(), a = parseInt(h.style.height, 10) / 2, t = r.left; t < r.right; t++)
					t < 0 || t >= e.getLength() || (f = e.getLinkForIndex(t), f != null) && (o = null, e.getTitleForIndex && (o = e.getTitleForIndex(t)), i = hi(t), c = i / 2, v = s.indexToPixel(t, u.discreteScrolling) - c, y = a - c, l = gr(f, v, y, i, i, o, t), rt.push(l), h.appendChild(l));
				it = !0
			}
		}
		function rr() {
			var t,
			n;
			if (it) {
				for (n = 0; n < rt.length; n++)
					t = rt[n], t.style.display = "none";
				it = !1
			}
		}
		function ur() {
			it && ir(!0)
		}
		function nu(n) {
			var t,
			i;
			v = !0;
			ct && (t = Math.sqrt(n.translationX * n.translationX + n.translationY * n.translationY), t > ar && (ct = !1));
			g(ki - n.translationX / u.itemDistance);
			i = Math.round(f);
			gt(i);
			ri.onGestureChange(n)
		}
		function fr(n, t, i) {
			return t > n.left && t < n.right && i > n.top && i < n.bottom
		}
		function tu(n, t) {
			var r = {},
			i = {},
			f;
			return (et && window.getComputedStyle(l).opacity === "1" || ot && window.getComputedStyle(a).opacity === "1") ? (f = (parseInt(h.style.height, 10) - u.pagingAffordanceHeight) / 2, r.left = parseInt(l.style.left, 10), r.right = r.left + u.pagingAffordanceWidth, i.right = st - parseInt(a.style.right, 10), i.left = i.right - u.pagingAffordanceWidth, i.top = r.top = parseInt(h.style.top, 10) + f, r.bottom = i.bottom = i.top + u.pagingAffordanceHeight, et && fr(r, n, t) || ot && fr(i, n, t)) : !1
		}
		function iu(n) {
			var i,
			t;
			v = !0;
			kt = !1;
			i = ri.onGestureEnd(n);
			y = -i.x / u.itemDistance;
			oi && ct && (t = u.requirePreciseItemTapped ? s.pixelToItem(n.layerX, n.layerY) : Math.round(s.pixelToIndex(n.layerX)), t == null || tu(n.layerX, n.layerY) || u.itemTapped({
					index: t,
					returnKey: !1
				}))
		}
		function ru(n) {
			v = !0;
			u.discreteChange();
			var t = o;
			n.direction > 0 ? t-- : t++;
			t = Math.max(0, t);
			t = Math.min(t, e.getLength() - 1);
			s.setSelectedItem(t, !0)
		}
		function er() {
			return {
				left: Math.floor(s.pixelToIndex(0) - 1),
				right: Math.ceil(s.pixelToIndex(st) + 1)
			}
		}
		function si(n) {
			n.parentElement && n.parentElement.removeChild(n)
		}
		function or(n, t, i) {
			var r,
			e,
			o,
			s;
			(r = n < f - 1 ? tt.Left : n > f + 1 ? tt.Right : tt.NearSelected, t.positionState !== r || i) && (r === tt.NearSelected ? (si(t.elem), c.appendChild(t.elem)) : (t.elem.parentElement !== nt && (si(t.elem), nt.appendChild(t.elem)), e = r === tt.Left ? (n + 1) * u.itemDistance - u.selectedItemDistance : (n - 1) * u.itemDistance + u.selectedItemDistance, o = u.offsetY, s = u.itemWidth / t.width, yt(t.elem, e, o, s)), t.positionState = r)
		}
		function uu(n) {
			for (var r = {}, i = vt, u = ut, f = ft, t = n.left; t < n.right; t++)
				t < 0 || t >= e.getLength() || (i[t] ? (r[t] = i[t], or(t, r[t], bt)) : (r[t] = e.getRenderable(t), or(t, r[t], bt), e.getTopRenderable && (ut[t] = e.getTopRenderable(t), ut[t] && c.appendChild(ut[t].elem)), e.getBottomRenderable && (ft[t] = e.getBottomRenderable(t), ft[t] && c.appendChild(ft[t].elem))));
			for (t in i)
				i.hasOwnProperty(t) && (r[t] || (i[t].positionState = null, i[t].elem.parentElement && i[t].elem.parentElement.removeChild(i[t].elem), u[t] && c.removeChild(u[t].elem), f[t] && c.removeChild(f[t].elem)));
			vt = r;
			bt = !1
		}
		function yt(n, t, i, r) {
			var u = "translate3d(" + t.toFixed(8) + "px, " + i.toFixed(8) + "px, 0px) scale(" + r.toFixed(8) + ")";
			n.style.transform = u;
			n.style.msTransform = u;
			n.style.webkitTransform = u;
			n.style.mozTransform = u
		}
		function hi(n, t) {
			var e = t ? Math.round(f) : f,
			i = Math.abs(n - e),
			r;
			return i < 1 ? (r = 1 - i, i * u.itemWidth + r * u.selectedItemWidth) : u.itemWidth
		}
		function fu(n) {
			var a = n ? Math.round(f) : f,
			t,
			h,
			c,
			l;
			yt(nt, u.selectedItemOffset - a * u.itemDistance, 0, 1);
			for (t in vt)
				if (vt.hasOwnProperty(t)) {
					var i = vt[t],
					r = s.indexToPixel(t, n),
					e = u.offsetY,
					o = hi(t);
					i.positionState === tt.NearSelected && (h = o / i.width, yt(i.elem, r, e, h));
					ut[t] && (c = ut[t], yt(c.elem, r, e - o / 2 - u.metadataOffsetY, ti));
					ft[t] && (l = ft[t], yt(l.elem, r, e + o / 2 + u.metadataOffsetY, ti))
				}
		}
		function sr() {
			var t = Date.now(),
			n,
			s,
			h;
			if (n = ii == null ? 16 : t - ii, n == 0 && console.warn("rendering twice in one ms"), u.discreteScrolling)
				g(hr(f));
			else if (!kt) {
				var r = Math.pow(yr, n),
				c = 1 - r,
				i = r * f + c * o;
				Math.abs(y) > di ? (y *= Math.pow(vr, n), g(f + y * n), s = y > 0 ? Math.ceil(f) : Math.floor(f), gt(s), (y > 0 && i > f || y < 0 && i < f || f < -gi || f > e.getLength() - 1 + gi) && (y = 0, g(i))) : v && Math.abs(f - o) > pr && g(i)
			}
			!kt && Math.abs(f - o) < br ? (h = t - nr, dt == o ? h > kr && ci(!0) : (dt = o, nr = t, ir())) : (dt != null && (dt = null, ci(!1)), ct || rr());
			ht && (uu(er()), fu(u.discreteScrolling), ht = !1);
			ii = t;
			requestAnimationFrame(sr)
		}
		function ci(n) {
			u.animateSelectedItem && (n ? (d !== null && d !== o && ci(!1), d === null && e.animateRenderable(o, !0) && (d = o)) : d !== null && e.animateRenderable(d, !1) && (d = null))
		}
		function eu() {
			requestAnimationFrame(sr)
		}
		function li() {
			var n = u.selectedItemWidth / 2;
			(h.style.height = u.selectedItemWidth + "px", h.style.top = u.offsetY - n + "px", u.pagingAffordanceVisible) && (l.style.left = u.pagingAffordanceMargin + "px", a.style.right = u.pagingAffordanceMargin + "px", et = cr(), ot = lr(), l.className = et ? u.pagingAffordancePreviousClassName : "", a.className = ot ? u.pagingAffordanceNextClassName : "", !et && pt && wi(), !ot && wt && bi())
		}
		function hr(n) {
			return n = Math.max(0, n),
			Math.min(n, e.getLength() - 1)
		}
		function gt(n) {
			n = hr(n);
			o != n && (o = n, li(), u.selectedItemChanged(n), ht = !0)
		}
		function ai(n) {
			var t = u.selectedItemOffset + u.selectedItemDistance / 2,
			i = n ? st : st - u.pagingAffordanceWidth - u.pagingAffordanceMargin;
			return 1 + Math.floor(Math.max(0, (i - t) / u.itemDistance))
		}
		function cr() {
			return o > 0
		}
		function lr() {
			return o + ai(!0) < i.getLength()
		}
		function g(n) {
			f !== n && (f = n, u.currentPositionChanged(f), ht = !0)
		}
		var p = function () {},
		s = this,
		ni = t,
		e = i,
		u = {
			itemWidth: 150,
			itemDistance: 200,
			selectedItemWidth: 300,
			selectedItemDistance: 400,
			selectedItemOffset: 500,
			offsetY: 200,
			metadataOffsetY: 21.5,
			keyboardInitialTimeout: 500,
			keyboardTimeout: 100,
			animateSelectedItem: !0,
			discreteScrolling: !1,
			requirePreciseItemTapped: !0,
			pageNavigationEnabled: !0,
			pageUpCalled: p,
			pageDownCalled: p,
			pagingAffordanceVisible: !0,
			pagingAffordanceContainerClassName: "psc-sq-slider-affordances",
			pagingAffordancePreviousClassName: "psc-default-sprite ps-sq-previous",
			pagingAffordanceNextClassName: "psc-default-sprite ps-sq-next",
			pagingAffordanceHeight: 51,
			pagingAffordanceWidth: 51,
			pagingAffordanceMargin: 20,
			pagingAffordanceOffsetY: 0,
			selectedItemChanged: p,
			itemTapped: p,
			itemLinkClicked: p,
			pointerDown: p,
			discreteChange: p,
			currentPositionChanged: p
		},
		w,
		c,
		nt,
		b,
		oi,
		it,
		rt;
		n.extend(u, r || {});
		w = document.createElement("div");
		w.style.position = "relative";
		w.style.overflow = "hidden";
		w.style.width = "100%";
		w.style.height = "100%";
		ni.appendChild(w);
		c = document.createElement("div");
		c.style.position = "absolute";
		c.style.overflow = "hidden";
		c.style.width = "100%";
		c.style.height = "100%";
		w.appendChild(c);
		nt = document.createElement("div");
		nt.style.position = "absolute";
		c.appendChild(nt);
		b = document.createElement("div");
		b.style.position = "absolute";
		b.style.overflow = "hidden";
		b.style.width = "100%";
		b.style.height = "100%";
		w.appendChild(b);
		var h = null,
		l = null,
		a = null,
		et = !1,
		ot = !1,
		vi = 500,
		pt = null,
		wt = null,
		yi = {
			keyCode: 37
		},
		pi = {
			keyCode: 39
		};
		h = document.createElement("div");
		h.className = u.pagingAffordanceContainerClassName;
		h.style.position = "absolute";
		h.style.left = 0;
		h.style.right = 0;
		b.appendChild(h);
		u.pagingAffordanceVisible && (l = document.createElement("b"), l.onmousedown = function (n) {
			n.button > 1 || (pt = window.setTimeout(function () {
						fi(yi)
					}, vi), s.previousPage(), n.stopPropagation())
		}, l.onmouseup = wi, h.appendChild(l), a = document.createElement("b"), a.onmousedown = function (n) {
			n.button > 1 || (wt = window.setTimeout(function () {
						fi(pi)
					}, vi), s.nextPage(), n.stopPropagation())
		}, a.onmouseup = bi, h.appendChild(a), a.style.position = l.style.position = "absolute", a.style.top = l.style.top = "50%", a.style.marginTop = l.style.marginTop = -u.pagingAffordanceHeight / 2 + "px", a.style.zIndex = l.style.zIndex = 1);
		var tt = {
			Left: {
				debug: "left"
			},
			NearSelected: {
				debug: "center"
			},
			Right: {
				debug: "right"
			}
		},
		st = ni.offsetWidth,
		ht = !0,
		bt = !1,
		f = 0,
		o = 0,
		v = !0,
		ti = 1,
		ki,
		kt = !1,
		y = 0,
		ct = !0,
		ar = 2,
		di = .5 / 1e3,
		vr = .995,
		gi = 5,
		yr = .997,
		pr = .01,
		wr = .1,
		ii = null,
		d = null,
		dt = null,
		nr = null,
		br = .01,
		kr = 10;
		eu();
		var lt = new n.KeyboardVelocity(1),
		k = lt.getKeydownDirection().x,
		at = null,
		ri = new n.GestureVelocity,
		ui = new n.GestureHelper(b, {
				gestureStart: dr,
				gestureChange: nu,
				gestureEnd: iu,
				discreteZoom: ru,
				keyDown: fi,
				keyUp: ei
			});
		ui.enable();
		e.addDataUpdatedCallback && (e.addDataUpdatedCallback(ur), e.addDataUpdatedCallback(li));
		oi = !0;
		it = !1;
		rt = [];
		this.pixelToItem = function (n, t) {
			var i = Math.round(s.pixelToIndex(n));
			if (i < 0 || i >= e.getLength())
				return null;
			var o = hi(i),
			h = o / 2,
			c = s.indexToPixel(i),
			l = u.offsetY,
			r = n - c,
			f = t - l,
			a = Math.sqrt(r * r + f * f);
			return a < h ? i : null
		};
		this.pixelToIndex = function (n) {
			var i = u.selectedItemOffset - u.selectedItemDistance,
			t = u.selectedItemOffset + u.selectedItemDistance;
			return n < i ? f - 1 + (n - i) / u.itemDistance : n < t ? f + 1 + (n - t) / u.selectedItemDistance : f + 1 + (n - t) / u.itemDistance
		};
		this.indexToPixel = function (n, t) {
			var e = u.selectedItemOffset - u.selectedItemDistance,
			r = u.selectedItemOffset + u.selectedItemDistance,
			i = n - f;
			return t && (i = Math.round(i)),
			i < -1 ? e - (-1 - i) * u.itemDistance : i < 1 ? r - (1 - i) * u.selectedItemDistance : r + (i - 1) * u.itemDistance
		};
		var vt = {},
		ut = {},
		ft = {};
		this.getSelectedItem = function () {
			return o
		};
		this.setSelectedItem = function (n, t) {
			gt(n);
			t ? (v = !0, rr()) : g(o)
		};
		this.nextPage = function () {
			lr() && s.setSelectedItem(o + ai(), !0)
		};
		this.previousPage = function () {
			cr() && s.setSelectedItem(o - ai(), !0)
		};
		this.setCurrentPosition = function (n, t) {
			v = t;
			g(n)
		};
		this.setSizes = function (n, t, i, r, f, e, o) {
			u.itemWidth = n;
			u.itemDistance = t;
			u.selectedItemWidth = i;
			u.selectedItemDistance = r;
			u.selectedItemOffset = f;
			u.offsetY = e;
			u.metadataOffsetY = o;
			st = ni.offsetWidth;
			bt = !0;
			ht = !0;
			ur();
			li()
		};
		this.setMetadataScale = function (n) {
			ti = n
		}
	}
}
()
