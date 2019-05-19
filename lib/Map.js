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
var Either_1 = require("./Either");
var function_1 = require("./function");
var Option_1 = require("./Option");
var Eq_1 = require("./Eq");
/**
 * @since 2.0.0
 */
exports.URI = 'Map';
/**
 * @since 2.0.0
 */
function getShow(SK, SA) {
    return {
        show: function (m) {
            var elements = '';
            m.forEach(function (a, k) {
                elements += "[" + SK.show(k) + ", " + SA.show(a) + "], ";
            });
            if (elements !== '') {
                elements = elements.substring(0, elements.length - 2);
            }
            return "new Map([" + elements + "])";
        }
    };
}
exports.getShow = getShow;
/**
 * Calculate the number of key/value pairs in a map
 *
 * @since 2.0.0
 */
function size(d) {
    return d.size;
}
exports.size = size;
/**
 * Test whether or not a map is empty
 *
 * @since 2.0.0
 */
function isEmpty(d) {
    return d.size === 0;
}
exports.isEmpty = isEmpty;
/**
 * Test whether or not a key exists in a map
 *
 * @since 2.0.0
 */
function member(E) {
    var lookupE = lookup(E);
    return function (k, m) { return Option_1.isSome(lookupE(k, m)); };
}
exports.member = member;
/**
 * Test whether or not a value is a member of a map
 *
 * @since 2.0.0
 */
function elem(E) {
    return function (a, m) {
        var values = m.values();
        var e;
        while (!(e = values.next()).done) {
            var v = e.value;
            if (E.equals(a, v)) {
                return true;
            }
        }
        return false;
    };
}
exports.elem = elem;
/**
 * Get a sorted array of the keys contained in a map
 *
 * @since 2.0.0
 */
function keys(O) {
    return function (m) { return Array.from(m.keys()).sort(O.compare); };
}
exports.keys = keys;
/**
 * Get a sorted array of the values contained in a map
 *
 * @since 2.0.0
 */
function values(O) {
    return function (m) { return Array.from(m.values()).sort(O.compare); };
}
exports.values = values;
/**
 * @since 2.0.0
 */
function collect(O) {
    var keysO = keys(O);
    return function (m, f) {
        var out = [];
        var ks = keysO(m);
        for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
            var key = ks_1[_i];
            out.push(f(key, m.get(key)));
        }
        return out;
    };
}
exports.collect = collect;
/**
 * Get a sorted of the key/value pairs contained in a map
 *
 * @since 2.0.0
 */
function toArray(O) {
    var collectO = collect(O);
    return function (m) { return collectO(m, function (k, a) { return [k, a]; }); };
}
exports.toArray = toArray;
function toUnfoldable(O, U) {
    var toArrayO = toArray(O);
    return function (d) {
        var arr = toArrayO(d);
        var len = arr.length;
        return U.unfold(0, function (b) { return (b < len ? Option_1.some([arr[b], b + 1]) : Option_1.none); });
    };
}
exports.toUnfoldable = toUnfoldable;
/**
 * Insert or replace a key/value pair in a map
 *
 * @since 2.0.0
 */
function insert(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, a, m) {
        var found = lookupWithKeyE(k, m);
        if (Option_1.isNone(found)) {
            var r = new Map(m);
            r.set(k, a);
            return r;
        }
        else if (found.value[1] !== a) {
            var r = new Map(m);
            r.set(found.value[0], a);
            return r;
        }
        return m;
    };
}
exports.insert = insert;
/**
 * Delete a key and value from a map
 *
 * @since 2.0.0
 */
function remove(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, m) {
        var found = lookupWithKeyE(k, m);
        if (Option_1.isSome(found)) {
            var r = new Map(m);
            r.delete(found.value[0]);
            return r;
        }
        return m;
    };
}
exports.remove = remove;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 *
 * @since 2.0.0
 */
function pop(E) {
    var lookupE = lookup(E);
    var removeE = remove(E);
    return function (k, m) { return Option_1.option.map(lookupE(k, m), function (a) { return [a, removeE(k, m)]; }); };
}
exports.pop = pop;
/**
 * Lookup the value for a key in a `Map`.
 * If the result is a `Some`, the existing key is also returned.
 *
 * @since 2.0.0
 */
function lookupWithKey(E) {
    return function (k, m) {
        var entries = m.entries();
        var e;
        while (!(e = entries.next()).done) {
            var _a = e.value, ka = _a[0], a = _a[1];
            if (E.equals(ka, k)) {
                return Option_1.some([ka, a]);
            }
        }
        return Option_1.none;
    };
}
exports.lookupWithKey = lookupWithKey;
/**
 * Lookup the value for a key in a `Map`.
 *
 * @since 2.0.0
 */
