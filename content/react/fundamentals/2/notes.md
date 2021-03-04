## Readings

1.  The raw React API

    -   `React`
        -   Responsible for creating elements (like `document.createElement`)
    -   `ReactDom`
        -   Responsible for rendering React elements to the dom (like `node.append`)
    -   ❗ Understand in more detail how that function works`React.createElement()`,
    -   [`pomber/didact`: A DIY guide to build your own React](https://github.com/pomber/didact)
    -   [Kent's Blog: Javascript to Know for React](https://kentcdodds.com/blog/javascript-to-know-for-react)
    -   [MDN Webdocs: DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
    -   [React Source Code](https://github.com/facebook/react/blob/48907797294340b6d5d8fecfbcf97edf0691888d/packages/react-dom/src/client/ReactDOMComponent.js#L416)
    -   [UI.dev: Imperative vs Declarative Programming](https://ui.dev/imperative-vs-declarative-programming/)
    -   [unpkg](https://unpkg.com/)

2.  JSX

    -   ❗ Train your brain to look at JSX and see the compiled version of the code!
    -   [React docs: Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
    -   [React docs: JSX in depth](https://reactjs.org/docs/jsx-in-depth.html)
    -   [Kent's What is JSX](https://kentcdodds.com/blog/what-is-jsx)
    -   [Babel](https://babeljs.io/), [online Babel Repl](https://babeljs.io/repl)

3.  Custom Components

    -   Components are basically functions that returns something that is 'renderable' (IE more react elements strings, null, numbers, etc)
    -   The first argument of `React.createElement()` can be a string, but that first argument can also be a function that returns something renderable.

4.  PropTypes, Fragments, and Styling

    -   [React Docs: Fragment](https://reactjs.org/docs/fragments.html)
    -   [React Docs: Type Checking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
    -   [MDN Docs: CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration)

5.  Forms

    -   [MDN: Web forms — Working with user data](https://developer.mozilla.org/en-US/docs/Learn/Forms)
    -   ❗ [Exercise 6.3](https://github.com/kentcdodds/react-fundamentals/blob/main/src/final/06.extra-3.js)
    -   ❗ [Exercise 6.2](https://github.com/kentcdodds/react-fundamentals/blob/main/src/final/06.extra-2.js)
    -   ❗ Controlled vs Uncontrolled
        -   “uncontrolled” - means that the browser is maintaining the state of the input by itself, we can be notified of changes and “query” for the value from the DOM node.

6.  Rendering an array

    -   [Kent's Blog: Understanding React's Key Prop](https://kentcdodds.com/blog/understanding-reacts-key-prop)
    -   [Stackoverflow: What is the significance of keys in ReactJS?](https://stackoverflow.com/questions/42801343/what-is-the-significance-of-keys-in-reactjs)

7.  Etcetera

    -   [My old notes](https://github.com/mithi/digital-garden/blob/page/web-dev/public/markdown-notes/epic-react-1-react-fundamentals.md)
    -   [Matt Zabriskie: React Workshop Exercises](https://github.com/mzabriskie/react-workshop)
    -   [Alex Kondov: Tao of React - Software Design, Architecture & Best Practices](https://alexkondov.com/tao-of-react/#write-consistent-components)
    -   [Dmitri Pavlutin: 5 Differences Between Arrow and Regular Functions](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions)
    -   [Kent C Dodds: Function forms](https://kentcdodds.com/blog/function-forms)
        > Practice SOLID principles, Test-driven development (TDD), Domain-Driven Design, careful organization of system design in daily coding challenges
