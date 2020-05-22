<template>
  <div class="body-wrap">
    <el-container v-loading.fullscreen.lock="fullscreenLoading">
      <el-main>
        <el-row>
          <el-col
            :xl="{span: 16, offset: 4}"
            :lg="{span: 16, offset: 4}"
            :md="{span: 16, offset: 4}"
            :sm="{span: 16, offset: 4}"
          >
            <div class="header-title center-item">Edit Region</div>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="Name">
                <el-input v-model="form.name" size="small"></el-input>
              </el-form-item>
            </el-form>
            <div class="center-item">
              <el-button type="primary" @click="onSubmit" size="small">Save</el-button>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "EditRegion",
  data() {
    return {
      form: {
        name: ""
      },
      paramDocId: this.$route.params.id,
      fullscreenLoading: false
    };
  },

  methods: {
    loadRegionData() {
      this.fullscreenLoading = true;
      this.$db
        .collection(this.$store.state.collections.region)
        .doc(this.$route.params.id)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            let data = snapshot.data();
            this.form.name = data.name;
            this.fullscreenLoading = false;
          } else {
            // snapshot.data() will be undefined in this case
            console.log("No such document!");
          }
        });
    },
    onSubmit() {
      try {
        let objSystemField = this.$commonFunction.getSystemField(true);
        let obj = Object.assign({}, objSystemField, this.form);

        this.$db
          .collection(this.getRegionCollection)
          .doc(this.paramDocId)
          .update(obj)
          .then(result => {
            this.$commonFunction.alertSuccess();
          })
          .catch(error => {
            this.$commonFunction.alertError(error);
          });
      } catch (error) {
        this.$commonFunction.alertError(error.message);
      }
    }
  },
  created() {
    this.loadRegionData();
  },
  computed: {
    ...mapGetters(["getRegionCollection", "getSaveSuccessfullyMessage"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body-wrap {
  background: #fff;
}

.center-item {
  text-align: center;
}

.header-title {
  color: #bd0f72;
  font-size: 30px;
  font-weight: 600;
}
</style>
