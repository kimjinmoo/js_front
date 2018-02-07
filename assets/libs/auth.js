// Initialize Firebase
var config = {
    apiKey: "AIzaSyA1JpLGZFHdoyFXv_vlG9eczpmvH_Lw2SU",
    authDomain: "formidable-rune-846.firebaseapp.com",
    databaseURL: "https://formidable-rune-846.firebaseio.com",
    projectId: "formidable-rune-846",
    storageBucket: "formidable-rune-846.appspot.com",
    messagingSenderId: "490240998468"
};
firebase.initializeApp(config);
var loginUtil = {
     isLogin : false,
     getUser : null,
     checkedPage : function() {
         loginUtil.init(function(){
             if(loginUtil.isLogin) location.href = "/";
         })
     },
     init : function(isAuthCallback, isNoAuthCallback) {
         firebase.auth().onAuthStateChanged(function(user) {
             if (user) {
                 console.log(user);
                 //set UserInfo
                 loginUtil.isLogin = true;
                 loginUtil.getUser = user;
                 // User is signed in.
                 var displayName = user.displayName;
                 var email = user.email;
                 var emailVerified = user.emailVerified;
                 var photoURL = user.photoURL;
                 var isAnonymous = user.isAnonymous;
                 var uid = user.uid;
                 var providerData = user.providerData;
                 // [START_EXCLUDE]
                 if (!emailVerified) {
                     alert("이메일 인증 후 로그인 하여 주십시요.");
                     loginUtil.signOut();
                 }
                 // [END_EXCLUDE]
                 if(typeof isAuthCallback === "function") {
                     isAuthCallback(user);
                 }
             } else {
                 loginUtil.isLogin = false;
                 loginUtil.getUser = null;
                 if(typeof isNoAuthCallback === "function") {
                     isNoAuthCallback();
                 }
             }
         });
     },
     signUp : function(obj, successCallback, failCallback) {
         if (firebase.auth().currentUser) {
             // [START signout]
             firebase.auth().signOut();
             // [END signout]
         } else {
             var email = obj.email;
             var password = obj.password;

             if(!loginUtil.commonUtil.checkEmail(email)) {
                 return false;
             }
             if(!loginUtil.commonUtil.checkPassword(password)) {
                 return false;
             }
             // set 인증 지속성
             firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                 .then(function() {
                     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                         /**
                          *   var errorCode = error.code; 에러코드
                          *   var errorMessage = error.message; 에러메세지
                          */
                         if(typeof failCallback === "function") {
                             failCallback(error);
                         }
                     }).then(function(data){
                         if(typeof successCallback === "function") {
                             successCallback(data)
                         }
                     });
                     return firebase.auth().signInWithEmailAndPassword(email, password);
                 })
                 .catch(function(error) {
                     // Handle Errors here.
                     var errorCode = error.code;
                     var errorMessage = error.message;
                 });
         }
     },
    signOut : function(successCallback, failCallback) {
        firebase.auth().signOut().catch(function(error){
            if(typeof failCallback === "function") {
                failCallback();
            }
        }).then(function(data){
            if(typeof successCallback === "function") {
                successCallback();
            }
        });
    },
    commonUtil : {
         checkEmail : function(email) {
             if (email.length < 4) {
                 alert('이메일을 확인 하여 주십시오.');
                 return false;
             }
             return true;
         },
         checkPassword : function(password) {
             if (password.length < 4) {
                 alert('비밀번호를 확인 하여 주십시오.');
                 return false;
             }
             return true;
         }
    }
};