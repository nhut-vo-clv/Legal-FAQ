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
            <el-form ref="formRegion" :model="form" :rules="rules" label-width="120px">
              <el-form-item :label="rules.name[0].fieldLabel" :prop="rules.name[0].prop">
                <el-input v-model="form.name" size="small"></el-input>
              </el-form-item>
              <el-form-item label="Email">
                <el-tag
                  :key="tag"
                  v-for="tag in tagEmail"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag, 'email')"
                >{{tag}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputEmailVisible"
                  v-model="inputEmailValue"
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter.native="handleInputConfirm('email')"
                  @blur="handleInputConfirm('email')"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput('email')"
                >+ New Tag</el-button>
              </el-form-item>
              <el-form-item label="Group Email">
                <el-tag
                  :key="tag"
                  v-for="tag in tagGroupEmail"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag, 'group_email')"
                >{{tag}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputGroupEmailVisible"
                  v-model="inputGroupEmailValue"
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter.native="handleInputConfirm('group_email')"
                  @blur="handleInputConfirm('group_email')"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput('group_email')"
                >+ New Tag</el-button>
              </el-form-item>
            </el-form>
            <div class="center-item">
              <el-button type="primary" @click="onSubmit('formRegion')" size="small">Save</el-button>
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
    let arrProp = {
      name: [{ required: true, elmType: "string", fieldLabel: 'Name', prop: 'name' }]
    };
    return {
      form: this.$commonFunction.getFormPorp(arrProp),
      rules: this.$commonFunction.getRuleValidation(arrProp),
      tagEmail: [],
      tagGroupEmail: [],
      paramDocId: this.$route.params.id,
      fullscreenLoading: false,
      inputEmailVisible: false,
      inputEmailValue: "",
      inputGroupEmailVisible: false,
      inputGroupEmailValue: "",
      isNewRecord: "isNew"
    };
  },

  methods: {
    async loadRegionData() {
      this.fullscreenLoading = true;
      this.form = await this.$commonFunction.getRecord(
        this.getRegionCollection,
        this.paramDocId
      );
      this.tagEmail = this.form.email;
      this.tagGroupEmail = this.form.group_email;
      this.fullscreenLoading = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.fullscreenLoading = true;
          this.form.email = this.tagEmail;
          this.form.group_email = this.tagGroupEmail;

          if (this.paramDocId !== this.isNewRecord)
            await this.$commonFunction.updateRecord(
              this.getRegionCollection,
              this.paramDocId,
              this.form
            );
          else
            await this.$commonFunction.insertRecord(
              this.getRegionCollection,
              this.form
            );
          this.fullscreenLoading = false;
        } else {
          return false;
        }
      });
    },
    handleClose(tag, type) {
      if (type === "email") {
        this.tagEmail.splice(this.tagEmail.indexOf(tag), 1);
      } else if (type === "group_email") {
        this.tagGroupEmail.splice(this.tagGroupEmail.indexOf(tag), 1);
      }
    },
    showInput(type) {
      if (type === "email") {
        this.inputEmailVisible = true;
      } else if (type === "group_email") {
        this.inputGroupEmailVisible = true;
      }

      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(type) {
      let inputValue = "";
      let isDuplicate = false;
      let arrData = [];

      if (type === "email") {
        inputValue = this.inputEmailValue;
        arrData = this.tagEmail;
      } else if (type === "group_email") {
        inputValue = this.inputGroupEmailValue;
        arrData = this.tagGroupEmail;
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
        if (type === "email") {
          this.tagEmail = arrData;
        } else if (type === "group_email") {
          this.tagGroupEmail = arrData;
        }
      }

      if (type === "email") {
        this.inputEmailVisible = false;
        this.inputEmailValue = "";
      } else if (type === "group_email") {
        this.inputGroupEmailVisible = false;
        this.inputGroupEmailValue = "";
      }
    }
  },
  created() {
    if (this.paramDocId !== this.isNewRecord) this.loadRegionData();
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

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>