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
            <div class="header-title center-item">Inquiry</div>
          </el-col>
          <el-table :data="listInquiry" border style="width: 100%">
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column label="ID" width="150px" prop="id" sortable></el-table-column>
            <el-table-column
              label="Category"
              width="150px"
              prop="category"
              :filters="listCategory"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
            <el-table-column
              label="Requester"
              width="150px"
              prop="requester"
              sortable
              v-if="isLarge"
            ></el-table-column>
            <el-table-column label="Request to" width="150px" prop="request_to" sortable></el-table-column>
            <el-table-column label="Inquiry" min-width="150px" prop="inquiry" sortable></el-table-column>
            <el-table-column
              label="Risk to ONE"
              min-width="150px"
              prop="risk_to"
              sortable
              v-if="isLarge"
            ></el-table-column>
            <el-table-column label="Status" min-width="150px" prop="status" sortable v-if="isLarge"></el-table-column>
            <el-table-column
              label="Updated"
              min-width="150px"
              prop="updated"
              sortable
              v-if="isLarge"
            ></el-table-column>
            <el-table-column label="Publish" width="75" prop="publish" sortable>
              <template class="cell-publish" #default="{row}">
                <el-checkbox v-model="row.publish"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column width="30" align="right">
              <template #default="{row}">
                <router-link :to="'make-request/' + row.documentId"><i class="el-icon-view"></i></router-link>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Editor from "../elements/Editor";

export default {
  name: "Setting",
  components: {
    // Editor
  },
  data() {
    return {
      fullscreenLoading: false,
      isLarge: false,
      listInquiry: [],
      listCategory: []
    };
  },
  methods: {
    async loadCategory() {
      this.listCategory = [];
      let arrQuery = [
        {
          field: "active",
          oper: "==",
          value: "true",
          type: "boolean"
        }
      ];

      let arrData = await this.$commonFunction.getList(
        this.getCategoryMasterDataCollection,
        arrQuery
      );

      arrData.forEach(doc => {
        let obj = {};
        let data = doc.data();
        obj.text = data.name;
        obj.value = data.name;
        obj.order = data.order;
        this.listCategory.push(obj);
      });

      this.listCategory.sort(function(a, b) {
        return a.order - b.order;
      });
    },
    async loadInquiry() {
      this.fullscreenLoading = true;
      this.listInquiry = [];
      let userLogin = this.$commonFunction.getUserEmailLogin();
      let arrQueryCreate = [
        {
          field: "active",
          oper: "==",
          value: "true",
          type: "boolean"
        },
        {
          field: "created_by",
          oper: "==",
          value: userLogin
        }
      ];

      let arrDataCreate = await this.$commonFunction.getList(
        this.getRequestCollection,
        arrQueryCreate
      );

      arrDataCreate.forEach(doc => {
        let obj = {};
        let data = doc.data();
        obj.id = data.id;
        obj.category = data.category;
        obj.requester = data.requester_name + "\n" + data.created;
        obj.request_to = data.request_to;
        obj.inquiry = data.summary;
        obj.risk_to = data.risk_to;
        obj.status = data.status;
        obj.updated = data.updated_by + "\n" + data.updated;
        obj.publish = data.publish;
        obj.documentId = doc.id;
        this.listInquiry.push(obj);
      });

      let arrQueryCopyTo = [
        {
          field: "active",
          oper: "==",
          value: "true",
          type: "boolean"
        },
        {
          field: "copy_to",
          oper: "array-contains",
          value: userLogin
        }
      ];

      let arrDataCopyTo = await this.$commonFunction.getList(
        this.getRequestCollection,
        arrQueryCopyTo
      );

      arrDataCopyTo.forEach(doc => {
        let obj = {};
        let data = doc.data();
        obj.id = data.id;
        obj.category = data.category;
        obj.requester = data.requester_name + "\n" + data.created;
        obj.request_to = data.request_to;
        obj.inquiry = data.summary;
        obj.risk_to = data.risk_to;
        obj.status = data.status;
        obj.updated = data.updated_by + "\n" + data.updated;
        obj.publish = data.publish;
        obj.documentId = doc.id;
        this.listInquiry.push(obj);
      });

      this.fullscreenLoading = false;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    widthCalculating() {
      if (window.innerWidth > 1000) this.isLarge = true;
      else this.isLarge = false;
    }
  },
  created() {
    window.addEventListener("resize", this.widthCalculating);
    this.loadCategory();
    this.loadInquiry();
    console.log(this.$commonFunction.checkUserRole());
  },
  destroyed() {
    window.removeEventListener("resize", this.widthCalculating);
  },
  computed: {
    ...mapGetters(["getRequestCollection", "getCategoryMasterDataCollection"])
  },
  mounted() {
    this.widthCalculating();
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
  padding-bottom: 10px;
}

.isShow {
  display: block;
}

.isHide {
  display: none;
}
</style>
