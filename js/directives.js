'use strict';

/*Directives*/

app.directive('clickToEditGroup',function(){
	var type;
	return {
		restrict: 'A',
		replace: true,
		// template: '<tr ng-include="$parent.getTemplateUrl()"></tr>',
		// templateUrl:'partials/click_to_edit_partials/editGroup.html',
		templateUrl:function(elem,attrs){
			type = attrs.temp;
			switch(attrs.temp){
				case "group":
				return 'partials/click_to_edit_partials/editGroup.html';
				break;
				case "tasks":
				return 'partials/click_to_edit_partials/editTask.html';
				break;
				case "proj":
				return 'partials/click_to_edit_partials/editHome.html';
				break;
			}
			//return 'partials/click_to_edit_partials/editGroup.html'
		},
		scope: {
			value:'=clickToEditGroup'
		},

		controller: function($scope,$modal,$filter,GroupService, TaskService){

			var origVal = angular.copy($scope.value); //copy so that we break the binding
			$scope.users = GroupService.getUsers();
			$scope.priorities = TaskService.getPriorities();
			$scope.statuses = TaskService.getStatus();
			$scope.project = "Your project name";

			$scope.view = {
				editableValue:$scope.value,
				editorEnabled:false
			};

			$scope.clearLeaders = function(){
				//this is here so that the binding works
				
			};

			$scope.enableEditor = function(){
				origVal = angular.copy($scope.value); //copy so that we break the binding
				$scope.view.editorEnabled = true;
				$scope.view.editableValue = $scope.value;
			}

            $scope.disableEditor = function() {
            	$scope.value = origVal;
                $scope.view.editorEnabled = false;
            };
            $scope.save = function(){
            	var isLeader = $scope.view.editableValue.isLeader;
            	console.log(isLeader);
            	if(type=="group"){
            		console.log("leaders");
            		GroupService.clearLeaders();
            	}
            	$scope.value = $scope.view.editableValue;
            	$scope.value.isLeader = isLeader;
            	$scope.value.date = $filter('date')($scope.view.editableValue.date, "dd-MMMM-yyyy");
            	$scope.view.editorEnabled = false;
            	
            }

            $scope.remUser = function(){
            	console.log($scope.value);
            	var val = $scope.value;
            	var modal = $modal.open({
            		template:"<div style='padding:15px'><h4>Are you sure you want to delete this item?</h4><button ng-click='ok()' class='btn btn-primary'>Yes</button><button ng-click='cancel()' class='btn btn-default'>Cancel</button></div>",
            		controller:function($scope,$modalInstance){
            			$scope.ok = function(){
            				switch (type){
		            			case "group":
		            			GroupService.removeUser(val);
		            			break;
		            			case "tasks":
		            			TaskService.removeTask(val);
		            			break;
		            		}
		            		$modalInstance.dismiss('cancel');
            			}
            			$scope.cancel = function(){
            				$modalInstance.dismiss('cancel');
            			}
            		}
            	});            	
            }
		},

	}
})