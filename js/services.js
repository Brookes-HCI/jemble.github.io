'use strict';

/*Services*/

app.service('GroupService',function(){
	var users = [
			{
				"firstName":"Jeremy",
				"lastName":"Bourgein",
			},
			{
				"firstName":"David",
				"lastName":"Hale"
			}
		];

		this.addUser = function(user){
			var newUser = {
				"firstName":user.firstName,
				"lastName":user.lastName
			}

			users.push(newUser);
		};

		this.getUsers = function(){
			return users;
		}
		this.removeUser = function(item){
			 var index=users.indexOf(item)
      		 users.splice(index,1); 
		}
})

app.service('TaskService',function(){
	var tasks = [
		{
			"name":"Task 1",
			"dueDate":"2014/03/01",
			"status":"open",
			"priority":"high",
			"groupMember":{"firstName":"Jeremy","lastName":"Bourgein"}
		},
		{
			"name":"Task 2",
			"dueDate":"2014/03/05",
			"status":"open",
			"priority":"low",
			"groupMember":{"firstName":"David","lastName":"Hale"}
		}
	];
	this.addTask = function(task){
		tasks.push(task);
	}
	this.getTasks = function(){
		return tasks;
	}
	this.removeTask = function(task){
		var index = tasks.indexOf(task);
		tasks.splice(index,1);
	}
})
