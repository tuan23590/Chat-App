import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { APICreateUser } from '../utils/UserUtil';
import { useNavigate } from 'react-router-dom';

export default function Login() {
   const auth = getAuth();
   const navigate = useNavigate();
   const handleLoginWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      
         const data = await APICreateUser({
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
            photoUrl: res.user.photoURL
         });
      if(data) {
         navigate('/');
      }
   }
  return (
   <Box sx={{
      textAlign: 'center',
      marginTop: '10vh'
   }}>
   <Typography variant="h4" gutterBottom>
      Login Chat App
   </Typography>
   <Button variant="outlined" color="primary" onClick={handleLoginWithGoogle} >
      Login With Google
   </Button>
   </Box> 
  )
}
