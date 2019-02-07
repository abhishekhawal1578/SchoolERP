﻿angular.module('ERP').service('Service', Service);

function Service($http) {

    this.Post = function (url, data) {
        console.log(data)
        alert('update4')
        // Set the Content-Type 
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
       // $http.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
       // $http.defaults.headers.post["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,OPTIONS";
        //$http.defaults.headers.post["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Content-Length, X-Requested-With"
        // Delete the Requested With Header
       // delete $http.defaults.headers.common['X-Requested-With'];

        return $http.post(baseURL + url, data);
        //return $http.post(baseURL + url, data, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With' } });
    };

    this.Get = function (url) {
        return $http.get(baseURL + url);
    };

    this.PostFile = function (url, data) {
        return $http.post(baseURL + url, GetModelAsFormData(data), { headers: { 'Content-Type': undefined } });
    };

    //------------------------- Common Function --------------------------//

    var GetModelAsFormData = function (data) {
        var dataAsFormData = new FormData();
        angular.forEach(data, function (value, key) {
            if (key === 'Files') {
                angular.forEach(value, function (value1) { dataAsFormData.append("Files", value1); });
            } else {
                dataAsFormData.append(key, value);
            }
        });
        return dataAsFormData;
    };
}