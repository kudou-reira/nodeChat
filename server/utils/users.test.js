const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {
    
    var users;
    
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'karia',
                room: '4th grail war'
            },
            {
                id: '2',
                name: 'saber',
                room: '5th grail war'
            },
            {
                id: '3',
                name: 'kiritsugu',
                room: '4th grail war'
            }
        ];
    });
    
    it('should add new users', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'karia',
            room: 'darkness'
        }
        
        var response = users.addUser(user.id, user.name, user.room);
        //users.users second users is the this.users array
        expect(users.users).toEqual([user]);
    });
    
    it('should remove a user', () =>  {
        var userList = users.removeUser('1');
        expect(userList).toNotEqual(users.users);
    });
    
    it('should not remove user', () => {
        var userList = users.removeUser('4');
        expect(userList).toEqual(users.users);
    });
    
    it('should find user', () => {
        var findUser = users.getUser('1');
        expect(findUser).toBe(users.users[0]);
    });
    
    it('should not find user', () => {
        var findUser = users.getUser('4');
        expect(findUser).toBe(undefined);
    });
    
    it('should return names for people in same room', () => {
        var userList = users.getUserList('4th grail war');
        
        expect(userList).toEqual(['karia', 'kiritsugu']);
    });
})