# Admin Bar Component

![Screenshot](resources/screenshots/screenshot-bar.png)

Admin Bar Component is a web component that is built with [Lit](https://lit.dev). It can be added to projects that can load web components (vanilla JavaScript and most modern frameworks) and it is customizable so you can choose what buttons are displayed, and you can style it to match your brand or website’s look and feel.

- 👋 Show an avatar and a greeting to confirm the currently logged-in user.
- 🚧 A customizable environment warning can be shown to let users know they are not on production.
- 🎛️ Buttons are customizable and can link to a URL or trigger JavaScript events.
- 2️⃣ Text elements can be added to provide stats and small notes to authors.
- 🚪 A dedicated logout button gives users a way to sign out of your app.

## Installation

To install Admin Bar Component, use NPM or a compatible package manager.

### With NPM:

```bash
npm install admin-bar-component --save-dev
```

## Setup

This package includes a JavaScript file that registers web components when you import it into a file or load it with a `<script type="module">` tag.

It also includes a CSS file that can be imported into your project’s CSS or loaded onto the page in a `<link>` tag.

### Setup Examples

![Screenshot](resources/screenshots/admin-bar-stackblitz.png)

- [CodePen – Basic Usage](https://codepen.io/wbrowar/pen/PwYPEEj)
- [CodePen – Kitchen Sink](https://codepen.io/wbrowar/pen/MYgavqL)
- [Stackblitz – Theme Examples](https://stackblitz.com/edit/vitejs-vite-gxbmja?file=index.html)
- [Stackblitz – Vite + Vanilla JS](https://stackblitz.com/edit/vitejs-vite-ckpby6?file=index.html)
- [Stackblitz – Vite + Vue.js 3](https://stackblitz.com/edit/vitejs-vite-gb3byy?file=vite.config.js)

### To add Admin Bar Component to an HTML page, follow these instructions:

1. Add the stylesheet in your `<head>` tag:
   ```html
   <link rel="stylesheet" href="path-to-your-assets/admin-bar.css" />
   ```
1. Add the JavaScript file wherever you load your scripts:
   ```html
   <script type="module" src="path-to-your-assets/admin-bar.js"></script>
   ```
1. Add and configure an `<admin-bar>` element:
   ```html
   <admin-bar></admin-bar>
   ```
1. Add buttons into your `<admin-bar>` element:
   ```html
   <admin-bar>
     <admin-bar-button></admin-bar-button>
   </admin-bar>
   ```

### To add Admin Bar Component to a project with a build tool, like Vite, follow these instructions:

1. In a global JavaScript file or in a specific layout or component file, you can import the JavaScript file like this:
   ```javascript
   import 'admin-bar-component'
   ```
1. You can load the CSS in your component file, as well, by importing the file directly:
   ```javascript
   import 'admin-bar-component'
   import 'admin-bar-component/dist/admin-bar.css'
   ```
2. Or, if you are using something like PostCSS, you can import the CSS file into your CSS file, like this:
   ```postcss
   @import url(admin-bar-component/dist/admin-bar.css);
   ```

Depending on what bundler or framework you are using, you may need to add loaders or register the web component as a custom element (telling the framework not to try to render it).

## Customizing Admin Bar

All of the features on the `<admin-bar>` element are opt-in by using attributes and slots.

For example, you can add a greeting message by adding the `show-greeting` attribute:
```html
<admin-bar show-greeting></admin-bar>
```

By default, this will say "Hello", but you can change the message by adding your own text or element into the `greeting` slot:
```html
<admin-bar show-greeting>
  <div slot="greeting">Hello, Sam</div>
</admin-bar>
```

Now your custom text will appear. If you would also like to add an avatar next to your message you can use the `avatar-src` and `avatar-alt` attributes:
```html
<admin-bar show-greeting avatar-src="path-to-your-assets/user-photo.jpg" avatar-atr="Sam’s avatar">
  <div slot="greeting">Hello, Sam</div>
</admin-bar>
```

> [!NOTE]
> If `show-greeting` is removed, the avatar image and the content in the `greeting` slot will no longer be rendered.

### Admin Bar Public Properties

| Attribute Name     | Type      | Default                       | Description                                                                                           |
|--------------------|-----------|-------------------------------|-------------------------------------------------------------------------------------------------------|
| `avatar-alt`       | _string_  | `'Avatar of logged in user.'` | Sets the alt text on an avatar image.                                                                 |
| `avatar-src`       | _string_  | `undefined`                   | Sets the `src` on an avatar image and enables the avatar image to be displayed.                       |
| `greeting-text`    | _string_  | `'Hello'`                     | Sets the greeting text content.                                                                       |
| `logout-href`      | _string_  | `'#'`                         | A URL added to the default logout button, when `show-logout` is added to an `<admin-bar>`.            |
| `logout-label`     | _string_  | `'Sign out'`                  | The label of the default logout button.                                                               |
| `show-environment` | _boolean_ | `false`                       | Displays the environment warning, letting users know what environment they are currently logged into. |
| `show-greeting`    | _boolean_ | `false`                       | Displays the avatar and greeting message.                                                             |
| `show-logout`      | _boolean_ | `false`                       | Displays the default logout button or content added to the `logout` slot.                             |

### Admin Bar Slots

| Slot Name          | Description                                                                                                                                                                                                                                                               |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `default`          | The `default` slot is where you would place `<admin-bar-button>` elements, but it can also be used for other elements. All children in the `default` slot will be laid out by CSS Flexbox and the contents will horizontally scroll when it gets too wide.                |
| `greeting`         | This slot is meant to let the logged-in user verify they are logged in, but any HTML or text can appear in the `greeting` slot.                                                                                                                                           |
| `greeting-popover` | Turns the `greeting` slot into a button and displays this slot content in a popover.                                                                                                                                                                                      |
| `logout`           | When `show-logout` is set, a default logout button will be rendered, using the `logout-href` and `logout-label` attributes. Adding elements into the `logout` slot will repace the default logout button, allowing you to use your own `<admin-bar-button>` in its place. |

## Customizing Add Admin Bar Buttons

Admin Bar Buttons are child web components that render either an `<a>` element or a `<button>` element—depending on the options you pass through.

To create an `<a>` element that links to a URL, you can add a label and a `button-href` attribute that includes your URL:
```html
<admin-bar-button button-href="https://myexample.com" label-text="My Link Label"></admin-bar-button>
```

To create a `<button>` element with JavaScript click event, you can leave off the `button-href` and the component will switch over to a button element:
```html
<admin-bar-button onclick="myEventHandlerMethod" label-text="My Button Label"></admin-bar-button>
```

To differentiate your buttons, `<svg>` or `<img>` icons can be added to either the `label-before` or `label-after` slots:
```html
<admin-bar-button onclick="myEventHandlerMethod" label-text="My Button Label"><span slot="label-before"><svg <!-- SVG code --> ></svg></span></admin-bar-button>
```

## Adding Sub-Menus Using Admin Bar Button Popovers

Populating the `popover` slot will render the `popover` slot and add a matching `popovertarget` attribute to the `<admin-bar-button>`. Clicking on the `<admin-bar-button>` will open the popover. Clicking or focusing anywhere away from the popover content will hide the popover content again.

> [!NOTE]
> The `popover` slot content appears below its `<admin-bar-button>` on browsers that support [CSS Anchor Positioning](https://caniuse.com/css-anchor-positioning). Browsers that don’t support CSS Anchor Positioning yet will fall back to displaying the `popover` slot in the center of the screen (which is the default for HTML popover).

Any HTML can be added to the `popover` slot, but for consistency, you can use `<admin-bar-text>` elements or `<admin-bar-button>` elements. Here’s an example of what an `<admin-bar-text>` popover could look like:

```html
<admin-bar-button>Show Popover<span slot="popover"><admin-bar-text>Hi, this is popover content 🍾</admin-bar-text></span></admin-bar-button>
```

The "Show Popover" text will appear as the label on the button and "Hi, this is popover content 🍾" will appear in the popover when the button is clicked.

To create a secondary row of links, you can populate the `popover` slot with `<admin-bar-button>` elements:

```html
<admin-bar-button>Popover Slot 2<nav slot="popover">
   <admin-bar-button button-href="https://craftcms.com">Craft CMS</admin-bar-button>
   <admin-bar-button button-href="https://laravel.com">Laravel</admin-bar-button>
</nav></admin-bar-button>
```

> [!NOTE]
> To make the links appear in a row, you can use CSS to style the `nav` element here to use `display: flex;`.

### Admin Bar Button Public Properties

| Attribute Name  | Type      | Default     | Description                                                                                                                  |
|-----------------|-----------|-------------|------------------------------------------------------------------------------------------------------------------------------|
| `button-href`   | _string_  | `undefined` | Adding the `button-href` turns the `<admin-bar-button>` into an `<a>` elements and sets this string as its `href` attribute. |
| `label-text`    | _string_  | `''`        | Sets the label for the `<admin-bar-button>`.                                                                                 |
| `logout-button` | _boolean_ | `false`     | Styles the button like the default logout button.                                                                            |

### Admin Bar Button Slots

| Slot Name      | Description                                                                    |
|----------------|--------------------------------------------------------------------------------|
| `after-label`  | Adds content after the label. This can be used for icons or other indicators.  |
| `before-label` | Adds content before the label. This can be used for icons or other indicators. |
| `default`      | Adding text or elements into the `default` slot replaces the `label-text`.     |
| `popover`      | Turns the button into a trigger and displays slot content in a popover.        |

### Replacing the Default Logout Button

You may have a situation where you need to replace the default logout button to—for example—a button that fires a JavaScript action. Starting with this code as an example, you can do the following:
```html
<admin-bar show-logout logout-href="/logout" logout-label="Log off"></admin-bar>
```

1. Add an `<admin-bar-button>` into the `default` slot of your `<admin-bar>`
   ```html
   <admin-bar show-logout logout-href="/logout" logout-label="Log off">
     <admin-bar-button></admin-bar-button>
   </admin-bar>
   ```
1. Add `slot="logout"` to the `<admin-bar-button>`. Add the `logout-button` attribute to style the button with the styles from the default logout button.
   ```html
   <admin-bar show-logout logout-href="/logout" logout-label="Log off">
     <admin-bar-button slot="logout" logout-button></admin-bar-button>
   </admin-bar>
   ```
1. If you are using vanilla JavaScript you can use an `onclick` attribute to fire your logout script on click. If you are using a compatible framework, you can change `onclick` to the syntax used for click directives.
   ```html
   <admin-bar show-logout logout-href="/logout" logout-label="Log off">
     <admin-bar-button onclick="handleLogoutMethod" slot="logout" logout-button></admin-bar-button>
   </admin-bar>
   ```
1. This replaces the original logout buttons, so you no longer need the `logout-href` and `logout-label` attributes. You still need the `show-logout` attribute to render the logout slot.
   ```html
   <admin-bar show-logout>
     <admin-bar-button onclick="handleLogoutMethod" slot="logout" logout-button></admin-bar-button>
   </admin-bar>
   ```

## Adding Text Elements to Admin Bar

The default slot of an `<admin-bar>` element is an element with `display: flex` on it. This means you can add `<admin-bar-button>` elements alongside any other HTML element you would like display next to them. You can add a `<div>` with text in it and use CSS to style it however you'd like, however, if you would simply like to display some text, you could use a `<admin-bar-text>` element:

```html
<admin-bar>
  <admin-bar-text text-content="Hello, World!"></admin-bar-text>
</admin-bar>
```

Using the `text-content` attribute will add plain text that is styled to look like the text in Admin Bar’s greeting. If you would like to style the text differently or if you would like to add your own HTML elements into the `<admin-bar-text>` element, you can use the default slot to add elements:

```html
<admin-bar>
  <admin-bar-text>Hello, World!</admin-bar-text>
</admin-bar>
```

### Adding Labels to Admin Bar Text Elements

You can use `<admin-bar-text>` elements for notes or for other useful information that is tied to the context of the current page you are on. Using the `label-content` attribute on a `<admin-bar-text>` element will let you call out stats and other information:

```html
<admin-bar>
  <admin-bar-text label-content="25" text-content="Enries in this Section"></admin-bar-text>
</admin-bar>
```

If you would like to create a text element that is made up of only a label, you can omit the default slot and the `text-content` attribute:

```html
<admin-bar show-environment>
  <admin-bar-text label-content="STAGING"></admin-bar-text>
</admin-bar>
```

> [!TIP]
> The color of labels can be styled using CSS Custom Properties. This can be helpful in alerting users of important information.

Text in `<admin-bar-text>` elements are not allowed to wrap by default, but adding the `multi-line` attribute unsets the CSS that keep its content on one line.

```html
<admin-bar>
  <admin-bar-text multi-line>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus beatae corporis dicta, eum illum numquam quos reiciendis sequi ut. Alias culpa eum itaque molestiae mollitia quas qui saepe veniam, voluptatum.</admin-bar-text>
</admin-bar>
```

### Adding Definition Lists to Admin Bar Text Elements (in Popovers)

The `dl-content` prop displays an array of key/value arrays in a `<dl>` element. While you otherwise can be creative with it, it’s intended to be used in popovers as part of `<admin-bar-button>` elements.

To add a button that displays a list of items in a popover you can start with an `<admin-bar>` with an `<admin-bar-button>` element in it. In the `<admin-bar-button>` element, add the `popover` slot:

```html
<admin-bar>
  <admin-bar-text>
     List of items.
     <span slot="popover"></span>
  </admin-bar-text>
</admin-bar>
```

Add an `<admin-bar-text>` element with the `dl-content` prop. The value of the prop is an array of arrays. For each second-level array, 2 values are required. The first value will always render in a `<dt>` element and the second value will render in its matching `<dd>` element.

```html
<admin-bar>
  <admin-bar-text>
     List of items.
     <span slot="popover">
        <admin-bar-text dl-content='[["Line 1 title", "Line 1 content"], ["Line 2 title", "Line 2 content"]]'></admin-bar-text>
     </span>
  </admin-bar-text>
</admin-bar>
```

Notice how above the `dl-content` prop uses single quotes (`''`) for the attribute value? The contents of the `dl-content` prop need to be a valid JSON string. You can use single quotes so you can use double quotes like above, however, if you are working in a situation where you can’t do that, you can escape double quotes by using `&quot;` instead:

```html
<admin-bar>
  <admin-bar-text>
     List of items.
     <span slot="popover">
        <admin-bar-text dl-content="[&quot;Line 1 title&quot;, &quot;Line 1 content&quot;], [&quot;Line 2 title&quot;, &quot;Line 2 content&quot;]"></admin-bar-text>
     </span>
  </admin-bar-text>
</admin-bar>
```



### Admin Bar Text Public Properties

| Attribute Name   | Type               | Default        | Description                                                                                     |
|------------------|--------------------|----------------|-------------------------------------------------------------------------------------------------|
| `dl-content`     | _TextDlContent_    | `[]`           | A tuple array that is turned into an HTML definition list.                                      |
| `label-content`  | _string_           | `''`           | Sets the label for the `<admin-bar-text>`.                                                      |
| `label-position` | _string_           | `'after'`      | Sets the position for the label. Accepts: `'after'`, `'before'`                                 |
| `multi-line`     | _boolean_          | `false`        | Allows the content to wrap to the next line.                                                    |
| `table-content`  | _TextTableContent_ | `{ rows: [] }` | An object that is turned into an HTML table.                                                    |
| `text-content`   | _string_           | `''`           | Sets the text content for the `<admin-bar-text>`. This can be used instead of the default slot. |

> [!NOTE]
> Only one of the following props should be used on an `<admin-bar-text>` element (only one will be rendered at a time): `dl-content`, `table-content`, `text-content`

#### Admin Bar Text Types

Here are the TypeScript types that describe the formats for the props 

```typescript
type TextDlContent = [string | number, string | number][]

interface TextTableContent {
  footers?: string[]
  headers?: string[]
  rows: (string | number)[][]
}
```

### Admin Bar Text Slots

| Slot Name      | Description                                                       |
|----------------|-------------------------------------------------------------------|
| `default`      | Text or HTML elements rendered in the `<admin-bar-text>` element. |

## Styling Admin Bar

Admin Bar Component is a web component that renders via the Shadow DOM. This means that Admin Bar Component won’t pick up the styles from your project’s stylesheets, but it also means that you cannot directly style children in the `<admin-bar>` and `<admin-bar-button>` components.

> [!NOTE]
> Slot content is an exception. They will pick up some styles from the web component CSS, but you can also use CSS to style them in your stylesheet.

Classes, CSS Cascade Layers, CSS Custom Properties can be used to customize the look of your Admin Bar.

### Top-Level Classes

Classes can be added to `<admin-bar>` elements to change the look and placement of the element on your page.

| Class    | Description                                                                                                                                                                                                                       |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bottom` | Works along side the `fixed` or `sticky` class to move the `<admin-bar>` to the bottom of the page (sets the `bottom` CSS property to `0` and the `top` to `auto`).                                                               |
| `fixed`  | Makes the `<admin-bar>` fixed to the top of the page, using CSS `position: fixed`. When using `fixed` you can move `<admin-bar>` to the bottom of your `<body>` element.                                                          |
| `rtl`    | Changes the reading direction from `ltr` to `rtl` in situations where you need to manually set it. Admin Bar Component will automatcally switch to RTL if your page is set to RTL or if you have the CSS set to `direction: rtl`. |
| `sticky` | Makes the `<admin-bar>` stick to the top of the page, using CSS `position: sticky` when the `<admin-bar>` is above the rest of the content on the page.                                                                           |

> [!NOTE]
> The `fixed` and `sticky` classes are there to make setting the position easy, however, instead of using those classes, you could style the `admin-bar` element position in your CSS.
---

Currently, there are no classes that can be added to `<admin-bar-button>` or `<admin-bar-text>` elements.

### CSS Cascade Layers

Linking or importing the `admin-bar.css` into your project sets default CSS Custom Property values. The CSS in this file is added to a [CSS Cascade Layer](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers), called `admin-bar`.

If you are using CSS Cascade Layers in your project you can add the `admin-bar` layer to your layer stack and then override it with another layer:

```css
@layer reset, third-party, admin-bar, theme, layout, utilities;
@layer theme {
    admin-bar {
        /* Styles go here, for example: */
        --admin-bar-bg: #DA00FD8C;
    }
}
```

If you are not using CSS Cascade Layers, you can override styles without the layer at-rule, because unlayered styles have more specificity:

```css
admin-bar {
    /* Styles go here, for example: */
    --admin-bar-bg: rgba(52, 215, 0, 0.5);
}
```

### CSS Custom Properties

The `admin-bar.css` file has comments describing what each CSS Custom Property styles. The contents of that file can be found here:

```css
/* Added styles to CSS Cascade Layer to make it easier to override them. */
@layer admin-bar {
   admin-bar {
      /* The height and width of avatar images. */
      --admin-bar-avatar-size: 25px;

      /* Sets the background of the `<admin-bar>` elements and popovers using the background shorthand property,
      allowing you to use a gradient, a solid color, or an image. Setting this removes the "glass" effect and transparencies in popovers. */
      /*--admin-bar-bg: var(--admin-bar-bg-color);*/

      /* The color of the glass background. Will get overridden if `--admin-bar-bg` is set. */
      --admin-bar-bg-color: oklch(0 0 0 / 0.2);

      /* The backdrop-filter value for the glass background. */
      --admin-bar-bg-filter: blur(32px) brightness(0.65) saturate(2.5);

      /* A background image that adds noise to the glassy surface. Comment this out if you prefer no noise. */
      --admin-bar-bg-image: url(data:image/png;base64,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);

      /* The vertical padding default for Admin Bar child elements. */
      --admin-bar-block-padding: 0;

      /* Border radius value used in different places. */
      --admin-bar-border-radius: 6px;

      /* The color of the text and icons during the hover state. */
      --admin-bar-color-highlight: oklch(0.6 0.4 83);

      /* The highlight color specific to logout buttons. That can be set to
      a different color to make it more obvious that the logout button is not a link. */
      --admin-bar-color-highlight-logout: var(--admin-bar-color-highlight);

      /* The color of text for everything but button labels.. */
      --admin-bar-color-text: rgb(255 255 255 / 0.9);

      /* When `show-environment` is added to an `<admin-bar>` an environment
      warning will appear. The default looks like yellow, striped police tape,
      but you can use any CSS value used in the background shorthand property. */
      --admin-bar-environment-bg: repeating-linear-gradient(
              -45deg,
              var(--admin-bar-environment-bg-color),
              var(--admin-bar-environment-bg-color) 18px,
              transparent 18px,
              transparent 30px
      );

      /* Change just the color of the yellow stripes in the environment warning. */
      --admin-bar-environment-bg-color: oklch(0.9 0.4 98);

      /* The height of the environment warning */
      --admin-bar-environment-height: 5px;

      /* The font size for all text. */
      --admin-bar-font-size: .9rem;

      /* The font stack for all text. Set this to `inherit` to match the font-family of the parent element (including fonts set in @font-face). */
      --admin-bar-font-stack: system-ui, sans-serif;

      /* The default direction of gradients. */
      --admin-bar-gradient-direction: to bottom;

      /* The height of the bar and all of the buttons. */
      --admin-bar-height: 43px;

      /* The horizontal padding default for Admin Bar child elements. */
      --admin-bar-inline-padding: clamp(4px, 1vw, 13px);

      /* Sets the amount of space Admin Bar is inset from the top, bottom, and sides of the viewport. */
      --admin-bar-inset-size: clamp(2px, 1vw, 10px);

      /* Adds a box-shadow to avatar images and buttons. */
      --admin-bar-shadow-elements: 0 1px 2px color-mix(in srgb, rgb(0 0 0 / 0.4), currentColor 10%), 0 3px 6px color-mix(in srgb, rgba(0 0 0 / 0.3), currentColor 10%);

      /* The default transition duration for all animations.
      Set this to `0` to turn off transitions. */
      --admin-bar-transition-duration: 0.3s;

      /* By default, when adding the `fixed` or `sticky` class to an `<admin-bar>`,
       the z-index of the element is set to `1`. Set this property if you need the
       z-index to be a higher value. */
      /*--admin-bar-z-index: 1;*/

      /* ====================================================================== */

      /* The background of all buttons. */
      --admin-bar-button-color-bg: transparent;

      /* The background of the button that is currently in the hover state. */
      --admin-bar-button-color-bg-hover: var(--admin-bar-button-color-text, white);

      /* The text of all button labels. */
      --admin-bar-button-color-text: rgb(255 255 255);

      /* The default color of text on button popover elements. */
      --admin-bar-button-popover-color-text: var(--admin-bar-color-text, rgb(255 255 255));

      /* The background of the button popover element. */
      --admin-bar-button-popover-bg: var(--admin-bar-bg);

      /* The `border-radius` property that changes based on the position of the popover.  */
      --admin-bar-button-popover-border-radius: var(--admin-bar-border-radius);

      /* ====================================================================== */

      /* The value of the padding property on `admin-bar-text` components. */
      /*--admin-bar-text-padding: var(--admin-bar-block-padding) var(--admin-bar-inline-padding);*/

      /* The background for labels in `admin-bar-text` components. */
      --admin-bar-text-label-color-bg: rgb(255 255 255 / 0.9);

      /* The text for labels in `admin-bar-text` components. */
      --admin-bar-text-label-color-text: rgb(0 0 0 / 1);

      /* ====================================================================== */

      /* Default styles for the `<admin-bar>` element. */
      --environment-height: 0px;
      display: block;
      width: var(--admin-bar-width);
      height: calc(var(--admin-bar-height, 43px) + var(--environment-height));

      /* Stop `admin-bar-button` elements from shrinking on resize. */
      & > admin-bar-button {
         flex-shrink: 0;
      }

      /* Add height when environment warning is enabled. */
      &[show-environment] {
         --environment-height: var(--admin-bar-environment-height);
      }
      /* Set read direction from right to left. */
      &.rtl {
         direction: rtl;
      }
      /* Fixes `<admin-bar>` to the top of page. */
      &.fixed {
         position: fixed;
         inset-inline: var(--admin-bar-inset-size, 0);
         z-index: var(--admin-bar-z-index, 1);

         &:not(.bottom) {
            inset-block-start: var(--admin-bar-inset-size, 0);
         }
      }
      /* Sticks `<admin-bar>` to the top of the page when scrolling. */
      &.sticky {
         position: sticky;
         margin-inline: var(--admin-bar-inset-size, 0);
         z-index: var(--admin-bar-z-index, 1);

         &:not(.bottom) {
            inset-block-start: var(--admin-bar-inset-size, 0);
         }
      }
      /* Moves `<admin-bar>` to the bottom of the page when using `.fixed` or `.sticky`. */
      &.bottom {
         --admin-bar-gradient-direction: to top;
         inset-inline: var(--admin-bar-inset-size, 0);
         inset-block-end: var(--admin-bar-inset-size, 0);
      }

      /* Avoid layout shift from happening before Admin Bar Component is registered. */
      &:not(:defined) {
         background: var(--admin-bar-bg-color);
         opacity: 0.75;

         /* Hide all slot content until Admin Bar Component is registered. */
         & * {
            display: none;
         }
      }
   }

   @media (prefers-reduced-motion) {
      admin-bar {
         /* Turns off transitions for users who do not want any animations. */
         --admin-bar-transition-duration: 0s;
      }
   }
   @media (prefers-reduced-transparency) {
      admin-bar {
         /* Reduces the amount of transparency in background colors for users who prefer more contrast.
            If `--admin-bar-bg` is set, these values will be overridden by the color chosen for `--admin-bar-bg`. */
         --admin-bar-bg-color: oklch(0 0 0 / 0.6);
      }
   }
}
```

> [!NOTE]
> Changes made to Admin Bar Component will try to avoid breaking functionality and styles until the next major version. In order to introduce new features, the CSS and CSS Custom Properties above may change how they are used to style these components. This file may change and default styles may be added or removed over time, so including it into your project should be automated or frequently updated.

## Programmatically Adding Admin Bar

An optional helper, called `AdminBarBuilder`, can be added to your project to generate an `<admin-bar>` element from structured data. This could be helpful if you use an API endpoint to generate data to pass into Admin Bar.

To use `AdminBarBuilder`, import the `AdminBarBuilder` class into your project along with the default JavaScript and CSS files.

```javascript
import { AdminBarBuilder } from 'admin-bar-component'
import 'admin-bar-component/dist/admin-bar.css'
```

From here you can construct a new `AdminBarBuilder` and pass in your structured data and options:

```javascript
const builderData = {
 buttons: [
   {
     buttonHref: '/',
     labelText: 'Dashboard',
     icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 228.93 228.72" style="width: 16px; height: auto;"><defs><style>.cls-1{fill:currentColor;}</style></defs><title>edit</title><path class="cls-1" d="M227.35,48.35a14.64,14.64,0,0,0-2.79-17L197.84,4.58a15.47,15.47,0,0,0-17.42-3.17l-5.95,4.74L14.29,166.33,0,228.72l62.39-14.29L222.57,54.26ZM32.59,210.92a30,30,0,0,0-14.84-14.58l5.53-24.15,14.14,6.91,13.06,13.06,6.86,13,0,0Z"/></svg>',
     type: 'button',
   },
   // ... more buttons or text elements
 ],
 environment: {
   enable: true,
   label: 'DEV',
 },
 greeting: {
   avatarAlt: 'randomly generated image',
   avatarSrc: 'https://picsum.photos/150/150',
   enable: true,
   text: 'Hello, Author',
 },
 logout: {
   enable: true,
   href: '/logout',
   label: 'Logout',
 },
}
new AdminBarBuilder({
 options: {
   adminBarClass: 'sticky',
 },
 container: document.getElementById('admin-bar-autorender-target'),
 data: builderData,
})
```

When you pass an element into the `container` property and valid data into the `data` property, it will automatically replace the contents of that container with a generated `<admin-bar>` element.

If you prefer to modify data or programmatically replace an existing `<admin-bar>` element you can break this process up into multiple steps:

```javascript
const builderData = {
 buttons: [
   {
     buttonHref: '/',
     labelText: 'Dashboard',
     icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 228.47 193.88" style="width: 18px; height: auto;"><defs><style>.cls-1{fill:currentColor;}</style></defs><title>dashboard</title><path class="cls-1" d="M125.92,97.18A18.93,18.93,0,0,0,118,92.43L57,55.88l37.48,60.79a19,19,0,1,0,31.48-19.49Z"/><path class="cls-1" d="M114.24,0C51.15,0,0,51.33,0,114.42a115.09,115.09,0,0,0,17.8,61.45c4.25,6,11.17,18,21.67,18h148c10.5,0,18.95-12,23.2-18A114.54,114.54,0,0,0,114.24,0ZM40.63,175.88a96.86,96.86,0,0,1-22.16-61.51,95.76,95.76,0,1,1,169.37,61.51Z"/></svg>',
     type: 'button',
   },
   // ... more buttons or text elements
 ],
 environment: {
   enable: true,
 },
 greeting: {
   avatarAlt: 'randomly generated image',
   avatarSrc: 'https://picsum.photos/150/150',
   enable: true,
 },
 logout: {
   enable: true,
 },
}

// Init a new AdminBarBuilder instance.
const adminBarBuilder = new AdminBarBuilder()

// Set options to pass into AdminBarBuilder.
adminBarBuilder.setOptions({
 adminBarStyle: {
   '--admin-bar-environment-bg-color': 'oklch(0.71 0.33 341.27)',
 }
})

// Set a container target that will be replaced later on.
adminBarBuilder.setContainer(document.getElementById('admin-bar-split-target'))

// Set structured data—this can be set on page or after an API call to get this data.
adminBarBuilder.setData(builderData)

// Get an `<admin-bar>` element generated from the options and data passed in above.
// If a required property isn’t set, this will return `null`
const adminBar = adminBarBuilder.getAdminBar()
if (adminBar) {
 // Replace container children with new `<admin-bar>` child.
 adminBarBuilder.addAdminBar(adminBar)
}
```

For a full list of available properties, see the source at: `./src/utils/AdminBarBuilder.ts`

## Contributing
This project is new and it will evolve as it grows (including adding CI automation, tests, and checks). For now, if you run into any bugs, please [leave an issue on GitHub](https://github.com/wbrowar/admin-bar-component/issues).

If you would like to contribute changes to the project, please do the following:
1. Fork the branch you would like to start with (usually `main`).
2. Set up the project locally (using the Node version described in the `.nvmrc` file in the root).
3. Make your changes.
4. Run `npm run test` to run type checking and to run tests.
5. Push your branch up and [create a pull request on GitHub](https://github.com/wbrowar/admin-bar-component/pulls).

Not all pull requests will be pulled in and not all issues will get fixed, but all suggestions are welcomed.
