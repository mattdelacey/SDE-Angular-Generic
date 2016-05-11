angular.module('starter.controllers', ['kinvey', 'ngCordova'])

.controller('DashCtrl', function($scope) {

    $scope.myTest = function() {
        console.log('inside myTest');
        $ionicSideMenuDelegate.toggleLeft();
    };


})


.controller('SearchCtrl', function($scope, $kinvey, $sce) {

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log('load search view');

        $kinvey.DataStore.find('Products').then(function(products) {
            console.log(products);
            $scope.products = products;
        });
    });


    $scope.searchme = function() {
        console.log('inside searchctrl');

        console.log(document.getElementById("chosenProduct").value);

        var query = new Kinvey.Query();
        query.equalTo('title', document.getElementById("chosenProduct").value);
        $kinvey.DataStore.find('Products', query).then(function(thisproduct) {
            console.log(thisproduct);
            $scope.thisproduct = thisproduct;
        });
    };
})

.controller('InsertTicketCtrl', function($scope, $kinvey, $ionicLoading) {
    $scope.insertme = function() {
        var mytask = document.getElementById("task").value;
        document.getElementById("task").value = "";
        console.log(mytask);

        var myduedate = document.getElementById("duedate").value;
        console.log(duedate);
        document.getElementById("duedate").value = "";



        var mycomplete = document.getElementById("completed").checked;
        console.log(mycomplete);
        //document.getElementById("testdrive").value = false;

        var complete = false;
        if (mycomplete == true) {
            complete = true;
        } else {
            complete = false;
        }


        var data = {};

        data.action = mytask;
        data.duedate = myduedate;
        data.completed = complete;
        data.class = "personal";
        data.Title = "Personal Task";
        console.log(JSON.stringify(data));


        $kinvey.DataStore.save('todo', data).then(function(data) {
            console.log(data);
        });

        $ionicLoading.show({
            template: 'task inserted',
            noBackdrop: true,
            duration: 2000
        });

    };
})





.controller('ProductCtrl', function($scope, $kinvey) {

    $scope.$on('$ionicView.beforeEnter', function() {

        console.log('inside productctrl');

        $kinvey.DataStore.find('Products').then(function(products) {
            console.log(products);
            $scope.products = products;
        });
    });
})



.controller('ProjectsCtrl', function($scope, $kinvey) {

    $scope.doRefresh = function() {
        console.log('todorefresh');
        //var query = new Kinvey.Query();
        //query.equalTo('Category', 'Zeeco');
        $kinvey.DataStore.find('todo').then(function(tasks) {
            console.log(tasks);
            $scope.tasks = tasks;
        });
    }

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log('todo load view');
        //var query = new Kinvey.Query();
        //query.equalTo('Category', 'Zeeco');
        $kinvey.DataStore.find('todo').then(function(tasks) {
            console.log(tasks);
            $scope.tasks = tasks;
        });
    });

})

.controller('RefCtrl', function($scope, $kinvey) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log('ref load view');
        var query = new $kinvey.Query();
        query.greaterThan('size', 0);
        var promise = $kinvey.File.find(query);
        promise.then(function(files) {
            console.log(files);
            $scope.files = files;
        }, function(err) {
            console.log(err);
        });
    });
})

.controller('PartnerCtrl', function($scope, $kinvey) {

    $scope.doRefresh = function() {
        console.log('refresh');
        //var query = new Kinvey.Query();
        //query.equalTo('Category', 'Zeeco');
        $kinvey.DataStore.find('Account').then(function(accounts) {
            console.log(accounts);
            $scope.accounts = accounts;
        });
    }

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log('account load view');
        //var query = new Kinvey.Query();
        //query.equalTo('Category', 'Zeeco');
        $kinvey.DataStore.find('Account').then(function(accounts) {
            console.log(accounts);
            $scope.accounts = accounts;
        });
    });

})



.controller('BrandCtrl', function($scope, $kinvey) {

    $scope.doRefreshBrand = function() {
        console.log('refresh brand');
        $kinvey.DataStore.find('brand').then(function(mybrand) {
            console.log(mybrand);
            $scope.mybrand = mybrand;
        });
    }

    $scope.$on('$ionicView.beforeEnter', function() {
        console.log('partner load view');
        $kinvey.DataStore.find('brand').then(function(brand) {
            console.log(brand);
            $scope.mybrand = brand;
        });
    });

})


