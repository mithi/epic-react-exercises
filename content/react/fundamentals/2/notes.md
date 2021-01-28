## Ex0: Built in functions

```js
let node = document.getElementById("root")
let otherNode = document.createElement("div")
otherNode.textContent = "Hello World"
otherNode.className = "container"
document.body.append(node)
node.append(otherNode)
```

## Ex1: Pure JS

Create and append dom elements in vanilla javascript. Write a javascript code between `<script>` tags to produce this.

```html
<div id="root">
    <div class="container">Hello World</div>
</div>
```

Here is an example html file

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

```js
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

## Ex2: Babel for inline JSX

You can actually use react (and optionality the babel compiler to add jsx) directly on your html file like this:

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

Example 2a

```js
const element = <div className="container">Hello World</div>
ReactDOM.render(element, document.getElementById("root"))
```

Example 2b

```js
const rootElement = document.getElementById("root")
const element = React.createElement("div", {
    className: "container",
    children: "Hello World",
})
ReactDOM.render(element, rootElement)
```

## Ex3: Multiple children

To make this

```html
<div id="root">
    <div class="container">
        <span>Hello</span>
        <span>World</span>
    </div>
</div>
```

You can do

```js
const helloElement = React.createElement("span", null, "Hello")
const worldElement = React.createElement("span", null, "World")
const rootElement = document.getElementById("root")
const element = React.createElement("div", {
    className: "container",
    children: [helloElement, " ", worldElement],
})
ReactDOM.render(element, rootElement)
```

## Ex4 createElement's first argument

How can we render this?

```html
<div className="container">
    <div className="myMessage">Hello World</div>
    <div className="myMessage">Goodbye World</div>
</div>
```

You can do something like this and it will work, but it's not following
the convention the the Babel compiler recognizes.

```js
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

In this case, it is being used as a component. It works but not best practice. You should use capitalized `Message` instead of `message`. That way, you'd be following the convention which the babel compiler understands

How babel parses JSX based on appearance...
Notice that `lowercase`, `kebab` and `snake_case` are compiled into strings. while `Capitalized` and `property.access` is seen as a function

```js
ui = <Capitalized /> // React.createElement(Capitalized)
ui = <property.access /> // React.createElement(property.access)
ui = <Property.Access />// React.createElement(Property.Access)
ui = <Property['Access'] />// SyntaxError
ui = <lowercase />// React.createElement('lowercase')
ui = <kebab-case />// React.createElement('kebab-case')
ui = <Upper-Kebab-Case />// React.createElement('Upper-Kebab-Case')
ui = <Upper_Snake_Case />// React.createElement(Upper_Snake_Case)
ui = <lower_snake_case />// React.createElement('lower_snake_case')
```

# END
