import EmailIcon from '@mui/icons-material/Email';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Input,
  Card,
  Button,
  Box,
} from '@mui/material';
import greenApple from '@iconify/icons-noto/green-apple';
import { Icon, InlineIcon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import {
  Space,
  Card as SupabaseCard,
  Typography as SupabaseTypography,
} from '@supabase/ui';
import MyLayout from 'src/supabase/components/MyLayout';

import {
  // useUser,
  // useMyAuth,
  // UserContext,
  useAuth,
} from 'src/supabase/hooks/useAuth';
import Header from '../supabase/components/Header';

function SignIn() {
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    const signIn = await auth.login(email);

    if (signIn.error) {
      setMessage(signIn.error.message);
    } else {
      setMessage('Login link has beent sent.');
    }

    setEmail('');
  };
  const handleSignOut = async (e) => {
    e.preventDefault();

    const signOut = await auth.logout();

    setMessage('Thank you for successfully signing out!');

    setEmail('');
  };
  const LoggedIn = (
    <MyLayout>
      <Card sx={{ background: '#e9e9e9', p: 4 }}>
        <Box sx={boxStyle} direction="vertical" size={6}>
          <b>{message && message}</b>
        </Box>
        <Box sx={boxStyle} direction="vertical" size={6}>
          <Typography variant="title">You're already logged in!</Typography>
          <form style={formStyle}>
            <Button onClick={handleSignOut}>Log out</Button>
          </form>
        </Box>
      </Card>
    </MyLayout>
  );
  const NotLoggedIn = (
    <MyLayout>
      <Card sx={{ background: '#e9e9e9', p: 4 }}>
        <Box sx={boxStyle} direction="vertical" size={6}>
          <b>{message && message}</b>
        </Box>
        <Box sx={boxStyle} direction="vertical" size={6}>
          <Typography variant="title">Login Form</Typography>
          <form style={formStyle} onSubmit={handleSignIn}>
            <Input
              style={inputStyle}
              icon={<Icon icon={greenApple} />}
              type="text"
              value={email}
              label="With Input"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* <input
        style={inputStyle}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> */}
            <Button>Log in</Button>
          </form>
        </Box>
      </Card>
      <div className="authcontainer">
        {/* <Card> */}
        <div className="authbox">
          <Space className="authlogin" direction="vertical" size={8}>
            {/* <Space direction="vertical" size={8}> */}
            <div className="authlogin">
              <SupabaseTypography.Title className="header" level={3}>
                <div
                  style={{
                    color: '#fff',
                  }}
                  className="authlogin"
                >
                  Welcome
                </div>
              </SupabaseTypography.Title>
              Enter email
              <Paper
                component="form"
                onSubmit={handleSignIn}
                sx={{
                  p: '2px 4px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  background: '#e8f0fe',
                  borderRadius: '5px',
                  // width: 400,
                }}
              >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <EmailIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder=""
                  inputProps={{ 'aria-label': 'search google maps' }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Paper>
            </div>
            <Button type="submit">Log in</Button>
          </Space>
        </div>
      </div>
    </MyLayout>
  );

  return auth.user ? LoggedIn : NotLoggedIn;
}

export default SignIn;

// styling:
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '300px',
  margin: '0 auto',
};
const inputStyle = {
  width: '100%',
  maxWidth: '200px',
  margin: '5px auto',
  background: '#e8f0fe',
  fontSize: '1.0rem',
  color: '#8b5cf6',
  padding: '5px 5px 5px 10px',
  height: '30px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};
const buttonStyle = {
  // width: '100%',
  // maxWidth: '150px',
  // margin: '5px auto',
  // padding: '5px',
  // border: '1px solid #ccc',
  // borderRadius: '5px',
  // color: '#8c46b9',
  // '&:hover': {
  //   transition: 'all 0.5s ease-in-out',
  //   background: '#fff',
  //   color: '#000',
  // },
};
const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};
