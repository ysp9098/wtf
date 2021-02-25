<template>
    <div id='home'>
        <div class='search'>
            <h3>莫比乌斯音乐盒</h3>
            <div>
                <input type="text" v-model="keywords" @keydown.enter="searchHandler">
            </div>
        </div>
        <div class='music-container'>
            <div is='music-list' 
                :musicList='musicList' 
                @playMusicHandler='playMusicHandler'
                @toVideoHandler='toVideoHandler'
            ></div>
            <div is='music-poster' :posterUrl='posterUrl' :isPlayed='isPlayed'></div>
            <div is='music-comment' :commentList='commentList'></div>
        </div>
        <div class='music-play'>
            <audio :src='musicUrl' autoplay controls @pause='isplayed=false' />
        </div>
    </div>
</template>

<script>

import musicList from '@/components/music-list'
import musicPoster from '@/components/music-poster'
import musicComment from '@/components/music-comment'

export default {
    components:{musicList,musicPoster,musicComment},
    methods:{
        getData(url,params){
            return this.$axios.get(url,{params})
        },
        toVideoHandler(mvid){
            // 跳转到视频页，并且传递mvid参数给视频组件请求播放的视频url。
            this.$router.push({name:'video',params:{mvid}})
        },
        async playMusicHandler(id){
            // 请求音乐播放地址和封面数据和评论数据
            let dataList = await this.$axios.all([
                this.getData('song/detail',{ids:id}),
                this.getData('song/url',{id}),
                this.getData('comment/hot?type=0',{id})
            ]);

            // 根据数据渲染封面
            this.posterUrl = dataList[0].data.songs[0].al.picUrl;
            // 根据数据渲染评论列表
            this.commentList = dataList[2].data.hotComments;
            // 播放音乐
            this.musicUrl = dataList[1].data.data[0].url;
            // 让封面旋转.
            this.isplayed = true;
        },
        async renderView(keywords){
            // 渲染音乐列表
            let musicData = await this.getData('search',{keywords});
            this.musicList = musicData.data.result.songs;

            // 并发请求.两个请求都请求到了之后才算请求结束.才会执行await之后的代码.
            let dataList = await this.$axios.all([
                this.getData('song/detail',{ids:this.musicList[0].id}),
                this.getData('comment/hot?type=0',{id:this.musicList[0].id})
            ])
            // 根据数据渲染封面
            this.posterUrl = dataList[0].data.songs[0].al.picUrl;
            // 根据数据渲染评论列表
            this.commentList = dataList[1].data.hotComments;
        },
        searchHandler(){
            // 根据输入的关键字搜索音乐
           this.renderView(this.keywords);
        }
    },
    data(){
        return {
            // 歌曲列表
            musicList:[],
            // 封面图片
            posterUrl:'../assets/cover.jpg',
            // 评论列表
            commentList:[],
            // 搜索关键字
            keywords:'热门',
            // 音乐的播放地址
            musicUrl:'',
            // 是否正在播放
            isplayed:false
        }
    },
    async mounted(){
       // 默认请求热门音乐数据
       this.renderView('热门');
    }
}
</script>

<style>
    .music-play{
        background-color: #f1f3f4;
    }
    audio{
        width: 800px;
    }
    .dance{
        animation: move 5s linear infinite;
    }

    @keyframes move{
        from{transform: rotate(0deg);}
        to{transform: rotate(360deg);}
    }

    .disc{
        width: 255px;
        height: 255px;
        background: url('../assets/disc.png') no-repeat;
    }
    .disc>img{
        border-radius: 50%;
    }
    .handler.move{
        transform:rotate(10deg);
    }
    .handler{
        position: absolute;
        transform-origin: 10px 10px;
        transform:rotate(-35deg);
        transition:1s linear;
        top:0
    }
    .nickname{
        color:#000;
        font-weight: bold;
        font-size:16px;
        padding: 5px 0;
    }
    .comment{
        color:#fff;
        font-size: 12px;
    }
    .photo{
        border-radius: 50%;
        width: 30px;
        height: 30px;
        background-color: red;
    }
    .music-comment-container h3{
        color:#000;
        font-weight: bold;
        font-size: 18px;
    }
    .music-comment-container li>div{
        margin-left:10px;
    }
    .music-comment-container li{
        padding: 10px 0;
        display: flex;
    }
    .music-container>.music-poster-container{
        flex-grow:2;
        position: relative;
    }
    .music-container>div{
        width: 0;
        flex-grow:1;
        height: 480px;
        overflow: auto;
    }
    .music-list-container span:not(.icon){
        flex-grow:1;
        text-align: center;
        overflow:hidden; 
        text-overflow:ellipsis; 
        white-space:nowrap
    }
    .music-list-container .icon{
        width: 25px;
        height: 25px;
        display: block;
        background: url(../assets/table.png) no-repeat
    }
    .music-list-container .mp3{
        background-position:  -18px -21px;
    }
    .music-list-container .mv{
        background-position: 0 -45px;
    }
    .music-list-container li{
        justify-content: center;
        align-items: center;
        padding: 0 5px;
        height: 40px;
        color:#fff
    }
    .music-list-container .gray{
        background-color:rgba(255, 255, 255, 0.5);
    }
    .music-container{
        background-color: rgba(255, 255, 255, 0.3);
    }
    .music-container,.music-list-container li{
        display: flex;
    }
    .search{
        background-color: #29abd3;
        display: flex;
        justify-content: space-between;
        line-height: 60px;
        padding: 0 30px;
    }
    .search>h3{
        font-size:16px;
        font-weight: bold;
        color:#fff;
    }
    .search input{
        border-radius: 10px;
        height: 30px;
        outline: none;
        border:0;
        padding: 0 15px;
    }
    #home{
        width: 800px;
        height: 600px;
    }
</style>