<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div v-html="homepage_content"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      homepage_content: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    async getHomePageContent() {
      this.fullscreenLoading = true;
      await this.$commonFunction.getRecord(
        this.getCommonCollection,
        this.getSettingDocument
      ).then(data => {
        this.homepage_content = data.homepage_content;
        this.fullscreenLoading = false;
      });
    }
  },
  computed: {
    ...mapGetters(["getCommonCollection", "getSettingDocument"])
  },
  created() {
    this.getHomePageContent();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  font-size: 30px;
  font-weight: 600;
  padding: 40px;
  color: #bd0f72;
  text-align: center;
  background: #fff;
}
</style>
