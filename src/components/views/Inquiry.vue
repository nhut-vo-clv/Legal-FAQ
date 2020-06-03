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
            <div class="header-title center-item">INQUIRY LIST</div>
          </el-col>
          <el-table :data="listInquiry" border style="width: 100%">
            <el-table-column type="expand" width="30">
              <template slot-scope="props">
                <p>Category: {{ props.row.category }}</p>
                <p>Status: {{ props.row.status }}</p>
                <p>Requester: {{ props.row.requester }}</p>
                <p>Request to: {{ props.row.request_to }}</p>
                <p>Risk to ONE: {{ props.row.risk_to }}</p>
              </template>
            </el-table-column>
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column label="ID" width="100px" prop="id" sortable></el-table-column>
            <el-table-column
              label="Category"
              width="120px"
              prop="category"
              :filters="listCategory"
              :filter-method="filterHandler"
              sortable
              v-if="isLarge"
            ></el-table-column>
            <el-table-column
              label="Requester"
              width="150px"
              prop="requester"
              sortable
              v-if="isLarge"
            >
              <template #default="{row}">
                <div v-html="row.requester"></div>
              </template>
            </el-table-column>
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
            >
              <template #default="{row}">
                <div v-html="row.updated"></div>
              </template>
            </el-table-column>
            <el-table-column
              label="Publish"
              width="100"
              align="center"
              class-name="checkbox-in-cell"
              prop="publish"
              sortable
            >
              <template class="cell-publish" #default="{row}">
                <el-tooltip content="Publish inquiry" placement="top">
                  <el-checkbox :checked="row.publish" @change="publishRecord($event, row)"></el-checkbox>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column width="40" align="right">
              <template #default="{row}">
                <el-tooltip content="Details" placement="top">
                  <router-link :to="'make-request/' + row.documentId">
                    <i class="el-icon-view icon-in-cell"></i>
                  </router-link>
                </el-tooltip>
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

export default {
  name: "Inquiry",
  data() {
    return {
      fullscreenLoading: false,
      isLarge: false,
      listInquiry: [],
      listCategory: [],
      userRole: {}
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
      let arrDataCreate = [];
      let arrDataCopyTo = [];
      let arrData = [];
      let arrQuery = [
        {
          field: "active",
          oper: "==",
          value: "true",
          type: "boolean"
        }
      ];

      let arrQueryCopyTo = [
        {
          field: "active",
          oper: "==",
          value: "true",
          type: "boolean"
        }
      ];

      if (this.userRole.isAdmin) {
        arrData = await this.$commonFunction.getList(
          this.getRequestCollection,
          arrQuery
        );
      } else {
        arrQuery.push({
          field: "email",
          oper: "==",
          value: userLogin
        });

        arrQueryCopyTo.push({
          field: "copy_to",
          oper: "array-contains",
          value: userLogin
        });

        arrDataCreate = await this.$commonFunction.getList(
          this.getRequestCollection,
          arrQuery
        );

        arrDataCopyTo = await this.$commonFunction.getList(
          this.getRequestCollection,
          arrQueryCopyTo
        );

        let mergeArrData = arrDataCreate.concat(arrDataCopyTo);

        arrData = Array.from(new Set(mergeArrData.map(a => a.id))).map(id => {
          return mergeArrData.find(a => a.id === id);
        });
      }

      arrData.forEach(doc => {
        let obj = {};
        let data = doc.data();
        obj.id = data.id;
        obj.category = data.category;
        obj.requester =
          data.requester_name +
          "<br/>" +
          this.$commonFunction.formatDate(data.created.toDate());
        obj.request_to = data.request_to;
        obj.inquiry = data.summary;
        obj.risk_to = data.risk_to;
        obj.status = data.status;
        obj.updated =
          data.updated_by +
          "<br/>" +
          this.$commonFunction.formatDate(data.updated.toDate());
        obj.publish = data.publish;
        obj.documentId = doc.id;
        this.listInquiry.push(obj);
      });

      this.fullscreenLoading = false;
    },
    async publishRecord(checkVal, record) {
      let obj = { publish: checkVal };

      if (checkVal) {
        obj.publish_date = this.$commonFunction.getSystemDate();
      }

      await this.$commonFunction.updateRecord(
        this.getRequestCollection,
        record.documentId,
        obj
      );
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
  async created() {
    window.addEventListener("resize", this.widthCalculating);
    this.userRole = await this.$commonFunction.checkUserRole();
    this.loadCategory();
    this.loadInquiry();
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
