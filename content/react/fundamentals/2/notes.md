## Additional Notes

1.  The raw React API

    -   `React`: Responsible for creating elements (like `document.createElement`)
    -   `ReactDom`: Responsible for rendering React elements to the dom (like `node.append`)
    -   ❗ Understand in more detail how that function works`React.createElement()`,
    -   [Kent's Blog: Javascript to Know for React](https://kentcdodds.com/blog/javascript-to-know-for-react)
    -   [MDN Webdocs: DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
    -   [React Source Code](https://github.com/facebook/react/blob/48907797294340b6d5d8fecfbcf97edf0691888d/packages/react-dom/src/client/ReactDOMComponent.js#L416)
    -   [UI.dev: Imperative vs Declarative Programming](https://ui.dev/imperative-vs-declarative-programming/)
    -   [unpkg](https://unpkg.com/)

2.  `React.createElement()`

    -   The first argument is either a function (that returns something renderable) or a string that represents an html element (`div`, `h1`, `span`)
    -   The second argument of `React.createElement` is an object or `null`.
        -   It is `null` if the element doesn't have any other properties
        -   If it is an object, The object's keys are property names like like `className`, `style`, and `children`.
    -   The `children` property can be one element or an array of elements.
    -   An element of children can be another react element or something you can directly displayed in the dom like a string or number.
    -   You don't have to pass children as part of the object you pass in the second argument of `React.createElement`, you can pass it on its own as the third argument.

3.  JSX

    -   Train your brain to look at JSX and see the compiled version of the code!
    -   [React docs: Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
    -   [React docs: JSX in depth](https://reactjs.org/docs/jsx-in-depth.html)
    -   [Kent's What is JSX](https://kentcdodds.com/blog/what-is-jsx)
    -   [Babel](https://babeljs.io/), [online Babel Repl](https://babeljs.io/repl)
        -   Babel is written is javascript so you can add a script tag with babel in your html, run it on the browser it can compile jsx on the fly

4.  Custom Components

    -   Components are basically functions that returns something that is 'renderable' (IE more react elements strings, null, numbers, etc)
    -   The first argument of `React.createElement()` can be a string, but that first argument can also be a function that returns something renderable.
    -   ❗ Familiarize yourself on examples on what babel outputs for jsx based on how it appears (`<Capitalized />`, `<property.access />`)

5.  PropTypes, Fragments, and Styling

    -   [React Docs: Fragment](https://reactjs.org/docs/fragments.html)
    -   [React Docs: Type Checking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
    -   [MDN Docs: CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration)
    -   A nice pattern: make a custom `<Box />` component that renders a div, accepts all the props and merges the given style and className props with the shared values. You can also put a default style that can be overridden. You can also add your custom props for styling conventions (example: `size` prop that takes `small`, `medium`, or `large`)

6.  Forms

    -   How forms work:
        -   Attach a submit handler with `onSubmit` prop.
        -   It will be called with the `submit event` which has a `target`.
        -   The `target` has a reference to the `<form>` dom node.
        -   The form node has references to the elements of the form which can be used to get the values out of the form.
    -   Some ways to get the value of from input field node `onChange`:
        -   via index: `event.target.elements[0].value`
        -   via their name or id attribute: `event.target.elements.usernameInput.value`
        -   via ref [useRef (React Docs)](https://reactjs.org/docs/hooks-reference.html#useref)
    -   ❗ Learn good practices for validating lower-case on input fields
    -   ❗ Controlled vs Uncontrolled
        -   “uncontrolled” - means that the browser is maintaining the state of the input by itself, we can be notified of changes and “query” for the value from the DOM node.

7.  Rendering an array

    -   [Kent's Blog: Understanding React's Key Prop](https://kentcdodds.com/blog/understanding-reacts-key-prop)
    -   [Stackoverflow: What is the significance of keys in ReactJS?](https://stackoverflow.com/questions/42801343/what-is-the-significance-of-keys-in-reactjs)

8.  Misc
    -   [My old notes](https://github.com/mithi/digital-garden/blob/page/web-dev/public/markdown-notes/epic-react-1-react-fundamentals.md)
    -   [Matt Zabriskie: React Workshop Exercises](https://github.com/mzabriskie/react-workshop)

## Readings

-   [Alex Kondov: Tao of React - Software Design, Architecture & Best Practices](https://alexkondov.com/tao-of-react/#write-consistent-components)
-   [Dmitri Pavlutin: 5 Differences Between Arrow and Regular Functions](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions)
-   [Kent C Dodds: Function forms](https://kentcdodds.com/blog/function-forms)
    > Practice SOLID principles, Test-driven development (TDD), Domain-Driven Design, careful organization of system design in daily coding challenges
