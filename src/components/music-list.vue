<template>
    <div class='music-list-container'>
        <ul>
            <li v-for='(item,i) in musicList' :key='i' :class='{gray:i%2 == 0}'>
                <span class='icon mp3' @click="$emit('playMusicHandler',item.id)"></span>
                <span>{{item.name}}</span>
                <span class='icon mv' v-if='item.mvid' @click="$emit('toVideoHandler',item.id)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['musicList']
}
</script>

<style>

</style>