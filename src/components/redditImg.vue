<template>
    <div class="redditImg">
       <h3>{{ redditObject.title }}</h3>
        <img :src="redditObject.imgURL" :alt="redditObject.title">
    </div>
</template>

<script>
    export default {
        props: ["redditObject"],
        data() {
            return {}
        }
    }

</script>

<style>
    .redditImg h3 {
        background-color: #390079;
        position: absolute;
        left: 0;
        bottom: 0;
        width: inherit;
        text-align: center;
        opacity: 0;
        transition: opacity 450ms ease-in-out;
        color: white;
    }

    .redditImg img {
        width: inherit;
        height: inherit;
        border: 5px #390079 solid;
        box-shadow: 0 15px 15px -10px rgba(0,0,0,0.5);
    }

    .redditImg {
        width: 28vmax;
        height: 28vmax;
        margin: 20px;
        position: relative;
    }

    .redditImg:hover > h3 {
        opacity: 0.9;
    }

</style>
