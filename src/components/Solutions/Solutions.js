import React from 'react'
import classes from './Solutions.module.css'


const Solutions=props=>{

    let grid=new Array(props.size)
    for(let i=0;i<props.size;i++)
      grid[i]=new Array(props.size)


    let idx=0;
    
    const arr=props.string.split(',')
    console.log(arr)
    for(let i=0;i<props.size;i++)
    {
        for(let j=0;j<props.size;j++)
         {
            grid[i][j]=parseInt(arr[idx]);
            idx++;
         }
    }

    //console.log(grid)

    return (
        <div className={classes.gridContainer} style={{gridTemplateColumns:`repeat(${props.size},1fr)`}}>
        {grid.map(g=>{
           // console.log(g)

           return (
               g.map(gc=>{
                    //console.log(gc)
                   return (gc>0?<div className={classes.gridItem} style={{backgroundColor:'green'}}>{gc}</div>:
                   <div className={classes.gridItem} style={{backgroundColor:'white'}}/>    

                   )
        })
        )}
        )}

        </div>
        
    )

}

export default Solutions