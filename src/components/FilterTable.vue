<template>
  <div>
    <el-row class="row-padding">
      <button type="button" @click="toggleFilterToolbar">
        <i class="toggle-class fas fa-search"></i>
      </button>
    </el-row>
    <div id="filter-toolbar" style="display: none;">
      <el-row
        size="small"
        v-for="(andLine, addIndex) in andLines"
        :key="addIndex"
        class="filter-area"
      >
        <el-select
          size="small"
          @change="filerOperWithField(andLines[addIndex], andLines[addIndex].field)"
          v-model="andLines[addIndex].field"
          placeholder="-- Choose field --"
        >
          <el-option
            v-for="(field, fieldIndex) in fieldsQuery"
            :key="fieldIndex"
            :label="field.label"
            :value="field.prop"
          />
        </el-select>
        <el-select size="small" @change="operatorOnChange" v-model="andLines[addIndex].oper" placeholder="-- Oper --">
          <el-option
            v-for="(oper, operIndex) in operators"
            :key="operIndex"
            :label="oper.label"
            :value="oper.type"
          />
        </el-select>
        <el-input size="small" v-if="andLines[addIndex].type === 'string'" v-model="andLines[addIndex].value" />
        <el-select
          size="small"
          v-if="andLines[addIndex].type === 'boolean'"
          v-model="andLines[addIndex].value"
          placeholder="-- Value --"
        >
          <el-option label="True" v-bind:value="true" />
          <el-option label="False" v-bind:value="false" />
        </el-select>
        <el-button size="small" @click="addAndLine">AND</el-button>
        <!-- <el-button @click="addOrLine(addIndex)">OR</el-button> -->
        <el-button size="small" @click="removeAndLine(addIndex)">X</el-button>

        <!-- <div v-for="(orLine, orIndex) in andLines[addIndex].orLines" :key="orIndex">
        <div>
          Or
          <el-select
            v-model="andLines[addIndex].orLines[orIndex].field"
            placeholder="-- Choose field --"
          >
            <el-option label="Test" value="test" />
          </el-select>
          <el-select v-model="andLines[addIndex].orLines[orIndex].oper" placeholder="-- Oper --">
            <el-option
              v-for="(oper, operIndex) in operators"
              :key="operIndex"
              :label="oper.label"
              :value="oper.type"
            />
          </el-select>
          <el-input v-model="andLines[addIndex].orLines[orIndex].value" />
          <el-button @click="removeOrLine(addIndex, orIndex)">X</el-button>
        </div>
        </div>-->
      </el-row>
      <el-row class="row-padding">
        <el-button @click="runFilter" :disabled="isDisabledRunFilter">Run</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FilterTable",
  data() {
    return {
      isDisabledRunFilter: true,
      andLines: [],
      andBlockRemoval: true,
      fieldsQuery: [],
      operators: [],
      operatorMasterData: [
        { type: "==", label: "is", applyTo: ["string", "boolean"] },
        { type: ">", label: "greater than", applyTo: [] },
        { type: "<", label: "less than", applyTo: [] },
        {
          type: ">=",
          label: "greater than or is",
          applyTo: []
        },
        {
          type: "<=",
          label: "less than or is",
          applyTo: []
        },
        { type: "in", label: "is one of", applyTo: ["string"] }
      ]
    };
  },
  watch: {
    andLines() {
      this.andBlockRemoval = this.andLines.length <= 1;
    }
  },
  methods: {
    addAndLine() {
      this.andLines.push({
        field: "",
        oper: "",
        value: "",
        orLines: [],
        type: ''
      });
    },
    addOrLine(addLineIndex) {
      this.andLines[addLineIndex].orLines.push({
        field: "",
        oper: "",
        value: ""
      });
    },
    removeAndLine(lineId) {
      if (!this.andBlockRemoval) {
        this.andLines.splice(lineId, 1);
      } else {
        if(!this.isDisabledRunFilter) this.isDisabledRunFilter = true;
        this.andLines = [];
        this.addAndLine();
      }
    },
    removeOrLine(addLineIndex, orLineIndex) {
      this.andLines[addLineIndex].orLines.splice(orLineIndex, 1);
    },
    runFilter() {
      this.$emit("filterQuery", this.andLines);
    },
    toggleFilterToolbar() {
      var divFilterToolbar = document.getElementById("filter-toolbar");
      if (divFilterToolbar.style.display === "none") {
        divFilterToolbar.style.display = "block";
      } else {
        divFilterToolbar.style.display = "none";
      }

      let classArr = this.$el.querySelector(".toggle-class").classList;
      if (classArr.contains("fa-times"))
        this.$el
          .querySelector(".toggle-class")
          .classList.toggle("fa-search");
      else
        this.$el
          .querySelector(".toggle-class")
          .classList.toggle("fa-times");
    },
    filerOperWithField(andLine, val) {
      let findType = this.fieldsQuery.filter(x => x.prop === val);

      if (findType && findType.length === 1) {
        andLine.type = findType[0].type;
        this.operators = this.operatorMasterData
          .filter(x => x.applyTo.indexOf(findType[0].type) !== -1)
          .map(x => x);
      }
    },
    operatorOnChange() {
      if(this.isDisabledRunFilter) this.isDisabledRunFilter = false;
    }
  },
  mounted() {
    this.fieldsQuery = this.getFieldsQuery;
    this.addAndLine();
  },
  computed: {
    ...mapGetters(["getFieldsQuery"])
  }
};
</script>

<style scoped>
.row-padding {
  padding: 10px 0;
}

.row-padding > button {
  border: none;
  background-color: #fff;
}

.filter-area {
  padding: 5px 0;
}

.filter-area > .el-input {
  width: auto;
}
</style>