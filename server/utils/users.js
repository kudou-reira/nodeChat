[{
    id: '/@2321552132',
    name: 'andrew',
    room: 'office'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor(){
        this.users = [];
    }
    
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    
    removeUser(id) {
        var removedId = this.users.filter((user) => {
           return user.id != id; 
        });
        
        return removedId;
    }
    
    getUser(id){
        var findId = this.users.filter((user) => {
            return user.id === id;
        })
        
        return findId[0];
    }
    
    getUserList(room){
        //find the room first
        var users = this.users.filter((user) => {
            return user.room === room; 
        });
        
        var namesArray = users.map((user) => {
            return user.name
        });

        return namesArray;
    }
}

module.exports = {
    Users: Users
}
