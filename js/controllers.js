'use strict';

/*Controllers*/

app.controller('HomeCtrl', function($scope, GroupService, TaskService,HomeService){
	$scope.users = GroupService.getUsers();
	$scope.tasks = TaskService.getTasks();
	$scope.project = HomeService.getProject();
})

app.controller('NavCtrl',function($scope,$location){
	$scope.location = $location;
	console.log($scope.location);
})

app.controller('TasksCtrl',function($scope,$filter,TaskService,GroupService){
	$scope.tasks = TaskService.getTasks();
	$scope.statuses = TaskService.getStatus();

	
	$scope.addTask = function(task){
		
		task.date = $filter('date')(task.date, "dd-MMMM-yyyy");
		
		task.status = "open";
		TaskService.addTask(task);
		
		$scope.task = {};
		$scope.taskForm.$setPristine();
	}
	
	$scope.removeTask = function(task){
		TaskService.removeTask(task);
	}

	$scope.users = GroupService.getUsers();
})
app.controller('GroupCtrl',function($scope, GroupService){
	$scope.users = GroupService.getUsers();

	$scope.addUser = function(user){
		GroupService.addUser(user);
		$scope.newUser = '';
	}

	$scope.removeUser = function(user){
		GroupService.removeUser(user);
	}

})