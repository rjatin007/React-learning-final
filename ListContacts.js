import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom';
class ListContacts extends Component{
    static propTypes={
    contacts : PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
    }
    
    state={
        query : ''
    }
    
    updateQuery = (query) =>{
        this.setState({query : query.trim()})
    }
    clearQuery=() => {
        this.setState({ query : ''})
    }
    render(){
        const { contacts , onDeleteContact } =this.props;
        const { query } =this.state;
        
        let showingContacts;
        
        if(query){
            // this line of code escapes any special characters and 'i' ignores the case
            const match=new RegExp(escapeRegExp(query),'i');
            
            showingContacts=contacts.filter((contact) => match.test(contact.name));
        
        } else{
            
            showingContacts=contacts;
        }

        showingContacts.sort(sortBy('name'));
    
    return(

        <div className='list-contacts'>
          
            <div className='list-contacts-top'>
                <input 
                    className='search-contacts'
                    type='text'
                    placeholder='Search contacts'
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)} 
                />
                
                <Link 
                    to='/create' 
                    className='add-contact'
                    >Add contact</Link>

            </div>

            {showingContacts.length !== contacts.length && (
                <div className='showing-contacts'> 
                <span>Now Showing {showingContacts.length} of {contacts.length} total </span>
                <button onClick= {this.clearQuery}>Show all</button>    
                </div> 
            )}
             <ol className='contact-list'>
                {showingContacts.map((contact) => 
                    <li key={contact.id} className='contact-list-item'>
                        <div className='contact-avatar' style={{
                            backgroundImage: `url(${contact.avatarURL})`
                        }}/>
                        <div className='contact-details'>
                         <p> {contact.name} </p>
                         <p> {contact.email} </p>
                        </div>  
                        <div onClick={()=> onDeleteContact(contact)} className = 'contact-remove'>
                            Remove
                        </div> 
                    </li>
                )}
            </ol>
        </div>
       
    )
    } 
}

export default ListContacts;