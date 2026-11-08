<script lang="ts">
export default { name: 'AppNavP' }
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import user from '@/assets/img/1.png'
import { useLayoutStore } from '@/stores/layout'

const layout = useLayoutStore()

</script>

<template>
    <div class="page" :class="{ collapsed: layout.sidebarExpanded }">
        <ul>
            <li class="title">
                <img :src="user" alt="">
                <span>欢迎您！管理员</span>
            </li>
            <li>
                <router-link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    </svg>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>首页探索</span>
                </router-link>
            </li>
            <li>
                <router-link to="/video">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <path class="svg_video_body"
                            d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
                        <path d="M7 21h10" />
                    </svg>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>视频观赏</span>
                </router-link>
            </li>
            <li>
                <router-link to="/music">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                    </svg>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>音乐倾听</span>
                </router-link>
            </li>
            <li>
                <router-link to="/user">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>个人中心</span>
                </router-link>
            </li>
        </ul>
    </div>


</template>

<style lang="scss" scoped>
.page {
    background-color: #2a3f54;
    height: 100%;

    ul {
        .title {
            display: flex; // 弹性布局，一维结构
            flex-direction: row;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 16px;

            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }

        li {
            height: 70px;
            /* 溢出隐藏 */
            overflow: hidden;
            // border: 1px solid #d9dee4;

            a {
                display: flex;
                align-items: center;
                // justify-content: center;
                color: #c0bfbf;
                height: 100%;
                font-size: 14px;
                padding-left: 15%;

                &.router-link-active {
                    background-color: #4f6479;
                    color: #fff;
                }
            }
        }
    }
}
// PC端侧边栏收缩样式
.collapsed {
    ul {
        .title {
            img {
                margin-right: 0px;
            }
            span {
                display: none;
            }
        }
        li {
            a {
                flex-direction: column;
                justify-content: center;
                font-size: 10px;
                padding-left: 0%;
            }
        }
    }
}
</style>