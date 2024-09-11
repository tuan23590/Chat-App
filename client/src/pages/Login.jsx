import React from 'react'
import { Button, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export default function Login() {
   const auth = getAuth();
   const handleLoginWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
   }
  return (
   <>
   <Typography variant="h4" gutterBottom>
      Login
   </Typography>
   <Button variant="outlined" color="primary" onClick={handleLoginWithGoogle} >
      Login With Google
   </Button>
   </> 
  )
}
