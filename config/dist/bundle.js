/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/minisearch/dist/es/index.js":
/*!**************************************************!*\
  !*** ./node_modules/minisearch/dist/es/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSearch)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/** @ignore */
var ENTRIES = 'ENTRIES';
/** @ignore */
var KEYS = 'KEYS';
/** @ignore */
var VALUES = 'VALUES';
/** @ignore */
var LEAF = '';
/**
 * @private
 */
var TreeIterator = /** @class */ (function () {
    function TreeIterator(set, type) {
        var node = set._tree;
        var keys = Array.from(node.keys());
        this.set = set;
        this._type = type;
        this._path = keys.length > 0 ? [{ node: node, keys: keys }] : [];
    }
    TreeIterator.prototype.next = function () {
        var value = this.dive();
        this.backtrack();
        return value;
    };
    TreeIterator.prototype.dive = function () {
        if (this._path.length === 0) {
            return { done: true, value: undefined };
        }
        var _a = last$1(this._path), node = _a.node, keys = _a.keys;
        if (last$1(keys) === LEAF) {
            return { done: false, value: this.result() };
        }
        var child = node.get(last$1(keys));
        this._path.push({ node: child, keys: Array.from(child.keys()) });
        return this.dive();
    };
    TreeIterator.prototype.backtrack = function () {
        if (this._path.length === 0) {
            return;
        }
        var keys = last$1(this._path).keys;
        keys.pop();
        if (keys.length > 0) {
            return;
        }
        this._path.pop();
        this.backtrack();
    };
    TreeIterator.prototype.key = function () {
        return this.set._prefix + this._path
            .map(function (_a) {
            var keys = _a.keys;
            return last$1(keys);
        })
            .filter(function (key) { return key !== LEAF; })
            .join('');
    };
    TreeIterator.prototype.value = function () {
        return last$1(this._path).node.get(LEAF);
    };
    TreeIterator.prototype.result = function () {
        switch (this._type) {
            case VALUES: return this.value();
            case KEYS: return this.key();
            default: return [this.key(), this.value()];
        }
    };
    TreeIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return TreeIterator;
}());
var last$1 = function (array) {
    return array[array.length - 1];
};

/**
 * @ignore
 */
var fuzzySearch = function (node, query, maxDistance) {
    var results = new Map();
    if (query === undefined)
        return results;
    // Number of columns in the Levenshtein matrix.
    var n = query.length + 1;
    // Matching terms can never be longer than N + maxDistance.
    var m = n + maxDistance;
    // Fill first matrix row and column with numbers: 0 1 2 3 ...
    var matrix = new Uint8Array(m * n).fill(maxDistance + 1);
    for (var j = 0; j < n; ++j)
        matrix[j] = j;
    for (var i = 1; i < m; ++i)
        matrix[i * n] = i;
    recurse(node, query, maxDistance, results, matrix, 1, n, '');
    return results;
};
// Modified version of http://stevehanov.ca/blog/?id=114
// This builds a Levenshtein matrix for a given query and continuously updates
// it for nodes in the radix tree that fall within the given maximum edit
// distance. Keeping the same matrix around is beneficial especially for larger
// edit distances.
//
//           k   a   t   e   <-- query
//       0   1   2   3   4
//   c   1   1   2   3   4
//   a   2   2   1   2   3
//   t   3   3   2   1  [2]  <-- edit distance
//   ^
//   ^ term in radix tree, rows are added and removed as needed
var recurse = function (node, query, maxDistance, results, matrix, m, n, prefix) {
    var e_1, _a;
    var offset = m * n;
    try {
        key: for (var _b = __values(node.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (key === LEAF) {
                // We've reached a leaf node. Check if the edit distance acceptable and
                // store the result if it is.
                var distance = matrix[offset - 1];
                if (distance <= maxDistance) {
                    results.set(prefix, [node.get(key), distance]);
                }
            }
            else {
                // Iterate over all characters in the key. Update the Levenshtein matrix
                // and check if the minimum distance in the last row is still within the
                // maximum edit distance. If it is, we can recurse over all child nodes.
                var i = m;
                for (var pos = 0; pos < key.length; ++pos, ++i) {
                    var char = key[pos];
                    var thisRowOffset = n * i;
                    var prevRowOffset = thisRowOffset - n;
                    // Set the first column based on the previous row, and initialize the
                    // minimum distance in the current row.
                    var minDistance = matrix[thisRowOffset];
                    var jmin = Math.max(0, i - maxDistance - 1);
                    var jmax = Math.min(n - 1, i + maxDistance);
                    // Iterate over remaining columns (characters in the query).
                    for (var j = jmin; j < jmax; ++j) {
                        var different = char !== query[j];
                        // It might make sense to only read the matrix positions used for
                        // deletion/insertion if the characters are different. But we want to
                        // avoid conditional reads for performance reasons.
                        var rpl = matrix[prevRowOffset + j] + +different;
                        var del = matrix[prevRowOffset + j + 1] + 1;
                        var ins = matrix[thisRowOffset + j] + 1;
                        var dist = matrix[thisRowOffset + j + 1] = Math.min(rpl, del, ins);
                        if (dist < minDistance)
                            minDistance = dist;
                    }
                    // Because distance will never decrease, we can stop. There will be no
                    // matching child nodes.
                    if (minDistance > maxDistance) {
                        continue key;
                    }
                }
                recurse(node.get(key), query, maxDistance, results, matrix, i, n, prefix + key);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
};

/**
 * A class implementing the same interface as a standard JavaScript
 * [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * with string keys, but adding support for efficiently searching entries with
 * prefix or fuzzy search. This class is used internally by {@link MiniSearch}
 * as the inverted index data structure. The implementation is a radix tree
 * (compressed prefix tree).
 *
 * Since this class can be of general utility beyond _MiniSearch_, it is
 * exported by the `minisearch` package and can be imported (or required) as
 * `minisearch/SearchableMap`.
 *
 * @typeParam T  The type of the values stored in the map.
 */
var SearchableMap = /** @class */ (function () {
    /**
     * The constructor is normally called without arguments, creating an empty
     * map. In order to create a {@link SearchableMap} from an iterable or from an
     * object, check {@link SearchableMap.from} and {@link
     * SearchableMap.fromObject}.
     *
     * The constructor arguments are for internal use, when creating derived
     * mutable views of a map at a prefix.
     */
    function SearchableMap(tree, prefix) {
        if (tree === void 0) { tree = new Map(); }
        if (prefix === void 0) { prefix = ''; }
        this._size = undefined;
        this._tree = tree;
        this._prefix = prefix;
    }
    /**
     * Creates and returns a mutable view of this {@link SearchableMap},
     * containing only entries that share the given prefix.
     *
     * ### Usage:
     *
     * ```javascript
     * let map = new SearchableMap()
     * map.set("unicorn", 1)
     * map.set("universe", 2)
     * map.set("university", 3)
     * map.set("unique", 4)
     * map.set("hello", 5)
     *
     * let uni = map.atPrefix("uni")
     * uni.get("unique") // => 4
     * uni.get("unicorn") // => 1
     * uni.get("hello") // => undefined
     *
     * let univer = map.atPrefix("univer")
     * univer.get("unique") // => undefined
     * univer.get("universe") // => 2
     * univer.get("university") // => 3
     * ```
     *
     * @param prefix  The prefix
     * @return A {@link SearchableMap} representing a mutable view of the original
     * Map at the given prefix
     */
    SearchableMap.prototype.atPrefix = function (prefix) {
        var e_1, _a;
        if (!prefix.startsWith(this._prefix)) {
            throw new Error('Mismatched prefix');
        }
        var _b = __read(trackDown(this._tree, prefix.slice(this._prefix.length)), 2), node = _b[0], path = _b[1];
        if (node === undefined) {
            var _c = __read(last(path), 2), parentNode = _c[0], key = _c[1];
            try {
                for (var _d = __values(parentNode.keys()), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var k = _e.value;
                    if (k !== LEAF && k.startsWith(key)) {
                        var node_1 = new Map();
                        node_1.set(k.slice(key.length), parentNode.get(k));
                        return new SearchableMap(node_1, prefix);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return new SearchableMap(node, prefix);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear
     */
    SearchableMap.prototype.clear = function () {
        this._size = undefined;
        this._tree.clear();
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete
     * @param key  Key to delete
     */
    SearchableMap.prototype.delete = function (key) {
        this._size = undefined;
        return remove(this._tree, key);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries
     * @return An iterator iterating through `[key, value]` entries.
     */
    SearchableMap.prototype.entries = function () {
        return new TreeIterator(this, ENTRIES);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
     * @param fn  Iteration function
     */
    SearchableMap.prototype.forEach = function (fn) {
        var e_2, _a;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                fn(key, value, this);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    /**
     * Returns a Map of all the entries that have a key within the given edit
     * distance from the search key. The keys of the returned Map are the matching
     * keys, while the values are two-element arrays where the first element is
     * the value associated to the key, and the second is the edit distance of the
     * key to the search key.
     *
     * ### Usage:
     *
     * ```javascript
     * let map = new SearchableMap()
     * map.set('hello', 'world')
     * map.set('hell', 'yeah')
     * map.set('ciao', 'mondo')
     *
     * // Get all entries that match the key 'hallo' with a maximum edit distance of 2
     * map.fuzzyGet('hallo', 2)
     * // => Map(2) { 'hello' => ['world', 1], 'hell' => ['yeah', 2] }
     *
     * // In the example, the "hello" key has value "world" and edit distance of 1
     * // (change "e" to "a"), the key "hell" has value "yeah" and edit distance of 2
     * // (change "e" to "a", delete "o")
     * ```
     *
     * @param key  The search key
     * @param maxEditDistance  The maximum edit distance (Levenshtein)
     * @return A Map of the matching keys to their value and edit distance
     */
    SearchableMap.prototype.fuzzyGet = function (key, maxEditDistance) {
        return fuzzySearch(this._tree, key, maxEditDistance);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get
     * @param key  Key to get
     * @return Value associated to the key, or `undefined` if the key is not
     * found.
     */
    SearchableMap.prototype.get = function (key) {
        var node = lookup(this._tree, key);
        return node !== undefined ? node.get(LEAF) : undefined;
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has
     * @param key  Key
     * @return True if the key is in the map, false otherwise
     */
    SearchableMap.prototype.has = function (key) {
        var node = lookup(this._tree, key);
        return node !== undefined && node.has(LEAF);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys
     * @return An `Iterable` iterating through keys
     */
    SearchableMap.prototype.keys = function () {
        return new TreeIterator(this, KEYS);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set
     * @param key  Key to set
     * @param value  Value to associate to the key
     * @return The {@link SearchableMap} itself, to allow chaining
     */
    SearchableMap.prototype.set = function (key, value) {
        if (typeof key !== 'string') {
            throw new Error('key must be a string');
        }
        this._size = undefined;
        var node = createPath(this._tree, key);
        node.set(LEAF, value);
        return this;
    };
    Object.defineProperty(SearchableMap.prototype, "size", {
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
         */
        get: function () {
            if (this._size) {
                return this._size;
            }
            /** @ignore */
            this._size = 0;
            var iter = this.entries();
            while (!iter.next().done)
                this._size += 1;
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Updates the value at the given key using the provided function. The function
     * is called with the current value at the key, and its return value is used as
     * the new value to be set.
     *
     * ### Example:
     *
     * ```javascript
     * // Increment the current value by one
     * searchableMap.update('somekey', (currentValue) => currentValue == null ? 0 : currentValue + 1)
     * ```
     *
     * If the value at the given key is or will be an object, it might not require
     * re-assignment. In that case it is better to use `fetch()`, because it is
     * faster.
     *
     * @param key  The key to update
     * @param fn  The function used to compute the new value from the current one
     * @return The {@link SearchableMap} itself, to allow chaining
     */
    SearchableMap.prototype.update = function (key, fn) {
        if (typeof key !== 'string') {
            throw new Error('key must be a string');
        }
        this._size = undefined;
        var node = createPath(this._tree, key);
        node.set(LEAF, fn(node.get(LEAF)));
        return this;
    };
    /**
     * Fetches the value of the given key. If the value does not exist, calls the
     * given function to create a new value, which is inserted at the given key
     * and subsequently returned.
     *
     * ### Example:
     *
     * ```javascript
     * const map = searchableMap.fetch('somekey', () => new Map())
     * map.set('foo', 'bar')
     * ```
     *
     * @param key  The key to update
     * @param defaultValue  A function that creates a new value if the key does not exist
     * @return The existing or new value at the given key
     */
    SearchableMap.prototype.fetch = function (key, initial) {
        if (typeof key !== 'string') {
            throw new Error('key must be a string');
        }
        this._size = undefined;
        var node = createPath(this._tree, key);
        var value = node.get(LEAF);
        if (value === undefined) {
            node.set(LEAF, value = initial());
        }
        return value;
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values
     * @return An `Iterable` iterating through values.
     */
    SearchableMap.prototype.values = function () {
        return new TreeIterator(this, VALUES);
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator
     */
    SearchableMap.prototype[Symbol.iterator] = function () {
        return this.entries();
    };
    /**
     * Creates a {@link SearchableMap} from an `Iterable` of entries
     *
     * @param entries  Entries to be inserted in the {@link SearchableMap}
     * @return A new {@link SearchableMap} with the given entries
     */
    SearchableMap.from = function (entries) {
        var e_3, _a;
        var tree = new SearchableMap();
        try {
            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var _b = __read(entries_1_1.value, 2), key = _b[0], value = _b[1];
                tree.set(key, value);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return tree;
    };
    /**
     * Creates a {@link SearchableMap} from the iterable properties of a JavaScript object
     *
     * @param object  Object of entries for the {@link SearchableMap}
     * @return A new {@link SearchableMap} with the given entries
     */
    SearchableMap.fromObject = function (object) {
        return SearchableMap.from(Object.entries(object));
    };
    return SearchableMap;
}());
var trackDown = function (tree, key, path) {
    var e_4, _a;
    if (path === void 0) { path = []; }
    if (key.length === 0 || tree == null) {
        return [tree, path];
    }
    try {
        for (var _b = __values(tree.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var k = _c.value;
            if (k !== LEAF && key.startsWith(k)) {
                path.push([tree, k]); // performance: update in place
                return trackDown(tree.get(k), key.slice(k.length), path);
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_4) throw e_4.error; }
    }
    path.push([tree, key]); // performance: update in place
    return trackDown(undefined, '', path);
};
var lookup = function (tree, key) {
    var e_5, _a;
    if (key.length === 0 || tree == null) {
        return tree;
    }
    try {
        for (var _b = __values(tree.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var k = _c.value;
            if (k !== LEAF && key.startsWith(k)) {
                return lookup(tree.get(k), key.slice(k.length));
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_5) throw e_5.error; }
    }
};
// Create a path in the radix tree for the given key, and returns the deepest
// node. This function is in the hot path for indexing. It avoids unnecessary
// string operations and recursion for performance.
var createPath = function (node, key) {
    var e_6, _a;
    var keyLength = key.length;
    outer: for (var pos = 0; node && pos < keyLength;) {
        try {
            for (var _b = (e_6 = void 0, __values(node.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var k = _c.value;
                // Check whether this key is a candidate: the first characters must match.
                if (k !== LEAF && key[pos] === k[0]) {
                    var len = Math.min(keyLength - pos, k.length);
                    // Advance offset to the point where key and k no longer match.
                    var offset = 1;
                    while (offset < len && key[pos + offset] === k[offset])
                        ++offset;
                    var child_1 = node.get(k);
                    if (offset === k.length) {
                        // The existing key is shorter than the key we need to create.
                        node = child_1;
                    }
                    else {
                        // Partial match: we need to insert an intermediate node to contain
                        // both the existing subtree and the new node.
                        var intermediate = new Map();
                        intermediate.set(k.slice(offset), child_1);
                        node.set(key.slice(pos, pos + offset), intermediate);
                        node.delete(k);
                        node = intermediate;
                    }
                    pos += offset;
                    continue outer;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        // Create a final child node to contain the final suffix of the key.
        var child = new Map();
        node.set(key.slice(pos), child);
        return child;
    }
    return node;
};
var remove = function (tree, key) {
    var _a = __read(trackDown(tree, key), 2), node = _a[0], path = _a[1];
    if (node === undefined) {
        return;
    }
    node.delete(LEAF);
    if (node.size === 0) {
        cleanup(path);
    }
    else if (node.size === 1) {
        var _b = __read(node.entries().next().value, 2), key_1 = _b[0], value = _b[1];
        merge(path, key_1, value);
    }
};
var cleanup = function (path) {
    if (path.length === 0) {
        return;
    }
    var _a = __read(last(path), 2), node = _a[0], key = _a[1];
    node.delete(key);
    if (node.size === 0) {
        cleanup(path.slice(0, -1));
    }
    else if (node.size === 1) {
        var _b = __read(node.entries().next().value, 2), key_2 = _b[0], value = _b[1];
        if (key_2 !== LEAF) {
            merge(path.slice(0, -1), key_2, value);
        }
    }
};
var merge = function (path, key, value) {
    if (path.length === 0) {
        return;
    }
    var _a = __read(last(path), 2), node = _a[0], nodeKey = _a[1];
    node.set(nodeKey + key, value);
    node.delete(nodeKey);
};
var last = function (array) {
    return array[array.length - 1];
};

var _a;
var OR = 'or';
var AND = 'and';
var AND_NOT = 'and_not';
/**
 * {@link MiniSearch} is the main entrypoint class, implementing a full-text
 * search engine in memory.
 *
 * @typeParam T  The type of the documents being indexed.
 *
 * ### Basic example:
 *
 * ```javascript
 * const documents = [
 *   {
 *     id: 1,
 *     title: 'Moby Dick',
 *     text: 'Call me Ishmael. Some years ago...',
 *     category: 'fiction'
 *   },
 *   {
 *     id: 2,
 *     title: 'Zen and the Art of Motorcycle Maintenance',
 *     text: 'I can see by my watch...',
 *     category: 'fiction'
 *   },
 *   {
 *     id: 3,
 *     title: 'Neuromancer',
 *     text: 'The sky above the port was...',
 *     category: 'fiction'
 *   },
 *   {
 *     id: 4,
 *     title: 'Zen and the Art of Archery',
 *     text: 'At first sight it must seem...',
 *     category: 'non-fiction'
 *   },
 *   // ...and more
 * ]
 *
 * // Create a search engine that indexes the 'title' and 'text' fields for
 * // full-text search. Search results will include 'title' and 'category' (plus the
 * // id field, that is always stored and returned)
 * const miniSearch = new MiniSearch({
 *   fields: ['title', 'text'],
 *   storeFields: ['title', 'category']
 * })
 *
 * // Add documents to the index
 * miniSearch.addAll(documents)
 *
 * // Search for documents:
 * let results = miniSearch.search('zen art motorcycle')
 * // => [
 * //   { id: 2, title: 'Zen and the Art of Motorcycle Maintenance', category: 'fiction', score: 2.77258 },
 * //   { id: 4, title: 'Zen and the Art of Archery', category: 'non-fiction', score: 1.38629 }
 * // ]
 * ```
 */
var MiniSearch = /** @class */ (function () {
    /**
     * @param options  Configuration options
     *
     * ### Examples:
     *
     * ```javascript
     * // Create a search engine that indexes the 'title' and 'text' fields of your
     * // documents:
     * const miniSearch = new MiniSearch({ fields: ['title', 'text'] })
     * ```
     *
     * ### ID Field:
     *
     * ```javascript
     * // Your documents are assumed to include a unique 'id' field, but if you want
     * // to use a different field for document identification, you can set the
     * // 'idField' option:
     * const miniSearch = new MiniSearch({ idField: 'key', fields: ['title', 'text'] })
     * ```
     *
     * ### Options and defaults:
     *
     * ```javascript
     * // The full set of options (here with their default value) is:
     * const miniSearch = new MiniSearch({
     *   // idField: field that uniquely identifies a document
     *   idField: 'id',
     *
     *   // extractField: function used to get the value of a field in a document.
     *   // By default, it assumes the document is a flat object with field names as
     *   // property keys and field values as string property values, but custom logic
     *   // can be implemented by setting this option to a custom extractor function.
     *   extractField: (document, fieldName) => document[fieldName],
     *
     *   // tokenize: function used to split fields into individual terms. By
     *   // default, it is also used to tokenize search queries, unless a specific
     *   // `tokenize` search option is supplied. When tokenizing an indexed field,
     *   // the field name is passed as the second argument.
     *   tokenize: (string, _fieldName) => string.split(SPACE_OR_PUNCTUATION),
     *
     *   // processTerm: function used to process each tokenized term before
     *   // indexing. It can be used for stemming and normalization. Return a falsy
     *   // value in order to discard a term. By default, it is also used to process
     *   // search queries, unless a specific `processTerm` option is supplied as a
     *   // search option. When processing a term from a indexed field, the field
     *   // name is passed as the second argument.
     *   processTerm: (term, _fieldName) => term.toLowerCase(),
     *
     *   // searchOptions: default search options, see the `search` method for
     *   // details
     *   searchOptions: undefined,
     *
     *   // fields: document fields to be indexed. Mandatory, but not set by default
     *   fields: undefined
     *
     *   // storeFields: document fields to be stored and returned as part of the
     *   // search results.
     *   storeFields: []
     * })
     * ```
     */
    function MiniSearch(options) {
        if ((options === null || options === void 0 ? void 0 : options.fields) == null) {
            throw new Error('MiniSearch: option "fields" must be provided');
        }
        var autoVacuum = (options.autoVacuum == null || options.autoVacuum === true) ? defaultAutoVacuumOptions : options.autoVacuum;
        this._options = __assign(__assign(__assign({}, defaultOptions), options), { autoVacuum: autoVacuum, searchOptions: __assign(__assign({}, defaultSearchOptions), (options.searchOptions || {})), autoSuggestOptions: __assign(__assign({}, defaultAutoSuggestOptions), (options.autoSuggestOptions || {})) });
        this._index = new SearchableMap();
        this._documentCount = 0;
        this._documentIds = new Map();
        this._idToShortId = new Map();
        // Fields are defined during initialization, don't change, are few in
        // number, rarely need iterating over, and have string keys. Therefore in
        // this case an object is a better candidate than a Map to store the mapping
        // from field key to ID.
        this._fieldIds = {};
        this._fieldLength = new Map();
        this._avgFieldLength = [];
        this._nextId = 0;
        this._storedFields = new Map();
        this._dirtCount = 0;
        this._currentVacuum = null;
        this._enqueuedVacuum = null;
        this._enqueuedVacuumConditions = defaultVacuumConditions;
        this.addFields(this._options.fields);
    }
    /**
     * Adds a document to the index
     *
     * @param document  The document to be indexed
     */
    MiniSearch.prototype.add = function (document) {
        var e_1, _a, e_2, _b, e_3, _c;
        var _d = this._options, extractField = _d.extractField, tokenize = _d.tokenize, processTerm = _d.processTerm, fields = _d.fields, idField = _d.idField;
        var id = extractField(document, idField);
        if (id == null) {
            throw new Error("MiniSearch: document does not have ID field \"".concat(idField, "\""));
        }
        if (this._idToShortId.has(id)) {
            throw new Error("MiniSearch: duplicate ID ".concat(id));
        }
        var shortDocumentId = this.addDocumentId(id);
        this.saveStoredFields(shortDocumentId, document);
        try {
            for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                var field = fields_1_1.value;
                var fieldValue = extractField(document, field);
                if (fieldValue == null)
                    continue;
                var tokens = tokenize(fieldValue.toString(), field);
                var fieldId = this._fieldIds[field];
                var uniqueTerms = new Set(tokens).size;
                this.addFieldLength(shortDocumentId, fieldId, this._documentCount - 1, uniqueTerms);
                try {
                    for (var tokens_1 = (e_2 = void 0, __values(tokens)), tokens_1_1 = tokens_1.next(); !tokens_1_1.done; tokens_1_1 = tokens_1.next()) {
                        var term = tokens_1_1.value;
                        var processedTerm = processTerm(term, field);
                        if (Array.isArray(processedTerm)) {
                            try {
                                for (var processedTerm_1 = (e_3 = void 0, __values(processedTerm)), processedTerm_1_1 = processedTerm_1.next(); !processedTerm_1_1.done; processedTerm_1_1 = processedTerm_1.next()) {
                                    var t = processedTerm_1_1.value;
                                    this.addTerm(fieldId, shortDocumentId, t);
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (processedTerm_1_1 && !processedTerm_1_1.done && (_c = processedTerm_1.return)) _c.call(processedTerm_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                        else if (processedTerm) {
                            this.addTerm(fieldId, shortDocumentId, processedTerm);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (tokens_1_1 && !tokens_1_1.done && (_b = tokens_1.return)) _b.call(tokens_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Adds all the given documents to the index
     *
     * @param documents  An array of documents to be indexed
     */
    MiniSearch.prototype.addAll = function (documents) {
        var e_4, _a;
        try {
            for (var documents_1 = __values(documents), documents_1_1 = documents_1.next(); !documents_1_1.done; documents_1_1 = documents_1.next()) {
                var document_1 = documents_1_1.value;
                this.add(document_1);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (documents_1_1 && !documents_1_1.done && (_a = documents_1.return)) _a.call(documents_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    /**
     * Adds all the given documents to the index asynchronously.
     *
     * Returns a promise that resolves (to `undefined`) when the indexing is done.
     * This method is useful when index many documents, to avoid blocking the main
     * thread. The indexing is performed asynchronously and in chunks.
     *
     * @param documents  An array of documents to be indexed
     * @param options  Configuration options
     * @return A promise resolving to `undefined` when the indexing is done
     */
    MiniSearch.prototype.addAllAsync = function (documents, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var _a = options.chunkSize, chunkSize = _a === void 0 ? 10 : _a;
        var acc = { chunk: [], promise: Promise.resolve() };
        var _b = documents.reduce(function (_a, document, i) {
            var chunk = _a.chunk, promise = _a.promise;
            chunk.push(document);
            if ((i + 1) % chunkSize === 0) {
                return {
                    chunk: [],
                    promise: promise
                        .then(function () { return new Promise(function (resolve) { return setTimeout(resolve, 0); }); })
                        .then(function () { return _this.addAll(chunk); })
                };
            }
            else {
                return { chunk: chunk, promise: promise };
            }
        }, acc), chunk = _b.chunk, promise = _b.promise;
        return promise.then(function () { return _this.addAll(chunk); });
    };
    /**
     * Removes the given document from the index.
     *
     * The document to remove must NOT have changed between indexing and removal,
     * otherwise the index will be corrupted.
     *
     * This method requires passing the full document to be removed (not just the
     * ID), and immediately removes the document from the inverted index, allowing
     * memory to be released. A convenient alternative is {@link
     * MiniSearch#discard}, which needs only the document ID, and has the same
     * visible effect, but delays cleaning up the index until the next vacuuming.
     *
     * @param document  The document to be removed
     */
    MiniSearch.prototype.remove = function (document) {
        var e_5, _a, e_6, _b, e_7, _c;
        var _d = this._options, tokenize = _d.tokenize, processTerm = _d.processTerm, extractField = _d.extractField, fields = _d.fields, idField = _d.idField;
        var id = extractField(document, idField);
        if (id == null) {
            throw new Error("MiniSearch: document does not have ID field \"".concat(idField, "\""));
        }
        var shortId = this._idToShortId.get(id);
        if (shortId == null) {
            throw new Error("MiniSearch: cannot remove document with ID ".concat(id, ": it is not in the index"));
        }
        try {
            for (var fields_2 = __values(fields), fields_2_1 = fields_2.next(); !fields_2_1.done; fields_2_1 = fields_2.next()) {
                var field = fields_2_1.value;
                var fieldValue = extractField(document, field);
                if (fieldValue == null)
                    continue;
                var tokens = tokenize(fieldValue.toString(), field);
                var fieldId = this._fieldIds[field];
                var uniqueTerms = new Set(tokens).size;
                this.removeFieldLength(shortId, fieldId, this._documentCount, uniqueTerms);
                try {
                    for (var tokens_2 = (e_6 = void 0, __values(tokens)), tokens_2_1 = tokens_2.next(); !tokens_2_1.done; tokens_2_1 = tokens_2.next()) {
                        var term = tokens_2_1.value;
                        var processedTerm = processTerm(term, field);
                        if (Array.isArray(processedTerm)) {
                            try {
                                for (var processedTerm_2 = (e_7 = void 0, __values(processedTerm)), processedTerm_2_1 = processedTerm_2.next(); !processedTerm_2_1.done; processedTerm_2_1 = processedTerm_2.next()) {
                                    var t = processedTerm_2_1.value;
                                    this.removeTerm(fieldId, shortId, t);
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (processedTerm_2_1 && !processedTerm_2_1.done && (_c = processedTerm_2.return)) _c.call(processedTerm_2);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                        }
                        else if (processedTerm) {
                            this.removeTerm(fieldId, shortId, processedTerm);
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (tokens_2_1 && !tokens_2_1.done && (_b = tokens_2.return)) _b.call(tokens_2);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (fields_2_1 && !fields_2_1.done && (_a = fields_2.return)) _a.call(fields_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        this._storedFields.delete(shortId);
        this._documentIds.delete(shortId);
        this._idToShortId.delete(id);
        this._fieldLength.delete(shortId);
        this._documentCount -= 1;
    };
    /**
     * Removes all the given documents from the index. If called with no arguments,
     * it removes _all_ documents from the index.
     *
     * @param documents  The documents to be removed. If this argument is omitted,
     * all documents are removed. Note that, for removing all documents, it is
     * more efficient to call this method with no arguments than to pass all
     * documents.
     */
    MiniSearch.prototype.removeAll = function (documents) {
        var e_8, _a;
        if (documents) {
            try {
                for (var documents_2 = __values(documents), documents_2_1 = documents_2.next(); !documents_2_1.done; documents_2_1 = documents_2.next()) {
                    var document_2 = documents_2_1.value;
                    this.remove(document_2);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (documents_2_1 && !documents_2_1.done && (_a = documents_2.return)) _a.call(documents_2);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        else if (arguments.length > 0) {
            throw new Error('Expected documents to be present. Omit the argument to remove all documents.');
        }
        else {
            this._index = new SearchableMap();
            this._documentCount = 0;
            this._documentIds = new Map();
            this._idToShortId = new Map();
            this._fieldLength = new Map();
            this._avgFieldLength = [];
            this._storedFields = new Map();
            this._nextId = 0;
        }
    };
    /**
     * Discards the document with the given ID, so it won't appear in search results
     *
     * It has the same visible effect of {@link MiniSearch.remove} (both cause the
     * document to stop appearing in searches), but a different effect on the
     * internal data structures:
     *
     *   - {@link MiniSearch#remove} requires passing the full document to be
     *   removed as argument, and removes it from the inverted index immediately.
     *
     *   - {@link MiniSearch#discard} instead only needs the document ID, and
     *   works by marking the current version of the document as discarded, so it
     *   is immediately ignored by searches. This is faster and more convenient
     *   than {@link MiniSearch#remove}, but the index is not immediately
     *   modified. To take care of that, vacuuming is performed after a certain
     *   number of documents are discarded, cleaning up the index and allowing
     *   memory to be released.
     *
     * After discarding a document, it is possible to re-add a new version, and
     * only the new version will appear in searches. In other words, discarding
     * and re-adding a document works exactly like removing and re-adding it. The
     * {@link MiniSearch.replace} method can also be used to replace a document
     * with a new version.
     *
     * #### Details about vacuuming
     *
     * Repetite calls to this method would leave obsolete document references in
     * the index, invisible to searches. Two mechanisms take care of cleaning up:
     * clean up during search, and vacuuming.
     *
     *   - Upon search, whenever a discarded ID is found (and ignored for the
     *   results), references to the discarded document are removed from the
     *   inverted index entries for the search terms. This ensures that subsequent
     *   searches for the same terms do not need to skip these obsolete references
     *   again.
     *
     *   - In addition, vacuuming is performed automatically by default (see the
     *   `autoVacuum` field in {@link Options}) after a certain number of
     *   documents are discarded. Vacuuming traverses all terms in the index,
     *   cleaning up all references to discarded documents. Vacuuming can also be
     *   triggered manually by calling {@link MiniSearch#vacuum}.
     *
     * @param id  The ID of the document to be discarded
     */
    MiniSearch.prototype.discard = function (id) {
        var _this = this;
        var shortId = this._idToShortId.get(id);
        if (shortId == null) {
            throw new Error("MiniSearch: cannot discard document with ID ".concat(id, ": it is not in the index"));
        }
        this._idToShortId.delete(id);
        this._documentIds.delete(shortId);
        this._storedFields.delete(shortId);
        (this._fieldLength.get(shortId) || []).forEach(function (fieldLength, fieldId) {
            _this.removeFieldLength(shortId, fieldId, _this._documentCount, fieldLength);
        });
        this._fieldLength.delete(shortId);
        this._documentCount -= 1;
        this._dirtCount += 1;
        this.maybeAutoVacuum();
    };
    MiniSearch.prototype.maybeAutoVacuum = function () {
        if (this._options.autoVacuum === false) {
            return;
        }
        var _a = this._options.autoVacuum, minDirtFactor = _a.minDirtFactor, minDirtCount = _a.minDirtCount, batchSize = _a.batchSize, batchWait = _a.batchWait;
        this.conditionalVacuum({ batchSize: batchSize, batchWait: batchWait }, { minDirtCount: minDirtCount, minDirtFactor: minDirtFactor });
    };
    /**
     * Discards the documents with the given IDs, so they won't appear in search
     * results
     *
     * It is equivalent to calling {@link MiniSearch#discard} for all the given
     * IDs, but with the optimization of triggering at most one automatic
     * vacuuming at the end.
     *
     * Note: to remove all documents from the index, it is faster and more
     * convenient to call {@link MiniSearch.removeAll} with no argument, instead
     * of passing all IDs to this method.
     */
    MiniSearch.prototype.discardAll = function (ids) {
        var e_9, _a;
        var autoVacuum = this._options.autoVacuum;
        try {
            this._options.autoVacuum = false;
            try {
                for (var ids_1 = __values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                    var id = ids_1_1.value;
                    this.discard(id);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
        finally {
            this._options.autoVacuum = autoVacuum;
        }
        this.maybeAutoVacuum();
    };
    /**
     * It replaces an existing document with the given updated version
     *
     * It works by discarding the current version and adding the updated one, so
     * it is functionally equivalent to calling {@link MiniSearch#discard}
     * followed by {@link MiniSearch#add}. The ID of the updated document should
     * be the same as the original one.
     *
     * Since it uses {@link MiniSearch#discard} internally, this method relies on
     * vacuuming to clean up obsolete document references from the index, allowing
     * memory to be released (see {@link MiniSearch#discard}).
     *
     * @param updatedDocument  The updated document to replace the old version
     * with
     */
    MiniSearch.prototype.replace = function (updatedDocument) {
        var _a = this._options, idField = _a.idField, extractField = _a.extractField;
        var id = extractField(updatedDocument, idField);
        this.discard(id);
        this.add(updatedDocument);
    };
    /**
     * Triggers a manual vacuuming, cleaning up references to discarded documents
     * from the inverted index
     *
     * Vacuuming is only useful for applications that use the {@link
     * MiniSearch#discard} or {@link MiniSearch#replace} methods.
     *
     * By default, vacuuming is performed automatically when needed (controlled by
     * the `autoVacuum` field in {@link Options}), so there is usually no need to
     * call this method, unless one wants to make sure to perform vacuuming at a
     * specific moment.
     *
     * Vacuuming traverses all terms in the inverted index in batches, and cleans
     * up references to discarded documents from the posting list, allowing memory
     * to be released.
     *
     * The method takes an optional object as argument with the following keys:
     *
     *   - `batchSize`: the size of each batch (1000 by default)
     *
     *   - `batchWait`: the number of milliseconds to wait between batches (10 by
     *   default)
     *
     * On large indexes, vacuuming could have a non-negligible cost: batching
     * avoids blocking the thread for long, diluting this cost so that it is not
     * negatively affecting the application. Nonetheless, this method should only
     * be called when necessary, and relying on automatic vacuuming is usually
     * better.
     *
     * It returns a promise that resolves (to undefined) when the clean up is
     * completed. If vacuuming is already ongoing at the time this method is
     * called, a new one is enqueued immediately after the ongoing one, and a
     * corresponding promise is returned. However, no more than one vacuuming is
     * enqueued on top of the ongoing one, even if this method is called more
     * times (enqueuing multiple ones would be useless).
     *
     * @param options  Configuration options for the batch size and delay. See
     * {@link VacuumOptions}.
     */
    MiniSearch.prototype.vacuum = function (options) {
        if (options === void 0) { options = {}; }
        return this.conditionalVacuum(options);
    };
    MiniSearch.prototype.conditionalVacuum = function (options, conditions) {
        var _this = this;
        // If a vacuum is already ongoing, schedule another as soon as it finishes,
        // unless there's already one enqueued. If one was already enqueued, do not
        // enqueue another on top, but make sure that the conditions are the
        // broadest.
        if (this._currentVacuum) {
            this._enqueuedVacuumConditions = this._enqueuedVacuumConditions && conditions;
            if (this._enqueuedVacuum != null) {
                return this._enqueuedVacuum;
            }
            this._enqueuedVacuum = this._currentVacuum.then(function () {
                var conditions = _this._enqueuedVacuumConditions;
                _this._enqueuedVacuumConditions = defaultVacuumConditions;
                return _this.performVacuuming(options, conditions);
            });
            return this._enqueuedVacuum;
        }
        if (this.vacuumConditionsMet(conditions) === false) {
            return Promise.resolve();
        }
        this._currentVacuum = this.performVacuuming(options);
        return this._currentVacuum;
    };
    MiniSearch.prototype.performVacuuming = function (options, conditions) {
        return __awaiter(this, void 0, void 0, function () {
            var initialDirtCount, batchSize, batchWait_1, i, _a, _b, _c, term, fieldsData, fieldsData_1, fieldsData_1_1, _d, fieldId, fieldIndex, fieldIndex_1, fieldIndex_1_1, _e, shortId, e_10_1;
            var e_10, _f, e_11, _g, e_12, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        initialDirtCount = this._dirtCount;
                        if (!this.vacuumConditionsMet(conditions)) return [3 /*break*/, 10];
                        batchSize = options.batchSize || defaultVacuumOptions.batchSize;
                        batchWait_1 = options.batchWait || defaultVacuumOptions.batchWait;
                        i = 1;
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 7, 8, 9]);
                        _a = __values(this._index), _b = _a.next();
                        _j.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 6];
                        _c = __read(_b.value, 2), term = _c[0], fieldsData = _c[1];
                        try {
                            for (fieldsData_1 = (e_11 = void 0, __values(fieldsData)), fieldsData_1_1 = fieldsData_1.next(); !fieldsData_1_1.done; fieldsData_1_1 = fieldsData_1.next()) {
                                _d = __read(fieldsData_1_1.value, 2), fieldId = _d[0], fieldIndex = _d[1];
                                try {
                                    for (fieldIndex_1 = (e_12 = void 0, __values(fieldIndex)), fieldIndex_1_1 = fieldIndex_1.next(); !fieldIndex_1_1.done; fieldIndex_1_1 = fieldIndex_1.next()) {
                                        _e = __read(fieldIndex_1_1.value, 1), shortId = _e[0];
                                        if (this._documentIds.has(shortId)) {
                                            continue;
                                        }
                                        if (fieldIndex.size <= 1) {
                                            fieldsData.delete(fieldId);
                                        }
                                        else {
                                            fieldIndex.delete(shortId);
                                        }
                                    }
                                }
                                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                                finally {
                                    try {
                                        if (fieldIndex_1_1 && !fieldIndex_1_1.done && (_h = fieldIndex_1.return)) _h.call(fieldIndex_1);
                                    }
                                    finally { if (e_12) throw e_12.error; }
                                }
                            }
                        }
                        catch (e_11_1) { e_11 = { error: e_11_1 }; }
                        finally {
                            try {
                                if (fieldsData_1_1 && !fieldsData_1_1.done && (_g = fieldsData_1.return)) _g.call(fieldsData_1);
                            }
                            finally { if (e_11) throw e_11.error; }
                        }
                        if (this._index.get(term).size === 0) {
                            this._index.delete(term);
                        }
                        if (!(i % batchSize === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, batchWait_1); })];
                    case 3:
                        _j.sent();
                        _j.label = 4;
                    case 4:
                        i += 1;
                        _j.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_10_1 = _j.sent();
                        e_10 = { error: e_10_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_10) throw e_10.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        this._dirtCount -= initialDirtCount;
                        _j.label = 10;
                    case 10: 
                    // Make the next lines always async, so they execute after this function returns
                    return [4 /*yield*/, null];
                    case 11:
                        // Make the next lines always async, so they execute after this function returns
                        _j.sent();
                        this._currentVacuum = this._enqueuedVacuum;
                        this._enqueuedVacuum = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    MiniSearch.prototype.vacuumConditionsMet = function (conditions) {
        if (conditions == null) {
            return true;
        }
        var minDirtCount = conditions.minDirtCount, minDirtFactor = conditions.minDirtFactor;
        minDirtCount = minDirtCount || defaultAutoVacuumOptions.minDirtCount;
        minDirtFactor = minDirtFactor || defaultAutoVacuumOptions.minDirtFactor;
        return this.dirtCount >= minDirtCount && this.dirtFactor >= minDirtFactor;
    };
    Object.defineProperty(MiniSearch.prototype, "isVacuuming", {
        /**
         * Is `true` if a vacuuming operation is ongoing, `false` otherwise
         */
        get: function () {
            return this._currentVacuum != null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MiniSearch.prototype, "dirtCount", {
        /**
         * The number of documents discarded since the most recent vacuuming
         */
        get: function () {
            return this._dirtCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MiniSearch.prototype, "dirtFactor", {
        /**
         * A number between 0 and 1 giving an indication about the proportion of
         * documents that are discarded, and can therefore be cleaned up by vacuuming.
         * A value close to 0 means that the index is relatively clean, while a higher
         * value means that the index is relatively dirty, and vacuuming could release
         * memory.
         */
        get: function () {
            return this._dirtCount / (1 + this._documentCount + this._dirtCount);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns `true` if a document with the given ID is present in the index and
     * available for search, `false` otherwise
     *
     * @param id  The document ID
     */
    MiniSearch.prototype.has = function (id) {
        return this._idToShortId.has(id);
    };
    /**
     * Returns the stored fields (as configured in the `storeFields` constructor
     * option) for the given document ID. Returns `undefined` if the document is
     * not present in the index.
     *
     * @param id  The document ID
     */
    MiniSearch.prototype.getStoredFields = function (id) {
        var shortId = this._idToShortId.get(id);
        if (shortId == null) {
            return undefined;
        }
        return this._storedFields.get(shortId);
    };
    /**
     * Search for documents matching the given search query.
     *
     * The result is a list of scored document IDs matching the query, sorted by
     * descending score, and each including data about which terms were matched and
     * in which fields.
     *
     * ### Basic usage:
     *
     * ```javascript
     * // Search for "zen art motorcycle" with default options: terms have to match
     * // exactly, and individual terms are joined with OR
     * miniSearch.search('zen art motorcycle')
     * // => [ { id: 2, score: 2.77258, match: { ... } }, { id: 4, score: 1.38629, match: { ... } } ]
     * ```
     *
     * ### Restrict search to specific fields:
     *
     * ```javascript
     * // Search only in the 'title' field
     * miniSearch.search('zen', { fields: ['title'] })
     * ```
     *
     * ### Field boosting:
     *
     * ```javascript
     * // Boost a field
     * miniSearch.search('zen', { boost: { title: 2 } })
     * ```
     *
     * ### Prefix search:
     *
     * ```javascript
     * // Search for "moto" with prefix search (it will match documents
     * // containing terms that start with "moto" or "neuro")
     * miniSearch.search('moto neuro', { prefix: true })
     * ```
     *
     * ### Fuzzy search:
     *
     * ```javascript
     * // Search for "ismael" with fuzzy search (it will match documents containing
     * // terms similar to "ismael", with a maximum edit distance of 0.2 term.length
     * // (rounded to nearest integer)
     * miniSearch.search('ismael', { fuzzy: 0.2 })
     * ```
     *
     * ### Combining strategies:
     *
     * ```javascript
     * // Mix of exact match, prefix search, and fuzzy search
     * miniSearch.search('ismael mob', {
     *  prefix: true,
     *  fuzzy: 0.2
     * })
     * ```
     *
     * ### Advanced prefix and fuzzy search:
     *
     * ```javascript
     * // Perform fuzzy and prefix search depending on the search term. Here
     * // performing prefix and fuzzy search only on terms longer than 3 characters
     * miniSearch.search('ismael mob', {
     *  prefix: term => term.length > 3
     *  fuzzy: term => term.length > 3 ? 0.2 : null
     * })
     * ```
     *
     * ### Combine with AND:
     *
     * ```javascript
     * // Combine search terms with AND (to match only documents that contain both
     * // "motorcycle" and "art")
     * miniSearch.search('motorcycle art', { combineWith: 'AND' })
     * ```
     *
     * ### Combine with AND_NOT:
     *
     * There is also an AND_NOT combinator, that finds documents that match the
     * first term, but do not match any of the other terms. This combinator is
     * rarely useful with simple queries, and is meant to be used with advanced
     * query combinations (see later for more details).
     *
     * ### Filtering results:
     *
     * ```javascript
     * // Filter only results in the 'fiction' category (assuming that 'category'
     * // is a stored field)
     * miniSearch.search('motorcycle art', {
     *   filter: (result) => result.category === 'fiction'
     * })
     * ```
     *
     * ### Wildcard query
     *
     * Searching for an empty string (assuming the default tokenizer) returns no
     * results. Sometimes though, one needs to match all documents, like in a
     * "wildcard" search. This is possible by passing the special value
     * {@link MiniSearch.wildcard} as the query:
     *
     * ```javascript
     * // Return search results for all documents
     * miniSearch.search(MiniSearch.wildcard)
     * ```
     *
     * Note that search options such as `filter` and `boostDocument` are still
     * applied, influencing which results are returned, and their order:
     *
     * ```javascript
     * // Return search results for all documents in the 'fiction' category
     * miniSearch.search(MiniSearch.wildcard, {
     *   filter: (result) => result.category === 'fiction'
     * })
     * ```
     *
     * ### Advanced combination of queries:
     *
     * It is possible to combine different subqueries with OR, AND, and AND_NOT,
     * and even with different search options, by passing a query expression
     * tree object as the first argument, instead of a string.
     *
     * ```javascript
     * // Search for documents that contain "zen" and ("motorcycle" or "archery")
     * miniSearch.search({
     *   combineWith: 'AND',
     *   queries: [
     *     'zen',
     *     {
     *       combineWith: 'OR',
     *       queries: ['motorcycle', 'archery']
     *     }
     *   ]
     * })
     *
     * // Search for documents that contain ("apple" or "pear") but not "juice" and
     * // not "tree"
     * miniSearch.search({
     *   combineWith: 'AND_NOT',
     *   queries: [
     *     {
     *       combineWith: 'OR',
     *       queries: ['apple', 'pear']
     *     },
     *     'juice',
     *     'tree'
     *   ]
     * })
     * ```
     *
     * Each node in the expression tree can be either a string, or an object that
     * supports all {@link SearchOptions} fields, plus a `queries` array field for
     * subqueries.
     *
     * Note that, while this can become complicated to do by hand for complex or
     * deeply nested queries, it provides a formalized expression tree API for
     * external libraries that implement a parser for custom query languages.
     *
     * @param query  Search query
     * @param options  Search options. Each option, if not given, defaults to the corresponding value of `searchOptions` given to the constructor, or to the library default.
     */
    MiniSearch.prototype.search = function (query, searchOptions) {
        var e_13, _a;
        if (searchOptions === void 0) { searchOptions = {}; }
        var rawResults = this.executeQuery(query, searchOptions);
        var results = [];
        try {
            for (var rawResults_1 = __values(rawResults), rawResults_1_1 = rawResults_1.next(); !rawResults_1_1.done; rawResults_1_1 = rawResults_1.next()) {
                var _b = __read(rawResults_1_1.value, 2), docId = _b[0], _c = _b[1], score = _c.score, terms = _c.terms, match = _c.match;
                // terms are the matched query terms, which will be returned to the user
                // as queryTerms. The quality is calculated based on them, as opposed to
                // the matched terms in the document (which can be different due to
                // prefix and fuzzy match)
                var quality = terms.length || 1;
                var result = {
                    id: this._documentIds.get(docId),
                    score: score * quality,
                    terms: Object.keys(match),
                    queryTerms: terms,
                    match: match
                };
                Object.assign(result, this._storedFields.get(docId));
                if (searchOptions.filter == null || searchOptions.filter(result)) {
                    results.push(result);
                }
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (rawResults_1_1 && !rawResults_1_1.done && (_a = rawResults_1.return)) _a.call(rawResults_1);
            }
            finally { if (e_13) throw e_13.error; }
        }
        // If it's a wildcard query, and no document boost is applied, skip sorting
        // the results, as all results have the same score of 1
        if (query === MiniSearch.wildcard &&
            searchOptions.boostDocument == null &&
            this._options.searchOptions.boostDocument == null) {
            return results;
        }
        results.sort(byScore);
        return results;
    };
    /**
     * Provide suggestions for the given search query
     *
     * The result is a list of suggested modified search queries, derived from the
     * given search query, each with a relevance score, sorted by descending score.
     *
     * By default, it uses the same options used for search, except that by
     * default it performs prefix search on the last term of the query, and
     * combine terms with `'AND'` (requiring all query terms to match). Custom
     * options can be passed as a second argument. Defaults can be changed upon
     * calling the {@link MiniSearch} constructor, by passing a
     * `autoSuggestOptions` option.
     *
     * ### Basic usage:
     *
     * ```javascript
     * // Get suggestions for 'neuro':
     * miniSearch.autoSuggest('neuro')
     * // => [ { suggestion: 'neuromancer', terms: [ 'neuromancer' ], score: 0.46240 } ]
     * ```
     *
     * ### Multiple words:
     *
     * ```javascript
     * // Get suggestions for 'zen ar':
     * miniSearch.autoSuggest('zen ar')
     * // => [
     * //  { suggestion: 'zen archery art', terms: [ 'zen', 'archery', 'art' ], score: 1.73332 },
     * //  { suggestion: 'zen art', terms: [ 'zen', 'art' ], score: 1.21313 }
     * // ]
     * ```
     *
     * ### Fuzzy suggestions:
     *
     * ```javascript
     * // Correct spelling mistakes using fuzzy search:
     * miniSearch.autoSuggest('neromancer', { fuzzy: 0.2 })
     * // => [ { suggestion: 'neuromancer', terms: [ 'neuromancer' ], score: 1.03998 } ]
     * ```
     *
     * ### Filtering:
     *
     * ```javascript
     * // Get suggestions for 'zen ar', but only within the 'fiction' category
     * // (assuming that 'category' is a stored field):
     * miniSearch.autoSuggest('zen ar', {
     *   filter: (result) => result.category === 'fiction'
     * })
     * // => [
     * //  { suggestion: 'zen archery art', terms: [ 'zen', 'archery', 'art' ], score: 1.73332 },
     * //  { suggestion: 'zen art', terms: [ 'zen', 'art' ], score: 1.21313 }
     * // ]
     * ```
     *
     * @param queryString  Query string to be expanded into suggestions
     * @param options  Search options. The supported options and default values
     * are the same as for the {@link MiniSearch#search} method, except that by
     * default prefix search is performed on the last term in the query, and terms
     * are combined with `'AND'`.
     * @return  A sorted array of suggestions sorted by relevance score.
     */
    MiniSearch.prototype.autoSuggest = function (queryString, options) {
        var e_14, _a, e_15, _b;
        if (options === void 0) { options = {}; }
        options = __assign(__assign({}, this._options.autoSuggestOptions), options);
        var suggestions = new Map();
        try {
            for (var _c = __values(this.search(queryString, options)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = _d.value, score = _e.score, terms = _e.terms;
                var phrase = terms.join(' ');
                var suggestion = suggestions.get(phrase);
                if (suggestion != null) {
                    suggestion.score += score;
                    suggestion.count += 1;
                }
                else {
                    suggestions.set(phrase, { score: score, terms: terms, count: 1 });
                }
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_14) throw e_14.error; }
        }
        var results = [];
        try {
            for (var suggestions_1 = __values(suggestions), suggestions_1_1 = suggestions_1.next(); !suggestions_1_1.done; suggestions_1_1 = suggestions_1.next()) {
                var _f = __read(suggestions_1_1.value, 2), suggestion = _f[0], _g = _f[1], score = _g.score, terms = _g.terms, count = _g.count;
                results.push({ suggestion: suggestion, terms: terms, score: score / count });
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (suggestions_1_1 && !suggestions_1_1.done && (_b = suggestions_1.return)) _b.call(suggestions_1);
            }
            finally { if (e_15) throw e_15.error; }
        }
        results.sort(byScore);
        return results;
    };
    Object.defineProperty(MiniSearch.prototype, "documentCount", {
        /**
         * Total number of documents available to search
         */
        get: function () {
            return this._documentCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MiniSearch.prototype, "termCount", {
        /**
         * Number of terms in the index
         */
        get: function () {
            return this._index.size;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Deserializes a JSON index (serialized with `JSON.stringify(miniSearch)`)
     * and instantiates a MiniSearch instance. It should be given the same options
     * originally used when serializing the index.
     *
     * ### Usage:
     *
     * ```javascript
     * // If the index was serialized with:
     * let miniSearch = new MiniSearch({ fields: ['title', 'text'] })
     * miniSearch.addAll(documents)
     *
     * const json = JSON.stringify(miniSearch)
     * // It can later be deserialized like this:
     * miniSearch = MiniSearch.loadJSON(json, { fields: ['title', 'text'] })
     * ```
     *
     * @param json  JSON-serialized index
     * @param options  configuration options, same as the constructor
     * @return An instance of MiniSearch deserialized from the given JSON.
     */
    MiniSearch.loadJSON = function (json, options) {
        if (options == null) {
            throw new Error('MiniSearch: loadJSON should be given the same options used when serializing the index');
        }
        return this.loadJS(JSON.parse(json), options);
    };
    /**
     * Returns the default value of an option. It will throw an error if no option
     * with the given name exists.
     *
     * @param optionName  Name of the option
     * @return The default value of the given option
     *
     * ### Usage:
     *
     * ```javascript
     * // Get default tokenizer
     * MiniSearch.getDefault('tokenize')
     *
     * // Get default term processor
     * MiniSearch.getDefault('processTerm')
     *
     * // Unknown options will throw an error
     * MiniSearch.getDefault('notExisting')
     * // => throws 'MiniSearch: unknown option "notExisting"'
     * ```
     */
    MiniSearch.getDefault = function (optionName) {
        if (defaultOptions.hasOwnProperty(optionName)) {
            return getOwnProperty(defaultOptions, optionName);
        }
        else {
            throw new Error("MiniSearch: unknown option \"".concat(optionName, "\""));
        }
    };
    /**
     * @ignore
     */
    MiniSearch.loadJS = function (js, options) {
        var e_16, _a, e_17, _b, e_18, _c;
        var index = js.index, documentCount = js.documentCount, nextId = js.nextId, documentIds = js.documentIds, fieldIds = js.fieldIds, fieldLength = js.fieldLength, averageFieldLength = js.averageFieldLength, storedFields = js.storedFields, dirtCount = js.dirtCount, serializationVersion = js.serializationVersion;
        if (serializationVersion !== 1 && serializationVersion !== 2) {
            throw new Error('MiniSearch: cannot deserialize an index created with an incompatible version');
        }
        var miniSearch = new MiniSearch(options);
        miniSearch._documentCount = documentCount;
        miniSearch._nextId = nextId;
        miniSearch._documentIds = objectToNumericMap(documentIds);
        miniSearch._idToShortId = new Map();
        miniSearch._fieldIds = fieldIds;
        miniSearch._fieldLength = objectToNumericMap(fieldLength);
        miniSearch._avgFieldLength = averageFieldLength;
        miniSearch._storedFields = objectToNumericMap(storedFields);
        miniSearch._dirtCount = dirtCount || 0;
        miniSearch._index = new SearchableMap();
        try {
            for (var _d = __values(miniSearch._documentIds), _e = _d.next(); !_e.done; _e = _d.next()) {
                var _f = __read(_e.value, 2), shortId = _f[0], id = _f[1];
                miniSearch._idToShortId.set(id, shortId);
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_16) throw e_16.error; }
        }
        try {
            for (var index_1 = __values(index), index_1_1 = index_1.next(); !index_1_1.done; index_1_1 = index_1.next()) {
                var _g = __read(index_1_1.value, 2), term = _g[0], data = _g[1];
                var dataMap = new Map();
                try {
                    for (var _h = (e_18 = void 0, __values(Object.keys(data))), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var fieldId = _j.value;
                        var indexEntry = data[fieldId];
                        // Version 1 used to nest the index entry inside a field called ds
                        if (serializationVersion === 1) {
                            indexEntry = indexEntry.ds;
                        }
                        dataMap.set(parseInt(fieldId, 10), objectToNumericMap(indexEntry));
                    }
                }
                catch (e_18_1) { e_18 = { error: e_18_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_18) throw e_18.error; }
                }
                miniSearch._index.set(term, dataMap);
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (index_1_1 && !index_1_1.done && (_b = index_1.return)) _b.call(index_1);
            }
            finally { if (e_17) throw e_17.error; }
        }
        return miniSearch;
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.executeQuery = function (query, searchOptions) {
        var _this = this;
        if (searchOptions === void 0) { searchOptions = {}; }
        if (query === MiniSearch.wildcard) {
            return this.executeWildcardQuery(searchOptions);
        }
        if (typeof query !== 'string') {
            var options_1 = __assign(__assign(__assign({}, searchOptions), query), { queries: undefined });
            var results_1 = query.queries.map(function (subquery) { return _this.executeQuery(subquery, options_1); });
            return this.combineResults(results_1, options_1.combineWith);
        }
        var _a = this._options, tokenize = _a.tokenize, processTerm = _a.processTerm, globalSearchOptions = _a.searchOptions;
        var options = __assign(__assign({ tokenize: tokenize, processTerm: processTerm }, globalSearchOptions), searchOptions);
        var searchTokenize = options.tokenize, searchProcessTerm = options.processTerm;
        var terms = searchTokenize(query)
            .flatMap(function (term) { return searchProcessTerm(term); })
            .filter(function (term) { return !!term; });
        var queries = terms.map(termToQuerySpec(options));
        var results = queries.map(function (query) { return _this.executeQuerySpec(query, options); });
        return this.combineResults(results, options.combineWith);
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.executeQuerySpec = function (query, searchOptions) {
        var e_19, _a, e_20, _b;
        var options = __assign(__assign({}, this._options.searchOptions), searchOptions);
        var boosts = (options.fields || this._options.fields).reduce(function (boosts, field) {
            var _a;
            return (__assign(__assign({}, boosts), (_a = {}, _a[field] = getOwnProperty(options.boost, field) || 1, _a)));
        }, {});
        var boostDocument = options.boostDocument, weights = options.weights, maxFuzzy = options.maxFuzzy, bm25params = options.bm25;
        var _c = __assign(__assign({}, defaultSearchOptions.weights), weights), fuzzyWeight = _c.fuzzy, prefixWeight = _c.prefix;
        var data = this._index.get(query.term);
        var results = this.termResults(query.term, query.term, 1, data, boosts, boostDocument, bm25params);
        var prefixMatches;
        var fuzzyMatches;
        if (query.prefix) {
            prefixMatches = this._index.atPrefix(query.term);
        }
        if (query.fuzzy) {
            var fuzzy = (query.fuzzy === true) ? 0.2 : query.fuzzy;
            var maxDistance = fuzzy < 1 ? Math.min(maxFuzzy, Math.round(query.term.length * fuzzy)) : fuzzy;
            if (maxDistance)
                fuzzyMatches = this._index.fuzzyGet(query.term, maxDistance);
        }
        if (prefixMatches) {
            try {
                for (var prefixMatches_1 = __values(prefixMatches), prefixMatches_1_1 = prefixMatches_1.next(); !prefixMatches_1_1.done; prefixMatches_1_1 = prefixMatches_1.next()) {
                    var _d = __read(prefixMatches_1_1.value, 2), term = _d[0], data_1 = _d[1];
                    var distance = term.length - query.term.length;
                    if (!distance) {
                        continue;
                    } // Skip exact match.
                    // Delete the term from fuzzy results (if present) if it is also a
                    // prefix result. This entry will always be scored as a prefix result.
                    fuzzyMatches === null || fuzzyMatches === void 0 ? void 0 : fuzzyMatches.delete(term);
                    // Weight gradually approaches 0 as distance goes to infinity, with the
                    // weight for the hypothetical distance 0 being equal to prefixWeight.
                    // The rate of change is much lower than that of fuzzy matches to
                    // account for the fact that prefix matches stay more relevant than
                    // fuzzy matches for longer distances.
                    var weight = prefixWeight * term.length / (term.length + 0.3 * distance);
                    this.termResults(query.term, term, weight, data_1, boosts, boostDocument, bm25params, results);
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (prefixMatches_1_1 && !prefixMatches_1_1.done && (_a = prefixMatches_1.return)) _a.call(prefixMatches_1);
                }
                finally { if (e_19) throw e_19.error; }
            }
        }
        if (fuzzyMatches) {
            try {
                for (var _e = __values(fuzzyMatches.keys()), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var term = _f.value;
                    var _g = __read(fuzzyMatches.get(term), 2), data_2 = _g[0], distance = _g[1];
                    if (!distance) {
                        continue;
                    } // Skip exact match.
                    // Weight gradually approaches 0 as distance goes to infinity, with the
                    // weight for the hypothetical distance 0 being equal to fuzzyWeight.
                    var weight = fuzzyWeight * term.length / (term.length + distance);
                    this.termResults(query.term, term, weight, data_2, boosts, boostDocument, bm25params, results);
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_20) throw e_20.error; }
            }
        }
        return results;
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.executeWildcardQuery = function (searchOptions) {
        var e_21, _a;
        var results = new Map();
        var options = __assign(__assign({}, this._options.searchOptions), searchOptions);
        try {
            for (var _b = __values(this._documentIds), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), shortId = _d[0], id = _d[1];
                var score = options.boostDocument ? options.boostDocument(id, '', this._storedFields.get(shortId)) : 1;
                results.set(shortId, {
                    score: score,
                    terms: [],
                    match: {}
                });
            }
        }
        catch (e_21_1) { e_21 = { error: e_21_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_21) throw e_21.error; }
        }
        return results;
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.combineResults = function (results, combineWith) {
        if (combineWith === void 0) { combineWith = OR; }
        if (results.length === 0) {
            return new Map();
        }
        var operator = combineWith.toLowerCase();
        return results.reduce(combinators[operator]) || new Map();
    };
    /**
     * Allows serialization of the index to JSON, to possibly store it and later
     * deserialize it with {@link MiniSearch.loadJSON}.
     *
     * Normally one does not directly call this method, but rather call the
     * standard JavaScript `JSON.stringify()` passing the {@link MiniSearch}
     * instance, and JavaScript will internally call this method. Upon
     * deserialization, one must pass to {@link MiniSearch.loadJSON} the same
     * options used to create the original instance that was serialized.
     *
     * ### Usage:
     *
     * ```javascript
     * // Serialize the index:
     * let miniSearch = new MiniSearch({ fields: ['title', 'text'] })
     * miniSearch.addAll(documents)
     * const json = JSON.stringify(miniSearch)
     *
     * // Later, to deserialize it:
     * miniSearch = MiniSearch.loadJSON(json, { fields: ['title', 'text'] })
     * ```
     *
     * @return A plain-object serializable representation of the search index.
     */
    MiniSearch.prototype.toJSON = function () {
        var e_22, _a, e_23, _b;
        var index = [];
        try {
            for (var _c = __values(this._index), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), term = _e[0], fieldIndex = _e[1];
                var data = {};
                try {
                    for (var fieldIndex_2 = (e_23 = void 0, __values(fieldIndex)), fieldIndex_2_1 = fieldIndex_2.next(); !fieldIndex_2_1.done; fieldIndex_2_1 = fieldIndex_2.next()) {
                        var _f = __read(fieldIndex_2_1.value, 2), fieldId = _f[0], freqs = _f[1];
                        data[fieldId] = Object.fromEntries(freqs);
                    }
                }
                catch (e_23_1) { e_23 = { error: e_23_1 }; }
                finally {
                    try {
                        if (fieldIndex_2_1 && !fieldIndex_2_1.done && (_b = fieldIndex_2.return)) _b.call(fieldIndex_2);
                    }
                    finally { if (e_23) throw e_23.error; }
                }
                index.push([term, data]);
            }
        }
        catch (e_22_1) { e_22 = { error: e_22_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_22) throw e_22.error; }
        }
        return {
            documentCount: this._documentCount,
            nextId: this._nextId,
            documentIds: Object.fromEntries(this._documentIds),
            fieldIds: this._fieldIds,
            fieldLength: Object.fromEntries(this._fieldLength),
            averageFieldLength: this._avgFieldLength,
            storedFields: Object.fromEntries(this._storedFields),
            dirtCount: this._dirtCount,
            index: index,
            serializationVersion: 2
        };
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.termResults = function (sourceTerm, derivedTerm, termWeight, fieldTermData, fieldBoosts, boostDocumentFn, bm25params, results) {
        var e_24, _a, e_25, _b, _c;
        if (results === void 0) { results = new Map(); }
        if (fieldTermData == null)
            return results;
        try {
            for (var _d = __values(Object.keys(fieldBoosts)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var field = _e.value;
                var fieldBoost = fieldBoosts[field];
                var fieldId = this._fieldIds[field];
                var fieldTermFreqs = fieldTermData.get(fieldId);
                if (fieldTermFreqs == null)
                    continue;
                var matchingFields = fieldTermFreqs.size;
                var avgFieldLength = this._avgFieldLength[fieldId];
                try {
                    for (var _f = (e_25 = void 0, __values(fieldTermFreqs.keys())), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var docId = _g.value;
                        if (!this._documentIds.has(docId)) {
                            this.removeTerm(fieldId, docId, derivedTerm);
                            matchingFields -= 1;
                            continue;
                        }
                        var docBoost = boostDocumentFn ? boostDocumentFn(this._documentIds.get(docId), derivedTerm, this._storedFields.get(docId)) : 1;
                        if (!docBoost)
                            continue;
                        var termFreq = fieldTermFreqs.get(docId);
                        var fieldLength = this._fieldLength.get(docId)[fieldId];
                        // NOTE: The total number of fields is set to the number of documents
                        // `this._documentCount`. It could also make sense to use the number of
                        // documents where the current field is non-blank as a normalization
                        // factor. This will make a difference in scoring if the field is rarely
                        // present. This is currently not supported, and may require further
                        // analysis to see if it is a valid use case.
                        var rawScore = calcBM25Score(termFreq, matchingFields, this._documentCount, fieldLength, avgFieldLength, bm25params);
                        var weightedScore = termWeight * fieldBoost * docBoost * rawScore;
                        var result = results.get(docId);
                        if (result) {
                            result.score += weightedScore;
                            assignUniqueTerm(result.terms, sourceTerm);
                            var match = getOwnProperty(result.match, derivedTerm);
                            if (match) {
                                match.push(field);
                            }
                            else {
                                result.match[derivedTerm] = [field];
                            }
                        }
                        else {
                            results.set(docId, {
                                score: weightedScore,
                                terms: [sourceTerm],
                                match: (_c = {}, _c[derivedTerm] = [field], _c)
                            });
                        }
                    }
                }
                catch (e_25_1) { e_25 = { error: e_25_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_25) throw e_25.error; }
                }
            }
        }
        catch (e_24_1) { e_24 = { error: e_24_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_24) throw e_24.error; }
        }
        return results;
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.addTerm = function (fieldId, documentId, term) {
        var indexData = this._index.fetch(term, createMap);
        var fieldIndex = indexData.get(fieldId);
        if (fieldIndex == null) {
            fieldIndex = new Map();
            fieldIndex.set(documentId, 1);
            indexData.set(fieldId, fieldIndex);
        }
        else {
            var docs = fieldIndex.get(documentId);
            fieldIndex.set(documentId, (docs || 0) + 1);
        }
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.removeTerm = function (fieldId, documentId, term) {
        if (!this._index.has(term)) {
            this.warnDocumentChanged(documentId, fieldId, term);
            return;
        }
        var indexData = this._index.fetch(term, createMap);
        var fieldIndex = indexData.get(fieldId);
        if (fieldIndex == null || fieldIndex.get(documentId) == null) {
            this.warnDocumentChanged(documentId, fieldId, term);
        }
        else if (fieldIndex.get(documentId) <= 1) {
            if (fieldIndex.size <= 1) {
                indexData.delete(fieldId);
            }
            else {
                fieldIndex.delete(documentId);
            }
        }
        else {
            fieldIndex.set(documentId, fieldIndex.get(documentId) - 1);
        }
        if (this._index.get(term).size === 0) {
            this._index.delete(term);
        }
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.warnDocumentChanged = function (shortDocumentId, fieldId, term) {
        var e_26, _a;
        try {
            for (var _b = __values(Object.keys(this._fieldIds)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var fieldName = _c.value;
                if (this._fieldIds[fieldName] === fieldId) {
                    this._options.logger('warn', "MiniSearch: document with ID ".concat(this._documentIds.get(shortDocumentId), " has changed before removal: term \"").concat(term, "\" was not present in field \"").concat(fieldName, "\". Removing a document after it has changed can corrupt the index!"), 'version_conflict');
                    return;
                }
            }
        }
        catch (e_26_1) { e_26 = { error: e_26_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_26) throw e_26.error; }
        }
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.addDocumentId = function (documentId) {
        var shortDocumentId = this._nextId;
        this._idToShortId.set(documentId, shortDocumentId);
        this._documentIds.set(shortDocumentId, documentId);
        this._documentCount += 1;
        this._nextId += 1;
        return shortDocumentId;
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.addFields = function (fields) {
        for (var i = 0; i < fields.length; i++) {
            this._fieldIds[fields[i]] = i;
        }
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.addFieldLength = function (documentId, fieldId, count, length) {
        var fieldLengths = this._fieldLength.get(documentId);
        if (fieldLengths == null)
            this._fieldLength.set(documentId, fieldLengths = []);
        fieldLengths[fieldId] = length;
        var averageFieldLength = this._avgFieldLength[fieldId] || 0;
        var totalFieldLength = (averageFieldLength * count) + length;
        this._avgFieldLength[fieldId] = totalFieldLength / (count + 1);
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.removeFieldLength = function (documentId, fieldId, count, length) {
        if (count === 1) {
            this._avgFieldLength[fieldId] = 0;
            return;
        }
        var totalFieldLength = (this._avgFieldLength[fieldId] * count) - length;
        this._avgFieldLength[fieldId] = totalFieldLength / (count - 1);
    };
    /**
     * @ignore
     */
    MiniSearch.prototype.saveStoredFields = function (documentId, doc) {
        var e_27, _a;
        var _b = this._options, storeFields = _b.storeFields, extractField = _b.extractField;
        if (storeFields == null || storeFields.length === 0) {
            return;
        }
        var documentFields = this._storedFields.get(documentId);
        if (documentFields == null)
            this._storedFields.set(documentId, documentFields = {});
        try {
            for (var storeFields_1 = __values(storeFields), storeFields_1_1 = storeFields_1.next(); !storeFields_1_1.done; storeFields_1_1 = storeFields_1.next()) {
                var fieldName = storeFields_1_1.value;
                var fieldValue = extractField(doc, fieldName);
                if (fieldValue !== undefined)
                    documentFields[fieldName] = fieldValue;
            }
        }
        catch (e_27_1) { e_27 = { error: e_27_1 }; }
        finally {
            try {
                if (storeFields_1_1 && !storeFields_1_1.done && (_a = storeFields_1.return)) _a.call(storeFields_1);
            }
            finally { if (e_27) throw e_27.error; }
        }
    };
    /**
     * The special wildcard symbol that can be passed to {@link MiniSearch#search}
     * to match all documents
     */
    MiniSearch.wildcard = Symbol('*');
    return MiniSearch;
}());
var getOwnProperty = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property) ? object[property] : undefined;
};
var combinators = (_a = {},
    _a[OR] = function (a, b) {
        var e_28, _a;
        try {
            for (var _b = __values(b.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var docId = _c.value;
                var existing = a.get(docId);
                if (existing == null) {
                    a.set(docId, b.get(docId));
                }
                else {
                    var _d = b.get(docId), score = _d.score, terms = _d.terms, match = _d.match;
                    existing.score = existing.score + score;
                    existing.match = Object.assign(existing.match, match);
                    assignUniqueTerms(existing.terms, terms);
                }
            }
        }
        catch (e_28_1) { e_28 = { error: e_28_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_28) throw e_28.error; }
        }
        return a;
    },
    _a[AND] = function (a, b) {
        var e_29, _a;
        var combined = new Map();
        try {
            for (var _b = __values(b.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var docId = _c.value;
                var existing = a.get(docId);
                if (existing == null)
                    continue;
                var _d = b.get(docId), score = _d.score, terms = _d.terms, match = _d.match;
                assignUniqueTerms(existing.terms, terms);
                combined.set(docId, {
                    score: existing.score + score,
                    terms: existing.terms,
                    match: Object.assign(existing.match, match)
                });
            }
        }
        catch (e_29_1) { e_29 = { error: e_29_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_29) throw e_29.error; }
        }
        return combined;
    },
    _a[AND_NOT] = function (a, b) {
        var e_30, _a;
        try {
            for (var _b = __values(b.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var docId = _c.value;
                a.delete(docId);
            }
        }
        catch (e_30_1) { e_30 = { error: e_30_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_30) throw e_30.error; }
        }
        return a;
    },
    _a);
var defaultBM25params = { k: 1.2, b: 0.7, d: 0.5 };
var calcBM25Score = function (termFreq, matchingCount, totalCount, fieldLength, avgFieldLength, bm25params) {
    var k = bm25params.k, b = bm25params.b, d = bm25params.d;
    var invDocFreq = Math.log(1 + (totalCount - matchingCount + 0.5) / (matchingCount + 0.5));
    return invDocFreq * (d + termFreq * (k + 1) / (termFreq + k * (1 - b + b * fieldLength / avgFieldLength)));
};
var termToQuerySpec = function (options) { return function (term, i, terms) {
    var fuzzy = (typeof options.fuzzy === 'function')
        ? options.fuzzy(term, i, terms)
        : (options.fuzzy || false);
    var prefix = (typeof options.prefix === 'function')
        ? options.prefix(term, i, terms)
        : (options.prefix === true);
    return { term: term, fuzzy: fuzzy, prefix: prefix };
}; };
var defaultOptions = {
    idField: 'id',
    extractField: function (document, fieldName) { return document[fieldName]; },
    tokenize: function (text) { return text.split(SPACE_OR_PUNCTUATION); },
    processTerm: function (term) { return term.toLowerCase(); },
    fields: undefined,
    searchOptions: undefined,
    storeFields: [],
    logger: function (level, message) {
        if (typeof (console === null || console === void 0 ? void 0 : console[level]) === 'function')
            console[level](message);
    },
    autoVacuum: true
};
var defaultSearchOptions = {
    combineWith: OR,
    prefix: false,
    fuzzy: false,
    maxFuzzy: 6,
    boost: {},
    weights: { fuzzy: 0.45, prefix: 0.375 },
    bm25: defaultBM25params
};
var defaultAutoSuggestOptions = {
    combineWith: AND,
    prefix: function (term, i, terms) {
        return i === terms.length - 1;
    }
};
var defaultVacuumOptions = { batchSize: 1000, batchWait: 10 };
var defaultVacuumConditions = { minDirtFactor: 0.1, minDirtCount: 20 };
var defaultAutoVacuumOptions = __assign(__assign({}, defaultVacuumOptions), defaultVacuumConditions);
var assignUniqueTerm = function (target, term) {
    // Avoid adding duplicate terms.
    if (!target.includes(term))
        target.push(term);
};
var assignUniqueTerms = function (target, source) {
    var e_31, _a;
    try {
        for (var source_1 = __values(source), source_1_1 = source_1.next(); !source_1_1.done; source_1_1 = source_1.next()) {
            var term = source_1_1.value;
            // Avoid adding duplicate terms.
            if (!target.includes(term))
                target.push(term);
        }
    }
    catch (e_31_1) { e_31 = { error: e_31_1 }; }
    finally {
        try {
            if (source_1_1 && !source_1_1.done && (_a = source_1.return)) _a.call(source_1);
        }
        finally { if (e_31) throw e_31.error; }
    }
};
var byScore = function (_a, _b) {
    var a = _a.score;
    var b = _b.score;
    return b - a;
};
var createMap = function () { return new Map(); };
var objectToNumericMap = function (object) {
    var e_32, _a;
    var map = new Map();
    try {
        for (var _b = __values(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            map.set(parseInt(key, 10), object[key]);
        }
    }
    catch (e_32_1) { e_32 = { error: e_32_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_32) throw e_32.error; }
    }
    return map;
};
// This regular expression matches any Unicode space or punctuation character
// Adapted from https://unicode.org/cldr/utility/list-unicodeset.jsp?a=%5Cp%7BZ%7D%5Cp%7BP%7D&abb=on&c=on&esc=on
var SPACE_OR_PUNCTUATION = /[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u;


//# sourceMappingURL=index.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LOCAL_INDEX_ID: () => (/* binding */ LOCAL_INDEX_ID)
/* harmony export */ });
/* harmony import */ var minisearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! minisearch */ "./node_modules/minisearch/dist/es/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/**
 * Constants
 * --------------------------
 * LOCAL_INDEX_ID: Key for storing the search index in Chrome's local storage
 */
var LOCAL_INDEX_ID = 'localSearchIndex';

/**
 * Debug Utilities
 * --------------
 * Functions for debugging and development.
 */
function exportStorageToFile() {
  console.log('Starting export...');
  chrome.storage.local.get(LOCAL_INDEX_ID, function (data) {
    console.log('Retrieved data:', data);
    var jsonString = JSON.stringify(data, null, 2);
    var dataUrl = "data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(jsonString))));
    chrome.downloads.download({
      url: dataUrl,
      filename: 'hawk_index_backup.json',
      saveAs: true
    }, function (downloadId) {
      console.log('Download started with ID:', downloadId);
    });
  });
}

// Make export function available globally
globalThis.exportIndex = exportStorageToFile;

// Also add to chrome object for service worker context
chrome.exportIndex = exportStorageToFile;

/**
 * Search Index Management
 * ----------------------
 * Handles creating, loading, and maintaining the search index.
 */
var createIndex = function createIndex(existingIndex) {
  var stopWords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'];
  var indexDescriptor = {
    fields: ['title', 'allText'],
    storeFields: ['title'],
    idField: 'id',
    processTerm: function processTerm(term, _fieldName) {
      return stopWords.includes(term) ? null : term.toLowerCase();
    },
    searchOptions: {
      processTerm: function processTerm(term) {
        return term.toLowerCase();
      }
    }
  };
  var indexer;
  if (existingIndex === undefined) {
    indexer = new minisearch__WEBPACK_IMPORTED_MODULE_0__["default"](indexDescriptor);
  } else {
    indexer = minisearch__WEBPACK_IMPORTED_MODULE_0__["default"].loadJSON(existingIndex, indexDescriptor);
  }
  return indexer;
};

/**
 * Storage Interface
 * ----------------
 * Manages reading/writing the index from Chrome's local storage.
 */
var getStoredIndex = function getStoredIndex(cb) {
  chrome.storage.local.get(LOCAL_INDEX_ID, function (data) {
    cb(data[LOCAL_INDEX_ID]);
  });
};
var storeIndex = function storeIndex(indexData) {
  var data = _defineProperty({}, LOCAL_INDEX_ID, indexData);
  chrome.storage.local.set(data, function () {
    console.log("Index data saved[".concat(data.length, "]"));
  });
};

/**
 * Index Access and Manipulation
 * ---------------------------
 * Functions for retrieving, adding, and updating indexed documents.
 */
var getIndex = function getIndex() {
  if (!chrome.indexer) {
    initialiseIndexer();
  }
  return chrome.indexer;
};

/**
 * TODO: Implement this function to replace the indexer data
 */
var replaceIndexerData = function replaceIndexerData() {};
var addToIndex = function addToIndex(document) {
  var idx = getIndex();
  if (idx) {
    console.time("Indexing Doc:".concat(document.id));
    if (idx.has(document.id)) {
      idx.replace(document);
      console.log('Replacing doc in the index');
    } else {
      idx.add(document);
      console.log('Adding new doc in the index');
    }
    console.timeEnd("Indexing Doc:".concat(document.id));
    console.time('Storing the whole Index');
    var data = JSON.stringify(idx);
    storeIndex(data);
    console.timeEnd('Storing the whole Index');
  }
};

/**
 * Search and Results Processing
 * ---------------------------
 * Handles querying the index and formatting results.
 */
var search = function search(document, options) {
  var idx = getIndex();
  return idx.search(document);
};
var sendResults = function sendResults(searchQuery, sendResponse) {
  var searchResults = search(searchQuery, null);
  var suggestions = [];
  for (var i = 0; i < searchResults.length && i < 5; i++) {
    suggestions.push({
      content: searchResults[i].id,
      description: removeSpecialCharacters(searchResults[i].title)
    });
    console.log({
      content: searchResults[i].id,
      description: searchResults[i].title
    });
  }
  console.log("numbers of suggestions:".concat(suggestions.length));
  sendResponse(suggestions);
};

/**
 * Message Handling
 * ---------------
 * Processes messages from content scripts and the popup.
 */
var indexingListener = function indexingListener(request, sender, sendResponse) {
  if (request.from === 'popup' && request.subject === 'indexerData') {
    sendResponse(chrome.storedIndex);
  } else if (request.from === 'popup' && request.subject === 'setIndexerData') {
    var isSuccessful = replaceIndexerData(request.content);
  } else if (request.action === 'exportIndex') {
    exportStorageToFile();
    sendResponse({
      status: 'exporting'
    });
  } else {
    addToIndex(request.document);
    sendResponse('OK:Indexed');
  }
};

/**
 * Initialization
 * -------------
 * Sets up the extension and search indexer.
 */
var initialiseIndexer = function initialiseIndexer() {
  var initialiseIndexerAsync = function initialiseIndexerAsync(indexerData) {
    if (indexerData && indexerData.length > 0) {
      chrome.storedIndex = indexerData;
    }
    chrome.indexer = createIndex(chrome.storedIndex);
  };
  getStoredIndex(initialiseIndexerAsync);
};

/**
 * Utility Functions
 * ----------------
 */
var removeSpecialCharacters = function removeSpecialCharacters(stringToBeSanitized) {
  var specialChars = '!@#$^&%*+=[]/{}|:<>?,.';
  var sanitizedString = stringToBeSanitized; // ✅ Create a new variable
  for (var i = 0; i < specialChars.length; i++) {
    sanitizedString = sanitizedString.replace(new RegExp("\\".concat(specialChars[i]), 'gi'), '');
  }
  return sanitizedString;
};

// Initialize extension and set up listeners
initialiseIndexer();
chrome.runtime.onMessage.addListener(indexingListener);
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  sendResults(text, suggest);
});
chrome.omnibox.onInputEntered.addListener(function (text, OnInputEnteredDisposition) {
  chrome.tabs.update({
    url: text
  });
});
function deleteTask(allTasks, taskIdToRemove) {
  var updatedTasks = Object.fromEntries(Object.entries(allTasks).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      taskId = _ref2[0];
    return taskId !== taskIdToRemove;
  }));
  var finalTasks = Object.keys(updatedTasks).length === 0 ? {} : updatedTasks; // ✅ Create new variable

  chrome.storage.local.set({
    tasks: finalTasks
  }, function () {});
}
chrome.alarms.onAlarm.addListener(function (alarm) {
  var alarmName = alarm.name;
  if (alarmName.endsWith('_deletion_alarm')) {
    var taskId = alarmName.split('_')[0];
    chrome.storage.local.get({
      tasks: {}
    }, function (result) {
      var existingTasks = result.tasks || {};
      deleteTask(existingTasks, taskId);
    });
  }
});
chrome.alarms.onAlarm.addListener(function (alarm) {
  chrome.storage.local.get('tasks').then(function (result) {
    var existingTasks = result || {};
    var foundTask = existingTasks.tasks[alarm.name];
    if (Object.keys(existingTasks).length !== 0 && foundTask && !foundTask.recentlyDeleted) {
      var notification = {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('../images/logo128x128.png'),
        title: "Your task ".concat(foundTask.title, " is due"),
        message: foundTask.description
      };
      chrome.notifications.create(alarm.name, notification);
    }
  });
});
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === 'add-note') {
    alert('You clicked the custom menu item!');
  }
});
function createContextMenu() {
  chrome.contextMenus.create({
    id: 'addNote',
    title: 'Hawk 2 - Add text to Notes',
    contexts: ['selection']
  });
}
function setDueDate(daysToAdd) {
  var dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + daysToAdd); // Add days based on the input
  return dueDate.toISOString();
}
function addNewNote(title, content, tags) {
  var noteId = Date.now().toString();
  var note = {
    id: noteId,
    title: title,
    content: content,
    due: setDueDate(7),
    scheduledDeletion: '',
    recentlyDeleted: false,
    tags: tags
  };
  chrome.storage.local.get({
    notes: []
  }, function (data) {
    var existingNotes = data.notes;
    existingNotes.push(note);
    chrome.storage.local.set({
      notes: existingNotes
    }, function () {});
  });
}

// Listen for when the tab's url changes and send a message to popup.js
/* eslint-disable no-unused-vars */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    chrome.runtime.sendMessage({
      type: 'URL_UPDATED',
      url: changeInfo.url
    });
  }
});
/* eslint-enable no-unused-vars */

// Listen for when the user changes tabs and send a message to popup.js
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    if (tab && tab.url) {
      chrome.runtime.sendMessage({
        type: 'TAB_CHANGED',
        url: tab.url
      });
    }
  });
});
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === 'addNote') {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      var currentTitle = tabs[0].title;
      var selectedText = "".concat(currentTitle, " ").concat(info.selectionText);
      var title = selectedText.length > 10 ? "".concat(selectedText.substring(0, 15), "...") : selectedText;
      addNewNote(title, selectedText, {});
    });
  }
});
chrome.runtime.onInstalled.addListener(function () {
  createContextMenu();
});
chrome.runtime.onInstalled.addListener(function () {
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true
  })["catch"](console.error);
});
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'themeColorChanged') {
    // Broadcast theme change to all extension pages
    chrome.runtime.sendMessage({
      type: 'applyTheme',
      color: message.color
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IscUJBQXFCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscUJBQXFCO0FBQ3ZDO0FBQ0Esc0RBQXNEO0FBQ3RELHNCQUFzQixxQkFBcUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixtQkFBbUI7QUFDdkc7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixxQkFBcUI7QUFDdkM7QUFDQSxpREFBaUQ7QUFDakQsc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsVUFBVTtBQUN2RTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxVQUFVO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsd0JBQXdCO0FBQ3JEO0FBQ0EsaUZBQWlGLFVBQVU7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksa0JBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0dBQWdHO0FBQzFHLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsMkJBQTJCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsMkNBQTJDO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FB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QUFNakcsS0FBSyxHQUFHZ0csWUFBWSxDQUFDekgsTUFBTSxHQUFHLEVBQUUsTUFBQWxDLE1BQUEsQ0FBTTJKLFlBQVksQ0FBQ0UsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsV0FBUUYsWUFBWTtNQUM3RnJCLFVBQVUsQ0FBQzNFLEtBQUssRUFBRWdHLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUM7RUFDSjtBQUNGLENBQUMsQ0FBQztBQUVGcEssTUFBTSxDQUFDb0YsT0FBTyxDQUFDbUYsV0FBVyxDQUFDakYsV0FBVyxDQUFDLFlBQU07RUFDM0NnRCxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQztBQUVGdEksTUFBTSxDQUFDb0YsT0FBTyxDQUFDbUYsV0FBVyxDQUFDakYsV0FBVyxDQUFDLFlBQU07RUFDM0N0RixNQUFNLENBQUN3SyxTQUFTLENBQUNDLGdCQUFnQixDQUFDO0lBQUVDLHNCQUFzQixFQUFFO0VBQUssQ0FBQyxDQUFDLFNBQU0sQ0FBQzVLLE9BQU8sQ0FBQzZLLEtBQUssQ0FBQztBQUMxRixDQUFDLENBQUM7QUFFRjNLLE1BQU0sQ0FBQ29GLE9BQU8sQ0FBQ0MsU0FBUyxDQUFDQyxXQUFXLENBQUMsVUFBQ3dDLE9BQU8sRUFBRXZELE1BQU0sRUFBRVgsWUFBWSxFQUFLO0VBQ3RFLElBQUlrRSxPQUFPLENBQUNILElBQUksS0FBSyxtQkFBbUIsRUFBRTtJQUN4QztJQUNBM0gsTUFBTSxDQUFDb0YsT0FBTyxDQUFDeUUsV0FBVyxDQUFDO01BQ3pCbEMsSUFBSSxFQUFFLFlBQVk7TUFDbEJpRCxLQUFLLEVBQUU5QyxPQUFPLENBQUM4QztJQUNqQixDQUFDLENBQUM7RUFDSjtBQUNGLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGF3ay8uL25vZGVfbW9kdWxlcy9taW5pc2VhcmNoL2Rpc3QvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vaGF3ay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oYXdrL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9oYXdrL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaGF3ay93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hhd2svLi9zcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wgKi9cclxuXHJcblxyXG52YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbnR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xuXG4vKiogQGlnbm9yZSAqL1xudmFyIEVOVFJJRVMgPSAnRU5UUklFUyc7XG4vKiogQGlnbm9yZSAqL1xudmFyIEtFWVMgPSAnS0VZUyc7XG4vKiogQGlnbm9yZSAqL1xudmFyIFZBTFVFUyA9ICdWQUxVRVMnO1xuLyoqIEBpZ25vcmUgKi9cbnZhciBMRUFGID0gJyc7XG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBUcmVlSXRlcmF0b3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVHJlZUl0ZXJhdG9yKHNldCwgdHlwZSkge1xuICAgICAgICB2YXIgbm9kZSA9IHNldC5fdHJlZTtcbiAgICAgICAgdmFyIGtleXMgPSBBcnJheS5mcm9tKG5vZGUua2V5cygpKTtcbiAgICAgICAgdGhpcy5zZXQgPSBzZXQ7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9wYXRoID0ga2V5cy5sZW5ndGggPiAwID8gW3sgbm9kZTogbm9kZSwga2V5czoga2V5cyB9XSA6IFtdO1xuICAgIH1cbiAgICBUcmVlSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZGl2ZSgpO1xuICAgICAgICB0aGlzLmJhY2t0cmFjaygpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBUcmVlSXRlcmF0b3IucHJvdG90eXBlLmRpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IHVuZGVmaW5lZCB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IGxhc3QkMSh0aGlzLl9wYXRoKSwgbm9kZSA9IF9hLm5vZGUsIGtleXMgPSBfYS5rZXlzO1xuICAgICAgICBpZiAobGFzdCQxKGtleXMpID09PSBMRUFGKSB7XG4gICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IHRoaXMucmVzdWx0KCkgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGQgPSBub2RlLmdldChsYXN0JDEoa2V5cykpO1xuICAgICAgICB0aGlzLl9wYXRoLnB1c2goeyBub2RlOiBjaGlsZCwga2V5czogQXJyYXkuZnJvbShjaGlsZC5rZXlzKCkpIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5kaXZlKCk7XG4gICAgfTtcbiAgICBUcmVlSXRlcmF0b3IucHJvdG90eXBlLmJhY2t0cmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleXMgPSBsYXN0JDEodGhpcy5fcGF0aCkua2V5cztcbiAgICAgICAga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BhdGgucG9wKCk7XG4gICAgICAgIHRoaXMuYmFja3RyYWNrKCk7XG4gICAgfTtcbiAgICBUcmVlSXRlcmF0b3IucHJvdG90eXBlLmtleSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0Ll9wcmVmaXggKyB0aGlzLl9wYXRoXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIGtleXMgPSBfYS5rZXlzO1xuICAgICAgICAgICAgcmV0dXJuIGxhc3QkMShrZXlzKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4ga2V5ICE9PSBMRUFGOyB9KVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgIH07XG4gICAgVHJlZUl0ZXJhdG9yLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGxhc3QkMSh0aGlzLl9wYXRoKS5ub2RlLmdldChMRUFGKTtcbiAgICB9O1xuICAgIFRyZWVJdGVyYXRvci5wcm90b3R5cGUucmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX3R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gdGhpcy52YWx1ZSgpO1xuICAgICAgICAgICAgY2FzZSBLRVlTOiByZXR1cm4gdGhpcy5rZXkoKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBbdGhpcy5rZXkoKSwgdGhpcy52YWx1ZSgpXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVHJlZUl0ZXJhdG9yLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBUcmVlSXRlcmF0b3I7XG59KCkpO1xudmFyIGxhc3QkMSA9IGZ1bmN0aW9uIChhcnJheSkge1xuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbn07XG5cbi8qKlxuICogQGlnbm9yZVxuICovXG52YXIgZnV6enlTZWFyY2ggPSBmdW5jdGlvbiAobm9kZSwgcXVlcnksIG1heERpc3RhbmNlKSB7XG4gICAgdmFyIHJlc3VsdHMgPSBuZXcgTWFwKCk7XG4gICAgaWYgKHF1ZXJ5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIC8vIE51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBMZXZlbnNodGVpbiBtYXRyaXguXG4gICAgdmFyIG4gPSBxdWVyeS5sZW5ndGggKyAxO1xuICAgIC8vIE1hdGNoaW5nIHRlcm1zIGNhbiBuZXZlciBiZSBsb25nZXIgdGhhbiBOICsgbWF4RGlzdGFuY2UuXG4gICAgdmFyIG0gPSBuICsgbWF4RGlzdGFuY2U7XG4gICAgLy8gRmlsbCBmaXJzdCBtYXRyaXggcm93IGFuZCBjb2x1bW4gd2l0aCBudW1iZXJzOiAwIDEgMiAzIC4uLlxuICAgIHZhciBtYXRyaXggPSBuZXcgVWludDhBcnJheShtICogbikuZmlsbChtYXhEaXN0YW5jZSArIDEpO1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgbjsgKytqKVxuICAgICAgICBtYXRyaXhbal0gPSBqO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbTsgKytpKVxuICAgICAgICBtYXRyaXhbaSAqIG5dID0gaTtcbiAgICByZWN1cnNlKG5vZGUsIHF1ZXJ5LCBtYXhEaXN0YW5jZSwgcmVzdWx0cywgbWF0cml4LCAxLCBuLCAnJyk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59O1xuLy8gTW9kaWZpZWQgdmVyc2lvbiBvZiBodHRwOi8vc3RldmVoYW5vdi5jYS9ibG9nLz9pZD0xMTRcbi8vIFRoaXMgYnVpbGRzIGEgTGV2ZW5zaHRlaW4gbWF0cml4IGZvciBhIGdpdmVuIHF1ZXJ5IGFuZCBjb250aW51b3VzbHkgdXBkYXRlc1xuLy8gaXQgZm9yIG5vZGVzIGluIHRoZSByYWRpeCB0cmVlIHRoYXQgZmFsbCB3aXRoaW4gdGhlIGdpdmVuIG1heGltdW0gZWRpdFxuLy8gZGlzdGFuY2UuIEtlZXBpbmcgdGhlIHNhbWUgbWF0cml4IGFyb3VuZCBpcyBiZW5lZmljaWFsIGVzcGVjaWFsbHkgZm9yIGxhcmdlclxuLy8gZWRpdCBkaXN0YW5jZXMuXG4vL1xuLy8gICAgICAgICAgIGsgICBhICAgdCAgIGUgICA8LS0gcXVlcnlcbi8vICAgICAgIDAgICAxICAgMiAgIDMgICA0XG4vLyAgIGMgICAxICAgMSAgIDIgICAzICAgNFxuLy8gICBhICAgMiAgIDIgICAxICAgMiAgIDNcbi8vICAgdCAgIDMgICAzICAgMiAgIDEgIFsyXSAgPC0tIGVkaXQgZGlzdGFuY2Vcbi8vICAgXlxuLy8gICBeIHRlcm0gaW4gcmFkaXggdHJlZSwgcm93cyBhcmUgYWRkZWQgYW5kIHJlbW92ZWQgYXMgbmVlZGVkXG52YXIgcmVjdXJzZSA9IGZ1bmN0aW9uIChub2RlLCBxdWVyeSwgbWF4RGlzdGFuY2UsIHJlc3VsdHMsIG1hdHJpeCwgbSwgbiwgcHJlZml4KSB7XG4gICAgdmFyIGVfMSwgX2E7XG4gICAgdmFyIG9mZnNldCA9IG0gKiBuO1xuICAgIHRyeSB7XG4gICAgICAgIGtleTogZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhub2RlLmtleXMoKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IExFQUYpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSd2ZSByZWFjaGVkIGEgbGVhZiBub2RlLiBDaGVjayBpZiB0aGUgZWRpdCBkaXN0YW5jZSBhY2NlcHRhYmxlIGFuZFxuICAgICAgICAgICAgICAgIC8vIHN0b3JlIHRoZSByZXN1bHQgaWYgaXQgaXMuXG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gbWF0cml4W29mZnNldCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8PSBtYXhEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnNldChwcmVmaXgsIFtub2RlLmdldChrZXkpLCBkaXN0YW5jZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBhbGwgY2hhcmFjdGVycyBpbiB0aGUga2V5LiBVcGRhdGUgdGhlIExldmVuc2h0ZWluIG1hdHJpeFxuICAgICAgICAgICAgICAgIC8vIGFuZCBjaGVjayBpZiB0aGUgbWluaW11bSBkaXN0YW5jZSBpbiB0aGUgbGFzdCByb3cgaXMgc3RpbGwgd2l0aGluIHRoZVxuICAgICAgICAgICAgICAgIC8vIG1heGltdW0gZWRpdCBkaXN0YW5jZS4gSWYgaXQgaXMsIHdlIGNhbiByZWN1cnNlIG92ZXIgYWxsIGNoaWxkIG5vZGVzLlxuICAgICAgICAgICAgICAgIHZhciBpID0gbTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwb3MgPSAwOyBwb3MgPCBrZXkubGVuZ3RoOyArK3BvcywgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFyID0ga2V5W3Bvc107XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzUm93T2Zmc2V0ID0gbiAqIGk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2Um93T2Zmc2V0ID0gdGhpc1Jvd09mZnNldCAtIG47XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgZmlyc3QgY29sdW1uIGJhc2VkIG9uIHRoZSBwcmV2aW91cyByb3csIGFuZCBpbml0aWFsaXplIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBtaW5pbXVtIGRpc3RhbmNlIGluIHRoZSBjdXJyZW50IHJvdy5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbkRpc3RhbmNlID0gbWF0cml4W3RoaXNSb3dPZmZzZXRdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgam1pbiA9IE1hdGgubWF4KDAsIGkgLSBtYXhEaXN0YW5jZSAtIDEpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgam1heCA9IE1hdGgubWluKG4gLSAxLCBpICsgbWF4RGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAvLyBJdGVyYXRlIG92ZXIgcmVtYWluaW5nIGNvbHVtbnMgKGNoYXJhY3RlcnMgaW4gdGhlIHF1ZXJ5KS5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IGptaW47IGogPCBqbWF4OyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWZmZXJlbnQgPSBjaGFyICE9PSBxdWVyeVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEl0IG1pZ2h0IG1ha2Ugc2Vuc2UgdG8gb25seSByZWFkIHRoZSBtYXRyaXggcG9zaXRpb25zIHVzZWQgZm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGlvbi9pbnNlcnRpb24gaWYgdGhlIGNoYXJhY3RlcnMgYXJlIGRpZmZlcmVudC4gQnV0IHdlIHdhbnQgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF2b2lkIGNvbmRpdGlvbmFsIHJlYWRzIGZvciBwZXJmb3JtYW5jZSByZWFzb25zLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJwbCA9IG1hdHJpeFtwcmV2Um93T2Zmc2V0ICsgal0gKyArZGlmZmVyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbCA9IG1hdHJpeFtwcmV2Um93T2Zmc2V0ICsgaiArIDFdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnMgPSBtYXRyaXhbdGhpc1Jvd09mZnNldCArIGpdICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXN0ID0gbWF0cml4W3RoaXNSb3dPZmZzZXQgKyBqICsgMV0gPSBNYXRoLm1pbihycGwsIGRlbCwgaW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgbWluRGlzdGFuY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGlzdGFuY2UgPSBkaXN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIEJlY2F1c2UgZGlzdGFuY2Ugd2lsbCBuZXZlciBkZWNyZWFzZSwgd2UgY2FuIHN0b3AuIFRoZXJlIHdpbGwgYmUgbm9cbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hpbmcgY2hpbGQgbm9kZXMuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtaW5EaXN0YW5jZSA+IG1heERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVjdXJzZShub2RlLmdldChrZXkpLCBxdWVyeSwgbWF4RGlzdGFuY2UsIHJlc3VsdHMsIG1hdHJpeCwgaSwgbiwgcHJlZml4ICsga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICB9XG59O1xuXG4vKipcbiAqIEEgY2xhc3MgaW1wbGVtZW50aW5nIHRoZSBzYW1lIGludGVyZmFjZSBhcyBhIHN0YW5kYXJkIEphdmFTY3JpcHRcbiAqIFtgTWFwYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwKVxuICogd2l0aCBzdHJpbmcga2V5cywgYnV0IGFkZGluZyBzdXBwb3J0IGZvciBlZmZpY2llbnRseSBzZWFyY2hpbmcgZW50cmllcyB3aXRoXG4gKiBwcmVmaXggb3IgZnV6enkgc2VhcmNoLiBUaGlzIGNsYXNzIGlzIHVzZWQgaW50ZXJuYWxseSBieSB7QGxpbmsgTWluaVNlYXJjaH1cbiAqIGFzIHRoZSBpbnZlcnRlZCBpbmRleCBkYXRhIHN0cnVjdHVyZS4gVGhlIGltcGxlbWVudGF0aW9uIGlzIGEgcmFkaXggdHJlZVxuICogKGNvbXByZXNzZWQgcHJlZml4IHRyZWUpLlxuICpcbiAqIFNpbmNlIHRoaXMgY2xhc3MgY2FuIGJlIG9mIGdlbmVyYWwgdXRpbGl0eSBiZXlvbmQgX01pbmlTZWFyY2hfLCBpdCBpc1xuICogZXhwb3J0ZWQgYnkgdGhlIGBtaW5pc2VhcmNoYCBwYWNrYWdlIGFuZCBjYW4gYmUgaW1wb3J0ZWQgKG9yIHJlcXVpcmVkKSBhc1xuICogYG1pbmlzZWFyY2gvU2VhcmNoYWJsZU1hcGAuXG4gKlxuICogQHR5cGVQYXJhbSBUICBUaGUgdHlwZSBvZiB0aGUgdmFsdWVzIHN0b3JlZCBpbiB0aGUgbWFwLlxuICovXG52YXIgU2VhcmNoYWJsZU1hcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgaXMgbm9ybWFsbHkgY2FsbGVkIHdpdGhvdXQgYXJndW1lbnRzLCBjcmVhdGluZyBhbiBlbXB0eVxuICAgICAqIG1hcC4gSW4gb3JkZXIgdG8gY3JlYXRlIGEge0BsaW5rIFNlYXJjaGFibGVNYXB9IGZyb20gYW4gaXRlcmFibGUgb3IgZnJvbSBhblxuICAgICAqIG9iamVjdCwgY2hlY2sge0BsaW5rIFNlYXJjaGFibGVNYXAuZnJvbX0gYW5kIHtAbGlua1xuICAgICAqIFNlYXJjaGFibGVNYXAuZnJvbU9iamVjdH0uXG4gICAgICpcbiAgICAgKiBUaGUgY29uc3RydWN0b3IgYXJndW1lbnRzIGFyZSBmb3IgaW50ZXJuYWwgdXNlLCB3aGVuIGNyZWF0aW5nIGRlcml2ZWRcbiAgICAgKiBtdXRhYmxlIHZpZXdzIG9mIGEgbWFwIGF0IGEgcHJlZml4LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFNlYXJjaGFibGVNYXAodHJlZSwgcHJlZml4KSB7XG4gICAgICAgIGlmICh0cmVlID09PSB2b2lkIDApIHsgdHJlZSA9IG5ldyBNYXAoKTsgfVxuICAgICAgICBpZiAocHJlZml4ID09PSB2b2lkIDApIHsgcHJlZml4ID0gJyc7IH1cbiAgICAgICAgdGhpcy5fc2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fdHJlZSA9IHRyZWU7XG4gICAgICAgIHRoaXMuX3ByZWZpeCA9IHByZWZpeDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG11dGFibGUgdmlldyBvZiB0aGlzIHtAbGluayBTZWFyY2hhYmxlTWFwfSxcbiAgICAgKiBjb250YWluaW5nIG9ubHkgZW50cmllcyB0aGF0IHNoYXJlIHRoZSBnaXZlbiBwcmVmaXguXG4gICAgICpcbiAgICAgKiAjIyMgVXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogbGV0IG1hcCA9IG5ldyBTZWFyY2hhYmxlTWFwKClcbiAgICAgKiBtYXAuc2V0KFwidW5pY29yblwiLCAxKVxuICAgICAqIG1hcC5zZXQoXCJ1bml2ZXJzZVwiLCAyKVxuICAgICAqIG1hcC5zZXQoXCJ1bml2ZXJzaXR5XCIsIDMpXG4gICAgICogbWFwLnNldChcInVuaXF1ZVwiLCA0KVxuICAgICAqIG1hcC5zZXQoXCJoZWxsb1wiLCA1KVxuICAgICAqXG4gICAgICogbGV0IHVuaSA9IG1hcC5hdFByZWZpeChcInVuaVwiKVxuICAgICAqIHVuaS5nZXQoXCJ1bmlxdWVcIikgLy8gPT4gNFxuICAgICAqIHVuaS5nZXQoXCJ1bmljb3JuXCIpIC8vID0+IDFcbiAgICAgKiB1bmkuZ2V0KFwiaGVsbG9cIikgLy8gPT4gdW5kZWZpbmVkXG4gICAgICpcbiAgICAgKiBsZXQgdW5pdmVyID0gbWFwLmF0UHJlZml4KFwidW5pdmVyXCIpXG4gICAgICogdW5pdmVyLmdldChcInVuaXF1ZVwiKSAvLyA9PiB1bmRlZmluZWRcbiAgICAgKiB1bml2ZXIuZ2V0KFwidW5pdmVyc2VcIikgLy8gPT4gMlxuICAgICAqIHVuaXZlci5nZXQoXCJ1bml2ZXJzaXR5XCIpIC8vID0+IDNcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcmVmaXggIFRoZSBwcmVmaXhcbiAgICAgKiBAcmV0dXJuIEEge0BsaW5rIFNlYXJjaGFibGVNYXB9IHJlcHJlc2VudGluZyBhIG11dGFibGUgdmlldyBvZiB0aGUgb3JpZ2luYWxcbiAgICAgKiBNYXAgYXQgdGhlIGdpdmVuIHByZWZpeFxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLmF0UHJlZml4ID0gZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgaWYgKCFwcmVmaXguc3RhcnRzV2l0aCh0aGlzLl9wcmVmaXgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc21hdGNoZWQgcHJlZml4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9iID0gX19yZWFkKHRyYWNrRG93bih0aGlzLl90cmVlLCBwcmVmaXguc2xpY2UodGhpcy5fcHJlZml4Lmxlbmd0aCkpLCAyKSwgbm9kZSA9IF9iWzBdLCBwYXRoID0gX2JbMV07XG4gICAgICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBfYyA9IF9fcmVhZChsYXN0KHBhdGgpLCAyKSwgcGFyZW50Tm9kZSA9IF9jWzBdLCBrZXkgPSBfY1sxXTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2QgPSBfX3ZhbHVlcyhwYXJlbnROb2RlLmtleXMoKSksIF9lID0gX2QubmV4dCgpOyAhX2UuZG9uZTsgX2UgPSBfZC5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGsgPSBfZS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgIT09IExFQUYgJiYgay5zdGFydHNXaXRoKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlXzEgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlXzEuc2V0KGsuc2xpY2Uoa2V5Lmxlbmd0aCksIHBhcmVudE5vZGUuZ2V0KGspKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgU2VhcmNoYWJsZU1hcChub2RlXzEsIHByZWZpeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9lICYmICFfZS5kb25lICYmIChfYSA9IF9kLnJldHVybikpIF9hLmNhbGwoX2QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBTZWFyY2hhYmxlTWFwKG5vZGUsIHByZWZpeCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9jbGVhclxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zaXplID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl90cmVlLmNsZWFyKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9kZWxldGVcbiAgICAgKiBAcGFyYW0ga2V5ICBLZXkgdG8gZGVsZXRlXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB0aGlzLl9zaXplID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gcmVtb3ZlKHRoaXMuX3RyZWUsIGtleSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9lbnRyaWVzXG4gICAgICogQHJldHVybiBBbiBpdGVyYXRvciBpdGVyYXRpbmcgdGhyb3VnaCBgW2tleSwgdmFsdWVdYCBlbnRyaWVzLlxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVHJlZUl0ZXJhdG9yKHRoaXMsIEVOVFJJRVMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvZm9yRWFjaFxuICAgICAqIEBwYXJhbSBmbiAgSXRlcmF0aW9uIGZ1bmN0aW9uXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICB2YXIgZV8yLCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2QgPSBfX3JlYWQoX2MudmFsdWUsIDIpLCBrZXkgPSBfZFswXSwgdmFsdWUgPSBfZFsxXTtcbiAgICAgICAgICAgICAgICBmbihrZXksIHZhbHVlLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgTWFwIG9mIGFsbCB0aGUgZW50cmllcyB0aGF0IGhhdmUgYSBrZXkgd2l0aGluIHRoZSBnaXZlbiBlZGl0XG4gICAgICogZGlzdGFuY2UgZnJvbSB0aGUgc2VhcmNoIGtleS4gVGhlIGtleXMgb2YgdGhlIHJldHVybmVkIE1hcCBhcmUgdGhlIG1hdGNoaW5nXG4gICAgICoga2V5cywgd2hpbGUgdGhlIHZhbHVlcyBhcmUgdHdvLWVsZW1lbnQgYXJyYXlzIHdoZXJlIHRoZSBmaXJzdCBlbGVtZW50IGlzXG4gICAgICogdGhlIHZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGtleSwgYW5kIHRoZSBzZWNvbmQgaXMgdGhlIGVkaXQgZGlzdGFuY2Ugb2YgdGhlXG4gICAgICoga2V5IHRvIHRoZSBzZWFyY2gga2V5LlxuICAgICAqXG4gICAgICogIyMjIFVzYWdlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIGxldCBtYXAgPSBuZXcgU2VhcmNoYWJsZU1hcCgpXG4gICAgICogbWFwLnNldCgnaGVsbG8nLCAnd29ybGQnKVxuICAgICAqIG1hcC5zZXQoJ2hlbGwnLCAneWVhaCcpXG4gICAgICogbWFwLnNldCgnY2lhbycsICdtb25kbycpXG4gICAgICpcbiAgICAgKiAvLyBHZXQgYWxsIGVudHJpZXMgdGhhdCBtYXRjaCB0aGUga2V5ICdoYWxsbycgd2l0aCBhIG1heGltdW0gZWRpdCBkaXN0YW5jZSBvZiAyXG4gICAgICogbWFwLmZ1enp5R2V0KCdoYWxsbycsIDIpXG4gICAgICogLy8gPT4gTWFwKDIpIHsgJ2hlbGxvJyA9PiBbJ3dvcmxkJywgMV0sICdoZWxsJyA9PiBbJ3llYWgnLCAyXSB9XG4gICAgICpcbiAgICAgKiAvLyBJbiB0aGUgZXhhbXBsZSwgdGhlIFwiaGVsbG9cIiBrZXkgaGFzIHZhbHVlIFwid29ybGRcIiBhbmQgZWRpdCBkaXN0YW5jZSBvZiAxXG4gICAgICogLy8gKGNoYW5nZSBcImVcIiB0byBcImFcIiksIHRoZSBrZXkgXCJoZWxsXCIgaGFzIHZhbHVlIFwieWVhaFwiIGFuZCBlZGl0IGRpc3RhbmNlIG9mIDJcbiAgICAgKiAvLyAoY2hhbmdlIFwiZVwiIHRvIFwiYVwiLCBkZWxldGUgXCJvXCIpXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5ICBUaGUgc2VhcmNoIGtleVxuICAgICAqIEBwYXJhbSBtYXhFZGl0RGlzdGFuY2UgIFRoZSBtYXhpbXVtIGVkaXQgZGlzdGFuY2UgKExldmVuc2h0ZWluKVxuICAgICAqIEByZXR1cm4gQSBNYXAgb2YgdGhlIG1hdGNoaW5nIGtleXMgdG8gdGhlaXIgdmFsdWUgYW5kIGVkaXQgZGlzdGFuY2VcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5mdXp6eUdldCA9IGZ1bmN0aW9uIChrZXksIG1heEVkaXREaXN0YW5jZSkge1xuICAgICAgICByZXR1cm4gZnV6enlTZWFyY2godGhpcy5fdHJlZSwga2V5LCBtYXhFZGl0RGlzdGFuY2UpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvZ2V0XG4gICAgICogQHBhcmFtIGtleSAgS2V5IHRvIGdldFxuICAgICAqIEByZXR1cm4gVmFsdWUgYXNzb2NpYXRlZCB0byB0aGUga2V5LCBvciBgdW5kZWZpbmVkYCBpZiB0aGUga2V5IGlzIG5vdFxuICAgICAqIGZvdW5kLlxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBsb29rdXAodGhpcy5fdHJlZSwga2V5KTtcbiAgICAgICAgcmV0dXJuIG5vZGUgIT09IHVuZGVmaW5lZCA/IG5vZGUuZ2V0KExFQUYpIDogdW5kZWZpbmVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvaGFzXG4gICAgICogQHBhcmFtIGtleSAgS2V5XG4gICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBrZXkgaXMgaW4gdGhlIG1hcCwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgbm9kZSA9IGxvb2t1cCh0aGlzLl90cmVlLCBrZXkpO1xuICAgICAgICByZXR1cm4gbm9kZSAhPT0gdW5kZWZpbmVkICYmIG5vZGUuaGFzKExFQUYpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAva2V5c1xuICAgICAqIEByZXR1cm4gQW4gYEl0ZXJhYmxlYCBpdGVyYXRpbmcgdGhyb3VnaCBrZXlzXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcmVlSXRlcmF0b3IodGhpcywgS0VZUyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9zZXRcbiAgICAgKiBAcGFyYW0ga2V5ICBLZXkgdG8gc2V0XG4gICAgICogQHBhcmFtIHZhbHVlICBWYWx1ZSB0byBhc3NvY2lhdGUgdG8gdGhlIGtleVxuICAgICAqIEByZXR1cm4gVGhlIHtAbGluayBTZWFyY2hhYmxlTWFwfSBpdHNlbGYsIHRvIGFsbG93IGNoYWluaW5nXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIG5vZGUgPSBjcmVhdGVQYXRoKHRoaXMuX3RyZWUsIGtleSk7XG4gICAgICAgIG5vZGUuc2V0KExFQUYsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hcC9zaXplXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zaXplKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiogQGlnbm9yZSAqL1xuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IDA7XG4gICAgICAgICAgICB2YXIgaXRlciA9IHRoaXMuZW50cmllcygpO1xuICAgICAgICAgICAgd2hpbGUgKCFpdGVyLm5leHQoKS5kb25lKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NpemUgKz0gMTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgdmFsdWUgYXQgdGhlIGdpdmVuIGtleSB1c2luZyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uIFRoZSBmdW5jdGlvblxuICAgICAqIGlzIGNhbGxlZCB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIGF0IHRoZSBrZXksIGFuZCBpdHMgcmV0dXJuIHZhbHVlIGlzIHVzZWQgYXNcbiAgICAgKiB0aGUgbmV3IHZhbHVlIHRvIGJlIHNldC5cbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEluY3JlbWVudCB0aGUgY3VycmVudCB2YWx1ZSBieSBvbmVcbiAgICAgKiBzZWFyY2hhYmxlTWFwLnVwZGF0ZSgnc29tZWtleScsIChjdXJyZW50VmFsdWUpID0+IGN1cnJlbnRWYWx1ZSA9PSBudWxsID8gMCA6IGN1cnJlbnRWYWx1ZSArIDEpXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBJZiB0aGUgdmFsdWUgYXQgdGhlIGdpdmVuIGtleSBpcyBvciB3aWxsIGJlIGFuIG9iamVjdCwgaXQgbWlnaHQgbm90IHJlcXVpcmVcbiAgICAgKiByZS1hc3NpZ25tZW50LiBJbiB0aGF0IGNhc2UgaXQgaXMgYmV0dGVyIHRvIHVzZSBgZmV0Y2goKWAsIGJlY2F1c2UgaXQgaXNcbiAgICAgKiBmYXN0ZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5ICBUaGUga2V5IHRvIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBmbiAgVGhlIGZ1bmN0aW9uIHVzZWQgdG8gY29tcHV0ZSB0aGUgbmV3IHZhbHVlIGZyb20gdGhlIGN1cnJlbnQgb25lXG4gICAgICogQHJldHVybiBUaGUge0BsaW5rIFNlYXJjaGFibGVNYXB9IGl0c2VsZiwgdG8gYWxsb3cgY2hhaW5pbmdcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoa2V5LCBmbikge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigna2V5IG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaXplID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgbm9kZSA9IGNyZWF0ZVBhdGgodGhpcy5fdHJlZSwga2V5KTtcbiAgICAgICAgbm9kZS5zZXQoTEVBRiwgZm4obm9kZS5nZXQoTEVBRikpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4ga2V5LiBJZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3QsIGNhbGxzIHRoZVxuICAgICAqIGdpdmVuIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhIG5ldyB2YWx1ZSwgd2hpY2ggaXMgaW5zZXJ0ZWQgYXQgdGhlIGdpdmVuIGtleVxuICAgICAqIGFuZCBzdWJzZXF1ZW50bHkgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiAjIyMgRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiBjb25zdCBtYXAgPSBzZWFyY2hhYmxlTWFwLmZldGNoKCdzb21la2V5JywgKCkgPT4gbmV3IE1hcCgpKVxuICAgICAqIG1hcC5zZXQoJ2ZvbycsICdiYXInKVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSAgVGhlIGtleSB0byB1cGRhdGVcbiAgICAgKiBAcGFyYW0gZGVmYXVsdFZhbHVlICBBIGZ1bmN0aW9uIHRoYXQgY3JlYXRlcyBhIG5ldyB2YWx1ZSBpZiB0aGUga2V5IGRvZXMgbm90IGV4aXN0XG4gICAgICogQHJldHVybiBUaGUgZXhpc3Rpbmcgb3IgbmV3IHZhbHVlIGF0IHRoZSBnaXZlbiBrZXlcbiAgICAgKi9cbiAgICBTZWFyY2hhYmxlTWFwLnByb3RvdHlwZS5mZXRjaCA9IGZ1bmN0aW9uIChrZXksIGluaXRpYWwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2l6ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIG5vZGUgPSBjcmVhdGVQYXRoKHRoaXMuX3RyZWUsIGtleSk7XG4gICAgICAgIHZhciB2YWx1ZSA9IG5vZGUuZ2V0KExFQUYpO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbm9kZS5zZXQoTEVBRiwgdmFsdWUgPSBpbml0aWFsKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTWFwL3ZhbHVlc1xuICAgICAqIEByZXR1cm4gQW4gYEl0ZXJhYmxlYCBpdGVyYXRpbmcgdGhyb3VnaCB2YWx1ZXMuXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRyZWVJdGVyYXRvcih0aGlzLCBWQUxVRVMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9NYXAvQEBpdGVyYXRvclxuICAgICAqL1xuICAgIFNlYXJjaGFibGVNYXAucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudHJpZXMoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB7QGxpbmsgU2VhcmNoYWJsZU1hcH0gZnJvbSBhbiBgSXRlcmFibGVgIG9mIGVudHJpZXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRyaWVzICBFbnRyaWVzIHRvIGJlIGluc2VydGVkIGluIHRoZSB7QGxpbmsgU2VhcmNoYWJsZU1hcH1cbiAgICAgKiBAcmV0dXJuIEEgbmV3IHtAbGluayBTZWFyY2hhYmxlTWFwfSB3aXRoIHRoZSBnaXZlbiBlbnRyaWVzXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5mcm9tID0gZnVuY3Rpb24gKGVudHJpZXMpIHtcbiAgICAgICAgdmFyIGVfMywgX2E7XG4gICAgICAgIHZhciB0cmVlID0gbmV3IFNlYXJjaGFibGVNYXAoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGVudHJpZXNfMSA9IF9fdmFsdWVzKGVudHJpZXMpLCBlbnRyaWVzXzFfMSA9IGVudHJpZXNfMS5uZXh0KCk7ICFlbnRyaWVzXzFfMS5kb25lOyBlbnRyaWVzXzFfMSA9IGVudHJpZXNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2IgPSBfX3JlYWQoZW50cmllc18xXzEudmFsdWUsIDIpLCBrZXkgPSBfYlswXSwgdmFsdWUgPSBfYlsxXTtcbiAgICAgICAgICAgICAgICB0cmVlLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8zXzEpIHsgZV8zID0geyBlcnJvcjogZV8zXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJpZXNfMV8xICYmICFlbnRyaWVzXzFfMS5kb25lICYmIChfYSA9IGVudHJpZXNfMS5yZXR1cm4pKSBfYS5jYWxsKGVudHJpZXNfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMykgdGhyb3cgZV8zLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyZWU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEge0BsaW5rIFNlYXJjaGFibGVNYXB9IGZyb20gdGhlIGl0ZXJhYmxlIHByb3BlcnRpZXMgb2YgYSBKYXZhU2NyaXB0IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIG9iamVjdCAgT2JqZWN0IG9mIGVudHJpZXMgZm9yIHRoZSB7QGxpbmsgU2VhcmNoYWJsZU1hcH1cbiAgICAgKiBAcmV0dXJuIEEgbmV3IHtAbGluayBTZWFyY2hhYmxlTWFwfSB3aXRoIHRoZSBnaXZlbiBlbnRyaWVzXG4gICAgICovXG4gICAgU2VhcmNoYWJsZU1hcC5mcm9tT2JqZWN0ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gU2VhcmNoYWJsZU1hcC5mcm9tKE9iamVjdC5lbnRyaWVzKG9iamVjdCkpO1xuICAgIH07XG4gICAgcmV0dXJuIFNlYXJjaGFibGVNYXA7XG59KCkpO1xudmFyIHRyYWNrRG93biA9IGZ1bmN0aW9uICh0cmVlLCBrZXksIHBhdGgpIHtcbiAgICB2YXIgZV80LCBfYTtcbiAgICBpZiAocGF0aCA9PT0gdm9pZCAwKSB7IHBhdGggPSBbXTsgfVxuICAgIGlmIChrZXkubGVuZ3RoID09PSAwIHx8IHRyZWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gW3RyZWUsIHBhdGhdO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRyZWUua2V5cygpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGsgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgIGlmIChrICE9PSBMRUFGICYmIGtleS5zdGFydHNXaXRoKGspKSB7XG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKFt0cmVlLCBrXSk7IC8vIHBlcmZvcm1hbmNlOiB1cGRhdGUgaW4gcGxhY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2tEb3duKHRyZWUuZ2V0KGspLCBrZXkuc2xpY2Uoay5sZW5ndGgpLCBwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV80XzEpIHsgZV80ID0geyBlcnJvcjogZV80XzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV80KSB0aHJvdyBlXzQuZXJyb3I7IH1cbiAgICB9XG4gICAgcGF0aC5wdXNoKFt0cmVlLCBrZXldKTsgLy8gcGVyZm9ybWFuY2U6IHVwZGF0ZSBpbiBwbGFjZVxuICAgIHJldHVybiB0cmFja0Rvd24odW5kZWZpbmVkLCAnJywgcGF0aCk7XG59O1xudmFyIGxvb2t1cCA9IGZ1bmN0aW9uICh0cmVlLCBrZXkpIHtcbiAgICB2YXIgZV81LCBfYTtcbiAgICBpZiAoa2V5Lmxlbmd0aCA9PT0gMCB8fCB0cmVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRyZWU7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModHJlZS5rZXlzKCkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgayA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGsgIT09IExFQUYgJiYga2V5LnN0YXJ0c1dpdGgoaykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9va3VwKHRyZWUuZ2V0KGspLCBrZXkuc2xpY2Uoay5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV81XzEpIHsgZV81ID0geyBlcnJvcjogZV81XzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV81KSB0aHJvdyBlXzUuZXJyb3I7IH1cbiAgICB9XG59O1xuLy8gQ3JlYXRlIGEgcGF0aCBpbiB0aGUgcmFkaXggdHJlZSBmb3IgdGhlIGdpdmVuIGtleSwgYW5kIHJldHVybnMgdGhlIGRlZXBlc3Rcbi8vIG5vZGUuIFRoaXMgZnVuY3Rpb24gaXMgaW4gdGhlIGhvdCBwYXRoIGZvciBpbmRleGluZy4gSXQgYXZvaWRzIHVubmVjZXNzYXJ5XG4vLyBzdHJpbmcgb3BlcmF0aW9ucyBhbmQgcmVjdXJzaW9uIGZvciBwZXJmb3JtYW5jZS5cbnZhciBjcmVhdGVQYXRoID0gZnVuY3Rpb24gKG5vZGUsIGtleSkge1xuICAgIHZhciBlXzYsIF9hO1xuICAgIHZhciBrZXlMZW5ndGggPSBrZXkubGVuZ3RoO1xuICAgIG91dGVyOiBmb3IgKHZhciBwb3MgPSAwOyBub2RlICYmIHBvcyA8IGtleUxlbmd0aDspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gKGVfNiA9IHZvaWQgMCwgX192YWx1ZXMobm9kZS5rZXlzKCkpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBrID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGlzIGtleSBpcyBhIGNhbmRpZGF0ZTogdGhlIGZpcnN0IGNoYXJhY3RlcnMgbXVzdCBtYXRjaC5cbiAgICAgICAgICAgICAgICBpZiAoayAhPT0gTEVBRiAmJiBrZXlbcG9zXSA9PT0ga1swXSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuID0gTWF0aC5taW4oa2V5TGVuZ3RoIC0gcG9zLCBrLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2Ugb2Zmc2V0IHRvIHRoZSBwb2ludCB3aGVyZSBrZXkgYW5kIGsgbm8gbG9uZ2VyIG1hdGNoLlxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldCA8IGxlbiAmJiBrZXlbcG9zICsgb2Zmc2V0XSA9PT0ga1tvZmZzZXRdKVxuICAgICAgICAgICAgICAgICAgICAgICAgKytvZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZF8xID0gbm9kZS5nZXQoayk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPT09IGsubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZXhpc3Rpbmcga2V5IGlzIHNob3J0ZXIgdGhhbiB0aGUga2V5IHdlIG5lZWQgdG8gY3JlYXRlLlxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGNoaWxkXzE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXJ0aWFsIG1hdGNoOiB3ZSBuZWVkIHRvIGluc2VydCBhbiBpbnRlcm1lZGlhdGUgbm9kZSB0byBjb250YWluXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBib3RoIHRoZSBleGlzdGluZyBzdWJ0cmVlIGFuZCB0aGUgbmV3IG5vZGUuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW50ZXJtZWRpYXRlID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJtZWRpYXRlLnNldChrLnNsaWNlKG9mZnNldCksIGNoaWxkXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXQoa2V5LnNsaWNlKHBvcywgcG9zICsgb2Zmc2V0KSwgaW50ZXJtZWRpYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZGVsZXRlKGspO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSA9IGludGVybWVkaWF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfNl8xKSB7IGVfNiA9IHsgZXJyb3I6IGVfNl8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV82KSB0aHJvdyBlXzYuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgYSBmaW5hbCBjaGlsZCBub2RlIHRvIGNvbnRhaW4gdGhlIGZpbmFsIHN1ZmZpeCBvZiB0aGUga2V5LlxuICAgICAgICB2YXIgY2hpbGQgPSBuZXcgTWFwKCk7XG4gICAgICAgIG5vZGUuc2V0KGtleS5zbGljZShwb3MpLCBjaGlsZCk7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59O1xudmFyIHJlbW92ZSA9IGZ1bmN0aW9uICh0cmVlLCBrZXkpIHtcbiAgICB2YXIgX2EgPSBfX3JlYWQodHJhY2tEb3duKHRyZWUsIGtleSksIDIpLCBub2RlID0gX2FbMF0sIHBhdGggPSBfYVsxXTtcbiAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbm9kZS5kZWxldGUoTEVBRik7XG4gICAgaWYgKG5vZGUuc2l6ZSA9PT0gMCkge1xuICAgICAgICBjbGVhbnVwKHBhdGgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChub2RlLnNpemUgPT09IDEpIHtcbiAgICAgICAgdmFyIF9iID0gX19yZWFkKG5vZGUuZW50cmllcygpLm5leHQoKS52YWx1ZSwgMiksIGtleV8xID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgICAgIG1lcmdlKHBhdGgsIGtleV8xLCB2YWx1ZSk7XG4gICAgfVxufTtcbnZhciBjbGVhbnVwID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgX2EgPSBfX3JlYWQobGFzdChwYXRoKSwgMiksIG5vZGUgPSBfYVswXSwga2V5ID0gX2FbMV07XG4gICAgbm9kZS5kZWxldGUoa2V5KTtcbiAgICBpZiAobm9kZS5zaXplID09PSAwKSB7XG4gICAgICAgIGNsZWFudXAocGF0aC5zbGljZSgwLCAtMSkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChub2RlLnNpemUgPT09IDEpIHtcbiAgICAgICAgdmFyIF9iID0gX19yZWFkKG5vZGUuZW50cmllcygpLm5leHQoKS52YWx1ZSwgMiksIGtleV8yID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgICAgIGlmIChrZXlfMiAhPT0gTEVBRikge1xuICAgICAgICAgICAgbWVyZ2UocGF0aC5zbGljZSgwLCAtMSksIGtleV8yLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xudmFyIG1lcmdlID0gZnVuY3Rpb24gKHBhdGgsIGtleSwgdmFsdWUpIHtcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgX2EgPSBfX3JlYWQobGFzdChwYXRoKSwgMiksIG5vZGUgPSBfYVswXSwgbm9kZUtleSA9IF9hWzFdO1xuICAgIG5vZGUuc2V0KG5vZGVLZXkgKyBrZXksIHZhbHVlKTtcbiAgICBub2RlLmRlbGV0ZShub2RlS2V5KTtcbn07XG52YXIgbGFzdCA9IGZ1bmN0aW9uIChhcnJheSkge1xuICAgIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbn07XG5cbnZhciBfYTtcbnZhciBPUiA9ICdvcic7XG52YXIgQU5EID0gJ2FuZCc7XG52YXIgQU5EX05PVCA9ICdhbmRfbm90Jztcbi8qKlxuICoge0BsaW5rIE1pbmlTZWFyY2h9IGlzIHRoZSBtYWluIGVudHJ5cG9pbnQgY2xhc3MsIGltcGxlbWVudGluZyBhIGZ1bGwtdGV4dFxuICogc2VhcmNoIGVuZ2luZSBpbiBtZW1vcnkuXG4gKlxuICogQHR5cGVQYXJhbSBUICBUaGUgdHlwZSBvZiB0aGUgZG9jdW1lbnRzIGJlaW5nIGluZGV4ZWQuXG4gKlxuICogIyMjIEJhc2ljIGV4YW1wbGU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgZG9jdW1lbnRzID0gW1xuICogICB7XG4gKiAgICAgaWQ6IDEsXG4gKiAgICAgdGl0bGU6ICdNb2J5IERpY2snLFxuICogICAgIHRleHQ6ICdDYWxsIG1lIElzaG1hZWwuIFNvbWUgeWVhcnMgYWdvLi4uJyxcbiAqICAgICBjYXRlZ29yeTogJ2ZpY3Rpb24nXG4gKiAgIH0sXG4gKiAgIHtcbiAqICAgICBpZDogMixcbiAqICAgICB0aXRsZTogJ1plbiBhbmQgdGhlIEFydCBvZiBNb3RvcmN5Y2xlIE1haW50ZW5hbmNlJyxcbiAqICAgICB0ZXh0OiAnSSBjYW4gc2VlIGJ5IG15IHdhdGNoLi4uJyxcbiAqICAgICBjYXRlZ29yeTogJ2ZpY3Rpb24nXG4gKiAgIH0sXG4gKiAgIHtcbiAqICAgICBpZDogMyxcbiAqICAgICB0aXRsZTogJ05ldXJvbWFuY2VyJyxcbiAqICAgICB0ZXh0OiAnVGhlIHNreSBhYm92ZSB0aGUgcG9ydCB3YXMuLi4nLFxuICogICAgIGNhdGVnb3J5OiAnZmljdGlvbidcbiAqICAgfSxcbiAqICAge1xuICogICAgIGlkOiA0LFxuICogICAgIHRpdGxlOiAnWmVuIGFuZCB0aGUgQXJ0IG9mIEFyY2hlcnknLFxuICogICAgIHRleHQ6ICdBdCBmaXJzdCBzaWdodCBpdCBtdXN0IHNlZW0uLi4nLFxuICogICAgIGNhdGVnb3J5OiAnbm9uLWZpY3Rpb24nXG4gKiAgIH0sXG4gKiAgIC8vIC4uLmFuZCBtb3JlXG4gKiBdXG4gKlxuICogLy8gQ3JlYXRlIGEgc2VhcmNoIGVuZ2luZSB0aGF0IGluZGV4ZXMgdGhlICd0aXRsZScgYW5kICd0ZXh0JyBmaWVsZHMgZm9yXG4gKiAvLyBmdWxsLXRleHQgc2VhcmNoLiBTZWFyY2ggcmVzdWx0cyB3aWxsIGluY2x1ZGUgJ3RpdGxlJyBhbmQgJ2NhdGVnb3J5JyAocGx1cyB0aGVcbiAqIC8vIGlkIGZpZWxkLCB0aGF0IGlzIGFsd2F5cyBzdG9yZWQgYW5kIHJldHVybmVkKVxuICogY29uc3QgbWluaVNlYXJjaCA9IG5ldyBNaW5pU2VhcmNoKHtcbiAqICAgZmllbGRzOiBbJ3RpdGxlJywgJ3RleHQnXSxcbiAqICAgc3RvcmVGaWVsZHM6IFsndGl0bGUnLCAnY2F0ZWdvcnknXVxuICogfSlcbiAqXG4gKiAvLyBBZGQgZG9jdW1lbnRzIHRvIHRoZSBpbmRleFxuICogbWluaVNlYXJjaC5hZGRBbGwoZG9jdW1lbnRzKVxuICpcbiAqIC8vIFNlYXJjaCBmb3IgZG9jdW1lbnRzOlxuICogbGV0IHJlc3VsdHMgPSBtaW5pU2VhcmNoLnNlYXJjaCgnemVuIGFydCBtb3RvcmN5Y2xlJylcbiAqIC8vID0+IFtcbiAqIC8vICAgeyBpZDogMiwgdGl0bGU6ICdaZW4gYW5kIHRoZSBBcnQgb2YgTW90b3JjeWNsZSBNYWludGVuYW5jZScsIGNhdGVnb3J5OiAnZmljdGlvbicsIHNjb3JlOiAyLjc3MjU4IH0sXG4gKiAvLyAgIHsgaWQ6IDQsIHRpdGxlOiAnWmVuIGFuZCB0aGUgQXJ0IG9mIEFyY2hlcnknLCBjYXRlZ29yeTogJ25vbi1maWN0aW9uJywgc2NvcmU6IDEuMzg2MjkgfVxuICogLy8gXVxuICogYGBgXG4gKi9cbnZhciBNaW5pU2VhcmNoID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zICBDb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICAgKlxuICAgICAqICMjIyBFeGFtcGxlczpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBDcmVhdGUgYSBzZWFyY2ggZW5naW5lIHRoYXQgaW5kZXhlcyB0aGUgJ3RpdGxlJyBhbmQgJ3RleHQnIGZpZWxkcyBvZiB5b3VyXG4gICAgICogLy8gZG9jdW1lbnRzOlxuICAgICAqIGNvbnN0IG1pbmlTZWFyY2ggPSBuZXcgTWluaVNlYXJjaCh7IGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBJRCBGaWVsZDpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBZb3VyIGRvY3VtZW50cyBhcmUgYXNzdW1lZCB0byBpbmNsdWRlIGEgdW5pcXVlICdpZCcgZmllbGQsIGJ1dCBpZiB5b3Ugd2FudFxuICAgICAqIC8vIHRvIHVzZSBhIGRpZmZlcmVudCBmaWVsZCBmb3IgZG9jdW1lbnQgaWRlbnRpZmljYXRpb24sIHlvdSBjYW4gc2V0IHRoZVxuICAgICAqIC8vICdpZEZpZWxkJyBvcHRpb246XG4gICAgICogY29uc3QgbWluaVNlYXJjaCA9IG5ldyBNaW5pU2VhcmNoKHsgaWRGaWVsZDogJ2tleScsIGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBPcHRpb25zIGFuZCBkZWZhdWx0czpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBUaGUgZnVsbCBzZXQgb2Ygb3B0aW9ucyAoaGVyZSB3aXRoIHRoZWlyIGRlZmF1bHQgdmFsdWUpIGlzOlxuICAgICAqIGNvbnN0IG1pbmlTZWFyY2ggPSBuZXcgTWluaVNlYXJjaCh7XG4gICAgICogICAvLyBpZEZpZWxkOiBmaWVsZCB0aGF0IHVuaXF1ZWx5IGlkZW50aWZpZXMgYSBkb2N1bWVudFxuICAgICAqICAgaWRGaWVsZDogJ2lkJyxcbiAgICAgKlxuICAgICAqICAgLy8gZXh0cmFjdEZpZWxkOiBmdW5jdGlvbiB1c2VkIHRvIGdldCB0aGUgdmFsdWUgb2YgYSBmaWVsZCBpbiBhIGRvY3VtZW50LlxuICAgICAqICAgLy8gQnkgZGVmYXVsdCwgaXQgYXNzdW1lcyB0aGUgZG9jdW1lbnQgaXMgYSBmbGF0IG9iamVjdCB3aXRoIGZpZWxkIG5hbWVzIGFzXG4gICAgICogICAvLyBwcm9wZXJ0eSBrZXlzIGFuZCBmaWVsZCB2YWx1ZXMgYXMgc3RyaW5nIHByb3BlcnR5IHZhbHVlcywgYnV0IGN1c3RvbSBsb2dpY1xuICAgICAqICAgLy8gY2FuIGJlIGltcGxlbWVudGVkIGJ5IHNldHRpbmcgdGhpcyBvcHRpb24gdG8gYSBjdXN0b20gZXh0cmFjdG9yIGZ1bmN0aW9uLlxuICAgICAqICAgZXh0cmFjdEZpZWxkOiAoZG9jdW1lbnQsIGZpZWxkTmFtZSkgPT4gZG9jdW1lbnRbZmllbGROYW1lXSxcbiAgICAgKlxuICAgICAqICAgLy8gdG9rZW5pemU6IGZ1bmN0aW9uIHVzZWQgdG8gc3BsaXQgZmllbGRzIGludG8gaW5kaXZpZHVhbCB0ZXJtcy4gQnlcbiAgICAgKiAgIC8vIGRlZmF1bHQsIGl0IGlzIGFsc28gdXNlZCB0byB0b2tlbml6ZSBzZWFyY2ggcXVlcmllcywgdW5sZXNzIGEgc3BlY2lmaWNcbiAgICAgKiAgIC8vIGB0b2tlbml6ZWAgc2VhcmNoIG9wdGlvbiBpcyBzdXBwbGllZC4gV2hlbiB0b2tlbml6aW5nIGFuIGluZGV4ZWQgZmllbGQsXG4gICAgICogICAvLyB0aGUgZmllbGQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICAgKiAgIHRva2VuaXplOiAoc3RyaW5nLCBfZmllbGROYW1lKSA9PiBzdHJpbmcuc3BsaXQoU1BBQ0VfT1JfUFVOQ1RVQVRJT04pLFxuICAgICAqXG4gICAgICogICAvLyBwcm9jZXNzVGVybTogZnVuY3Rpb24gdXNlZCB0byBwcm9jZXNzIGVhY2ggdG9rZW5pemVkIHRlcm0gYmVmb3JlXG4gICAgICogICAvLyBpbmRleGluZy4gSXQgY2FuIGJlIHVzZWQgZm9yIHN0ZW1taW5nIGFuZCBub3JtYWxpemF0aW9uLiBSZXR1cm4gYSBmYWxzeVxuICAgICAqICAgLy8gdmFsdWUgaW4gb3JkZXIgdG8gZGlzY2FyZCBhIHRlcm0uIEJ5IGRlZmF1bHQsIGl0IGlzIGFsc28gdXNlZCB0byBwcm9jZXNzXG4gICAgICogICAvLyBzZWFyY2ggcXVlcmllcywgdW5sZXNzIGEgc3BlY2lmaWMgYHByb2Nlc3NUZXJtYCBvcHRpb24gaXMgc3VwcGxpZWQgYXMgYVxuICAgICAqICAgLy8gc2VhcmNoIG9wdGlvbi4gV2hlbiBwcm9jZXNzaW5nIGEgdGVybSBmcm9tIGEgaW5kZXhlZCBmaWVsZCwgdGhlIGZpZWxkXG4gICAgICogICAvLyBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgICAqICAgcHJvY2Vzc1Rlcm06ICh0ZXJtLCBfZmllbGROYW1lKSA9PiB0ZXJtLnRvTG93ZXJDYXNlKCksXG4gICAgICpcbiAgICAgKiAgIC8vIHNlYXJjaE9wdGlvbnM6IGRlZmF1bHQgc2VhcmNoIG9wdGlvbnMsIHNlZSB0aGUgYHNlYXJjaGAgbWV0aG9kIGZvclxuICAgICAqICAgLy8gZGV0YWlsc1xuICAgICAqICAgc2VhcmNoT3B0aW9uczogdW5kZWZpbmVkLFxuICAgICAqXG4gICAgICogICAvLyBmaWVsZHM6IGRvY3VtZW50IGZpZWxkcyB0byBiZSBpbmRleGVkLiBNYW5kYXRvcnksIGJ1dCBub3Qgc2V0IGJ5IGRlZmF1bHRcbiAgICAgKiAgIGZpZWxkczogdW5kZWZpbmVkXG4gICAgICpcbiAgICAgKiAgIC8vIHN0b3JlRmllbGRzOiBkb2N1bWVudCBmaWVsZHMgdG8gYmUgc3RvcmVkIGFuZCByZXR1cm5lZCBhcyBwYXJ0IG9mIHRoZVxuICAgICAqICAgLy8gc2VhcmNoIHJlc3VsdHMuXG4gICAgICogICBzdG9yZUZpZWxkczogW11cbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIE1pbmlTZWFyY2gob3B0aW9ucykge1xuICAgICAgICBpZiAoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5maWVsZHMpID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWluaVNlYXJjaDogb3B0aW9uIFwiZmllbGRzXCIgbXVzdCBiZSBwcm92aWRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhdXRvVmFjdXVtID0gKG9wdGlvbnMuYXV0b1ZhY3V1bSA9PSBudWxsIHx8IG9wdGlvbnMuYXV0b1ZhY3V1bSA9PT0gdHJ1ZSkgPyBkZWZhdWx0QXV0b1ZhY3V1bU9wdGlvbnMgOiBvcHRpb25zLmF1dG9WYWN1dW07XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMpLCBvcHRpb25zKSwgeyBhdXRvVmFjdXVtOiBhdXRvVmFjdXVtLCBzZWFyY2hPcHRpb25zOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVmYXVsdFNlYXJjaE9wdGlvbnMpLCAob3B0aW9ucy5zZWFyY2hPcHRpb25zIHx8IHt9KSksIGF1dG9TdWdnZXN0T3B0aW9uczogX19hc3NpZ24oX19hc3NpZ24oe30sIGRlZmF1bHRBdXRvU3VnZ2VzdE9wdGlvbnMpLCAob3B0aW9ucy5hdXRvU3VnZ2VzdE9wdGlvbnMgfHwge30pKSB9KTtcbiAgICAgICAgdGhpcy5faW5kZXggPSBuZXcgU2VhcmNoYWJsZU1hcCgpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRJZHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2lkVG9TaG9ydElkID0gbmV3IE1hcCgpO1xuICAgICAgICAvLyBGaWVsZHMgYXJlIGRlZmluZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uLCBkb24ndCBjaGFuZ2UsIGFyZSBmZXcgaW5cbiAgICAgICAgLy8gbnVtYmVyLCByYXJlbHkgbmVlZCBpdGVyYXRpbmcgb3ZlciwgYW5kIGhhdmUgc3RyaW5nIGtleXMuIFRoZXJlZm9yZSBpblxuICAgICAgICAvLyB0aGlzIGNhc2UgYW4gb2JqZWN0IGlzIGEgYmV0dGVyIGNhbmRpZGF0ZSB0aGFuIGEgTWFwIHRvIHN0b3JlIHRoZSBtYXBwaW5nXG4gICAgICAgIC8vIGZyb20gZmllbGQga2V5IHRvIElELlxuICAgICAgICB0aGlzLl9maWVsZElkcyA9IHt9O1xuICAgICAgICB0aGlzLl9maWVsZExlbmd0aCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fYXZnRmllbGRMZW5ndGggPSBbXTtcbiAgICAgICAgdGhpcy5fbmV4dElkID0gMDtcbiAgICAgICAgdGhpcy5fc3RvcmVkRmllbGRzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9kaXJ0Q291bnQgPSAwO1xuICAgICAgICB0aGlzLl9jdXJyZW50VmFjdXVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZW5xdWV1ZWRWYWN1dW0gPSBudWxsO1xuICAgICAgICB0aGlzLl9lbnF1ZXVlZFZhY3V1bUNvbmRpdGlvbnMgPSBkZWZhdWx0VmFjdXVtQ29uZGl0aW9ucztcbiAgICAgICAgdGhpcy5hZGRGaWVsZHModGhpcy5fb3B0aW9ucy5maWVsZHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZG9jdW1lbnQgdG8gdGhlIGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnQgIFRoZSBkb2N1bWVudCB0byBiZSBpbmRleGVkXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGRvY3VtZW50KSB7XG4gICAgICAgIHZhciBlXzEsIF9hLCBlXzIsIF9iLCBlXzMsIF9jO1xuICAgICAgICB2YXIgX2QgPSB0aGlzLl9vcHRpb25zLCBleHRyYWN0RmllbGQgPSBfZC5leHRyYWN0RmllbGQsIHRva2VuaXplID0gX2QudG9rZW5pemUsIHByb2Nlc3NUZXJtID0gX2QucHJvY2Vzc1Rlcm0sIGZpZWxkcyA9IF9kLmZpZWxkcywgaWRGaWVsZCA9IF9kLmlkRmllbGQ7XG4gICAgICAgIHZhciBpZCA9IGV4dHJhY3RGaWVsZChkb2N1bWVudCwgaWRGaWVsZCk7XG4gICAgICAgIGlmIChpZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaW5pU2VhcmNoOiBkb2N1bWVudCBkb2VzIG5vdCBoYXZlIElEIGZpZWxkIFxcXCJcIi5jb25jYXQoaWRGaWVsZCwgXCJcXFwiXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faWRUb1Nob3J0SWQuaGFzKGlkKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWluaVNlYXJjaDogZHVwbGljYXRlIElEIFwiLmNvbmNhdChpZCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaG9ydERvY3VtZW50SWQgPSB0aGlzLmFkZERvY3VtZW50SWQoaWQpO1xuICAgICAgICB0aGlzLnNhdmVTdG9yZWRGaWVsZHMoc2hvcnREb2N1bWVudElkLCBkb2N1bWVudCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBmaWVsZHNfMSA9IF9fdmFsdWVzKGZpZWxkcyksIGZpZWxkc18xXzEgPSBmaWVsZHNfMS5uZXh0KCk7ICFmaWVsZHNfMV8xLmRvbmU7IGZpZWxkc18xXzEgPSBmaWVsZHNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBmaWVsZHNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZFZhbHVlID0gZXh0cmFjdEZpZWxkKGRvY3VtZW50LCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IHRva2VuaXplKGZpZWxkVmFsdWUudG9TdHJpbmcoKSwgZmllbGQpO1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZElkID0gdGhpcy5fZmllbGRJZHNbZmllbGRdO1xuICAgICAgICAgICAgICAgIHZhciB1bmlxdWVUZXJtcyA9IG5ldyBTZXQodG9rZW5zKS5zaXplO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkRmllbGRMZW5ndGgoc2hvcnREb2N1bWVudElkLCBmaWVsZElkLCB0aGlzLl9kb2N1bWVudENvdW50IC0gMSwgdW5pcXVlVGVybXMpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHRva2Vuc18xID0gKGVfMiA9IHZvaWQgMCwgX192YWx1ZXModG9rZW5zKSksIHRva2Vuc18xXzEgPSB0b2tlbnNfMS5uZXh0KCk7ICF0b2tlbnNfMV8xLmRvbmU7IHRva2Vuc18xXzEgPSB0b2tlbnNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZXJtID0gdG9rZW5zXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzZWRUZXJtID0gcHJvY2Vzc1Rlcm0odGVybSwgZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvY2Vzc2VkVGVybSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9jZXNzZWRUZXJtXzEgPSAoZV8zID0gdm9pZCAwLCBfX3ZhbHVlcyhwcm9jZXNzZWRUZXJtKSksIHByb2Nlc3NlZFRlcm1fMV8xID0gcHJvY2Vzc2VkVGVybV8xLm5leHQoKTsgIXByb2Nlc3NlZFRlcm1fMV8xLmRvbmU7IHByb2Nlc3NlZFRlcm1fMV8xID0gcHJvY2Vzc2VkVGVybV8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHQgPSBwcm9jZXNzZWRUZXJtXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVGVybShmaWVsZElkLCBzaG9ydERvY3VtZW50SWQsIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzNfMSkgeyBlXzMgPSB7IGVycm9yOiBlXzNfMSB9OyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2VkVGVybV8xXzEgJiYgIXByb2Nlc3NlZFRlcm1fMV8xLmRvbmUgJiYgKF9jID0gcHJvY2Vzc2VkVGVybV8xLnJldHVybikpIF9jLmNhbGwocHJvY2Vzc2VkVGVybV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMykgdGhyb3cgZV8zLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvY2Vzc2VkVGVybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVGVybShmaWVsZElkLCBzaG9ydERvY3VtZW50SWQsIHByb2Nlc3NlZFRlcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5zXzFfMSAmJiAhdG9rZW5zXzFfMS5kb25lICYmIChfYiA9IHRva2Vuc18xLnJldHVybikpIF9iLmNhbGwodG9rZW5zXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZHNfMV8xICYmICFmaWVsZHNfMV8xLmRvbmUgJiYgKF9hID0gZmllbGRzXzEucmV0dXJuKSkgX2EuY2FsbChmaWVsZHNfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZHMgYWxsIHRoZSBnaXZlbiBkb2N1bWVudHMgdG8gdGhlIGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnRzICBBbiBhcnJheSBvZiBkb2N1bWVudHMgdG8gYmUgaW5kZXhlZFxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmFkZEFsbCA9IGZ1bmN0aW9uIChkb2N1bWVudHMpIHtcbiAgICAgICAgdmFyIGVfNCwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBkb2N1bWVudHNfMSA9IF9fdmFsdWVzKGRvY3VtZW50cyksIGRvY3VtZW50c18xXzEgPSBkb2N1bWVudHNfMS5uZXh0KCk7ICFkb2N1bWVudHNfMV8xLmRvbmU7IGRvY3VtZW50c18xXzEgPSBkb2N1bWVudHNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9jdW1lbnRfMSA9IGRvY3VtZW50c18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoZG9jdW1lbnRfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfNF8xKSB7IGVfNCA9IHsgZXJyb3I6IGVfNF8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudHNfMV8xICYmICFkb2N1bWVudHNfMV8xLmRvbmUgJiYgKF9hID0gZG9jdW1lbnRzXzEucmV0dXJuKSkgX2EuY2FsbChkb2N1bWVudHNfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNCkgdGhyb3cgZV80LmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZHMgYWxsIHRoZSBnaXZlbiBkb2N1bWVudHMgdG8gdGhlIGluZGV4IGFzeW5jaHJvbm91c2x5LlxuICAgICAqXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyAodG8gYHVuZGVmaW5lZGApIHdoZW4gdGhlIGluZGV4aW5nIGlzIGRvbmUuXG4gICAgICogVGhpcyBtZXRob2QgaXMgdXNlZnVsIHdoZW4gaW5kZXggbWFueSBkb2N1bWVudHMsIHRvIGF2b2lkIGJsb2NraW5nIHRoZSBtYWluXG4gICAgICogdGhyZWFkLiBUaGUgaW5kZXhpbmcgaXMgcGVyZm9ybWVkIGFzeW5jaHJvbm91c2x5IGFuZCBpbiBjaHVua3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnRzICBBbiBhcnJheSBvZiBkb2N1bWVudHMgdG8gYmUgaW5kZXhlZFxuICAgICAqIEBwYXJhbSBvcHRpb25zICBDb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gYHVuZGVmaW5lZGAgd2hlbiB0aGUgaW5kZXhpbmcgaXMgZG9uZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmFkZEFsbEFzeW5jID0gZnVuY3Rpb24gKGRvY3VtZW50cywgb3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICB2YXIgX2EgPSBvcHRpb25zLmNodW5rU2l6ZSwgY2h1bmtTaXplID0gX2EgPT09IHZvaWQgMCA/IDEwIDogX2E7XG4gICAgICAgIHZhciBhY2MgPSB7IGNodW5rOiBbXSwgcHJvbWlzZTogUHJvbWlzZS5yZXNvbHZlKCkgfTtcbiAgICAgICAgdmFyIF9iID0gZG9jdW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoX2EsIGRvY3VtZW50LCBpKSB7XG4gICAgICAgICAgICB2YXIgY2h1bmsgPSBfYS5jaHVuaywgcHJvbWlzZSA9IF9hLnByb21pc2U7XG4gICAgICAgICAgICBjaHVuay5wdXNoKGRvY3VtZW50KTtcbiAgICAgICAgICAgIGlmICgoaSArIDEpICUgY2h1bmtTaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY2h1bms6IFtdLFxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlOiBwcm9taXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gc2V0VGltZW91dChyZXNvbHZlLCAwKTsgfSk7IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5hZGRBbGwoY2h1bmspOyB9KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBjaHVuazogY2h1bmssIHByb21pc2U6IHByb21pc2UgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgYWNjKSwgY2h1bmsgPSBfYi5jaHVuaywgcHJvbWlzZSA9IF9iLnByb21pc2U7XG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuYWRkQWxsKGNodW5rKTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBkb2N1bWVudCBmcm9tIHRoZSBpbmRleC5cbiAgICAgKlxuICAgICAqIFRoZSBkb2N1bWVudCB0byByZW1vdmUgbXVzdCBOT1QgaGF2ZSBjaGFuZ2VkIGJldHdlZW4gaW5kZXhpbmcgYW5kIHJlbW92YWwsXG4gICAgICogb3RoZXJ3aXNlIHRoZSBpbmRleCB3aWxsIGJlIGNvcnJ1cHRlZC5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIHJlcXVpcmVzIHBhc3NpbmcgdGhlIGZ1bGwgZG9jdW1lbnQgdG8gYmUgcmVtb3ZlZCAobm90IGp1c3QgdGhlXG4gICAgICogSUQpLCBhbmQgaW1tZWRpYXRlbHkgcmVtb3ZlcyB0aGUgZG9jdW1lbnQgZnJvbSB0aGUgaW52ZXJ0ZWQgaW5kZXgsIGFsbG93aW5nXG4gICAgICogbWVtb3J5IHRvIGJlIHJlbGVhc2VkLiBBIGNvbnZlbmllbnQgYWx0ZXJuYXRpdmUgaXMge0BsaW5rXG4gICAgICogTWluaVNlYXJjaCNkaXNjYXJkfSwgd2hpY2ggbmVlZHMgb25seSB0aGUgZG9jdW1lbnQgSUQsIGFuZCBoYXMgdGhlIHNhbWVcbiAgICAgKiB2aXNpYmxlIGVmZmVjdCwgYnV0IGRlbGF5cyBjbGVhbmluZyB1cCB0aGUgaW5kZXggdW50aWwgdGhlIG5leHQgdmFjdXVtaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGRvY3VtZW50ICBUaGUgZG9jdW1lbnQgdG8gYmUgcmVtb3ZlZFxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChkb2N1bWVudCkge1xuICAgICAgICB2YXIgZV81LCBfYSwgZV82LCBfYiwgZV83LCBfYztcbiAgICAgICAgdmFyIF9kID0gdGhpcy5fb3B0aW9ucywgdG9rZW5pemUgPSBfZC50b2tlbml6ZSwgcHJvY2Vzc1Rlcm0gPSBfZC5wcm9jZXNzVGVybSwgZXh0cmFjdEZpZWxkID0gX2QuZXh0cmFjdEZpZWxkLCBmaWVsZHMgPSBfZC5maWVsZHMsIGlkRmllbGQgPSBfZC5pZEZpZWxkO1xuICAgICAgICB2YXIgaWQgPSBleHRyYWN0RmllbGQoZG9jdW1lbnQsIGlkRmllbGQpO1xuICAgICAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWluaVNlYXJjaDogZG9jdW1lbnQgZG9lcyBub3QgaGF2ZSBJRCBmaWVsZCBcXFwiXCIuY29uY2F0KGlkRmllbGQsIFwiXFxcIlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNob3J0SWQgPSB0aGlzLl9pZFRvU2hvcnRJZC5nZXQoaWQpO1xuICAgICAgICBpZiAoc2hvcnRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaW5pU2VhcmNoOiBjYW5ub3QgcmVtb3ZlIGRvY3VtZW50IHdpdGggSUQgXCIuY29uY2F0KGlkLCBcIjogaXQgaXMgbm90IGluIHRoZSBpbmRleFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGZpZWxkc18yID0gX192YWx1ZXMoZmllbGRzKSwgZmllbGRzXzJfMSA9IGZpZWxkc18yLm5leHQoKTsgIWZpZWxkc18yXzEuZG9uZTsgZmllbGRzXzJfMSA9IGZpZWxkc18yLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IGZpZWxkc18yXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkVmFsdWUgPSBleHRyYWN0RmllbGQoZG9jdW1lbnQsIGZpZWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRWYWx1ZSA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemUoZmllbGRWYWx1ZS50b1N0cmluZygpLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkSWQgPSB0aGlzLl9maWVsZElkc1tmaWVsZF07XG4gICAgICAgICAgICAgICAgdmFyIHVuaXF1ZVRlcm1zID0gbmV3IFNldCh0b2tlbnMpLnNpemU7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGaWVsZExlbmd0aChzaG9ydElkLCBmaWVsZElkLCB0aGlzLl9kb2N1bWVudENvdW50LCB1bmlxdWVUZXJtcyk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdG9rZW5zXzIgPSAoZV82ID0gdm9pZCAwLCBfX3ZhbHVlcyh0b2tlbnMpKSwgdG9rZW5zXzJfMSA9IHRva2Vuc18yLm5leHQoKTsgIXRva2Vuc18yXzEuZG9uZTsgdG9rZW5zXzJfMSA9IHRva2Vuc18yLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlcm0gPSB0b2tlbnNfMl8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFRlcm0gPSBwcm9jZXNzVGVybSh0ZXJtLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9jZXNzZWRUZXJtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHByb2Nlc3NlZFRlcm1fMiA9IChlXzcgPSB2b2lkIDAsIF9fdmFsdWVzKHByb2Nlc3NlZFRlcm0pKSwgcHJvY2Vzc2VkVGVybV8yXzEgPSBwcm9jZXNzZWRUZXJtXzIubmV4dCgpOyAhcHJvY2Vzc2VkVGVybV8yXzEuZG9uZTsgcHJvY2Vzc2VkVGVybV8yXzEgPSBwcm9jZXNzZWRUZXJtXzIubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IHByb2Nlc3NlZFRlcm1fMl8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUZXJtKGZpZWxkSWQsIHNob3J0SWQsIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzdfMSkgeyBlXzcgPSB7IGVycm9yOiBlXzdfMSB9OyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2VkVGVybV8yXzEgJiYgIXByb2Nlc3NlZFRlcm1fMl8xLmRvbmUgJiYgKF9jID0gcHJvY2Vzc2VkVGVybV8yLnJldHVybikpIF9jLmNhbGwocHJvY2Vzc2VkVGVybV8yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNykgdGhyb3cgZV83LmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvY2Vzc2VkVGVybSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVGVybShmaWVsZElkLCBzaG9ydElkLCBwcm9jZXNzZWRUZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV82XzEpIHsgZV82ID0geyBlcnJvcjogZV82XzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2Vuc18yXzEgJiYgIXRva2Vuc18yXzEuZG9uZSAmJiAoX2IgPSB0b2tlbnNfMi5yZXR1cm4pKSBfYi5jYWxsKHRva2Vuc18yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfNikgdGhyb3cgZV82LmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzVfMSkgeyBlXzUgPSB7IGVycm9yOiBlXzVfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRzXzJfMSAmJiAhZmllbGRzXzJfMS5kb25lICYmIChfYSA9IGZpZWxkc18yLnJldHVybikpIF9hLmNhbGwoZmllbGRzXzIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzUpIHRocm93IGVfNS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0b3JlZEZpZWxkcy5kZWxldGUoc2hvcnRJZCk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50SWRzLmRlbGV0ZShzaG9ydElkKTtcbiAgICAgICAgdGhpcy5faWRUb1Nob3J0SWQuZGVsZXRlKGlkKTtcbiAgICAgICAgdGhpcy5fZmllbGRMZW5ndGguZGVsZXRlKHNob3J0SWQpO1xuICAgICAgICB0aGlzLl9kb2N1bWVudENvdW50IC09IDE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCB0aGUgZ2l2ZW4gZG9jdW1lbnRzIGZyb20gdGhlIGluZGV4LiBJZiBjYWxsZWQgd2l0aCBubyBhcmd1bWVudHMsXG4gICAgICogaXQgcmVtb3ZlcyBfYWxsXyBkb2N1bWVudHMgZnJvbSB0aGUgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnRzICBUaGUgZG9jdW1lbnRzIHRvIGJlIHJlbW92ZWQuIElmIHRoaXMgYXJndW1lbnQgaXMgb21pdHRlZCxcbiAgICAgKiBhbGwgZG9jdW1lbnRzIGFyZSByZW1vdmVkLiBOb3RlIHRoYXQsIGZvciByZW1vdmluZyBhbGwgZG9jdW1lbnRzLCBpdCBpc1xuICAgICAqIG1vcmUgZWZmaWNpZW50IHRvIGNhbGwgdGhpcyBtZXRob2Qgd2l0aCBubyBhcmd1bWVudHMgdGhhbiB0byBwYXNzIGFsbFxuICAgICAqIGRvY3VtZW50cy5cbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoZG9jdW1lbnRzKSB7XG4gICAgICAgIHZhciBlXzgsIF9hO1xuICAgICAgICBpZiAoZG9jdW1lbnRzKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGRvY3VtZW50c18yID0gX192YWx1ZXMoZG9jdW1lbnRzKSwgZG9jdW1lbnRzXzJfMSA9IGRvY3VtZW50c18yLm5leHQoKTsgIWRvY3VtZW50c18yXzEuZG9uZTsgZG9jdW1lbnRzXzJfMSA9IGRvY3VtZW50c18yLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG9jdW1lbnRfMiA9IGRvY3VtZW50c18yXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGRvY3VtZW50XzIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzhfMSkgeyBlXzggPSB7IGVycm9yOiBlXzhfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnRzXzJfMSAmJiAhZG9jdW1lbnRzXzJfMS5kb25lICYmIChfYSA9IGRvY3VtZW50c18yLnJldHVybikpIF9hLmNhbGwoZG9jdW1lbnRzXzIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfOCkgdGhyb3cgZV84LmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgZG9jdW1lbnRzIHRvIGJlIHByZXNlbnQuIE9taXQgdGhlIGFyZ3VtZW50IHRvIHJlbW92ZSBhbGwgZG9jdW1lbnRzLicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faW5kZXggPSBuZXcgU2VhcmNoYWJsZU1hcCgpO1xuICAgICAgICAgICAgdGhpcy5fZG9jdW1lbnRDb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9kb2N1bWVudElkcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX2lkVG9TaG9ydElkID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5fZmllbGRMZW5ndGggPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLl9hdmdGaWVsZExlbmd0aCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc3RvcmVkRmllbGRzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5fbmV4dElkID0gMDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogRGlzY2FyZHMgdGhlIGRvY3VtZW50IHdpdGggdGhlIGdpdmVuIElELCBzbyBpdCB3b24ndCBhcHBlYXIgaW4gc2VhcmNoIHJlc3VsdHNcbiAgICAgKlxuICAgICAqIEl0IGhhcyB0aGUgc2FtZSB2aXNpYmxlIGVmZmVjdCBvZiB7QGxpbmsgTWluaVNlYXJjaC5yZW1vdmV9IChib3RoIGNhdXNlIHRoZVxuICAgICAqIGRvY3VtZW50IHRvIHN0b3AgYXBwZWFyaW5nIGluIHNlYXJjaGVzKSwgYnV0IGEgZGlmZmVyZW50IGVmZmVjdCBvbiB0aGVcbiAgICAgKiBpbnRlcm5hbCBkYXRhIHN0cnVjdHVyZXM6XG4gICAgICpcbiAgICAgKiAgIC0ge0BsaW5rIE1pbmlTZWFyY2gjcmVtb3ZlfSByZXF1aXJlcyBwYXNzaW5nIHRoZSBmdWxsIGRvY3VtZW50IHRvIGJlXG4gICAgICogICByZW1vdmVkIGFzIGFyZ3VtZW50LCBhbmQgcmVtb3ZlcyBpdCBmcm9tIHRoZSBpbnZlcnRlZCBpbmRleCBpbW1lZGlhdGVseS5cbiAgICAgKlxuICAgICAqICAgLSB7QGxpbmsgTWluaVNlYXJjaCNkaXNjYXJkfSBpbnN0ZWFkIG9ubHkgbmVlZHMgdGhlIGRvY3VtZW50IElELCBhbmRcbiAgICAgKiAgIHdvcmtzIGJ5IG1hcmtpbmcgdGhlIGN1cnJlbnQgdmVyc2lvbiBvZiB0aGUgZG9jdW1lbnQgYXMgZGlzY2FyZGVkLCBzbyBpdFxuICAgICAqICAgaXMgaW1tZWRpYXRlbHkgaWdub3JlZCBieSBzZWFyY2hlcy4gVGhpcyBpcyBmYXN0ZXIgYW5kIG1vcmUgY29udmVuaWVudFxuICAgICAqICAgdGhhbiB7QGxpbmsgTWluaVNlYXJjaCNyZW1vdmV9LCBidXQgdGhlIGluZGV4IGlzIG5vdCBpbW1lZGlhdGVseVxuICAgICAqICAgbW9kaWZpZWQuIFRvIHRha2UgY2FyZSBvZiB0aGF0LCB2YWN1dW1pbmcgaXMgcGVyZm9ybWVkIGFmdGVyIGEgY2VydGFpblxuICAgICAqICAgbnVtYmVyIG9mIGRvY3VtZW50cyBhcmUgZGlzY2FyZGVkLCBjbGVhbmluZyB1cCB0aGUgaW5kZXggYW5kIGFsbG93aW5nXG4gICAgICogICBtZW1vcnkgdG8gYmUgcmVsZWFzZWQuXG4gICAgICpcbiAgICAgKiBBZnRlciBkaXNjYXJkaW5nIGEgZG9jdW1lbnQsIGl0IGlzIHBvc3NpYmxlIHRvIHJlLWFkZCBhIG5ldyB2ZXJzaW9uLCBhbmRcbiAgICAgKiBvbmx5IHRoZSBuZXcgdmVyc2lvbiB3aWxsIGFwcGVhciBpbiBzZWFyY2hlcy4gSW4gb3RoZXIgd29yZHMsIGRpc2NhcmRpbmdcbiAgICAgKiBhbmQgcmUtYWRkaW5nIGEgZG9jdW1lbnQgd29ya3MgZXhhY3RseSBsaWtlIHJlbW92aW5nIGFuZCByZS1hZGRpbmcgaXQuIFRoZVxuICAgICAqIHtAbGluayBNaW5pU2VhcmNoLnJlcGxhY2V9IG1ldGhvZCBjYW4gYWxzbyBiZSB1c2VkIHRvIHJlcGxhY2UgYSBkb2N1bWVudFxuICAgICAqIHdpdGggYSBuZXcgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqICMjIyMgRGV0YWlscyBhYm91dCB2YWN1dW1pbmdcbiAgICAgKlxuICAgICAqIFJlcGV0aXRlIGNhbGxzIHRvIHRoaXMgbWV0aG9kIHdvdWxkIGxlYXZlIG9ic29sZXRlIGRvY3VtZW50IHJlZmVyZW5jZXMgaW5cbiAgICAgKiB0aGUgaW5kZXgsIGludmlzaWJsZSB0byBzZWFyY2hlcy4gVHdvIG1lY2hhbmlzbXMgdGFrZSBjYXJlIG9mIGNsZWFuaW5nIHVwOlxuICAgICAqIGNsZWFuIHVwIGR1cmluZyBzZWFyY2gsIGFuZCB2YWN1dW1pbmcuXG4gICAgICpcbiAgICAgKiAgIC0gVXBvbiBzZWFyY2gsIHdoZW5ldmVyIGEgZGlzY2FyZGVkIElEIGlzIGZvdW5kIChhbmQgaWdub3JlZCBmb3IgdGhlXG4gICAgICogICByZXN1bHRzKSwgcmVmZXJlbmNlcyB0byB0aGUgZGlzY2FyZGVkIGRvY3VtZW50IGFyZSByZW1vdmVkIGZyb20gdGhlXG4gICAgICogICBpbnZlcnRlZCBpbmRleCBlbnRyaWVzIGZvciB0aGUgc2VhcmNoIHRlcm1zLiBUaGlzIGVuc3VyZXMgdGhhdCBzdWJzZXF1ZW50XG4gICAgICogICBzZWFyY2hlcyBmb3IgdGhlIHNhbWUgdGVybXMgZG8gbm90IG5lZWQgdG8gc2tpcCB0aGVzZSBvYnNvbGV0ZSByZWZlcmVuY2VzXG4gICAgICogICBhZ2Fpbi5cbiAgICAgKlxuICAgICAqICAgLSBJbiBhZGRpdGlvbiwgdmFjdXVtaW5nIGlzIHBlcmZvcm1lZCBhdXRvbWF0aWNhbGx5IGJ5IGRlZmF1bHQgKHNlZSB0aGVcbiAgICAgKiAgIGBhdXRvVmFjdXVtYCBmaWVsZCBpbiB7QGxpbmsgT3B0aW9uc30pIGFmdGVyIGEgY2VydGFpbiBudW1iZXIgb2ZcbiAgICAgKiAgIGRvY3VtZW50cyBhcmUgZGlzY2FyZGVkLiBWYWN1dW1pbmcgdHJhdmVyc2VzIGFsbCB0ZXJtcyBpbiB0aGUgaW5kZXgsXG4gICAgICogICBjbGVhbmluZyB1cCBhbGwgcmVmZXJlbmNlcyB0byBkaXNjYXJkZWQgZG9jdW1lbnRzLiBWYWN1dW1pbmcgY2FuIGFsc28gYmVcbiAgICAgKiAgIHRyaWdnZXJlZCBtYW51YWxseSBieSBjYWxsaW5nIHtAbGluayBNaW5pU2VhcmNoI3ZhY3V1bX0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgIFRoZSBJRCBvZiB0aGUgZG9jdW1lbnQgdG8gYmUgZGlzY2FyZGVkXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuZGlzY2FyZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgc2hvcnRJZCA9IHRoaXMuX2lkVG9TaG9ydElkLmdldChpZCk7XG4gICAgICAgIGlmIChzaG9ydElkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pbmlTZWFyY2g6IGNhbm5vdCBkaXNjYXJkIGRvY3VtZW50IHdpdGggSUQgXCIuY29uY2F0KGlkLCBcIjogaXQgaXMgbm90IGluIHRoZSBpbmRleFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faWRUb1Nob3J0SWQuZGVsZXRlKGlkKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRJZHMuZGVsZXRlKHNob3J0SWQpO1xuICAgICAgICB0aGlzLl9zdG9yZWRGaWVsZHMuZGVsZXRlKHNob3J0SWQpO1xuICAgICAgICAodGhpcy5fZmllbGRMZW5ndGguZ2V0KHNob3J0SWQpIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZExlbmd0aCwgZmllbGRJZCkge1xuICAgICAgICAgICAgX3RoaXMucmVtb3ZlRmllbGRMZW5ndGgoc2hvcnRJZCwgZmllbGRJZCwgX3RoaXMuX2RvY3VtZW50Q291bnQsIGZpZWxkTGVuZ3RoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2ZpZWxkTGVuZ3RoLmRlbGV0ZShzaG9ydElkKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRDb3VudCAtPSAxO1xuICAgICAgICB0aGlzLl9kaXJ0Q291bnQgKz0gMTtcbiAgICAgICAgdGhpcy5tYXliZUF1dG9WYWN1dW0oKTtcbiAgICB9O1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLm1heWJlQXV0b1ZhY3V1bSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYXV0b1ZhY3V1bSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSB0aGlzLl9vcHRpb25zLmF1dG9WYWN1dW0sIG1pbkRpcnRGYWN0b3IgPSBfYS5taW5EaXJ0RmFjdG9yLCBtaW5EaXJ0Q291bnQgPSBfYS5taW5EaXJ0Q291bnQsIGJhdGNoU2l6ZSA9IF9hLmJhdGNoU2l6ZSwgYmF0Y2hXYWl0ID0gX2EuYmF0Y2hXYWl0O1xuICAgICAgICB0aGlzLmNvbmRpdGlvbmFsVmFjdXVtKHsgYmF0Y2hTaXplOiBiYXRjaFNpemUsIGJhdGNoV2FpdDogYmF0Y2hXYWl0IH0sIHsgbWluRGlydENvdW50OiBtaW5EaXJ0Q291bnQsIG1pbkRpcnRGYWN0b3I6IG1pbkRpcnRGYWN0b3IgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEaXNjYXJkcyB0aGUgZG9jdW1lbnRzIHdpdGggdGhlIGdpdmVuIElEcywgc28gdGhleSB3b24ndCBhcHBlYXIgaW4gc2VhcmNoXG4gICAgICogcmVzdWx0c1xuICAgICAqXG4gICAgICogSXQgaXMgZXF1aXZhbGVudCB0byBjYWxsaW5nIHtAbGluayBNaW5pU2VhcmNoI2Rpc2NhcmR9IGZvciBhbGwgdGhlIGdpdmVuXG4gICAgICogSURzLCBidXQgd2l0aCB0aGUgb3B0aW1pemF0aW9uIG9mIHRyaWdnZXJpbmcgYXQgbW9zdCBvbmUgYXV0b21hdGljXG4gICAgICogdmFjdXVtaW5nIGF0IHRoZSBlbmQuXG4gICAgICpcbiAgICAgKiBOb3RlOiB0byByZW1vdmUgYWxsIGRvY3VtZW50cyBmcm9tIHRoZSBpbmRleCwgaXQgaXMgZmFzdGVyIGFuZCBtb3JlXG4gICAgICogY29udmVuaWVudCB0byBjYWxsIHtAbGluayBNaW5pU2VhcmNoLnJlbW92ZUFsbH0gd2l0aCBubyBhcmd1bWVudCwgaW5zdGVhZFxuICAgICAqIG9mIHBhc3NpbmcgYWxsIElEcyB0byB0aGlzIG1ldGhvZC5cbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5kaXNjYXJkQWxsID0gZnVuY3Rpb24gKGlkcykge1xuICAgICAgICB2YXIgZV85LCBfYTtcbiAgICAgICAgdmFyIGF1dG9WYWN1dW0gPSB0aGlzLl9vcHRpb25zLmF1dG9WYWN1dW07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLmF1dG9WYWN1dW0gPSBmYWxzZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWRzXzEgPSBfX3ZhbHVlcyhpZHMpLCBpZHNfMV8xID0gaWRzXzEubmV4dCgpOyAhaWRzXzFfMS5kb25lOyBpZHNfMV8xID0gaWRzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IGlkc18xXzEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzY2FyZChpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVfOV8xKSB7IGVfOSA9IHsgZXJyb3I6IGVfOV8xIH07IH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZHNfMV8xICYmICFpZHNfMV8xLmRvbmUgJiYgKF9hID0gaWRzXzEucmV0dXJuKSkgX2EuY2FsbChpZHNfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV85KSB0aHJvdyBlXzkuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuYXV0b1ZhY3V1bSA9IGF1dG9WYWN1dW07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXliZUF1dG9WYWN1dW0oKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEl0IHJlcGxhY2VzIGFuIGV4aXN0aW5nIGRvY3VtZW50IHdpdGggdGhlIGdpdmVuIHVwZGF0ZWQgdmVyc2lvblxuICAgICAqXG4gICAgICogSXQgd29ya3MgYnkgZGlzY2FyZGluZyB0aGUgY3VycmVudCB2ZXJzaW9uIGFuZCBhZGRpbmcgdGhlIHVwZGF0ZWQgb25lLCBzb1xuICAgICAqIGl0IGlzIGZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIGNhbGxpbmcge0BsaW5rIE1pbmlTZWFyY2gjZGlzY2FyZH1cbiAgICAgKiBmb2xsb3dlZCBieSB7QGxpbmsgTWluaVNlYXJjaCNhZGR9LiBUaGUgSUQgb2YgdGhlIHVwZGF0ZWQgZG9jdW1lbnQgc2hvdWxkXG4gICAgICogYmUgdGhlIHNhbWUgYXMgdGhlIG9yaWdpbmFsIG9uZS5cbiAgICAgKlxuICAgICAqIFNpbmNlIGl0IHVzZXMge0BsaW5rIE1pbmlTZWFyY2gjZGlzY2FyZH0gaW50ZXJuYWxseSwgdGhpcyBtZXRob2QgcmVsaWVzIG9uXG4gICAgICogdmFjdXVtaW5nIHRvIGNsZWFuIHVwIG9ic29sZXRlIGRvY3VtZW50IHJlZmVyZW5jZXMgZnJvbSB0aGUgaW5kZXgsIGFsbG93aW5nXG4gICAgICogbWVtb3J5IHRvIGJlIHJlbGVhc2VkIChzZWUge0BsaW5rIE1pbmlTZWFyY2gjZGlzY2FyZH0pLlxuICAgICAqXG4gICAgICogQHBhcmFtIHVwZGF0ZWREb2N1bWVudCAgVGhlIHVwZGF0ZWQgZG9jdW1lbnQgdG8gcmVwbGFjZSB0aGUgb2xkIHZlcnNpb25cbiAgICAgKiB3aXRoXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uICh1cGRhdGVkRG9jdW1lbnQpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5fb3B0aW9ucywgaWRGaWVsZCA9IF9hLmlkRmllbGQsIGV4dHJhY3RGaWVsZCA9IF9hLmV4dHJhY3RGaWVsZDtcbiAgICAgICAgdmFyIGlkID0gZXh0cmFjdEZpZWxkKHVwZGF0ZWREb2N1bWVudCwgaWRGaWVsZCk7XG4gICAgICAgIHRoaXMuZGlzY2FyZChpZCk7XG4gICAgICAgIHRoaXMuYWRkKHVwZGF0ZWREb2N1bWVudCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhIG1hbnVhbCB2YWN1dW1pbmcsIGNsZWFuaW5nIHVwIHJlZmVyZW5jZXMgdG8gZGlzY2FyZGVkIGRvY3VtZW50c1xuICAgICAqIGZyb20gdGhlIGludmVydGVkIGluZGV4XG4gICAgICpcbiAgICAgKiBWYWN1dW1pbmcgaXMgb25seSB1c2VmdWwgZm9yIGFwcGxpY2F0aW9ucyB0aGF0IHVzZSB0aGUge0BsaW5rXG4gICAgICogTWluaVNlYXJjaCNkaXNjYXJkfSBvciB7QGxpbmsgTWluaVNlYXJjaCNyZXBsYWNlfSBtZXRob2RzLlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgdmFjdXVtaW5nIGlzIHBlcmZvcm1lZCBhdXRvbWF0aWNhbGx5IHdoZW4gbmVlZGVkIChjb250cm9sbGVkIGJ5XG4gICAgICogdGhlIGBhdXRvVmFjdXVtYCBmaWVsZCBpbiB7QGxpbmsgT3B0aW9uc30pLCBzbyB0aGVyZSBpcyB1c3VhbGx5IG5vIG5lZWQgdG9cbiAgICAgKiBjYWxsIHRoaXMgbWV0aG9kLCB1bmxlc3Mgb25lIHdhbnRzIHRvIG1ha2Ugc3VyZSB0byBwZXJmb3JtIHZhY3V1bWluZyBhdCBhXG4gICAgICogc3BlY2lmaWMgbW9tZW50LlxuICAgICAqXG4gICAgICogVmFjdXVtaW5nIHRyYXZlcnNlcyBhbGwgdGVybXMgaW4gdGhlIGludmVydGVkIGluZGV4IGluIGJhdGNoZXMsIGFuZCBjbGVhbnNcbiAgICAgKiB1cCByZWZlcmVuY2VzIHRvIGRpc2NhcmRlZCBkb2N1bWVudHMgZnJvbSB0aGUgcG9zdGluZyBsaXN0LCBhbGxvd2luZyBtZW1vcnlcbiAgICAgKiB0byBiZSByZWxlYXNlZC5cbiAgICAgKlxuICAgICAqIFRoZSBtZXRob2QgdGFrZXMgYW4gb3B0aW9uYWwgb2JqZWN0IGFzIGFyZ3VtZW50IHdpdGggdGhlIGZvbGxvd2luZyBrZXlzOlxuICAgICAqXG4gICAgICogICAtIGBiYXRjaFNpemVgOiB0aGUgc2l6ZSBvZiBlYWNoIGJhdGNoICgxMDAwIGJ5IGRlZmF1bHQpXG4gICAgICpcbiAgICAgKiAgIC0gYGJhdGNoV2FpdGA6IHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmV0d2VlbiBiYXRjaGVzICgxMCBieVxuICAgICAqICAgZGVmYXVsdClcbiAgICAgKlxuICAgICAqIE9uIGxhcmdlIGluZGV4ZXMsIHZhY3V1bWluZyBjb3VsZCBoYXZlIGEgbm9uLW5lZ2xpZ2libGUgY29zdDogYmF0Y2hpbmdcbiAgICAgKiBhdm9pZHMgYmxvY2tpbmcgdGhlIHRocmVhZCBmb3IgbG9uZywgZGlsdXRpbmcgdGhpcyBjb3N0IHNvIHRoYXQgaXQgaXMgbm90XG4gICAgICogbmVnYXRpdmVseSBhZmZlY3RpbmcgdGhlIGFwcGxpY2F0aW9uLiBOb25ldGhlbGVzcywgdGhpcyBtZXRob2Qgc2hvdWxkIG9ubHlcbiAgICAgKiBiZSBjYWxsZWQgd2hlbiBuZWNlc3NhcnksIGFuZCByZWx5aW5nIG9uIGF1dG9tYXRpYyB2YWN1dW1pbmcgaXMgdXN1YWxseVxuICAgICAqIGJldHRlci5cbiAgICAgKlxuICAgICAqIEl0IHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgKHRvIHVuZGVmaW5lZCkgd2hlbiB0aGUgY2xlYW4gdXAgaXNcbiAgICAgKiBjb21wbGV0ZWQuIElmIHZhY3V1bWluZyBpcyBhbHJlYWR5IG9uZ29pbmcgYXQgdGhlIHRpbWUgdGhpcyBtZXRob2QgaXNcbiAgICAgKiBjYWxsZWQsIGEgbmV3IG9uZSBpcyBlbnF1ZXVlZCBpbW1lZGlhdGVseSBhZnRlciB0aGUgb25nb2luZyBvbmUsIGFuZCBhXG4gICAgICogY29ycmVzcG9uZGluZyBwcm9taXNlIGlzIHJldHVybmVkLiBIb3dldmVyLCBubyBtb3JlIHRoYW4gb25lIHZhY3V1bWluZyBpc1xuICAgICAqIGVucXVldWVkIG9uIHRvcCBvZiB0aGUgb25nb2luZyBvbmUsIGV2ZW4gaWYgdGhpcyBtZXRob2QgaXMgY2FsbGVkIG1vcmVcbiAgICAgKiB0aW1lcyAoZW5xdWV1aW5nIG11bHRpcGxlIG9uZXMgd291bGQgYmUgdXNlbGVzcykuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAgQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGUgYmF0Y2ggc2l6ZSBhbmQgZGVsYXkuIFNlZVxuICAgICAqIHtAbGluayBWYWN1dW1PcHRpb25zfS5cbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS52YWN1dW0gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb25kaXRpb25hbFZhY3V1bShvcHRpb25zKTtcbiAgICB9O1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmNvbmRpdGlvbmFsVmFjdXVtID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNvbmRpdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gSWYgYSB2YWN1dW0gaXMgYWxyZWFkeSBvbmdvaW5nLCBzY2hlZHVsZSBhbm90aGVyIGFzIHNvb24gYXMgaXQgZmluaXNoZXMsXG4gICAgICAgIC8vIHVubGVzcyB0aGVyZSdzIGFscmVhZHkgb25lIGVucXVldWVkLiBJZiBvbmUgd2FzIGFscmVhZHkgZW5xdWV1ZWQsIGRvIG5vdFxuICAgICAgICAvLyBlbnF1ZXVlIGFub3RoZXIgb24gdG9wLCBidXQgbWFrZSBzdXJlIHRoYXQgdGhlIGNvbmRpdGlvbnMgYXJlIHRoZVxuICAgICAgICAvLyBicm9hZGVzdC5cbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRWYWN1dW0pIHtcbiAgICAgICAgICAgIHRoaXMuX2VucXVldWVkVmFjdXVtQ29uZGl0aW9ucyA9IHRoaXMuX2VucXVldWVkVmFjdXVtQ29uZGl0aW9ucyAmJiBjb25kaXRpb25zO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2VucXVldWVkVmFjdXVtICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5xdWV1ZWRWYWN1dW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lbnF1ZXVlZFZhY3V1bSA9IHRoaXMuX2N1cnJlbnRWYWN1dW0udGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmRpdGlvbnMgPSBfdGhpcy5fZW5xdWV1ZWRWYWN1dW1Db25kaXRpb25zO1xuICAgICAgICAgICAgICAgIF90aGlzLl9lbnF1ZXVlZFZhY3V1bUNvbmRpdGlvbnMgPSBkZWZhdWx0VmFjdXVtQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMucGVyZm9ybVZhY3V1bWluZyhvcHRpb25zLCBjb25kaXRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VucXVldWVkVmFjdXVtO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnZhY3V1bUNvbmRpdGlvbnNNZXQoY29uZGl0aW9ucykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VycmVudFZhY3V1bSA9IHRoaXMucGVyZm9ybVZhY3V1bWluZyhvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWYWN1dW07XG4gICAgfTtcbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5wZXJmb3JtVmFjdXVtaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNvbmRpdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGluaXRpYWxEaXJ0Q291bnQsIGJhdGNoU2l6ZSwgYmF0Y2hXYWl0XzEsIGksIF9hLCBfYiwgX2MsIHRlcm0sIGZpZWxkc0RhdGEsIGZpZWxkc0RhdGFfMSwgZmllbGRzRGF0YV8xXzEsIF9kLCBmaWVsZElkLCBmaWVsZEluZGV4LCBmaWVsZEluZGV4XzEsIGZpZWxkSW5kZXhfMV8xLCBfZSwgc2hvcnRJZCwgZV8xMF8xO1xuICAgICAgICAgICAgdmFyIGVfMTAsIF9mLCBlXzExLCBfZywgZV8xMiwgX2g7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9qKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfai5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsRGlydENvdW50ID0gdGhpcy5fZGlydENvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZhY3V1bUNvbmRpdGlvbnNNZXQoY29uZGl0aW9ucykpIHJldHVybiBbMyAvKmJyZWFrKi8sIDEwXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdGNoU2l6ZSA9IG9wdGlvbnMuYmF0Y2hTaXplIHx8IGRlZmF1bHRWYWN1dW1PcHRpb25zLmJhdGNoU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdGNoV2FpdF8xID0gb3B0aW9ucy5iYXRjaFdhaXQgfHwgZGVmYXVsdFZhY3V1bU9wdGlvbnMuYmF0Y2hXYWl0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBfai5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9qLnRyeXMucHVzaChbMSwgNywgOCwgOV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBfX3ZhbHVlcyh0aGlzLl9pbmRleCksIF9iID0gX2EubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2oubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFfYi5kb25lKSByZXR1cm4gWzMgLypicmVhayovLCA2XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jID0gX19yZWFkKF9iLnZhbHVlLCAyKSwgdGVybSA9IF9jWzBdLCBmaWVsZHNEYXRhID0gX2NbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoZmllbGRzRGF0YV8xID0gKGVfMTEgPSB2b2lkIDAsIF9fdmFsdWVzKGZpZWxkc0RhdGEpKSwgZmllbGRzRGF0YV8xXzEgPSBmaWVsZHNEYXRhXzEubmV4dCgpOyAhZmllbGRzRGF0YV8xXzEuZG9uZTsgZmllbGRzRGF0YV8xXzEgPSBmaWVsZHNEYXRhXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kID0gX19yZWFkKGZpZWxkc0RhdGFfMV8xLnZhbHVlLCAyKSwgZmllbGRJZCA9IF9kWzBdLCBmaWVsZEluZGV4ID0gX2RbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGZpZWxkSW5kZXhfMSA9IChlXzEyID0gdm9pZCAwLCBfX3ZhbHVlcyhmaWVsZEluZGV4KSksIGZpZWxkSW5kZXhfMV8xID0gZmllbGRJbmRleF8xLm5leHQoKTsgIWZpZWxkSW5kZXhfMV8xLmRvbmU7IGZpZWxkSW5kZXhfMV8xID0gZmllbGRJbmRleF8xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lID0gX19yZWFkKGZpZWxkSW5kZXhfMV8xLnZhbHVlLCAxKSwgc2hvcnRJZCA9IF9lWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kb2N1bWVudElkcy5oYXMoc2hvcnRJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZEluZGV4LnNpemUgPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZHNEYXRhLmRlbGV0ZShmaWVsZElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkSW5kZXguZGVsZXRlKHNob3J0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZV8xMl8xKSB7IGVfMTIgPSB7IGVycm9yOiBlXzEyXzEgfTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkSW5kZXhfMV8xICYmICFmaWVsZEluZGV4XzFfMS5kb25lICYmIChfaCA9IGZpZWxkSW5kZXhfMS5yZXR1cm4pKSBfaC5jYWxsKGZpZWxkSW5kZXhfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTIpIHRocm93IGVfMTIuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlXzExXzEpIHsgZV8xMSA9IHsgZXJyb3I6IGVfMTFfMSB9OyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRzRGF0YV8xXzEgJiYgIWZpZWxkc0RhdGFfMV8xLmRvbmUgJiYgKF9nID0gZmllbGRzRGF0YV8xLnJldHVybikpIF9nLmNhbGwoZmllbGRzRGF0YV8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzExKSB0aHJvdyBlXzExLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5kZXguZ2V0KHRlcm0pLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleC5kZWxldGUodGVybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpICUgYmF0Y2hTaXplID09PSAwKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gc2V0VGltZW91dChyZXNvbHZlLCBiYXRjaFdhaXRfMSk7IH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2ouc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2oubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBfai5sYWJlbCA9IDU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iID0gX2EubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjogcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMTBfMSA9IF9qLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVfMTAgPSB7IGVycm9yOiBlXzEwXzEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYiAmJiAhX2IuZG9uZSAmJiAoX2YgPSBfYS5yZXR1cm4pKSBfZi5jYWxsKF9hKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xMCkgdGhyb3cgZV8xMC5lcnJvcjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlydENvdW50IC09IGluaXRpYWxEaXJ0Q291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBfai5sYWJlbCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOiBcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgbmV4dCBsaW5lcyBhbHdheXMgYXN5bmMsIHNvIHRoZXkgZXhlY3V0ZSBhZnRlciB0aGlzIGZ1bmN0aW9uIHJldHVybnNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgbnVsbF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIHRoZSBuZXh0IGxpbmVzIGFsd2F5cyBhc3luYywgc28gdGhleSBleGVjdXRlIGFmdGVyIHRoaXMgZnVuY3Rpb24gcmV0dXJuc1xuICAgICAgICAgICAgICAgICAgICAgICAgX2ouc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFZhY3V1bSA9IHRoaXMuX2VucXVldWVkVmFjdXVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5xdWV1ZWRWYWN1dW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnZhY3V1bUNvbmRpdGlvbnNNZXQgPSBmdW5jdGlvbiAoY29uZGl0aW9ucykge1xuICAgICAgICBpZiAoY29uZGl0aW9ucyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWluRGlydENvdW50ID0gY29uZGl0aW9ucy5taW5EaXJ0Q291bnQsIG1pbkRpcnRGYWN0b3IgPSBjb25kaXRpb25zLm1pbkRpcnRGYWN0b3I7XG4gICAgICAgIG1pbkRpcnRDb3VudCA9IG1pbkRpcnRDb3VudCB8fCBkZWZhdWx0QXV0b1ZhY3V1bU9wdGlvbnMubWluRGlydENvdW50O1xuICAgICAgICBtaW5EaXJ0RmFjdG9yID0gbWluRGlydEZhY3RvciB8fCBkZWZhdWx0QXV0b1ZhY3V1bU9wdGlvbnMubWluRGlydEZhY3RvcjtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlydENvdW50ID49IG1pbkRpcnRDb3VudCAmJiB0aGlzLmRpcnRGYWN0b3IgPj0gbWluRGlydEZhY3RvcjtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNaW5pU2VhcmNoLnByb3RvdHlwZSwgXCJpc1ZhY3V1bWluZ1wiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyBgdHJ1ZWAgaWYgYSB2YWN1dW1pbmcgb3BlcmF0aW9uIGlzIG9uZ29pbmcsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmFjdXVtICE9IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWluaVNlYXJjaC5wcm90b3R5cGUsIFwiZGlydENvdW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2YgZG9jdW1lbnRzIGRpc2NhcmRlZCBzaW5jZSB0aGUgbW9zdCByZWNlbnQgdmFjdXVtaW5nXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXJ0Q291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWluaVNlYXJjaC5wcm90b3R5cGUsIFwiZGlydEZhY3RvclwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEgZ2l2aW5nIGFuIGluZGljYXRpb24gYWJvdXQgdGhlIHByb3BvcnRpb24gb2ZcbiAgICAgICAgICogZG9jdW1lbnRzIHRoYXQgYXJlIGRpc2NhcmRlZCwgYW5kIGNhbiB0aGVyZWZvcmUgYmUgY2xlYW5lZCB1cCBieSB2YWN1dW1pbmcuXG4gICAgICAgICAqIEEgdmFsdWUgY2xvc2UgdG8gMCBtZWFucyB0aGF0IHRoZSBpbmRleCBpcyByZWxhdGl2ZWx5IGNsZWFuLCB3aGlsZSBhIGhpZ2hlclxuICAgICAgICAgKiB2YWx1ZSBtZWFucyB0aGF0IHRoZSBpbmRleCBpcyByZWxhdGl2ZWx5IGRpcnR5LCBhbmQgdmFjdXVtaW5nIGNvdWxkIHJlbGVhc2VcbiAgICAgICAgICogbWVtb3J5LlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGlydENvdW50IC8gKDEgKyB0aGlzLl9kb2N1bWVudENvdW50ICsgdGhpcy5fZGlydENvdW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIGEgZG9jdW1lbnQgd2l0aCB0aGUgZ2l2ZW4gSUQgaXMgcHJlc2VudCBpbiB0aGUgaW5kZXggYW5kXG4gICAgICogYXZhaWxhYmxlIGZvciBzZWFyY2gsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgIFRoZSBkb2N1bWVudCBJRFxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWRUb1Nob3J0SWQuaGFzKGlkKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHN0b3JlZCBmaWVsZHMgKGFzIGNvbmZpZ3VyZWQgaW4gdGhlIGBzdG9yZUZpZWxkc2AgY29uc3RydWN0b3JcbiAgICAgKiBvcHRpb24pIGZvciB0aGUgZ2l2ZW4gZG9jdW1lbnQgSUQuIFJldHVybnMgYHVuZGVmaW5lZGAgaWYgdGhlIGRvY3VtZW50IGlzXG4gICAgICogbm90IHByZXNlbnQgaW4gdGhlIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkICBUaGUgZG9jdW1lbnQgSURcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5nZXRTdG9yZWRGaWVsZHMgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIHNob3J0SWQgPSB0aGlzLl9pZFRvU2hvcnRJZC5nZXQoaWQpO1xuICAgICAgICBpZiAoc2hvcnRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZWRGaWVsZHMuZ2V0KHNob3J0SWQpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2VhcmNoIGZvciBkb2N1bWVudHMgbWF0Y2hpbmcgdGhlIGdpdmVuIHNlYXJjaCBxdWVyeS5cbiAgICAgKlxuICAgICAqIFRoZSByZXN1bHQgaXMgYSBsaXN0IG9mIHNjb3JlZCBkb2N1bWVudCBJRHMgbWF0Y2hpbmcgdGhlIHF1ZXJ5LCBzb3J0ZWQgYnlcbiAgICAgKiBkZXNjZW5kaW5nIHNjb3JlLCBhbmQgZWFjaCBpbmNsdWRpbmcgZGF0YSBhYm91dCB3aGljaCB0ZXJtcyB3ZXJlIG1hdGNoZWQgYW5kXG4gICAgICogaW4gd2hpY2ggZmllbGRzLlxuICAgICAqXG4gICAgICogIyMjIEJhc2ljIHVzYWdlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFNlYXJjaCBmb3IgXCJ6ZW4gYXJ0IG1vdG9yY3ljbGVcIiB3aXRoIGRlZmF1bHQgb3B0aW9uczogdGVybXMgaGF2ZSB0byBtYXRjaFxuICAgICAqIC8vIGV4YWN0bHksIGFuZCBpbmRpdmlkdWFsIHRlcm1zIGFyZSBqb2luZWQgd2l0aCBPUlxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCd6ZW4gYXJ0IG1vdG9yY3ljbGUnKVxuICAgICAqIC8vID0+IFsgeyBpZDogMiwgc2NvcmU6IDIuNzcyNTgsIG1hdGNoOiB7IC4uLiB9IH0sIHsgaWQ6IDQsIHNjb3JlOiAxLjM4NjI5LCBtYXRjaDogeyAuLi4gfSB9IF1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBSZXN0cmljdCBzZWFyY2ggdG8gc3BlY2lmaWMgZmllbGRzOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFNlYXJjaCBvbmx5IGluIHRoZSAndGl0bGUnIGZpZWxkXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ3plbicsIHsgZmllbGRzOiBbJ3RpdGxlJ10gfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBGaWVsZCBib29zdGluZzpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBCb29zdCBhIGZpZWxkXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ3plbicsIHsgYm9vc3Q6IHsgdGl0bGU6IDIgfSB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIFByZWZpeCBzZWFyY2g6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gU2VhcmNoIGZvciBcIm1vdG9cIiB3aXRoIHByZWZpeCBzZWFyY2ggKGl0IHdpbGwgbWF0Y2ggZG9jdW1lbnRzXG4gICAgICogLy8gY29udGFpbmluZyB0ZXJtcyB0aGF0IHN0YXJ0IHdpdGggXCJtb3RvXCIgb3IgXCJuZXVyb1wiKVxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCdtb3RvIG5ldXJvJywgeyBwcmVmaXg6IHRydWUgfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBGdXp6eSBzZWFyY2g6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gU2VhcmNoIGZvciBcImlzbWFlbFwiIHdpdGggZnV6enkgc2VhcmNoIChpdCB3aWxsIG1hdGNoIGRvY3VtZW50cyBjb250YWluaW5nXG4gICAgICogLy8gdGVybXMgc2ltaWxhciB0byBcImlzbWFlbFwiLCB3aXRoIGEgbWF4aW11bSBlZGl0IGRpc3RhbmNlIG9mIDAuMiB0ZXJtLmxlbmd0aFxuICAgICAqIC8vIChyb3VuZGVkIHRvIG5lYXJlc3QgaW50ZWdlcilcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnaXNtYWVsJywgeyBmdXp6eTogMC4yIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgQ29tYmluaW5nIHN0cmF0ZWdpZXM6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gTWl4IG9mIGV4YWN0IG1hdGNoLCBwcmVmaXggc2VhcmNoLCBhbmQgZnV6enkgc2VhcmNoXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ2lzbWFlbCBtb2InLCB7XG4gICAgICogIHByZWZpeDogdHJ1ZSxcbiAgICAgKiAgZnV6enk6IDAuMlxuICAgICAqIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgQWR2YW5jZWQgcHJlZml4IGFuZCBmdXp6eSBzZWFyY2g6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gUGVyZm9ybSBmdXp6eSBhbmQgcHJlZml4IHNlYXJjaCBkZXBlbmRpbmcgb24gdGhlIHNlYXJjaCB0ZXJtLiBIZXJlXG4gICAgICogLy8gcGVyZm9ybWluZyBwcmVmaXggYW5kIGZ1enp5IHNlYXJjaCBvbmx5IG9uIHRlcm1zIGxvbmdlciB0aGFuIDMgY2hhcmFjdGVyc1xuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKCdpc21hZWwgbW9iJywge1xuICAgICAqICBwcmVmaXg6IHRlcm0gPT4gdGVybS5sZW5ndGggPiAzXG4gICAgICogIGZ1enp5OiB0ZXJtID0+IHRlcm0ubGVuZ3RoID4gMyA/IDAuMiA6IG51bGxcbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIENvbWJpbmUgd2l0aCBBTkQ6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gQ29tYmluZSBzZWFyY2ggdGVybXMgd2l0aCBBTkQgKHRvIG1hdGNoIG9ubHkgZG9jdW1lbnRzIHRoYXQgY29udGFpbiBib3RoXG4gICAgICogLy8gXCJtb3RvcmN5Y2xlXCIgYW5kIFwiYXJ0XCIpXG4gICAgICogbWluaVNlYXJjaC5zZWFyY2goJ21vdG9yY3ljbGUgYXJ0JywgeyBjb21iaW5lV2l0aDogJ0FORCcgfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBDb21iaW5lIHdpdGggQU5EX05PVDpcbiAgICAgKlxuICAgICAqIFRoZXJlIGlzIGFsc28gYW4gQU5EX05PVCBjb21iaW5hdG9yLCB0aGF0IGZpbmRzIGRvY3VtZW50cyB0aGF0IG1hdGNoIHRoZVxuICAgICAqIGZpcnN0IHRlcm0sIGJ1dCBkbyBub3QgbWF0Y2ggYW55IG9mIHRoZSBvdGhlciB0ZXJtcy4gVGhpcyBjb21iaW5hdG9yIGlzXG4gICAgICogcmFyZWx5IHVzZWZ1bCB3aXRoIHNpbXBsZSBxdWVyaWVzLCBhbmQgaXMgbWVhbnQgdG8gYmUgdXNlZCB3aXRoIGFkdmFuY2VkXG4gICAgICogcXVlcnkgY29tYmluYXRpb25zIChzZWUgbGF0ZXIgZm9yIG1vcmUgZGV0YWlscykuXG4gICAgICpcbiAgICAgKiAjIyMgRmlsdGVyaW5nIHJlc3VsdHM6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gRmlsdGVyIG9ubHkgcmVzdWx0cyBpbiB0aGUgJ2ZpY3Rpb24nIGNhdGVnb3J5IChhc3N1bWluZyB0aGF0ICdjYXRlZ29yeSdcbiAgICAgKiAvLyBpcyBhIHN0b3JlZCBmaWVsZClcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaCgnbW90b3JjeWNsZSBhcnQnLCB7XG4gICAgICogICBmaWx0ZXI6IChyZXN1bHQpID0+IHJlc3VsdC5jYXRlZ29yeSA9PT0gJ2ZpY3Rpb24nXG4gICAgICogfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBXaWxkY2FyZCBxdWVyeVxuICAgICAqXG4gICAgICogU2VhcmNoaW5nIGZvciBhbiBlbXB0eSBzdHJpbmcgKGFzc3VtaW5nIHRoZSBkZWZhdWx0IHRva2VuaXplcikgcmV0dXJucyBub1xuICAgICAqIHJlc3VsdHMuIFNvbWV0aW1lcyB0aG91Z2gsIG9uZSBuZWVkcyB0byBtYXRjaCBhbGwgZG9jdW1lbnRzLCBsaWtlIGluIGFcbiAgICAgKiBcIndpbGRjYXJkXCIgc2VhcmNoLiBUaGlzIGlzIHBvc3NpYmxlIGJ5IHBhc3NpbmcgdGhlIHNwZWNpYWwgdmFsdWVcbiAgICAgKiB7QGxpbmsgTWluaVNlYXJjaC53aWxkY2FyZH0gYXMgdGhlIHF1ZXJ5OlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFJldHVybiBzZWFyY2ggcmVzdWx0cyBmb3IgYWxsIGRvY3VtZW50c1xuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKE1pbmlTZWFyY2gud2lsZGNhcmQpXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgc2VhcmNoIG9wdGlvbnMgc3VjaCBhcyBgZmlsdGVyYCBhbmQgYGJvb3N0RG9jdW1lbnRgIGFyZSBzdGlsbFxuICAgICAqIGFwcGxpZWQsIGluZmx1ZW5jaW5nIHdoaWNoIHJlc3VsdHMgYXJlIHJldHVybmVkLCBhbmQgdGhlaXIgb3JkZXI6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gUmV0dXJuIHNlYXJjaCByZXN1bHRzIGZvciBhbGwgZG9jdW1lbnRzIGluIHRoZSAnZmljdGlvbicgY2F0ZWdvcnlcbiAgICAgKiBtaW5pU2VhcmNoLnNlYXJjaChNaW5pU2VhcmNoLndpbGRjYXJkLCB7XG4gICAgICogICBmaWx0ZXI6IChyZXN1bHQpID0+IHJlc3VsdC5jYXRlZ29yeSA9PT0gJ2ZpY3Rpb24nXG4gICAgICogfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBBZHZhbmNlZCBjb21iaW5hdGlvbiBvZiBxdWVyaWVzOlxuICAgICAqXG4gICAgICogSXQgaXMgcG9zc2libGUgdG8gY29tYmluZSBkaWZmZXJlbnQgc3VicXVlcmllcyB3aXRoIE9SLCBBTkQsIGFuZCBBTkRfTk9ULFxuICAgICAqIGFuZCBldmVuIHdpdGggZGlmZmVyZW50IHNlYXJjaCBvcHRpb25zLCBieSBwYXNzaW5nIGEgcXVlcnkgZXhwcmVzc2lvblxuICAgICAqIHRyZWUgb2JqZWN0IGFzIHRoZSBmaXJzdCBhcmd1bWVudCwgaW5zdGVhZCBvZiBhIHN0cmluZy5cbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBTZWFyY2ggZm9yIGRvY3VtZW50cyB0aGF0IGNvbnRhaW4gXCJ6ZW5cIiBhbmQgKFwibW90b3JjeWNsZVwiIG9yIFwiYXJjaGVyeVwiKVxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKHtcbiAgICAgKiAgIGNvbWJpbmVXaXRoOiAnQU5EJyxcbiAgICAgKiAgIHF1ZXJpZXM6IFtcbiAgICAgKiAgICAgJ3plbicsXG4gICAgICogICAgIHtcbiAgICAgKiAgICAgICBjb21iaW5lV2l0aDogJ09SJyxcbiAgICAgKiAgICAgICBxdWVyaWVzOiBbJ21vdG9yY3ljbGUnLCAnYXJjaGVyeSddXG4gICAgICogICAgIH1cbiAgICAgKiAgIF1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogLy8gU2VhcmNoIGZvciBkb2N1bWVudHMgdGhhdCBjb250YWluIChcImFwcGxlXCIgb3IgXCJwZWFyXCIpIGJ1dCBub3QgXCJqdWljZVwiIGFuZFxuICAgICAqIC8vIG5vdCBcInRyZWVcIlxuICAgICAqIG1pbmlTZWFyY2guc2VhcmNoKHtcbiAgICAgKiAgIGNvbWJpbmVXaXRoOiAnQU5EX05PVCcsXG4gICAgICogICBxdWVyaWVzOiBbXG4gICAgICogICAgIHtcbiAgICAgKiAgICAgICBjb21iaW5lV2l0aDogJ09SJyxcbiAgICAgKiAgICAgICBxdWVyaWVzOiBbJ2FwcGxlJywgJ3BlYXInXVxuICAgICAqICAgICB9LFxuICAgICAqICAgICAnanVpY2UnLFxuICAgICAqICAgICAndHJlZSdcbiAgICAgKiAgIF1cbiAgICAgKiB9KVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogRWFjaCBub2RlIGluIHRoZSBleHByZXNzaW9uIHRyZWUgY2FuIGJlIGVpdGhlciBhIHN0cmluZywgb3IgYW4gb2JqZWN0IHRoYXRcbiAgICAgKiBzdXBwb3J0cyBhbGwge0BsaW5rIFNlYXJjaE9wdGlvbnN9IGZpZWxkcywgcGx1cyBhIGBxdWVyaWVzYCBhcnJheSBmaWVsZCBmb3JcbiAgICAgKiBzdWJxdWVyaWVzLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0LCB3aGlsZSB0aGlzIGNhbiBiZWNvbWUgY29tcGxpY2F0ZWQgdG8gZG8gYnkgaGFuZCBmb3IgY29tcGxleCBvclxuICAgICAqIGRlZXBseSBuZXN0ZWQgcXVlcmllcywgaXQgcHJvdmlkZXMgYSBmb3JtYWxpemVkIGV4cHJlc3Npb24gdHJlZSBBUEkgZm9yXG4gICAgICogZXh0ZXJuYWwgbGlicmFyaWVzIHRoYXQgaW1wbGVtZW50IGEgcGFyc2VyIGZvciBjdXN0b20gcXVlcnkgbGFuZ3VhZ2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXJ5ICBTZWFyY2ggcXVlcnlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAgU2VhcmNoIG9wdGlvbnMuIEVhY2ggb3B0aW9uLCBpZiBub3QgZ2l2ZW4sIGRlZmF1bHRzIHRvIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIG9mIGBzZWFyY2hPcHRpb25zYCBnaXZlbiB0byB0aGUgY29uc3RydWN0b3IsIG9yIHRvIHRoZSBsaWJyYXJ5IGRlZmF1bHQuXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24gKHF1ZXJ5LCBzZWFyY2hPcHRpb25zKSB7XG4gICAgICAgIHZhciBlXzEzLCBfYTtcbiAgICAgICAgaWYgKHNlYXJjaE9wdGlvbnMgPT09IHZvaWQgMCkgeyBzZWFyY2hPcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIHJhd1Jlc3VsdHMgPSB0aGlzLmV4ZWN1dGVRdWVyeShxdWVyeSwgc2VhcmNoT3B0aW9ucyk7XG4gICAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciByYXdSZXN1bHRzXzEgPSBfX3ZhbHVlcyhyYXdSZXN1bHRzKSwgcmF3UmVzdWx0c18xXzEgPSByYXdSZXN1bHRzXzEubmV4dCgpOyAhcmF3UmVzdWx0c18xXzEuZG9uZTsgcmF3UmVzdWx0c18xXzEgPSByYXdSZXN1bHRzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9iID0gX19yZWFkKHJhd1Jlc3VsdHNfMV8xLnZhbHVlLCAyKSwgZG9jSWQgPSBfYlswXSwgX2MgPSBfYlsxXSwgc2NvcmUgPSBfYy5zY29yZSwgdGVybXMgPSBfYy50ZXJtcywgbWF0Y2ggPSBfYy5tYXRjaDtcbiAgICAgICAgICAgICAgICAvLyB0ZXJtcyBhcmUgdGhlIG1hdGNoZWQgcXVlcnkgdGVybXMsIHdoaWNoIHdpbGwgYmUgcmV0dXJuZWQgdG8gdGhlIHVzZXJcbiAgICAgICAgICAgICAgICAvLyBhcyBxdWVyeVRlcm1zLiBUaGUgcXVhbGl0eSBpcyBjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZW0sIGFzIG9wcG9zZWQgdG9cbiAgICAgICAgICAgICAgICAvLyB0aGUgbWF0Y2hlZCB0ZXJtcyBpbiB0aGUgZG9jdW1lbnQgKHdoaWNoIGNhbiBiZSBkaWZmZXJlbnQgZHVlIHRvXG4gICAgICAgICAgICAgICAgLy8gcHJlZml4IGFuZCBmdXp6eSBtYXRjaClcbiAgICAgICAgICAgICAgICB2YXIgcXVhbGl0eSA9IHRlcm1zLmxlbmd0aCB8fCAxO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLl9kb2N1bWVudElkcy5nZXQoZG9jSWQpLFxuICAgICAgICAgICAgICAgICAgICBzY29yZTogc2NvcmUgKiBxdWFsaXR5LFxuICAgICAgICAgICAgICAgICAgICB0ZXJtczogT2JqZWN0LmtleXMobWF0Y2gpLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeVRlcm1zOiB0ZXJtcyxcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IG1hdGNoXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgdGhpcy5fc3RvcmVkRmllbGRzLmdldChkb2NJZCkpO1xuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hPcHRpb25zLmZpbHRlciA9PSBudWxsIHx8IHNlYXJjaE9wdGlvbnMuZmlsdGVyKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzEzXzEpIHsgZV8xMyA9IHsgZXJyb3I6IGVfMTNfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAocmF3UmVzdWx0c18xXzEgJiYgIXJhd1Jlc3VsdHNfMV8xLmRvbmUgJiYgKF9hID0gcmF3UmVzdWx0c18xLnJldHVybikpIF9hLmNhbGwocmF3UmVzdWx0c18xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xMykgdGhyb3cgZV8xMy5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIGl0J3MgYSB3aWxkY2FyZCBxdWVyeSwgYW5kIG5vIGRvY3VtZW50IGJvb3N0IGlzIGFwcGxpZWQsIHNraXAgc29ydGluZ1xuICAgICAgICAvLyB0aGUgcmVzdWx0cywgYXMgYWxsIHJlc3VsdHMgaGF2ZSB0aGUgc2FtZSBzY29yZSBvZiAxXG4gICAgICAgIGlmIChxdWVyeSA9PT0gTWluaVNlYXJjaC53aWxkY2FyZCAmJlxuICAgICAgICAgICAgc2VhcmNoT3B0aW9ucy5ib29zdERvY3VtZW50ID09IG51bGwgJiZcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2VhcmNoT3B0aW9ucy5ib29zdERvY3VtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMuc29ydChieVNjb3JlKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQcm92aWRlIHN1Z2dlc3Rpb25zIGZvciB0aGUgZ2l2ZW4gc2VhcmNoIHF1ZXJ5XG4gICAgICpcbiAgICAgKiBUaGUgcmVzdWx0IGlzIGEgbGlzdCBvZiBzdWdnZXN0ZWQgbW9kaWZpZWQgc2VhcmNoIHF1ZXJpZXMsIGRlcml2ZWQgZnJvbSB0aGVcbiAgICAgKiBnaXZlbiBzZWFyY2ggcXVlcnksIGVhY2ggd2l0aCBhIHJlbGV2YW5jZSBzY29yZSwgc29ydGVkIGJ5IGRlc2NlbmRpbmcgc2NvcmUuXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCBpdCB1c2VzIHRoZSBzYW1lIG9wdGlvbnMgdXNlZCBmb3Igc2VhcmNoLCBleGNlcHQgdGhhdCBieVxuICAgICAqIGRlZmF1bHQgaXQgcGVyZm9ybXMgcHJlZml4IHNlYXJjaCBvbiB0aGUgbGFzdCB0ZXJtIG9mIHRoZSBxdWVyeSwgYW5kXG4gICAgICogY29tYmluZSB0ZXJtcyB3aXRoIGAnQU5EJ2AgKHJlcXVpcmluZyBhbGwgcXVlcnkgdGVybXMgdG8gbWF0Y2gpLiBDdXN0b21cbiAgICAgKiBvcHRpb25zIGNhbiBiZSBwYXNzZWQgYXMgYSBzZWNvbmQgYXJndW1lbnQuIERlZmF1bHRzIGNhbiBiZSBjaGFuZ2VkIHVwb25cbiAgICAgKiBjYWxsaW5nIHRoZSB7QGxpbmsgTWluaVNlYXJjaH0gY29uc3RydWN0b3IsIGJ5IHBhc3NpbmcgYVxuICAgICAqIGBhdXRvU3VnZ2VzdE9wdGlvbnNgIG9wdGlvbi5cbiAgICAgKlxuICAgICAqICMjIyBCYXNpYyB1c2FnZTpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBHZXQgc3VnZ2VzdGlvbnMgZm9yICduZXVybyc6XG4gICAgICogbWluaVNlYXJjaC5hdXRvU3VnZ2VzdCgnbmV1cm8nKVxuICAgICAqIC8vID0+IFsgeyBzdWdnZXN0aW9uOiAnbmV1cm9tYW5jZXInLCB0ZXJtczogWyAnbmV1cm9tYW5jZXInIF0sIHNjb3JlOiAwLjQ2MjQwIH0gXVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogIyMjIE11bHRpcGxlIHdvcmRzOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEdldCBzdWdnZXN0aW9ucyBmb3IgJ3plbiBhcic6XG4gICAgICogbWluaVNlYXJjaC5hdXRvU3VnZ2VzdCgnemVuIGFyJylcbiAgICAgKiAvLyA9PiBbXG4gICAgICogLy8gIHsgc3VnZ2VzdGlvbjogJ3plbiBhcmNoZXJ5IGFydCcsIHRlcm1zOiBbICd6ZW4nLCAnYXJjaGVyeScsICdhcnQnIF0sIHNjb3JlOiAxLjczMzMyIH0sXG4gICAgICogLy8gIHsgc3VnZ2VzdGlvbjogJ3plbiBhcnQnLCB0ZXJtczogWyAnemVuJywgJ2FydCcgXSwgc2NvcmU6IDEuMjEzMTMgfVxuICAgICAqIC8vIF1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqICMjIyBGdXp6eSBzdWdnZXN0aW9uczpcbiAgICAgKlxuICAgICAqIGBgYGphdmFzY3JpcHRcbiAgICAgKiAvLyBDb3JyZWN0IHNwZWxsaW5nIG1pc3Rha2VzIHVzaW5nIGZ1enp5IHNlYXJjaDpcbiAgICAgKiBtaW5pU2VhcmNoLmF1dG9TdWdnZXN0KCduZXJvbWFuY2VyJywgeyBmdXp6eTogMC4yIH0pXG4gICAgICogLy8gPT4gWyB7IHN1Z2dlc3Rpb246ICduZXVyb21hbmNlcicsIHRlcm1zOiBbICduZXVyb21hbmNlcicgXSwgc2NvcmU6IDEuMDM5OTggfSBdXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiAjIyMgRmlsdGVyaW5nOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIEdldCBzdWdnZXN0aW9ucyBmb3IgJ3plbiBhcicsIGJ1dCBvbmx5IHdpdGhpbiB0aGUgJ2ZpY3Rpb24nIGNhdGVnb3J5XG4gICAgICogLy8gKGFzc3VtaW5nIHRoYXQgJ2NhdGVnb3J5JyBpcyBhIHN0b3JlZCBmaWVsZCk6XG4gICAgICogbWluaVNlYXJjaC5hdXRvU3VnZ2VzdCgnemVuIGFyJywge1xuICAgICAqICAgZmlsdGVyOiAocmVzdWx0KSA9PiByZXN1bHQuY2F0ZWdvcnkgPT09ICdmaWN0aW9uJ1xuICAgICAqIH0pXG4gICAgICogLy8gPT4gW1xuICAgICAqIC8vICB7IHN1Z2dlc3Rpb246ICd6ZW4gYXJjaGVyeSBhcnQnLCB0ZXJtczogWyAnemVuJywgJ2FyY2hlcnknLCAnYXJ0JyBdLCBzY29yZTogMS43MzMzMiB9LFxuICAgICAqIC8vICB7IHN1Z2dlc3Rpb246ICd6ZW4gYXJ0JywgdGVybXM6IFsgJ3plbicsICdhcnQnIF0sIHNjb3JlOiAxLjIxMzEzIH1cbiAgICAgKiAvLyBdXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcXVlcnlTdHJpbmcgIFF1ZXJ5IHN0cmluZyB0byBiZSBleHBhbmRlZCBpbnRvIHN1Z2dlc3Rpb25zXG4gICAgICogQHBhcmFtIG9wdGlvbnMgIFNlYXJjaCBvcHRpb25zLiBUaGUgc3VwcG9ydGVkIG9wdGlvbnMgYW5kIGRlZmF1bHQgdmFsdWVzXG4gICAgICogYXJlIHRoZSBzYW1lIGFzIGZvciB0aGUge0BsaW5rIE1pbmlTZWFyY2gjc2VhcmNofSBtZXRob2QsIGV4Y2VwdCB0aGF0IGJ5XG4gICAgICogZGVmYXVsdCBwcmVmaXggc2VhcmNoIGlzIHBlcmZvcm1lZCBvbiB0aGUgbGFzdCB0ZXJtIGluIHRoZSBxdWVyeSwgYW5kIHRlcm1zXG4gICAgICogYXJlIGNvbWJpbmVkIHdpdGggYCdBTkQnYC5cbiAgICAgKiBAcmV0dXJuICBBIHNvcnRlZCBhcnJheSBvZiBzdWdnZXN0aW9ucyBzb3J0ZWQgYnkgcmVsZXZhbmNlIHNjb3JlLlxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmF1dG9TdWdnZXN0ID0gZnVuY3Rpb24gKHF1ZXJ5U3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBlXzE0LCBfYSwgZV8xNSwgX2I7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIG9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgdGhpcy5fb3B0aW9ucy5hdXRvU3VnZ2VzdE9wdGlvbnMpLCBvcHRpb25zKTtcbiAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gbmV3IE1hcCgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2MgPSBfX3ZhbHVlcyh0aGlzLnNlYXJjaChxdWVyeVN0cmluZywgb3B0aW9ucykpLCBfZCA9IF9jLm5leHQoKTsgIV9kLmRvbmU7IF9kID0gX2MubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9lID0gX2QudmFsdWUsIHNjb3JlID0gX2Uuc2NvcmUsIHRlcm1zID0gX2UudGVybXM7XG4gICAgICAgICAgICAgICAgdmFyIHBocmFzZSA9IHRlcm1zLmpvaW4oJyAnKTtcbiAgICAgICAgICAgICAgICB2YXIgc3VnZ2VzdGlvbiA9IHN1Z2dlc3Rpb25zLmdldChwaHJhc2UpO1xuICAgICAgICAgICAgICAgIGlmIChzdWdnZXN0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbi5zY29yZSArPSBzY29yZTtcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbi5jb3VudCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMuc2V0KHBocmFzZSwgeyBzY29yZTogc2NvcmUsIHRlcm1zOiB0ZXJtcywgY291bnQ6IDEgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzE0XzEpIHsgZV8xNCA9IHsgZXJyb3I6IGVfMTRfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2QgJiYgIV9kLmRvbmUgJiYgKF9hID0gX2MucmV0dXJuKSkgX2EuY2FsbChfYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTQpIHRocm93IGVfMTQuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgc3VnZ2VzdGlvbnNfMSA9IF9fdmFsdWVzKHN1Z2dlc3Rpb25zKSwgc3VnZ2VzdGlvbnNfMV8xID0gc3VnZ2VzdGlvbnNfMS5uZXh0KCk7ICFzdWdnZXN0aW9uc18xXzEuZG9uZTsgc3VnZ2VzdGlvbnNfMV8xID0gc3VnZ2VzdGlvbnNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2YgPSBfX3JlYWQoc3VnZ2VzdGlvbnNfMV8xLnZhbHVlLCAyKSwgc3VnZ2VzdGlvbiA9IF9mWzBdLCBfZyA9IF9mWzFdLCBzY29yZSA9IF9nLnNjb3JlLCB0ZXJtcyA9IF9nLnRlcm1zLCBjb3VudCA9IF9nLmNvdW50O1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7IHN1Z2dlc3Rpb246IHN1Z2dlc3Rpb24sIHRlcm1zOiB0ZXJtcywgc2NvcmU6IHNjb3JlIC8gY291bnQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMTVfMSkgeyBlXzE1ID0geyBlcnJvcjogZV8xNV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChzdWdnZXN0aW9uc18xXzEgJiYgIXN1Z2dlc3Rpb25zXzFfMS5kb25lICYmIChfYiA9IHN1Z2dlc3Rpb25zXzEucmV0dXJuKSkgX2IuY2FsbChzdWdnZXN0aW9uc18xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xNSkgdGhyb3cgZV8xNS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMuc29ydChieVNjb3JlKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWluaVNlYXJjaC5wcm90b3R5cGUsIFwiZG9jdW1lbnRDb3VudFwiLCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUb3RhbCBudW1iZXIgb2YgZG9jdW1lbnRzIGF2YWlsYWJsZSB0byBzZWFyY2hcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RvY3VtZW50Q291bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWluaVNlYXJjaC5wcm90b3R5cGUsIFwidGVybUNvdW50XCIsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE51bWJlciBvZiB0ZXJtcyBpbiB0aGUgaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luZGV4LnNpemU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBEZXNlcmlhbGl6ZXMgYSBKU09OIGluZGV4IChzZXJpYWxpemVkIHdpdGggYEpTT04uc3RyaW5naWZ5KG1pbmlTZWFyY2gpYClcbiAgICAgKiBhbmQgaW5zdGFudGlhdGVzIGEgTWluaVNlYXJjaCBpbnN0YW5jZS4gSXQgc2hvdWxkIGJlIGdpdmVuIHRoZSBzYW1lIG9wdGlvbnNcbiAgICAgKiBvcmlnaW5hbGx5IHVzZWQgd2hlbiBzZXJpYWxpemluZyB0aGUgaW5kZXguXG4gICAgICpcbiAgICAgKiAjIyMgVXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gSWYgdGhlIGluZGV4IHdhcyBzZXJpYWxpemVkIHdpdGg6XG4gICAgICogbGV0IG1pbmlTZWFyY2ggPSBuZXcgTWluaVNlYXJjaCh7IGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBtaW5pU2VhcmNoLmFkZEFsbChkb2N1bWVudHMpXG4gICAgICpcbiAgICAgKiBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkobWluaVNlYXJjaClcbiAgICAgKiAvLyBJdCBjYW4gbGF0ZXIgYmUgZGVzZXJpYWxpemVkIGxpa2UgdGhpczpcbiAgICAgKiBtaW5pU2VhcmNoID0gTWluaVNlYXJjaC5sb2FkSlNPTihqc29uLCB7IGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBqc29uICBKU09OLXNlcmlhbGl6ZWQgaW5kZXhcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAgY29uZmlndXJhdGlvbiBvcHRpb25zLCBzYW1lIGFzIHRoZSBjb25zdHJ1Y3RvclxuICAgICAqIEByZXR1cm4gQW4gaW5zdGFuY2Ugb2YgTWluaVNlYXJjaCBkZXNlcmlhbGl6ZWQgZnJvbSB0aGUgZ2l2ZW4gSlNPTi5cbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLmxvYWRKU09OID0gZnVuY3Rpb24gKGpzb24sIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2VhcmNoOiBsb2FkSlNPTiBzaG91bGQgYmUgZ2l2ZW4gdGhlIHNhbWUgb3B0aW9ucyB1c2VkIHdoZW4gc2VyaWFsaXppbmcgdGhlIGluZGV4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZEpTKEpTT04ucGFyc2UoanNvbiksIG9wdGlvbnMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhbiBvcHRpb24uIEl0IHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgbm8gb3B0aW9uXG4gICAgICogd2l0aCB0aGUgZ2l2ZW4gbmFtZSBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uTmFtZSAgTmFtZSBvZiB0aGUgb3B0aW9uXG4gICAgICogQHJldHVybiBUaGUgZGVmYXVsdCB2YWx1ZSBvZiB0aGUgZ2l2ZW4gb3B0aW9uXG4gICAgICpcbiAgICAgKiAjIyMgVXNhZ2U6XG4gICAgICpcbiAgICAgKiBgYGBqYXZhc2NyaXB0XG4gICAgICogLy8gR2V0IGRlZmF1bHQgdG9rZW5pemVyXG4gICAgICogTWluaVNlYXJjaC5nZXREZWZhdWx0KCd0b2tlbml6ZScpXG4gICAgICpcbiAgICAgKiAvLyBHZXQgZGVmYXVsdCB0ZXJtIHByb2Nlc3NvclxuICAgICAqIE1pbmlTZWFyY2guZ2V0RGVmYXVsdCgncHJvY2Vzc1Rlcm0nKVxuICAgICAqXG4gICAgICogLy8gVW5rbm93biBvcHRpb25zIHdpbGwgdGhyb3cgYW4gZXJyb3JcbiAgICAgKiBNaW5pU2VhcmNoLmdldERlZmF1bHQoJ25vdEV4aXN0aW5nJylcbiAgICAgKiAvLyA9PiB0aHJvd3MgJ01pbmlTZWFyY2g6IHVua25vd24gb3B0aW9uIFwibm90RXhpc3RpbmdcIidcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLmdldERlZmF1bHQgPSBmdW5jdGlvbiAob3B0aW9uTmFtZSkge1xuICAgICAgICBpZiAoZGVmYXVsdE9wdGlvbnMuaGFzT3duUHJvcGVydHkob3B0aW9uTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRPd25Qcm9wZXJ0eShkZWZhdWx0T3B0aW9ucywgb3B0aW9uTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaW5pU2VhcmNoOiB1bmtub3duIG9wdGlvbiBcXFwiXCIuY29uY2F0KG9wdGlvbk5hbWUsIFwiXFxcIlwiKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLmxvYWRKUyA9IGZ1bmN0aW9uIChqcywgb3B0aW9ucykge1xuICAgICAgICB2YXIgZV8xNiwgX2EsIGVfMTcsIF9iLCBlXzE4LCBfYztcbiAgICAgICAgdmFyIGluZGV4ID0ganMuaW5kZXgsIGRvY3VtZW50Q291bnQgPSBqcy5kb2N1bWVudENvdW50LCBuZXh0SWQgPSBqcy5uZXh0SWQsIGRvY3VtZW50SWRzID0ganMuZG9jdW1lbnRJZHMsIGZpZWxkSWRzID0ganMuZmllbGRJZHMsIGZpZWxkTGVuZ3RoID0ganMuZmllbGRMZW5ndGgsIGF2ZXJhZ2VGaWVsZExlbmd0aCA9IGpzLmF2ZXJhZ2VGaWVsZExlbmd0aCwgc3RvcmVkRmllbGRzID0ganMuc3RvcmVkRmllbGRzLCBkaXJ0Q291bnQgPSBqcy5kaXJ0Q291bnQsIHNlcmlhbGl6YXRpb25WZXJzaW9uID0ganMuc2VyaWFsaXphdGlvblZlcnNpb247XG4gICAgICAgIGlmIChzZXJpYWxpemF0aW9uVmVyc2lvbiAhPT0gMSAmJiBzZXJpYWxpemF0aW9uVmVyc2lvbiAhPT0gMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2VhcmNoOiBjYW5ub3QgZGVzZXJpYWxpemUgYW4gaW5kZXggY3JlYXRlZCB3aXRoIGFuIGluY29tcGF0aWJsZSB2ZXJzaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1pbmlTZWFyY2ggPSBuZXcgTWluaVNlYXJjaChvcHRpb25zKTtcbiAgICAgICAgbWluaVNlYXJjaC5fZG9jdW1lbnRDb3VudCA9IGRvY3VtZW50Q291bnQ7XG4gICAgICAgIG1pbmlTZWFyY2guX25leHRJZCA9IG5leHRJZDtcbiAgICAgICAgbWluaVNlYXJjaC5fZG9jdW1lbnRJZHMgPSBvYmplY3RUb051bWVyaWNNYXAoZG9jdW1lbnRJZHMpO1xuICAgICAgICBtaW5pU2VhcmNoLl9pZFRvU2hvcnRJZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgbWluaVNlYXJjaC5fZmllbGRJZHMgPSBmaWVsZElkcztcbiAgICAgICAgbWluaVNlYXJjaC5fZmllbGRMZW5ndGggPSBvYmplY3RUb051bWVyaWNNYXAoZmllbGRMZW5ndGgpO1xuICAgICAgICBtaW5pU2VhcmNoLl9hdmdGaWVsZExlbmd0aCA9IGF2ZXJhZ2VGaWVsZExlbmd0aDtcbiAgICAgICAgbWluaVNlYXJjaC5fc3RvcmVkRmllbGRzID0gb2JqZWN0VG9OdW1lcmljTWFwKHN0b3JlZEZpZWxkcyk7XG4gICAgICAgIG1pbmlTZWFyY2guX2RpcnRDb3VudCA9IGRpcnRDb3VudCB8fCAwO1xuICAgICAgICBtaW5pU2VhcmNoLl9pbmRleCA9IG5ldyBTZWFyY2hhYmxlTWFwKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfZCA9IF9fdmFsdWVzKG1pbmlTZWFyY2guX2RvY3VtZW50SWRzKSwgX2UgPSBfZC5uZXh0KCk7ICFfZS5kb25lOyBfZSA9IF9kLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZiA9IF9fcmVhZChfZS52YWx1ZSwgMiksIHNob3J0SWQgPSBfZlswXSwgaWQgPSBfZlsxXTtcbiAgICAgICAgICAgICAgICBtaW5pU2VhcmNoLl9pZFRvU2hvcnRJZC5zZXQoaWQsIHNob3J0SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzE2XzEpIHsgZV8xNiA9IHsgZXJyb3I6IGVfMTZfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2UgJiYgIV9lLmRvbmUgJiYgKF9hID0gX2QucmV0dXJuKSkgX2EuY2FsbChfZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTYpIHRocm93IGVfMTYuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXhfMSA9IF9fdmFsdWVzKGluZGV4KSwgaW5kZXhfMV8xID0gaW5kZXhfMS5uZXh0KCk7ICFpbmRleF8xXzEuZG9uZTsgaW5kZXhfMV8xID0gaW5kZXhfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2cgPSBfX3JlYWQoaW5kZXhfMV8xLnZhbHVlLCAyKSwgdGVybSA9IF9nWzBdLCBkYXRhID0gX2dbMV07XG4gICAgICAgICAgICAgICAgdmFyIGRhdGFNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2ggPSAoZV8xOCA9IHZvaWQgMCwgX192YWx1ZXMoT2JqZWN0LmtleXMoZGF0YSkpKSwgX2ogPSBfaC5uZXh0KCk7ICFfai5kb25lOyBfaiA9IF9oLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkSWQgPSBfai52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleEVudHJ5ID0gZGF0YVtmaWVsZElkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZlcnNpb24gMSB1c2VkIHRvIG5lc3QgdGhlIGluZGV4IGVudHJ5IGluc2lkZSBhIGZpZWxkIGNhbGxlZCBkc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcmlhbGl6YXRpb25WZXJzaW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhFbnRyeSA9IGluZGV4RW50cnkuZHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhTWFwLnNldChwYXJzZUludChmaWVsZElkLCAxMCksIG9iamVjdFRvTnVtZXJpY01hcChpbmRleEVudHJ5KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMThfMSkgeyBlXzE4ID0geyBlcnJvcjogZV8xOF8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaiAmJiAhX2ouZG9uZSAmJiAoX2MgPSBfaC5yZXR1cm4pKSBfYy5jYWxsKF9oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTgpIHRocm93IGVfMTguZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbWluaVNlYXJjaC5faW5kZXguc2V0KHRlcm0sIGRhdGFNYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzE3XzEpIHsgZV8xNyA9IHsgZXJyb3I6IGVfMTdfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhfMV8xICYmICFpbmRleF8xXzEuZG9uZSAmJiAoX2IgPSBpbmRleF8xLnJldHVybikpIF9iLmNhbGwoaW5kZXhfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMTcpIHRocm93IGVfMTcuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluaVNlYXJjaDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5leGVjdXRlUXVlcnkgPSBmdW5jdGlvbiAocXVlcnksIHNlYXJjaE9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHNlYXJjaE9wdGlvbnMgPT09IHZvaWQgMCkgeyBzZWFyY2hPcHRpb25zID0ge307IH1cbiAgICAgICAgaWYgKHF1ZXJ5ID09PSBNaW5pU2VhcmNoLndpbGRjYXJkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlV2lsZGNhcmRRdWVyeShzZWFyY2hPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnNfMSA9IF9fYXNzaWduKF9fYXNzaWduKF9fYXNzaWduKHt9LCBzZWFyY2hPcHRpb25zKSwgcXVlcnkpLCB7IHF1ZXJpZXM6IHVuZGVmaW5lZCB9KTtcbiAgICAgICAgICAgIHZhciByZXN1bHRzXzEgPSBxdWVyeS5xdWVyaWVzLm1hcChmdW5jdGlvbiAoc3VicXVlcnkpIHsgcmV0dXJuIF90aGlzLmV4ZWN1dGVRdWVyeShzdWJxdWVyeSwgb3B0aW9uc18xKTsgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21iaW5lUmVzdWx0cyhyZXN1bHRzXzEsIG9wdGlvbnNfMS5jb21iaW5lV2l0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gdGhpcy5fb3B0aW9ucywgdG9rZW5pemUgPSBfYS50b2tlbml6ZSwgcHJvY2Vzc1Rlcm0gPSBfYS5wcm9jZXNzVGVybSwgZ2xvYmFsU2VhcmNoT3B0aW9ucyA9IF9hLnNlYXJjaE9wdGlvbnM7XG4gICAgICAgIHZhciBvcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oeyB0b2tlbml6ZTogdG9rZW5pemUsIHByb2Nlc3NUZXJtOiBwcm9jZXNzVGVybSB9LCBnbG9iYWxTZWFyY2hPcHRpb25zKSwgc2VhcmNoT3B0aW9ucyk7XG4gICAgICAgIHZhciBzZWFyY2hUb2tlbml6ZSA9IG9wdGlvbnMudG9rZW5pemUsIHNlYXJjaFByb2Nlc3NUZXJtID0gb3B0aW9ucy5wcm9jZXNzVGVybTtcbiAgICAgICAgdmFyIHRlcm1zID0gc2VhcmNoVG9rZW5pemUocXVlcnkpXG4gICAgICAgICAgICAuZmxhdE1hcChmdW5jdGlvbiAodGVybSkgeyByZXR1cm4gc2VhcmNoUHJvY2Vzc1Rlcm0odGVybSk7IH0pXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uICh0ZXJtKSB7IHJldHVybiAhIXRlcm07IH0pO1xuICAgICAgICB2YXIgcXVlcmllcyA9IHRlcm1zLm1hcCh0ZXJtVG9RdWVyeVNwZWMob3B0aW9ucykpO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IHF1ZXJpZXMubWFwKGZ1bmN0aW9uIChxdWVyeSkgeyByZXR1cm4gX3RoaXMuZXhlY3V0ZVF1ZXJ5U3BlYyhxdWVyeSwgb3B0aW9ucyk7IH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5jb21iaW5lUmVzdWx0cyhyZXN1bHRzLCBvcHRpb25zLmNvbWJpbmVXaXRoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5leGVjdXRlUXVlcnlTcGVjID0gZnVuY3Rpb24gKHF1ZXJ5LCBzZWFyY2hPcHRpb25zKSB7XG4gICAgICAgIHZhciBlXzE5LCBfYSwgZV8yMCwgX2I7XG4gICAgICAgIHZhciBvcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuX29wdGlvbnMuc2VhcmNoT3B0aW9ucyksIHNlYXJjaE9wdGlvbnMpO1xuICAgICAgICB2YXIgYm9vc3RzID0gKG9wdGlvbnMuZmllbGRzIHx8IHRoaXMuX29wdGlvbnMuZmllbGRzKS5yZWR1Y2UoZnVuY3Rpb24gKGJvb3N0cywgZmllbGQpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiAoX19hc3NpZ24oX19hc3NpZ24oe30sIGJvb3N0cyksIChfYSA9IHt9LCBfYVtmaWVsZF0gPSBnZXRPd25Qcm9wZXJ0eShvcHRpb25zLmJvb3N0LCBmaWVsZCkgfHwgMSwgX2EpKSk7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgdmFyIGJvb3N0RG9jdW1lbnQgPSBvcHRpb25zLmJvb3N0RG9jdW1lbnQsIHdlaWdodHMgPSBvcHRpb25zLndlaWdodHMsIG1heEZ1enp5ID0gb3B0aW9ucy5tYXhGdXp6eSwgYm0yNXBhcmFtcyA9IG9wdGlvbnMuYm0yNTtcbiAgICAgICAgdmFyIF9jID0gX19hc3NpZ24oX19hc3NpZ24oe30sIGRlZmF1bHRTZWFyY2hPcHRpb25zLndlaWdodHMpLCB3ZWlnaHRzKSwgZnV6enlXZWlnaHQgPSBfYy5mdXp6eSwgcHJlZml4V2VpZ2h0ID0gX2MucHJlZml4O1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2luZGV4LmdldChxdWVyeS50ZXJtKTtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSB0aGlzLnRlcm1SZXN1bHRzKHF1ZXJ5LnRlcm0sIHF1ZXJ5LnRlcm0sIDEsIGRhdGEsIGJvb3N0cywgYm9vc3REb2N1bWVudCwgYm0yNXBhcmFtcyk7XG4gICAgICAgIHZhciBwcmVmaXhNYXRjaGVzO1xuICAgICAgICB2YXIgZnV6enlNYXRjaGVzO1xuICAgICAgICBpZiAocXVlcnkucHJlZml4KSB7XG4gICAgICAgICAgICBwcmVmaXhNYXRjaGVzID0gdGhpcy5faW5kZXguYXRQcmVmaXgocXVlcnkudGVybSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHF1ZXJ5LmZ1enp5KSB7XG4gICAgICAgICAgICB2YXIgZnV6enkgPSAocXVlcnkuZnV6enkgPT09IHRydWUpID8gMC4yIDogcXVlcnkuZnV6enk7XG4gICAgICAgICAgICB2YXIgbWF4RGlzdGFuY2UgPSBmdXp6eSA8IDEgPyBNYXRoLm1pbihtYXhGdXp6eSwgTWF0aC5yb3VuZChxdWVyeS50ZXJtLmxlbmd0aCAqIGZ1enp5KSkgOiBmdXp6eTtcbiAgICAgICAgICAgIGlmIChtYXhEaXN0YW5jZSlcbiAgICAgICAgICAgICAgICBmdXp6eU1hdGNoZXMgPSB0aGlzLl9pbmRleC5mdXp6eUdldChxdWVyeS50ZXJtLCBtYXhEaXN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZWZpeE1hdGNoZXMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJlZml4TWF0Y2hlc18xID0gX192YWx1ZXMocHJlZml4TWF0Y2hlcyksIHByZWZpeE1hdGNoZXNfMV8xID0gcHJlZml4TWF0Y2hlc18xLm5leHQoKTsgIXByZWZpeE1hdGNoZXNfMV8xLmRvbmU7IHByZWZpeE1hdGNoZXNfMV8xID0gcHJlZml4TWF0Y2hlc18xLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2QgPSBfX3JlYWQocHJlZml4TWF0Y2hlc18xXzEudmFsdWUsIDIpLCB0ZXJtID0gX2RbMF0sIGRhdGFfMSA9IF9kWzFdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSB0ZXJtLmxlbmd0aCAtIHF1ZXJ5LnRlcm0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfSAvLyBTa2lwIGV4YWN0IG1hdGNoLlxuICAgICAgICAgICAgICAgICAgICAvLyBEZWxldGUgdGhlIHRlcm0gZnJvbSBmdXp6eSByZXN1bHRzIChpZiBwcmVzZW50KSBpZiBpdCBpcyBhbHNvIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJlZml4IHJlc3VsdC4gVGhpcyBlbnRyeSB3aWxsIGFsd2F5cyBiZSBzY29yZWQgYXMgYSBwcmVmaXggcmVzdWx0LlxuICAgICAgICAgICAgICAgICAgICBmdXp6eU1hdGNoZXMgPT09IG51bGwgfHwgZnV6enlNYXRjaGVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmdXp6eU1hdGNoZXMuZGVsZXRlKHRlcm0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBXZWlnaHQgZ3JhZHVhbGx5IGFwcHJvYWNoZXMgMCBhcyBkaXN0YW5jZSBnb2VzIHRvIGluZmluaXR5LCB3aXRoIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB3ZWlnaHQgZm9yIHRoZSBoeXBvdGhldGljYWwgZGlzdGFuY2UgMCBiZWluZyBlcXVhbCB0byBwcmVmaXhXZWlnaHQuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSByYXRlIG9mIGNoYW5nZSBpcyBtdWNoIGxvd2VyIHRoYW4gdGhhdCBvZiBmdXp6eSBtYXRjaGVzIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIGFjY291bnQgZm9yIHRoZSBmYWN0IHRoYXQgcHJlZml4IG1hdGNoZXMgc3RheSBtb3JlIHJlbGV2YW50IHRoYW5cbiAgICAgICAgICAgICAgICAgICAgLy8gZnV6enkgbWF0Y2hlcyBmb3IgbG9uZ2VyIGRpc3RhbmNlcy5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHdlaWdodCA9IHByZWZpeFdlaWdodCAqIHRlcm0ubGVuZ3RoIC8gKHRlcm0ubGVuZ3RoICsgMC4zICogZGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlcm1SZXN1bHRzKHF1ZXJ5LnRlcm0sIHRlcm0sIHdlaWdodCwgZGF0YV8xLCBib29zdHMsIGJvb3N0RG9jdW1lbnQsIGJtMjVwYXJhbXMsIHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlXzE5XzEpIHsgZV8xOSA9IHsgZXJyb3I6IGVfMTlfMSB9OyB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJlZml4TWF0Y2hlc18xXzEgJiYgIXByZWZpeE1hdGNoZXNfMV8xLmRvbmUgJiYgKF9hID0gcHJlZml4TWF0Y2hlc18xLnJldHVybikpIF9hLmNhbGwocHJlZml4TWF0Y2hlc18xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzE5KSB0aHJvdyBlXzE5LmVycm9yOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZ1enp5TWF0Y2hlcykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfZSA9IF9fdmFsdWVzKGZ1enp5TWF0Y2hlcy5rZXlzKCkpLCBfZiA9IF9lLm5leHQoKTsgIV9mLmRvbmU7IF9mID0gX2UubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXJtID0gX2YudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZyA9IF9fcmVhZChmdXp6eU1hdGNoZXMuZ2V0KHRlcm0pLCAyKSwgZGF0YV8yID0gX2dbMF0sIGRpc3RhbmNlID0gX2dbMV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IC8vIFNraXAgZXhhY3QgbWF0Y2guXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlaWdodCBncmFkdWFsbHkgYXBwcm9hY2hlcyAwIGFzIGRpc3RhbmNlIGdvZXMgdG8gaW5maW5pdHksIHdpdGggdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlaWdodCBmb3IgdGhlIGh5cG90aGV0aWNhbCBkaXN0YW5jZSAwIGJlaW5nIGVxdWFsIHRvIGZ1enp5V2VpZ2h0LlxuICAgICAgICAgICAgICAgICAgICB2YXIgd2VpZ2h0ID0gZnV6enlXZWlnaHQgKiB0ZXJtLmxlbmd0aCAvICh0ZXJtLmxlbmd0aCArIGRpc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXJtUmVzdWx0cyhxdWVyeS50ZXJtLCB0ZXJtLCB3ZWlnaHQsIGRhdGFfMiwgYm9vc3RzLCBib29zdERvY3VtZW50LCBibTI1cGFyYW1zLCByZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZV8yMF8xKSB7IGVfMjAgPSB7IGVycm9yOiBlXzIwXzEgfTsgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9mICYmICFfZi5kb25lICYmIChfYiA9IF9lLnJldHVybikpIF9iLmNhbGwoX2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMjApIHRocm93IGVfMjAuZXJyb3I7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5leGVjdXRlV2lsZGNhcmRRdWVyeSA9IGZ1bmN0aW9uIChzZWFyY2hPcHRpb25zKSB7XG4gICAgICAgIHZhciBlXzIxLCBfYTtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHZhciBvcHRpb25zID0gX19hc3NpZ24oX19hc3NpZ24oe30sIHRoaXMuX29wdGlvbnMuc2VhcmNoT3B0aW9ucyksIHNlYXJjaE9wdGlvbnMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0aGlzLl9kb2N1bWVudElkcyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2QgPSBfX3JlYWQoX2MudmFsdWUsIDIpLCBzaG9ydElkID0gX2RbMF0sIGlkID0gX2RbMV07XG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlID0gb3B0aW9ucy5ib29zdERvY3VtZW50ID8gb3B0aW9ucy5ib29zdERvY3VtZW50KGlkLCAnJywgdGhpcy5fc3RvcmVkRmllbGRzLmdldChzaG9ydElkKSkgOiAxO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMuc2V0KHNob3J0SWQsIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHNjb3JlLFxuICAgICAgICAgICAgICAgICAgICB0ZXJtczogW10sXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoOiB7fVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzIxXzEpIHsgZV8yMSA9IHsgZXJyb3I6IGVfMjFfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMjEpIHRocm93IGVfMjEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5jb21iaW5lUmVzdWx0cyA9IGZ1bmN0aW9uIChyZXN1bHRzLCBjb21iaW5lV2l0aCkge1xuICAgICAgICBpZiAoY29tYmluZVdpdGggPT09IHZvaWQgMCkgeyBjb21iaW5lV2l0aCA9IE9SOyB9XG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBNYXAoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3BlcmF0b3IgPSBjb21iaW5lV2l0aC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0cy5yZWR1Y2UoY29tYmluYXRvcnNbb3BlcmF0b3JdKSB8fCBuZXcgTWFwKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBbGxvd3Mgc2VyaWFsaXphdGlvbiBvZiB0aGUgaW5kZXggdG8gSlNPTiwgdG8gcG9zc2libHkgc3RvcmUgaXQgYW5kIGxhdGVyXG4gICAgICogZGVzZXJpYWxpemUgaXQgd2l0aCB7QGxpbmsgTWluaVNlYXJjaC5sb2FkSlNPTn0uXG4gICAgICpcbiAgICAgKiBOb3JtYWxseSBvbmUgZG9lcyBub3QgZGlyZWN0bHkgY2FsbCB0aGlzIG1ldGhvZCwgYnV0IHJhdGhlciBjYWxsIHRoZVxuICAgICAqIHN0YW5kYXJkIEphdmFTY3JpcHQgYEpTT04uc3RyaW5naWZ5KClgIHBhc3NpbmcgdGhlIHtAbGluayBNaW5pU2VhcmNofVxuICAgICAqIGluc3RhbmNlLCBhbmQgSmF2YVNjcmlwdCB3aWxsIGludGVybmFsbHkgY2FsbCB0aGlzIG1ldGhvZC4gVXBvblxuICAgICAqIGRlc2VyaWFsaXphdGlvbiwgb25lIG11c3QgcGFzcyB0byB7QGxpbmsgTWluaVNlYXJjaC5sb2FkSlNPTn0gdGhlIHNhbWVcbiAgICAgKiBvcHRpb25zIHVzZWQgdG8gY3JlYXRlIHRoZSBvcmlnaW5hbCBpbnN0YW5jZSB0aGF0IHdhcyBzZXJpYWxpemVkLlxuICAgICAqXG4gICAgICogIyMjIFVzYWdlOlxuICAgICAqXG4gICAgICogYGBgamF2YXNjcmlwdFxuICAgICAqIC8vIFNlcmlhbGl6ZSB0aGUgaW5kZXg6XG4gICAgICogbGV0IG1pbmlTZWFyY2ggPSBuZXcgTWluaVNlYXJjaCh7IGZpZWxkczogWyd0aXRsZScsICd0ZXh0J10gfSlcbiAgICAgKiBtaW5pU2VhcmNoLmFkZEFsbChkb2N1bWVudHMpXG4gICAgICogY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KG1pbmlTZWFyY2gpXG4gICAgICpcbiAgICAgKiAvLyBMYXRlciwgdG8gZGVzZXJpYWxpemUgaXQ6XG4gICAgICogbWluaVNlYXJjaCA9IE1pbmlTZWFyY2gubG9hZEpTT04oanNvbiwgeyBmaWVsZHM6IFsndGl0bGUnLCAndGV4dCddIH0pXG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIEEgcGxhaW4tb2JqZWN0IHNlcmlhbGl6YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2VhcmNoIGluZGV4LlxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVfMjIsIF9hLCBlXzIzLCBfYjtcbiAgICAgICAgdmFyIGluZGV4ID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYyA9IF9fdmFsdWVzKHRoaXMuX2luZGV4KSwgX2QgPSBfYy5uZXh0KCk7ICFfZC5kb25lOyBfZCA9IF9jLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZSA9IF9fcmVhZChfZC52YWx1ZSwgMiksIHRlcm0gPSBfZVswXSwgZmllbGRJbmRleCA9IF9lWzFdO1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZmllbGRJbmRleF8yID0gKGVfMjMgPSB2b2lkIDAsIF9fdmFsdWVzKGZpZWxkSW5kZXgpKSwgZmllbGRJbmRleF8yXzEgPSBmaWVsZEluZGV4XzIubmV4dCgpOyAhZmllbGRJbmRleF8yXzEuZG9uZTsgZmllbGRJbmRleF8yXzEgPSBmaWVsZEluZGV4XzIubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2YgPSBfX3JlYWQoZmllbGRJbmRleF8yXzEudmFsdWUsIDIpLCBmaWVsZElkID0gX2ZbMF0sIGZyZXFzID0gX2ZbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2ZpZWxkSWRdID0gT2JqZWN0LmZyb21FbnRyaWVzKGZyZXFzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yM18xKSB7IGVfMjMgPSB7IGVycm9yOiBlXzIzXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkSW5kZXhfMl8xICYmICFmaWVsZEluZGV4XzJfMS5kb25lICYmIChfYiA9IGZpZWxkSW5kZXhfMi5yZXR1cm4pKSBfYi5jYWxsKGZpZWxkSW5kZXhfMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIzKSB0aHJvdyBlXzIzLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGV4LnB1c2goW3Rlcm0sIGRhdGFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yMl8xKSB7IGVfMjIgPSB7IGVycm9yOiBlXzIyXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9kICYmICFfZC5kb25lICYmIChfYSA9IF9jLnJldHVybikpIF9hLmNhbGwoX2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIyKSB0aHJvdyBlXzIyLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRvY3VtZW50Q291bnQ6IHRoaXMuX2RvY3VtZW50Q291bnQsXG4gICAgICAgICAgICBuZXh0SWQ6IHRoaXMuX25leHRJZCxcbiAgICAgICAgICAgIGRvY3VtZW50SWRzOiBPYmplY3QuZnJvbUVudHJpZXModGhpcy5fZG9jdW1lbnRJZHMpLFxuICAgICAgICAgICAgZmllbGRJZHM6IHRoaXMuX2ZpZWxkSWRzLFxuICAgICAgICAgICAgZmllbGRMZW5ndGg6IE9iamVjdC5mcm9tRW50cmllcyh0aGlzLl9maWVsZExlbmd0aCksXG4gICAgICAgICAgICBhdmVyYWdlRmllbGRMZW5ndGg6IHRoaXMuX2F2Z0ZpZWxkTGVuZ3RoLFxuICAgICAgICAgICAgc3RvcmVkRmllbGRzOiBPYmplY3QuZnJvbUVudHJpZXModGhpcy5fc3RvcmVkRmllbGRzKSxcbiAgICAgICAgICAgIGRpcnRDb3VudDogdGhpcy5fZGlydENvdW50LFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgc2VyaWFsaXphdGlvblZlcnNpb246IDJcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS50ZXJtUmVzdWx0cyA9IGZ1bmN0aW9uIChzb3VyY2VUZXJtLCBkZXJpdmVkVGVybSwgdGVybVdlaWdodCwgZmllbGRUZXJtRGF0YSwgZmllbGRCb29zdHMsIGJvb3N0RG9jdW1lbnRGbiwgYm0yNXBhcmFtcywgcmVzdWx0cykge1xuICAgICAgICB2YXIgZV8yNCwgX2EsIGVfMjUsIF9iLCBfYztcbiAgICAgICAgaWYgKHJlc3VsdHMgPT09IHZvaWQgMCkgeyByZXN1bHRzID0gbmV3IE1hcCgpOyB9XG4gICAgICAgIGlmIChmaWVsZFRlcm1EYXRhID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9kID0gX192YWx1ZXMoT2JqZWN0LmtleXMoZmllbGRCb29zdHMpKSwgX2UgPSBfZC5uZXh0KCk7ICFfZS5kb25lOyBfZSA9IF9kLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IF9lLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZEJvb3N0ID0gZmllbGRCb29zdHNbZmllbGRdO1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZElkID0gdGhpcy5fZmllbGRJZHNbZmllbGRdO1xuICAgICAgICAgICAgICAgIHZhciBmaWVsZFRlcm1GcmVxcyA9IGZpZWxkVGVybURhdGEuZ2V0KGZpZWxkSWQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZFRlcm1GcmVxcyA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hpbmdGaWVsZHMgPSBmaWVsZFRlcm1GcmVxcy5zaXplO1xuICAgICAgICAgICAgICAgIHZhciBhdmdGaWVsZExlbmd0aCA9IHRoaXMuX2F2Z0ZpZWxkTGVuZ3RoW2ZpZWxkSWRdO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9mID0gKGVfMjUgPSB2b2lkIDAsIF9fdmFsdWVzKGZpZWxkVGVybUZyZXFzLmtleXMoKSkpLCBfZyA9IF9mLm5leHQoKTsgIV9nLmRvbmU7IF9nID0gX2YubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jSWQgPSBfZy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fZG9jdW1lbnRJZHMuaGFzKGRvY0lkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVGVybShmaWVsZElkLCBkb2NJZCwgZGVyaXZlZFRlcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoaW5nRmllbGRzIC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9jQm9vc3QgPSBib29zdERvY3VtZW50Rm4gPyBib29zdERvY3VtZW50Rm4odGhpcy5fZG9jdW1lbnRJZHMuZ2V0KGRvY0lkKSwgZGVyaXZlZFRlcm0sIHRoaXMuX3N0b3JlZEZpZWxkcy5nZXQoZG9jSWQpKSA6IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRvY0Jvb3N0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlcm1GcmVxID0gZmllbGRUZXJtRnJlcXMuZ2V0KGRvY0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZExlbmd0aCA9IHRoaXMuX2ZpZWxkTGVuZ3RoLmdldChkb2NJZClbZmllbGRJZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBUaGUgdG90YWwgbnVtYmVyIG9mIGZpZWxkcyBpcyBzZXQgdG8gdGhlIG51bWJlciBvZiBkb2N1bWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGB0aGlzLl9kb2N1bWVudENvdW50YC4gSXQgY291bGQgYWxzbyBtYWtlIHNlbnNlIHRvIHVzZSB0aGUgbnVtYmVyIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkb2N1bWVudHMgd2hlcmUgdGhlIGN1cnJlbnQgZmllbGQgaXMgbm9uLWJsYW5rIGFzIGEgbm9ybWFsaXphdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFjdG9yLiBUaGlzIHdpbGwgbWFrZSBhIGRpZmZlcmVuY2UgaW4gc2NvcmluZyBpZiB0aGUgZmllbGQgaXMgcmFyZWx5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmVzZW50LiBUaGlzIGlzIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkLCBhbmQgbWF5IHJlcXVpcmUgZnVydGhlclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5hbHlzaXMgdG8gc2VlIGlmIGl0IGlzIGEgdmFsaWQgdXNlIGNhc2UuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmF3U2NvcmUgPSBjYWxjQk0yNVNjb3JlKHRlcm1GcmVxLCBtYXRjaGluZ0ZpZWxkcywgdGhpcy5fZG9jdW1lbnRDb3VudCwgZmllbGRMZW5ndGgsIGF2Z0ZpZWxkTGVuZ3RoLCBibTI1cGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3ZWlnaHRlZFNjb3JlID0gdGVybVdlaWdodCAqIGZpZWxkQm9vc3QgKiBkb2NCb29zdCAqIHJhd1Njb3JlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHJlc3VsdHMuZ2V0KGRvY0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc2NvcmUgKz0gd2VpZ2h0ZWRTY29yZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25VbmlxdWVUZXJtKHJlc3VsdC50ZXJtcywgc291cmNlVGVybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoID0gZ2V0T3duUHJvcGVydHkocmVzdWx0Lm1hdGNoLCBkZXJpdmVkVGVybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoLnB1c2goZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1hdGNoW2Rlcml2ZWRUZXJtXSA9IFtmaWVsZF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5zZXQoZG9jSWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU6IHdlaWdodGVkU2NvcmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcm1zOiBbc291cmNlVGVybV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoOiAoX2MgPSB7fSwgX2NbZGVyaXZlZFRlcm1dID0gW2ZpZWxkXSwgX2MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMjVfMSkgeyBlXzI1ID0geyBlcnJvcjogZV8yNV8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZyAmJiAhX2cuZG9uZSAmJiAoX2IgPSBfZi5yZXR1cm4pKSBfYi5jYWxsKF9mKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMjUpIHRocm93IGVfMjUuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMjRfMSkgeyBlXzI0ID0geyBlcnJvcjogZV8yNF8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfZSAmJiAhX2UuZG9uZSAmJiAoX2EgPSBfZC5yZXR1cm4pKSBfYS5jYWxsKF9kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yNCkgdGhyb3cgZV8yNC5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmFkZFRlcm0gPSBmdW5jdGlvbiAoZmllbGRJZCwgZG9jdW1lbnRJZCwgdGVybSkge1xuICAgICAgICB2YXIgaW5kZXhEYXRhID0gdGhpcy5faW5kZXguZmV0Y2godGVybSwgY3JlYXRlTWFwKTtcbiAgICAgICAgdmFyIGZpZWxkSW5kZXggPSBpbmRleERhdGEuZ2V0KGZpZWxkSWQpO1xuICAgICAgICBpZiAoZmllbGRJbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICBmaWVsZEluZGV4ID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgZmllbGRJbmRleC5zZXQoZG9jdW1lbnRJZCwgMSk7XG4gICAgICAgICAgICBpbmRleERhdGEuc2V0KGZpZWxkSWQsIGZpZWxkSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGRvY3MgPSBmaWVsZEluZGV4LmdldChkb2N1bWVudElkKTtcbiAgICAgICAgICAgIGZpZWxkSW5kZXguc2V0KGRvY3VtZW50SWQsIChkb2NzIHx8IDApICsgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5yZW1vdmVUZXJtID0gZnVuY3Rpb24gKGZpZWxkSWQsIGRvY3VtZW50SWQsIHRlcm0pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbmRleC5oYXModGVybSkpIHtcbiAgICAgICAgICAgIHRoaXMud2FybkRvY3VtZW50Q2hhbmdlZChkb2N1bWVudElkLCBmaWVsZElkLCB0ZXJtKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhEYXRhID0gdGhpcy5faW5kZXguZmV0Y2godGVybSwgY3JlYXRlTWFwKTtcbiAgICAgICAgdmFyIGZpZWxkSW5kZXggPSBpbmRleERhdGEuZ2V0KGZpZWxkSWQpO1xuICAgICAgICBpZiAoZmllbGRJbmRleCA9PSBudWxsIHx8IGZpZWxkSW5kZXguZ2V0KGRvY3VtZW50SWQpID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMud2FybkRvY3VtZW50Q2hhbmdlZChkb2N1bWVudElkLCBmaWVsZElkLCB0ZXJtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmaWVsZEluZGV4LmdldChkb2N1bWVudElkKSA8PSAxKSB7XG4gICAgICAgICAgICBpZiAoZmllbGRJbmRleC5zaXplIDw9IDEpIHtcbiAgICAgICAgICAgICAgICBpbmRleERhdGEuZGVsZXRlKGZpZWxkSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZmllbGRJbmRleC5kZWxldGUoZG9jdW1lbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmaWVsZEluZGV4LnNldChkb2N1bWVudElkLCBmaWVsZEluZGV4LmdldChkb2N1bWVudElkKSAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pbmRleC5nZXQodGVybSkuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5faW5kZXguZGVsZXRlKHRlcm0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUud2FybkRvY3VtZW50Q2hhbmdlZCA9IGZ1bmN0aW9uIChzaG9ydERvY3VtZW50SWQsIGZpZWxkSWQsIHRlcm0pIHtcbiAgICAgICAgdmFyIGVfMjYsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhPYmplY3Qua2V5cyh0aGlzLl9maWVsZElkcykpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkTmFtZSA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9maWVsZElkc1tmaWVsZE5hbWVdID09PSBmaWVsZElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMubG9nZ2VyKCd3YXJuJywgXCJNaW5pU2VhcmNoOiBkb2N1bWVudCB3aXRoIElEIFwiLmNvbmNhdCh0aGlzLl9kb2N1bWVudElkcy5nZXQoc2hvcnREb2N1bWVudElkKSwgXCIgaGFzIGNoYW5nZWQgYmVmb3JlIHJlbW92YWw6IHRlcm0gXFxcIlwiKS5jb25jYXQodGVybSwgXCJcXFwiIHdhcyBub3QgcHJlc2VudCBpbiBmaWVsZCBcXFwiXCIpLmNvbmNhdChmaWVsZE5hbWUsIFwiXFxcIi4gUmVtb3ZpbmcgYSBkb2N1bWVudCBhZnRlciBpdCBoYXMgY2hhbmdlZCBjYW4gY29ycnVwdCB0aGUgaW5kZXghXCIpLCAndmVyc2lvbl9jb25mbGljdCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzI2XzEpIHsgZV8yNiA9IHsgZXJyb3I6IGVfMjZfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMjYpIHRocm93IGVfMjYuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQGlnbm9yZVxuICAgICAqL1xuICAgIE1pbmlTZWFyY2gucHJvdG90eXBlLmFkZERvY3VtZW50SWQgPSBmdW5jdGlvbiAoZG9jdW1lbnRJZCkge1xuICAgICAgICB2YXIgc2hvcnREb2N1bWVudElkID0gdGhpcy5fbmV4dElkO1xuICAgICAgICB0aGlzLl9pZFRvU2hvcnRJZC5zZXQoZG9jdW1lbnRJZCwgc2hvcnREb2N1bWVudElkKTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRJZHMuc2V0KHNob3J0RG9jdW1lbnRJZCwgZG9jdW1lbnRJZCk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50Q291bnQgKz0gMTtcbiAgICAgICAgdGhpcy5fbmV4dElkICs9IDE7XG4gICAgICAgIHJldHVybiBzaG9ydERvY3VtZW50SWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuYWRkRmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fZmllbGRJZHNbZmllbGRzW2ldXSA9IGk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBNaW5pU2VhcmNoLnByb3RvdHlwZS5hZGRGaWVsZExlbmd0aCA9IGZ1bmN0aW9uIChkb2N1bWVudElkLCBmaWVsZElkLCBjb3VudCwgbGVuZ3RoKSB7XG4gICAgICAgIHZhciBmaWVsZExlbmd0aHMgPSB0aGlzLl9maWVsZExlbmd0aC5nZXQoZG9jdW1lbnRJZCk7XG4gICAgICAgIGlmIChmaWVsZExlbmd0aHMgPT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMuX2ZpZWxkTGVuZ3RoLnNldChkb2N1bWVudElkLCBmaWVsZExlbmd0aHMgPSBbXSk7XG4gICAgICAgIGZpZWxkTGVuZ3Roc1tmaWVsZElkXSA9IGxlbmd0aDtcbiAgICAgICAgdmFyIGF2ZXJhZ2VGaWVsZExlbmd0aCA9IHRoaXMuX2F2Z0ZpZWxkTGVuZ3RoW2ZpZWxkSWRdIHx8IDA7XG4gICAgICAgIHZhciB0b3RhbEZpZWxkTGVuZ3RoID0gKGF2ZXJhZ2VGaWVsZExlbmd0aCAqIGNvdW50KSArIGxlbmd0aDtcbiAgICAgICAgdGhpcy5fYXZnRmllbGRMZW5ndGhbZmllbGRJZF0gPSB0b3RhbEZpZWxkTGVuZ3RoIC8gKGNvdW50ICsgMSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUucmVtb3ZlRmllbGRMZW5ndGggPSBmdW5jdGlvbiAoZG9jdW1lbnRJZCwgZmllbGRJZCwgY291bnQsIGxlbmd0aCkge1xuICAgICAgICBpZiAoY291bnQgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2F2Z0ZpZWxkTGVuZ3RoW2ZpZWxkSWRdID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG90YWxGaWVsZExlbmd0aCA9ICh0aGlzLl9hdmdGaWVsZExlbmd0aFtmaWVsZElkXSAqIGNvdW50KSAtIGxlbmd0aDtcbiAgICAgICAgdGhpcy5fYXZnRmllbGRMZW5ndGhbZmllbGRJZF0gPSB0b3RhbEZpZWxkTGVuZ3RoIC8gKGNvdW50IC0gMSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICovXG4gICAgTWluaVNlYXJjaC5wcm90b3R5cGUuc2F2ZVN0b3JlZEZpZWxkcyA9IGZ1bmN0aW9uIChkb2N1bWVudElkLCBkb2MpIHtcbiAgICAgICAgdmFyIGVfMjcsIF9hO1xuICAgICAgICB2YXIgX2IgPSB0aGlzLl9vcHRpb25zLCBzdG9yZUZpZWxkcyA9IF9iLnN0b3JlRmllbGRzLCBleHRyYWN0RmllbGQgPSBfYi5leHRyYWN0RmllbGQ7XG4gICAgICAgIGlmIChzdG9yZUZpZWxkcyA9PSBudWxsIHx8IHN0b3JlRmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkb2N1bWVudEZpZWxkcyA9IHRoaXMuX3N0b3JlZEZpZWxkcy5nZXQoZG9jdW1lbnRJZCk7XG4gICAgICAgIGlmIChkb2N1bWVudEZpZWxkcyA9PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5fc3RvcmVkRmllbGRzLnNldChkb2N1bWVudElkLCBkb2N1bWVudEZpZWxkcyA9IHt9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIHN0b3JlRmllbGRzXzEgPSBfX3ZhbHVlcyhzdG9yZUZpZWxkcyksIHN0b3JlRmllbGRzXzFfMSA9IHN0b3JlRmllbGRzXzEubmV4dCgpOyAhc3RvcmVGaWVsZHNfMV8xLmRvbmU7IHN0b3JlRmllbGRzXzFfMSA9IHN0b3JlRmllbGRzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkTmFtZSA9IHN0b3JlRmllbGRzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZmllbGRWYWx1ZSA9IGV4dHJhY3RGaWVsZChkb2MsIGZpZWxkTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkVmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRGaWVsZHNbZmllbGROYW1lXSA9IGZpZWxkVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMjdfMSkgeyBlXzI3ID0geyBlcnJvcjogZV8yN18xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChzdG9yZUZpZWxkc18xXzEgJiYgIXN0b3JlRmllbGRzXzFfMS5kb25lICYmIChfYSA9IHN0b3JlRmllbGRzXzEucmV0dXJuKSkgX2EuY2FsbChzdG9yZUZpZWxkc18xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yNykgdGhyb3cgZV8yNy5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgc3BlY2lhbCB3aWxkY2FyZCBzeW1ib2wgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIHtAbGluayBNaW5pU2VhcmNoI3NlYXJjaH1cbiAgICAgKiB0byBtYXRjaCBhbGwgZG9jdW1lbnRzXG4gICAgICovXG4gICAgTWluaVNlYXJjaC53aWxkY2FyZCA9IFN5bWJvbCgnKicpO1xuICAgIHJldHVybiBNaW5pU2VhcmNoO1xufSgpKTtcbnZhciBnZXRPd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSA/IG9iamVjdFtwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG59O1xudmFyIGNvbWJpbmF0b3JzID0gKF9hID0ge30sXG4gICAgX2FbT1JdID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgdmFyIGVfMjgsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhiLmtleXMoKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9jSWQgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmcgPSBhLmdldChkb2NJZCk7XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgYS5zZXQoZG9jSWQsIGIuZ2V0KGRvY0lkKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2QgPSBiLmdldChkb2NJZCksIHNjb3JlID0gX2Quc2NvcmUsIHRlcm1zID0gX2QudGVybXMsIG1hdGNoID0gX2QubWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLnNjb3JlID0gZXhpc3Rpbmcuc2NvcmUgKyBzY29yZTtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubWF0Y2ggPSBPYmplY3QuYXNzaWduKGV4aXN0aW5nLm1hdGNoLCBtYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgIGFzc2lnblVuaXF1ZVRlcm1zKGV4aXN0aW5nLnRlcm1zLCB0ZXJtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzI4XzEpIHsgZV8yOCA9IHsgZXJyb3I6IGVfMjhfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMjgpIHRocm93IGVfMjguZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYTtcbiAgICB9LFxuICAgIF9hW0FORF0gPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICB2YXIgZV8yOSwgX2E7XG4gICAgICAgIHZhciBjb21iaW5lZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMoYi5rZXlzKCkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvY0lkID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nID0gYS5nZXQoZG9jSWQpO1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZyA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB2YXIgX2QgPSBiLmdldChkb2NJZCksIHNjb3JlID0gX2Quc2NvcmUsIHRlcm1zID0gX2QudGVybXMsIG1hdGNoID0gX2QubWF0Y2g7XG4gICAgICAgICAgICAgICAgYXNzaWduVW5pcXVlVGVybXMoZXhpc3RpbmcudGVybXMsIHRlcm1zKTtcbiAgICAgICAgICAgICAgICBjb21iaW5lZC5zZXQoZG9jSWQsIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmU6IGV4aXN0aW5nLnNjb3JlICsgc2NvcmUsXG4gICAgICAgICAgICAgICAgICAgIHRlcm1zOiBleGlzdGluZy50ZXJtcyxcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IE9iamVjdC5hc3NpZ24oZXhpc3RpbmcubWF0Y2gsIG1hdGNoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzI5XzEpIHsgZV8yOSA9IHsgZXJyb3I6IGVfMjlfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMjkpIHRocm93IGVfMjkuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZWQ7XG4gICAgfSxcbiAgICBfYVtBTkRfTk9UXSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciBlXzMwLCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMoYi5rZXlzKCkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvY0lkID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgYS5kZWxldGUoZG9jSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzMwXzEpIHsgZV8zMCA9IHsgZXJyb3I6IGVfMzBfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMzApIHRocm93IGVfMzAuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYTtcbiAgICB9LFxuICAgIF9hKTtcbnZhciBkZWZhdWx0Qk0yNXBhcmFtcyA9IHsgazogMS4yLCBiOiAwLjcsIGQ6IDAuNSB9O1xudmFyIGNhbGNCTTI1U2NvcmUgPSBmdW5jdGlvbiAodGVybUZyZXEsIG1hdGNoaW5nQ291bnQsIHRvdGFsQ291bnQsIGZpZWxkTGVuZ3RoLCBhdmdGaWVsZExlbmd0aCwgYm0yNXBhcmFtcykge1xuICAgIHZhciBrID0gYm0yNXBhcmFtcy5rLCBiID0gYm0yNXBhcmFtcy5iLCBkID0gYm0yNXBhcmFtcy5kO1xuICAgIHZhciBpbnZEb2NGcmVxID0gTWF0aC5sb2coMSArICh0b3RhbENvdW50IC0gbWF0Y2hpbmdDb3VudCArIDAuNSkgLyAobWF0Y2hpbmdDb3VudCArIDAuNSkpO1xuICAgIHJldHVybiBpbnZEb2NGcmVxICogKGQgKyB0ZXJtRnJlcSAqIChrICsgMSkgLyAodGVybUZyZXEgKyBrICogKDEgLSBiICsgYiAqIGZpZWxkTGVuZ3RoIC8gYXZnRmllbGRMZW5ndGgpKSk7XG59O1xudmFyIHRlcm1Ub1F1ZXJ5U3BlYyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7IHJldHVybiBmdW5jdGlvbiAodGVybSwgaSwgdGVybXMpIHtcbiAgICB2YXIgZnV6enkgPSAodHlwZW9mIG9wdGlvbnMuZnV6enkgPT09ICdmdW5jdGlvbicpXG4gICAgICAgID8gb3B0aW9ucy5mdXp6eSh0ZXJtLCBpLCB0ZXJtcylcbiAgICAgICAgOiAob3B0aW9ucy5mdXp6eSB8fCBmYWxzZSk7XG4gICAgdmFyIHByZWZpeCA9ICh0eXBlb2Ygb3B0aW9ucy5wcmVmaXggPT09ICdmdW5jdGlvbicpXG4gICAgICAgID8gb3B0aW9ucy5wcmVmaXgodGVybSwgaSwgdGVybXMpXG4gICAgICAgIDogKG9wdGlvbnMucHJlZml4ID09PSB0cnVlKTtcbiAgICByZXR1cm4geyB0ZXJtOiB0ZXJtLCBmdXp6eTogZnV6enksIHByZWZpeDogcHJlZml4IH07XG59OyB9O1xudmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGlkRmllbGQ6ICdpZCcsXG4gICAgZXh0cmFjdEZpZWxkOiBmdW5jdGlvbiAoZG9jdW1lbnQsIGZpZWxkTmFtZSkgeyByZXR1cm4gZG9jdW1lbnRbZmllbGROYW1lXTsgfSxcbiAgICB0b2tlbml6ZTogZnVuY3Rpb24gKHRleHQpIHsgcmV0dXJuIHRleHQuc3BsaXQoU1BBQ0VfT1JfUFVOQ1RVQVRJT04pOyB9LFxuICAgIHByb2Nlc3NUZXJtOiBmdW5jdGlvbiAodGVybSkgeyByZXR1cm4gdGVybS50b0xvd2VyQ2FzZSgpOyB9LFxuICAgIGZpZWxkczogdW5kZWZpbmVkLFxuICAgIHNlYXJjaE9wdGlvbnM6IHVuZGVmaW5lZCxcbiAgICBzdG9yZUZpZWxkczogW10sXG4gICAgbG9nZ2VyOiBmdW5jdGlvbiAobGV2ZWwsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAoY29uc29sZSA9PT0gbnVsbCB8fCBjb25zb2xlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25zb2xlW2xldmVsXSkgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjb25zb2xlW2xldmVsXShtZXNzYWdlKTtcbiAgICB9LFxuICAgIGF1dG9WYWN1dW06IHRydWVcbn07XG52YXIgZGVmYXVsdFNlYXJjaE9wdGlvbnMgPSB7XG4gICAgY29tYmluZVdpdGg6IE9SLFxuICAgIHByZWZpeDogZmFsc2UsXG4gICAgZnV6enk6IGZhbHNlLFxuICAgIG1heEZ1enp5OiA2LFxuICAgIGJvb3N0OiB7fSxcbiAgICB3ZWlnaHRzOiB7IGZ1enp5OiAwLjQ1LCBwcmVmaXg6IDAuMzc1IH0sXG4gICAgYm0yNTogZGVmYXVsdEJNMjVwYXJhbXNcbn07XG52YXIgZGVmYXVsdEF1dG9TdWdnZXN0T3B0aW9ucyA9IHtcbiAgICBjb21iaW5lV2l0aDogQU5ELFxuICAgIHByZWZpeDogZnVuY3Rpb24gKHRlcm0sIGksIHRlcm1zKSB7XG4gICAgICAgIHJldHVybiBpID09PSB0ZXJtcy5sZW5ndGggLSAxO1xuICAgIH1cbn07XG52YXIgZGVmYXVsdFZhY3V1bU9wdGlvbnMgPSB7IGJhdGNoU2l6ZTogMTAwMCwgYmF0Y2hXYWl0OiAxMCB9O1xudmFyIGRlZmF1bHRWYWN1dW1Db25kaXRpb25zID0geyBtaW5EaXJ0RmFjdG9yOiAwLjEsIG1pbkRpcnRDb3VudDogMjAgfTtcbnZhciBkZWZhdWx0QXV0b1ZhY3V1bU9wdGlvbnMgPSBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgZGVmYXVsdFZhY3V1bU9wdGlvbnMpLCBkZWZhdWx0VmFjdXVtQ29uZGl0aW9ucyk7XG52YXIgYXNzaWduVW5pcXVlVGVybSA9IGZ1bmN0aW9uICh0YXJnZXQsIHRlcm0pIHtcbiAgICAvLyBBdm9pZCBhZGRpbmcgZHVwbGljYXRlIHRlcm1zLlxuICAgIGlmICghdGFyZ2V0LmluY2x1ZGVzKHRlcm0pKVxuICAgICAgICB0YXJnZXQucHVzaCh0ZXJtKTtcbn07XG52YXIgYXNzaWduVW5pcXVlVGVybXMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICB2YXIgZV8zMSwgX2E7XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgc291cmNlXzEgPSBfX3ZhbHVlcyhzb3VyY2UpLCBzb3VyY2VfMV8xID0gc291cmNlXzEubmV4dCgpOyAhc291cmNlXzFfMS5kb25lOyBzb3VyY2VfMV8xID0gc291cmNlXzEubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIgdGVybSA9IHNvdXJjZV8xXzEudmFsdWU7XG4gICAgICAgICAgICAvLyBBdm9pZCBhZGRpbmcgZHVwbGljYXRlIHRlcm1zLlxuICAgICAgICAgICAgaWYgKCF0YXJnZXQuaW5jbHVkZXModGVybSkpXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2godGVybSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMzFfMSkgeyBlXzMxID0geyBlcnJvcjogZV8zMV8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChzb3VyY2VfMV8xICYmICFzb3VyY2VfMV8xLmRvbmUgJiYgKF9hID0gc291cmNlXzEucmV0dXJuKSkgX2EuY2FsbChzb3VyY2VfMSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzMxKSB0aHJvdyBlXzMxLmVycm9yOyB9XG4gICAgfVxufTtcbnZhciBieVNjb3JlID0gZnVuY3Rpb24gKF9hLCBfYikge1xuICAgIHZhciBhID0gX2Euc2NvcmU7XG4gICAgdmFyIGIgPSBfYi5zY29yZTtcbiAgICByZXR1cm4gYiAtIGE7XG59O1xudmFyIGNyZWF0ZU1hcCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXAoKTsgfTtcbnZhciBvYmplY3RUb051bWVyaWNNYXAgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGVfMzIsIF9hO1xuICAgIHZhciBtYXAgPSBuZXcgTWFwKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhPYmplY3Qua2V5cyhvYmplY3QpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgbWFwLnNldChwYXJzZUludChrZXksIDEwKSwgb2JqZWN0W2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlXzMyXzEpIHsgZV8zMiA9IHsgZXJyb3I6IGVfMzJfMSB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzMyKSB0aHJvdyBlXzMyLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG59O1xuLy8gVGhpcyByZWd1bGFyIGV4cHJlc3Npb24gbWF0Y2hlcyBhbnkgVW5pY29kZSBzcGFjZSBvciBwdW5jdHVhdGlvbiBjaGFyYWN0ZXJcbi8vIEFkYXB0ZWQgZnJvbSBodHRwczovL3VuaWNvZGUub3JnL2NsZHIvdXRpbGl0eS9saXN0LXVuaWNvZGVzZXQuanNwP2E9JTVDcCU3QlolN0QlNUNwJTdCUCU3RCZhYmI9b24mYz1vbiZlc2M9b25cbnZhciBTUEFDRV9PUl9QVU5DVFVBVElPTiA9IC9bXFxuXFxyIC0jJS0qLC0vOjs/QFstXFxdX3t9XFx1MDBBMFxcdTAwQTFcXHUwMEE3XFx1MDBBQlxcdTAwQjZcXHUwMEI3XFx1MDBCQlxcdTAwQkZcXHUwMzdFXFx1MDM4N1xcdTA1NUEtXFx1MDU1RlxcdTA1ODlcXHUwNThBXFx1MDVCRVxcdTA1QzBcXHUwNUMzXFx1MDVDNlxcdTA1RjNcXHUwNUY0XFx1MDYwOVxcdTA2MEFcXHUwNjBDXFx1MDYwRFxcdTA2MUJcXHUwNjFFXFx1MDYxRlxcdTA2NkEtXFx1MDY2RFxcdTA2RDRcXHUwNzAwLVxcdTA3MERcXHUwN0Y3LVxcdTA3RjlcXHUwODMwLVxcdTA4M0VcXHUwODVFXFx1MDk2NFxcdTA5NjVcXHUwOTcwXFx1MDlGRFxcdTBBNzZcXHUwQUYwXFx1MEM3N1xcdTBDODRcXHUwREY0XFx1MEU0RlxcdTBFNUFcXHUwRTVCXFx1MEYwNC1cXHUwRjEyXFx1MEYxNFxcdTBGM0EtXFx1MEYzRFxcdTBGODVcXHUwRkQwLVxcdTBGRDRcXHUwRkQ5XFx1MEZEQVxcdTEwNEEtXFx1MTA0RlxcdTEwRkJcXHUxMzYwLVxcdTEzNjhcXHUxNDAwXFx1MTY2RVxcdTE2ODBcXHUxNjlCXFx1MTY5Q1xcdTE2RUItXFx1MTZFRFxcdTE3MzVcXHUxNzM2XFx1MTdENC1cXHUxN0Q2XFx1MTdEOC1cXHUxN0RBXFx1MTgwMC1cXHUxODBBXFx1MTk0NFxcdTE5NDVcXHUxQTFFXFx1MUExRlxcdTFBQTAtXFx1MUFBNlxcdTFBQTgtXFx1MUFBRFxcdTFCNUEtXFx1MUI2MFxcdTFCRkMtXFx1MUJGRlxcdTFDM0ItXFx1MUMzRlxcdTFDN0VcXHUxQzdGXFx1MUNDMC1cXHUxQ0M3XFx1MUNEM1xcdTIwMDAtXFx1MjAwQVxcdTIwMTAtXFx1MjAyOVxcdTIwMkYtXFx1MjA0M1xcdTIwNDUtXFx1MjA1MVxcdTIwNTMtXFx1MjA1RlxcdTIwN0RcXHUyMDdFXFx1MjA4RFxcdTIwOEVcXHUyMzA4LVxcdTIzMEJcXHUyMzI5XFx1MjMyQVxcdTI3NjgtXFx1Mjc3NVxcdTI3QzVcXHUyN0M2XFx1MjdFNi1cXHUyN0VGXFx1Mjk4My1cXHUyOTk4XFx1MjlEOC1cXHUyOURCXFx1MjlGQ1xcdTI5RkRcXHUyQ0Y5LVxcdTJDRkNcXHUyQ0ZFXFx1MkNGRlxcdTJENzBcXHUyRTAwLVxcdTJFMkVcXHUyRTMwLVxcdTJFNEZcXHUzMDAwLVxcdTMwMDNcXHUzMDA4LVxcdTMwMTFcXHUzMDE0LVxcdTMwMUZcXHUzMDMwXFx1MzAzRFxcdTMwQTBcXHUzMEZCXFx1QTRGRVxcdUE0RkZcXHVBNjBELVxcdUE2MEZcXHVBNjczXFx1QTY3RVxcdUE2RjItXFx1QTZGN1xcdUE4NzQtXFx1QTg3N1xcdUE4Q0VcXHVBOENGXFx1QThGOC1cXHVBOEZBXFx1QThGQ1xcdUE5MkVcXHVBOTJGXFx1QTk1RlxcdUE5QzEtXFx1QTlDRFxcdUE5REVcXHVBOURGXFx1QUE1Qy1cXHVBQTVGXFx1QUFERVxcdUFBREZcXHVBQUYwXFx1QUFGMVxcdUFCRUJcXHVGRDNFXFx1RkQzRlxcdUZFMTAtXFx1RkUxOVxcdUZFMzAtXFx1RkU1MlxcdUZFNTQtXFx1RkU2MVxcdUZFNjNcXHVGRTY4XFx1RkU2QVxcdUZFNkJcXHVGRjAxLVxcdUZGMDNcXHVGRjA1LVxcdUZGMEFcXHVGRjBDLVxcdUZGMEZcXHVGRjFBXFx1RkYxQlxcdUZGMUZcXHVGRjIwXFx1RkYzQi1cXHVGRjNEXFx1RkYzRlxcdUZGNUJcXHVGRjVEXFx1RkY1Ri1cXHVGRjY1XSsvdTtcblxuZXhwb3J0IHsgTWluaVNlYXJjaCBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IE1pbmlTZWFyY2ggZnJvbSAnbWluaXNlYXJjaCc7XHJcblxyXG4vKipcclxuICogQ29uc3RhbnRzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExPQ0FMX0lOREVYX0lEOiBLZXkgZm9yIHN0b3JpbmcgdGhlIHNlYXJjaCBpbmRleCBpbiBDaHJvbWUncyBsb2NhbCBzdG9yYWdlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgTE9DQUxfSU5ERVhfSUQgPSAnbG9jYWxTZWFyY2hJbmRleCc7XHJcblxyXG4vKipcclxuICogRGVidWcgVXRpbGl0aWVzXHJcbiAqIC0tLS0tLS0tLS0tLS0tXHJcbiAqIEZ1bmN0aW9ucyBmb3IgZGVidWdnaW5nIGFuZCBkZXZlbG9wbWVudC5cclxuICovXHJcbmZ1bmN0aW9uIGV4cG9ydFN0b3JhZ2VUb0ZpbGUoKSB7XHJcbiAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIGV4cG9ydC4uLicpO1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChMT0NBTF9JTkRFWF9JRCwgKGRhdGEpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdSZXRyaWV2ZWQgZGF0YTonLCBkYXRhKTtcclxuICAgIGNvbnN0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcclxuICAgIGNvbnN0IGRhdGFVcmwgPSBgZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwke2J0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGpzb25TdHJpbmcpKSl9YDtcclxuXHJcbiAgICBjaHJvbWUuZG93bmxvYWRzLmRvd25sb2FkKHtcclxuICAgICAgdXJsOiBkYXRhVXJsLFxyXG4gICAgICBmaWxlbmFtZTogJ2hhd2tfaW5kZXhfYmFja3VwLmpzb24nLFxyXG4gICAgICBzYXZlQXM6IHRydWUsXHJcbiAgICB9LCAoZG93bmxvYWRJZCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnRG93bmxvYWQgc3RhcnRlZCB3aXRoIElEOicsIGRvd25sb2FkSWQpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIE1ha2UgZXhwb3J0IGZ1bmN0aW9uIGF2YWlsYWJsZSBnbG9iYWxseVxyXG5nbG9iYWxUaGlzLmV4cG9ydEluZGV4ID0gZXhwb3J0U3RvcmFnZVRvRmlsZTtcclxuXHJcbi8vIEFsc28gYWRkIHRvIGNocm9tZSBvYmplY3QgZm9yIHNlcnZpY2Ugd29ya2VyIGNvbnRleHRcclxuY2hyb21lLmV4cG9ydEluZGV4ID0gZXhwb3J0U3RvcmFnZVRvRmlsZTtcclxuXHJcbi8qKlxyXG4gKiBTZWFyY2ggSW5kZXggTWFuYWdlbWVudFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEhhbmRsZXMgY3JlYXRpbmcsIGxvYWRpbmcsIGFuZCBtYWludGFpbmluZyB0aGUgc2VhcmNoIGluZGV4LlxyXG4gKi9cclxuY29uc3QgY3JlYXRlSW5kZXggPSAoZXhpc3RpbmdJbmRleCkgPT4ge1xyXG4gIGNvbnN0IHN0b3BXb3JkcyA9IFsnaScsICdtZScsICdteScsICdteXNlbGYnLCAnd2UnLCAnb3VyJywgJ291cnMnLCAnb3Vyc2VsdmVzJywgJ3lvdScsICd5b3VyJywgJ3lvdXJzJywgJ3lvdXJzZWxmJywgJ3lvdXJzZWx2ZXMnLCAnaGUnLCAnaGltJywgJ2hpcycsICdoaW1zZWxmJywgJ3NoZScsICdoZXInLCAnaGVycycsICdoZXJzZWxmJywgJ2l0JywgJ2l0cycsICdpdHNlbGYnLCAndGhleScsICd0aGVtJywgJ3RoZWlyJywgJ3RoZWlycycsICd0aGVtc2VsdmVzJywgJ3doYXQnLCAnd2hpY2gnLCAnd2hvJywgJ3dob20nLCAndGhpcycsICd0aGF0JywgJ3RoZXNlJywgJ3Rob3NlJywgJ2FtJywgJ2lzJywgJ2FyZScsICd3YXMnLCAnd2VyZScsICdiZScsICdiZWVuJywgJ2JlaW5nJywgJ2hhdmUnLCAnaGFzJywgJ2hhZCcsICdoYXZpbmcnLCAnZG8nLCAnZG9lcycsICdkaWQnLCAnZG9pbmcnLCAnYScsICdhbicsICd0aGUnLCAnYW5kJywgJ2J1dCcsICdpZicsICdvcicsICdiZWNhdXNlJywgJ2FzJywgJ3VudGlsJywgJ3doaWxlJywgJ29mJywgJ2F0JywgJ2J5JywgJ2ZvcicsICd3aXRoJywgJ2Fib3V0JywgJ2FnYWluc3QnLCAnYmV0d2VlbicsICdpbnRvJywgJ3Rocm91Z2gnLCAnZHVyaW5nJywgJ2JlZm9yZScsICdhZnRlcicsICdhYm92ZScsICdiZWxvdycsICd0bycsICdmcm9tJywgJ3VwJywgJ2Rvd24nLCAnaW4nLCAnb3V0JywgJ29uJywgJ29mZicsICdvdmVyJywgJ3VuZGVyJywgJ2FnYWluJywgJ2Z1cnRoZXInLCAndGhlbicsICdvbmNlJywgJ2hlcmUnLCAndGhlcmUnLCAnd2hlbicsICd3aGVyZScsICd3aHknLCAnaG93JywgJ2FsbCcsICdhbnknLCAnYm90aCcsICdlYWNoJywgJ2ZldycsICdtb3JlJywgJ21vc3QnLCAnb3RoZXInLCAnc29tZScsICdzdWNoJywgJ25vJywgJ25vcicsICdub3QnLCAnb25seScsICdvd24nLCAnc2FtZScsICdzbycsICd0aGFuJywgJ3RvbycsICd2ZXJ5JywgJ3MnLCAndCcsICdjYW4nLCAnd2lsbCcsICdqdXN0JywgJ2RvbicsICdzaG91bGQnLCAnbm93J107XHJcblxyXG4gIGNvbnN0IGluZGV4RGVzY3JpcHRvciA9IHtcclxuICAgIGZpZWxkczogWyd0aXRsZScsICdhbGxUZXh0J10sXHJcbiAgICBzdG9yZUZpZWxkczogWyd0aXRsZSddLFxyXG4gICAgaWRGaWVsZDogJ2lkJyxcclxuICAgIHByb2Nlc3NUZXJtOiAodGVybSwgX2ZpZWxkTmFtZSkgPT4gKHN0b3BXb3Jkcy5pbmNsdWRlcyh0ZXJtKSA/IG51bGwgOiB0ZXJtLnRvTG93ZXJDYXNlKCkpLFxyXG4gICAgc2VhcmNoT3B0aW9uczoge1xyXG4gICAgICBwcm9jZXNzVGVybTogKHRlcm0pID0+IHRlcm0udG9Mb3dlckNhc2UoKSxcclxuICAgIH0sXHJcbiAgfTtcclxuICBsZXQgaW5kZXhlcjtcclxuICBpZiAoZXhpc3RpbmdJbmRleCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBpbmRleGVyID0gbmV3IE1pbmlTZWFyY2goaW5kZXhEZXNjcmlwdG9yKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5kZXhlciA9IE1pbmlTZWFyY2gubG9hZEpTT04oZXhpc3RpbmdJbmRleCwgaW5kZXhEZXNjcmlwdG9yKTtcclxuICB9XHJcbiAgcmV0dXJuIGluZGV4ZXI7XHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcmFnZSBJbnRlcmZhY2VcclxuICogLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBNYW5hZ2VzIHJlYWRpbmcvd3JpdGluZyB0aGUgaW5kZXggZnJvbSBDaHJvbWUncyBsb2NhbCBzdG9yYWdlLlxyXG4gKi9cclxuY29uc3QgZ2V0U3RvcmVkSW5kZXggPSAoY2IpID0+IHtcclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoTE9DQUxfSU5ERVhfSUQsIChkYXRhKSA9PiB7IGNiKGRhdGFbTE9DQUxfSU5ERVhfSURdKTsgfSk7XHJcbn07XHJcblxyXG5jb25zdCBzdG9yZUluZGV4ID0gKGluZGV4RGF0YSkgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSB7XHJcbiAgICBbTE9DQUxfSU5ERVhfSURdOiBpbmRleERhdGEsXHJcbiAgfTtcclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoZGF0YSwgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coYEluZGV4IGRhdGEgc2F2ZWRbJHtkYXRhLmxlbmd0aH1dYCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5kZXggQWNjZXNzIGFuZCBNYW5pcHVsYXRpb25cclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEZ1bmN0aW9ucyBmb3IgcmV0cmlldmluZywgYWRkaW5nLCBhbmQgdXBkYXRpbmcgaW5kZXhlZCBkb2N1bWVudHMuXHJcbiAqL1xyXG5jb25zdCBnZXRJbmRleCA9ICgpID0+IHtcclxuICBpZiAoIWNocm9tZS5pbmRleGVyKSB7XHJcbiAgICBpbml0aWFsaXNlSW5kZXhlcigpO1xyXG4gIH1cclxuICByZXR1cm4gY2hyb21lLmluZGV4ZXI7XHJcbn07XHJcblxyXG4vKipcclxuICogVE9ETzogSW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gdG8gcmVwbGFjZSB0aGUgaW5kZXhlciBkYXRhXHJcbiAqL1xyXG5jb25zdCByZXBsYWNlSW5kZXhlckRhdGEgPSAoKSA9PiB7XHJcblxyXG59O1xyXG5cclxuY29uc3QgYWRkVG9JbmRleCA9IChkb2N1bWVudCkgPT4ge1xyXG4gIGNvbnN0IGlkeCA9IGdldEluZGV4KCk7XHJcbiAgaWYgKGlkeCkge1xyXG4gICAgY29uc29sZS50aW1lKGBJbmRleGluZyBEb2M6JHtkb2N1bWVudC5pZH1gKTtcclxuICAgIGlmIChpZHguaGFzKGRvY3VtZW50LmlkKSkge1xyXG4gICAgICBpZHgucmVwbGFjZShkb2N1bWVudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdSZXBsYWNpbmcgZG9jIGluIHRoZSBpbmRleCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWR4LmFkZChkb2N1bWVudCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBZGRpbmcgbmV3IGRvYyBpbiB0aGUgaW5kZXgnKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUudGltZUVuZChgSW5kZXhpbmcgRG9jOiR7ZG9jdW1lbnQuaWR9YCk7XHJcbiAgICBjb25zb2xlLnRpbWUoJ1N0b3JpbmcgdGhlIHdob2xlIEluZGV4Jyk7XHJcbiAgICBjb25zdCBkYXRhID0gSlNPTi5zdHJpbmdpZnkoaWR4KTtcclxuICAgIHN0b3JlSW5kZXgoZGF0YSk7XHJcbiAgICBjb25zb2xlLnRpbWVFbmQoJ1N0b3JpbmcgdGhlIHdob2xlIEluZGV4Jyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaCBhbmQgUmVzdWx0cyBQcm9jZXNzaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBIYW5kbGVzIHF1ZXJ5aW5nIHRoZSBpbmRleCBhbmQgZm9ybWF0dGluZyByZXN1bHRzLlxyXG4gKi9cclxuY29uc3Qgc2VhcmNoID0gKGRvY3VtZW50LCBvcHRpb25zKSA9PiB7XHJcbiAgY29uc3QgaWR4ID0gZ2V0SW5kZXgoKTtcclxuICByZXR1cm4gaWR4LnNlYXJjaChkb2N1bWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBzZW5kUmVzdWx0cyA9IChzZWFyY2hRdWVyeSwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IHNlYXJjaChzZWFyY2hRdWVyeSwgbnVsbCk7XHJcbiAgY29uc3Qgc3VnZ2VzdGlvbnMgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlYXJjaFJlc3VsdHMubGVuZ3RoICYmIGkgPCA1OyBpKyspIHtcclxuICAgIHN1Z2dlc3Rpb25zLnB1c2goeyBjb250ZW50OiBzZWFyY2hSZXN1bHRzW2ldLmlkLCBkZXNjcmlwdGlvbjogcmVtb3ZlU3BlY2lhbENoYXJhY3RlcnMoc2VhcmNoUmVzdWx0c1tpXS50aXRsZSkgfSk7XHJcbiAgICBjb25zb2xlLmxvZyh7IGNvbnRlbnQ6IHNlYXJjaFJlc3VsdHNbaV0uaWQsIGRlc2NyaXB0aW9uOiBzZWFyY2hSZXN1bHRzW2ldLnRpdGxlIH0pO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZyhgbnVtYmVycyBvZiBzdWdnZXN0aW9uczoke3N1Z2dlc3Rpb25zLmxlbmd0aH1gKTtcclxuICBzZW5kUmVzcG9uc2Uoc3VnZ2VzdGlvbnMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1lc3NhZ2UgSGFuZGxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFByb2Nlc3NlcyBtZXNzYWdlcyBmcm9tIGNvbnRlbnQgc2NyaXB0cyBhbmQgdGhlIHBvcHVwLlxyXG4gKi9cclxuY29uc3QgaW5kZXhpbmdMaXN0ZW5lciA9IChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gIGlmICgocmVxdWVzdC5mcm9tID09PSAncG9wdXAnKSAmJiAocmVxdWVzdC5zdWJqZWN0ID09PSAnaW5kZXhlckRhdGEnKSkge1xyXG4gICAgc2VuZFJlc3BvbnNlKGNocm9tZS5zdG9yZWRJbmRleCk7XHJcbiAgfSBlbHNlIGlmICgocmVxdWVzdC5mcm9tID09PSAncG9wdXAnKSAmJiAocmVxdWVzdC5zdWJqZWN0ID09PSAnc2V0SW5kZXhlckRhdGEnKSkge1xyXG4gICAgY29uc3QgaXNTdWNjZXNzZnVsID0gcmVwbGFjZUluZGV4ZXJEYXRhKHJlcXVlc3QuY29udGVudCk7XHJcbiAgfSBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ2V4cG9ydEluZGV4Jykge1xyXG4gICAgZXhwb3J0U3RvcmFnZVRvRmlsZSgpO1xyXG4gICAgc2VuZFJlc3BvbnNlKHsgc3RhdHVzOiAnZXhwb3J0aW5nJyB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWRkVG9JbmRleChyZXF1ZXN0LmRvY3VtZW50KTtcclxuICAgIHNlbmRSZXNwb25zZSgnT0s6SW5kZXhlZCcpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXphdGlvblxyXG4gKiAtLS0tLS0tLS0tLS0tXHJcbiAqIFNldHMgdXAgdGhlIGV4dGVuc2lvbiBhbmQgc2VhcmNoIGluZGV4ZXIuXHJcbiAqL1xyXG5jb25zdCBpbml0aWFsaXNlSW5kZXhlciA9ICgpID0+IHtcclxuICBjb25zdCBpbml0aWFsaXNlSW5kZXhlckFzeW5jID0gKGluZGV4ZXJEYXRhKSA9PiB7XHJcbiAgICBpZiAoaW5kZXhlckRhdGEgJiYgaW5kZXhlckRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICBjaHJvbWUuc3RvcmVkSW5kZXggPSBpbmRleGVyRGF0YTtcclxuICAgIH1cclxuICAgIGNocm9tZS5pbmRleGVyID0gY3JlYXRlSW5kZXgoY2hyb21lLnN0b3JlZEluZGV4KTtcclxuICB9O1xyXG4gIGdldFN0b3JlZEluZGV4KGluaXRpYWxpc2VJbmRleGVyQXN5bmMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgRnVuY3Rpb25zXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcbmNvbnN0IHJlbW92ZVNwZWNpYWxDaGFyYWN0ZXJzID0gKHN0cmluZ1RvQmVTYW5pdGl6ZWQpID0+IHtcclxuICBjb25zdCBzcGVjaWFsQ2hhcnMgPSAnIUAjJF4mJSorPVtdL3t9fDo8Pj8sLic7XHJcbiAgbGV0IHNhbml0aXplZFN0cmluZyA9IHN0cmluZ1RvQmVTYW5pdGl6ZWQ7IC8vIOKchSBDcmVhdGUgYSBuZXcgdmFyaWFibGVcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNwZWNpYWxDaGFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgc2FuaXRpemVkU3RyaW5nID0gc2FuaXRpemVkU3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cChgXFxcXCR7c3BlY2lhbENoYXJzW2ldfWAsICdnaScpLCAnJyk7XHJcbiAgfVxyXG4gIHJldHVybiBzYW5pdGl6ZWRTdHJpbmc7XHJcbn07XHJcblxyXG4vLyBJbml0aWFsaXplIGV4dGVuc2lvbiBhbmQgc2V0IHVwIGxpc3RlbmVyc1xyXG5pbml0aWFsaXNlSW5kZXhlcigpO1xyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoaW5kZXhpbmdMaXN0ZW5lcik7XHJcblxyXG5jaHJvbWUub21uaWJveC5vbklucHV0Q2hhbmdlZC5hZGRMaXN0ZW5lcigodGV4dCwgc3VnZ2VzdCkgPT4ge1xyXG4gIHNlbmRSZXN1bHRzKHRleHQsIHN1Z2dlc3QpO1xyXG59KTtcclxuXHJcbmNocm9tZS5vbW5pYm94Lm9uSW5wdXRFbnRlcmVkLmFkZExpc3RlbmVyKCh0ZXh0LCBPbklucHV0RW50ZXJlZERpc3Bvc2l0aW9uKSA9PiB7XHJcbiAgY2hyb21lLnRhYnMudXBkYXRlKHsgdXJsOiB0ZXh0IH0pO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVRhc2soYWxsVGFza3MsIHRhc2tJZFRvUmVtb3ZlKSB7XHJcbiAgY29uc3QgdXBkYXRlZFRhc2tzID0gT2JqZWN0LmZyb21FbnRyaWVzKFxyXG4gICAgT2JqZWN0LmVudHJpZXMoYWxsVGFza3MpLmZpbHRlcigoW3Rhc2tJZF0pID0+IHRhc2tJZCAhPT0gdGFza0lkVG9SZW1vdmUpLFxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGZpbmFsVGFza3MgPSBPYmplY3Qua2V5cyh1cGRhdGVkVGFza3MpLmxlbmd0aCA9PT0gMCA/IHt9IDogdXBkYXRlZFRhc2tzOyAvLyDinIUgQ3JlYXRlIG5ldyB2YXJpYWJsZVxyXG5cclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyB0YXNrczogZmluYWxUYXNrcyB9LCAoKSA9PiB7fSk7XHJcbn1cclxuXHJcbmNocm9tZS5hbGFybXMub25BbGFybS5hZGRMaXN0ZW5lcigoYWxhcm0pID0+IHtcclxuICBjb25zdCBhbGFybU5hbWUgPSBhbGFybS5uYW1lO1xyXG4gIGlmIChhbGFybU5hbWUuZW5kc1dpdGgoJ19kZWxldGlvbl9hbGFybScpKSB7XHJcbiAgICBjb25zdCB0YXNrSWQgPSBhbGFybU5hbWUuc3BsaXQoJ18nKVswXTtcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCh7IHRhc2tzOiB7fSB9LCAocmVzdWx0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGV4aXN0aW5nVGFza3MgPSByZXN1bHQudGFza3MgfHwge307XHJcbiAgICAgIGRlbGV0ZVRhc2soZXhpc3RpbmdUYXNrcywgdGFza0lkKTtcclxuICAgIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5jaHJvbWUuYWxhcm1zLm9uQWxhcm0uYWRkTGlzdGVuZXIoKGFsYXJtKSA9PiB7XHJcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCd0YXNrcycpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgY29uc3QgZXhpc3RpbmdUYXNrcyA9IHJlc3VsdCB8fCB7fTtcclxuICAgIGNvbnN0IGZvdW5kVGFzayA9IGV4aXN0aW5nVGFza3MudGFza3NbYWxhcm0ubmFtZV07XHJcbiAgICBpZiAoT2JqZWN0LmtleXMoZXhpc3RpbmdUYXNrcykubGVuZ3RoICE9PSAwICYmIGZvdW5kVGFzayAmJiAhZm91bmRUYXNrLnJlY2VudGx5RGVsZXRlZCkge1xyXG4gICAgICBjb25zdCBub3RpZmljYXRpb24gPSB7XHJcbiAgICAgICAgdHlwZTogJ2Jhc2ljJyxcclxuICAgICAgICBpY29uVXJsOiBjaHJvbWUucnVudGltZS5nZXRVUkwoJy4uL2ltYWdlcy9sb2dvMTI4eDEyOC5wbmcnKSxcclxuICAgICAgICB0aXRsZTogYFlvdXIgdGFzayAke2ZvdW5kVGFzay50aXRsZX0gaXMgZHVlYCxcclxuICAgICAgICBtZXNzYWdlOiBmb3VuZFRhc2suZGVzY3JpcHRpb24sXHJcbiAgICAgIH07XHJcbiAgICAgIGNocm9tZS5ub3RpZmljYXRpb25zLmNyZWF0ZShhbGFybS5uYW1lLCBub3RpZmljYXRpb24pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXHJcbmNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKChpbmZvKSA9PiB7XHJcbiAgaWYgKGluZm8ubWVudUl0ZW1JZCA9PT0gJ2FkZC1ub3RlJykge1xyXG4gICAgYWxlcnQoJ1lvdSBjbGlja2VkIHRoZSBjdXN0b20gbWVudSBpdGVtIScpO1xyXG4gIH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0TWVudSgpIHtcclxuICBjaHJvbWUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XHJcbiAgICBpZDogJ2FkZE5vdGUnLFxyXG4gICAgdGl0bGU6ICdIYXdrIDIgLSBBZGQgdGV4dCB0byBOb3RlcycsXHJcbiAgICBjb250ZXh0czogWydzZWxlY3Rpb24nXSxcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0RHVlRGF0ZShkYXlzVG9BZGQpIHtcclxuICBjb25zdCBkdWVEYXRlID0gbmV3IERhdGUoKTtcclxuICBkdWVEYXRlLnNldERhdGUoZHVlRGF0ZS5nZXREYXRlKCkgKyBkYXlzVG9BZGQpOyAvLyBBZGQgZGF5cyBiYXNlZCBvbiB0aGUgaW5wdXRcclxuICByZXR1cm4gZHVlRGF0ZS50b0lTT1N0cmluZygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGROZXdOb3RlKHRpdGxlLCBjb250ZW50LCB0YWdzKSB7XHJcbiAgY29uc3Qgbm90ZUlkID0gRGF0ZS5ub3coKS50b1N0cmluZygpO1xyXG4gIGNvbnN0IG5vdGUgPSB7XHJcbiAgICBpZDogbm90ZUlkLFxyXG4gICAgdGl0bGUsXHJcbiAgICBjb250ZW50LFxyXG4gICAgZHVlOiBzZXREdWVEYXRlKDcpLFxyXG4gICAgc2NoZWR1bGVkRGVsZXRpb246ICcnLFxyXG4gICAgcmVjZW50bHlEZWxldGVkOiBmYWxzZSxcclxuICAgIHRhZ3MsXHJcbiAgfTtcclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoeyBub3RlczogW10gfSwgKGRhdGEpID0+IHtcclxuICAgIGNvbnN0IGV4aXN0aW5nTm90ZXMgPSBkYXRhLm5vdGVzO1xyXG5cclxuICAgIGV4aXN0aW5nTm90ZXMucHVzaChub3RlKTtcclxuXHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBub3RlczogZXhpc3RpbmdOb3RlcyB9LCAoKSA9PiB7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuLy8gTGlzdGVuIGZvciB3aGVuIHRoZSB0YWIncyB1cmwgY2hhbmdlcyBhbmQgc2VuZCBhIG1lc3NhZ2UgdG8gcG9wdXAuanNcclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKCh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSA9PiB7XHJcbiAgaWYgKGNoYW5nZUluZm8udXJsKSB7XHJcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6ICdVUkxfVVBEQVRFRCcsIHVybDogY2hhbmdlSW5mby51cmwgfSk7XHJcbiAgfVxyXG59KTtcclxuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuLy8gTGlzdGVuIGZvciB3aGVuIHRoZSB1c2VyIGNoYW5nZXMgdGFicyBhbmQgc2VuZCBhIG1lc3NhZ2UgdG8gcG9wdXAuanNcclxuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoKGFjdGl2ZUluZm8pID0+IHtcclxuICBjaHJvbWUudGFicy5nZXQoYWN0aXZlSW5mby50YWJJZCwgKHRhYikgPT4ge1xyXG4gICAgaWYgKHRhYiAmJiB0YWIudXJsKSB7XHJcbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ1RBQl9DSEFOR0VEJywgdXJsOiB0YWIudXJsIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuXHJcbmNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKChpbmZvKSA9PiB7XHJcbiAgaWYgKGluZm8ubWVudUl0ZW1JZCA9PT0gJ2FkZE5vdGUnKSB7XHJcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCAodGFicykgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW50VGl0bGUgPSB0YWJzWzBdLnRpdGxlO1xyXG4gICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBgJHtjdXJyZW50VGl0bGV9ICR7aW5mby5zZWxlY3Rpb25UZXh0fWA7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gc2VsZWN0ZWRUZXh0Lmxlbmd0aCA+IDEwID8gYCR7c2VsZWN0ZWRUZXh0LnN1YnN0cmluZygwLCAxNSl9Li4uYCA6IHNlbGVjdGVkVGV4dDtcclxuICAgICAgYWRkTmV3Tm90ZSh0aXRsZSwgc2VsZWN0ZWRUZXh0LCB7fSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4gIGNyZWF0ZUNvbnRleHRNZW51KCk7XHJcbn0pO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4gIGNocm9tZS5zaWRlUGFuZWwuc2V0UGFuZWxCZWhhdmlvcih7IG9wZW5QYW5lbE9uQWN0aW9uQ2xpY2s6IHRydWUgfSkuY2F0Y2goY29uc29sZS5lcnJvcik7XHJcbn0pO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gIGlmIChtZXNzYWdlLnR5cGUgPT09ICd0aGVtZUNvbG9yQ2hhbmdlZCcpIHtcclxuICAgIC8vIEJyb2FkY2FzdCB0aGVtZSBjaGFuZ2UgdG8gYWxsIGV4dGVuc2lvbiBwYWdlc1xyXG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xyXG4gICAgICB0eXBlOiAnYXBwbHlUaGVtZScsXHJcbiAgICAgIGNvbG9yOiBtZXNzYWdlLmNvbG9yLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbIk1pbmlTZWFyY2giLCJMT0NBTF9JTkRFWF9JRCIsImV4cG9ydFN0b3JhZ2VUb0ZpbGUiLCJjb25zb2xlIiwibG9nIiwiY2hyb21lIiwic3RvcmFnZSIsImxvY2FsIiwiZ2V0IiwiZGF0YSIsImpzb25TdHJpbmciLCJKU09OIiwic3RyaW5naWZ5IiwiZGF0YVVybCIsImNvbmNhdCIsImJ0b2EiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsImRvd25sb2FkcyIsImRvd25sb2FkIiwidXJsIiwiZmlsZW5hbWUiLCJzYXZlQXMiLCJkb3dubG9hZElkIiwiZ2xvYmFsVGhpcyIsImV4cG9ydEluZGV4IiwiY3JlYXRlSW5kZXgiLCJleGlzdGluZ0luZGV4Iiwic3RvcFdvcmRzIiwiaW5kZXhEZXNjcmlwdG9yIiwiZmllbGRzIiwic3RvcmVGaWVsZHMiLCJpZEZpZWxkIiwicHJvY2Vzc1Rlcm0iLCJ0ZXJtIiwiX2ZpZWxkTmFtZSIsImluY2x1ZGVzIiwidG9Mb3dlckNhc2UiLCJzZWFyY2hPcHRpb25zIiwiaW5kZXhlciIsInVuZGVmaW5lZCIsImxvYWRKU09OIiwiZ2V0U3RvcmVkSW5kZXgiLCJjYiIsInN0b3JlSW5kZXgiLCJpbmRleERhdGEiLCJfZGVmaW5lUHJvcGVydHkiLCJzZXQiLCJsZW5ndGgiLCJnZXRJbmRleCIsImluaXRpYWxpc2VJbmRleGVyIiwicmVwbGFjZUluZGV4ZXJEYXRhIiwiYWRkVG9JbmRleCIsImRvY3VtZW50IiwiaWR4IiwidGltZSIsImlkIiwiaGFzIiwicmVwbGFjZSIsImFkZCIsInRpbWVFbmQiLCJzZWFyY2giLCJvcHRpb25zIiwic2VuZFJlc3VsdHMiLCJzZWFyY2hRdWVyeSIsInNlbmRSZXNwb25zZSIsInNlYXJjaFJlc3VsdHMiLCJzdWdnZXN0aW9ucyIsImkiLCJwdXNoIiwiY29udGVudCIsImRlc2NyaXB0aW9uIiwicmVtb3ZlU3BlY2lhbENoYXJhY3RlcnMiLCJ0aXRsZSIsImluZGV4aW5nTGlzdGVuZXIiLCJyZXF1ZXN0Iiwic2VuZGVyIiwiZnJvbSIsInN1YmplY3QiLCJzdG9yZWRJbmRleCIsImlzU3VjY2Vzc2Z1bCIsImFjdGlvbiIsInN0YXR1cyIsImluaXRpYWxpc2VJbmRleGVyQXN5bmMiLCJpbmRleGVyRGF0YSIsInN0cmluZ1RvQmVTYW5pdGl6ZWQiLCJzcGVjaWFsQ2hhcnMiLCJzYW5pdGl6ZWRTdHJpbmciLCJSZWdFeHAiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJvbW5pYm94Iiwib25JbnB1dENoYW5nZWQiLCJ0ZXh0Iiwic3VnZ2VzdCIsIm9uSW5wdXRFbnRlcmVkIiwiT25JbnB1dEVudGVyZWREaXNwb3NpdGlvbiIsInRhYnMiLCJ1cGRhdGUiLCJkZWxldGVUYXNrIiwiYWxsVGFza3MiLCJ0YXNrSWRUb1JlbW92ZSIsInVwZGF0ZWRUYXNrcyIsIk9iamVjdCIsImZyb21FbnRyaWVzIiwiZW50cmllcyIsImZpbHRlciIsIl9yZWYiLCJfcmVmMiIsIl9zbGljZWRUb0FycmF5IiwidGFza0lkIiwiZmluYWxUYXNrcyIsImtleXMiLCJ0YXNrcyIsImFsYXJtcyIsIm9uQWxhcm0iLCJhbGFybSIsImFsYXJtTmFtZSIsIm5hbWUiLCJlbmRzV2l0aCIsInNwbGl0IiwicmVzdWx0IiwiZXhpc3RpbmdUYXNrcyIsInRoZW4iLCJmb3VuZFRhc2siLCJyZWNlbnRseURlbGV0ZWQiLCJub3RpZmljYXRpb24iLCJ0eXBlIiwiaWNvblVybCIsImdldFVSTCIsIm1lc3NhZ2UiLCJub3RpZmljYXRpb25zIiwiY3JlYXRlIiwiY29udGV4dE1lbnVzIiwib25DbGlja2VkIiwiaW5mbyIsIm1lbnVJdGVtSWQiLCJhbGVydCIsImNyZWF0ZUNvbnRleHRNZW51IiwiY29udGV4dHMiLCJzZXREdWVEYXRlIiwiZGF5c1RvQWRkIiwiZHVlRGF0ZSIsIkRhdGUiLCJzZXREYXRlIiwiZ2V0RGF0ZSIsInRvSVNPU3RyaW5nIiwiYWRkTmV3Tm90ZSIsInRhZ3MiLCJub3RlSWQiLCJub3ciLCJ0b1N0cmluZyIsIm5vdGUiLCJkdWUiLCJzY2hlZHVsZWREZWxldGlvbiIsIm5vdGVzIiwiZXhpc3RpbmdOb3RlcyIsIm9uVXBkYXRlZCIsInRhYklkIiwiY2hhbmdlSW5mbyIsInRhYiIsInNlbmRNZXNzYWdlIiwib25BY3RpdmF0ZWQiLCJhY3RpdmVJbmZvIiwicXVlcnkiLCJhY3RpdmUiLCJjdXJyZW50V2luZG93IiwiY3VycmVudFRpdGxlIiwic2VsZWN0ZWRUZXh0Iiwic2VsZWN0aW9uVGV4dCIsInN1YnN0cmluZyIsIm9uSW5zdGFsbGVkIiwic2lkZVBhbmVsIiwic2V0UGFuZWxCZWhhdmlvciIsIm9wZW5QYW5lbE9uQWN0aW9uQ2xpY2siLCJlcnJvciIsImNvbG9yIl0sInNvdXJjZVJvb3QiOiIifQ==