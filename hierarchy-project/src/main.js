import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import * as d3 from 'd3'

let data
let tree = {}
let descendents = {}

async function processData() {
    data = await d3.csv('/data1.csv');
    tree = await d3.stratify()
        .id((d) => d['Employee Id'])
        .parentId((d) => d['Manager'])(data);
    console.log(calculateCosts(tree))
}

/**
 * The function gets the number of descendents for a given node
 * 
 * @param {Node} node the node in the hierarchy that you want the number of descendents of
 * @returns {int} the total number of descendents for the given node
 */
function getDescendentCount(node) {
    if (descendents[node.id]) return descendents[node.id]
    if (!node.children) return 0
    const total = node.children.length + 
                    node.children.reduce((acc, child) => {
                        return acc + getDescendentCount(child)
                    }, 0)

    descendents[node.id] = total

    return total
}

/**
 * The function creates a costs object that tracks all cost calculations.
 * The function calls an internal function that calculates the values of the individual fields in the costs object
 * 
 * @param {Node} node The node in which calculations are made for
 * @returns {} The values of all cost calculations (management costs, IC cost, the total cost, and the management cost ratio)
 */
function calculateCosts(node) {
    let costs = {
        managementCost: 0,
        icCost: 0,
        total: 0,
        managementCostRatio: 0
    }

    /**
     * Calculates the management costs, IC costs and total cost of a given node
     * 
     * @param {Node} node The node provided for the calculations
     */
    function calculateAllCosts(node) {
        let cost = parseFloat(node.data['Salary'].substring(1).replace(/,/g, ''))
        if (node.children) {
            costs.managementCost += cost
            node.children.forEach(x => calculateAllCosts(x))
        } else {
            costs.icCost += cost
        }
        costs.total += cost
    }

    calculateAllCosts(node)
    costs.managementCostRatio = costs.icCost / costs.managementCost

    return costs
}

processData().then(() => {
    let app = createApp(App)
    app.config.globalProperties.$people = data;
    app.mount('#app');
  });


