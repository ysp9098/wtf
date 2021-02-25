<template>
  <div id='video'>
      <video ref='video' :src='src' autoplay controls width="800" height="600">
      </video>
  </div>
</template>

<script>
export default {
    methods:{
        getData(url,params){
            return this.$axios.get(url,{params})
        },
    },
    data(){
        return {src:''}
    },
    // 加载视频页时请求视频播放的地址.
    async mounted(){
        let srcData = await this.getData('mv/url',{id:this.$route.params.mvid});
        this.src = srcData.data.data.url;
    }
}
</script>

<style>

</style>