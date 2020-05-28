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
            <h3 class="title title-large">Welcome to Legal FAQ Portal</h3>
            <img class="iamge-center" src="/static/laptop-3196481__340.jpg" alt="Girl in a jacket" />
            <p>If you have legal/insurance inquiries, please raise a request through this portal.</p>
            <h5 class="title-red">How to use this portal</h5>
            <h5 class="title-red-table">1. Search past inquiries.</h5>
            <p>First, check whether similar inquiry already exist under “Published FAQ”.</p>
            <img class="iamge-center" src="/static/laptop-3196481__340.jpg" alt="Girl in a jacket" />
            <h5 class="title-red-table">2. Raise a request</h5>
            <p>Send an inquiry from “MAKE REQUEST”.</p>
            <img class="iamge-center" src="/static/laptop-3196481__340.jpg" alt="Girl in a jacket" />
            <h5 class="title-red-table">2-1. Make a Request</h5>
            <p>Click “MAKE REQUEST”. Fill in the information of your request and click "Submit".</p>
            <p>E-mail will be sent to GHQ or RHQ legal/insurance team.</p>
            <img class="iamge-center" src="/static/laptop-3196481__340.jpg" alt="Girl in a jacket" />
            <h5 class="title-red-table">2-2. Response from Legal/Insurance team</h5>
            <p>When legal/insurance team reply to your request, you will receive e-mail. You can check the response from link in e-mail.</p>
            <img class="iamge-center" src="/static/laptop-3196481__340.jpg" alt="Girl in a jacket" />
            <h5 class="title-red-table">2-3. Confirmation</h5>
            <p>If you have additional inquiry, please append inquiry and click “Submit”.</p>
            <img class="iamge-center" src="/static/laptop-3196481__340.jpg" alt="Girl in a jacket" />
            <p>If reply is OK, please just click "Confirm" to close request.</p>
            <img class="iamge-center" src="/static/laptop-3196481__340.jpg" alt="Girl in a jacket" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      homepage_content: "",
      fullscreenLoading: false
    };
  },
  methods: {
    async getHomePageContent() {
      this.fullscreenLoading = true;
      await this.$commonFunction
        .getRecord(this.getCommonCollection, this.getSettingDocument)
        .then(data => {
          this.homepage_content = data.homepage_content;
          this.fullscreenLoading = false;
        });
    }
  },
  computed: {
    ...mapGetters(["getCommonCollection", "getSettingDocument"])
  },
  created() {
    this.getHomePageContent();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  font-size: 30px;
  font-weight: 600;
  padding: 40px;
  color: #bd0f72;
  text-align: center;
  background: #fff;
  line-break: auto;
}

.body-wrap {
  background: #fff;
}

.title {
  font-weight: 700;
  padding-top: 15px;
}

.title-large {
  text-align: center;
}

.title-large,
.title-red {
  color: #bd0f72;
  text-transform: uppercase;
  margin: 20px 0;
}

.title-red-table {
  text-decoration: underline;
  color: #bd0f72;
  text-transform: uppercase;
  margin: 20px 0;
}

.iamge-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  max-width: 90%;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
}
</style>
