1. How to add interactivity

    - Kent C Dodd's [Javascript to Know for React](https://kentcdodds.com/blog/javascript-to-know-for-react)
    - The browser takes the html code and generates the DOM [(read: MDN Webdocs)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). The browser then exposes is to Javascript so you can add page interactivity.
    - `document.createElement()` or `document.getElementById()`
    - `node.textContent = "Hello"` or `node.className = "container"`
    - `document.body.append(node)` or `node.append(otherNode)`

2. The raw React API

    - [React Source Code](https://github.com/facebook/react/blob/48907797294340b6d5d8fecfbcf97edf0691888d/packages/react-dom/src/client/ReactDOMComponent.js#L416)
    - UI.dev [Imperative vs Declarative Programming](https://ui.dev/imperative-vs-declarative-programming/)
    - `React`: Responsible for creating elements (like `document.createElement`)
    - `ReactDom` Responsible for rendering React elements to the dom(like `node.append`)
    - [npm package registry](https://www.npmjs.com/) to install packages
    - [unpkg](https://unpkg.com/) - Load files using an URL, embed in html inside script tags
    - ❗ Checkout examples on how to use `React.createElement()`, understand in more detail how that function works

3. `React.createElement()`

    - The second argument of React.createElement is an object or null.
    - It is null if the element doesn't have any other properties
    - This object has properties as its keys like className and children.
    - The children property can be one element or an array of elements.
    - An element of children can be another react element or something you can directly displayed in the dom like a string or number.
    - You don't have to pass children as part of the object you pass in the second argument of `React.createElement`, you can pass it on its own in the third argument.

4. JSX

    - Train your brain to look at JSX and see the compiled version of the code!
    - Convert JSX to javascript with [Babel](https://babeljs.io/), a javascript compiler, [Online Babel Repl](https://babeljs.io/repl)
    - Babel is written is javascript so you can add a script tag with babel in your html, run it on the browser it can compile jsx on the fly
    - React docs: [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html), [JSX in depth](https://reactjs.org/docs/jsx-in-depth.html)

5. Custom Components

    - Components are basically functions that returns something that is 'renderable' (more react elements, strings, null, numbers, etc)
    - The first argument of `React.createElement()` can be a string, but that first argument can also be a function that returns something renderable.
    - ❗ Familiarize yourself on examples on what babel outputs for jsx based on how it appears: `<Capitalized />`, `<property.access />`, `<property.Access/>`, `<lowercase />`, `<kebab-case />`, `<lower_snake_case />`... etc...
    - React Docs: [Fragment](https://reactjs.org/docs/fragments.html). `<React.Fragment>` a special kind of component from React which allows you to position two elements side-by-side rather than just nested.

6. PropTypes

    - React Docs: [Type Checking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html).
    - Useful for debugging and documentation. You get an error in the console if you misuse the component. Use `isRequired` feature!
    - Only run in development, NOT in production, because it has overhead

7. Styling

    - You can use inline styles with `style` prop, or regular css with `className` prop, MDN Wbe docs: [CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration)
    - A nice pattern example: make a custom `<Box />` component Component that renders a div, accepts all the props and merges the given style and className props with the shared values. Add a `size` prop that takes `small`, `medium`, or `large`. You can also put a default style that can be overridden.

8. Forms

    - Attach a submit handler with `onSubmit` prop. Will be called with the `submit event` which has a `target`. The `target` has a reference to the `<form>` dom node which has references to the elements of the form which can be used to get the values out of the form.
    - Some ways to get the value of the name input:
        - via index: `event.target.elements[0].value`
        - via their name or id attribute: `event.target.elements.usernameInput.value`
        - Via ref [useRef (React Docs)](https://reactjs.org/docs/hooks-reference.html#useref)
    - A ref is an object that stays consistent between renders of your React component. It has a `current` property which can be updated at any time. In the case of interacting with DOM nodes, you can pass a ref to a React element and React will set the current property to the DOM node that’s rendered.
    - ❗ learn good practices to validate lower-case, use [useState hook](https://reactjs.org/docs/hooks-state.html)
    - ❗ Controlled vs Uncontrolled. the input value. You may want to set the value explicitly when the user clicks a button or change the value as your user is typing.
    - “uncontrolled” - means that the browser is maintaining the state of the input by itself, we can be notified of changes and “query” for the value from the DOM node.

9. Rendering an array

    - ❗ A key prop is required when you attempt to render a list of elements
    - Kent C Dodds: [Understanding React's Key Prop](https://kentcdodds.com/blog/understanding-reacts-key-prop)
    - Stackoverflow: [What is the significance of keys in ReactJS?](https://stackoverflow.com/questions/42801343/what-is-the-significance-of-keys-in-reactjs)

10. Misc
    - [Checkout my old notes](https://github.com/mithi/digital-garden/blob/page/web-dev/public/markdown-notes/epic-react-1-react-fundamentals.md)
    - Matt Zabriskie: [React Workshop Exercises](https://github.com/mzabriskie/react-workshop)

## Exercises

1. Examples of using `createElement`
2. Examples of using `propTypes`
3. Example of styling
4. Example of forms
5. Examples of arrays
