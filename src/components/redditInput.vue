<template>
    <input id="redditInput" type="text" :value="subreddit" @input="emitSubredditChange">
    <label for="redditInput">subreddit</label>
</template>

<script>
    export default {
        props: ["subreddit"],
        data() {
            return {
                redditText: ''
            }
        },
        methods: {
            emitSubredditChange(event) {
                this.redditText = event.target.value;
                this.$emit("subredditChange", this.redditText);
            }
        }
    }

</script>

<style>
    #redditInput {
        display: block;
        margin: 30px;
        background-color: transparent;
        padding: 10px 10px 0 10px;
        font-size: 30px;
        border: none;
        border-bottom: 3px solid orangered;
        outline: none;
        color: #aaa
    }

</style>
