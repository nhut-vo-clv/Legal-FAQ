<template>
  <div class="body-wrap">
    <el-container>
      <el-main>
        <el-col :xl="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :md="{span: 16, offset: 4}">
          <div class="box-header-actions">
            <div class="box-title">
              <div>Make Request</div>
            </div>
            <div class="box-buttons">
              <el-button size="small" type="primary" @click="onSubmit('formMakeRequest')">Submit</el-button>
            </div>
          </div>
          <div class="header-title center-item">General Info</div>
          <el-form
            label-position="left"
            ref="formMakeRequest"
            :model="form"
            :rules="rules"
            label-width="120px"
            size="small"
          >
            <el-form-item :label="rules.id[0].fieldLabel" :prop="rules.id[0].prop">
              <el-input v-model="form.id" disabled></el-input>
            </el-form-item>
            <el-form-item :label="rules.category[0].fieldLabel" :prop="rules.category[0].prop">
              <el-select
                size="small"
                @change="categoryOnChange"
                v-model="form.category"
                placeholder="Please select Category"
              >
                <el-option
                  v-for="(category, idx) in listCategory"
                  :key="idx"
                  :label="category.name"
                  :value="category.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="rules.requester_name[0].fieldLabel"
              :prop="rules.requester_name[0].prop"
            >
              <el-input v-model="form.requester_name"></el-input>
            </el-form-item>
            <el-form-item
              :label="rules.requester_title[0].fieldLabel"
              :prop="rules.requester_title[0].prop"
            >
              <el-input v-model="form.requester_title"></el-input>
            </el-form-item>
            <el-form-item
              :label="rules.requester_section[0].fieldLabel"
              :prop="rules.requester_section[0].prop"
            >
              <el-input v-model="form.requester_section"></el-input>
            </el-form-item>
            <el-form-item
              :label="rules.requester_country[0].fieldLabel"
              :prop="rules.requester_country[0].prop"
            >
              <el-input v-model="form.requester_country"></el-input>
            </el-form-item>
            <el-form-item :label="rules.email[0].fieldLabel" :prop="rules.email[0].prop">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item
              :label="rules.contact_number[0].fieldLabel"
              :prop="rules.contact_number[0].prop"
            >
              <el-input v-model="form.contact_number"></el-input>
            </el-form-item>
            <el-form-item :label="rules.request_to[0].fieldLabel" :prop="rules.request_to[0].prop">
              <el-input v-model="form.request_to"></el-input>
            </el-form-item>
            <el-form-item :label="rules.copy_to[0].fieldLabel" :prop="rules.copy_to[0].prop">
              <el-input v-model="form.copy_to"></el-input>
            </el-form-item>
            <el-form-item
              :label="rules.request_date[0].fieldLabel"
              :prop="rules.request_date[0].prop"
            >
              <el-input v-model="form.request_date"></el-input>
            </el-form-item>
            <hr />
            <div class="header-title center-item">Details of Request</div>
            <el-form-item :label="rules.summary[0].fieldLabel" :prop="rules.summary[0].prop">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                v-model="form.summary"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="rules.request_type[0].fieldLabel"
              :prop="rules.request_type[0].prop"
            >
              <el-select v-model="form.request_type" placeholder="Please select Category">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <hr />
            <div class="header-title center-item">Comments</div>
            <el-form-item :label="rules.risk_to[0].fieldLabel" :prop="rules.risk_to[0].prop">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                v-model="form.risk_to"
              ></el-input>
            </el-form-item>
            <el-form-item :label="rules.comment[0].fieldLabel" :prop="rules.comment[0].prop">
              <editor></editor>
            </el-form-item>
            <el-form-item
              :label="rules.commenter_name[0].fieldLabel"
              :prop="rules.commenter_name[0].prop"
            >
              <el-input v-model="form.commenter_name"></el-input>
            </el-form-item>
            <el-form-item
              :label="rules.commenter_title[0].fieldLabel"
              :prop="rules.commenter_title[0].prop"
            >
              <el-input v-model="form.commenter_title"></el-input>
            </el-form-item>
            <el-form-item :label="rules.remark[0].fieldLabel" :prop="rules.remark[0].prop">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Editor from "../elements/Editor";

let arrProp = {
  id: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "ID",
      prop: "id"
    }
  ],
  category: [
    {
      required: true,
      elmType: "dropdown",
      fieldLabel: "Category",
      prop: "category"
    }
  ],
  requester_name: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Requester Name",
      prop: "requester_name"
    }
  ],
  requester_title: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Requester Title",
      prop: "requester_title"
    }
  ],
  requester_section: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Requester Section",
      prop: "requester_section"
    }
  ],
  requester_country: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Requester Country",
      prop: "requester_country"
    }
  ],
  email: [
    {
      required: true,
      elmType: "string",
      fieldLabel: "Email Address",
      prop: "email"
    }
  ],
  contact_number: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Contact Number",
      prop: "contact_number"
    }
  ],
  request_to: [
    {
      required: true,
      elmType: "string",
      fieldLabel: "Request to",
      prop: "request_to"
    }
  ],
  copy_to: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Copy to",
      prop: "copy_to"
    }
  ],
  request_date: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Request Date (YYYY-MM-DD)",
      prop: "request_date"
    }
  ],
  summary: [
    {
      required: true,
      elmType: "string",
      fieldLabel:
        "What would you like to request?\r\n(Summary of your inquiry)",
      prop: "summary"
    }
  ],
  request_type: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Type of Request",
      prop: "request_type"
    }
  ],
  risk_to: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Risk to ONE",
      prop: "risk_to"
    }
  ],
  comment: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Comment",
      prop: "comment"
    }
  ],
  commenter_name: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Commenter Name",
      prop: "commenter_name"
    }
  ],
  commenter_title: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Commenter Title & Section",
      prop: "commenter_title"
    }
  ],
  remark: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Remark",
      prop: "remark"
    }
  ]
};

export default {
  name: "MakeRequest",
  components: {
    Editor
  },
  data() {
    return {
      form: this.$commonFunction.getFormPorp(arrProp),
      rules: this.$commonFunction.getRuleValidation(arrProp),
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
        this.listCategory.push(doc.data());
      });

      this.listCategory.sort(function(a, b) {
        return a.order - b.order;
      });
    },
    categoryOnChange() {},
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.form.active = true;
          await this.$commonFunction.insertRecord(
            this.getRequestCollection,
            this.form
          );
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.loadCategory();
    //await this.$commonFunction.getGSuiteUserInfo();
  },
  computed: {
    ...mapGetters(["getCategoryMasterDataCollection", "getRequestCollection"])
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
  transform: translateY(50%);
  padding-right: 20px;
  font-size: 18px;
  color: #bd0f72;
  font-weight: bold;
}

.box-details {
  transform: translateY(20%);
  padding-right: 20px;
}
</style>
