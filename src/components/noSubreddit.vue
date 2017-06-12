<template>
    <div id="noSubredditWrapper" layout="column center-center">
        <h1>No such subreddit</h1>
        <img src="https://media.giphy.com/media/kcAz4pqDIN0Qg/giphy.gif" alt="Empty canister gif">
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }

</script>

<style>

    #noSubredditWrapper{
        padding: 10px;
    }

    h1{
        color: #ccc;
        background-color: rgba(0,0,0,0.5);
    }

    #noSubredditWrapper img {
        box-shadow: 0 20px 15px -10px rgba(0,0,0,0.5);
    }


</style>
