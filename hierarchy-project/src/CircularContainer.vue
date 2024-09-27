<template>
    <div :style="{ marginLeft: level + 60 + 'px' }">
        <div class="box" :style="{ backgroundColor: getBackgroundColour(level)}">
            <span @click="toggle" :style="{ display: 'inline-block', float: 'left', cursor: 'pointer' }">{{ this.isExpanded && person.children && person.children.length > 0 ? '▼' : '▶' }}</span>
            <div @click="toggleData()" :style="{ display: 'inline', fontSize: '20px', cursor: 'pointer' }">
                <span :style="{ fontWeight: 'Bold' }">
                    {{  person.data['Name'] }}
                </span>
                <br/>
                <div v-if="this.isDataExpanded" :style="{ fontSize: '15px'}">
                    <span class="inner" :style="{ fontSize: '10px', fontFamily: 'Arial'}">
                        {{ person.data['Department'] }}
                    </span>
                    <div :style="{ height: '5px' }"></div>
                    <div>
                        Level: {{ person.data['level'] }}
                    </div>
                    <div class="properties">
                        Salary:  {{  person.data['Salary'] }}
                    </div>
                    <div class="properties">
                        Management Cost: {{  person['Management Cost'] || "" }}
                    </div>
                    <div class="properties">
                        IC Cost: {{  person['IC Cost'] || "" }}
                    </div>
                    <div class="properties">
                        Total Cost: {{  person['Total Cost'] || "" }}
                    </div>
                    <div class="properties">
                        Cost Ratio: {{  person['Management Cost Ratio'] || "" }}
                    </div> 
                </div>
                <span class="inner" :style="{ fontSize: '10px', fontFamily: 'Arial' }">
                    {{ (person.children && person.children.length > 0) ? person.children.length : 0 }} / {{ person['Descendent Count'] ? person['Descendent Count'] : 0}}
                </span>
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
        border-radius: 10px;
        height: fit-content;
        width: fit-content;
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
</style>
