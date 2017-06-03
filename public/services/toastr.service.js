(function () {
    'use strict';
    angular
        .module('VideoApp')
        .service('toastrService', toastrService);

    toastrService.$inject = ['toastr'];

    function toastrService(toastr) {

        var signUpError = function(error) {
            if (error.code == "auth/email-already-in-use") {
                toastr.error("Email already in use", "Error");
            } else if (error.code == "auth/invalid-email") {
                toastr.error("Invalid Email. Try Again", "Error")
            } else if (error.code == "auth/weak-password") {
                toastr.error("Weak Password. Try Again", "Error")
            } else {
                toastr.error("Unknown Error. Try Again", "Error")
            }
            return;
        }

        var logInError = function(error) {
            if (error.code == ("auth/wrong-password" || "auth/user-not-found" || "auth/account-exists-with-different-credential"
                || "auth/invalid-credential")) {
                toastr.error("Invalid Email Or Password. Try Again", "Error")
            } else if ("auth/user-not-found" || "auth/user-disabled") {
                toastr.error("User Not Found", "Error")
            }
            else {
                toastr.error("Unknown Error. Try Again", "Error")
            }
            return;
        }

        var logInSuccess = function() {
            return toastr.success("Login Successful", "Success");
        }
        var registerSuccess = function() {
            return toastr.success("Registration Successful", "Success");
        }

        var searchWarning = function() {
            return toastr.warn("Enter Search Query", "Error");
        }

        var emptySearch = function() {
            return toastr.info("No Videos Match Search");
        }

        var unknownError = function(){
            return toastr.error("Unknown Error", "Error");
        }

        return {
            signUpError: signUpError,
            logInError: logInError,
            logInSuccess: logInSuccess,
            registerSuccess: registerSuccess,
            searchWarning: searchWarning,
            emptySearch: emptySearch,
            unknownError: unknownError
        };
    }
})();
