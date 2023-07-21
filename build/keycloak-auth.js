"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var keycloak_auth_exports = {};
__export(keycloak_auth_exports, {
  default: () => keycloak_auth_default
});
module.exports = __toCommonJS(keycloak_auth_exports);
var import_keycloak_js = __toESM(require("keycloak-js"));
var import_configuration = __toESM(require("shared/services/configuration/configuration"));
const OAUTH_DOMAIN_KEY = "oauthDomain";
class Keycloak {
  constructor() {
    __publicField(this, "keycloak");
    __publicField(this, "refreshIntervalId", null);
    __publicField(this, "storage");
    this.storage = window.localStorage || window.sessionStorage;
    this.keycloak = (0, import_keycloak_js.default)({
      clientId: import_configuration.default.oidc.clientId,
      realm: import_configuration.default.oidc.realm,
      url: import_configuration.default.oidc.authEndpoint
    });
    this.keycloak.onAuthSuccess = this.startRefreshInterval.bind(this);
    this.keycloak.onAuthRefreshError = this.stopRefreshInterval.bind(this);
    this.keycloak.onAuthError = this.stopRefreshInterval.bind(this);
    this.keycloak.onAuthLogout = this.stopRefreshInterval.bind(this);
    this.keycloak.onTokenExpired = this.handleExpiredToken.bind(this);
  }
  async init() {
    const options = {
      flow: "standard",
      // Standard = code flow
      checkLoginIframe: false,
      // To keep user logged in, use refresh token instead of (silent) redirect
      pkceMethod: "S256",
      useNonce: true
    };
    if (this.storage.getItem(OAUTH_DOMAIN_KEY) === "keycloak") {
      options.onLoad = "check-sso";
    }
    return this.keycloak.init(options);
  }
  async authenticate() {
    await this.init();
    if (this.getIsAuthenticated()) {
      const accessToken = this.getAccessToken();
      return accessToken ? { accessToken } : null;
    }
    return null;
  }
  getIsAuthenticated() {
    return Boolean(
      this.keycloak.authenticated && !this.keycloak.isTokenExpired()
    );
  }
  getAuthHeaders() {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  getAccessToken() {
    return this.keycloak.token || null;
  }
  login() {
    this.storage.setItem(OAUTH_DOMAIN_KEY, "keycloak");
    this.keycloak.login({
      scope: import_configuration.default.oidc.scope
    });
  }
  logout() {
    this.storage.removeItem(OAUTH_DOMAIN_KEY);
    this.keycloak.logout();
  }
  startRefreshInterval() {
    const minValidity = 120;
    const updateInterval = 60;
    if (!this.refreshIntervalId) {
      this.refreshIntervalId = setInterval(() => {
        this.keycloak.updateToken(minValidity);
      }, updateInterval * 1e3);
    }
  }
  stopRefreshInterval() {
    if (this.refreshIntervalId !== null) {
      clearInterval(this.refreshIntervalId);
      this.refreshIntervalId = null;
    }
  }
  handleExpiredToken() {
    this.stopRefreshInterval();
    this.logout();
  }
}
var keycloak_auth_default = Keycloak;
//# sourceMappingURL=keycloak-auth.js.map