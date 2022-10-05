import { useEffect, useState } from 'react';
import { supabase } from './supabase/client';
import { User } from '@supabase/supabase-js';
import { ResetStyle, GlobalStyle } from './components/globalStyle';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import Subtitle from './components/subtitle/Subtitle';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { addUser } from './feature/user/userSlice';

function App() {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string | null>();
  const dispatch = useAppDispatch();
  const session = supabase.auth.session();
  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', () => {
      checkUser();
    });
    console.log(user);
    if (user && session) dispatch(addUser(session.provider_token as string));
  }, [user]);
  async function checkUser() {
    const user = supabase.auth.user();
    if (session) dispatch(addUser(session.provider_token as string));
    setUser(user);
    setToken(session?.provider_token);
  }

  async function signInWithGithub() {
    await supabase.auth.signIn(
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
