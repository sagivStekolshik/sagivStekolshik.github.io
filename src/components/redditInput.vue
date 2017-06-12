<template>
   <div id="redditInputWrapper">
       <i class="material-icons">search</i>
       <input id="redditInput" type="text" :value="subreddit" @input="emitSubredditChange" placeholder="Subreddit">
   </div>
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
        background-color: transparent;
        padding: 10px 10px 0 40px;
        font-size: 30px;
        border: none;
        border-bottom: 3px solid orangered;
        outline: none;
        color: #aaa;
        margin: 0;
        border-bottom-left-radius: 10%;
        border-bottom-right-radius: 10%;

    }

    #redditInputWrapper{
        position: relative;
        margin-left: 50px;
    }

    i{
        color: #aaa;
        font-size: 30px;
        position: absolute;
        left: 0;
        bottom: 0;
        pointer-events: none;
        padding: 7px;
    }



</style>
