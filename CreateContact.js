import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';
class CreateContact extends Component{
    handleSubmit=(e)=>{
        e.preventDefault();
        const values=serializeForm(e.target, {hash : true});
        console.log(values);
        if(this.props.onCreateContact){
            this.props.onCreateContact(values);
        }
    }
    render(){
       
        return(
        <div>
            <Link className='close-create-contact' to="/"> Close </Link>
        
            <form onSubmit={this.handleSubmit} className='create-contact-form'>
                <ImageInput
                className='create-contact-avatar-input'
                name='avatarURL'
                maxheight={64}
                />
                <div className='create-contact-details'>
                    <input type="text" name="name" placeholder="name"/>
                    <input type="email" name="email" placeholder="email"/>
                    <button>Add Contacts</button>
                </div>
            </form>
        </div>

        )
    }
}

export default CreateContact;