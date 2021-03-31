import React,{Component} from 'react'
import Maze from './components/Maze/Maze'
import classes from './App.module.css';

class App extends Component
{

  render()
  {
    return (
      <div className={classes.container}>
        <Maze></Maze>    
      </div>
    )
  }
  
}

export default App;
