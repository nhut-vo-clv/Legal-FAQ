import ElementUI from 'element-ui';
import { store } from './../store';
import firebase from "firebase";

export const commonFunction = {
    getSystemField(isIncludeCreateField){
        var d = new Date();
        var utc = d.getTime() + d.getTimezoneOffset() * 60000;
        var nd = new Date(utc + 3600000 * "+8");

        if(isIncludeCreateField){
            return {
                created: nd,
                created_by: this.getUserEmailLogin(),
                updated: nd,
                updated_by: this.getUserEmailLogin()
            };
        }else{
            return {
                updated: nd,
                updated_by: this.getUserEmailLogin()
            };
        }
        
    },
    getUserEmailLogin() {
        return firebase.auth().currentUser.email;
    },
    formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear(),
            hours = d.getHours(),
            minutes = d.getMinutes(),
            seconds = d.getSeconds();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        return [day, month, year].join("-") + ' ' + [hours, minutes, seconds].join(':');
    },
    alertSuccess() {
        ElementUI.Message({
            showClose: true,
            message: store.getters.getSaveSuccessfullyMessage,
            type: 'success'
        });
    },
    alertError(error) {
        var userEmail = firebase.auth().currentUser.email;
        firebase.firestore()
            .collection(store.getters.getLogsCollection)
            .add({
                message: error,
                created: '',
                created_by: userEmail,
                updated: '',
                updated_by: userEmail
            })
            .then(() => {
                ElementUI.Message({
                    showClose: true,
                    message: store.getters.getSavedErrorMessage,
                    type: 'error'
                });
            });
    }
}