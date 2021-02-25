<template>
   <div class='music-poster-container center'>
        <div :class='{disc:true,center:true,dance:isplayed}'>
            <img width="150" :src="posterUrl" alt="">
        </div>
        <div :class='{handler:true,move:isplayed}'>
            <img src="../assets/player_bar.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props:['posterUrl','isplayed']
}
</script>

<style>

</style>