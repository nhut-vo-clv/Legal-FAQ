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
            <div class="header-title center-item">PUBLISHED FAQ</div>
          </el-col>
          <el-table :data="listPublishInquiry" border style="width: 100%">
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column
              label="Category"
              width="120px"
              prop="category"
              :filters="listCategory"
              :filter-method="filterHandler"
              sortable
            ></el-table-column>
            <el-table-column label="Inquiry" min-width="150px" prop="inquiry" sortable></el-table-column>
            <el-table-column
              label="Comment Provided"
              min-width="150px"
              prop="comment"
              sortable
              v-if="isLarge"
            ></el-table-column>
            <el-table-column width="40" align="right">
              <template #default="{row}">
                <router-link :to="'make-request/' + row.documentId">
                  <i class="el-icon-view icon-in-cell"></i>
                </router-link>
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
  name: "PublishInquiry",
  data() {
    return {
      fullscreenLoading: false,
      isLarge: false,
      listPublishInquiry: [],
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
    async loadPublishInquiry() {
      this.fullscreenLoading = true;
      this.listPublishInquiry = [];
      let userLogin = this.$commonFunction.getUserEmailLogin();
      let arrData = [];
      let arrQuery = [
        {
          field: "active",
          oper: "==",
          value: "true",
          type: "boolean"
        },
        {
          field: "publish",
          oper: "==",
          value: "true",
          type: "boolean"
        },
        {
          field: "publish_date",
          value: "desc",
          type: "order"
        }
      ];

      arrData = await this.$commonFunction.getList(
        this.getRequestCollection,
        arrQuery
      );

      arrData.forEach(async doc => {
        let obj = {};
        let data = doc.data();
        obj.category = data.category;
        obj.inquiry = data.summary;
        obj.documentId = doc.id;

        obj.comment = await this.getLastComment(doc.id);

        this.listPublishInquiry.push(obj);
      });

      this.fullscreenLoading = false;
    },
    getLastComment(requestId) {
      return new Promise((resolve, reject) => {
        this.$db
          .collection(this.getCommentCollection)
          .where("request_id", "==", requestId)
          .orderBy("created", "desc")
          .limit(1)
          .get()
          .then(snapshot => {
            if (snapshot.docs.length > 0) {
              resolve(snapshot.docs[0].data().value);
            } else {
              resolve("");
            }
          });
      });
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
    this.loadCategory();
    this.loadPublishInquiry();
  },
  destroyed() {
    window.removeEventListener("resize", this.widthCalculating);
  },
  computed: {
    ...mapGetters([
      "getRequestCollection",
      "getCategoryMasterDataCollection",
      "getCommentCollection"
    ])
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
