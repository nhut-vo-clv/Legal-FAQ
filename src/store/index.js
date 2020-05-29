import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    apiKey: 'AIzaSyByVbmX_YAQ45AFONmoVY4zODFwCzPuNYI', // The Browser API key obtained from the Google API Console. Replace with your own Browser API key, or your own key.
    projectNumber: '674624631228', // Replace with your own project number from console.developers.google.com. See "Project number" under "IAM & Admin" > "Settings"
    collections: {
      common: 'common',
      region: 'region',
      logs: 'logs',
      userInfo: 'user_info',
      categoryMasterData: 'category_master_data',
      request: 'request',
      comment: 'comment'
    },
    documents: {
      setting: 'setting'
    },
    fieldsQuery: [],
    filterQuery: '',
    requestStatus: {
      new: 'Processing to Submitted',
      answered: 'Answered',
      resolved: 'Resolved',
      updated: 'Updated'
    }
  },
  mutations: {
    SET_FIELDS_QUERY(state, arrField) {
      state.fieldsQuery = arrField;
    }
  },
  getters: {
    getFieldsQuery: state => {
      return state.fieldsQuery;
    },
    getCommonCollection: state => {
      return state.collections.common;
    },
    getRegionCollection: state => {
      return state.collections.region;
    },
    getLogsCollection: state => {
      return state.collections.logs;
    },
    getUserInfoCollection: state => {
      return state.collections.userInfo;
    },
    getCategoryMasterDataCollection: state => {
      return state.collections.categoryMasterData;
    },
    getRequestCollection: state => {
      return state.collections.request;
    },
    getCommentCollection: state => {
      return state.collections.comment;
    },
    getSettingDocument: state => {
      return state.documents.setting;
    },
    getSaveSuccessfullyMessage: () => {
      return 'Saved successfully';
    },
    getSavedErrorMessage: () => {
      return 'Fail to save';
    },
    getDomain: () => {
      return 'one-line.com';
    },
    getAPIKey: state => {
      return state.apiKey;
    },
    getRequestStatusNew: state => {
      return state.requestStatus.new;
    },
    getRequestStatusAnswered: state => {
      return state.requestStatus.answered;
    },
    getRequestStatusResolved: state => {
      return state.requestStatus.resolved;
    },
    getRequestStatusUpdated: state => {
      return state.requestStatus.updated;
    }
  }
});