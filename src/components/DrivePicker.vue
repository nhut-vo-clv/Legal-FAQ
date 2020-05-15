<template>
  <div>
    <el-button type="primary" round @click="onApiLoad()">Drive</el-button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "DrivePicker",
  data() {
    return {
      pickerApiLoaded: false,
      developerKey: this.$store.state.apiKey,
      userToken: localStorage.getItem("user_token")
    };
  },
  methods: {
    onApiLoad() {
      console.log('ABC: ' + this.userToken);
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
    let gDrive = document.createElement("script");
    gDrive.setAttribute("type", "text/javascript");
    gDrive.setAttribute("src", "https://apis.google.com/js/api.js");
    document.head.appendChild(gDrive);
  }
};
</script>
