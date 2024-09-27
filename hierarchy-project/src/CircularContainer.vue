<template>
    <div :style="{ marginLeft: level * 40 + 'px' }">
        <div class="box" :style="{ backgroundColor: getBackgroundColour(level)}">
            <span @click="toggle" :style="{ display: 'inline-block', float: 'left' }">{{ this.isExpanded && person.children && person.children.length > 0 ? '▼' : '▶' }}</span>
            <div @click="toggleData()" :style="{ display: 'inline', fontSize: '20px' }">
                {{  person.data['Name'] }}
                <br/>
                <div v-if="this.isDataExpanded" :style="{ fontSize: '15px'}">
                    Salary:  {{  person.data['Salary'] }}
                    <br/>
                    Management Cost: {{  person['Management Cost'] }}
                    <br/>
                    IC Cost: {{  person['IC Cost'] }}
                    <br/>
                    Total Cost: {{  person['Total Cost'] }}
                    <br/>
                    Management Cost Ratio: {{  person['Management Cost Ratio'] }}
                    <br/>
                </div>
            </div>
        </div>
        <div v-if="this.isExpanded && person.children && person.children.length > 0">
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
                isExpanded: false, 
                isDataExpanded: false,
            };
        },
        methods: {
            hasChildren() {
                return this.person.children && this.person.children.length > 0
            },
            toggle() {
                this.isExpanded = !this.isExpanded; 

            },
            toggleData() {
                this.isDataExpanded = !this.isDataExpanded;
            },
            getBackgroundColour(level) {
                const colours = ['#aac1b5', '#c1decf', '#f5f2ec', '#f0e8d9', '#d0c7b6'];
                return colours[level % colours.length]
            },
        }
    }
</script>

<style>
    .box {
        border-radius: 25px;
        height: fit-content;
        width: fit-content;
        padding: 15px;
    }
</style>
