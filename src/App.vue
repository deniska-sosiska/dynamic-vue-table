<template>
    <div>
        <h1 class="text-center">
            {{ nameIt }}
        </h1>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        data: () => ({
            nameIt: 'Hello World!',
        }),
    });
</script>
