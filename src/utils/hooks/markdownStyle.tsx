/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
interface params {
  node: JSX.Element;
  props: string;
}

export const markdownStyle = {
  h1: ({ node, ...props }) => {
    return (
      <h1
        className=' mt-[24px] mb-[16px] border-b border-solid border-stone-200 pb-[8.4px] text-4xl'
        {...props}
      />
    );
  },
  h2: ({ node, ...props }) => (
    <h2
      className=' mt-[24px] mb-[16px] border-b border-solid border-stone-200 pb-[6.3px] text-2xl'
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3 className=' mt-[24px] mb-[16px] text-xl ' {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className=' mt-[24px] mb-[16px] text-base ' {...props} />
  ),
  h5: ({ node, ...props }) => (
    <h5 className=' mt-[24px] mb-[16px] text-sm ' {...props} />
  ),
  h6: ({ node, ...props }) => (
    <h6 className=' mt-[24px] mb-[16px] text-xs ' {...props} />
  ),
  strong: ({ node, ...props }) => (
    <span className=' font-semibold' {...props} />
  ),
  em: ({ node, ...props }) => (
    <p className='mb-[16px] text-[14px] leading-normal' {...props}>
      <i className='italic' {...props} />
    </p>
  ),
  p: ({ node, ...props }) => (
    <p className='mb-[16px] text-[14px] leading-normal' {...props} />
  ),
  a: ({ node, ...props }) => (
    <a
      className=' cursor-pointer whitespace-pre-wrap text-blue-600'
      {...props}
    />
  ),
  img: ({ node, ...props }) => (
    <a
      className=' cursor-pointer '
      href={props.src}
      target='_blank'
      rel='noreferrer noopenner'
    >
      <img {...props} />
    </a>
  ),
  li: ({ node, ...props }) => {
    return <li className='mb-[16px] text-[14px] leading-normal ' {...props} />;
  },
};
