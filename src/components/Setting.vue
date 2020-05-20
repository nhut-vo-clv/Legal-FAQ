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
            <FilterTable v-on:filterQuery="loadRegion" />
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
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FilterTable from "./FilterTable";

export default {
  name: "Setting",
  components: {
    FilterTable
  },
  data() {
    return {
      form: {
        superEmail: ""
      },
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
          activeFilterQuery: true
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
    loadSuperEmail() {
      this.$db
        .collection(this.getCommonCollection)
        .doc(this.getSuperEmailDocument)
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
    loadRegion(query) {
      var ref = this.$db.collection(this.getRegionCollection);

      for (var i = 0; i < 2; i++) {
        ref = ref.where("name", "==", "Test");
      }
        ref.get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            let obj = {};
            var data = doc.data();
            obj.name = data.name;
            obj.created = data.created.toDate();
            obj.created_by = data.created_by;
            obj.updated = data.updated.toDate();
            obj.updated_by = data.updated_by;
            obj.documentId = doc.id;
            this.regionData.push(obj);
          });
          this.fullscreenLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSave() {}
  },
  async created() {
    this.fullscreenLoading = true;
    this.$store.commit(
      "SET_FIELDS_QUERY",
      this.columns.filter(x => x.activeFilterQuery === true).map(x => x)
    );
    this.loadSuperEmail();
    this.loadRegion();
  },
  computed: {
    ...mapGetters([
      "getCommonCollection",
      "getRegionCollection",
      "getSuperEmailDocument"
    ])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body-wrap {
  background: #fff;
}
</style>
