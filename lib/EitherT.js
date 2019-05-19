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
var Applicative_1 = require("./Applicative");
var Either_1 = require("./Either");
function getEitherM(M) {
    var A = Applicative_1.getApplicativeComposition(M, Either_1.either);
    var chain = function (ma, f) {
        return M.chain(ma, function (e) { return (Either_1.isLeft(e) ? M.of(Either_1.left(e.left)) : f(e.right)); });
    };
    var _left = function (e) { return M.of(Either_1.left(e)); };
    return __assign({}, A, { chain: chain, alt: function (fx, fy) { return M.chain(fx, function (e) { return (Either_1.isLeft(e) ? fy() : A.of(e.right)); }); }, fold: function (onLeft, onRight) { return function (ma) { return M.chain(ma, Either_1.fold(onLeft, onRight)); }; }, bimap: function (ma, f, g) { return M.map(ma, function (e) { return Either_1.either.bimap(e, f, g); }); }, mapLeft: function (ma, f) { return M.map(ma, function (e) { return Either_1.either.mapLeft(e, f); }); }, getOrElse: function (onLeft) { return function (ma) { return M.chain(ma, Either_1.fold(onLeft, M.of)); }; }, orElse: function (f) { return function (ma) { return M.chain(ma, Either_1.fold(f, function (a) { return A.of(a); })); }; }, swap: function (ma) { return M.map(ma, Either_1.swap); }, rightM: function (ma) { return M.map(ma, Either_1.right); }, leftM: function (ml) { return M.map(ml, Either_1.left); }, left: _left, bracket: function (acquire, use, release) {
            return chain(acquire, function (a) {
                return chain(M.map(use(a), Either_1.right), function (e) { return chain(release(a, e), function () { return (Either_1.isLeft(e) ? _left(e.left) : A.of(e.right)); }); });
            });
        } });
}
exports.getEitherM = getEitherM;