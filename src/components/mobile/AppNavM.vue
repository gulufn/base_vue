<script lang="ts">
export default { name: 'AppNavM' }
</script>
<script setup lang="ts">
import { ref, createApp } from 'vue';


const active = ref(0)

</script>

<template>
    <div class="page">
        <van-tabbar route>
            <van-tabbar-item badge="" to="/">
                <span>首页</span>
                <template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                        class="svg_home_title tab-icon">
                        <path
                            d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    </svg>
                </template>
            </van-tabbar-item>
            <van-tabbar-item badge="" to="/video">
                <span>视频</span>
                <template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                        class="svg_video_title tab-icon">
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <path class="svg_video_body"
                            d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
                        <path d="M7 21h10" />
                    </svg>
                </template>
            </van-tabbar-item>
            <van-tabbar-item badge="" to="/music">
                <span>音乐</span>
                <template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                        class="svg_music_title tab-icon">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                    </svg>
                </template>
            </van-tabbar-item>
            <van-tabbar-item badge="" to="/user">
                <span>我的</span>
                <template #icon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                        class="svg_user_title tab-icon">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
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