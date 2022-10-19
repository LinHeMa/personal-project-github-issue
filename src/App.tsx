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
import { addUser, signOutUser } from './feature/userSlice/userSlice';
import { User as userType } from './feature/userSlice/userSlice';
import { useSessionStorage } from 'usehooks-ts';
import Loader from './utils/Loader';

function App() {
  const [user, setUser] = useState<User | null>();
  const [, setValue] = useSessionStorage('user', '');
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', () => {
      checkUser();
    });
  }, [user]);
  async function checkUser() {
    const user = supabase.auth.user();
    const session = supabase.auth.session();
    const userData = {
      ...user?.user_metadata,
      token: session?.provider_token,
    } as userType;
    if (session) dispatch(addUser(userData));
    setValue(user?.user_metadata.user_name);
    setUser(user);
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
    dispatch(signOutUser());
  }

  if (user) {
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
      <h1>請先登入</h1>
      <Loader />
      <Footer />
    </div>
  );
}

export default App;
