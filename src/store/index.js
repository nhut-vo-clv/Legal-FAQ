import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    apiKey: 'AIzaSyByVbmX_YAQ45AFONmoVY4zODFwCzPuNYI', // The Browser API key obtained from the Google API Console. Replace with your own Browser API key, or your own key.
    projectNumber: '674624631228', // Replace with your own project number from console.developers.google.com. See "Project number" under "IAM & Admin" > "Settings"
    collections: {
      common: 'common',
      region: 'region'
    },
    documents: {
      superEmail: 'super_email'
    },
    fieldsQuery: [],
    filterQuery: ''
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
    getSuperEmailDocument: state => {
      return state.documents.superEmail;
    }
  }
});