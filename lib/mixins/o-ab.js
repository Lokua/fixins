'use strict';

module.exports = ab;

/**
 * @mixin o-ab([selector], prop, variable, [template])
 * @desc
 * This mixin outputs two rules for the passed selector:
 * one as is, with prop and variable as is; the other with `.b` class
 * appended to the selector, and a `b` prepended to the variable name before it is
 * evaluated. Note that `variable` is sass-like, but you should NOT include the dollar sign
 * of your variable when passing it into `o-ab`. Note also that this mixin
 * does not support the named argument syntax like the rest of the __o-__
 * mixins do.
 *
 * To futher compilcate things, `o-ab` has different signatures
 * depending on if is being called in root context or not.
 * When on a root element the signature is `<selector>, <prop>, <variable>, [template]`.
 * In this context, `.b` is appended to the parent-most
 * (left-most) selector, so `x y z` will become `x.b y c`.
 *
 * @example
 * ```
 * // given input ...
 * $text-color: black;
 * $b-text-color: white;
 *
 * // note the lack of `$` before `text-color`
 * @mixin o-ab .box, color, text-color;
 *
 * // results in ...
 * .box {
 *   color: black;
 * }
 * .box.b {
 *   color: white;
 * }
 * ```
 *
 * When inside a rule the signature is `<prop>, <variable>, [template]`.
 * The `.b` class will be appended to the child-most
 * (right-most) selector, so `x y z` will become `x y z.b`.
 *
 * @example
 * ```
 * // input
 * $text-color: black;
 * $b-text-color: white;
 *
 * // note the lack of `$` before `text-color`
 * .box {
 *   .medium {
 *  	 @mixin o-ab color, text-color;
 *   }
 * }
 *
 * // note again the difference in output in root context
 * @mixin .box .medium, color, text-color;
 *
 * // output
 * .box .medium {
 *   color: black;
 * }
 * .box .medium.b {
 *   color: white;
 * }
 *
 * .box .medium {
 *   color: black;
 * }
 * .box.b .medium {
 *   color: white;
 * }
 * ```
 *
 * Using an optional template, any occurance of `$$` will
 * be replaced with `variable`. This is useful when your variable
 * is included in a multiple word value definition
 *
 * @example
 * ```
 * $color: black;
 * $b-color: white;
 *
 * @mixin o-ab .box, box-shadow, color, 0 1px 0 1px $$;
 *
 * // results in
 * .box {
 *   box-shadow: 0 1px 0 1px black;
 * }
 * .box.b {
 *   box-shadow: 0 1px 0 1px white;
 * }
 * ```
 *
 * @param [selector] - selector
 * @param prop - left handle property key
 * @param variable - sass-like variable reference without the leading `$`.
 *                   Passing `foo` is read internally as "use $foo and $b-foo".
 *                   If no reference to $foo or $b-foo is found, foo and b-foo
 *                   literals will be output.
 * @param [template] - text sequence to use as the right-hand value with
 *                     any occurance of `$$` replaced with `variable` results.
 */
function ab(mixin, selector, prop, variable, template) {

  const isInRoot = mixin.parent.type === 'root';

  if (!isInRoot) {
    template = variable;
    variable = prop;
    prop = selector;
  }

  let a = `$${variable}`;
  let b = `$b-${variable}`;
  if (template) {
    a = template.replace('$$', `$${variable}`);
    b = template.replace('$$', `$b-${variable}`);
  }

  if (isInRoot) {
    let sel = selector.split(' ');
    if (sel.length > 1) {
      // TODO: check for >, +, and -
      sel[0] = sel[0] + '.b ';
    }
    sel = sel.join('');

    return {
      [selector]: {
        [prop]: a
      },
      [sel]: {
        [prop]: b
      }
    };
  }

  return {
    [prop]: a,
    '&.b': {
      [prop]: b
    }
  };
}
