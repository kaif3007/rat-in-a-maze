import React from 'react'
import classes from './Cell.module.css'


const Cell=props=>{

    let classnames=[classes.gridItem]
    let text=null
    
    if(props.value===1)
     classnames.push(classes.red)
  
    else if(props.value===-1)
    { classnames.push(classes.start)
      text='Start'
    }
    else if(props.value===3)
    {classnames.push(classes.end)
        text='End'
    }


    return (
        <div className={classnames.join(' ')} onClick={()=>props.onClick(props.id)}>
            {text}
        </div>
    )

}

export default Cell