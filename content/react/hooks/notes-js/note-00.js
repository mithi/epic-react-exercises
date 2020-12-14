function createMarkup() { return {__html: `<h2 id="notes">Notes</h2>

<ol>
<li><p><a rel="nofollow noopener" target="_blank" href="https://www.youtube.com/watch?v=zWsZcBiwgVE&amp;list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf">Why React hooks?</a></p>

<ul>
<li>35 minute talk by Kent C Dodds</li>
</ul></li>
<li><p>What are React hooks?</p>

<ul>
<li>Special functions that can store data (like state) or perform functions (side effects) among other things</li>
<li>Can only be called inside react function component or other hooks.</li>
<li>Name must start with <code>use</code></li>
<li>Common hooks: <code>useState</code>, <code>useEffect</code>, <code>useLayoutEffect</code>, <code>useRef</code>, <code>useContext</code>, <code>useReducer</code>, <code>useCallback</code>, <code>useMemo</code></li>
</ul></li>
<li><p><a rel="nofollow noopener" target="_blank" href="https://github.com/donavon/hook-flow">Hooks flow diagram</a></p>

<ul>
<li>A diagram that shows when different hooks are called and the order in which they’re called (from Donavon)</li>
</ul></li>
<li><p><a rel="nofollow noopener" target="_blank" href="https://reactjs.org/docs/lifting-state-up.html">Lift the state up</a></p>

<ul>
<li>Technique to share code between two sibling components (from React Docs)</li>
</ul></li>
<li><p><a rel="nofollow noopener" target="_blank" href="https://kentcdodds.com/blog/dont-sync-state-derive-it">Don't sync states, derive it!</a></p>

<ul>
<li>It's usually better to calculate states (deriving) based on other states when you can as opposed to storing them (from Kent C Dodds Blog)</li>
</ul></li>
<li><p>DOM interactions</p>

<ul>
<li>Use <code>useRef</code>, <code>useEffect</code></li>
<li><code>&lt;div&gt;&lt;/div&gt;</code> is just a syntactic sugar for <code>React.createElement()</code>, dom nodes are not created at all until <code>ReactDom.render()</code> is called.</li>
<li>The <code>render</code> method has no access to the dom node by itself, it only creates and returns react elements</li>
<li>To access the dom, use a special prop called <code>ref</code></li>
<li>A component that has rendered is is said to be <code>mounted</code>. That's when <code>useEffect</code> callback is called, by that point<code>ref.current</code> set to the dom node which you can directly do interactions, manipulations</li>
<li>IMPORTANT: Clean up event handlers you have setup when your component is unmounted. We don't want
event handlers dangling around on DOM nodes that are no longer in the document. (memory leak)</li>
</ul></li>
<li><p>HTTP Requests</p>

<ul>
<li>IMPORTANT: React batches state updates (<code>setState</code>)</li>
<li><a rel="nofollow noopener" target="_blank" href="https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks">Does React batch state update functions when using hooks?</a> (StackOverflow #53048495)</li>
<li>If the state changes are triggered asynchronously (like wrapped in a promise), they will not be batched; if they are triggered directly, they will be batched.</li>
<li>You cannot return anything other than the cleanup function in <code>useEffect</code>, this means you can NOT use <code>async/await</code> for that cleanup function since that returns a promise</li>
</ul></li>
</ol>

<h2 id="exercises">Exercises</h2>

<ol>
<li><p><a rel="nofollow noopener" target="_blank" href="https://react-hooks.netlify.app/4">TicTacToe</a></p>

<ul>
<li>Note: Derive most states instead of storing them</li>
<li>Use local storage and custom hooks; do NOT use class components</li>
<li>Be able to pause a game, close the tab, and then resume the game later</li>
<li>Be able to keep a history of the game; allow players to go backward and forward in time</li>
</ul></li>
<li><p><a rel="nofollow noopener" target="_blank" href="https://react-hooks.netlify.app/5">Vanilla tilt</a></p>

<ul>
<li>Use <code>useRef</code> with <a rel="nofollow noopener" target="_blank" href="https://micku7zu.github.io/vanilla-tilt.js/">micku7zu/vanilla-tilt.js</a></li>
</ul></li>
<li><p><a rel="nofollow noopener" target="_blank" href="https://react-hooks.netlify.app/6">Fetch Pokemons </a></p>

<ul>
<li><a rel="nofollow noopener" target="_blank" href="https://kentcdodds.com/blog/stop-using-isloading-booleans">Stop Using <code>isLoading</code> booleans (Kent C Dodds Blog)</a></li>
<li>A form where users can enter the pokemon name and your app fetches that pokemon's data; show errors if any</li>
<li>Use status states (strings), do NOT derive from existing state or booleans. Show the following: <code>idle</code> no request made yet, <code>pending</code> request started, <code>resolved</code> request successful, <code>rejected</code> request</li>
<li>Use ONE state object ie <code>setState({status: 'resolved', pokemon})</code>, instead of several states (can you store this and use localStorage in a custom hook?), you can also try using <code>useReducer</code> instead of <code>useState</code></li>
<li>Create an <code>ErrorBoundary</code> class component to handle errors the correct way.</li>
<li>Try using built-in <code>react-error-boundary</code> the right way; use <code>resetKeys</code> for better user experience</li>
</ul></li>
</ol>

<h2 id="sample-code">Sample Code</h2>

<div class="codehilite"><pre><span></span><code><span class="kr">const</span> <span class="nx">myDivRef</span> <span class="o">=</span> <span class="nx">React</span><span class="p">.</span><span class="nx">useRef</span><span class="p">()</span>

<span class="nx">React</span><span class="p">.</span><span class="nx">useEffect</span><span class="p">(()</span> <span class="p">=&gt;</span> <span class="p">{</span>
    <span class="kr">const</span> <span class="nx">myDiv</span> <span class="o">=</span> <span class="nx">myDivRef</span><span class="p">.</span><span class="nx">current</span>
    <span class="c1">// myDiv is the div DOM node!</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">myDiv</span><span class="p">)</span>
<span class="p">},</span> <span class="p">[])</span>

<span class="k">return</span> <span class="o">&lt;</span><span class="nx">div</span> <span class="nx">ref</span><span class="o">=</span><span class="p">{</span><span class="nx">myDivRef</span><span class="p">}</span><span class="o">&gt;</span><span class="nx">hi</span><span class="o">&lt;</span><span class="err">/div&gt;</span>
<span class="p">}</span>
</code></pre></div>

<div class="codehilite"><pre><span></span><code><span class="c1">// case 1: this does not work, don&#39;t do this:</span>
<span class="nx">useEffect</span><span class="p">(</span><span class="k">async</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
    <span class="kr">const</span> <span class="nx">result</span> <span class="o">=</span> <span class="k">await</span> <span class="nx">doSomeAsyncThing</span><span class="p">()</span>
    <span class="c1">// do something with the result</span>
<span class="p">})</span>

<span class="c1">// case 2: You can do this instead</span>
<span class="nx">useEffect</span><span class="p">(()</span> <span class="p">=&gt;</span> <span class="p">{</span>
    <span class="k">async</span> <span class="kd">function</span> <span class="nx">effect</span><span class="p">()</span> <span class="p">{</span>
        <span class="kr">const</span> <span class="nx">result</span> <span class="o">=</span> <span class="k">await</span> <span class="nx">doSomeAsyncThing</span><span class="p">()</span>
        <span class="c1">// do something with the result</span>
    <span class="p">}</span>
    <span class="nx">effect</span><span class="p">()</span>
<span class="p">})</span>

<span class="c1">// case 3: Or even better</span>
<span class="nx">useEffect</span><span class="p">(()</span> <span class="p">=&gt;</span> <span class="p">{</span>
    <span class="nx">doSomeAsyncThing</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="nx">result</span> <span class="p">=&gt;</span> <span class="p">{</span>
        <span class="c1">// do something with the result</span>
    <span class="p">})</span>
<span class="p">})</span>
</code></pre></div>
` } } export default <div dangerouslySetInnerHTML={createMarkup()} />