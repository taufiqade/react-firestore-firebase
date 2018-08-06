import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Table, ButtonToolbar, Button} from 'react-bootstrap'
// import getApi from './../../actions/common'

import firestore from './../../utils/firestore'

const actionStyle = {
  width: '20%'
}

export default class Users extends Component {
  _isMount = false
  constructor() {
    super()
    this.state = {
      allUsers: []
    }
    this.userRef = firestore.collection('users')
  }

  componentDidMount() {
    console.log("did")
    this._isMount = true
    this.userRef.onSnapshot(this.onColUpdate)
  }

  componentWillMount() {
    console.log("willmount")
  }

  componentWillUnmount(){
    this._isMount = false
  }

  onColUpdate = (snapshot) => {
    if(this._isMount) {
      const docs = snapshot.docs.map( (doc) => ({
        id: doc.id,
        data: doc.data()
      }))
      this.setState({
        allUsers: docs
      })
    }
  }

  deleteAction = (id) => {
    this.userRef.doc(id).delete().then(function() {
      alert("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    
    // let allUsers = [...this.state.allUsers]
    // allUsers.splice(id, 1)
    // this.setState({
    //   allUsers: allUsers
    // })
  }

  render() {
    return (
      <div className="container">
      <Button className="add-btn">
        <Link to={`/user/add`}>Add</Link>
      </Button>
      <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Full Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
          <th style={actionStyle}>Action</th>
        </tr>
      </thead>
      <tbody>
        { this.state.allUsers.map( (user, key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{user.data.first_name} {user.data.last_name}</td>
              <td>{user.data.username}</td>
              <td>{user.data.email}</td>
              <td>{user.data.address}</td>
              <td>
                <ButtonToolbar>
                  <Button>
                    <Link to={`/user/v/${user.id}`}>View</Link>
                  </Button>
                  <Button bsStyle="warning">
                    <Link to={`/user/edit/${user.id}`}>Edit</Link>
                  </Button>
                  <Button bsStyle="danger" onClick={() => {this.deleteAction(user.id)}}>Delete</Button>
                </ButtonToolbar>
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>
      </div>
    )
  }
}