<template>
  <div class="body-wrap">
    <el-container>
      <el-main>
        <el-col
          :xl="{span: 16, offset: 4}"
          :lg="{span: 16, offset: 4}"
          :md="{span: 16, offset: 4}"
          :sm="{span: 16, offset: 4}"
        >
          <div class="header-title center-item">Inquiry</div>
          <el-form ref="form" :model="form" label-width="120px" size="small">
            <el-form-item label="Activity name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Activity zone">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="Pick a date"
                  v-model="form.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col :span="2" class="middle-slash">-</el-col>
              <el-col :span="11">
                <el-time-picker placeholder="Pick a time" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="Activity type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="Online activities" name="type"></el-checkbox>
                <el-checkbox label="Promotion activities" name="type"></el-checkbox>
                <el-checkbox label="Offline activities" name="type"></el-checkbox>
                <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
              <el-radio-group v-model="form.resource">
                <el-radio label="Sponsor"></el-radio>
                <el-radio label="Venue"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <div class="center-item">
              <el-button size="small" type="primary" @click="onSubmit">Create</el-button>
              <el-button size="small">Cancel</el-button>
            </div>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Inquiry",
  data() {
    return {
      msg: "Wellcome to home page",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },

  methods: {
    onSubmit() {
      alert("submit!");
    }
  },

  created() {}
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
  padding-bottom: 10px;
}

.middle-slash {
  text-align: center;
}
</style>
