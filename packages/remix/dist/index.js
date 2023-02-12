var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  generateVisitorKey: () => generateVisitorKey,
  getFlags: () => getFlags
});
module.exports = __toCommonJS(src_exports);
var import_nanoid = require("nanoid");
var import_cookie = require("cookie");
function generateVisitorKey(request) {
  var _a, _b;
  return ((_b = (0, import_cookie.parse)((_a = request.headers.get("Cookie")) != null ? _a : "")) == null ? void 0 : _b.hkvk) || (0, import_nanoid.nanoid)();
}
function getFlags() {
  return __async(this, arguments, function* (options = {}) {
    const envKey = process.env.HAPPYKIT_FLAGS_ENV_KEY;
    const flagEvaluationRequestBody = {
      visitorKey: options.visitorKey || null,
      traits: options.traits || null,
      user: options.user || null
    };
    const flagBag = yield fetch(`https://happykit.dev/api/flags/${envKey}`, {
      method: "POST",
      body: JSON.stringify(flagEvaluationRequestBody)
    }).then((res) => res.json());
    return __spreadProps(__spreadValues({}, flagBag), {
      cookie: flagBag.visitor ? {
        "Set-Cookie": `hkvk=${encodeURIComponent(
          flagBag.visitor.key
        )}; Path=/; Max-Age=15552000; SameSite=Lax`
      } : void 0
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateVisitorKey,
  getFlags
});
//# sourceMappingURL=index.js.map