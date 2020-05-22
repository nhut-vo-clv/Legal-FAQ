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
          <div class="box-header-actions">
            <div class="box-title">
              <p>INQUIRY</p>
            </div>
            <div class="box-buttons">
              <el-button size="small" type="primary" @click="onSubmit">CREATE</el-button>
              <el-button size="small" type="info" >EXCALIBUR</el-button>
              <el-button size="small">DMMQUYEN</el-button>
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
          <el-table
            style="width: 100%"
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          >
            <el-table-column type="expand" class="kuteo">
              <template slot-scope="props">
                <p>State: {{ props.row.state }}</p>
                <p>City: {{ props.row.city }}</p>
                <p>Address: {{ props.row.address }}</p>
                <p>Zip: {{ props.row.zip }}</p>
              </template>
            </el-table-column>
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column label="Name" prop="name"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
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
      },
      search: "",
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

.middle-slash {
  text-align: center;
}

.box-header-actions {
  background-color: #eee;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  display: flex;
  padding: 10px;
  line-height: 0%;
}

.box-buttons {
  margin-left: auto;
}

.box-buttons > button {
  margin: 2px;
}

.box-title {
  color: #bd0f72;
  font-size: 25px;
  transform: translateY(50%);
  padding-right: 20px;
}

.box-details {
  transform: translateY(20%);
  padding-right: 20px;
}

</style>
