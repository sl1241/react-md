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
var __read =
  (this && this.__read) ||
  function (o, n) {
    var m = typeof Symbol === 'function' && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i['return'])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
import { forwardRef } from 'react';
import { useEnsuredRef } from '../useEnsuredRef';
import { useFocusOnMount } from './useFocusOnMount';
import { usePreviousFocus } from './usePreviousFocus';
import { useTabFocusWrap } from './useTabFocusWrap';
/**
 * The `FocusContainer` is a wrapper for a few of the accessibility hooks to
 * maintain focus within an element.
 */
export var FocusContainer = forwardRef(function FocusContainer(
  _a,
  forwardedRef
) {
  var children = _a.children,
    onKeyDown = _a.onKeyDown,
    _b = _a.component,
    Component = _b === void 0 ? 'div' : _b,
    _c = _a.defaultFocus,
    defaultFocus = _c === void 0 ? 'first' : _c,
    _d = _a.disableFocusCache,
    disableFocusCache = _d === void 0 ? false : _d,
    _e = _a.disableFocusOnMount,
    disableFocusOnMount = _e === void 0 ? false : _e,
    _f = _a.disableFocusOnMountScroll,
    disableFocusOnMountScroll = _f === void 0 ? false : _f,
    _g = _a.disableFocusOnUnmount,
    disableFocusOnUnmount = _g === void 0 ? false : _g,
    _h = _a.disableTabFocusWrap,
    disableTabFocusWrap = _h === void 0 ? false : _h,
    _j = _a.unmountFocusFallback,
    unmountFocusFallback = _j === void 0 ? '' : _j,
    props = __rest(_a, [
      'children',
      'onKeyDown',
      'component',
      'defaultFocus',
      'disableFocusCache',
      'disableFocusOnMount',
      'disableFocusOnMountScroll',
      'disableFocusOnUnmount',
      'disableTabFocusWrap',
      'unmountFocusFallback',
    ]);
  var _k = __read(useEnsuredRef(forwardedRef), 2),
    ref = _k[0],
    refHandler = _k[1];
  usePreviousFocus(disableFocusOnUnmount, unmountFocusFallback);
  useFocusOnMount(
    ref,
    defaultFocus,
    disableFocusOnMountScroll,
    false,
    disableFocusOnMount
  );
  var handleKeyDown = useTabFocusWrap({
    disabled: disableTabFocusWrap,
    disableFocusCache: disableFocusCache,
    onKeyDown: onKeyDown,
  });
  return (
    <Component {...props} onKeyDown={handleKeyDown} ref={refHandler}>
      {children}
    </Component>
  );
});
//# sourceMappingURL=FocusContainer.jsx.map
