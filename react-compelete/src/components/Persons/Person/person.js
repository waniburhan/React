import React, {Component} from 'react';
import './person.css';

class Person extends Component  {
    render(){
    return (
    <div className='Person'>
        <p> I am {this.props.name} and i am {this.props.age } years old!!</p>
        {this.props.children}
        <input type = 'text' onChange={this.props.changed} value={this.props.name}/>
        <button className = 'buttonDel' onClick={this.props.click}>DELETE </button>
    </div>
)}
}
export default Person;



