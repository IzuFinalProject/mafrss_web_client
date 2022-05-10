import React, { useState } from 'react';
import { useNavigate ,useParams } from "react-router-dom";
import {Box,TextField,Button} from '@mui/material';

import AuthService from '../services/auth'
import UseAlert from '../common/useAlert';
export default function ResetPassword() {
    const navigate = useNavigate ()
    const params = useParams()
    const [newPassword,setNewPassword] = useState("")
    const [reNewPassword,setReNewPassword] = useState("")
    const [errors,setErrors] = useState({password:[],re_password:[],token:null})
    const onSubmit = (e)=>{
        e.preventDefault();
        AuthService.reset_password_confirm({new_password:newPassword,re_new_password:reNewPassword,token:params.token,uid:params.uid})
        .then(()=>{
            navigate("/")
        })
        .catch((error)=>{
          const {response} = error
          console.log({response})
          if(response.data.new_password)
          setErrors(prev=>({...prev,password:response.data.new_password[0]}))
          if(response.data.re_new_password)
          setErrors(prev=>({...prev,re_password:response.data.re_new_password[0]}))
        })
    }
    return (
        <div className='container mt-5'>
          <UseAlert open={errors.token} setOpen={setErrors}/>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              value={newPassword}
              helperText={errors.password[0]}
              error={errors.password.length}
              onChange={(e) => setNewPassword(e.target.value)}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="re_password"
              label="Confirm New Password"
              type="password"
              id="re_password"
              value={reNewPassword}
              helperText={errors.re_password[0]}
              error={errors.re_password.length}
              onChange={(e) => setReNewPassword(e.target.value)}
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
