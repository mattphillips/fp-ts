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
var Option_1 = require("./Option");
function getOptionM(M) {
    var A = Applicative_1.getApplicativeComposition(M, Option_1.option);
    var fnone = M.of(Option_1.none);
    return __assign({}, A, { chain: function (ma, f) { return M.chain(ma, function (o) { return (Option_1.isNone(o) ? fnone : f(o.value)); }); }, fold: function (ma, onNone, onSome) { return M.chain(ma, function (o) { return Option_1.fold(o, onNone, onSome); }); }, getOrElse: function (ma, onNone) { return M.chain(ma, function (e) { return Option_1.fold(e, onNone, M.of); }); }, fromM: function (ma) { return M.map(ma, Option_1.some); }, fromOption: function (o) { return M.of(o); }, none: function () { return fnone; } });
}
exports.getOptionM = getOptionM;