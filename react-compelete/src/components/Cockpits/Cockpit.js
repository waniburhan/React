import React from 'react';

const cockpit = (props) => {
    let classes = [];
if(props.persons.length<=2){
  classes.push('red')
}

if(props.persons.length<=1){
  classes.push('bold')
}
    return( <div>
                 <p className={classes.join(' ')}> <h1>REACT APPLICATION </h1></p>
           <button onClick={props.clicked } style={props.style}> Switch Name </button></div>
);
};
export default cockpit;