## 💻 Exercise One: Pure Javascript

Create and append dom elements in vanilla javascript. Write javascript code between `<script>` tags to produce the codeblock below on an html file

```html
<div id="root">
    <div class="container">Hello World</div>
</div>
```

Use the code block below as your starting point.

```html
<body>
    <!-- html elements can already exist before running your code -->
    <div id="root"></div>
    <script type="module">
        // write your javascript code here,
        // this is below all the existing html nodes
        const node = document.getElementById("root")
    </script>
</body>
```

Solution:

```jsx
// case 0
// If the root element doesn't exist yet we must creat and append it to the dom first
let rootElement = document.createElement("div")
rootElement.setAttribute("id", "root")
document.body.append(rootElement)

// case 1
// If the element with an id of `root` already exists in the document
// we just need to grab it
rootElement = document.getElementById("root")

// for both case 0 and 1
// create the child element, set properties, append to the dom
const element = document.createElement("div")
element.textContent = "Hello World"
element.className = "container"
rootElement.append(element)
```

## 💻 Exercise Two: Babel for inline JSX

Exercise 2a: Create an `div` element with a `class` of `container` with `Hello World` written on it. Use `jsx` syntax. Assume that a `div` with an `id` of `root` already exists in the page. Put the `div` with a `class` of container inside the `root` node. Use `ReactDom` to render this on the browser.

Solution:

```jsx
const element = <div className="container">Hello World</div>
ReactDOM.render(element, document.getElementById("root"))
```

Exercise 2b: Do the same as in Exercise 2a, but instead of using `jsx` syntax, use `React.createElement` instead.

Solution:

```jsx
const rootElement = document.getElementById("root")
const element = React.createElement("div", {
    className: "container",
    children: "Hello World",
})
ReactDOM.render(element, rootElement)
```

Fun fact: you can actually use React (and optionally the babel compiler to add jsx) directly on your html file like this:

```html
<body>
    <div id="root"></div>
    <!-- You can import react directly on your html document via unpkg -->
    <script src="https://unpkg.com/react@17.0.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone@7.12.4/babel.js"></script>
    <script type="text/babel">
        // write your script here!
    </script>
</body>
```

## 💻 Exercise Three: Multiple children

Write code using `React` to generate the `html` code below.

```html
<div id="root">
    <div class="container">
        <span>Hello</span>
        <span>World</span>
    </div>
</div>
```

Solution:

```jsx
const helloElement = React.createElement("span", null, "Hello")
const worldElement = React.createElement("span", null, "World")
const rootElement = document.getElementById("root")
const element = React.createElement("div", {
    className: "container",
    children: [helloElement, " ", worldElement],
})
ReactDOM.render(element, rootElement)
```

## 💻 Exercise Four: Function Components

Write a function `message` that you can reuse to produce the code below. This function must be fed to `React.createElement()` Will this work if the first letter is not a capital letter? What is the difference between using writing the function to be `const message = () => {}` and `const Message = () => {}` ?

```html
<div className="container">
    <div className="myMessage">Hello World</div>
    <div className="myMessage">Goodbye World</div>
</div>
```

Solution:

You can do something like this and it will work, but it's not following
the convention the Babel compiler recognizes.

```jsx
// **********
//  (NOT FOLLOWING BABEL'S CONVENTION)
// **********
function message({ children }) {
    return <div className="myMessage">{children}</div>
}

const element = (
    <div className="container">
        {React.createElement(message, { children: "Hello World" })}
        {React.createElement(message, { children: "Goodbye World" })}
    </div>
)
```

In this case, it is being used as a component. It works but not best practice. You should use capitalized `Message` instead of `message`. That way, you'd be following the convention which the babel compiler understands.

## 💻 Exercise Five: How babel compiles jsx

Understand how `babel` compiles `jsx` based on the appearance of the component name.
In order words, how would `babel` compile the following components?

```jsx
<Capitalized />
<lowercase />
<kebab-case />
<Upper-Kebab-Case />
<Upper_Snake_Case />
<lower_snake_case />
<property.access />
<Property.Access />
<Property['Access']/>

```

Solution:

```jsx
React.createElement(Capitalized)
React.createElement("lowercase")
React.createElement("kebab-case")
React.createElement("Upper-Kebab-Case")
React.createElement(Upper_Snake_Case)
React.createElement("lower_snake_case")
React.createElement(property.access)
React.createElement(Property.Access)
// SyntaxError
```
