<template>
    <div id="noSubredditWrapper" layout="column center-center">
        <h1>No results for your search</h1>
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

    #noSubredditWrapper h1{
        color: #ccc;
        background-color: rgba(18, 61, 135,0.7);
        padding: 20px 20px;
        border-radius: 20px;
    }

    #noSubredditWrapper img {
        box-shadow: 0 20px 15px -10px rgba(0,0,0,0.5);
    }


</style>
