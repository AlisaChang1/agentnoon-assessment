import { createApp } from 'vue'
import App from './App.vue'
import * as d3 from 'd3'

let data
let root = {}

/**
 * Function takes in a csv and constructs a d3 tree. Using the tree the function calls other
 * functions to create calculations that are stored in the tree
 */
async function processData() {
    data = await d3.csv('/data.csv');
    let tree = await d3.stratify()
    .id((d) => d['Employee Id'])
    .parentId((d) => d['Manager'])(data);
    reorgTree(tree)
    root = d3.hierarchy(tree);
    console.log(root)

    
    getDescendentCount(root)
    calculateCosts(root)
    
    let app = createApp(App)
    app.config.globalProperties.$people = root;
    app.mount('#app');


}

/**
 * Restructures the tree to remove nested data properties
 * 
 * @param {Object} root the tree to be restructured
 */
function reorgTree(root) {
    root.each(node => {
        Object.keys(node.data).forEach(key => {
            node[key] = node.data[key];
        });
    });
}

/**
 * The function gets the number of descendents for a given node
 * 
 * @param {Object} node the node in the hierarchy that you want the number of descendents of
 * @returns {int} the total number of descendents for the given node
 */
function getDescendentCount(node) {
    if (node['Descendent Count']) return node['Descendent Count'] // Memoization
    let count = 0
    if (!node.children) return 0
    count = node.children.reduce((acc, child) => {
        // Uses recursion to get the number of descendents
        return acc + getDescendentCount(child) + 1;
    }, 0);

    node['Descendent Count'] = count

    return count
}

/**
 * The function performs all cost calculations which is then stored in the tree per node
 * 
 * @param {Node} node The node in which calculations are made for
 */
function calculateCosts(root) {
    root.sum(d => (d.children && d.children.length > 0) ? d.data['Salary'].substring(1).replace(/,/g, '') : 0) // Calculates the sum of the salaries of all nodes that have children
    root.each(node => {
        node['Management Cost'] = node.value
    })

    root.sum(d => (!d.children) ? d.data['Salary'].substring(1).replace(/,/g, '') : 0) // Calculates the sum of all salaries of nodes without children
    root.each(node => {
        node['IC Cost'] = node.value
        node['Total Cost'] = node['IC Cost'] + node['Management Cost'] // Sum of both management cost and ic cost
        node['Management Cost Ratio'] = node['IC Cost'] / node['Management Cost']
    })
}

processData()


