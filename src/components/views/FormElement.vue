<template>
  <div class="body-wrap">
    <el-container>
      <el-main>
        <el-col :xl="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :md="{span: 16, offset: 4}">
          <div class="box-header-actions">
            <div class="box-title">
              <p>INQUIRY</p>
            </div>
            <div class="box-buttons">
              <el-button size="small" type="primary" @click="onSubmit">CREATE</el-button>
              <el-button size="small" type="info">EXCALIBUR</el-button>
              <el-button size="small">DMM QUYEN</el-button>
              <el-button size="small" type="danger">CANCEL</el-button>
            </div>
          </div>

          <div class="box-header-actions">
            <div class="box-details">
              <el-page-header @back="goBack" content="DETAILS"></el-page-header>
            </div>
            <div class="box-buttons">
              <el-button size="small" type="primary" @click="onSubmit">CREATE</el-button>
              <el-button size="small">CANCEL</el-button>
            </div>
          </div>
          <!-- 
          <div class="box-title center-item">Inquiry</div>-->
          <el-form label-position="left" ref="form" :model="form" label-width="120px" size="small">
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
          </el-form>
        </el-col>

        <el-col>
          <hr />
          <p>{{screenWidth}}</p>
          <el-table :data="tableData">
            <el-table-column type="expand">
              <template slot-scope="props">
                <p>State: {{ props.row.state }}</p>
                <p>City: {{ props.row.city }}</p>
                <p>Address: {{ props.row.address }}</p>
                <p>Zip: {{ props.row.zip }}</p>
              </template>
            </el-table-column>
            <!-- <el-table-column label="Date" width="150px" prop="date" class-name="hidden-md-and-down"></el-table-column> -->
            <el-table-column label="Date" width="150px" prop="date" v-if="isLarge"></el-table-column>
            <el-table-column prop="zip" width="100px" label="Zip"></el-table-column>
            <el-table-column prop="address" width="auto" label="Address" v-if="isLarge"></el-table-column>
            <el-table-column prop="city" width="auto" label="City" v-if="isLarge"></el-table-column>
            <el-table-column label="Name" width="auto" prop="name"></el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <tiptap></tiptap>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import tiptap from "../elements/Editor";
import firebase from "firebase";
export default {
  name: "Inquiry",
  components: {
    tiptap
  },
  data() {
    return {
      msg: "Wellcome to home page",
      screenWidth: 0,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      search: "",
      isLarge: false,
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-01",
          name: "Tom1",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-08",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-06",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        },
        {
          date: "2016-05-07",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036"
        }
      ]
    };
  },

  computed: {},

  mounted() {
    //screen.addEventListener("resize", () => (this.screenWidth = screen.width));
    this.widthCalculating();
  },

  methods: {
    onSubmit() {
      alert("submit!");
    },

    goBack() {
      console.log("go back");
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    widthCalculating() {
      this.screenWidth =
        "resolution: " + screen.width + " - innerWidth: " + window.innerWidth;
      if (window.innerWidth > 1000) this.isLarge = true;
      else this.isLarge = false;
    }
  },

  created() {
    window.addEventListener("resize", this.widthCalculating);
  },

  destroyed() {
    window.removeEventListener("resize", this.widthCalculating);
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
</style>
