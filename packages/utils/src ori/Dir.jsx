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
import {
  Children,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
var context = createContext({
  root: true,
  dir: 'ltr',
  toggleDir: function () {
    throw new Error(
      'Tried to toggle the current writing direction without initializing the `Dir` component.'
    );
  },
});
var Provider = context.Provider;
/**
 * Gets the writing direction context which provides access to the current `dir`
 * and a `toggleDir` function.
 *
 * @remarks \@since 2.3.0
 */
export function useDir() {
  var _a = useContext(context),
    _root = _a.root,
    current = __rest(_a, ['root']);
  return current;
}
/**
 * @remarks \@since 2.3.0
 */
export var DEFAULT_DIR = function () {
  var dir = 'ltr';
  if (typeof document !== 'undefined') {
    var rootDir = document.documentElement.getAttribute('dir');
    dir = rootDir === 'rtl' ? 'rtl' : 'ltr';
  }
  return dir;
};
/**
 * The `Dir` component is used to handle the current writing direction within
 * your app as well as conditionally updating the writing direction for small
 * sections in your app. When this component is used for the first time near the
 * root of your React component tree, the current direction will be applied to
 * the root `<html>` element. Otherwise the current dir will be cloned into the
 * child element so it can be passed as a prop.
 *
 * ```tsx
 * // html element will be updated to have `dir="ltr"`
 * ReactDOM.render(<Dir><App /></Dir>, root)
 * ```
 *
 * ```tsx
 * // html element will be updated to have `dir="rtl"` while the `<span>` will
 * // now be `<span dir="ltr">`
 * ReactDOM.render(
 *   <Dir defaultDir="rtl">
 *     <Some>
 *       <Other>
 *         <Components>
 *           <Dir defaultDir="ltr">
 *             <span>Content</span>
 *           </Dir>
 *         </Components>
 *       </Other>
 *     </Some>
 *   </Dir>,
 *   root
 * );
 * ```
 *
 * Note: Since the `dir` is cloned into the child element, you need to make sure
 * that the child is either a DOM element or the `dir` prop is passed from your
 * custom component.
 *
 * @remarks \@since 2.3.0
 */
export function Dir(_a) {
  var children = _a.children,
    _b = _a.defaultDir,
    defaultDir = _b === void 0 ? DEFAULT_DIR : _b;
  var root = useContext(context).root;
  var _c = __read(useState(defaultDir), 2),
    dir = _c[0],
    setDir = _c[1];
  useEffect(
    function () {
      if (!root || typeof document === 'undefined') {
        return;
      }
      document.documentElement.setAttribute('dir', dir);
      return function () {
        document.documentElement.removeAttribute('dir');
      };
    },
    [dir, root]
  );
  var toggleDir = useCallback(function () {
    setDir(function (prevDir) {
      return prevDir === 'ltr' ? 'rtl' : 'ltr';
    });
  }, []);
  var value = useMemo(
    function () {
      return { root: false, dir: dir, toggleDir: toggleDir };
    },
    [dir, toggleDir]
  );
  var child = Children.only(children);
  if (!root) {
    child = cloneElement(child, { dir: dir });
  }
  return <Provider value={value}>{child}</Provider>;
}
//# sourceMappingURL=Dir.jsx.map
