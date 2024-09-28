# AgentNoon Coding Test - Alisa Chang

The project displays a company's employee heierarchy given a csv of the company's employees.

## Project setup
```
cd hierarchy-project
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Technical Details
The project is coded in JavaScript, Vue and Tailwind. All data parsing and calculations are done in the `main.js` file. Rendering of the site takes place in `App.vue` which calls `CircularContainer.vue` to render individual nodes. The project initially displays the top of the hierarchy displaying the employee's name and the number of descendents (number of direct descendents / total descendent count) which can be expanded by clicking on the node to display more detailed information about the employee. The information includes the employee's department, level, salary, management cost, IC cost, total cost, and management cost ratio. The information is displayed in a vertical list view where descendents are indented to show hierarchy. Each node is also displayed in a different colour for readability.

### Main.js
`root`: Object data structure that stores the root of the tree
General structure of the tree:
Node
    Descendent Count
    Management Cost
    IC Cost
    Total Cost
    Management Cost Ratio
    children (array of Nodes)
    data
        Employee Id
        Name
        .
        .
        .


`procesData()`: the function that takes in a downloaded csv (`data.csv`) and converts the information into a tree using `d3`. Given the tree the function calls `getDescendentCount` and `calculateCosts`to store the calculation information in the tree. Then the app is created once all the dated is calculated

`reorgTree(root)`: takes the tree and reogranizes it to remove nested data properties

`getDescendentCount(node)`: the function calculates the number of descendents of a specific node that is passed in by using recursion to sum up the number of children per node. The function uses memoization by storing each node's number of total descendents in the tree and will return the total number of descendents of a node if the value is populated, otherwise the function will perform the calculations.

`calculateCosts(root)`: calculates the management cost, ic cost, total cost, and management cost ratio of a given node and its descendents and stores the information per employee in the tree.

### App.vue
`App.vue` renders the first parent node of the tree and receives the tree from `main.js` as a prop to render all other nodes when necessary

### CircularContainer.vue
`CircularContainer.vue` renders the individaul nodes of the tree. It receives the tree and the individual node as a prop. If a user clicks on a node the node will expand to display more information (the calculations that were made in `main.js`). If a user clicks on the arrow the direct descendents of that node will be rendered to display collapsed employee nodes that are direct descendents.

## Descision Making / Thought Process
- All calculations and data processing should be handled separately from the Vue components to make the code easier to understand and read
- The decision to do a vertical hierarchy UI was to:
    - create more clarity and readability for a consumer of the site to understand their data better
    - allows for multiple nodes and levels to be opened at once
    - much more scalable for larger data sets to see data more clearly
    - indentations clearly show the different levels in hierarchy and lineage without needing to trace lines
    - can easily add more information to nodes to display more info without cluttering the UI

## Future Improvements
- allow user to upload a csv file
- search bar to find a specific person
- filter to find employees with certain properties and would display a list of those users
- backend and database to properly store the data with proper protocols to send and receive data

