angular.module('starter.controllers', ["ngTable"])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
.controller('customersCtrl', ['$scope', '$http','NgTableParams', function($scope, $http, NgTableParams) {
    
	
	console.log('before function');
	$scope.SearchData = { week : "abc" , ManagersID : ""};
	//var o2 = FilterDefaulters();
	//var o2 = FilterDefaulters();
	
		
		$scope.getDefaulters = function  FilterDefaulters() {
			
			console.log ('inside loop');
			
			
			console.log($scope.SearchData.week);
			console.log($scope.SearchData.ManagersID);
			
			$http.get("http://timereporting.mybluemix.net/RetriveDefaulters")
    .then(function (response) {
		
	
	//var self = this;
//var data = [{name: "Moroni", age: 50} /*,*/];
	/*var o1 = {};
	var key = 'EmployeeData';
	o1 [key] = [];*/
	
	 $http.get("http://timereporting.mybluemix.net/RetriveEmployees")
    .then(function (Employee) {
		$scope.Employee = Employee;
		console.log(Employee.data);
		console.log(response.data[1].EmpID);
		var match = false;
			
			
			
			//console.log (response.keys('EmpID').length);
			var i= 0;   
			
			var o1 = {};
	var key = 'EmployeeData';
	o1 [key] = [];
			
			
			for (res in response.data){
				console.log(i);
				match = false;
				var j =  0;
				for (EmpID in Employee.data){
				console.log('DEF');
					
					//console.log(j.hasOwnProperty());
					// 	console.log(EmpID[0]);
					console.log(Employee.data[j].EmpID);
					console.log(response.data[i].EmpID);
					console.log(Employee.data[j].Week);
					
					var week = Employee.data[j].Week;
					console.log($scope.SearchData.week);
					console.log($scope.SearchData.ManagersID);
					
					if (response.data[i].EmpID == Employee.data[j].EmpID && Employee.data[j].Week == $scope.SearchData.week && Employee.data[j].ILCStatus == 'Yes') {
						match = true;
						console.log(j);
					}
					
					j = j + 1;
					console.log (' j ' + j);
					
				}
			console.log(match);				
			if (match == false){
				if ($scope.SearchData.ManagersID != "" && $scope.SearchData.ManagersID == response.data[i].ManagersID){
					var data = { EmpID : response.data[i].EmpID, EmpName : response.data[i].EmpName, ManagersID : response.data[i].ManagersID, ManagersName : response.data[i].ManagersName }
					o1[key].push(data);
					console.log('managers ID');
				}
				else if ($scope.SearchData.ManagersID == ""){	
					var data = { EmpID : response.data[i].EmpID, EmpName : response.data[i].EmpName, ManagersID : response.data[i].ManagersID, ManagersName : response.data[i].ManagersName }
					o1[key].push(data);
					console.log( o1);
				}
			}
				i = i+1;				
			console.log('LoopEnd');			
		

			
			}
			
			var self = this;
			$scope.data = o1.EmployeeData;
			self.tableParams = new NgTableParams({}, { dataset: $scope.data});
			
			return o1;
		
		
			});

	
	});
	}
	
}])
