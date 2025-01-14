var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { bem } from '../bem';
import { useAppSize } from '../sizing/useAppSize';
var block = bem('rmd-grid');
export var GridCell = forwardRef(function GridCell(_a, ref) {
  var _b, _c, _d, _e, _f, _g, _h;
  var style = _a.style,
    className = _a.className,
    clone = _a.clone,
    children = _a.children,
    propColSpan = _a.colSpan,
    propColStart = _a.colStart,
    propColEnd = _a.colEnd,
    propRowSpan = _a.rowSpan,
    propRowStart = _a.rowStart,
    propRowEnd = _a.rowEnd,
    phone = _a.phone,
    tablet = _a.tablet,
    desktop = _a.desktop,
    largeDesktop = _a.largeDesktop,
    props = __rest(_a, [
      'style',
      'className',
      'clone',
      'children',
      'colSpan',
      'colStart',
      'colEnd',
      'rowSpan',
      'rowStart',
      'rowEnd',
      'phone',
      'tablet',
      'desktop',
      'largeDesktop',
    ]);
  var _j = useAppSize(),
    isPhone = _j.isPhone,
    isTablet = _j.isTablet,
    isDesktop = _j.isDesktop,
    isLargeDesktop = _j.isLargeDesktop;
  var colSpan = propColSpan;
  var colStart = propColStart;
  var colEnd = propColEnd;
  var rowSpan = propRowSpan;
  var rowStart = propRowStart;
  var rowEnd = propRowEnd;
  var media =
    (isPhone && phone) ||
    (isTablet && tablet) ||
    (isLargeDesktop && largeDesktop) ||
    (isDesktop && desktop);
  if (media) {
    (_b = media.rowSpan),
      (rowSpan = _b === void 0 ? propRowSpan : _b),
      (_c = media.rowStart),
      (rowStart = _c === void 0 ? propRowStart : _c),
      (_d = media.rowEnd),
      (rowEnd = _d === void 0 ? propRowEnd : _d),
      (_e = media.colSpan),
      (colSpan = _e === void 0 ? propColSpan : _e),
      (_f = media.colStart),
      (colStart = _f === void 0 ? propColStart : _f),
      (_g = media.colEnd),
      (colEnd = _g === void 0 ? propColEnd : _g);
  }
  var cellStyle = __assign(
    {
      gridColumnStart: colStart,
      gridColumnEnd: colEnd,
      gridRowStart: rowStart,
      gridRowEnd: rowSpan ? 'span '.concat(rowSpan) : rowEnd,
    },
    style
  );
  var cellClassName = cn(
    block('cell', ((_h = {}), (_h[''.concat(colSpan)] = colSpan), _h)),
    className
  );
  if (clone && isValidElement(children)) {
    var child = Children.only(children);
    return cloneElement(child, {
      style: __assign(__assign({}, child.props.style), cellStyle),
      className: cn(cellClassName, child.props.className),
    });
  }
  return (
    <div {...props} ref={ref} style={cellStyle} className={cellClassName}>
      {children}
    </div>
  );
});
//# sourceMappingURL=GridCell.jsx.map
