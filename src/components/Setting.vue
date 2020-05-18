<template>
  <div class="body-wrap">
    <el-container>
      <el-main>
        <el-row>
          <el-col
            :xl="{span: 16, offset: 4}"
            :lg="{span: 16, offset: 4}"
            :md="{span: 16, offset: 4}"
            :sm="{span: 16, offset: 4}"
          >
            <h3>Setting</h3>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="Super Email">
                <el-input v-model="form.superEmail"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSave">Save</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xl="{span: 16, offset: 4}"
            :lg="{span: 16, offset: 4}"
            :md="{span: 16, offset: 4}"
            :sm="{span: 16, offset: 4}"
          >
            <h3>Region</h3>
            <el-button type="primary" @click="toggleFilterToolbar">Show/Hide</el-button>
            <div id="filter-toolbar">
              <el-dropdown>
                <span class="el-dropdown-link">
                  -- Choose field --
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Test</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown>
                <span class="el-dropdown-link">
                  -- Oper --
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Test</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown>
                <span class="el-dropdown-link">
                  -- Value --
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Test</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button>AND</el-button>
              <el-button>OR</el-button>
              <el-button>X</el-button>
            </div>
            <el-table :data="regionData" stripe style="width: 100%">
              <el-table-column
                v-for="column in columns"
                :key="column.label"
                :prop="column.prop"
                :label="column.label"
                :min-width="column.minWidth"
                :formatter="column.formatter"
              >
                <template slot-scope="scope" v-if="column.formatter === true">
                  <el-tag
                    :type="scope.row.name === 'Test' ? 'primary' : 'success'"
                    close-transition
                  >{{scope.row.tag}}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      form: {
        superEmail: ""
      },
      columns: [
        {
          prop: "name",
          label: "Name",
          minWidth: "180px",
          formatter: true
        },
        {
          prop: "created",
          label: "Created",
          minWidth: "180px"
        },
        {
          prop: "created_by",
          label: "Created By",
          minWidth: "180px"
        },
        {
          prop: "updated",
          label: "Updated",
          minWidth: "180px"
        },
        {
          prop: "updated_by",
          label: "Updated By",
          minWidth: "180px"
        }
      ],
      regionData: []
    };
  },
  methods: {
    loadSuperEmail() {
      this.$db
        .collection(this.$store.state.collections.common)
        .doc(this.$store.state.documents.superEmail)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            let data = snapshot.data();
            this.form.superEmail = data.email;
          } else {
            // snapshot.data() will be undefined in this case
            console.log("No such document!");
          }
        });
    },
    loadRegion() {
      this.$db
        .collection(this.$store.state.collections.region)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            let obj = {};
            var data = doc.data();
            obj.name = data.name;
            obj.created = this.$commonFunction.formatDate(
              data.created.toDate()
            );
            obj.created_by = data.created_by;
            obj.updated = this.$commonFunction.formatDate(
              data.updated.toDate()
            );
            obj.updated_by = data.updated_by;
            obj.documentId = doc.id;
            this.regionData.push(obj);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSave() {
      console.log("submit!");
    },
    toggleFilterToolbar() {
      $("#filter-toolbar").toggle();
    }
  },
  created() {
    this.loadSuperEmail();
    this.loadRegion();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body-wrap {
  background: #fff;
}
</style>
