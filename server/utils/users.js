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
        
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user) => {
               return user.id !== id
            });
        }
        
        return user;
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
