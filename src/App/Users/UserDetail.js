import React, { Component } from 'react'
import firestore from './../../utils/firestore'
import {Image, Button} from 'react-bootstrap'
import FieldGroup from './../Components/FieldGroup'
import './users.css'

export default class UserDetail extends Component {
  constructor(){
    super()
    this.state = {
      userDetail: {},
      nameTmp: {}
    }
  }

  componentDidMount() {
    const {id} = this.props.match.params
    // GET USER DETAILS
    this.userRef = firestore.collection('users').doc(id)
    this.userRef.get().then((doc) => {
      if(doc.exists) {
        this.setState({ userDetail: doc.data()})
      }
    })
  }

  handleChange = async (i, key) => {
    let val = {}, obj = {}
    val[key] = i.target.value
    obj = {...this.state.nameTmp, ...val}

    await this.setState({
      nameTmp:obj
    })
  }

  updateData = async () => {
    await this.setState({
      userDetail: {...this.state.userDetail, ...this.state.nameTmp}
    })  
    await this.userRef.get().then(doc => {
      if(!doc.exists) {
        this.userRef.set({...this.state.userDetail, ...{created_at: Date()}})
        .then( () => {
          alert("Document successfully updated!")
        })
      } else {
        this.userRef.update({...this.state.userDetail, ...{created_at: Date()}})
        .then( () => {
          alert("Document successfully updated!")
        })
      }
    }).catch( err => {
      console.log(err)
    })
  }

  render() {
    const {action} = this.props.match.params
    let editForm

    if(action === 'edit' || action === 'add' ) {
      editForm = <div className="card-style edit">
        <div className="content-wrap">
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Avatar"
            defaultValue={this.state.userDetail.avatar}
            onChange={(i) => { this.handleChange(i, "Avatar") }}
            placeholder="Avatar"
          />
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Username"
            defaultValue={this.state.userDetail.username}
            onChange={(i) => { this.handleChange(i, "username") }}
            placeholder="Username"
          />
          <FieldGroup
            id="formControlsText"
            type="text"
            label="First name"
            defaultValue={this.state.userDetail.first_name}
            onChange={(i) => { this.handleChange(i, "first_name") }}
            placeholder="Enter name"
          />
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Last name"
            defaultValue={this.state.userDetail.last_name}
            onChange={(i) => { this.handleChange(i, "last_name") }}
            placeholder="Enter name"
          />
          <FieldGroup
            id="formControlsText"
            type="email"
            label="Email"
            defaultValue={this.state.userDetail.email}
            onChange={(i) => { this.handleChange(i, "email") }}
            placeholder="email"
          />
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Address"
            defaultValue={this.state.userDetail.address}
            onChange={(i) => { this.handleChange(i, "address") }}
            placeholder="email"
          />
          <Button type="submit" onClick={this.updateData}>Change</Button>
        </div>
      </div>
    }

    return (
      <div className="user-detail">
        <div className="card-style">
          <Image src={`/assets/images/${this.state.userDetail.avatar}`}/>
          <div className="content-wrap">
            <h4><b>{this.state.userDetail.first_name} {this.state.userDetail.last_name}</b></h4> 
            <p>{this.state.userDetail.email}</p> 
            <p>{this.state.userDetail.gender}</p> 
            <p>{this.state.userDetail.address}</p> 
          </div>
        </div>
        {editForm}
      </div>
    )
  }
}