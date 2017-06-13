<template>
    <div layout="row center-center" id="pagerWrapper" >
        <div>
            <i class="material-icons" clickable @click="jumpToPage(1)">first_page</i>
        </div>
        <div>
            <i class="material-icons" clickable @click="emitBackPage">chevron_left</i>
        </div>

        <div >
            <span v-for="i in UIpagingCounter"
                   clickable
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
            return {
                showPaging: false
            }
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
                //manualy insert indentation for better looks
                if (this.page === 1)
                    arr.unshift("", "");
                //manually insert indentation for better looks
                if (this.page === 2)
                    arr.unshift("");
                if (Math.ceil(this.maximumObjects / 9) === 1)
                    arr.push("", "");
                if (Math.ceil(this.maximumObjects / 9) === 2)
                    arr.push("");
                return arr;
            }
        },
        watch: {
            page() {
                //when page change get alert we dont have enough pages
                if (Math.ceil(this.maximumObjects / 9) - this.page <= 5) {
                    // send the minmum amount of pages to get so page will have at least 5 pages ahead
                    this.$emit("getMorePages");
                }
            }
        }
    }

</script>

<style>
    #pagerWrapper {
        margin: 0 1em;
        font-size: 20px;
    }

    #pagerWrapper i {
        user-select: none;
    }

    #pagerWrapper span {
        margin: 0 0.7em;
    }

    #pagerWrapper span.active {
        color: #390079;
        position: relative;
        cursor: default;
    }

    [clickable] {
        cursor: pointer;
    }

    .active::after {
        content: "";
        width: 2em;
        height: 2em;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-image: url(https://photoshop-kopona.com/uploads/posts/2017-06/thumbs/1496823008_decorative-frame-3.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

</style>
