<script lang="ts">
export default { name: 'music_collect' }
</script>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { API_BASE, API_BASE_MUSIC } from '@/config.ts'
import MusicListCollect from '@/components/music/MusicListCollect.vue'


const api = ref(API_BASE + '/music/get_music_list_collect')
</script>

<template>
    <div class="page">
        <MusicListCollect :api=api />
    </div>
</template>
<style lang="scss" scoped>
.page {
   height: 100%;
}


</style>