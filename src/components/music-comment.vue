<template>
    <div class='music-comment-container'>
        <h3>热门评论</h3>
        <ul>
            <li v-for='(item,i) in commentList' :key='i' >
                <img class='photo' width="30" :src="item.user.avatarUrl" alt="">
                <div>
                    <div class='nickname'>{{item.user.nickname}}</div>
                    <p class='comment'>{{item.content}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['commentList']
}
</script>

<style>

</style>