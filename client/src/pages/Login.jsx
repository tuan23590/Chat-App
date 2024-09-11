import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { APICreateUser } from '../utils/UserUtil';

export default function Login() {
   const auth = getAuth();
   const handleLoginWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      
         const data = await APICreateUser({
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
            photoUrl: res.user.photoURL
         });
         console.log(data);
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
