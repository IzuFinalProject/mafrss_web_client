import React, { useState } from 'react';
import { useNavigate  } from "react-router-dom";
import {Box,TextField,Button} from '@mui/material';

import AuthService from '../services/auth'
export default function ResetPassword() {
    const navigate = useNavigate ()
    const [email,setEmail] = useState("")
    const onSubmit = (e)=>{
        e.preventDefault();
    
        AuthService.reset_password({email})
        .then(()=>{
            console.log("sucess")
            navigate("/")
        })
    }
    return (
        <div className='container mt-5'>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email "
              name="email"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            
          </Box>
          </div>
    );
};
