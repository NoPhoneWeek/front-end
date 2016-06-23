# Contributing to NoPhoneWeek

To keep a burning flame away from this project we follow some
patterns and conventions and it'll be good you adhere to them
as you contribute.

## Styling Pattern
It helps to be familiar with patterns from [SMACSS](https://smacss.com/) and [BEM](https://en.bem.info/method/) as the Sass architecture is based on them. But if you're not then that's fine I'll rehash excerpts from them here along with some extra coding patterns and that should do.

#### Indentation
Use 2 line spaces not tabs both for script and stylesheets. A `.editorconfig` file should be with each repositories to enforce this. If you don't already have a .editorconfig plugin on your IDE/Editor you can get one from [here](http://editorconfig.org).

> You'd rather hit the tab key than the space key? Configure your editor to interpret tabs as spaces.

#### No ID Selectors in CSS
Use  class selectors in the CSS to avoid unwanted specificity spikes. IDs should only be used as JavaScript hooks.  If you need a class name as a JavaScript hook then use the `.js-` prefix/namespace. All CSS selectors should be in lower case and follow the BEM methods where there are components.

#### No Self Closing Tags
HTML5 allows tags like `<br />`, `<hr />`, and `<img src="cat.jpg" alt="" />` for backward compatibility but they are only compulsory to XHTML. Avoid such tags and use it this way: `<br>`, `<hr>`, `<img src="cat.jpg" alt="">`.

#### Namespacing
Harry Roberts made a [great guide](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) to [namespacing CSS](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/). Consider following most of these patterns but most importantly here are some of the namespaces that we use:

* **Utility Classes:** Utility classes are helper classes that can be used anywhere within the HTML to avoid inline styles e.g for aligning text you can use `.u-txtcenter`, `.u-txtleft`, `.u-txtright`.

* **JavaScript Hooks:** JavaScripts hooks are CSS classes that are used by the scripts and not inside CSS. We use the `.js-` prefix to distinguish them like `.js-toggleMenu`.

* **State based classes:** According to [SMACSS](https://smacss.com/book/type-state) state rules shouldn't be nested classes restricted to particular elements but instead stand separately in their own namespace `.is-` . We also use `.has-` as Harry recommends.

```scss
// Wrong
.menu{
  ...
  .active{
    color: red;
  }
}
// Right
.menu{
  ...
}
.is-menu-active{ color: red; }
```

#### Using BEM
Regular components in the code will have modifiers and child elements and the BEM method is used in this case with the component name as namespace.

```scss
.media{
  ...
// Modifiers
  &--dark{
    background: $dark-ui;
  }
  &--light{
    background: $light-ui;
  }
// child Elements
  &__avatar{
    ...
  }
  &__description{
    ...
  }
// Pseudo states
  &:hover{
    ...
  }
}
```
A good application of this can be seen in a state based set of classes where multiple classes are in the `is-` namespace.

```scss
.is{
  &-menu-active{ color: red; }
  ...
}
```

#### Vendor Prefixes
Dealing with vendor prefixes can be a headache so we leave task runners to do this for us using [Autoprefixer](https://github.com/postcss/autoprefixer) (_preferred_) or [Prefix-Free](https://leaverou.github.io/prefixfree/).

```scss
// Wrong - Isn't this so much work already?
.pod{
  -webkit-transition: 1s;
     -moz-transition: 1s;
      -ms-transition: 1s;
       -o-transition: 1s;
          transition: 1s;
}
// Right
.pod{
  transition: 1s;
}
```

#### Property-Value Spacing
Values should have a space from the property and not just merged directly after the colon

```scss
// Wrong
.pod{ width:100%; }
// Right
.pod{ width: 100%; }
```

#### All Property Values Most end with a Semi-Colon
You may be aware that semi-colon on last properties of rules do not matter and keeping them away helps in file size reduction. Well, good [Ol' John Henry](http://daverupert.com/2015/02/john-henry/) leave the work for the machine (task runner) and stick to readability.

```scss
//Wrong
.pod{
  width: 500px;
  height: 250px
}
// Right
.pod{
  width: 500px;
  height: 250px;
}
```

#### 0 and Units
Rems (root ems) are preferred for font sizes and the font should be reset to equalize 1rem to 10px by setting `html{ font-size: 62.5%; }` . Cases where there is a value of 0 it should never take a unit.

```scss
// Wrong
.pod{ margin: 0px; }
// Right
.pod{ margin: 0; }
```
Also omit 0s in float values e.g:
```scss
// Wrong
.pod{ color: rgba($color-brand-1, 0.5); }
// Right
.pod{ color: rgba($color-brand-1, .5); }
```

#### Protocol-less URLs
When using URLs to an absolute web address, avoid specifying a protocol use protocol-less URLs and don't use quotes inside url().

```scss
// Wrong
.pod{ background: url(http://www.images.coolsite.com/image1.jpg); }
// Wrong
.pod{ background: url("http://www.images.coolsite.com/image1.jpg"); }
// Right
.pod{ background: url(//www.images.coolsite.com/image1.jpg); }
```

#### Comments
Each component should have an heading comment. Present commenting pattern is in the [jsdoc](http://usejsdoc.org/)/[styledown](https://github.com/styledown/styledown) format:

```scss
/**
 * Buttons:
 * `.button` - Button classes
 *
 *   @example
 *   <button class="button button-green">Green buttons</button>
 *   <button class="button button-red">Red buttons</button>
 *   <button class="button button-yellow">Yellow buttons</button>
 *   <button class="button button-blue">Blue buttons</button>
 */
```

Also, avoid commenting leaving code you commented-out when you push to the repository. If it's something that was in a previous commit you can always reference it by looking back into that commit. If it's something else store it somewhere else but not inside the code. The only kind of comment allowed in code is documentation comments.

#### Rule Direction
When adding properties and values to a style rule you should ensure that you follow a vertical styling pattern and not an horizontal pattern. Exception is only allowed if the properties in the rule do not exceed 2.

```scss
// Wrong
.pod{ background: white; color: black; font-size: 3rem; cursor: pointer; }
// Right
.pod{
  background: white;
  color: black;
  font-size: 3rem;
  cursor: pointer;
}
// Ok
.pod{ background: white; color: black; }
```
It is also recommended to follow a [CSS property order](http://markdotto.com/2011/11/29/css-property-order/) for easier scanning through your code.

## Testing
When contributing to the JavaScript make sure you test every code before pushing to the repository or sending a PR.
