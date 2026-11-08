<script lang="ts">
export default { name: 'AppNavM' }
</script>
<script setup lang="ts">
import { ref, createApp } from 'vue';
import homeActive from '@/assets/img/home_v.svg'
import videoActive from '@/assets/img/video_v.svg'
import musicActive from '@/assets/img/music_v.svg'
import userActive from '@/assets/img/user_v.svg'
import homeInactive from '@/assets/img/home.svg'
import videoInactive from '@/assets/img/video.svg'
import musicInactive from '@/assets/img/music.svg'
import userInactive from '@/assets/img/user.svg'

const active = ref(0)
const icon = {
    home: {
        active: homeActive,
        inactive: homeInactive,
    },
    video: {
        active: videoActive,
        inactive: videoInactive,
    },
    music: {
        active: musicActive,
        inactive: musicInactive,
    },
    user: {
        active: userActive,
        inactive: userInactive,
    }
};
</script>

<template>
    <div class="page">
        <van-tabbar v-model="active">
            <van-tabbar-item badge="" to="/">
                <span>首页</span>
                <template #icon="props">
                    <img :src="props.active ? icon.home.active : icon.home.inactive" class="tab-icon" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item badge="" to="/video">
                <span>视频</span>
                <template #icon="props">
                    <img :src="props.active ? icon.video.active : icon.video.inactive" class="tab-icon" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item badge="" to="/music">
                <span>音乐</span>
                <template #icon="props">
                    <img :src="props.active ? icon.music.active : icon.music.inactive" class="tab-icon" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item badge="" to="/user">
                <span>我的</span>
                <template #icon="props">
                    <img :src="props.active ? icon.user.active : icon.user.inactive" class="tab-icon" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="scss" scoped>
.page {
    .tab-icon {
        transition: color 0.3s;
    }

    .van-tabbar-item--active .tab-icon {
        transform: translateY(-1px);
    }
}
</style>