import ElementUI from 'element-ui';
import { store } from './../store';
import firebase from "firebase";

export const commonFunction = {
    getList() {

    },
    getRecord(collectionName, docId) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection(collectionName)
                .doc(docId)
                .get()
                .then(snapshot => {
                    if (snapshot.exists) {
                        resolve(snapshot.data());
                    } else {
                        reject("No such document!");
                    }
                });
        });
    },
    insertRecord(collectionName, formData) {
        try {
            let obj = Object.assign({}, this.getSystemField(true), formData);

            return new Promise((resolve, reject) => {
                firebase.firestore()
                    .collection(collectionName)
                    .add(obj)
                    .then(async () => {
                        await this.writeLogSuccessfully(formData);
                        this.alertSuccess();
                        resolve(true);
                    }).catch(error => {
                        this.alertError(error);
                        reject(false);
                    });
            });
        } catch (error) {
            this.alertError(error.message);
        }
    },
    updateRecord(collectionName, docId, formData) {
        try {
            return new Promise((resolve, reject) => {
                formData = this.removeUpdateProp(formData);
                let obj = Object.assign({}, this.getSystemField(false), formData);

                firebase.firestore()
                    .collection(collectionName)
                    .doc(docId)
                    .update(obj)
                    .then(async () => {
                        await this.writeLogSuccessfully(formData);
                        this.alertSuccess();
                        resolve(true);
                    }).catch(error => {
                        this.alertError(error);
                        reject(false);
                    });
            });
        } catch (error) {
            this.alertError(error.message);
        }
    },
    deleteRecord() { },
    writeLogSuccessfully(formData) {
        try {
            let obj = Object.assign({}, this.getSystemField(true), { data: formData });

            return new Promise((resolve, reject) => {
                firebase.firestore()
                    .collection(store.getters.getLogsCollection)
                    .add(obj)
                    .then(() => {
                        resolve(true);
                    }).catch(error => {
                        this.alertError(error);
                        reject(false);
                    });
            });
        } catch (error) {
            this.alertError(error.message);
        }
    },
    getSystemField(isIncludeCreateField) {
        let emailUserLogin = this.getUserEmailLogin();
        let d = new Date();
        let utc = d.getTime() + d.getTimezoneOffset() * 60000;
        let nd = new Date(utc + 3600000 * "+8");

        if (isIncludeCreateField) {
            return {
                created: nd,
                created_by: emailUserLogin,
                updated: nd,
                updated_by: emailUserLogin
            };
        } else {
            return {
                updated: nd,
                updated_by: emailUserLogin
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
    alertWarning(message) {
        ElementUI.Message({
            showClose: true,
            message: message,
            type: 'warning'
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
    },
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    removeUpdateProp(obj) {
        delete obj.updated;
        delete obj.updated_by;

        return obj;
    },
    getFormPorp(form) {
        let obj = {};

        for (let i in form) {
            obj[i] = '';
        }

        return obj;
    },
    getRuleValidation(form) {
        const objType = {
            string: {message: ' is mandatory', trigger: 'blur'}
        };
        let obj = {};

        for (let i in form) {
            let arr = [];
            for(let j in form[i]) {
                let clonedObjType = JSON.parse(JSON.stringify(objType));
                let fieldType = form[i][j].type;

                if(form[i][j].required){
                    clonedObjType[fieldType].message = form[i][j].fieldLabel + clonedObjType[fieldType].message;
                }
                arr.push(Object.assign({}, form[i][j], clonedObjType[fieldType]));
            }
            obj[i] = arr;
        }

        return obj;
    }
}