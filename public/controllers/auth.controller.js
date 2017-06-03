(function(){
    'use strict';
    angular.module('VideoApp')
        .controller('authController', authController);

    authController.$inject = ['authService', '$state', 'toastrService', 'Auth'];

    function authController(authService, $state, toastrService, Auth) {
        var vm = this;
        vm.user = {
            email: "",
            passsword: ""
        };
        vm.firebaseUser = "";
        vm.auth = Auth;

        vm.userSignUp = function() {
            authService.signup(vm.user.email, vm.user.password).then(function(data) {
                return toastrService.registerSuccess();
            })
            .catch(function(error) {
                return toastrService.signUpError(error);
            })
        };

        vm.userLogin = function() {
            authService.signin(vm.user.email, vm.user.password).then(function(firebaseUser) {
                vm.firebaseUser = firebaseUser;
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
            $state.go('login');
            return authService.signout();
        }
    }
})()
