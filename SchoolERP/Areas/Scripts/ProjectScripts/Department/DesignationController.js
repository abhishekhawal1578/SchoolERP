﻿var app = angular.module('ERP').controller('DesignationController', DesignationController);

function DesignationController($scope, Service) {

    var form = $(".student-admission-wrapper");
    $scope.ViewGetStudentInfoes = {};
    $scope.UserCredentialModel = {};
    $scope.btnactive = 1;


    $scope.Initialize = function () {
        debugger;
        $scope.UserCredentialModel.Status = $scope.btnactive;
        Service.Post("Department/GetDesignationMaster", $scope.UserCredentialModel).then(function (result) {
            debugger;
            $scope.ViewGetStudentInfoes = result.data;
            $scope.Designations = result.data.ResultData;
            //console.log(result.data);
        })
    }

    $scope.ShowHide = function (DesignationID) {
        debugger;
        $scope.btnUpdate = true;
        $scope.btnSave = false;
        $scope.IsVisible = true;
        var data = {
            DesignationID: DesignationID
        };

        Service.Post("Department/GetSingleDesignationInfo", JSON.stringify(data), $scope.UserCredentialModel).then(function (result) {

            debugger;

            $scope.ViewGetStudentInfoes = result.data;

            $scope.Designation = result.data.Designation;
            $scope.DesignationID = result.data.DesignationID;
            // $scope.Students = result.data.ResultData;

            $scope.Initialize();
        })
    }


    $scope.ShowHideSave = function () {
        debugger;
        $scope.btnUpdate = false;
        $scope.btnSave = true;
        $scope.IsVisible = true;
    }


    $scope.Clear = function () {

        $scope.Designation = null;
        $scope.DesignationID = null;
        $scope.IsVisible = false;
        // $scope.Initialize();
    }

    $scope.AddUpdate = function (DesignationID, Designation, BtnStatus) {
        var data = {
            DesignationID: DesignationID,
            Designation: Designation,
            BtnStatus: BtnStatus
        };
        if ($scope.form.$valid) {
            Service.Post("Department/SaveDesignation", JSON.stringify(data)).then(function (response) {

                if (response.data.IsSucess) {
                    debugger;

                    //CustomizeApp.UpdateMessage();
                    $scope.Clear();
                    $scope.IsVisible = false;
                    $scope.Initialize();
                    alert(response.data.ResultData);
                    // window.location = "./ParentGrievance"

                    //alert(result.data);
                }
                else {
                    debugger;
                    //ShowMessage(0, response.data.Message);
                    alert(response.data.Message);
                    //$scope.clear();
                    //window.location = "./PostGrievance"
                }
            });
        }
    }


    $scope.Delete = function (DesignationID) {
        debugger;
        var data = {

            DesignationID: DesignationID
        };

        if (event.target.checked == false) {
            var confirm = window.confirm("Do you want to deactive the designation?");

        }
        else {
            var confirm = window.confirm("Do you want to active the designation?");
        }
        if (confirm == true) {
            Service.Post("Department/DeleteDesignation", JSON.stringify(data)).then(function (response) {

                debugger;
                if (response.data)
                    $scope.Initialize();
                alert(response.data.ResultData);
            });
        }
        $scope.Clear();
        $scope.IsVisible = false;
        $scope.Initialize();

    }

}
