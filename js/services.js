'use strict';

/*Services*/

app.service('GroupService',function(){
	var users = [
			{
				"firstName":"Jeremy",
				"lastName":"Bourgein",
				"isLeader":true
			},
			{
				"firstName":"David",
				"lastName":"Hale",
				"isLeader":false
			}
		];

		this.clearLeaders = function(){
			for(var person in users){
				// console.log(users[person].isLeader);
				users[person].isLeader = false;
			}
		}

		this.addUser = function(user){
			var newUser = {
				"firstName":user.firstName,
				"lastName":user.lastName,
			}

			users.push(newUser);
		};

		this.getUsers = function(){
			return users;
		}
		this.removeUser = function(item){
			 var index=users.indexOf(item)
			 console.log('index: '+index);
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
			"groupMember":"Jeremy Bourgein",
		},
		{
			"name":"Task 2",
			"dueDate":"2014/03/05",
			"status":"open",
			"priority":"low",
			"groupMember":"David Hale"
		}
	];

	var priorities = ["high","med","low"];
	var status = ["open", "closed"];

	this.getStatus = function(){
		return status;
	}

	this.getPriorities = function(){
		return priorities;
	}

	this.addTask = function(task){
		
		var groupMember = task.groupMember.firstName+' '+task.groupMember.lastName;
		console.log(groupMember);
		task.groupMember = groupMember;
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
