import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import * as d3 from 'd3'

let data
let root = {}

async function processData() {
    data = await d3.csv('/data.csv');
    let tree = await d3.stratify()
    .id((d) => d['Employee Id'])
    .parentId((d) => d['Manager'])(data);
    reorgTree(tree)
    root = d3.hierarchy(tree);

    
    getDescendentCount(root)
    calculateCosts(root)
    
    let app = createApp(App)
    app.config.globalProperties.$people = root;
    app.mount('#app');


}

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
 * @param {Node} node the node in the hierarchy that you want the number of descendents of
 * @returns {int} the total number of descendents for the given node
 */
function getDescendentCount(node) {
    if (node['Descendent Count']) return node['Descendent Count']
    let count = 0
    if (!node.children) return 0
    count = node.children.reduce((acc, child) => {
        return acc + getDescendentCount(child) + 1;
    }, 0);

    node['Descendent Count'] = count

    return count
}

/**
 * The function creates a costs object that tracks all cost calculations.
 * The function calls an internal function that calculates the values of the individual fields in the costs object
 * 
 * @param {Node} node The node in which calculations are made for
 * @returns {} The values of all cost calculations (management costs, IC cost, the total cost, and the management cost ratio)
 */
function calculateCosts(root) {
    root.sum(d => (d.children && d.children.length > 0) ? d.data['Salary'].substring(1).replace(/,/g, '') : 0)
    root.each(node => {
        node['Management Cost'] = node.value
    })

    root.sum(d => (!d.children) ? d.data['Salary'].substring(1).replace(/,/g, '') : 0)
    root.each(node => {
        node['IC Cost'] = node.value
        node['Total Cost'] = node['IC Cost'] + node['Management Cost']
        node['Management Cost Ratio'] = node['IC Cost'] / node['Management Cost']
    })
}

processData()