.controller('MenuCtrl', function($scope, $kinvey, $ionicSideMenuDelegate, $ionicModal) {
    console.log('inside menuctrl');
    $scope.toggleLeft = function() {
        console.log('inside toggleleft');
        $ionicSideMenuDelegate.toggleLeft();
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
        $scope.modal = modal;
    }, {
        animation: 'slide-in-up'
    });
})



.controller('HomeCtrl', function($scope, $kinvey, $ionicSideMenuDelegate, $rootScope) {
    console.log('home');

    $scope.$on('$ionicView.beforeEnter', function() {
        // we're authenticated, grab logo and color scheme
        console.log('home');
        var query = new Kinvey.Query();
        query.equalTo('ActiveBrand', true);
        $kinvey.DataStore.find('DemoBrandingData', query).then(function(brand) {
            console.log(brand);
            $rootScope.primarycolor = brand[0].PrimaryColor;

            if (brand[0].LogoFileName.indexOf('http') == -1) {
                console.log('local path');
                brand[0].LogoFileName = "img/" + brand[0].LogoFileName;
            }
            $rootScope.logo = brand[0].LogoFileName;
            $rootScope.screenText = brand[0].HomeScreenText;
            $rootScope.textColor = brand[0].PrimaryTextColor;
            $rootScope.customer = brand[0].CustomerName;
            $rootScope.accountsname = brand[0].AccountsName;
            $rootScope.tasksname = brand[0].TasksName;
            $rootScope.addtaskname = brand[0].AddTaskName;
            $rootScope.calcname = brand[0].CalculatorName;
            $rootScope.productsname = brand[0].ProductsName;
        });
    });


})



.controller('AccountCtrl', function($scope, $state, $kinvey, $cordovaPush, $http) {
    $scope.userData = {
        email: "",
        password: ""
    };


    $scope.validateUser = function() {
        /*var promise = $kinvey.User.login({
            username: $scope.userData.email,
            password: $scope.userData.password
        });
        promise.then(
            function(response) {
                //Kinvey login finished with success
                $scope.submittedError = false;
                $state.go('menu.tabs.home');
            },
            function(error) {
                //Kinvey login finished with error
                $scope.submittedError = true;
                $scope.errorDescription = error.description;
                console.log("Error login " + error.description); //
            }
        );
    };*/
        var promise = $kinvey.User.MIC.loginWithAuthorizationCodeLoginPage('http://localhost:8100');
        promise.then(function(user) {
            $scope.submittedError = false;

            // you have a user, now register the token
            //
            console.log('we have an active user');

            // only do this if a token hasn't been registered
            if (Kinvey.getActiveUser()._messaging.pushTokens.length < 1) {
                $cordovaPush.register({ "badge": true, "sound": true, "alert": true }).then(function(deviceToken) {
                    console.log('registering for push');
                    console.log(deviceToken);
                    var registerURL = "https://baas.kinvey.com/push/" + 'kid_ZJk02vOUFg' + "/register-device";
                    var body = {
                        platform: "ios",
                        deviceId: deviceToken
                    };
                    var options = {
                        headers: {
                            "Authorization": "Kinvey " + $kinvey.getActiveUser()._kmd.authtoken
                        }
                    };
                    $http.post(registerURL, body, options)
                        .success(function() { alert("Registered!"); })
                        .error(function() { alert("Did not Register!: " + error.message); });
                }, function(error) {
                    console.log(error);
                });
            }
            $state.go('menu.tabs.home');
        }, function(err) {
            $scope.submittedError = true;
            $scope.errorDescription = err.description;
            console.log(err);
            console.log("Error login " + err.description);
            $state.go('menu.tabs.account');
        });
    }

    $scope.signUp = function() {
        var promise = $kinvey.User.signup({
            username: $scope.userData.email,
            password: $scope.userData.password,
            email: $scope.userData.email
        });
        console.log("signup promise");
        promise.then(
            function() {
                //Kinvey signup finished with success
                $scope.submittedError = false;
                console.log("signup success");
                $state.go('menu.tabs.home');
            },
            function(error) {
                //Kinvey signup finished with error
                $scope.submittedError = true;
                $scope.errorDescription = error.description;
                console.log("signup error: " + error.description);
            }
        );
    };

    $scope.logout = function() {
        //Kinvey logout starts
        var promise = $kinvey.User.logout();
        promise.then(
            function() {
                //Kinvey logout finished with success
                console.log("user logout");
                $kinvey.setActiveUser(null);
            },
            function(error) {
                //Kinvey logout finished with error
                alert("Error logout: " + JSON.stringify(error));
            }
        );
    }

});