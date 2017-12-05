class Users {
  constructor(){
    this.users = []
  }
  addUsers(id, name, room){
    let user = {
      id,
      name,
      room
    }
    this.users.push(user)
    return user
  }
  removeUser(id){
    let user = this.users.filter((user) => user.id ===id)[0]

    if (user) {
      this.users = this.users.filter((user) => user.id !== id)
    }

    return user
  }
  getUser(id){
    return this.users.filter((user) => user.id ===id)[0]
  }
  getUserList(room){
    let usersList = this.users.filter((user) => {
      return user.room === room
    })
    let namesArray = usersList.map((user) => {
      return user.name
    })
    return namesArray
  }
}

module.exports = {Users}
