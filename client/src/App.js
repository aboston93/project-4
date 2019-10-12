import React from 'react';

import './App.css';

const imagePreview = (media) => (
  <div>
    <img src={user.media.url} alt="Character Image" />
  </div>
)

const imageList = (medias) => (
  <div>
    {medias.map(imagePreview)}
  </div>

)

const taskPreview = (task) => (
  <li>{task.id} - {task.description}-{task.createdOn}</li>
)

const taskList = (tasks) => (
  <ul>
    {tasks.map(taskPreview)}
  </ul>
)

const userImageList = (user) => (
  <div>
    {user.email}
    {imageList(user.medias)}
  </div>



)

const userTaskList = (user) => (
  <div>
    {user.email}
    {taskList(user.tasks)}
  </div>
)

const orderByCreatedOn = (task1, task2) => {
  task1 = new Date(task1.createdOn)
  task2 = new Date(task2.createdOn)

  return Math.sign(task2.getTime() - task1.getTime())
}

const recentTasks = (allTasks) =>
  taskList(allTasks.sort(orderByCreatedOn).slice(0, 5))

const recentMedias = (allMedias) =>
  imageList(allMedias.sort(orderByCreatedOn).slice(0, 5))


const taskDetails = (task) => (
  <div>
    {task.id} - {task.description}
    <button>{task.status ? "Close" : "Open"}</button>
  </div>
)

const userPreview = (user) => (
  <option value={user.id}>{user.username}</option>
)

const userList = (users, currentUserId, onChange) => (
  <select value={currentUserId} onChange={(evnt) => onChange(evnt.target.value)}>
    {users.map(userPreview)}
  </select>
)



class NewUserForm extends React.Component {

  state = {
    newUser:


      { username: "", email: "" }
  }

  handleInput = (evnt) => {
    let newUser = { ...this.state.newUser };

    newUser[evnt.target.name] = evnt.target.value;

    this.setState({ newUser })
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewUser(this.state.newUser)
    this.setState({ username: "", email: "" })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <input type="text" name="username" onChange={this.handleInput} value={this.state.username} placeholder="User Name" />
      <input type="email" name="email" onChange={this.handleInput} value={this.state.email} placeholder="Email" />
      <input type="submit" value="NewUser" />
    </form>
  )
}

class NewTaskForm extends React.Component {
  state = {
    newTask:

      { description: "" }
  }
  handleInput = (evnt) => {
    let newTask = { ...this.state };

    newTask[evnt.target.name] = evnt.target.value;

    this.setState(newTask)
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewTask(this.state.description)
    this.setState({
      description: "", status: ""
      , createdOn: ""
    })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <input type="text" name="description" onChange={this.handleInput} value={this.state.description} placeholder="description" />
      <input type="boolean" name="description" onChange={this.handleInput} value={this.state.description} placeholder="description" />
      <input type="datetime-local" name="description" onChange={this.handleInput} value={this.state.description} placeholder="description" />
      <input type="submit" value="New Task" />
    </form>
  )
}


class NewMediaForm extends React.Component {
  state = {
    newMedia:

      { url: "" }
  }
  handleInput = (evnt) => {
    let newMedia = { ...this.state };

    newMedia[evnt.target.name] = evnt.target.value;

    this.setState(newMedia)
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewMedia(this.state.url)
    this.setState({ url: "", status: "", })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <input type="text" name="url" onChange={this.handleInput} value={this.state.url} placeholder="url" />

      <input type="submit" value="New Media" />
    </form>
  )
}
const testUsers =
{
  1:
  {
    id: 1
    , email: "foo@foo.com"
    , username: "Bob"
    , tasks:
      [{ description: "a test issue 2", status: true, id: 2, createdOn: "2019-09-28T15:05:18.180058Z" }
        , { description: "a test issue", status: true, id: 1, createdOn: "2019-09-27T15:05:18.180058Z" }
        , { description: "a test issue 3", status: true, id: 3, createdOn: "2019-09-29T15:05:18.180058Z" }
      ]
  }
  , 7:
  {
    id: 7
    , email: "bar@bar.com"
    , username: "Joe"
    , tasks:
      [{ description: "a joes test issue 2", status: true, id: 2, createdOn: "2019-09-28T15:05:18.180058Z" }
        , { description: "a joes test issue", status: true, id: 1, createdOn: "2019-09-27T15:05:18.180058Z" }
        , { description: "a joes test issue 3", status: true, id: 3, createdOn: "2019-09-29T15:05:18.180058Z" }
      ]
  }
}

