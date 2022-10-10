import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { chooseRepo } from '../../feature/user/userSlice';

type RepoItemProps = {
  name: string;
};

const RepoItem = ({ name }: RepoItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-start container text-6xl mx-auto'>
      <h1
      className='p-8 cursor-pointer border border-solid border-stone-300 m-4 rounded-xl bg-slate-300 w-full hover:bg-slate-500 hover:text-slate-50'
        onClick={() => {
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