function lookup(E) {
    var lookupWithKeyE = lookupWithKey(E);
    return function (k, m) { return Option_1.option.map(lookupWithKeyE(k, m), function (_a) {
        var _ = _a[0], a = _a[1];
        return a;
    }); };
}
exports.lookup = lookup;
/**
 * Test whether or not one Map contains all of the keys and values contained in another Map
 *
 * @since 2.0.0
 */
function isSubmap(SK, SA) {
    var lookupWithKeyS = lookupWithKey(SK);
    return function (d1, d2) {
        var entries = d1.entries();
        var e;
        while (!(e = entries.next()).done) {
            var _a = e.value, k = _a[0], a = _a[1];
            var d2OptA = lookupWithKeyS(k, d2);
            if (Option_1.isNone(d2OptA) || !SK.equals(k, d2OptA.value[0]) || !SA.equals(a, d2OptA.value[1])) {
                return false;
            }
        }
        return true;
    };
}
exports.isSubmap = isSubmap;
/**
 * @since 2.0.0
 */
exports.empty = new Map();
/**
 * @since 2.0.0
 */
function getEq(SK, SA) {
    var isSubmap_ = isSubmap(SK, SA);
    return Eq_1.fromEquals(function (x, y) { return isSubmap_(x, y) && isSubmap_(y, x); });
}
exports.getEq = getEq;
/**
 * Gets `Monoid` instance for Maps given `Semigroup` instance for their values
 *
 * @since 2.0.0
 */
function getMonoid(SK, SA) {
    var lookupWithKeyS = lookupWithKey(SK);
    return {
        concat: function (mx, my) {
            if (mx === exports.empty) {
                return my;
            }
            if (my === exports.empty) {
                return mx;
            }
            var r = new Map(mx);
            var entries = my.entries();
            var e;
            while (!(e = entries.next()).done) {
                var _a = e.value, k = _a[0], a = _a[1];
                var mxOptA = lookupWithKeyS(k, mx);
                if (Option_1.isSome(mxOptA)) {
                    r.set(mxOptA.value[0], SA.concat(mxOptA.value[1], a));
                }
                else {
                    r.set(k, a);
                }
            }
            return r;
        },
        empty: exports.empty
    };
}
exports.getMonoid = getMonoid;
/**
 * Create a map with one key/value pair
 *
 * @since 2.0.0
 */
