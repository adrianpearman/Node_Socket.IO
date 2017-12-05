const expect = require('expect')
const { Users} = require('./users')

describe('Users', () => {
  let users;

  beforeEach(() => {
    usersList = new Users()
    usersList.users = [
      {id: '1',
      name: 'Adrian',
      room: 'Node Course'},
      {id: '2',
      name: 'Bryan',
      room: 'React Course'},
      {id: '3',
      name: 'Andrew',
      room: 'Node Course'}
    ]
  })

  it('should add a new user', () => {
    let usersList = new Users()
    let user = {
      id: '123',
      name: 'Adrian',
      room: 'test'
    }
    let responseUser = usersList.addUsers(user.id, user.name, user.room)

    expect(usersList.users).toEqual([user])
  });

  it('should remove a user', () => {
    let userId = '3'
    let user = usersList.removeUser(userId)

    expect(user.id).toBe(user.id)
    expect(usersList.users.length).toBe(2)
  });

  it('should not remove a user', () => {
    let userId = '4'
    let user = usersList.removeUser(userId)

    expect(user).toNotExist()
    expect(usersList.users.length).toBe(3)
  });

  it('should find a single user', () => {
    let userId = '2'
    let user = usersList.getUser(userId)

    expect(user.id).toBe(userId)
  });

  it('should not find a single user', () => {
    let userId = '4'
    let user = usersList.getUser(userId)

    expect(user).toNotExist()
  });

  it('should return name for node course', () => {
    let userList = usersList.getUserList('Node Course')
    expect(userList).toEqual(['Adrian', 'Andrew'])
  });

  it('should return name for react course', () => {
    let userList = usersList.getUserList('React Course')
    expect(userList).toEqual(['Bryan'])
  });
})
