<template>
  <div class="flex w-full h-full">
    <div class="p-[5%] flex w-1/2 justify-center h-full items-center">
      <div class="flex items-center justify-center w-full h-full">
        <div class="relative w-full h-full">
          <!-- Background Circle -->
          <svg class="w-full h-full" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.915" fill="none" class="stroke-sky-950" stroke-width="4" />
          </svg>
          <!-- Progress Circle -->
          <svg class="w-full h-full absolute top-0 left-0" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.915" fill="none" class="stroke-sky-500" stroke-width="4" stroke-dasharray="100" :stroke-dashoffset="100 - progress" stroke-linecap="round" transform="rotate(-90 18 18)" />
          </svg>
          <!-- Text Content -->
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <!-- Percentage Text -->
            <div class="font-bold text-gray-100" :style="{ fontSize: `clamp(0.5rem, 10vw, 15vh)` }">{{ progress }}%</div>
            <!-- Small Text -->
            <div class="absolute top-[60%] text-gray-300 mt-1" :style="{ fontSize: `clamp(0.25rem, 2vw, 8vh)` }">{{ done }} / {{ total }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-[5%] w-1/2 flex">
      <div :key="nozzle.id" v-for="nozzle in nozzles" class="gap-x-2 gap-y-4 flex flex-col justify-around items-center w-full">
        <span class="text-gray-300" :style="{ fontSize: `clamp(0.25rem, 3vw, 8vh)` }">{{ nozzle.id }}</span>
        <img class="h-3/5" src="/nozzle.svg" />
        <div class="w-1/4 aspect-[2/1] rounded-lg" :class="nozzle.isActive ? 'bg-green-500' : 'bg-sky-950'"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      done: 5,
      total: 100,
      nozzles: [{ id: "L", isActive: true }, { id: "R" }],
      progressSize: 100, // default size
    };
  },
  computed: {
    progress() {
      if (this.total === 0) return 0; // Avoid division by zero
      return parseInt((this.done / this.total) * 100);
    },
  },
  mounted() {
    setInterval(() => {
      this.done = this.done + 1;
      if (this.done > 100) this.done = 0;
    }, 100);
    this.updateProgressSize();
    window.addEventListener("resize", this.updateProgressSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateProgressSize);
  },
  methods: {
    updateProgressSize() {
      const container = this.$refs.containerRef;
      if (container) {
        // Take the smaller dimension to maintain aspect ratio
        this.progressSize = Math.min(container.clientWidth, container.clientHeight);
      }
    },
  },
};
</script>

<style scoped>
/* Add smooth animation for progress updates */
circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: center;
}
</style>
