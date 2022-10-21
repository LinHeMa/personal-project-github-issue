import PopupMenu from './PopupMenu';
import { useGetIssuesQuery } from '../../sevices/api/issueApi';
import Item from './Item';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import _ from 'lodash';
import { issueStateType } from './IssueList';
import { useEffect } from 'react';
import { CheckIcon, IssueOpenedIcon } from '@primer/octicons-react';
import {
  addStateCondition,
  nextPage,
  previousPage,
} from '../../feature/Label/LabelListActionSlice';
const subtitleList: string[] = ['Label', 'Assignee', 'Sort'];

type issueListItemProps = {
  setIssueState: React.Dispatch<React.SetStateAction<issueStateType>>;
  issueState: issueStateType;
  openIssueQty: number;
  closedIssueQty: number;
};

const IssueListItem: React.FC<issueListItemProps> = ({
  setIssueState,
  openIssueQty,
  closedIssueQty,
}) => {
  const dispatch = useAppDispatch();
  const userName = JSON.parse(sessionStorage.getItem('user')!);
  const repo = JSON.parse(sessionStorage.getItem('repo')!);
  const token = _.get(
    JSON.parse(localStorage.getItem('supabase.auth.token')!),
    ['currentSession', 'provider_token'],
  );

  const queryStringLabels = useAppSelector(
    (state) => state.labelListAction.lables,
  );
  const queryStringAssignees = useAppSelector(
    (state) => state.labelListAction.assignees,
  );
  const queryStringSort = useAppSelector((state) => state.labelListAction.sort);
  const queryStringFilter = useAppSelector(
    (state) => state.labelListAction.filter,
  );
  const queryStringState = useAppSelector(
    (state) => state.labelListAction.state,
  );
  const queryStringPage = useAppSelector((state) => state.labelListAction.page);
  const { data } = useGetIssuesQuery({
    userName,
    repo,
    labels:
      queryStringLabels.length > 0 ? `labels=${_.join(queryStringLabels)}` : '',
    assignee:
      queryStringAssignees.length > 0
        ? `&assignee=${_.join(queryStringAssignees)}`
        : '',
    sort: queryStringSort !== '' ? `&sort=${queryStringSort}` : '',
    filter: queryStringFilter !== '' ? `&${queryStringFilter}` : '',
    state: queryStringState !== '' ? `&state=${queryStringState}` : '',
    page: `&page=${queryStringPage}`,
    token,
  });

  useEffect(() => {
    const openNum = _.filter(
      data,
      (element) => element.state === 'open',
    ).length;
    const closdeNum = _.filter(
      data,
      (element) => element.state === 'closed',
    ).length;
    setIssueState({ open: openNum, closed: closdeNum });
  }, []);

  return (
    <div className='container  mx-auto mt-4 pb-[195px] md:px-6 md:pb-[170px] lg:px-8'>
      <div className=' flex items-center  justify-between border border-solid border-stone-300 bg-primary-bg-gray p-7 px-4 sm:justify-start sm:rounded-t-lg md:justify-start'>
        <input type='checkbox' className='mr-4 hidden lg:block' />
        <div className='mr-auto ml-4  hidden items-center lg:flex '>
          <a
            href='#'
            className='flex items-center'
            onClick={() => dispatch(addStateCondition('open'))}
          >
            <IssueOpenedIcon />
            <p className='ml-1 '>{openIssueQty} Open</p>
          </a>
          <a
            href='#'
            className='flex items-center'
            onClick={() => dispatch(addStateCondition('closed'))}
          >
            <CheckIcon />
            <p className='ml-1'>{closedIssueQty} Closed</p>
          </a>
        </div>
        {subtitleList.map((item, index) => (
          <div className='sm:relative' key={index}>
            <PopupMenu key={index} type={item} data={data} />
          </div>
        ))}
      </div>
      <>
        {data?.map((item, index) => {
          return <Item data={item} key={index} />;
        })}
        {data?.length === 0 && (
          <div className='flex h-full flex-col rounded-b-lg border-x border-b border-solid border-stone-300 py-[80px] px-[40px]'>
            <div>
              <IssueOpenedIcon size={24} />
            </div>
            <h1 className='mt-14 text-[24px] font-semibold'>
              No results matched your search
            </h1>
            <h3 className='mt-14 text-[16px]'>
              You could search{' '}
              <a
                href='https://github.com/search'
                className=' whitespace-pre text-blue-600'
              >
                all of Github
              </a>
              or try and
              <a
                href='https://github.com/search/advanced'
                className=' text-blue-600'
              >
                advanced search.
              </a>
            </h3>
          </div>
        )}
      </>
      <div className='l mx-auto mt-[30px] flex w-[250px] justify-between text-sky-700 '>
        <div
          className=' cursor-pointer text-[14px]'
          onClick={() => {
            if (queryStringPage === 0) return;
            dispatch(previousPage());
          }}
        >
          {'< '}Previous
        </div>
        <div
          className=' cursor-pointer text-[14px]'
          onClick={() => {
            if (data?.length === 0) return;
            dispatch(nextPage());
          }}
        >
          Next{' >'}
        </div>
      </div>
    </div>
  );
};

export default IssueListItem;
