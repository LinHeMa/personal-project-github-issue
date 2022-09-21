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

function App() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', () => {
      checkUser();
    });
  }, []);
  async function checkUser() {
    const user = supabase.auth.user();
    const session = supabase.auth.session();
    console.log(user);
    console.log(session?.provider_token);
    setUser(user);
  }

  async function signInWithGithub() {
    await supabase.auth.signIn(
      {
        provider: 'github'
      },
      {
        scopes: 'repo gist notifications'
      }
    );
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (user) {
    return (
      <div className='App'>
        <ResetStyle />
        <GlobalStyle />
        <h1>hello, {user.email}</h1>
        <button onClick={signOut}>sign out</button>
      </div>
    );
  }

  return (
    <div className='App'>
      <ResetStyle />
      <GlobalStyle />
      <Header className='Header' />
      {/* <button onClick={signInWithGithub}>sign in</button> */}
      <Subtitle />
      <Footer />
    </div>
  );
}

export default App;
