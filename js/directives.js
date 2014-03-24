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

		controller: function($scope,$modal,GroupService, TaskService){

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
            	$scope.view.editorEnabled = false;
            }

            $scope.ok = function(){
            	console.log("ok");
            }

            $scope.remUser = function(){
            	console.log($scope.value);
            	var modal = $modal.open({
            		template:"<div style='padding:20px;font-align:center'><h3>Are you sure you want to delete this item{{project}}?</h3><button ng-click=\"ok()\" class='btn btn-primary'>Yes</button><button ng-click='cancel()' class='btn btn-default'>Cancel</button><div>",
            		controller:function($scope,$modalInstance){
            			$scope.ok = function(){
            				switch (type){
		            			case "group":
		            			GroupService.removeUser($scope.value);
		            			break;
		            			case "tasks":
		            			TaskService.removeTask($scope.value);
		            			break;
		            		}
		            		$modalInstance.dismiss('cancel');
            			}
            			$scope.cancel = function(){
            				$modalInstance.dismiss('cancel');
            			}
            		}
            	});
            	// var conf = confirm("Are you sure you want to delete this entry?");
            	// if(conf){
	            // 	switch (type){
	            // 		case "group":
	            // 		GroupService.removeUser($scope.value);
	            // 		break;
	            // 		case "tasks":
	            // 		TaskService.removeTask($scope.value);
	            // 		break;
	            // 	}
	            // }
            	
            }
		},

	}
})