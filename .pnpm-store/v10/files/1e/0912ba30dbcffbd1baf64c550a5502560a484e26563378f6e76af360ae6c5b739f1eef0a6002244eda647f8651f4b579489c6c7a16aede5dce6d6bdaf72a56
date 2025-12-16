var _analytics = (function (exports) {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function n$2 (t, e, l, n, r) {
    for (e = e.split ? e.split(".") : e, n = 0; n < e.length; n++) t = t ? t[e[n]] : r;

    return t === r ? l : t;
  }

  var e = "undefined",
      o$1 = "object",
      b$3 = "any",
      m$1 = "*",
      j$1 = "__",
      F$2 = "undefined" != typeof process ? process : {};
      F$2.env && F$2.env.NODE_ENV || "";
      var $$1 = "undefined" != typeof document;
      null != F$2.versions && null != F$2.versions.node;
      "undefined" != typeof Deno && void 0 !== Deno.core;
      $$1 && "nodejs" === window.name || "undefined" != typeof navigator && void 0 !== navigator.userAgent && (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom"));

  function M$1(n, t) {
    return t.charAt(0)[n]() + t.slice(1);
  }

  var U$1 = M$1.bind(null, "toUpperCase"),
      H$1 = M$1.bind(null, "toLowerCase");

  function J$2(n) {
    return Y$1(n) ? U$1("null") : "object" == typeof n ? yn(n) : Object.prototype.toString.call(n).slice(8, -1);
  }

  function R$1(n, t) {
    void 0 === t && (t = !0);
    var e = J$2(n);
    return t ? H$1(e) : e;
  }

  function V$1(n, t) {
    return typeof t === n;
  }

  var W$1 = V$1.bind(null, "function"),
      q$1 = V$1.bind(null, "string"),
      I$2 = V$1.bind(null, "undefined");

  var Q$1 = V$1.bind(null, "boolean");
      V$1.bind(null, "symbol");

  function Y$1(n) {
    return null === n;
  }

  function nn(n) {
    return "number" === R$1(n) && !isNaN(n);
  }

  function rn(n) {
    return "array" === R$1(n);
  }

  function on(n) {
    if (!un(n)) return !1;

    for (var t = n; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);

    return Object.getPrototypeOf(n) === t;
  }

  function un(n) {
    return n && ("object" == typeof n || null !== n);
  }

  function yn(n) {
    return W$1(n.constructor) ? n.constructor.name : null;
  }

  function hn(n) {
    return n instanceof Error || q$1(n.message) && n.constructor && nn(n.constructor.stackTraceLimit);
  }

  function On(n, t) {
    if ("object" != typeof t || Y$1(t)) return !1;
    if (t instanceof n) return !0;
    var e = R$1(new n(""));
    if (hn(t)) for (; t;) {
      if (R$1(t) === e) return !0;
      t = Object.getPrototypeOf(t);
    }
    return !1;
  }

  On.bind(null, TypeError);
      On.bind(null, SyntaxError);

  function $n(n, t) {
    var e = n instanceof Element || n instanceof HTMLDocument;
    return e && t ? Tn(n, t) : e;
  }

  function Tn(n, t) {
    return void 0 === t && (t = ""), n && n.nodeName === t.toUpperCase();
  }

  function _n(n) {
    var t = [].slice.call(arguments, 1);
    return function () {
      return n.apply(void 0, [].slice.call(arguments).concat(t));
    };
  }

  _n($n, "form");
      _n($n, "button");
      _n($n, "input");
      _n($n, "select");

  function n$1(e) {
    try {
      return decodeURIComponent(e.replace(/\+/g, " "));
    } catch (e) {
      return null;
    }
  }

  function s(r) {
    return function (e) {
      for (var r, t = Object.create(null), o = /([^&=]+)=?([^&]*)/g; r = o.exec(e);) {
        var a = n$1(r[1]),
            i = n$1(r[2]);
        "[]" === a.substring(a.length - 2) ? (t[a = a.substring(0, a.length - 2)] || (t[a] = [])).push(i) : t[a] = "" === i || i;
      }

      for (var u in t) {
        var c = u.split("[");
        c.length > 1 && (m(t, c.map(function (e) {
          return e.replace(/[?[\]\\ ]/g, "");
        }), t[u]), delete t[u]);
      }

      return t;
    }(function (r) {
      if (r) {
        var t = r.match(/\?(.*)/);
        return t && t[1] ? t[1].split("#")[0] : "";
      }

      return $$1 && window.location.search.substring(1);
    }(r));
  }

  function m(e, r, t) {
    for (var n = r.length - 1, o = 0; o < n; ++o) {
      var a = r[o];
      if ("__proto__" === a || "constructor" === a) break;
      a in e || (e[a] = {}), e = e[a];
    }

    e[r[n]] = t;
  }

  function y$1() {
    for (var e = "", r = 0, t = 4294967295 * Math.random() | 0; r++ < 36;) {
      var n = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"[r - 1],
          o = 15 & t;
      e += "-" == n || "4" == n ? n : ("x" == n ? o : 3 & o | 8).toString(16), t = r % 8 == 0 ? 4294967295 * Math.random() | 0 : t >> 4;
    }

    return e;
  }

  var l = "global",
      o = j$1 + "global" + j$1,
      n = typeof self === o$1 && self.self === self && self || typeof global === o$1 && global.global === global && global || void 0;

  function a$2(t) {
    return n[o][t];
  }

  function f(t, e) {
    return n[o][t] = e;
  }

  function i$2(t) {
    delete n[o][t];
  }

  function u$1(t, e, r) {
    var l;

    try {
      if (b$2(t)) {
        var o = window[t];
        l = o[e].bind(o);
      }
    } catch (t) {}

    return l || r;
  }

  n[o] || (n[o] = {});
  var c$1 = {};

  function b$2(t) {
    if (typeof c$1[t] !== e) return c$1[t];

    try {
      var e$1 = window[t];
      e$1.setItem(e, e), e$1.removeItem(e);
    } catch (e) {
      return c$1[t] = !1;
    }

    return c$1[t] = !0;
  }

  function g$1() {
    return g$1 = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }

      return e;
    }, g$1.apply(this, arguments);
  }

  var h$1 = "function",
      v = "undefined",
      y = "@@redux/" + Math.random().toString(36),
      b$1 = /* #__PURE__ */function () {
    return typeof Symbol === h$1 && Symbol.observable || "@@observable";
  }(),
      I$1 = " != " + h$1;

  function w(e, t, n) {
    var r;

    if (typeof t === h$1 && typeof n === v && (n = t, t = void 0), typeof n !== v) {
      if (typeof n !== h$1) throw new Error("enhancer" + I$1);
      return n(w)(e, t);
    }

    if (typeof e !== h$1) throw new Error("reducer" + I$1);
    var i = e,
        a = t,
        o = [],
        u = o,
        s = !1;

    function l() {
      u === o && (u = o.slice());
    }

    function f() {
      return a;
    }

    function d(e) {
      if (typeof e !== h$1) throw new Error("Listener" + I$1);
      var t = !0;
      return l(), u.push(e), function () {
        if (t) {
          t = !1, l();
          var n = u.indexOf(e);
          u.splice(n, 1);
        }
      };
    }

    function p(e) {
      if (!on(e)) throw new Error("Act != obj");
      if (typeof e.type === v) throw new Error("ActType " + v);
      if (s) throw new Error("Dispatch in reducer");

      try {
        s = !0, a = i(a, e);
      } finally {
        s = !1;
      }

      for (var t = o = u, n = 0; n < t.length; n++) (0, t[n])();

      return e;
    }

    return p({
      type: "@@redux/INIT"
    }), (r = {
      dispatch: p,
      subscribe: d,
      getState: f,
      replaceReducer: function (e) {
        if (typeof e !== h$1) throw new Error("next reducer" + I$1);
        i = e, p({
          type: "@@redux/INIT"
        });
      }
    })[b$1] = function () {
      var e,
          t = d;
      return (e = {
        subscribe: function (e) {
          if ("object" != typeof e) throw new TypeError("Observer != obj");

          function n() {
            e.next && e.next(f());
          }

          return n(), {
            unsubscribe: t(n)
          };
        }
      })[b$1] = function () {
        return this;
      }, e;
    }, r;
  }

  function E$1(e, t) {
    var n = t && t.type;
    return "action " + (n && n.toString() || "?") + "reducer " + e + " returns " + v;
  }

  function P() {
    var e = [].slice.call(arguments);
    return 0 === e.length ? function (e) {
      return e;
    } : 1 === e.length ? e[0] : e.reduce(function (e, t) {
      return function () {
        return e(t.apply(void 0, [].slice.call(arguments)));
      };
    });
  }

  function S() {
    var e = arguments;
    return function (t) {
      return function (n, r, i) {
        var a,
            o = t(n, r, i),
            u = o.dispatch,
            c = {
          getState: o.getState,
          dispatch: function (e) {
            return u(e);
          }
        };
        return a = [].slice.call(e).map(function (e) {
          return e(c);
        }), g$1({}, o, {
          dispatch: u = P.apply(void 0, a)(o.dispatch)
        });
      };
    };
  }

  var N$1 = j$1 + "anon_id",
      A$1 = j$1 + "user_id",
      _ = j$1 + "user_traits",
      O$1 = {
    __proto__: null,
    ANON_ID: N$1,
    USER_ID: A$1,
    USER_TRAITS: _
  },
      j = "userId",
      k$1 = "anonymousId",
      x$1 = ["bootstrap", "params", "campaign", "initializeStart", "initialize", "initializeEnd", "ready", "resetStart", "reset", "resetEnd", "pageStart", "page", "pageEnd", "pageAborted", "trackStart", "track", "trackEnd", "trackAborted", "identifyStart", "identify", "identifyEnd", "identifyAborted", "userIdChanged", "registerPlugins", "enablePlugin", "disablePlugin", "online", "offline", "setItemStart", "setItem", "setItemEnd", "setItemAborted", "removeItemStart", "removeItem", "removeItemEnd", "removeItemAborted"],
      T = ["name", "EVENTS", "config", "loaded"],
      z = x$1.reduce(function (e, t) {
    return e[t] = t, e;
  }, {
    registerPluginType: function (e) {
      return "registerPlugin:" + e;
    },
    pluginReadyType: function (e) {
      return "ready:" + e;
    }
  }),
      M = /^utm_/,
      q = /^an_prop_/,
      V = /^an_trait_/;

  function C$1(e) {
    var t = e.storage.setItem;
    return function (n) {
      return function (r) {
        return function (i) {
          if (i.type === z.bootstrap) {
            var a = i.params,
                o = i.user,
                u = i.persistedUser,
                c = i.initialUser,
                s = u.userId === o.userId;
            u.anonymousId !== o.anonymousId && t(N$1, o.anonymousId), s || t(A$1, o.userId), c.traits && t(_, g$1({}, s && u.traits ? u.traits : {}, c.traits));
            var l = Object.keys(i.params);

            if (l.length) {
              var f = a.an_uid,
                  d = a.an_event,
                  p = l.reduce(function (e, t) {
                if (t.match(M) || t.match(/^(d|g)clid/)) {
                  var n = t.replace(M, "");
                  e.campaign["campaign" === n ? "name" : n] = a[t];
                }

                return t.match(q) && (e.props[t.replace(q, "")] = a[t]), t.match(V) && (e.traits[t.replace(V, "")] = a[t]), e;
              }, {
                campaign: {},
                props: {},
                traits: {}
              });
              n.dispatch(g$1({
                type: z.params,
                raw: a
              }, p, f ? {
                userId: f
              } : {})), f && setTimeout(function () {
                return e.identify(f, p.traits);
              }, 0), d && setTimeout(function () {
                return e.track(d, p.props);
              }, 0), Object.keys(p.campaign).length && n.dispatch({
                type: z.campaign,
                campaign: p.campaign
              });
            }
          }

          return r(i);
        };
      };
    };
  }

  function U(e) {
    return function (t, n) {
      if (void 0 === t && (t = {}), void 0 === n && (n = {}), n.type === z.setItemEnd) {
        if (n.key === N$1) return g$1({}, t, {
          anonymousId: n.value
        });
        if (n.key === A$1) return g$1({}, t, {
          userId: n.value
        });
      }

      switch (n.type) {
        case z.identify:
          return Object.assign({}, t, {
            userId: n.userId,
            traits: g$1({}, t.traits, n.traits)
          });

        case z.reset:
          return [A$1, N$1, _].forEach(function (t) {
            e.removeItem(t);
          }), Object.assign({}, t, {
            userId: null,
            anonymousId: null,
            traits: {}
          });

        default:
          return t;
      }
    };
  }

  function R(e) {
    return {
      userId: e.getItem(A$1),
      anonymousId: e.getItem(N$1),
      traits: e.getItem(_)
    };
  }

  var $ = function (e) {
    return j$1 + "TEMP" + j$1 + e;
  };

  function D(t) {
    var n = t.storage,
        r = n.setItem,
        a = n.removeItem,
        o = n.getItem;
    return function (t) {
      return function (n) {
        return function (u) {
          var c = u.userId,
              s = u.traits,
              l = u.options;

          if (u.type === z.reset && ([A$1, _, N$1].forEach(function (e) {
            a(e);
          }), [j, k$1, "traits"].forEach(function (e) {
            i$2($(e));
          })), u.type === z.identify) {
            o(N$1) || r(N$1, y$1());
            var f = o(A$1),
                d = o(_) || {};
            f && f !== c && t.dispatch({
              type: z.userIdChanged,
              old: {
                userId: f,
                traits: d
              },
              new: {
                userId: c,
                traits: s
              },
              options: l
            }), c && r(A$1, c), s && r(_, g$1({}, d, s));
          }

          return n(u);
        };
      };
    };
  }

  var B = {};

  function L$1(e, t) {
    B[e] && W$1(B[e]) && (B[e](t), delete B[e]);
  }

  function J$1(e, t, n) {
    return new Promise(function (r, i) {
      return t() ? r(e) : n < 1 ? i(g$1({}, e, {
        queue: !0
      })) : new Promise(function (e) {
        return setTimeout(e, 10);
      }).then(function (a) {
        return J$1(e, t, n - 10).then(r, i);
      });
    });
  }

  var X = function (e) {
    var t = e.data,
        n = e.action,
        r = e.instance,
        i = e.state,
        a = e.allPlugins,
        o = e.allMatches,
        u = e.store,
        s = e.EVENTS;

    try {
      var f = i.plugins,
          d = i.context,
          p = n.type,
          m = p.match(H),
          h = t.exact.map(function (e) {
        return e.pluginName;
      });
      m && (h = o.during.map(function (e) {
        return e.pluginName;
      }));

      var v = function (e, t) {
        return function (n, r, i) {
          var a = r.config,
              o = r.name,
              u = o + "." + n.type;
          i && (u = i.event);
          var c = n.type.match(H) ? function (e, t, n, r, i) {
            return function (a, o) {
              var u = r ? r.name : e,
                  c = o && te(o) ? o : n;
              if (r && (!(c = o && te(o) ? o : [e]).includes(e) || 1 !== c.length)) throw new Error("Method " + t + " can only abort " + e + " plugin. " + JSON.stringify(c) + " input valid");
              return g$1({}, i, {
                abort: {
                  reason: a,
                  plugins: c,
                  caller: t,
                  _: u
                }
              });
            };
          }(o, u, t, i, n) : function (e, t) {
            return function () {
              throw new Error(e.type + " action not cancellable. Remove abort in " + t);
            };
          }(n, u);
          return {
            payload: ie(n),
            instance: e,
            config: a || {},
            abort: c
          };
        };
      }(r, h),
          y = t.exact.reduce(function (e, t) {
        var n = t.pluginName,
            r = t.methodName,
            i = !1;
        return r.match(/^initialize/) || r.match(/^reset/) || (i = !f[n].loaded), d.offline && r.match(/^(page|track|identify)/) && (i = !0), e["" + n] = i, e;
      }, {});

      return Promise.resolve(t.exact.reduce(function (e, i, o) {
        try {
          var u = i.pluginName;
          return Promise.resolve(e).then(function (e) {
            function i() {
              return Promise.resolve(e);
            }

            var o = function () {
              if (t.namespaced && t.namespaced[u]) return Promise.resolve(t.namespaced[u].reduce(function (e, t, n) {
                try {
                  return Promise.resolve(e).then(function (e) {
                    return t.method && W$1(t.method) ? (function (e, t) {
                      var n = re(e);

                      if (n && n.name === t) {
                        var r = re(n.method);
                        throw new Error([t + " plugin is calling method " + e, "Plugins cant call self", "Use " + n.method + " " + (r ? "or " + r.method : "") + " in " + t + " plugin insteadof " + e].join("\n"));
                      }
                    }(t.methodName, t.pluginName), Promise.resolve(t.method({
                      payload: e,
                      instance: r,
                      abort: (n = e, i = u, o = t.pluginName, function (e, t) {
                        return g$1({}, n, {
                          abort: {
                            reason: e,
                            plugins: t || [i],
                            caller: p,
                            from: o || i
                          }
                        });
                      }),
                      config: K(t.pluginName, f, a),
                      plugins: f
                    })).then(function (t) {
                      var n = on(t) ? t : {};
                      return Promise.resolve(g$1({}, e, n));
                    })) : e;
                    var n, i, o;
                  });
                } catch (e) {
                  return Promise.reject(e);
                }
              }, Promise.resolve(n))).then(function (t) {
                e[u] = t;
              });
              e[u] = n;
            }();

            return o && o.then ? o.then(i) : i();
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }, Promise.resolve({}))).then(function (e) {
        return Promise.resolve(t.exact.reduce(function (n, i, o) {
          try {
            var s = t.exact.length === o + 1,
                l = i.pluginName,
                d = a[l];
            return Promise.resolve(n).then(function (t) {
              var n = e[l] ? e[l] : {};
              if (m && (n = t), Z(n, l)) return G$1({
                data: n,
                method: p,
                instance: r,
                pluginName: l,
                store: u
              }), Promise.resolve(t);
              if (Z(t, l)) return s && G$1({
                data: t,
                method: p,
                instance: r,
                store: u
              }), Promise.resolve(t);
              if (y.hasOwnProperty(l) && !0 === y[l]) return u.dispatch({
                type: "queue",
                plugin: l,
                payload: n,
                _: {
                  called: "queue",
                  from: "queueMechanism"
                }
              }), Promise.resolve(t);
              var i = v(e[l], a[l]);
              return Promise.resolve(d[p]({
                abort: i.abort,
                payload: n,
                instance: r,
                config: K(l, f, a),
                plugins: f
              })).then(function (i) {
                var a = on(i) ? i : {},
                    o = g$1({}, t, a),
                    s = e[l];
                if (Z(s, l)) G$1({
                  data: s,
                  method: p,
                  instance: r,
                  pluginName: l,
                  store: u
                });else {
                  var f = p + ":" + l;
                  (f.match(/:/g) || []).length < 2 && !p.match(W) && !p.match(F$1) && r.dispatch(g$1({}, m ? o : n, {
                    type: f,
                    _: {
                      called: f,
                      from: "submethod"
                    }
                  }));
                }
                return Promise.resolve(o);
              });
            });
          } catch (e) {
            return Promise.reject(e);
          }
        }, Promise.resolve(n))).then(function (e) {
          if (!(p.match(H) || p.match(/^registerPlugin/) || p.match(F$1) || p.match(W) || p.match(/^params/) || p.match(/^userIdChanged/))) {
            if (s.plugins.includes(p), e._ && e._.originalAction === p) return e;
            var n = g$1({}, e, {
              _: {
                originalAction: e.type,
                called: e.type,
                from: "engineEnd"
              }
            });
            ee(e, t.exact.length) && !p.match(/End$/) && (n = g$1({}, n, {
              type: e.type + "Aborted"
            })), u.dispatch(n);
          }

          return e;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  },
      H = /Start$/,
      W = /^bootstrap/,
      F$1 = /^ready/;

  function G$1(e) {
    var t = e.pluginName,
        n = e.method + "Aborted" + (t ? ":" + t : "");
    e.store.dispatch(g$1({}, e.data, {
      type: n,
      _: {
        called: n,
        from: "abort"
      }
    }));
  }

  function K(e, t, n) {
    var r = t[e] || n[e];
    return r && r.config ? r.config : {};
  }

  function Q(e, t) {
    return t.reduce(function (t, n) {
      return n[e] ? t.concat({
        methodName: e,
        pluginName: n.name,
        method: n[e]
      }) : t;
    }, []);
  }

  function Y(e, t) {
    var n = e.replace(H, ""),
        r = t ? ":" + t : "";
    return ["" + e + r, "" + n + r, n + "End" + r];
  }

  function Z(e, t) {
    var n = e.abort;
    return !!n && (!0 === n || ne(n, t) || n && ne(n.plugins, t));
  }

  function ee(e, t) {
    var n = e.abort;
    if (!n) return !1;
    if (!0 === n || q$1(n)) return !0;
    var r = n.plugins;
    return te(n) && n.length === t || te(r) && r.length === t;
  }

  function te(e) {
    return Array.isArray(e);
  }

  function ne(e, t) {
    return !(!e || !te(e)) && e.includes(t);
  }

  function re(e) {
    var t = e.match(/(.*):(.*)/);
    return !!t && {
      method: t[1],
      name: t[2]
    };
  }

  function ie(e) {
    return Object.keys(e).reduce(function (t, n) {
      return "type" === n || (t[n] = on(e[n]) ? Object.assign({}, e[n]) : e[n]), t;
    }, {});
  }

  function ae(e, t, n) {
    var r = {};
    return function (i) {
      return function (a) {
        return function (o) {
          try {
            var u,
                c = function (e) {
              return u ? e : a(p);
            },
                s = o.type,
                d = o.plugins,
                p = o;

            if (o.abort) return Promise.resolve(a(o));

            if (s === z.enablePlugin && i.dispatch({
              type: z.initializeStart,
              plugins: d,
              disabled: [],
              fromEnable: !0,
              meta: o.meta
            }), s === z.disablePlugin && setTimeout(function () {
              return L$1(o.meta.rid, {
                payload: o
              });
            }, 0), s === z.initializeEnd) {
              var m = t(),
                  h = Object.keys(m),
                  v = h.filter(function (e) {
                return d.includes(e);
              }).map(function (e) {
                return m[e];
              }),
                  y = [],
                  b = [],
                  I = o.disabled,
                  w = v.map(function (e) {
                var t = e.loaded,
                    n = e.name,
                    a = e.config;
                return J$1(e, function () {
                  return t({
                    config: a
                  });
                }, 1e4).then(function (t) {
                  return r[n] || (i.dispatch({
                    type: z.pluginReadyType(n),
                    name: n,
                    events: Object.keys(e).filter(function (e) {
                      return !T.includes(e);
                    })
                  }), r[n] = !0), y = y.concat(n), e;
                }).catch(function (e) {
                  if (e instanceof Error) throw new Error(e);
                  return b = b.concat(e.name), e;
                });
              });
              Promise.all(w).then(function (e) {
                var t = {
                  plugins: y,
                  failed: b,
                  disabled: I
                };
                setTimeout(function () {
                  h.length === w.length + I.length && i.dispatch(g$1({}, {
                    type: z.ready
                  }, t));
                }, 0);
              });
            }

            var E = function () {
              if (s !== z.bootstrap) return /^ready:([^:]*)$/.test(s) && setTimeout(function () {
                return function (e, t, n) {
                  var r = t(),
                      i = e.getState(),
                      a = i.plugins,
                      o = i.queue,
                      u = i.user;

                  if (!i.context.offline && o && o.actions && o.actions.length) {
                    var c = o.actions.reduce(function (e, t, n) {
                      return a[t.plugin].loaded ? (e.process.push(t), e.processIndex.push(n)) : (e.requeue.push(t), e.requeueIndex.push(n)), e;
                    }, {
                      processIndex: [],
                      process: [],
                      requeue: [],
                      requeueIndex: []
                    });

                    if (c.processIndex && c.processIndex.length) {
                      c.processIndex.forEach(function (t) {
                        var i = o.actions[t],
                            c = i.plugin,
                            s = i.payload.type,
                            f = r[c][s];

                        if (f && W$1(f)) {
                          var d = function (e, t) {
                            return void 0 === e && (e = {}), void 0 === t && (t = {}), [j, k$1].reduce(function (n, r) {
                              return e.hasOwnProperty(r) && t[r] && t[r] !== e[r] && (n[r] = t[r]), n;
                            }, e);
                          }(i.payload, u);

                          f({
                            payload: d,
                            config: a[c].config,
                            instance: n
                          });
                          var p = s + ":" + c;
                          e.dispatch(g$1({}, d, {
                            type: p,
                            _: {
                              called: p,
                              from: "queueDrain"
                            }
                          }));
                        }
                      });
                      var s = o.actions.filter(function (e, t) {
                        return !~c.processIndex.indexOf(t);
                      });
                      o.actions = s;
                    }
                  }
                }(i, t, e);
              }, 0), Promise.resolve(function (e, t, n, r, i) {
                try {
                  var a = W$1(t) ? t() : t,
                      o = e.type,
                      u = o.replace(H, "");
                  if (e._ && e._.called) return Promise.resolve(e);
                  var c = n.getState(),
                      s = (m = a, void 0 === (h = c.plugins) && (h = {}), void 0 === (v = e.options) && (v = {}), Object.keys(m).filter(function (e) {
                    var t = v.plugins || {};
                    return Q$1(t[e]) ? t[e] : !1 !== t.all && (!h[e] || !1 !== h[e].enabled);
                  }).map(function (e) {
                    return m[e];
                  }));
                  o === z.initializeStart && e.fromEnable && (s = Object.keys(c.plugins).filter(function (t) {
                    var n = c.plugins[t];
                    return e.plugins.includes(t) && !n.initialized;
                  }).map(function (e) {
                    return a[e];
                  }));

                  var d = s.map(function (e) {
                    return e.name;
                  }),
                      p = function (e, t, n) {
                    var r = Y(e).map(function (e) {
                      return Q(e, t);
                    });
                    return t.reduce(function (n, r) {
                      var i = r.name,
                          a = Y(e, i).map(function (e) {
                        return Q(e, t);
                      }),
                          o = a[0],
                          u = a[1],
                          c = a[2];
                      return o.length && (n.beforeNS[i] = o), u.length && (n.duringNS[i] = u), c.length && (n.afterNS[i] = c), n;
                    }, {
                      before: r[0],
                      beforeNS: {},
                      during: r[1],
                      duringNS: {},
                      after: r[2],
                      afterNS: {}
                    });
                  }(o, s);

                  return Promise.resolve(X({
                    action: e,
                    data: {
                      exact: p.before,
                      namespaced: p.beforeNS
                    },
                    state: c,
                    allPlugins: a,
                    allMatches: p,
                    instance: n,
                    store: r,
                    EVENTS: i
                  })).then(function (e) {
                    function t() {
                      var t = function () {
                        if (o.match(H)) return Promise.resolve(X({
                          action: g$1({}, s, {
                            type: u + "End"
                          }),
                          data: {
                            exact: p.after,
                            namespaced: p.afterNS
                          },
                          state: c,
                          allPlugins: a,
                          allMatches: p,
                          instance: n,
                          store: r,
                          EVENTS: i
                        })).then(function (e) {
                          e.meta && e.meta.hasCallback && L$1(e.meta.rid, {
                            payload: e
                          });
                        });
                      }();

                      return t && t.then ? t.then(function () {
                        return e;
                      }) : e;
                    }

                    if (ee(e, d.length)) return e;

                    var s,
                        l = function () {
                      if (o !== u) return Promise.resolve(X({
                        action: g$1({}, e, {
                          type: u
                        }),
                        data: {
                          exact: p.during,
                          namespaced: p.duringNS
                        },
                        state: c,
                        allPlugins: a,
                        allMatches: p,
                        instance: n,
                        store: r,
                        EVENTS: i
                      })).then(function (e) {
                        s = e;
                      });
                      s = e;
                    }();

                    return l && l.then ? l.then(t) : t();
                  });
                } catch (e) {
                  return Promise.reject(e);
                }

                var m, h, v;
              }(o, t, e, i, n)).then(function (e) {
                return u = 1, a(e);
              });
            }();

            return Promise.resolve(E && E.then ? E.then(c) : c(E));
          } catch (e) {
            return Promise.reject(e);
          }
        };
      };
    };
  }

  function oe(e) {
    return function (t) {
      return function (t) {
        return function (n) {
          var r = n.type,
              i = n.key,
              a = n.value,
              o = n.options;

          if (r === z.setItem || r === z.removeItem) {
            if (n.abort) return t(n);
            r === z.setItem ? e.setItem(i, a, o) : e.removeItem(i, o);
          }

          return t(n);
        };
      };
    };
  }

  var ue = function () {
    var e = this;
    this.before = [], this.after = [], this.addMiddleware = function (t, n) {
      e[n] = e[n].concat(t);
    }, this.removeMiddleware = function (t, n) {
      var r = e[n].findIndex(function (e) {
        return e === t;
      });
      -1 !== r && (e[n] = [].concat(e[n].slice(0, r), e[n].slice(r + 1)));
    }, this.dynamicMiddlewares = function (t) {
      return function (n) {
        return function (r) {
          return function (i) {
            var a = {
              getState: n.getState,
              dispatch: function (e) {
                return n.dispatch(e);
              }
            },
                o = e[t].map(function (e) {
              return e(a);
            });
            return P.apply(void 0, o)(r)(i);
          };
        };
      };
    };
  };

  function ce(e) {
    return function (t, n) {
      void 0 === t && (t = {});
      var r = {};
      if ("initialize:aborted" === n.type) return t;

      if (/^registerPlugin:([^:]*)$/.test(n.type)) {
        var i = se(n.type, "registerPlugin"),
            a = e()[i];
        if (!a || !i) return t;
        var o = n.enabled,
            u = a.config;
        return r[i] = {
          enabled: o,
          initialized: !!o && Boolean(!a.initialize),
          loaded: !!o && Boolean(a.loaded({
            config: u
          })),
          config: u
        }, g$1({}, t, r);
      }

      if (/^initialize:([^:]*)$/.test(n.type)) {
        var c = se(n.type, z.initialize),
            s = e()[c];
        return s && c ? (r[c] = g$1({}, t[c], {
          initialized: !0,
          loaded: Boolean(s.loaded({
            config: s.config
          }))
        }), g$1({}, t, r)) : t;
      }

      if (/^ready:([^:]*)$/.test(n.type)) return r[n.name] = g$1({}, t[n.name], {
        loaded: !0
      }), g$1({}, t, r);

      switch (n.type) {
        case z.disablePlugin:
          return g$1({}, t, le(n.plugins, !1, t));

        case z.enablePlugin:
          return g$1({}, t, le(n.plugins, !0, t));

        default:
          return t;
      }
    };
  }

  function se(e, t) {
    return e.substring(t.length + 1, e.length);
  }

  function le(e, t, n) {
    return e.reduce(function (e, r) {
      return e[r] = g$1({}, n[r], {
        enabled: t
      }), e;
    }, n);
  }

  function fe(e) {
    try {
      return JSON.parse(JSON.stringify(e));
    } catch (e) {}

    return e;
  }

  var de = {
    last: {},
    history: []
  };

  function pe(e, t) {
    void 0 === e && (e = de);
    var n = t.options,
        r = t.meta;

    if (t.type === z.track) {
      var i = fe(g$1({
        event: t.event,
        properties: t.properties
      }, Object.keys(n).length && {
        options: n
      }, {
        meta: r
      }));
      return g$1({}, e, {
        last: i,
        history: e.history.concat(i)
      });
    }

    return e;
  }

  var me = {
    actions: []
  };

  function ge(e, t) {
    void 0 === e && (e = me);
    var n = t.payload;

    switch (t.type) {
      case "queue":
        var r;
        return r = n && n.type && n.type === z.identify ? [t].concat(e.actions) : e.actions.concat(t), g$1({}, e, {
          actions: r
        });

      case "dequeue":
        return [];

      default:
        return e;
    }
  }

  var he = /#.*$/;

  function ve(e) {
    var t = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/g.exec(e);
    return "/" + (t && t[3] ? t[3].split("?")[0].replace(he, "") : "");
  }

  var ye,
      be = function (e) {
    if (void 0 === e && (e = {}), !$$1) return e;

    var t = document,
        n = t.title,
        r = t.referrer,
        i = window,
        a = i.location,
        o = i.innerWidth,
        u = i.innerHeight,
        c = a.hash,
        s = a.search,
        l = function (e) {
      var t = function () {
        if ($$1) for (var e, t = document.getElementsByTagName("link"), n = 0; e = t[n]; n++) if ("canonical" === e.getAttribute("rel")) return e.getAttribute("href");
      }();

      return t ? t.match(/\?/) ? t : t + e : window.location.href.replace(he, "");
    }(s),
        f = {
      title: n,
      url: l,
      path: ve(l),
      hash: c,
      search: s,
      width: o,
      height: u
    };

    return r && "" !== r && (f.referrer = r), g$1({}, f, e);
  },
      Ie = {
    last: {},
    history: []
  };

  function we(e, t) {
    void 0 === e && (e = Ie);
    var n = t.options;

    if (t.type === z.page) {
      var r = fe(g$1({
        properties: t.properties,
        meta: t.meta
      }, Object.keys(n).length && {
        options: n
      }));
      return g$1({}, e, {
        last: r,
        history: e.history.concat(r)
      });
    }

    return e;
  }

  ye = {};
  var Ee = {
    initialized: !1,
    sessionId: y$1(),
    app: null,
    version: null,
    debug: !1,
    offline: !!$$1 && !navigator.onLine,
    os: {
      name: "na"
    },
    userAgent: $$1 ? navigator.userAgent : "node",
    library: {
      name: "analytics",
      version: "0.12.5"
    },
    timezone: void 0,
    locale: void 0,
    campaign: {},
    referrer: ye
  };

  function Pe(e, t) {
    void 0 === e && (e = Ee);
    var n = e.initialized,
        r = t.campaign;

    switch (t.type) {
      case z.campaign:
        return g$1({}, e, {
          campaign: r
        });

      case z.offline:
        return g$1({}, e, {
          offline: !0
        });

      case z.online:
        return g$1({}, e, {
          offline: !1
        });

      default:
        return n ? e : g$1({}, Ee, e, {
          initialized: !0
        });
    }
  }

  var Se = ["plugins", "reducers", "storage"];

  function Ne() {
    return f("analytics", []), function (e) {
      return function (t, n$1, r) {
        var i = e(t, n$1, r),
            a = i.dispatch;
        return Object.assign(i, {
          dispatch: function (e) {
            return n[o].analytics.push(e.action || e), a(e);
          }
        });
      };
    };
  }

  function Ae(e) {
    return function () {
      return P(P.apply(null, arguments), Ne());
    };
  }

  function _e(e) {
    return e ? rn(e) ? e : [e] : [];
  }

  function Oe(t, n, r) {
    void 0 === t && (t = {});
    var i,
        a,
        o = y$1();
    return n && (B[o] = (i = n, a = function (e) {
      for (var t, n = e || Array.prototype.slice.call(arguments), r = 0; r < n.length; r++) if (W$1(n[r])) {
        t = n[r];
        break;
      }

      return t;
    }(r), function (e) {
      a && a(e), i(e);
    })), g$1({}, t, {
      rid: o,
      ts: new Date().getTime()
    }, n ? {
      hasCallback: !0
    } : {});
  }

  function je(o) {
    void 0 === o && (o = {});

    var u = o.reducers || {},
        s$1 = o.initialUser || {},
        f$1 = (o.plugins || []).reduce(function (e, t) {
      if (W$1(t)) return e.middlewares = e.middlewares.concat(t), e;
      if (t.NAMESPACE && (t.name = t.NAMESPACE), !t.name) throw new Error("https://lytics.dev/errors/1");
      t.config || (t.config = {});
      var n = t.EVENTS ? Object.keys(t.EVENTS).map(function (e) {
        return t.EVENTS[e];
      }) : [];
      e.pluginEnabled[t.name] = !(!1 === t.enabled || !1 === t.config.enabled), delete t.enabled, t.methods && (e.methods[t.name] = Object.keys(t.methods).reduce(function (e, n) {
        var r;
        return e[n] = (r = t.methods[n], function () {
          for (var e = Array.prototype.slice.call(arguments), t = new Array(r.length), n = 0; n < e.length; n++) t[n] = e[n];

          return t[t.length] = K, r.apply({
            instance: K
          }, t);
        }), e;
      }, {}), delete t.methods);
      var r = Object.keys(t).concat(n),
          i = new Set(e.events.concat(r));
      if (e.events = Array.from(i), e.pluginsArray = e.pluginsArray.concat(t), e.plugins[t.name]) throw new Error(t.name + "AlreadyLoaded");
      return e.plugins[t.name] = t, e.plugins[t.name].loaded || (e.plugins[t.name].loaded = function () {
        return !0;
      }), e;
    }, {
      plugins: {},
      pluginEnabled: {},
      methods: {},
      pluginsArray: [],
      middlewares: [],
      events: []
    }),
        m = o.storage ? o.storage : {
      getItem: a$2,
      setItem: f,
      removeItem: i$2
    },
        b = function (e) {
      return function (t, n, i) {
        return n.getState("user")[t] || (i && on(i) && i[t] ? i[t] : R(e)[t] || a$2($(t)) || null);
      };
    }(m),
        I = f$1.plugins,
        A = f$1.events.filter(function (e) {
      return !T.includes(e);
    }).sort(),
        _ = new Set(A.concat(x$1).filter(function (e) {
      return !T.includes(e);
    })),
        O = Array.from(_).sort(),
        M = function () {
      return I;
    },
        q = new ue(),
        V = q.addMiddleware,
        B = q.removeMiddleware,
        L = q.dynamicMiddlewares,
        J = function () {
      throw new Error("Abort disabled inListener");
    },
        X = s(),
        H = R(m),
        W = g$1({}, H, s$1, X.an_uid ? {
      userId: X.an_uid
    } : {}, X.an_aid ? {
      anonymousId: X.an_aid
    } : {});

    W.anonymousId || (W.anonymousId = y$1());
    var F = g$1({
      enable: function (e, t) {
        return new Promise(function (n) {
          le.dispatch({
            type: z.enablePlugin,
            plugins: _e(e),
            _: {
              originalAction: z.enablePlugin
            }
          }, n, [t]);
        });
      },
      disable: function (e, t) {
        return new Promise(function (n) {
          le.dispatch({
            type: z.disablePlugin,
            plugins: _e(e),
            _: {
              originalAction: z.disablePlugin
            }
          }, n, [t]);
        });
      }
    }, f$1.methods),
        G = !1,
        K = {
      identify: function (e, t, n, r) {
        try {
          var i = q$1(e) ? e : null,
              o = on(e) ? e : t,
              u = n || {},
              s = K.user();
          f($(j), i);
          var l = i || o.userId || b(j, K, o);
          return Promise.resolve(new Promise(function (e) {
            le.dispatch(g$1({
              type: z.identifyStart,
              userId: l,
              traits: o || {},
              options: u,
              anonymousId: s.anonymousId
            }, s.id && s.id !== i && {
              previousId: s.id
            }), e, [t, n, r]);
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      },
      track: function (e, t, n, r) {
        try {
          var i = on(e) ? e.event : e;
          if (!i || !q$1(i)) throw new Error("EventMissing");
          var a = on(e) ? e : t || {},
              o = on(n) ? n : {};
          return Promise.resolve(new Promise(function (e) {
            le.dispatch({
              type: z.trackStart,
              event: i,
              properties: a,
              options: o,
              userId: b(j, K, t),
              anonymousId: b(k$1, K, t)
            }, e, [t, n, r]);
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      },
      page: function (e, t, n) {
        try {
          var r = on(e) ? e : {},
              i = on(t) ? t : {};
          return Promise.resolve(new Promise(function (a) {
            le.dispatch({
              type: z.pageStart,
              properties: be(r),
              options: i,
              userId: b(j, K, r),
              anonymousId: b(k$1, K, r)
            }, a, [e, t, n]);
          }));
        } catch (e) {
          return Promise.reject(e);
        }
      },
      user: function (e) {
        if (e === j || "id" === e) return b(j, K);
        if (e === k$1 || "anonId" === e) return b(k$1, K);
        var t = K.getState("user");
        return e ? n$2(t, e) : t;
      },
      reset: function (e) {
        return new Promise(function (t) {
          le.dispatch({
            type: z.resetStart
          }, t, e);
        });
      },
      ready: function (e) {
        return G && e({
          plugins: F,
          instance: K
        }), K.on(z.ready, function (t) {
          e(t), G = !0;
        });
      },
      on: function (e, t) {
        if (!e || !W$1(t)) return !1;
        if (e === z.bootstrap) throw new Error(".on disabled for " + e);
        var n = /Start$|Start:/;

        if ("*" === e) {
          var r = function (e) {
            return function (e) {
              return function (r) {
                return r.type.match(n) && t({
                  payload: r,
                  instance: K,
                  plugins: I
                }), e(r);
              };
            };
          },
              i = function (e) {
            return function (e) {
              return function (r) {
                return r.type.match(n) || t({
                  payload: r,
                  instance: K,
                  plugins: I
                }), e(r);
              };
            };
          };

          return V(r, ke), V(i, xe), function () {
            B(r, ke), B(i, xe);
          };
        }

        var a = e.match(n) ? ke : xe,
            o = function (n) {
          return function (n) {
            return function (r) {
              return r.type === e && t({
                payload: r,
                instance: K,
                plugins: I,
                abort: J
              }), n(r);
            };
          };
        };

        return V(o, a), function () {
          return B(o, a);
        };
      },
      once: function (e, t) {
        if (!e || !W$1(t)) return !1;
        if (e === z.bootstrap) throw new Error(".once disabled for " + e);
        var n = K.on(e, function (e) {
          t({
            payload: e.payload,
            instance: K,
            plugins: I,
            abort: J
          }), n();
        });
        return n;
      },
      getState: function (e) {
        var t = le.getState();
        return e ? n$2(t, e) : Object.assign({}, t);
      },
      dispatch: function (e) {
        var t = q$1(e) ? {
          type: e
        } : e;
        if (x$1.includes(t.type)) throw new Error("reserved action " + t.type);
        var n = g$1({}, t, {
          _: g$1({
            originalAction: t.type
          }, e._ || {})
        });
        le.dispatch(n);
      },
      enablePlugin: F.enable,
      disablePlugin: F.disable,
      plugins: F,
      storage: {
        getItem: m.getItem,
        setItem: function (e, t, n) {
          le.dispatch({
            type: z.setItemStart,
            key: e,
            value: t,
            options: n
          });
        },
        removeItem: function (e, t) {
          le.dispatch({
            type: z.removeItemStart,
            key: e,
            options: t
          });
        }
      },
      setAnonymousId: function (e, t) {
        K.storage.setItem(N$1, e, t);
      },
      events: {
        core: x$1,
        plugins: A
      }
    },
        Q = f$1.middlewares.concat([function (e) {
      return function (e) {
        return function (t) {
          return t.meta || (t.meta = Oe()), e(t);
        };
      };
    }, L(ke), ae(K, M, {
      all: O,
      plugins: A
    }), oe(m), C$1(K), D(K), L(xe)]),
        Y = {
      context: Pe,
      user: U(m),
      page: we,
      track: pe,
      plugins: ce(M),
      queue: ge
    },
        Z = P,
        ee = P;

    if ($$1 && o.debug) {
      var te = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
      te && (Z = te({
        trace: !0,
        traceLimit: 25
      })), ee = function () {
        return 0 === arguments.length ? Ne() : on(typeof arguments[0]) ? Ae() : Ae().apply(null, arguments);
      };
    }

    var ne,
        re = function (e) {
      return Object.keys(e).reduce(function (t, n) {
        return Se.includes(n) || (t[n] = e[n]), t;
      }, {});
    }(o),
        ie = f$1.pluginsArray.reduce(function (e, t) {
      var n = t.name,
          r = t.config,
          i = t.loaded,
          a = f$1.pluginEnabled[n];
      return e[n] = {
        enabled: a,
        initialized: !!a && Boolean(!t.initialize),
        loaded: Boolean(i({
          config: r
        })),
        config: r
      }, e;
    }, {}),
        se = {
      context: re,
      user: W,
      plugins: ie
    },
        le = w(function (e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        typeof e[i] === h$1 && (n[i] = e[i]);
      }

      var a,
          o = Object.keys(n);

      try {
        !function (e) {
          Object.keys(e).forEach(function (t) {
            var n = e[t];
            if (typeof n(void 0, {
              type: "@@redux/INIT"
            }) === v || typeof n(void 0, {
              type: y
            }) === v) throw new Error("reducer " + t + " " + v);
          });
        }(n);
      } catch (e) {
        a = e;
      }

      return function (e, t) {
        if (void 0 === e && (e = {}), a) throw a;

        for (var r = !1, i = {}, u = 0; u < o.length; u++) {
          var c = o[u],
              s = e[c],
              l = (0, n[c])(s, t);

          if (typeof l === v) {
            var f = E$1(c, t);
            throw new Error(f);
          }

          i[c] = l, r = r || l !== s;
        }

        return r ? i : e;
      };
    }(g$1({}, Y, u)), se, ee(Z(S.apply(void 0, Q))));

    le.dispatch = (ne = le.dispatch, function (e, t, n) {
      var r = g$1({}, e, {
        meta: Oe(e.meta, t, _e(n))
      });
      return ne.apply(null, [r]);
    });
    var fe = Object.keys(I);
    le.dispatch({
      type: z.bootstrap,
      plugins: fe,
      config: re,
      params: X,
      user: W,
      initialUser: s$1,
      persistedUser: H
    });
    var de = fe.filter(function (e) {
      return f$1.pluginEnabled[e];
    }),
        me = fe.filter(function (e) {
      return !f$1.pluginEnabled[e];
    });
    return le.dispatch({
      type: z.registerPlugins,
      plugins: fe,
      enabled: f$1.pluginEnabled
    }), f$1.pluginsArray.map(function (e, t) {
      var n = e.bootstrap,
          r = e.config,
          i = e.name;
      n && W$1(n) && n({
        instance: K,
        config: r,
        payload: e
      }), le.dispatch({
        type: z.registerPluginType(i),
        name: i,
        enabled: f$1.pluginEnabled[i],
        plugin: e
      }), f$1.pluginsArray.length === t + 1 && le.dispatch({
        type: z.initializeStart,
        plugins: de,
        disabled: me
      });
    }), K;
  }

  var ke = "before",
      xe = "after";

  var t = "cookie",
      i$1 = a$1(),
      r$1 = d$1,
      c = d$1;

  function u(o) {
    return i$1 ? d$1(o, "", -1) : i$2(o);
  }

  function a$1() {
    if (void 0 !== i$1) return i$1;
    var e = "cookiecookie";

    try {
      d$1(e, e), i$1 = -1 !== document.cookie.indexOf(e), u(e);
    } catch (e) {
      i$1 = !1;
    }

    return i$1;
  }

  function d$1(e, t, r, c, u, a) {
    if ("undefined" != typeof window) {
      var d = arguments.length > 1;
      return !1 === i$1 && (d ? f(e, t) : a$2(e)), d ? document.cookie = e + "=" + encodeURIComponent(t) + (r ? "; expires=" + new Date(+new Date() + 1e3 * r).toUTCString() + (c ? "; path=" + c : "") + (u ? "; domain=" + u : "") + (a ? "; secure" : "") : "") : decodeURIComponent((("; " + document.cookie).split("; " + e + "=")[1] || "").split(";")[0]);
    }
  }

  var r = "localStorage",
      g = b$2.bind(null, "localStorage");
      u$1("localStorage", "getItem", a$2);
      u$1("localStorage", "setItem", f);
      u$1("localStorage", "removeItem", i$2);

  var a = "sessionStorage",
      i = b$2.bind(null, "sessionStorage");
      u$1("sessionStorage", "getItem", a$2);
      u$1("sessionStorage", "setItem", f);
      u$1("sessionStorage", "removeItem", i$2);

  function I(t) {
    var o = t;

    try {
      if ("true" === (o = JSON.parse(t))) return !0;
      if ("false" === o) return !1;
      if (on(o)) return o;
      parseFloat(o) === o && (o = parseFloat(o));
    } catch (t) {}

    if (null !== o && "" !== o) return o;
  }

  var k = g(),
      O = i(),
      x = a$1();

  function C(o, e) {
    if (o) {
      var r = A(e),
          a = !N(r),
          i = d(r) ? I(localStorage.getItem(o)) : void 0;
      if (a && !I$2(i)) return i;
      var n = h(r) ? I(r$1(o)) : void 0;
      if (a && n) return n;
      var l = E(r) ? I(sessionStorage.getItem(o)) : void 0;
      if (a && l) return l;
      var u = a$2(o);
      return a ? u : {
        localStorage: i,
        sessionStorage: l,
        cookie: n,
        global: u
      };
    }
  }

  function L(r$2, a$1, l$1) {
    if (r$2 && !I$2(a$1)) {
      var u = {},
          g = A(l$1),
          m = JSON.stringify(a$1),
          S = !N(g);
      return d(g) && (u[r] = F(r, a$1, I(localStorage.getItem(r$2))), localStorage.setItem(r$2, m), S) ? u[r] : h(g) && (u[t] = F(t, a$1, I(r$1(r$2))), c(r$2, m), S) ? u[t] : E(g) && (u[a] = F(a, a$1, I(sessionStorage.getItem(r$2))), sessionStorage.setItem(r$2, m), S) ? u[a] : (u[l] = F(l, a$1, a$2(r$2)), f(r$2, a$1), S ? u[l] : u);
    }
  }

  function b(t$1, e) {
    if (t$1) {
      var a$1 = A(e),
          s = C(t$1, m$1),
          n = {};
      return !I$2(s.localStorage) && d(a$1) && (localStorage.removeItem(t$1), n[r] = s.localStorage), !I$2(s.cookie) && h(a$1) && (u(t$1), n[t] = s.cookie), !I$2(s.sessionStorage) && E(a$1) && (sessionStorage.removeItem(t$1), n[a] = s.sessionStorage), !I$2(s.global) && G(a$1, l) && (i$2(t$1), n[l] = s.global), n;
    }
  }

  function A(t) {
    return t ? q$1(t) ? t : t.storage : b$3;
  }

  function d(t) {
    return k && G(t, r);
  }

  function h(t$1) {
    return x && G(t$1, t);
  }

  function E(t) {
    return O && G(t, a);
  }

  function N(t) {
    return t === m$1 || "all" === t;
  }

  function G(t, o) {
    return t === b$3 || t === o || N(t);
  }

  function F(t, o, e) {
    return {
      location: t,
      current: o,
      previous: e
    };
  }

  var J = {
    setItem: L,
    getItem: C,
    removeItem: b
  };

  function analyticsLib() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultSettings = {
      storage: J
    };
    return je(_objectSpread2(_objectSpread2({}, defaultSettings), opts));
  }

  exports.Analytics = analyticsLib;
  exports.CONSTANTS = O$1;
  exports.EVENTS = z;
  exports["default"] = analyticsLib;
  exports.init = analyticsLib;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
