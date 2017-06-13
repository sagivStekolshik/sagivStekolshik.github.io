<template>
    <div layout="row center-center">
        <div>
            <i class="material-icons" @click="jumpToPage(1)">first_page</i>
        </div>
        <div>
            <i class="material-icons" clickable @click="emitBackPage">chevron_left</i>
        </div>

        <div id="pagerWrapper">
            <span v-for="i in UIpagingCounter"
                    @click="jumpToPage(i)"
                    :class="{active: i === page}"
                    :style="{fontSize: 1-(Math.abs(page-i)/10) + 'em'}">{{i}}</span>
        </div>

        <div>
            <i class="material-icons" clickable @click="emitNextPage">chevron_right</i>
        </div>
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
                if (page > 0 && page < Math.ceil(this.maximumObjects / 9) && typeof page === "number")
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
                for (let i = this.page + 1; i <= (this.page + 2) && i < Math.ceil(this.maximumObjects / 9); i++) {
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
    #pagerWrapper{
        margin: 0 1em;
        font-size: 20px;
    }

    #pagerWrapper span {
        margin: 0 0.7em;
        transition: all 500ms ease-in;

    }

    .active {
        color: blue;
        position: relative;
    }

    [clickable]{
        cursor: pointer
    }

    .active::after{
        content: "";
        width: 2em;
        height: 2em;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

        background-image: url(https://photoshop-kopona.com/uploads/posts/2017-06/thumbs/1496823008_decorative-frame-3.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
</style>
