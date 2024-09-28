<template>
    <div :style="{ marginLeft: level !== 0 ? level + 200 + 'px' : 0 + 'px'}">
        <div class="box" :style="{ backgroundColor: getBackgroundColour(level)}">
            <!-- Drop down button to render children -->
            <span @click="toggle" :style="{ display: 'inline-block', float: 'left', cursor: 'pointer' }">{{ this.isExpanded && person.children && person.children.length > 0 ? '▼' : '▶' }}</span>
            <!-- Renders additional information when clicked -->
            <div @click="toggleData()" :style="{ display: 'inline', fontSize: '20px', cursor: 'pointer' }">
                <span class="container" :style="{ fontWeight: 'Bold' }">
                    {{  person.data['Name'] }}
                </span>
                <br/>
                <!-- Additional information to be rendered if div was clicked -->
                <div v-if="this.isDataExpanded" :style="{ fontSize: '15px'}">
                    <span class="inner" :style="{ fontSize: '10px', fontFamily: 'Arial'}">
                        {{ person.data['Department'] }}
                    </span>
                    <div :style="{ height: '5px' }"></div>
                    <div>
                        <p class="paragraph" :style="{ fontWeight: 500}">
                            Level:
                        </p>
                        <p class="paragraph">
                            {{ person.data['level'] }}
                        </p>
                    </div>
                    <div class="properties">
                        <p class="paragraph" :style="{ fontWeight: 500}">
                            Salary:
                        </p>
                        <p class="paragraph">
                            {{  person.data['Salary'] }}
                        </p>
                    </div>
                    <div class="properties">
                        <p class="paragraph" :style="{ fontWeight: 500}">
                            Management Cost:
                        </p>
                        <p class="paragraph">
                            {{  person['Management Cost'] || "0" }}
                        </p>
                    </div>
                    <div class="properties">
                        <p class="paragraph" :style="{ fontWeight: 500}">
                            IC Cost:
                        </p>
                        <p class="paragraph">
                            {{  person['IC Cost'] || "" }}
                        </p>
                    </div>
                    <div class="properties">
                        <p class="paragraph" :style="{ fontWeight: 500}">
                            Total Cost:
                        </p>
                        <p class="paragraph">
                            {{  person['Total Cost'] || "" }}
                        </p>
                    </div>
                    <div class="properties">
                        <p class="paragraph" :style="{ fontWeight: 500}">
                            Management Cost Ratio:
                        </p>
                        <p class="paragraph">
                            {{  person['Management Cost Ratio'] || "" }}
                        </p>
                    </div> 
                </div>
                <!-- Displays the direct and non direct descendent count -->
                <span class="inner" :style="{ fontSize: '10px', fontFamily: 'Arial' }">
                    {{ (person.children && person.children.length > 0) ? person.children.length : 0 }} / {{ person['Descendent Count'] ? person['Descendent Count'] : 0}}
                </span>
            </div>
        </div>
        <!-- Renders the children if the dropdown button is clicked -->
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
                type: Object,
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
                // toggles the state to display children nodes
                this.isExpanded = !this.isExpanded; 

            },
            toggleData() {
                // toggles the state of if the node is expanded to display additional information
                this.isDataExpanded = !this.isDataExpanded;
            },
            getBackgroundColour(level) {
                // changes background colours of the nodes depending on the level of the employee
                const colours = ['#aac1b5', '#c1decf', '#f5f2ec', '#f0e8d9', '#d0c7b6'];
                return colours[level % colours.length]
            },
        }
    }
</script>

<style>
    .box {
        border-radius: 10px;
        height: fit-content;
        width: 253px;
        padding: 15px;
    }
    .inner {
        border-radius: 25px;
        background-color: white;
        width: fit-content;
        padding: 5px;
    }
    .properties {
        padding-bottom: 5px;
        padding-top: 5px;
    }
    .paragraph {
        display: inline;
    }
    .container:hover {
        text-decoration: underline;
        color: #878787;
        opacity: 50;
    }
</style>
