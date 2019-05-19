"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var E = require("./Either");
var function_1 = require("./function");
var Identity_1 = require("./Identity");
var ReaderT_1 = require("./ReaderT");
var T = ReaderT_1.getReaderM(Identity_1.identity);
/**
 * @since 2.0.0
 */
exports.URI = 'Reader';
/**
 * Reads the current context
 *
 * @since 2.0.0
 */
exports.ask = T.ask;
/**
 * Projects a value from the global context in a Reader
 *
 * @since 2.0.0
 */
exports.asks = T.asks;
/**
 * changes the value of the local context during the execution of the action `ma`
 *
 * @since 2.0.0
 */
exports.local = T.local;
/**
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return function (e) { return S.concat(x(e), y(e)); }; }
    };
}
exports.getSemigroup = getSemigroup;
/**
 * @since 2.0.0
 */
function getMonoid(M) {
    return __assign({}, getSemigroup(M), { empty: function () { return M.empty; } });
}
exports.getMonoid = getMonoid;
function left(pab) {
    return E.fold(function (a) { return E.left(pab(a)); }, E.right);
}
function right(pbc) {
    return E.fold(E.left, function (b) { return E.right(pbc(b)); });
}
/**
 * @since 2.0.0
 */
exports.reader = {
    URI: exports.URI,
    map: function (ma, f) { return function (e) { return f(ma(e)); }; },
    of: T.of,
    ap: T.ap,
    chain: T.chain,
    promap: function (mbc, f, g) { return function (a) { return g(mbc(f(a))); }; },
    compose: function (ab, la) { return function (l) { return ab(la(l)); }; },
    id: function () { return function_1.identity; },
    first: function (pab) { return function (_a) {
        var a = _a[0], c = _a[1];
        return [pab(a), c];
    }; },
    second: function (pbc) { return function (_a) {
        var a = _a[0], b = _a[1];
        return [a, pbc(b)];
    }; },
    left: left,
    right: right
};