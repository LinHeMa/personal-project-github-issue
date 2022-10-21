import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';
import { useAppDispatch } from '../../app/hooks';
import { chooseRepo } from '../../feature/user/userSlice';

type RepoItemProps = {
  name: string;
};

const RepoItem = ({ name }: RepoItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [repo, setRepo] = useSessionStorage('repo', '');
  return (
    <div className='container mx-auto flex flex-col items-start text-6xl'>
      <h1
        className='m-4 w-full cursor-pointer rounded-xl border border-solid border-stone-300 bg-slate-300 p-8 hover:bg-slate-500 hover:text-slate-50'
        onClick={() => {
          setRepo(name);
          dispatch(chooseRepo(name));
          navigate('/issuelist');
        }}
      >
        {name}
      </h1>
    </div>
  );
};

export default RepoItem;
