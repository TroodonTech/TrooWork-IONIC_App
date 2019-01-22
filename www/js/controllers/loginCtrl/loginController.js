 // myApp.controller('inspectionEditCtrl', ['HOSTNAME','$ionicLoading','$scope', '$http','$state','$rootScope','$ionicScrollDelegate','$ionicPopup','$window','savingInspectedValuesService','$timeout','$ionicPlatform', function (HOSTNAME,$ionicLoading,$scope, $http,$state,$rootScope,$ionicScrollDelegate,$ionicPopup,$window,savingInspectedValuesService,$timeout,$ionicPlatform) {


myApp.controller('loginCtrl', ['HOSTNAME','AUTH_HOSTNAME','$scope', '$cordovaGeolocation','$cordovaBackgroundGeolocation','$ionicPlatform','$ionicPopup','$cordovaGeolocation','$state','$http','$window','$rootScope','$ionicHistory','$timeout','$ionicLoading','$ionicNavBarDelegate',function(HOSTNAME,AUTH_HOSTNAME,$scope,$cordovaGeolocation,$cordovaBackgroundGeolocation,$ionicPlatform,$ionicPopup,$cordovaGeolocation,$state,$http,$window,$rootScope,$ionicHistory,$timeout,$ionicLoading,$ionicNavBarDelegate) {
// console.log("inside login-controller" + HOSTNAME);
  /* ...Setting......Node server location....*/
  // $rootScope.serverLocation="http://192.168.1.200:3000";
  // $rootScope.serverLocation="http://trooworkapi.azurewebsites.net";
  // $rootScope.serverLocation="http://demotroowork.azurewebsites.net";
  // localStorage.setItem('serverLocation',$rootScope.serverLocation);
  //             if(!$scope.$$phase){
  //                 scope.$apply();
  //               };
   $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
   
  });
$rootScope.loginForm = {};  
 $scope.inputType = 'password';
  
  // Hide & show password function
  $scope.hideShowPassword = function(){
    if ($scope.inputType == 'password')
      $scope.inputType = 'text'; 
    else
      $scope.inputType = 'password';
  };
$scope.showMsgs = false;
$scope.login = function (username,password,teantID) {
        // console.log("inside login function");
          $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.close();

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
   
  });
        $scope.isAuthenticated = false;
        $scope.welcome = '';
        $scope.username = username;
        $scope.password = password;
          $scope.teantID=teantID;
            if(!$scope.username && !$scope.password && !$scope.teantID){ 
                // $ionicLoading.hide();
                var alertPopup1 = $ionicPopup.alert({
                                               title: 'Login failed',
                                               template: 'Please enter username , password and TeantID !'
                                     });
                alertPopup1.then(function(res) {// called when clicked
                  console.log('Tapped!', res);
                   alertPopup1.close(); 
                });
                $timeout(function() {
                                $ionicLoading.hide();
                                      alertPopup1.close();
                                      // uploadingPopup.close();
                                   }, 1000);
              }
              if($scope.username && !$scope.password){ 
                // $ionicLoading.hide();
                var alertPopup2 = $ionicPopup.alert({
                                               title: 'Login failed',
                                               template: 'Please enter password!'
                                     });
                alertPopup2.then(function(res) {// called when clicked
                                        console.log('Tapped!', res);
                                        alertPopup7.close(); 
                                      });
                $timeout(function() {
                                $ionicLoading.hide();
                                      alertPopup2.close();
                                      // uploadingPopup.close();
                                   }, 1000);
              }
              if(!$scope.username && $scope.password){ 
                // $ionicLoading.hide();
                var alertPopup3 = $ionicPopup.alert({
                                               title: 'Login failed',
                                               template: 'Please enter username!'
                                     });
                alertPopup3.then(function(res) {// called when clicked
                                        console.log('Tapped!', res);
                                        alertPopup7.close(); 
                                      });
                $timeout(function() {
                                $ionicLoading.hide();
                                      alertPopup3.close();
                                      // uploadingPopup.close();
                                   }, 1000);
              }
               if($scope.username && $scope.password && !$scope.teantID){ 
                // $ionicLoading.hide();
                var alertPopup11 = $ionicPopup.alert({
                                               title: 'Login failed',
                                               template: 'Please enter TeantID !'
                                     });
                alertPopup11.then(function(res) {// called when clicked
                                        console.log('Tapped!', res);
                                        alertPopup7.close(); 
                                      });
                $timeout(function() {
                                $ionicLoading.hide();
                                      alertPopup11.close();
                                      // uploadingPopup.close();
                                   }, 1000);
              }
              if($scope.username && $scope.password && $scope.teantID){
                  // console.log($scope.username +"..."+ $scope.password);
                  $scope.authenticateLogin = {};
                  $scope.authenticateLogin.uname = $scope.username;
                  $scope.authenticateLogin.pwd = $scope.password;
                  $scope.authenticateLogin.tid=$scope.teantID;
                  // console.log($scope.authenticateLogin);
                $scope.myPromise = $http.post(AUTH_HOSTNAME + "/authenticate",$scope.authenticateLogin)
                            .success(function (data, status, headers, config, response){
                              // debugger;
                              // console.log("data "+data.token+" status "+status+" headers "+headers+" response "+response);
                              $rootScope.token = data.token;
                                  if(data.token !== null || data.token !== ""){
                                    localStorage.setItem('token',data.token);
                                    $scope.isAuthenticated = true;
                                  }
                                  else{
                                    $scope.welcome = '';
                                    $scope.isAuthenticated = false;
                                    $window.localStorage.clear();
                                    $window.localStorage.removeItem('employeekey');

                                    delete localStorage.employeekey;
                                     var alertPopup4 = $ionicPopup.alert({
                                                              title: 'Login failed',
                                                              template: 'Wrong username,password,TeantID !'
                                                       });
                                     alertPopup4.then(function(res) {// called when clicked
                                        console.log('Tapped!', res);
                                        alertPopup7.close(); 
                                      });
                                     $timeout(function() {
                                $ionicLoading.hide();
                                      alertPopup4.close();
                                      // uploadingPopup.close();
                                   }, 1000);
                                  }
                                  
                                    $window.sessionStorage.token = data.token;
                                    $http.defaults.headers.common['Authorization'] = $window.sessionStorage.token;
                                    // console.log($http.defaults.headers.common['X-Auth-Token']);
                                  $window.localStorage['token'] =data.token;
                                  var encodedProfile = data.token.split('.')[1];
                                  var profile = JSON.parse(url_base64_decode(encodedProfile));
                                  // console.log(profile.role);
                                  // console.log(profile.IsSupervisor);
                                  $scope.role = profile.role;
                                  $rootScope.IsSupervisor = profile.IsSupervisor;
                                  $rootScope.name=profile.username;
                                  $rootScope.employeekey = profile.employeekey;
                                   $scope.OrganizationID=profile.OrganizationID;
                                  if($scope.isAuthenticated && profile.role == 'Manager'){
                                     $scope.getBackgroundGeolocation(profile.employeekey);                     
                                         $state.go('managerDashboard.dashboardViewManager');
                                  }
                                  else if($scope.isAuthenticated && profile.role == 'Employee' && profile.IsSupervisor == 0 ){
                                    $scope.getBackgroundGeolocation(profile.employeekey);              
                                                 $state.go('employeeDashboard.employeeworks');
                                  }
                                  else if($scope.isAuthenticated && profile.role == 'Employee' && profile.IsSupervisor == 1 ){
                                    $scope.getBackgroundGeolocation(profile.employeekey);            
                                                 $state.go('supervisorDashboard.dashboardViewSupervisor');
                                  }
                                  else{
                                    var alertPopup5 = $ionicPopup.alert({
                                                             title: 'Login failed',
                                                             template: 'Invalid Login!!!'
                                                   });
                                    alertPopup5.then(function(res) {// called when clicked
                                        console.log('Tapped!', res);
                                        alertPopup7.close(); 
                                      });
                                    $timeout(function() {
                                $ionicLoading.hide();
                                      alertPopup5.close();
                                      // uploadingPopup.close();
                                   }, 1000);
                                    $state.go('login');
                                  }
                            })
                            .error(function (data, status, headers, config) {

                                  // Erase the token if the user fails to log in
                                  console.log(data+"In error status "+status);
                                  delete $window.sessionStorage.token;
                                  $scope.isAuthenticated = false;
                                    // $ionicLoading.hide(); 
                                  // Handle login errors here
                                  $scope.error = 'Error: Invalid username or password';
                                  $scope.welcome = '';
                                  $scope.myPromise = false;
                                  if(status === 401){
                                    var alertPopup6 = $ionicPopup.alert({
                                                             title: 'Login failed',
                                                              template: 'Wrong username or password!'
                                                   });
                                    alertPopup6.then(function(res) {// called when clicked
                                        console.log('Tapped!', res);
                                        alertPopup7.close(); 
                                      });
                                    $timeout(function() {
                                $ionicLoading.hide();
                                      alertPopup6.close();
                                      // uploadingPopup.close();
                                   }, 1000);
                                  }
                                  if(status === -1){
                                    var alertPopup7 = $ionicPopup.alert({
                                                             title: 'Login failed',
                                                              template: 'Please check your connection!!'
                                                   });
                                     alertPopup7.then(function(res) {// called when clicked
                                        console.log('Tapped!', res);
                                        alertPopup7.close(); 
                                      });
                                     $timeout(function() {
                                $ionicLoading.hide();
                                      alertPopup7.close();
                                      // uploadingPopup.close();
                                   }, 1000);
                                  }
                                  
                                  $state.go('login');
                              });
                              $timeout(function() {
                                $scope.myPromise = false;
                                // $state.go('login');
                               }, 4000);
                      
              }
             
              // else{
              //   var alertPopup = $ionicPopup.alert({
              //                                                title: 'Login failed',
              //                                                template: 'Please try again later!'
              //                                      });
              //                       $state.go('login');
              // }
              
             
    };

 function convert_DT_Time(str) {// reduce one day for display
                var date = new Date(str),
                        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                        day = ("0" + date.getDate()).slice(-2);
                        hour= date.getHours();
                        min= date.getMinutes();

                        sec= date.getSeconds();
                        var D = [date.getFullYear(), mnth, day].join("-");
                        var T = [hour, min, sec].join(":");

                return [D,T].join(" ");
            }





