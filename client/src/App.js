import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import Box from '@material-ui/core/Box';

const taskPreview = (task) => (
  <li>{task.id} - {task.description}</li>
)

const taskList = (tasks) => (
  <ul>
    {tasks.map(taskPreview)}
  </ul>
)

const userTaskList = (user) => (
  <div>
    {user.email}
    {taskList(user.tasks)}
  </div>
)

const orderByCreatedOn = (task1, task2) => {
  let task1 = new Date(task1.createdOn)
  let task2 = new Date(task2.createdOn)

  return Math.sign(task2.getTime() - task1.getTime())
}

const recentTasks = (allTasks) => 
  taskList(allTasks.sort(orderByCreatedOn).slice(0, 5))

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

  state = 
    { username: ""
    , email   : ""
    }

  handleInput = (evnt) => {
    let newUser = {...this.state};

    newUser[evnt.target.name] = evnt.target.value;

    this.setState(newUser)
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewUser(this.state)
    this.setState({ username: "", email: ""})
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <input type="text"   name="username" onChange={this.handleInput} value={this.state.username} placeholder="User Name"/>
      <input type="email"  name="email"    onChange={this.handleInput} value={this.state.email}    placeholder="Email"/>
      <input type="submit"                 value="New User" />
    </form>
  )
}

class NewIssueForm extends React.Component {
  state = {
    description: ""
  }

  handleInput = (evnt) => {
    this.setState({description: evnt.target.value})
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewIssue(this.state.description)
    this.setState({ description: "" })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <input type="text"   name="description" onChange={this.handleInput} value={this.state.description} placeholder="Description" />
      <input type="submit"                    value="New Issue" />
    </form>
  )
}

const testUsers = 
  { 1: 
    { id : 1
    , email  : "foo@foo.com"
    , username: "Bob"
    , issues : 
        [ {description: "a test issue 2", status: true, id: 2, createdOn: "2019-09-28T15:05:18.180058Z"}
        , {description: "a test issue"  , status: true, id: 1, createdOn: "2019-09-27T15:05:18.180058Z"}
        , {description: "a test issue 3", status: true, id: 3, createdOn: "2019-09-29T15:05:18.180058Z"}
        ]
    }
  , 7: 
    { id : 7
    , email  : "bar@bar.com"
    , username: "Joe"
    , issues : 
        [ {description: "a joes test issue 2", status: true, id: 2, createdOn: "2019-09-28T15:05:18.180058Z"}
        , {description: "a joes test issue"  , status: true, id: 1, createdOn: "2019-09-27T15:05:18.180058Z"}
        , {description: "a joes test issue 3", status: true, id: 3, createdOn: "2019-09-29T15:05:18.180058Z"}
        ]
    }
  }

const getUsersFromServer = () => 
  fetch('/api/user/')
    .then(res => res.json())

const getIssuesFromServer = () =>
  fetch('/api/issue/')
    .then(res => res.json())

const objectFromListById = (users, issues) =>
  //convert from an array of user objects to an
  //object of user objects where the keys are user ids
  users.reduce((obj, user) => { 
    //get all issues belonging to the user
    user.issues = issues.filter(issue => issue.user === user.id);
    obj[user.id] = user; 
    return obj; 
  }, {})

const getUsersAndIssuesFromServer = () =>
  getUsersFromServer().then(users => 
  getIssuesFromServer().then(issues =>
      objectFromListById(users, issues)
  ))

const saveUserToServer = (newUser) => 
  fetch('/api/user/',
    { method  : "POST"
    , headers : { "Content-Type": "application/json" }
    , body    : JSON.stringify(newUser)
    }
  ).then(res => res.json())



// slowly building out componets 
class App extends React.Component {
  render = () => (
    <Box color="text.primary" clone>
    <Button variant="contained" color="primary">
    Hello World
  </Button>
  
  </Box>
 

  );
}

export default App;
