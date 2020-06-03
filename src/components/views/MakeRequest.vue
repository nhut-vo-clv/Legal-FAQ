<template>
  <div class="body-wrap">
    <el-container v-loading.fullscreen.lock="fullscreenLoading">
      <el-main>
        <el-col
          id="header-actions"
          :xl="{span: 16, offset: 4}"
          :lg="{span: 16, offset: 4}"
          :md="{span: 16, offset: 4}"
        >
          <div class="box-header-actions">
            <div class="box-title" v-if="isNewRecord == paramDocId">
              <div>NEW REQUEST</div>
            </div>
            <div class="box-details" v-if="isNewRecord != paramDocId">
              <el-page-header @back="goBack" :content="form.id"></el-page-header>
            </div>
            <div class="box-buttons">
              <el-button size="small" type="primary" @click="onSubmit('formMakeRequest')">SUBMIT</el-button>
              <el-button v-if="isNewRecord != paramDocId" size="small" @click="goBack">CANCEL</el-button>
            </div>
          </div>
        </el-col>
        <el-col :xl="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :md="{span: 16, offset: 4}">
          <el-divider>GENERAL INFO</el-divider>
          <el-form
            :label-position="labelPosition"
            ref="formMakeRequest"
            :model="form"
            :rules="rules"
            label-width="140px"
            size="small"
          >
            <el-form-item :label="rules.id[0].fieldLabel" :prop="rules.id[0].prop">
              <el-input
                v-model="form.id"
                disabled
                placeholder="ID will be automatic created after submit the request"
              ></el-input>
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
              <el-select size="small" v-model="form.request_to" placeholder="Please select Region">
                <el-option
                  v-for="(region, idx) in listRegion"
                  :key="idx"
                  :label="region.name"
                  :value="region.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="rules.copy_to[0].fieldLabel">
              <el-tag
                :key="tag"
                v-for="tag in tagCopyTo"
                closable
                :disable-transitions="false"
                @close="handleCloseCopyTo(tag)"
              >{{tag}}</el-tag>
              <el-autocomplete
                v-model="inputCopyToValue"
                :fetch-suggestions="querySearchUser"
                @select="handleSelectUser"
                :trigger-on-focus="false"
                v-if="inputCopyToVisible"
              >
                <template slot-scope="{item}">
                  <div class="auto-completed-list">
                    <el-avatar class="user-image" :size="35" :src="buildCopyToInfor(item, 1)"></el-avatar>
                    <div class="user-info">
                      <div class="user-name">{{ buildCopyToInfor(item, 3) }}</div>
                      <div class="user-title">{{ buildCopyToInfor(item, 4) }}</div>
                      <div class="user-value">{{ buildCopyToInfor(item, 5) }}</div>
                    </div>
                  </div>
                </template>
              </el-autocomplete>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showCopyToInput"
              >+ New Email</el-button>
            </el-form-item>
            <el-form-item
              :label="rules.request_date[0].fieldLabel"
              :prop="rules.request_date[0].prop"
            >
              <el-input
                v-model="form.request_date"
                disabled
                placeholder="Format will be YYYY-MM-DD"
              ></el-input>
            </el-form-item>
            <el-divider>DETAILS OF REQUEST</el-divider>

            <el-form-item :label="rules.summary[0].fieldLabel" :prop="rules.summary[0].prop">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                v-model="form.summary"
                placeholder="Summary of your inquiry"
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
            <el-form-item label="Attachment">
              <i class="el-icon-paperclip attachment-icon" @click="onApiLoad"></i>
              <el-table
                border
                v-if="listFileUpload.length > 0"
                :data="listFileUpload"
                style="width: 100%"
              >
                <el-table-column prop="file_name" label="File name">
                  <template #default="{row}">
                    <a :href="row.file_url" target="_blank">{{row['file_name']}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="created" label="Uploaded date" width="160">
                  <template #default="{row}">{{$commonFunction.formatDate(row["created"].toDate())}}</template>
                </el-table-column>
                <el-table-column prop="created" label="Operations" width="130">
                  <template #default="{row}">
                    <el-tooltip content="Download Attachment" placement="top">
                      <el-button
                        type="success"
                        icon="el-icon-download"
                        circle
                        @click="downloadFile(row['file_id'], row['file_name'], row['file_url'])"
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip content="Delete Attachment" placement="top">
                      <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>

            <el-divider>COMMENTS</el-divider>

            <el-form-item :label="rules.risk_to[0].fieldLabel" :prop="rules.risk_to[0].prop">
              <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                v-model="form.risk_to"
              ></el-input>
            </el-form-item>
            <el-form-item :label="rules.comment[0].fieldLabel" :prop="rules.comment[0].prop">
              <!-- <editor v-on:editorContent="getEditorContent" v-model="commentContent"></editor> -->
              <editor-component v-on:editorContent="getEditorContent" v-model="commentContent"></editor-component>
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
            <div>
              <el-divider v-if="listComment.length > 0">COMMENT LOGS</el-divider>
              <el-timeline>
                <el-timeline-item
                  v-for="(comment, idx) in listComment"
                  :key="idx"
                  :timestamp="comment.commenter_name + ' - ' + $commonFunction.formatDate(comment.created.toDate())"
                  :color="comment.isLegalTeam ? '#bd0f72' : '#FFFF00'"
                  placement="top"
                >
                  <el-card class="comment-card">
                    <p>From: {{ comment.isLegalTeam ? 'Legal Team' : 'Requester' }}</p>
                    <p>Title & Section: {{ comment.title_section }}</p>
                    <p>Comment:</p>
                    <div class="ql-container ql-snow ql-comment-show">
                      <div class="ql-editor">
                        <div v-html="comment.value"></div>
                      </div>
                    </div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
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
// import Editor from "../elements/Editor";
import EditorComponent from "../elements/quill-editor";

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
      elmType: "array",
      fieldLabel: "Copy to",
      prop: "copy_to"
    }
  ],
  request_date: [
    {
      required: false,
      elmType: "string",
      fieldLabel: "Request Date",
      prop: "request_date"
    }
  ],
  summary: [
    {
      required: true,
      elmType: "string",
      fieldLabel: "What would you like to request?",
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
      fieldLabel: "Title & Section",
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
    // Editor,
    EditorComponent
  },
  data() {
    return {
      form: this.$commonFunction.getFormPorp(arrProp),
      rules: this.$commonFunction.getRuleValidation(arrProp),
      paramDocId: this.$route.params.id,
      listCategory: [],
      listRegion: [],
      listComment: [],
      tagCopyTo: [],
      inputCopyToVisible: false,
      inputCopyToValue: "",
      isNewRecord: "isNew",
      commentContent: "",
      fullscreenLoading: true,
      pickerApiLoaded: false,
      driveFolder: "",
      listFileUpload: [],
      masterDataFileType: {
        docx: ["document", "docx", "odt", "rtf", "pdf", "txt", "zip", "epub"],
        xlsx: ["spreadsheets", "xlsx", "ods", "pdf", "zip"],
        pptx: ["presentation", "pptx", "odp", "pdf", "txt"],
        drawings: ["drawings", "pdf", "jpg", "png", "svg"]
      },
      specialDriveDownloadFile: [
        "document",
        "spreadsheets",
        "presentation",
        "drawings"
      ],
      labelPosition: "right",
      navbar: "",
      sticky: 0
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
    async loadRegion() {
      this.listRegion = [];
      let arrQuery = [
        {
          field: "active",
          oper: "==",
          value: "true",
          type: "boolean"
        }
      ];

      let arrData = await this.$commonFunction.getList(
        this.getRegionCollection,
        arrQuery
      );

      arrData.forEach(doc => {
        this.listRegion.push(doc.data());
      });
    },
    async loadRequest() {
      this.form = await this.$commonFunction.getRecord(
        this.getRequestCollection,
        this.paramDocId
      );

      this.tagCopyTo = this.form.copy_to;
      this.form.request_date = this.$commonFunction.formatDate(
        this.form.created.toDate()
      );

      this.driveFolder = this.form.upload_folder_id
        ? this.form.upload_folder_id
        : "";

      await this.loadComment(this.paramDocId);
      await this.loadFileUpload();
    },
    loadComment(requestId) {
      return new Promise(async (resolve, reject) => {
        this.listComment = [];
        let arrQuery = [
          {
            field: "active",
            oper: "==",
            value: "true",
            type: "boolean"
          },
          {
            field: "request_id",
            oper: "==",
            value: requestId
          }
        ];

        let arrData = await this.$commonFunction.getList(
          this.getCommentCollection,
          arrQuery
        );

        arrData.forEach(doc => {
          console.log(doc.data());
          this.listComment.push(doc.data());
        });
        resolve(true);
      });
    },
    async loadUserInfo() {
      let user = await this.$commonFunction.getGSuiteUserInfo();

      this.form.requester_name = user.name.fullName;
      this.form.commenter_name = user.name.fullName;
      this.form.email = user.primaryEmail;

      if (user.organizations && user.organizations[0].title) {
        this.form.requester_title = user.organizations[0].title;
      }

      if (user.organizations && user.organizations[0].department) {
        this.form.requester_section = user.organizations[0].department;
      }

      this.form.commenter_title =
        this.form.requester_title === ""
          ? this.form.requester_section
          : this.form.requester_section === ""
          ? this.form.requester_title
          : this.form.requester_title + " & " + this.form.requester_section;

      if (
        user.customSchemas &&
        user.customSchemas.ONE &&
        user.customSchemas.ONE.Country
      ) {
        this.form.requester_country = user.customSchemas.ONE.Country;
      }
      this.fullscreenLoading = false;
    },
    categoryOnChange() {},
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let insertFlag = false;
          let insertDocId = "";
          this.form.copy_to = this.tagCopyTo;
          this.form.upload_folder_id = this.driveFolder;

          if (this.paramDocId !== this.isNewRecord) {
            // Update request
            await this.$commonFunction.updateRecord(
              this.getRequestCollection,
              this.paramDocId,
              this.form
            );
          } else {
            // Insert new request
            this.form.id = await this.$commonFunction.getRunningNumber();
            this.form.active = true;
            this.form.status = this.getRequestStatusNew;
            this.form.publish = false;

            insertDocId = await this.$commonFunction.insertRecord(
              this.getRequestCollection,
              this.form
            );
            insertFlag = true;
          }

          if (this.driveFolder) {
            //let folderName = await this.getFolderName(this.driveFolder);
            /*if (folderName !== this.form.id) {
              await this.updateFolderName(this.driveFolder, this.form.id);
            }*/
          }

          if (this.commentContent) {
            let objComment = {};
            objComment.active = true;
            objComment.isLegalTeam = true;
            objComment.request_id = this.paramDocId;
            objComment.value = this.commentContent;

            await this.$commonFunction.insertRecord(
              this.getCommentCollection,
              objComment
            );

            await this.loadComment(this.paramDocId);
          }

          if (insertFlag) {
            this.$router.replace({
              name: "MakeRequest",
              params: { id: insertDocId }
            });
            this.paramDocId = insertDocId;
          }
        } else {
          return false;
        }
      });
    },
    async querySearchUser(queryString, cb) {
      let arrUser = await this.$commonFunction.searchUserInDomain(queryString);
      let arrData = [];

      for (let i in arrUser.users) {
        let user = arrUser.users[i];
        let obj = {};

        obj.fullName = user.name.fullName;
        obj.value = user.primaryEmail;

        if (user.organizations) {
          obj.userTitle = user.organizations[0].title;
        } else {
          obj.userTitle = "";
        }

        if (user.thumbnailPhotoUrl) {
          obj.photo = user.thumbnailPhotoUrl;
        } else {
          obj.photo =
            "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s200/photo.jpg";
        }

        arrData.push(obj);
      }
      cb(arrData);
    },
    handleSelectUser(item) {
      this.handleInputConfirm(item.value);
    },
    handleCloseCopyTo(tag) {
      this.tagCopyTo.splice(this.tagCopyTo.indexOf(tag), 1);
    },
    showCopyToInput() {
      this.inputCopyToVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(email) {
      if (email) {
        this.tagCopyTo.push(email);
      }
      this.inputCopyToVisible = false;
      this.inputCopyToValue = "";
    },
    getEditorContent(content) {
      this.commentContent = content;
    },
    onApiLoad() {
      gapi.load("client", () => {
        gapi.client.setToken({ access_token: this.userToken });
      });
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
          .setDeveloperKey(this.getAPIKey)
          .setCallback(this.pickerCallback)
          .build();
        picker.setVisible(true);
      }
    },
    async pickerCallback(data) {
      let date = new Date();
      let ownerUpload = "";
      let folderNameTemp =
        "legal-app-temp-" +
        (date.getFullYear().toString() +
          (date.getMonth() + 1).toString() +
          date.getDate().toString() +
          date.getHours().toString() +
          date.getMinutes().toString() +
          date.getSeconds().toString() +
          date.getMilliseconds().toString());
      let emailUpload = await this.$commonFunction.getOwnerUpload();
      let domain = this.getDomain;

      if (data.action == google.picker.Action.PICKED) {
        if (this.paramDocId !== this.isNewRecord) {
          if (!this.driveFolder) {
            this.driveFolder = await this.createDriveFolder(folderNameTemp);
          }
        } else {
          this.driveFolder = await this.createDriveFolder(folderNameTemp);
        }
        for (var i in data.docs) {
          let file = data.docs[i];
          let fileUrl = await this.moveFileToFolder(this.driveFolder, file.id);

          await this.setPermissionFileUpload(file.id, emailUpload, domain);

          let objUpload = {
            file_id: file.id,
            file_name: file.name,
            folder_id: this.driveFolder,
            active: true,
            file_url: fileUrl
          };
          await this.$commonFunction.insertRecord(
            this.getUploadCollection,
            objUpload
          );
        }
        this.loadFileUpload();
      }
    },
    setPermissionFileUpload(fileId, emailUpload, domainVal, listEmailEditor) {
      return new Promise((resolve, reject) => {
        gapi.client.load("drive", "v3", () => {
          let userPermissionReq = gapi.client.drive.permissions.create({
            resource: {
              type: "user",
              role: "owner",
              emailAddress: emailUpload
            },
            fileId: fileId,
            transferOwnership: true
          });

          let domainPermissionReq = gapi.client.drive.permissions.create({
            resource: {
              type: "domain",
              role: "writer",
              domain: domainVal
            },
            fileId: fileId
          });

          userPermissionReq.execute();

          domainPermissionReq.execute();

          for (let i in listEmailEditor) {
            let editorPermissionReq = gapi.client.drive.permissions.create({
              resource: {
                type: "user",
                role: "writer",
                emailAddress: listEmailEditor[i]
              },
              fileId: fileId
            });

            editorPermissionReq.execute();
          }

          resolve(true);
        });
      });
    },
    createDriveFolder(folderName) {
      return new Promise((resolve, reject) => {
        gapi.client.load("drive", "v3", () => {
          var fileMetadata = {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder"
          };

          let folderReq = gapi.client.drive.files.create({
            resource: fileMetadata,
            fields: "id"
          });

          folderReq.execute(resp => {
            resolve(resp.id);
          });
        });
      });
    },
    moveFileToFolder(folderId, fileId) {
      return new Promise((resolve, reject) => {
        gapi.client.load("drive", "v3", () => {
          let fileReq = gapi.client.drive.files.update({
            fileId: fileId,
            addParents: folderId,
            fields: "webViewLink"
          });

          fileReq.execute(resp => {
            resolve(resp.webViewLink);
          });
        });
      });
    },
    updateFolderName(folderId, folderName) {
      return new Promise((resolve, reject) => {
        gapi.client.load("drive", "v3", () => {
          var fileMetadata = {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder"
          };

          let folderReq = gapi.client.drive.files.update({
            resource: fileMetadata,
            fileId: folderId
          });

          folderReq.execute(() => {
            resolve(true);
          });
        });
      });
    },
    getFolderName(folderId) {
      return new Promise((resolve, reject) => {
        gapi.client.load("drive", "v3", () => {
          let folderReq = gapi.client.drive.files.get({
            fileId: folderId
          });

          folderReq.execute(resp => {
            resolve(resp.name);
          });
        });
      });
    },
    getFileUrl(fileId) {
      return new Promise((resolve, reject) => {
        gapi.client.load("drive", "v3", () => {
          let fileReq = gapi.client.drive.files.get({
            fileId: fileId,
            fields: "webViewLink"
          });

          fileReq.execute(resp => {
            resolve(resp.webViewLink);
          });
        });
      });
    },
    loadFileUpload() {
      return new Promise(async (resolve, reject) => {
        this.listFileUpload = [];
        let arrQuery = [
          {
            field: "active",
            oper: "==",
            value: "true",
            type: "boolean"
          },
          {
            field: "folder_id",
            oper: "==",
            value: this.driveFolder
          }
        ];

        let arrData = await this.$commonFunction.getList(
          this.getUploadCollection,
          arrQuery
        );

        arrData.forEach(doc => {
          this.listFileUpload.push(doc.data());
        });
        resolve(true);
      });
    },
    downloadFile(fileId, fileName, fileUrl) {
      let fileType = "";
      // Get file type in last file name
      var rex = /[^\.]+$/g;
      var result;
      while ((result = rex.exec(fileName)) !== null) {
        fileType = result[0];
      }

      // Check file type is docx, xlsx, pptx
      var listFormat = this.masterDataFileType[fileType];
      if (listFormat) {
        if (listFormat.length > 0) {
          // Show popup donwload and format for file type
          this.generateFormatDownload(fileId, listFormat);
        }
      } else {
        // If file type is not docx, xlsx, pptx
        var flag = false;
        for (var j in this.specialDriveDownloadFile) {
          var re = new RegExp(this.specialDriveDownloadFile[j], "g");
          // Get file url and check in this url
          var result1 = re.exec(fileUrl);
          if (result1 !== null) {
            var listKeyObj = Object.keys(this.masterDataFileType);
            for (var k in listKeyObj) {
              if (
                this.specialDriveDownloadFile[j] ===
                this.masterDataFileType[listKeyObj[k]][0]
              ) {
                // Show popup donwload and format for file type
                this.generateFormatDownload(
                  fileId,
                  this.masterDataFileType[listKeyObj[k]]
                );
                flag = true;
              }
            }
          }
        }

        // If not both
        if (!flag) {
          openProgress();
          google.script.run
            // If error
            .withFailureHandler(function(error) {
              displayTimedSnackBar("Error: " + error);
            })
            // If success
            .withSuccessHandler(function(downloadUrl) {
              // Get download link and download this file
              window.open(downloadUrl, "_blank");
              closeProgress();
            })
            .getDownloadUrl(fileId);
        }
      }
    },
    generateFormatDownload(fileId, listFormat) {
      for (var i = 1; i < listFormat.length; i++) {
        var child = document.createElement("div");
        var htmlStr =
          '<div style="width: 100%;text-align: center;" onclick="generateDownloadUrl(\'' +
          fileId +
          "','" +
          listFormat[0] +
          "','" +
          listFormat[i] +
          "')\">";
        htmlStr += EXPLAIN_FILE_TYPE[listFormat[i]];
        htmlStr += "</div>";
      }
      this.$alert(htmlStr, "Select format file", {
        dangerouslyUseHTMLString: true
      });
    },
    buildCopyToInfor(item, idx) {
      console.log(item);
      if (idx == 1) {
        if (item.photo) return item.photo;
      } else if (idx == 2) {
        return "avatar image";
      } else if (idx == 3) {
        return item.fullName;
      } else if (idx == 4) {
        return item.userTitle;
      } else if (idx == 5) {
        return item.value;
      }
    },
    goBack() {
      this.$router.go(-1);
    },

    /**  */
    widthCalculating() {
      if (window.innerWidth > 1000) this.labelPosition = "right";
      else this.labelPosition = "top";
    }
  },
  created() {
    delete this.form.comment;
    this.loadCategory();
    this.loadRegion();
    this.loadUserInfo();
    window.addEventListener("resize", this.widthCalculating);
    if (this.paramDocId !== this.isNewRecord) {
      this.loadRequest();
    }

    window.onscroll = () => {
      if (window.pageYOffset >= this.sticky) {
        this.navbar.classList.add("sticky");
      } else {
        this.navbar.classList.remove("sticky");
      }
    };
  },
  computed: {
    ...mapGetters([
      "getCategoryMasterDataCollection",
      "getRequestCollection",
      "getRegionCollection",
      "getCommentCollection",
      "getUploadCollection",
      "getRequestStatusNew",
      "getDomain",
      "getAPIKey"
    ])
  },
  async mounted() {
    this.userToken = await this.$commonFunction.getUserAccessToken();

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
    this.navbar = document.getElementById("header-actions");
    this.sticky = this.navbar.offsetTop;
  },
  destroyed() {
    window.removeEventListener("resize", this.widthCalculating);
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

.auto-completed-list {
  display: flex;
}
.auto-completed-list .user-name {
  display: flex;
}

.auto-completed-list .user-info {
  line-height: 15px;
}

.user-title {
  display: none;
}

.user-info {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden !important;
  width: 70%;
  padding: 3px;
}

.attachment-icon {
  font-size: 30px;
}

.attachment-icon:hover {
  cursor: pointer;
}

.comment-card {
  line-height: 15px;
}

.comment-card p {
  margin-bottom: 7px;
  font-weight: bold;
  color: #2d1414;
}

.sticky {
  position: fixed;
  top: 55px;
  z-index: 100;
}
</style>
