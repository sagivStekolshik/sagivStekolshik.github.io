<template>
    <div layout="row center-spread">
        <button @click="emitBackPage">back</button>
        <p>Page: {{ page }}</p>
        <p>maximum pages: {{ Math.ceil(this.maximumObjects/9) }}</p>
        <button @click="emitNextPage">next</button>
    </div>
</template>

<script>
    export default {
        props: ["page", "maximumObjects"],
        data() {
            return {}
        },
        methods: {
            //emit an event to go one page up
            emitNextPage() {
                // cant go beyond given pages
                if (this.page < Math.ceil(this.maximumObjects / 9))
                    this.$emit("pageChange", this.page + 1);
            },
            // emit an event to go back 1 page
            emitBackPage() {
                //cant go back beyound page 1
                if (this.page > 1)
                    this.$emit("pageChange", this.page - 1);

            }
        },
        watch: {
            page() {
                //when page change get alert we dont have enough pages
                if (Math.ceil(this.maximumObjects / 9) - this.page <= 5) {
                    console.log("need more pages", Math.ceil(this.maximumObjects / 9) - this.page);
                    // send the minmum amount of pages to get so page will have at least 5 pages ahead
                    this.$emit("getMorePages", Math.ceil(this.maximumObjects / 9) - (this.page));
                }
            }
        }
    }

</script>

<style>


</style>
