<template>
  <div>
    <PlantForm v-if="plant" :plant="plant" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlantForm from "@/components/PlantForm";
export default {
  name: "EditPlant",
  data() {
    return {
      plant: null
    };
  },
  computed: {
    ...mapGetters(["plantById"])
  },
  mounted() {
    const plant = this.plantById(this.$route.params.id);
    if (plant) {
      this.plant = plant;
      return;
    }

    this.$router.push("/");
  },
  components: { PlantForm }
};
</script>

<style scoped></style>
