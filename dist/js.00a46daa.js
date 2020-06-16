// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/salary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ordenadoMinimoL = 755.51;
var horasPSemanaMinimo = 40;

var Salary = /*#__PURE__*/function () {
  function Salary(hSemanais, cMedioConsulta, nMedioConsultasDia, nMedioConsultasDesmDia, percentagem, nDiasPSemana) {
    _classCallCheck(this, Salary);

    this.hSemanais = hSemanais;
    this.cMedioConsulta = cMedioConsulta;
    this.nMedioConsultasDia = nMedioConsultasDia;
    this.nMedioConsultasDesmDia = nMedioConsultasDesmDia;
    this.percentagem = percentagem;
    this.nDiasPSemana = nDiasPSemana;
  }

  _createClass(Salary, [{
    key: "calcOrdenadoDia",
    value: function calcOrdenadoDia() {
      return (this.nMedioConsultasDia - this.nMedioConsultasDesmDia) * this.cMedioConsulta * this.percentagem;
    }
  }, {
    key: "calcOrdenadoSem",
    value: function calcOrdenadoSem() {
      return this.ordenadoDia * this.nDiasPSemana;
    }
  }, {
    key: "calcValorPHora",
    value: function calcValorPHora() {
      return this.ordenadoSem / this.hSemanais;
    }
  }, {
    key: "calcOrdenadoMensalB",
    value: function calcOrdenadoMensalB() {
      return this.ordenadoSem * 4;
    }
  }, {
    key: "calcOrdenadoMensalL",
    value: function calcOrdenadoMensalL() {
      if (this.ordenadoMensalB * 12 >= 10000) {
        return this.ordenadoMensalB - this.ordenadoMensalB * 0.25 - 0.214 * 0.7 * this.ordenadoMensalB;
      } else {
        return this.ordenadoMensalB - 0.214 * 0.7 * this.ordenadoMensalB;
      }
    }
  }, {
    key: "calcCompMinimoLiquido",
    value: function calcCompMinimoLiquido() {
      return this.ordenadoMensalL - ordenadoMinimoL;
    }
  }, {
    key: "calcCompMinimoHoras",
    value: function calcCompMinimoHoras() {
      return this.hSemanais * 4 - horasPSemanaMinimo * 4;
    }
  }, {
    key: "ordenadoDia",
    get: function get() {
      return this.calcOrdenadoDia();
    }
  }, {
    key: "ordenadoSem",
    get: function get() {
      return this.calcOrdenadoSem();
    }
  }, {
    key: "valorPHora",
    get: function get() {
      return this.calcValorPHora();
    }
  }, {
    key: "ordenadoMensalB",
    get: function get() {
      return this.calcOrdenadoMensalB();
    }
  }, {
    key: "ordenadoMensalL",
    get: function get() {
      return this.calcOrdenadoMensalL();
    }
  }, {
    key: "compMinimoLiquido",
    get: function get() {
      return this.calcCompMinimoLiquido();
    }
  }, {
    key: "compMinimoHoras",
    get: function get() {
      return this.calcCompMinimoHoras();
    }
  }], [{
    key: "checkValues",
    value: function checkValues(hSemanais, cMedioConsulta, nMedioConsultasDia, nMedioConsultasDesmDia, percentagem, nDiasPSemana) {
      if (hSemanais === "" || hSemanais === "0" || cMedioConsulta === "" || cMedioConsulta === "0" || nMedioConsultasDia === "" || nMedioConsultasDia === "0" || nMedioConsultasDesmDia === "" || percentagem === 0 || nDiasPSemana === "" || nDiasPSemana === "0" || Number(nDiasPSemana) > 7 || percentagem > 1 || Number(cMedioConsulta) > 10000 || Number(nMedioConsultasDia) > 100 || Number(hSemanais) > 24 * 7 || Number(nMedioConsultasDesmDia) >= Number(nMedioConsultasDia)) {
        return false;
      }

      return true;
    }
  }]);

  return Salary;
}();

exports.default = Salary;
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"C:\\Users\\ASUS\\Desktop\\Current Projects\\calculaOMeuSalarioMD\\assets\\img\\bg.jpg":[["bg.c12ef667.jpg","assets/img/bg.jpg"],"assets/img/bg.jpg"],"_css_loader":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _salary = _interopRequireDefault(require("./salary"));

require("../css/styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calcButton = document.getElementById("button-1-b");
calcButton.addEventListener("click", calcResult, false);

function calcResult() {
  var hSemanais = document.getElementById("f1").value;
  var cMedioConsulta = document.getElementById("f2").value;
  var nMedioConsultasDia = document.getElementById("f3").value;
  var nMedioConsultasDesmDia = document.getElementById("f4").value;
  var percentagem = document.getElementById("f5").value / 100;
  var nDiasPSemana = document.getElementById("f6").value;

  if (!_salary.default.checkValues(hSemanais, cMedioConsulta, nMedioConsultasDia, nMedioConsultasDesmDia, percentagem, nDiasPSemana)) {
    var warn = document.getElementById("warning");
    warn.innerHTML = "Atenção: Todos os campos devem estar devidamente preenchidos!";
  } else {
    var _warn = document.getElementById("warning");

    _warn.innerHTML = "";
    var mySalary = new _salary.default(hSemanais, cMedioConsulta, nMedioConsultasDia, nMedioConsultasDesmDia, percentagem, nDiasPSemana);
    document.getElementById("o_dia").innerHTML = "Valor ganho por dia: ";
    document.getElementById("o_sem").innerHTML = "Valor ganho por hora: ";
    document.getElementById("o_bru").innerHTML = "Ordenado mensal bruto: ";
    document.getElementById("o_liq").innerHTML = "Ordenado mensal líquido: ";
    document.getElementById("o_dia_v").innerHTML = mySalary.ordenadoDia.toFixed(0) + "€";
    document.getElementById("o_sem_v").innerHTML = mySalary.valorPHora.toFixed(0) + "€";
    document.getElementById("o_bru_v").innerHTML = mySalary.ordenadoMensalB.toFixed(0) + "€";
    document.getElementById("o_liq_v").innerHTML = mySalary.ordenadoMensalL.toFixed(0) + "€";

    if (mySalary.compMinimoLiquido >= 0) {
      document.getElementById("comp").innerHTML = "Ganhas mais " + Math.abs(mySalary.compMinimoLiquido).toFixed(0) + "€ líquidos que o ordenado mínimo!";
    } else {
      document.getElementById("comp").innerHTML = "Ganhas menos " + Math.abs(mySalary.compMinimoLiquido).toFixed(0) + "€ líquidos que o ordenado mínimo!";
    }

    if (mySalary.compMinimoHoras > 0) {
      document.getElementById("comp2").innerHTML = "Trabalhas mais " + Math.abs(mySalary.compMinimoHoras).toFixed(0) + " horas/mês que um trabalhador de ordenado mínimo.";
    } else if (mySalary.compMinimoHoras < 0) {
      document.getElementById("comp2").innerHTML = "Trabalhas menos " + Math.abs(mySalary.compMinimoHoras).toFixed(0) + " horas/mês que um trabalhador de ordenado mínimo.";
    } else {
      document.getElementById("comp2").innerHTML = "Trabalhas o mesmo número de horas que um trabalhador de ordenado mínimo.";
    }
  }
} // only numbers are accepted as input


window.isNumberKey = function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
};
},{"./salary":"js/salary.js","../css/styles.css":"css/styles.css"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61540" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map