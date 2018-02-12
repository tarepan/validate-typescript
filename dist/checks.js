"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isIso8601(value) {
    let utcMs = Date.parse(value);
    return (!Number.isNaN(utcMs) && (value === (new Date(utcMs)).toISOString()));
}
exports.isIso8601 = isIso8601;
//# sourceMappingURL=checks.js.map