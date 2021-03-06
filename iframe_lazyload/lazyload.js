var _extends = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var s in n) Object.prototype.hasOwnProperty.call(n, s) && (e[s] = n[s])
  }
  return e
}, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
  return typeof e
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
!function (e, t) {
  "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.LazyLoad = t()
}(this, function () {
  "use strict";
  var e = {
    elements_selector: "img",
    container: document,
    threshold: 300,
    data_src: "src",
    data_srcset: "srcset",
    data_sizes: "sizes",
    class_loading: "loading",
    class_loaded: "loaded",
    class_error: "error",
    callback_load: null,
    callback_error: null,
    callback_set: null
  }, t = function (e, t) {
    return e.getAttribute("data-" + t)
  }, n = function (e, t, n) {
    return e.setAttribute("data-" + t, n)
  }, s = function (e) {
    return e.filter(function (e) {
      return !t(e, "was-processed")
    })
  }, r = function (e, t) {
    var n = new e(t), s = new CustomEvent("LazyLoad::Initialized", {detail: {instance: n}});
    window.dispatchEvent(s)
  }, o = function (e, n) {
    var s = n.data_srcset, r = n.data_sizes, o = e.parentElement;
    if ("PICTURE" === o.tagName) for (var a, i = 0; a = o.children[i]; i += 1) if ("SOURCE" === a.tagName) {
      var c = t(a, s);
      c && a.setAttribute("srcset", c);
      var l = t(a, r);
      l && a.setAttribute("sizes", l)
    }
  }, a = function (e, n) {
    var s = n.data_src, r = n.data_srcset, a = n.data_sizes, i = e.tagName, c = t(e, s);
    if ("IMG" === i) {
      o(e, n);
      var l = t(e, r);
      l && e.setAttribute("srcset", l);
      var u = t(e, a);
      return u && e.setAttribute("sizes", u), void(c && e.setAttribute("src", c))
    }
    "IFRAME" !== i ? c && (e.style.backgroundImage = 'url("' + c + '")') : c && e.setAttribute("src", c)
  }, i = "classList" in document.createElement("p"), c = function (e, t) {
    i ? e.classList.add(t) : e.className += (e.className ? " " : "") + t
  }, l = function (e, t) {
    i ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
  }, u = function (e, t) {
    e && e(t)
  }, d = function (e, t, n) {
    e.removeEventListener("load", t), e.removeEventListener("error", n)
  }, f = function (e, t) {
    var n = function n(r) {
      _(r, !0, t), d(e, n, s)
    }, s = function s(r) {
      _(r, !1, t), d(e, n, s)
    };
    e.addEventListener("load", n), e.addEventListener("error", s)
  }, _ = function (e, t, n) {
    var s = e.target;
    l(s, n.class_loading), c(s, t ? n.class_loaded : n.class_error), u(t ? n.callback_load : n.callback_error, s)
  }, v = function (e, t) {
    ["IMG", "IFRAME"].indexOf(e.tagName) > -1 && (f(e, t), c(e, t.class_loading)), a(e, t), n(e, "was-processed", !0), u(t.callback_set, e)
  }, m = function (t, n) {
    this._settings = _extends({}, e, t), this._setObserver(), this.update(n)
  };
  m.prototype = {
    _setObserver: function () {
      var e = this;
      if ("IntersectionObserver" in window) {
        var t = this._settings;
        this._observer = new IntersectionObserver(function (n) {
          n.forEach(function (n) {
            if (n.intersectionRatio > 0) {
              var s = n.target;
              v(s, t), e._observer.unobserve(s)
            }
          }), e._elements = s(e._elements)
        }, {root: t.container === document ? null : t.container, rootMargin: t.threshold + "px"})
      }
    }, update: function (e) {
      var t = this, n = this._settings, r = e || n.container.querySelectorAll(n.elements_selector);
      this._elements = s(Array.prototype.slice.call(r)), this._observer ? this._elements.forEach(function (e) {
        t._observer.observe(e)
      }) : (this._elements.forEach(function (e) {
        v(e, n)
      }), this._elements = s(this._elements))
    }, destroy: function () {
      var e = this;
      this._observer && (s(this._elements).forEach(function (t) {
        e._observer.unobserve(t)
      }), this._observer = null), this._elements = null, this._settings = null
    }
  };
  var b = window.lazyLoadOptions;
  return b && function (e, t) {
    if (t.length) for (var n, s = 0; n = t[s]; s += 1) r(e, n); else r(e, t)
  }(m, b), m
});


var myLazyLoad = new LazyLoad({
  elements_selector: "[data-lazyloaded]"
});

//Debug code for console log
/*(function () {
  function logElementEvent(eventName, element) {
    console.log(Date.now(), eventName, element.getAttribute('data-src'));
  }
  ll = new LazyLoad({
    elements_selector: '[data-lazyloaded]',
    callback_enter: function (element) {
      logElementEvent("ENTERED", element);
    },
    callback_load: function (element) {
      logElementEvent("LOADED", element);
    },
    callback_set: function (element) {
      logElementEvent("SET", element);
    },
    callback_error: function (element) {
      logElementEvent("ERROR", element);
      //element.src = "https://placeholdit.imgix.net/~text?txtsize=21&txt=Fallback%20image&w=220&h=280";
    }
  });
}());*/




