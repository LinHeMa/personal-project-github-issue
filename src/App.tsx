import React, { useEffect, useState } from 'react';
// import api from './utils/api';
import { supabase } from './supabase/client';
import { User } from '@supabase/supabase-js';
import { ResetStyle, GlobalStyle } from './components/globalStyle';
// import _ from 'lodash';
import './App.css';
import Header from './components/Header';
import ItemMenu from './components/ItemMenu';
import UserDropDown from './components/UserDropDown';
import Footer from './components/Footer/Footer';
import Subtitle from './components/subtitle/Subtitle';
import LabelContent from './components/labelContent/LabelContent';
import { Outlet } from 'react-router-dom';

function App() {
  const [user, setUser] = useState<User | null>();

  const session = supabase.auth.session();
  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', () => {
      checkUser();
    });
  }, []);
  async function checkUser() {
    const user = supabase.auth.user();
    setUser(user);
  }

  async function signInWithGithub() {
    const response = await supabase.auth.signIn(
      {
        provider: 'github',
      },
      {
        scopes: 'repo gist notifications',
      },
    );
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (session?.provider_token) {
    return (
      <div className='App'>
        <ResetStyle />
        <GlobalStyle />
        <Header
          className='Header'
          signInWithGithub={signInWithGithub}
          signOut={signOut}
          user={user}
        />
        <Subtitle />
        <Outlet />
        <Footer />
      </div>
    );
  }

  return (
    <div className='App'>
      <ResetStyle />
      <GlobalStyle />
      <Header
        className='Header'
        signInWithGithub={signInWithGithub}
        signOut={signOut}
        user={user}
      />
      <>請先登入</>
      <Footer />
    </div>
  );
}

export default App;
