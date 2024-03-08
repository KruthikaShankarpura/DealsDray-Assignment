import { AppBar, Box, IconButton, Toolbar, Typography ,Button} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    let Logout=()=>{
        localStorage.clear()
    }

  return (
    <AppBar  position='relative' style={{ backgroundColor:"lavender" }}>
      <Toolbar>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }  , color:"black"}}>

             <Link to={"/"} ><Button>Home</Button></Link>
             <Link to={"/employeedetails"} ><Button>EMPLOYEE LIST</Button></Link>

            {localStorage.getItem("token") ? <h4 style={{margin:"3px 32px 10px 20px"}}>{localStorage.getItem("fullname")}</h4>: <Link to={"/login"} ><Button>Login</Button></Link>} 
           {localStorage.getItem("token") && <Link to={"/login"} onClick={Logout}><Button>Logout</Button></Link>}
        </Box>

      </Toolbar>
    </AppBar>
  )
}
