import {
  IssueClosedIcon,
  IssueReopenedIcon,
  SkipIcon,
} from '@primer/octicons-react';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeButtonState } from '../../feature/issueSlice/issueSlice';

type ControlIssueFlyoutProps = { closeFlyout: () => void };

const ControlIssueFlyout = ({ closeFlyout }: ControlIssueFlyoutProps) => {
  const state = useAppSelector((state) => state.createIssueAction.state);
  const dispatch = useAppDispatch();
  const updateIssueArray = useAppSelector((state) => state.updateIssueAction);
  const commentBody = _.find(updateIssueArray, { id: 0 })?.body;
  const stateReason = useAppSelector(
    (state) => state.createIssueAction.stateReason,
  );
  return (
    <div className=' absolute right-0 flex w-[298px] flex-col rounded-lg border border-solid border-stone-300 bg-white text-[14px] font-semibold leading-[21px]'>
      {state !== 'open' && (
        <div
          className={` flex items-center border-b border-solid border-stone-300 p-[8px] pl-[16px]`}
          onClick={() => {
            dispatch(changeButtonState('reopen'));
            closeFlyout();
          }}
        >
          <IssueReopenedIcon fill='#1A7F38' />
          <span className='ml-2'>Reopen issue</span>
        </div>
      )}

      {stateReason !== 'completed' && (
        <div
          className={` flex items-center border-b border-solid border-stone-300 p-[8px] pl-[16px]`}
          onClick={() => {
            dispatch(changeButtonState('completed'));
            closeFlyout();
          }}
        >
          <IssueClosedIcon fill='#8250DF' />
          <span className='ml-2'>Closed</span>
        </div>
      )}
      {stateReason !== 'not_planned' && (
        <div
          className={`flex items-center border-b border-solid border-stone-300 p-[8px] pl-[16px]`}
          onClick={() => {
            dispatch(changeButtonState('not_planned'));
            closeFlyout();
          }}
        >
          <SkipIcon fill='#818890' />
          <span className='ml-2'>Closed as not planned</span>
        </div>
      )}
    </div>
  );
};

export default ControlIssueFlyout;
