"use strict";
function special(value) {
    return (
        value === undefined ||
        typeof value === "function" ||
        typeof value === "symbol"
    );
}
//use === bcs we dont need type to type
function stringify(value) {
    if (typeof value === "number") {
        return isFinite(value) ? String(value) : "null";
    }
    if (typeof value === "string") {
        return `"${value}"`;
    }
    if (typeof value === "boolean") {
        return String(value);
    }
    if (value === null) {
        return "null";
    }
    if (value === undefined) {
        return String(undefined);
    }
    if (Array.isArray(value)) {
        const valueElements = [];
        for (let i = 0; i < value.length; i++) {
            const element = value[i];
            if (special(element)) {
                valueElements.push("null");
            } else {
                valueElements.push(stringify(element));
            }
        }
        return `[${valueElements.join(",")}]`;
    }
    if (typeof value === "object") {
        const pairs = [];
        for (let key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                const val = value[key];
                if (special(val)) {
                    continue;
                }
                pairs.push(`"${key}":${stringify(val)}`);
            }
        }
        return `{${pairs.join(",")}}`;
    }
}

console.log(stringify(42)); // 42 SOLVED
console.log(stringify("string")); // "string" SOLVED
console.log(stringify(null)); // null SOLVED
console.log(stringify(true)); // true SOLVED
console.log(stringify(Infinity)); // null SOLVED
console.log(stringify(undefined)); // => undefined // именно значение undefined, а не строка 'undefined' SOLVED
console.log(stringify({ a: [1, "hi", undefined, Symbol(), {}], b: undefined })); // {"a":[1,"hi",null,null,{}]} SOLVED
