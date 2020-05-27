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
          <el-table :data="regionData" stripe style="width: 100%">
            <el-table-column label="Name" min-width="150px" prop="name" sortable>
              <template #default="{row}">
                <router-link :to="'edit-region/' + row.documentId">{{row['name']}}</router-link>
              </template>
            </el-table-column>
            <el-table-column label="Active" min-width="150px" prop="active" sortable></el-table-column>
            <el-table-column
              label="Created"
              min-width="150px"
              prop="created"
              sortable
              v-if="isLarge"
            >
              <template #default="{row}">{{$commonFunction.formatDate(row["created"])}}</template>
            </el-table-column>
            <el-table-column
              label="Created By"
              min-width="150px"
              prop="created_by"
              sortable
              v-if="isLarge"
            ></el-table-column>
            <el-table-column
              label="Updated"
              min-width="150px"
              prop="updated"
              sortable
              v-if="isLarge"
            >
              <template #default="{row}">{{$commonFunction.formatDate(row["updated"])}}</template>
            </el-table-column>
            <el-table-column
              label="Updated By"
              min-width="150px"
              prop="updated_by"
              sortable
              v-if="isLarge"
            ></el-table-column>
          </el-table>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Editor from "../elements/Editor";

let arrProp = {
  super_email: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Super Email",
      prop: "super_email"
    }
  ],
  upload_email: [
    {
      required: true,
      elmType: "string",
      fieldLabel: "Owner Email Upload",
      prop: "upload_email"
    }
  ],
  homepage_content: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Home Page",
      prop: "homepage_content"
    }
  ]
};

export default {
  name: "Setting",
  components: {
    Editor
  },
  data() {
    return {
      form: this.$commonFunction.getFormPorp(arrProp),
      rules: this.$commonFunction.getRuleValidation(arrProp),
      columns: [
        {
          prop: "name",
          label: "Name",
          activeFilterQuery: true,
          type: "string"
        },
        {
          prop: "active",
          label: "Active",
          minWidth: "180px",
          activeFilterQuery: true,
          type: "boolean",
          formatter: {
            isLarge: true
          }
        },
        {
          prop: "created",
          label: "Created",
          minWidth: "180px",
          formatter: {
            formatDate: true,
            isLarge: false
          }
        },
        {
          prop: "created_by",
          label: "Created By",
          minWidth: "180px",
          formatter: {
            isLarge: false
          }
        },
        {
          prop: "updated",
          label: "Updated",
          minWidth: "180px",
          formatter: {
            formatDate: true,
            isLarge: false
          }
        },
        {
          prop: "updated_by",
          label: "Updated By",
          minWidth: "180px",
          formatter: {
            isLarge: false
          }
        }
      ],
      regionData: [],
      fullscreenLoading: false,
      isLarge: false,
      isShowClass: "isShow",
      isHideClass: "isHide"
    };
  },
  methods: {
    async loadSetting() {
      this.form = await this.$commonFunction.getRecord(
        this.getCommonCollection,
        this.getSettingDocument
      );
    },
    async loadRegion(arrQuery) {
      this.fullscreenLoading = true;
      this.regionData = [];
      var ref = this.$db.collection(this.getRegionCollection);

      for (let i in arrQuery) {
        let query = arrQuery[i];
        ref = ref.where(query.field, query.oper, query.value);
      }
      try {
        ref
          .get()
          .then(snapshot => {
            snapshot.docs.forEach(doc => {
              let obj = {};
              var data = doc.data();
              obj = data;
              obj.active = data.active === true ? "True" : "False";
              obj.created = data.created.toDate();
              obj.updated = data.updated.toDate();
              obj.documentId = doc.id;
              this.regionData.push(obj);
            });
            this.fullscreenLoading = false;
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log(error.message);
      }
    },
    onSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.$commonFunction.updateRecord(
            this.getCommonCollection,
            this.getSettingDocument,
            this.form
          );
        } else {
          return false;
        }
      });
    },
    newRegion() {
      this.$router.replace("edit-region/isNew");
    },
    widthCalculating() {
      if (window.innerWidth > 1000) this.isLarge = true;
      else this.isLarge = false;
    },
    getEditorContent(content) {
      this.form.homepage_content = content;
    }
  },
  created() {
    window.addEventListener("resize", this.widthCalculating);
    this.$store.commit(
      "SET_FIELDS_QUERY",
      this.columns.filter(x => x.activeFilterQuery === true).map(x => x)
    );
    this.loadSetting();
    this.loadRegion();
  },
  destroyed() {
    window.removeEventListener("resize", this.widthCalculating);
  },
  computed: {
    ...mapGetters([
      "getCommonCollection",
      "getRegionCollection",
      "getSettingDocument"
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