function singleton(k, a) {
    return new Map([[k, a]]);
}
exports.singleton = singleton;
function fromFoldable(E, M, F) {
    return function (fka) {
        var lookupWithKeyE = lookupWithKey(E);
        return F.reduce(fka, new Map(), function (b, _a) {
            var k = _a[0], a = _a[1];
            var bOpt = lookupWithKeyE(k, b);
            if (Option_1.isSome(bOpt)) {
                b.set(bOpt.value[0], M.concat(bOpt.value[1], a));
            }
            else {
                b.set(k, a);
            }
            return b;
        });
    };
}
exports.fromFoldable = fromFoldable;
var filter = function (fa, p) { return filterWithIndex(fa, function (_, a) { return p(a); }); };
var mapWithIndex = function (fa, f) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, key = _a[0], a = _a[1];
        m.set(key, f(key, a));
    }
    return m;
};
var reduce = function (O) {
    var reduceWithIndexO = reduceWithIndex(O);
    return function (fa, b, f) { return reduceWithIndexO(fa, b, function (_, b, a) { return f(b, a); }); };
};
var foldMap = function (O) { return function (M) {
    var foldMapWithIndexOM = foldMapWithIndex(O)(M);
    return function (fa, f) { return foldMapWithIndexOM(fa, function (_, a) { return f(a); }); };
}; };
var reduceRight = function (O) {
    var reduceRightWithIndexO = reduceRightWithIndex(O);
    return function (fa, b, f) { return reduceRightWithIndexO(fa, b, function (_, a, b) { return f(a, b); }); };
};
var reduceWithIndex = function (O) {
    var keysO = keys(O);
    return function (fa, b, f) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = f(k, out, fa.get(k));
        }
        return out;
    };
};
var foldMapWithIndex = function (O) {
    var keysO = keys(O);
    return function (M) { return function (fa, f) {
        var out = M.empty;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = 0; i < len; i++) {
            var k = ks[i];
            out = M.concat(out, f(k, fa.get(k)));
        }
        return out;
    }; };
};
var reduceRightWithIndex = function (O) {
    var keysO = keys(O);
    return function (fa, b, f) {
        var out = b;
        var ks = keysO(fa);
        var len = ks.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = ks[i];
            out = f(k, fa.get(k), out);
        }
        return out;
    };
};
var traverseWithIndex = function (F) {
    return function (ta, f) {
        var fm = F.of(exports.empty);
        var entries = ta.entries();
        var e;
        var _loop_1 = function () {
            var _a = e.value, key = _a[0], a = _a[1];
            fm = F.ap(F.map(fm, function (m) { return function (b) { return new Map(m).set(key, b); }; }), f(key, a));
        };
        while (!(e = entries.next()).done) {
            _loop_1();
        }
        return fm;
    };
};
var traverse = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta, f) { return traverseWithIndexF(ta, function (_, a) { return f(a); }); };
};
var sequence = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta) { return traverseWithIndexF(ta, function (_, a) { return a; }); };
};
var compact = function (fa) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], oa = _a[1];
        if (Option_1.isSome(oa)) {
            m.set(k, oa.value);
        }
    }
    return m;
};
var partitionMap = function (fa, f) {
    return partitionMapWithIndex(fa, function (_, a) { return f(a); });
};
var partition = function (fa, p) {
    return partitionWithIndex(fa, function (_, a) { return p(a); });
};
var separate = function (fa) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], ei = _a[1];
        if (Either_1.isLeft(ei)) {
            left.set(k, ei.left);
        }
        else {
            right.set(k, ei.right);
        }
    }
    return {
        left: left,
        right: right
    };
};
var wither = function (F) {
    var traverseF = traverse(F);
    return function (wa, f) { return F.map(traverseF(wa, f), compact); };
};
var wilt = function (F) {
    var traverseF = traverse(F);
    return function (wa, f) { return F.map(traverseF(wa, f), separate); };
};
var filterMap = function (fa, f) {
    return filterMapWithIndex(fa, function (_, a) { return f(a); });
};
var partitionMapWithIndex = function (fa, f) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var ei = f(k, a);
        if (Either_1.isLeft(ei)) {
            left.set(k, ei.left);
        }
        else {
            right.set(k, ei.right);
        }
    }
    return {
        left: left,
        right: right
    };
};
var partitionWithIndex = function (fa, p) {
    var left = new Map();
    var right = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        if (p(k, a)) {
            right.set(k, a);
        }
        else {
            left.set(k, a);
        }
    }
    return {
        left: left,
        right: right
    };
};
var filterMapWithIndex = function (fa, f) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        var o = f(k, a);
        if (Option_1.isSome(o)) {
            m.set(k, o.value);
        }
    }
    return m;
};
var filterWithIndex = function (fa, p) {
    var m = new Map();
    var entries = fa.entries();
    var e;
    while (!(e = entries.next()).done) {
        var _a = e.value, k = _a[0], a = _a[1];
        if (p(k, a)) {
            m.set(k, a);
        }
    }
    return m;
};
var compactable = {
    URI: exports.URI,
    compact: compact,
    separate: separate
};
var functor = {
    URI: exports.URI,
    map: function (fa, f) { return mapWithIndex(fa, function (_, a) { return f(a); }); }
};
var getFunctorWithIndex = function () {
    return __assign({ _L: function_1.phantom }, functor, { mapWithIndex: mapWithIndex });
};
var getFoldable = function (O) {
    return {
        URI: exports.URI,
        _L: function_1.phantom,
        reduce: reduce(O),
        foldMap: foldMap(O),
        reduceRight: reduceRight(O)
    };
};
var getFoldableWithIndex = function (O) {
    return __assign({}, getFoldable(O), { reduceWithIndex: reduceWithIndex(O), foldMapWithIndex: foldMapWithIndex(O), reduceRightWithIndex: reduceRightWithIndex(O) });
};
var filterable = __assign({}, compactable, functor, { filter: filter,
    filterMap: filterMap,
    partition: partition,
    partitionMap: partitionMap });
/**
 * @since 2.0.0
 */
function getFilterableWithIndex() {
    return __assign({}, filterable, getFunctorWithIndex(), { partitionMapWithIndex: partitionMapWithIndex,
        partitionWithIndex: partitionWithIndex,
        filterMapWithIndex: filterMapWithIndex,
        filterWithIndex: filterWithIndex });
}
exports.getFilterableWithIndex = getFilterableWithIndex;
var getTraversable = function (O) {
    return __assign({ _L: function_1.phantom }, getFoldable(O), functor, { traverse: traverse,
        sequence: sequence });
};
/**
 * @since 2.0.0
 */
function getWitherable(O) {
    return __assign({}, filterable, getTraversable(O), { wilt: wilt,
        wither: wither });
}
exports.getWitherable = getWitherable;
/**
 * @since 2.0.0
 */
function getTraversableWithIndex(O) {
    return __assign({}, getFunctorWithIndex(), getFoldableWithIndex(O), getTraversable(O), { traverseWithIndex: traverseWithIndex });
}
exports.getTraversableWithIndex = getTraversableWithIndex;
/**
 * @since 2.0.0
 */
exports.map = __assign({ URI: exports.URI }, compactable, functor, filterable);