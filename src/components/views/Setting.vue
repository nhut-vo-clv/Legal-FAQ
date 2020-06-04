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
            <div class="box-header-actions">
              <div class="box-title">
                <p>ADMIN SETTING</p>
              </div>
              <div class="box-buttons">
                <el-button size="small" type="primary" @click="onSave('formSetting')">SAVE</el-button>
                <!-- <el-button size="small" @click="goBack">CANCEL</el-button> -->
              </div>
            </div>

            <el-form
              ref="formSetting"
              :model="form"
              :rules="rules"
              label-width="150px"
              size="small"
            >
              <el-form-item :label="rules.super_email[0].fieldLabel">
                <el-tag
                  :key="tag"
                  v-for="tag in tagSuperEmail"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag, 'super_email')"
                >{{tag}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputSuperEmailVisible"
                  v-model="inputSuperEmailValue"
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter.native="handleInputConfirm('super_email')"
                  @blur="handleInputConfirm('super_email')"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput('super_email')"
                >+ New Super Email</el-button>
              </el-form-item>
              <el-form-item
                :label="rules.upload_email[0].fieldLabel"
                :prop="rules.upload_email[0].prop"
              >
                <el-input v-model="form.upload_email"></el-input>
              </el-form-item>
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
            <div class="box-header-actions">
              <div class="box-title">
                <p>REGIONS SETTING</p>
              </div>
              <div class="box-buttons">
                <el-button size="small" type="primary" @click="newRegion">NEW REGION</el-button>
              </div>
            </div>
          </el-col>

          <el-input size="small" v-model="searchFilterText" @input="filterText"></el-input>
          <el-table :data="pagedTableData" stripe style="width: 100%">
            <el-table-column label="Name" min-width="150px" prop="name" sortable></el-table-column>
            <el-table-column prop="email" label="Email" min-width="150px">
              <template #default="{row}">
                <el-tag :key="email" v-for="email in row.email" disable-transitions>{{email}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="group_email" label="Group Email" min-width="150px">
              <template #default="{row}">
                <el-tag
                  :key="group_email"
                  v-for="group_email in row.group_email"
                  disable-transitions
                >{{group_email}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="Active"
              min-width="150px"
              prop="active"
              :filters="[{ value: 'true', text: 'true' },{ value: 'false', text: 'false' }]"
              :filter-method="filterActive"
              sortable
            ></el-table-column>
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

            <el-table-column align="right" label="Operations">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="editRegion(scope.$index, scope.row)"
                >Edit</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            layout="prev, pager, next"
            :total="listRegion.length"
            @current-change="setPage"
          ></el-pagination>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
  ]
};

export default {
  name: "Setting",
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
      listRegion: [],
      fullscreenLoading: false,
      isLarge: false,
      tagSuperEmail: [],
      inputSuperEmailVisible: false,
      inputSuperEmailValue: "",
      page: 1,
      pageSize: 10,
      searchFilterText: "",
      listClone: []
    };
  },
  methods: {
    async loadSetting() {
      this.form = await this.$commonFunction.getRecord(
        this.getCommonCollection,
        this.getSettingDocument
      );

      this.tagSuperEmail = this.form.super_email;
    },
    async loadRegion(arrQuery) {
      this.fullscreenLoading = true;
      this.listRegion = [];
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
              obj.active = data.active.toString();
              obj.created = data.created.toDate();
              obj.created_by = data.created_by;
              obj.documentId = doc.id;
              this.listRegion.push(obj);
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
          this.form.super_email = this.tagSuperEmail;
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
      this.$router.push("edit-region/-1");
    },
    widthCalculating() {
      if (window.innerWidth > 1000) this.isLarge = true;
      else this.isLarge = false;
    },
    editRegion(idx, item) {
      this.$router.push("edit-region/" + item.documentId);
    },
    handleClose(tag, type) {
      if (type === "super_email") {
        this.tagSuperEmail.splice(this.tagSuperEmail.indexOf(tag), 1);
      }
    },
    showInput(type) {
      if (type === "super_email") {
        this.inputSuperEmailVisible = true;
      }

      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(type) {
      let inputValue = "";
      let isDuplicate = false;
      let arrData = [];

      if (type === "super_email") {
        inputValue = this.inputSuperEmailValue;
        arrData = this.tagSuperEmail;
      }

      if (inputValue) {
        if (this.$commonFunction.validateEmail(inputValue)) {
          if (!arrData) arrData = [];
          if (arrData.indexOf(inputValue) != -1) {
            isDuplicate = true;
          } else {
            arrData.push(inputValue);
          }
        } else {
          this.$commonFunction.alertWarning("Please input valid email");
          return;
        }
      }

      if (isDuplicate) {
        this.$alert("Duplicate data", "Warning", {
          confirmButtonText: "OK"
        });
      } else {
        if (type === "super_email") {
          this.tagSuperEmail = arrData;
        }
      }

      if (type === "super_email") {
        this.inputSuperEmailVisible = false;
        this.inputSuperEmailValue = "";
      }
    },
    setPage(val) {
      this.page = val;
    },
    filterActive(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterText(filters) {
      let val = this.searchFilterText;
      this.listRegion = this.listClone;
      this.listRegion = this.filterdTable(this.listRegion, val, [
        "name",
        "created_by"
      ]);
    },
    filterdTable(list, search, keys) {
      return list.filter(function(item) {
        return keys.some(key =>
          String(item[key])
            .toLowerCase()
            .includes(search)
        );
      });
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
    pagedTableData() {
      return this.listRegion.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
    ...mapGetters([
      "getCommonCollection",
      "getRegionCollection",
      "getSettingDocument"
    ])
  },
  mounted() {
    this.widthCalculating();
    this.listClone = this.listRegion;
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

/* .el-tag + .el-tag {
  margin-left: 10px;
} */

.cell .el-tag + .el-tag {
  /* margin-left: 0px !important; */
  margin-top: 5px;
}
</style>
