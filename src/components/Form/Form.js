import React, { Component } from 'react'
import classes from './Form.module.css'
import Button from '../Button/Button'


class Form extends Component
{
    constructor(props)
    {
          super(props)
          this.state={
              value:3
          }
    }

    onChangeHandler=(val)=>{
        this.setState({value:val})
    }

    onSubmitHandler=(e)=>{
        e.preventDefault()
    
        this.props.submit(this.state.value)
    }

    render()
    {
        return (
             <form onSubmit={(e)=>this.onSubmitHandler(e)} className={classes.form}>
                 <div className={classes.label} >Enter no. of cells you want to have in grid</div>
                 <input className={classes.input} type="text" value={this.state.value} onChange={(e)=>this.onChangeHandler(e.target.value)} placeholder={3}></input>
                 <br/>
                 <Button>Submit</Button>
             </form>
        )
    }

}

export default Form