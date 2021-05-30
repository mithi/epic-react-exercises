## Windowing

> Use React libraries to efficiently render large lists and tabular data. The idea is that only render the items that the user will see at a time.

Libraries that help with this:

-   [tannerlinsley/react-virtual](https://github.com/tannerlinsley/react-virtual)
-   [bvaughn/react-virtualized](https://github.com/bvaughn/react-virtualized)
-   [bvaughn/react-window](https://github.com/bvaughn/react-window)

These components are using **dynamic** sizes. This means that each element's exact dimensions are unknown when rendered. An estimated dimension is used to get an a initial measurement, then this measurement is readjusted on the fly as each element is rendered.
