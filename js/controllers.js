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

app.controller('TasksCtrl',function($scope,$filter,$timeout,TaskService,GroupService){
	$scope.tasks = TaskService.getTasks();
	$scope.statuses = TaskService.getStatus();

	$scope.isAdded = false;
	$scope.addTask = function(task){
		
		task.date = $filter('date')(task.date, "dd-MMMM-yyyy");
		
		task.status = "open";
		TaskService.addTask(task);
		
		$scope.task = {};
		$scope.taskForm.$setPristine();
		swapIsAdded();
		$timeout(swapIsAdded,3000);

	}
	
	function swapIsAdded(){
		$scope.isAdded = !$scope.isAdded;
	}

	$scope.removeTask = function(task){
		TaskService.removeTask(task);
	}

	$scope.users = GroupService.getUsers();
})
app.controller('GroupCtrl',function($scope,$timeout, GroupService){
	$scope.users = GroupService.getUsers();
	$scope.isAdded = false;

	$scope.addUser = function(user){
		GroupService.addUser(user);
		$scope.newUser = '';
		swapIsAdded();
		$timeout(swapIsAdded,3000);
	}

	$scope.removeUser = function(user){
		GroupService.removeUser(user);
	}

	function swapIsAdded(){
		$scope.isAdded = !$scope.isAdded;
	}

})