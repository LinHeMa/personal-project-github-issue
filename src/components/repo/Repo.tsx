import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useGetReposQuery } from '../../sevices/api/repoApi';
import RepoItem from './RepoItem';

const Repo = () => {
  const userInfo = useAppSelector((state) => state.userInfoAction);
  const { data: repos } = useGetReposQuery({
    username: userInfo.user_name,
    token: userInfo.token,
  });
  return (
    <div className=' pb-[180px]'>
      {repos?.map((repo) => (
        <RepoItem name={repo.name} key={repo.id} />
      ))}
    </div>
  );
};

export default Repo;
