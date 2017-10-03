<template>
    <div class="home-container">
        <listing-summary-group
            v-for="(group, country) in listing_groups"
            :key="country"
            :listings="group"
            :country="country"
            class="listing-summary-group"
        ></listing-summary-group>
    </div>
</template>
<script>
    import routeMixin from '../js/route-mixin';
    import ListingSummaryGroup from './ListingSummaryGroup.vue';

    export default {
        mixins: [ routeMixin ],
        data() {
            return {
                listing_groups: []
            };
        },
        components: {
            ListingSummaryGroup
        }
    }
</script>
