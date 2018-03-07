// head메뉴
var headMenu = new Vue({
    el : "#app",
    data : {
        jenkinsUrl :  "http://13.125.38.35:9000",
        apiServer : "http://13.124.113.142/swagger-ui.html",
        webSocket : "http://13.124.113.142",
        slack : "https://iustudy.slack.com",
      sighInUrl : "/member/signUp.html",
        isLogin : false,
        userId : "iukim21c"
    },
    methods : {
        gotoSlack : function() {
            window.open(this.slack);
        },
        gotoJenkins : function() {
            window.open(this.jenkinsUrl);
        },
        gotoApiServer : function() {
            window.open(this.apiServer);
        },
        gotoWebSocket : function() {
            window.open(this.webSocket);
        },
        gotoCrawling : function() {

        },
        logOut : function() {
            loginUtil.signOut();
        },
        menuShow : function(grade) {
            this.collapsed = loginUtil.isLogin;
        },
        signIn : function() {
            location.href = this.sighInUrl;
        },
        signUp : function() {
            loginUtil.signUp({
                email : this.$refs.email.value,
                password : this.$refs.password.value
            },function() {
                location.href = "/";
            }, function(data){
                alert(data);
            });
        }
    }
});
$(function() {
    loginUtil.init(function(obj){
        headMenu.isLogin = true;
        headMenu.userId = obj.email;
    }, function(){
        headMenu.isLogin = false;
    })
});