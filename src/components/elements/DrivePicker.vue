<template>
  <div>
    <el-button type="primary" round @click="onApiLoad()">Drive</el-button>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "DrivePicker",
  data() {
    return {
      pickerApiLoaded: false,
      developerKey: this.$store.state.apiKey,
      userToken: ""
    };
  },
  methods: {
    onApiLoad() {
      gapi.load("picker", this.onPickerApiLoad);
    },
    onPickerApiLoad() {
      this.pickerApiLoaded = true;
      this.createPicker();
    },
    createPicker() {
      if (this.pickerApiLoaded && this.userToken) {
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        var picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .addView(view)
          .addView(new google.picker.DocsUploadView())
          .setOAuthToken(this.userToken)
          .setDeveloperKey(this.developerKey)
          .setCallback(this.pickerCallback)
          .build();
        picker.setVisible(true);
      }
    },
    async pickerCallback(data) {
      if (data.action == google.picker.Action.PICKED) {
        console.log(data);
      }
    }
  },
  mounted() {
    /**
     Load user access token (S)
    **/
    this.$db
      .collection(this.getUserInfoCollection)
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          this.userToken = snapshot.docs[0].data().access_token;
        }
      });
    /**
     Load user access token (E)
    **/

    /**
     Load Google Api Lib (S)
    **/
    let gAPI = document.createElement("script");
    gAPI.setAttribute("type", "text/javascript");
    gAPI.setAttribute("src", "https://apis.google.com/js/api.js");
    document.head.appendChild(gAPI);
    /**
     Load Google Api Lib (E)
    **/
  },
  computed: {
    ...mapGetters(["getUserInfoCollection"])
  }
};
</script>