const testMedias =
{
  1:
  {
    id: 1
    , email: "foo@foo.com"
    , username: "Bob"
    , media:
      [{ url: "https://i.imgur.com/YUZUspH.gif", status: true, id: 2, createdOn: "2019-09-28T15:05:18.180058Z" }

      ]
  }
}

const getUsersFromServer = () =>
  fetch("/api/user/")
    .then(res => res.json())

const getTasksFromServer = () =>
  fetch("/api/taskitem/")
    .then(res => res.json())

const getMediasFromServer = () =>
  fetch("/api/media/")
    .then(res => res.json())

const objectFromListById = (users, tasks) =>
  //convert from an array of user objects to an
  //object of user objects where the keys are user ids
  users.reduce((obj, user) => {
    //get all issues belonging to the user
    user.tasks = tasks.filter(task => task.user === user.id);
    obj[user.id] = user;
    return obj;
  }, {})

const getUsersAndTasksAndMediaFromServer = () =>
  getUsersFromServer().then(users =>
    getTasksFromServer().then(tasks =>
      getMediasFromServer().then(medias =>

        objectFromListById(users, tasks, medias)
      )))

const saveUserToServer = (newUser) =>
  fetch("/api/user/",
    {
      method: "POST"
      , headers: { "Content-Type": "application/json" }
      , body: JSON.stringify(newUser)
    }
  ).then(res => res.json())

const saveTaskToServer = (newTask) =>
  fetch("/api/taskitem/",
    {
      method: "POST"
      , headers: { "Content-Type": "application/json" }
      , body: JSON.stringify(newTask)
    }
  ).then(res => res.json())

// slowly building out componets 
class App extends React.Component {

  state = {
    currentUser: 1,
    users: testUsers
    , task: ""
    , media: testMedias
  }

  componentDidMount = () => {
    //saveUserToServer({username: "testUser", email: "foo@foobar.com"})
    getUsersAndTasksAndMediaFromServer()
      .then(users => {
        this.setState({ users, })
      })
  }

  getNextId = () =>
    //gets the max id from the isssues of the current user
    Math.max(...this.getCurrentUser().tasks.map(task => task.id)) + 1

  addNewTaskCurrentUser = (description) => {
    const newTask =
    {
      description
      , status: true
      , id: this.getNextId()
      , createdOn: new Date().toISOString()
    }

    let users = { ...this.state.users };

    users[this.state.currentUser].tasks.push(newTask);

    this.setState({ users });
  }


  getNextMediaId = () =>
    //gets the max id from the isssues of the current user
    Math.max(...this.getCurrentUser().medias.map(media => media.id)) + 1

  addNewMediaCurrentUser = (media) => {
    const newMedia =
    {
      description: ""
      , url: ""

    }

    let users = { ...this.state.users };

    users[this.state.currentUser].tasks.push(newMedia);

    this.setState({ users });
  }
  getNextUserId = () =>
    Math.max(...this.getAllUsers().map(user => user.id)) + 1

  addNewUser = (newUserInfo) => {
    console.log(newUserInfo)
    saveUserToServer(newUserInfo)
      .then(newUser => {
        console.log(newUser);
        newUser.medias = [];

        let users = { ...this.state.users };

        users[newUser.id] = newUser;

        this.setState({ users, currentUser: newUser.id });
      })
  }




  getCurrentUser = () =>
    this.state.users[this.state.currentUser]

  getCurrentTask = () =>
    this.state.tasks[this.state.currentTask]

  getCurrentMedia = () =>
    this.state.medias[this.state.current]


  getAllUsers = () =>
    Object.values(this.state.users)

  getAllTasks = () =>
    this.getAllUsers().flatMap(user => user.tasks)
  //this.getAllUsers().map(user => user.issues).flat()
  getAllMedias = () =>
    this.getAllUsers().flatMap(user => user.medias)

  setCurrentUser = (currentUser) => {
    this.setState({ currentUser })
  }

  setCurrentTask = (currentTask) => {
    this.setState({ currentTask })
  }


  setCurrentMedia = (currentMedia) => {
    this.setState({ currentMedia })
  }



  render = () => (
    <div className="container">
      <aside className="sidebar">
        <NewUserForm addNewUser={this.addNewUser} />
        <NewTaskForm addNewTask={this.addNewTaskCurrentUser} />
        <NewMediaForm addNewMedia={this.addNewMediaCurrentUser} />
        {recentTasks(this.getAllTasks())}
        {recentMedias(this.getAllMedias())}
      </aside>

      <article className="mainContent">
        {userList(this.getAllUsers(), this.state.currentUser, this.setCurrentUser)}
        {userTaskList(this.getCurrentUser())}
        {userImageList(this.getCurrentMedia())}
      </article>
    </div>
  )
}

export default App;