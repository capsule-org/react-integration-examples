import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export var Home = function (_a) {
    var title = _a.title, subtitle = _a.subtitle;
    var _b = React.useState(0), count = _b[0], setCount = _b[1];
    return (_jsxs("div", { children: [_jsx("h1", { children: title }), _jsx("h2", { children: subtitle }), _jsxs("p", { children: ["Count: ", count] }), _jsx("button", { onClick: function () { return setCount(count + 1); }, children: "Increment" }), _jsx("button", { onClick: function () { return setCount(count - 1); }, children: "Decrement" })] }));
};
