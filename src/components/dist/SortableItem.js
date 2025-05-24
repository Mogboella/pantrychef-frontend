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
exports.__esModule = true;
exports.SortableItem = void 0;
var sortable_1 = require("@dnd-kit/sortable");
var utilities_1 = require("@dnd-kit/utilities");
function SortableItem(_a) {
    var id = _a.id, children = _a.children;
    var _b = sortable_1.useSortable({ id: id }), attributes = _b.attributes, listeners = _b.listeners, setNodeRef = _b.setNodeRef, transform = _b.transform, transition = _b.transition, isDragging = _b.isDragging;
    var style = {
        transform: utilities_1.CSS.Transform.toString(transform),
        transition: transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 'auto'
    };
    return (React.createElement("div", __assign({ ref: setNodeRef, style: style }, attributes, listeners), children));
}
exports.SortableItem = SortableItem;
