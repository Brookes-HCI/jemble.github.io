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
	})
