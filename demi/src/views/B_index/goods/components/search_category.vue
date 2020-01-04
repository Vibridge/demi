<template>
    <div v-for="level3 in level2.children" :key="level3.sort_id">
        <p v-if="level2.children && !level3.children && (handleCategory(level1.title + level2.title + level3.title,level3.sort_id) == level3.sort_id)" >
            {{level1.title}} > {{level2.title}} > {{level3.title}}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'search_category',
        props:['row']
    }
</script>

<style scoped>

</style>