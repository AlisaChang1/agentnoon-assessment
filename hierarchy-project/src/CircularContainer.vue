<template>
    <div @click="toggle(person)" :style="{ marginLeft: level * 20 + 'px' }">
        <div class="box">
            {{  person.data['Name'] }}
            <br/>
            {{  person.data['Salary'] }}
            <br/>
            {{  person['Management Cost'] }}
            <br/>
            {{  person['IC Cost'] }}
            <br/>
            {{  person['Total Cost'] }}
            <br/>
            {{  person['Management Cost Ratio'] }}
            <br/>
        </div>
        <div v-if="person.children && person.children.length > 0">
            <CircularContainer
                v-for="child in person.children"
                :key="child.id"
                :person="child"
                :level="level + 1"
            />
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'CircularContainer',
        props: {
            person: {
                type: Node,
                required: true
            },
            level: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                isExpanded: false  // Manage expanded/collapsed state
            };
        },
        methods: {
            hasChildren() {
                return this.node.children && this.node.children.length > 0
            },
            // toggle(person) {
            //     person.data.isExpanded = !person.data.isExpanded;  // Toggle the state on click
            // }
        }
    }
</script>

<style>
    .box {
        background-color: aliceblue;
        border-radius: 25px;
        height: auto;
        width: auto;
        padding: 15px;
    }
</style>
