<template>
    <div layout="row center-spread">
        <button @click="emitBackPage">back</button>
        <span v-for="i in UIpagingCounter"
                @click="jumpToPage(i)"
                :class="{active: i === page}">{{i}}</span>
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
            },
            jumpToPage(page) {
                //jump to selected page
                if (page > 0 && page < Math.ceil(this.maximumObjects / 9))
                    this.$emit("pageChange", page)
            }

        },
        computed: {
            UIpagingCounter() {
                let arr = [];
                arr.push(this.page);

                for (let i = this.page - 1; i >= (this.page - 2) && i > 0; i--) {
                    arr.unshift(i);
                }
                for(let i = this.page + 1; i <= (this.page + 2) && i < Math.ceil(this.maximumObjects / 9) ; i++ ){
                    arr.push(i)
                }
                return arr;
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
    span {
        cursor: pointer;
        margin: 0 10px;
        transition: all 500ms ease-in;
    }

    .active{
        color: blue;
    }

</style>
