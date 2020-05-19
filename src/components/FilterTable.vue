<template>
  <div>
    <i @click="toggleFilterToolbar" class="el-icon-share"></i>
    <div v-for="(andLine, addIndex) in andLines" :key="addIndex" id="filter-toolbar">
      <div>
        <el-select v-model="andLines[addIndex].field" placeholder="-- Choose field --">
          <el-option label="Test" value="test"/>
        </el-select>
        <el-select v-model="andLines[addIndex].oper" placeholder="-- Oper --">
          <el-option v-for="(oper, operIndex) in operators" :key="operIndex" :label="oper.label" :value="oper.type"/>
        </el-select>
        <el-input v-model="andLines[addIndex].value"/>
        <el-button @click="addAndLine">AND</el-button>
        <el-button @click="addOrLine(addIndex)">OR</el-button>
        <el-button @click="removeAndLine(addIndex)">X</el-button>
      </div>

      <div v-for="(orLine, orIndex) in andLines[addIndex].orLines" :key="orIndex">
        <div>
          Or
          <el-select v-model="andLines[addIndex].orLines[orIndex].field" placeholder="-- Choose field --">
          <el-option label="Test" value="test"/>
        </el-select>
        <el-select v-model="andLines[addIndex].orLines[orIndex].oper" placeholder="-- Oper --">
          <el-option v-for="(oper, operIndex) in operators" :key="operIndex" :label="oper.label" :value="oper.type"/>
        </el-select>
        <el-input v-model="andLines[addIndex].orLines[orIndex].value"/>
          <el-button @click="removeOrLine(addIndex, orIndex)">X</el-button>
        </div>
      </div>
    </div>
    <el-button @click="runFilter">Run</el-button>
  </div>
</template>

<script>
export default {
  name: "FilterTable",
  data() {
    return {
      andLines: [],
      andBlockRemoval: true,
      operators: [
        { type: '=', label: 'is', apply_to: ['number', 'string'] },
        { type: '!=', label: 'is not', apply_to: ['number', 'string'] },
        { type: '>', label: 'greater than', apply_to: ['number', 'string'] },
        { type: '<', label: 'less than', apply_to: ['number', 'string'] },
        { type: '>=', label: 'greater than or is', apply_to: ['number', 'string'] },
        { type: '<=', label: 'less than or is', apply_to: ['number', 'string'] },
        { type: 'contains', label: 'contains', apply_to: ['string'] },
        { type: 'begins_with', label: 'starts with', apply_to: ['string'] },
        { type: 'ends with', label: 'ends with', apply_to: ['string'] },
        { type: 'in', label: 'is one of', apply_to: ['string'] }
    ],
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
        orLines: []
      });
    },
    addOrLine(addLineIndex) {
      this.andLines[addLineIndex].orLines.push({
        field: "",
        oper: "",
        value: ""
      });

      console.log(this.andLines);
    },
    removeAndLine(lineId) {
      if (!this.andBlockRemoval) {
        this.andLines.splice(lineId, 1);
      }
    },
    removeOrLine(addLineIndex, orLineIndex) {
      this.andLines[addLineIndex].orLines.splice(orLineIndex, 1);
    },
    runFilter() {
        let query = '';
        let andKey = 'AND';
        let orKey = 'OR';
        for(let i in this.andLines){
            if(query) query += andKey;
            query += this.andLines[i].field + this.andLines[i].oper + this.andLines[i].value;
            for(let j in this.andLines[i].orLines){
                query += orKey + this.andLines[i].field + this.andLines[i].oper + this.andLines[i].value;
            }
        }
        alert(query);
    },
    toggleFilterToolbar() {
      $("#filter-toolbar").toggle();
    }
  },
  mounted() {
    this.addAndLine();
    console.log(this.andLines);
  }
};
</script>