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
  const participantsImgUrl = _.uniq(
    comments?.map((comment) => {
      return comment.user?.avatar_url;
    }),
  );
  if (!_.find(participantsImgUrl, userImgUrl)) {
    participantsImgUrl.push(userImgUrl);
  }
  const participantsImg = participantsImgUrl.map((imgUrl, index) => (
    <img
      key={index}
      src={imgUrl}
      className='mr-2 h-[26px] w-[26px] rounded-full'
    />
  ));
  return (
    <div className='border-b border-solid border-stone-300 pb-4'>
      <MenuItem>
        <MenuItem.Title
          source={{
            title: `${participantsImg.length} participants`,
            default: participantsImg,
          }}
          isLabel={false}
        />
      </MenuItem>
    </div>
  );
};

export default Participants;
