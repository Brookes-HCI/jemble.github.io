'use strict';

/*Controllers*/

app.controller('HomeCtrl', function(){
		
	})
app.controller('TasksCtrl',function(){

	})
app.controller('GroupCtrl',function($scope, GroupService){
		$scope.users = GroupService.getUsers();

		$scope.addUser = function(user){
			GroupService.addUser(user);
			$scope.newUser = '';
		}
	})