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
            <div class="header-title center-item">Setting</div>
            <el-form
              ref="formSetting"
              :model="form"
              :rules="rules"
              label-width="150px"
              size="small"
            >
              <el-form-item
                :label="rules.super_email[0].fieldLabel"
                :prop="rules.super_email[0].prop"
              >
                <el-input v-model="form.super_email"></el-input>
              </el-form-item>
              <el-form-item
                :label="rules.upload_email[0].fieldLabel"
                :prop="rules.upload_email[0].prop"
              >
                <el-input v-model="form.upload_email"></el-input>
              </el-form-item>
              <el-form-item
                :label="rules.homepage_content[0].fieldLabel"
                :prop="rules.homepage_content[0].prop"
              >
                <editor></editor>
              </el-form-item>
              <div class="center-item">
                <el-button type="primary" @click="onSave('formSetting')">Save</el-button>
              </div>
            </el-form>
            <hr />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xl="{span: 16, offset: 4}"
            :lg="{span: 16, offset: 4}"
            :md="{span: 16, offset: 4}"
            :sm="{span: 16, offset: 4}"
          >
            <div class="header-title center-item">Regions</div>
            <div class="center-item">
              <FilterTable v-on:filterQuery="loadRegion" />
            </div>
            <el-button type="primary" @click="newRegion">New</el-button>
          </el-col>
          <el-table :data="regionData" stripe style="width: 100%">
            <el-table-column
              v-for="column in columns"
              :key="column.label"
              :prop="column.prop"
              :label="column.label"
              :min-width="column.minWidth"
            >
              <template #default="{row}" v-if="column.formatter">
                <router-link v-if="column.formatter.classIcon" :to="'edit/' + row.documentId">
                  <i :class="column.formatter.classIcon"></i>
                </router-link>
                <template></template>
                <router-link
                  v-if="column.formatter.showReference === true"
                  :to="'edit-region/' + row.documentId"
                >{{row[column.prop]}}</router-link>
                <template
                  v-if="column.formatter.formatDate === true"
                >{{$commonFunction.formatDate(row[column.prop])}}</template>
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
import FilterTable from "../elements/FilterTable";
import Editor from "../elements/Editor";

export default {
  name: "Setting",
  components: {
    FilterTable,
    Editor
  },
  data() {
    let arrProp = {
      super_email: [
        {
          required: false,
          type: "string",
          fieldLabel: "Super Email",
          prop: "super_email"
        }
      ],
      upload_email: [
        {
          required: true,
          type: "string",
          fieldLabel: "Owner Email Upload",
          prop: "upload_email"
        }
      ],
      homepage_content: {
          required: false,
          type: "string",
          fieldLabel: "Home Page",
          prop: "homepage_content"
        }
    };
    return {
      form: this.$commonFunction.getFormPorp(arrProp),
      rules: this.$commonFunction.getRuleValidation(arrProp),
      columns: [
        {
          prop: "icon",
          label: "",
          minWidth: "35px",
          formatter: {
            classIcon: "el-icon-info"
          }
        },
        {
          prop: "name",
          label: "Name",
          minWidth: "180px",
          formatter: {
            showReference: true
          },
          activeFilterQuery: true,
          type: "string"
        },
        {
          prop: "active",
          label: "Active",
          minWidth: "180px",
          activeFilterQuery: true,
          type: "boolean"
        },
        {
          prop: "created",
          label: "Created",
          minWidth: "180px",
          formatter: {
            formatDate: true
          }
        },
        {
          prop: "created_by",
          label: "Created By",
          minWidth: "180px"
        },
        {
          prop: "updated",
          label: "Updated",
          minWidth: "180px",
          formatter: {
            formatDate: true
          }
        },
        {
          prop: "updated_by",
          label: "Updated By",
          minWidth: "180px"
        }
      ],
      regionData: [],
      fullscreenLoading: false
    };
  },
  methods: {
    async loadSetupEmail() {
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
          this.form.homepage_content = Editor.editor.getHTML();
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
    }
  },
  created() {
    console.log(Editor.editor.getHTML());
    this.$store.commit(
      "SET_FIELDS_QUERY",
      this.columns.filter(x => x.activeFilterQuery === true).map(x => x)
    );
    this.loadSetupEmail();
    this.loadRegion();
  },
  computed: {
    ...mapGetters([
      "getCommonCollection",
      "getRegionCollection",
      "getSettingDocument"
    ])
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
</style>
