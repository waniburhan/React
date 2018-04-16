import React, { Component } from 'react';
import './App.css';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding} from 'draft-js';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpits/Cockpit';
class App extends Component {
state = {editorState: EditorState.createEmpty(),
    persons: [{id:'njdb', name: 'BUrhan', age: '26'},
              {id:'gdg', name: 'sohaillllll', age: '28'},
              {id:'bdcghv', name: 'alam', age: '27'}

    ],
    showPersons:false,
    textdata : "",
    essayData:"",
    selectData:"",
    isGoing:true,
    email:'',
    password:'',
    formErrors: {email: '', password: ''},
    emailValid: false,
    passwordValid: false,
    formValid: false

}


focus = () => this.refs.editor.focus();
handleKeyCommand = this._handleKeyCommand.bind(this);

mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
toggleBlockType = this._toggleBlockType.bind(this);
toggleInlineStyle = this._toggleInlineStyle.bind(this);
onChange = (editorState) => this.setState({editorState});
_handleKeyCommand(command, editorState) {
  const newState = RichUtils.handleKeyCommand(editorState, command);
  if (newState) {
    this.onChange(newState);
    return true;
  }
  return false;
}

_mapKeyToEditorCommand(e) {
  if (e.keyCode === 9 /* TAB */) {
    const newEditorState = RichUtils.onTab(
      e,
      this.state.editorState,
      4, /* maxDepth */
    );
    if (newEditorState !== this.state.editorState) {
      this.onChange(newEditorState);
    }
    return;
  }
  return getDefaultKeyBinding(e);
}
_toggleBlockType(blockType) {
  this.onChange(
    RichUtils.toggleBlockType(
      this.state.editorState,
      blockType
    )
  );
}
_toggleInlineStyle(inlineStyle) {
  this.onChange(
    RichUtils.toggleInlineStyle(
      this.state.editorState,
      inlineStyle
    )
  );
}


_onUnderlineClick() {
  this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
}
_onItalicClick() {
  this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
}
_onBoldClick() {
  this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
}
// toggleColor = (toggledColor) => this._toggleColor(toggledColor);
// _toggleColor(toggledColor) {
//   const {editorState} = this.state;
//   const selection = editorState.getSelection();
//   // Let's just allow one color at a time. Turn off all active colors.
//   const nextContentState = Object.keys(colorStyleMap)
//     .reduce((contentState, color) => {
//       return Modifier.removeInlineStyle(contentState, selection, color)
//     }, editorState.getCurrentContent());
//   let nextEditorState = EditorState.push(
//     editorState,
//     nextContentState,
//     'change-inline-style'
//   );
//   const currentStyle = editorState.getCurrentInlineStyle();
//   // Unset style override for current color.
//   if (selection.isCollapsed()) {
//     nextEditorState = currentStyle.reduce((state, color) => {
//       return RichUtils.toggleInlineStyle(state, color);
//     }, nextEditorState);
//   }
//   // If the color is being toggled on, apply it.
//   if (!currentStyle.has(toggledColor)) {
//     nextEditorState = RichUtils.toggleInlineStyle(
//       nextEditorState,
//       toggledColor
//     );
//   }
//   this.onChange(nextEditorState);
// }






  switchNameHandler = (newName) => {
  this.setState({persons: [{ name: newName, age: '26'},
              { name: 'SOHAILLLLLL', age: '28'},
              { name: 'ALAM', age: '27'}

    ]});}
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p=>{
    return p.id === id
})

const newPersons = {...this.state.persons[personIndex]}
newPersons.name = event.target.value
const persons = [...this.state.persons]
persons[personIndex] = newPersons
      this.setState({persons: persons})
    }

    deletePerson = (personIndex) =>{
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons})
    }
    handleSubmit = () => {

alert(this.state.textdata + this.state.essayData);

    }
    handleChange =(event) =>{
this.setState({textdata:event.target.value})
    }
    handleEssayChange =(event) =>{
      this.setState({essayData:event.target.value})
          }

          handleSelectChange = (event) => {
            this.setState({selectData:event.target.value})
          }
    togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({showPersons:!doesShow})}
    handleInputChange = (event) => {
      event.target.checked === 'true' ? this.setState({isGoing:false}):this.setState({isGoing:true});
    }
    handleUserInput = (e) => {
      
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
      

    }
   render() {
        const style = {
        backgroundColor: "blue",
        color:"white",
        font:'inherit',
        border:'1px solid blue',
        padding:'8px',
        cursor:'pointer',
        ':hover':{
          backgroundColor:'lightblue'
        }
     
        };
        const style2 = {
          backgroundColor: "blue",
          color:"white",
          font:'inherit',
          border:'1px solid blue',
          padding:'8px',
          cursor:'pointer',
          ':hover':{
            backgroundColor:'lightblue'
          }
       
          };
        let persons = null;
        if(this.state.showPersons){
        persons = ( <div>

          <Persons
            persons={this.state.persons}
            click = {this.deletePerson}
            changed = {this.nameChangeHandler}
          />
       

        })}

        <button onClick={this.addPersonHandler}>Add card</button>
      {/*
       <Person

              name={this.state.persons[0].name}
              age ={this.state.persons[0].age}/>
       <Person
                click={this.switchNameHandler.bind(this,'BUry')}
               clicks={this.nameChangeHandler}
               name={this.state.persons[1].name}
               age ={this.state.persons[1].age}> he is married </Person>
       <Person
               name={this.state.persons[2].name}
               age ={this.state.persons[2].age}/>*/}
        </div>);
        style.backgroundColor = "green"
        
        }
        else{persons = (<p> click the button</p>);}


if(this.state.persons.length===0){
  persons=(<p className = 'red bold'>You deleted all the data!!!!!!</p>);
  
}
const colorStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
};
const {editorState} = this.state;
let className = 'RichEditor-editor';
          var contentState = editorState.getCurrentContent();
          if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
              className += ' RichEditor-hidePlaceholder';
            }
          }
    return (
      
       <div className='Person'>
          <Cockpit persons={this.state.persons} clicked={this.togglePersonsHandler} style={style} />
          <div className="Person">
          

  <div>
              
              <div>
              
              <div className="RichEditor-root">
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <div className={className} onClick={this.focus}>
                <Editor
                  blockStyleFn={getBlockStyle}
                  customStyleMap={styleMap}
                  editorState={editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  keyBindingFn={this.mapKeyToEditorCommand}
                  onChange={this.onChange}
                  placeholder="Tell a story..."
                  ref="editor"
                  spellCheck={true}
                />
              </div>
            </div>
              </div>
            </div>
          </div>
       {/*<form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>        <br />
          <br />
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleEssayChange} />
        </label>
        <br />
        <select value={this.state.value} onChange={this.handleSelectChange}>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option selected value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
      <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
       
        <input  type="submit" value="Submit" />

      </form>
      <form>
       <h2>Sign up</h2>
       <div>
         <label htmlFor='emai'l>Email address</label>
         <input type='email'
           name='email' />
       </div>
       <div>
         <label htmlFor='password'>Password</label>
         <input type='password' 
           name='password' />
       </div>
       <button type='submit' className='btn btn-primary'>
          Sign up
       </button>
    </form>*/}
     <br />
      
      


      <p>Name: {this.state.textdata}</p>
      <p>Essay: {this.state.essayData}</p>

      <p>You selected following fruit: {this.state.selectData}</p>
       {/*<button onClick={this.switchNameHandler.bind(this, 'BURHAN ASLAM WANI') } style={style}> Switch Name </button>*/}

        {persons}
      </div>

    );
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];
const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default App;
