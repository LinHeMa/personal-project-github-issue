import _ from 'lodash';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Comments } from '../../utils/type/commentsType';
import MenuItem from '../CreateIssue/MenuItem';

type ParticipantsType = {
  comments: Comments | undefined;
};

const Participants = ({ comments }: ParticipantsType) => {
  const userImgUrl = useAppSelector((state) => state.userInfoAction.avatar_url);
  if (!comments) return <>fetching</>;
  function turnUserIntoImg(array?: Comments) {
    return array?.map((item) => item.user?.avatar_url);
  }

  function addOwnerIntoArray(ownerUrl: string[]) {
    if (_.includes(ownerUrl, userImgUrl)) return ownerUrl;
    return ownerUrl.push(userImgUrl);
  }

  const participantsImgUrl = addOwnerIntoArray(
    turnUserIntoImg(comments) as string[],
  );

  const participantsImg = _.uniq(participantsImgUrl as string[]).map(
    (imgUrl, index) => (
      <img
        key={index}
        src={imgUrl}
        className='mr-2 h-[26px] w-[26px] rounded-full'
      />
    ),
  );
  return (
    <div className='border-b border-solid border-stone-300 pb-4'>
      <MenuItem>
        <MenuItem.Title
          source={{
            title: `${_.uniq(participantsImg).length} participants`,
            default: participantsImg,
          }}
          isLabel={false}
        />
      </MenuItem>
    </div>
  );
};

export default Participants;
