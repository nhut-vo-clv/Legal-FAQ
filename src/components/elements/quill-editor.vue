<template>
  <!-- Two-way Data-Binding -->
  <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
  />

  <!-- Or manually control the data synchronization -->
  <!-- <quill-editor :content="content" :options="editorOption" @change="onEditorChange($event)" /> -->
</template>

<script>
// You can also register Quill modules in the component
// import Quill from "quill";
// import someModule from "../yourModulePath/someQuillModule.js";
// Quill.register("modules/someModule", someModule);
import { quillEditor } from "vue-quill-editor";

const toolbarOptions = [
  [
    {
      bold: {
        attributes: {
          "data-toggle": "tooltip",
          "data-placement": "bottom",
          title: "Bold"
        }
      }
    },
    "italic",
    "underline",
    "strike"
  ]
  // other options..
];

export default {
  name: "editor-component",
  components: {
    quillEditor
  },
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"],
            // [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }]
            // [{ font: [] }]
          ]
          //   syntax: {
          //     highlight: text => hljs.highlightAuto(text).value
          //   }
        }
      }
    };
  },
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  }
};
</script>


<style lang="css">
.ql-toolbar {
  border-radius: 4px 4px 0 0;
}

.ql-toolbar .ql-formats {
  line-height: 14px !important;
}

.ql-container {
  border-radius: 0 0 4px 4px;
  border: 1px solid #dcdfe6;
}

.ql-container .ql-editor {
  border-radius: 0 0 4px 4px;
}

.ql-container:focus-within {
  border: 0.5px solid #bd0f72;
}

/* 
.ql-container .ql-editor:focus {
  border: 0.5px solid #bd0f72;
} */
</style>