import React from 'react';

type EmojiProps = {
  type: string;
  number?: number;
};

const emojiType: { [index: string]: string } = {
  '+1': '👍',
  '-1': '👎',
  laugh: '😄',
  hooray: '🎉',
  confused: '😕',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

const Emoji: React.FC<EmojiProps> = ({ type, number }) => {
  return (
    <div className='flex items-center justify-center rounded-[100px] border border-solid border-[#347FDF] bg-[#ddf4ff] px-[8px] py-[2px] hover:bg-[#B6E3FF] mr-3'>
      <div className='mr-2'>{emojiType[type]}</div>
      <div className='text-[#0969da]'>{number}</div>
    </div>
  );
};

export default Emoji;
