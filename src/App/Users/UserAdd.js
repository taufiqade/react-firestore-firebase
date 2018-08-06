import React, { Component } from 'react'
import firestore from './../../utils/firestore'
import FieldGroup from './../Components/FieldGroup'
import {Image, Button} from 'react-bootstrap'

import './users.css'

export default class UserAdd extends Component {
    constructor(){
        super()
        this.state = {
          userDetail: {}
        }
      }

    handleChange = async (i, key) => {
        let val = {}, obj = {}
        val[key] = i.target.value
        obj = {...this.state.userDetail, ...val}

        await this.setState({
            userDetail:obj
        })
    }

    updateData = async () => {
        const data = {...this.state.userDetail, ...{created_at:Date()} }
        await firestore.collection('users').add(data)
        .then(function(docRef) {
            alert("Document written with ID: ", docRef.id);
        })
        .catch( err => {
            console.log("We have an error : ",err)
        })
        console.log(data)
    }

    render() {
        const avatar = "/assets/images/avatar.jpg"
        return (
            <div className="user-detail">
            <div className="card-style">
                <Image src={`/assets/images/${this.state.userDetail.avatar ?this.state.userDetail.avatar: avatar}`}/>
                <div className="content-wrap">
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Avatar"
                    defaultValue={this.state.userDetail.avatar}
                    onChange={(i) => { this.handleChange(i, "avatar") }}
                    placeholder="Avatar"
                />
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="username"
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
                    placeholder="Enter first name"
                />
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Last name"
                    defaultValue={this.state.userDetail.last_name}
                    onChange={(i) => { this.handleChange(i, "last_name") }}
                    placeholder="Enter last name"
                />
                <FieldGroup
                    id="formControlsText"
                    type="email"
                    label="Email"
                    defaultValue={this.state.userDetail.email}
                    onChange={(i) => { this.handleChange(i, "email") }}
                    placeholder="Email"
                />
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Address"
                    defaultValue={this.state.userDetail.address}
                    onChange={(i) => { this.handleChange(i, "address") }}
                    placeholder="Address"
                />
                <Button type="submit" onClick={this.updateData}>Add</Button>
                </div>
            </div>
            </div>
        )
    }

}