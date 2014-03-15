'use strict';

/*Directives*/

app.directive('clickToEditGroup',function(){
	return {
		restrict: 'A',
		replace: true,
		// template: '<tr ng-include="$parent.getTemplateUrl()"></tr>',
		// templateUrl:'partials/click_to_edit_partials/editGroup.html',
		templateUrl:function(elem,attrs){
			switch(attrs.temp){
				case "group":
				return 'partials/click_to_edit_partials/editGroup.html';
				break;
				case "tasks":
				return 'partials/click_to_edit_partials/editTask.html';
				break;
			}
			//return 'partials/click_to_edit_partials/editGroup.html'
		},
		scope: {
			value:'=clickToEditGroup'
		},

		controller: function($scope,GroupService){

			var origVal = angular.copy($scope.value); //copy so that we break the binding
			$scope.users = GroupService.getUsers();
			
			$scope.view = {
				editableValue:$scope.value,
				editorEnabled:false
			};
			$scope.enableEditor = function(){
				$scope.view.editorEnabled = true;
				$scope.view.editableValue = $scope.value;
			}

            $scope.disableEditor = function() {
            	$scope.value = origVal;
                $scope.view.editorEnabled = false;
            };

            $scope.save = function(){
            	$scope.value = $scope.view.editableValue;
            	$scope.view.editorEnabled = false;
            }

            $scope.remUser = function(){
            	GroupService.removeUser($scope.value);
            }
		},

	}
})