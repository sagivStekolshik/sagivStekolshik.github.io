<template>
   <div id="redditInputWrapper">
       <i class="material-icons">search</i>
       <input id="redditInput" type="text" :value="subreddit" @input="emitSubredditChange" placeholder="Type Subreddit">
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
        border-bottom: 3px solid #390079;
        outline: none;
        margin: 0;
        border-bottom-left-radius: 10%;
        border-bottom-right-radius: 10%;
        color: #390079;
    }

    #redditInput::placeholder {
        color: #390079;
        opacity: 0.5;
        user-select: none;
    }

    #redditInputWrapper{
        position: relative;
        margin-left: 50px;
        color: #390079;
    }

    #redditInputWrapper i{
        color: #390079;
        font-size: 30px;
        position: absolute;
        left: 0;
        bottom: 0;
        pointer-events: none;
        padding: 7px;
    }



</style>
