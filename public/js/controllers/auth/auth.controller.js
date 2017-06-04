(function(){
    'use strict';
    angular.module('VideoApp')
        .controller('authController', authController);

    authController.$inject = ['authService', '$state', 'toastrService', 'Auth'];

    function authController(authService, $state, toastrService, Auth) {
        var vm = this;
        vm.auth = Auth;
        vm.user = {
            email: "",
            passsword: ""
        };
        vm.firebaseUser = "";

        vm.userSignUp = function() {
            authService.signup(vm.user.email, vm.user.password).then(function(data) {
                authService.currentUser(firebaseUser.uid);
                return toastrService.registerSuccess();
            })
            .catch(function(error) {
                return toastrService.signUpError(error);
            })
        };

        vm.userLogin = function() {
            authService.signin(vm.user.email, vm.user.password).then(function(firebaseUser) {
                authService.currentUser(firebaseUser.uid);
                vm.firebaseUser = firebaseUser;
                $state.go('videos');
                return toastrService.logInSuccess();

            })
            .catch(function(error) {
                return toastrService.logInError(error);
            });
        };

        vm.auth.$onAuthStateChanged(function(firebaseUser) {
            vm.firebaseUser = firebaseUser;
        });

        vm.logout = function() {
            $state.go('videos');
            return authService.signout();
        }

        vm.listVideos = function() {
            $state.go('saved-videos');
        }
    }
})();
