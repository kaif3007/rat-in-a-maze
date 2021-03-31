import React,{Component,Fragment} from 'react'
import classes from './Maze.module.css'
import Cell from '../Cell/Cell'
import Button from '../Button/Button'
import Solutions from '../Solutions/Solutions'
import Form from '../Form/Form'



class Maze extends Component
{
   
    constructor(props)
    {
        super(props)
        this.state={
            grid:null,
            size:null,
            solutions:[]
        }
    }


    submit=(val)=>{

        let grid=new Array(val)
        for(let i=0;i<val;i++)
          grid[i]=new Array(val)

          for(let i=0;i<val;i++)
          {
              for(let j=0;j<val;j++)
               grid[i][j]=0;  
          }

          grid[0][0]=-1;
          grid[val-1][val-1]=3

          this.setState(
              {grid:grid,
               size:val})
    }

    isSafe(i,j,matrix)
    {
        return i>=0 && j>=0 && i<this.state.size && j<this.state.size && matrix[i][j]===0 && this.state.grid[i][j]!==1
    }

    
    recurse(i,j,matrix,ans,l)
    {
        
        if(i===this.state.size-1 && j===this.state.size-1 )
        {
            ans.push(matrix.toString())
            return true
        }

        let flag=0;
        if(this.isSafe(i-1,j,matrix))
        {
            matrix[i-1][j]=l++
            flag|=this.recurse(i-1,j,matrix,ans,l)
            l--
            matrix[i-1][j]=0
        }
        if(this.isSafe(i+1,j,matrix))
        {
            matrix[i+1][j]=l++
            flag|=this.recurse(i+1,j,matrix,ans,l)
            l--
            matrix[i+1][j]=0
        }
        if(this.isSafe(i,j-1,matrix))
        {
            matrix[i][j-1]=l++
            flag|=this.recurse(i,j-1,matrix,ans,l)
            l--
            matrix[i][j-1]=0
        }
        if(this.isSafe(i,j+1,matrix))
        {
            matrix[i][j+1]=l++
            flag|=this.recurse(i,j+1,matrix,ans,l)
            l--
            matrix[i][j+1]=0
        }

        return flag;
    }

    onClick=()=>{
        let grid=new Array(this.state.size)
        for(let i=0;i<this.state.size;i++)
          grid[i]=new Array(this.state.size)

          for(let i=0;i<this.state.size;i++)
          {
              for(let j=0;j<this.state.size;j++)
               grid[i][j]=0;  
          }

         let ans=[]
         grid[0][0]=1
         let l=2
         this.recurse(0,0,grid,ans,l)
         this.setState({solutions:ans})
    }

    tryAgain=()=>{
         this.setState({solutions:[],grid:null})
    }

    setConstraint=(id)=>{
        let grid=new Array(this.state.size)
        for(let i=0;i<this.state.size;i++)
          grid[i]=new Array(this.state.size)

          for(let i=0;i<this.state.size;i++)
          {
              for(let j=0;j<this.state.size;j++)
               grid[i][j]=this.state.grid[i][j];  
          }

         

          const row=Math.floor(id/this.state.size);
          const col=id%this.state.size;
          if(this.state.grid[row][col])
           grid[row][col]=0
         else
          grid[row][col]=1

          this.setState({grid:grid})
    }

    render()
    {
      
        return (
            <Fragment>
               
                <div className={classes.mainContainer}>
                <Form submit={(v)=>this.submit(v)}></Form>
                        {this.state.grid && (<div className={classes.gridContainer} style={{gridTemplateColumns:`repeat(${this.state.grid.length},1fr)`}}>
                        
                        {this.state.grid.map((g,idx)=>{
                        return (
                            g.map((gc,idx1)=>{
                                return <Cell key={idx*this.state.size+idx1} id={idx*this.state.size+idx1} value={gc} onClick={(v)=>this.setConstraint(v)}></Cell>
                            })
                        )}
                        )
                        }
                        </div>       
                    )}
            

                    {this.state.grid && (this.state.solutions.length>0?<Button onClick={this.tryAgain}>Try Again</Button>:
                    <Button onClick={this.onClick}>Calculate Results</Button>)}
                    
                   { this.state.grid && <div className={classes.container}>
                        Total number of solutions are: <bold>{this.state.solutions.length}</bold> 
                    </div>
                    }
            

                   

                </div>
              
                 <div className={classes.secondaryContainer}>
                    {this.state.solutions.length>0 && this.state.solutions.map(soln=>{
                        return <Solutions string={soln} size={this.state.size}/>
                    }) }
                 </div>
               
            </Fragment>     
        )
    }

}

export default Maze