$scope.getBackgroundGeolocation = function(employeekey){
  // console.log("employeekey "+employeekey);
var currDT = convert_DT_Time(new Date());
console.log("inside quick workorder startDT " + currDT);
    // alert('employeekey'+employeekey);
    $ionicPlatform.ready(function() {
            
            // console.log("[IONIC PLATFORM IS NOW READY]");

            var options = {
                  enableHighAccuracy: true,
                  timeout: 5000,
                  maximumAge: 0
                };

            function success(pos) {
              var crd = pos.coords;
              $rootScope.geolatitude = crd.latitude;
              $rootScope.geolongitude = crd.longitude;
              // console.log('Your current position is:');
              // console.log('Latitude : ' + crd.latitude);
              // console.log('Longitude: ' + crd.longitude);
              // console.log('employeekey: ' + employeekey);
              // console.log('More or less ' + crd.accuracy + ' meters.');
              $scope.backgroundlocation = {};
              $scope.backgroundlocation.geolatitude = $rootScope.geolatitude;
              $scope.backgroundlocation.geolongitude = $rootScope.geolongitude;
              $scope.backgroundlocation.EmployeeKey = employeekey;
              $scope.backgroundlocation.currenttime = currDT;
              $scope.backgroundlocation.OrganizationID=$scope.OrganizationID;
              // console.log($scope.backgroundlocation);
              $http.post(HOSTNAME +"/backgroundGeoLocation",$scope.backgroundlocation);
            };

            function error(err) {
              // console.warn('ERROR(' + err.code + '): ' + err.message);
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
                     
      });
},$timeout(function() {}, 10);


  }]);