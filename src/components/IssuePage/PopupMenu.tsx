import { CheckIcon, TriangleDownIcon } from '@primer/octicons-react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addLabelCondition,
  resetLabelCondition,
  addAssigneeCondition,
  addSortCondition,
  addFilterCondition,
} from '../../feature/Label/LabelListActionSlice';
import { Root, useGetListAssigneesQuery } from '../../sevices/api/issueApi';
import { useGetLabelListQuery } from '../../sevices/api/labelApi';

type PopupMenuProps = {
  type: string;
  data?: Root[];
};
const sortList = [
  { name: 'Newest', sort: 'created-desc' },
  { name: 'Oldest', sort: 'created-asc' },
  { name: 'Most commented', sort: 'comments-desc' },
  { name: 'Least commented', sort: 'comments-desc' },
  { name: 'Recently updated', sort: 'updated-desc' },
  { name: 'Least recently updated', sort: 'updated-asc' },
];
const filterList = [
  { name: 'Your issues', filter: '&creator=@me' },
  { name: 'Everything assigned to you', filter: '&assignee=LinHeMa' },
  { name: 'Everything mentioning you', filter: '&mentioned=@me' },
];

const PopupMenu = ({ type }: PopupMenuProps) => {
  const dispatch = useAppDispatch();
  const queryLabel = useAppSelector((state) => state.labelListAction.lables);
  const queryAssignee = useAppSelector(
    (state) => state.labelListAction.assignees,
  );
  const queryFilter = useAppSelector((state) => state.labelListAction.filter);
  const querySort = useAppSelector((state) => state.labelListAction.sort);
  const [filterInput, setFilterInput] = useState<string>('');

  const [renderType, setRenderType] = useState<string>('');
  const [labelPop, setLabelPop] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { data: labels } = useGetLabelListQuery({
    name: 'LinHeMa',
    repo: 'TEST',
  });
  console.log(type);

  const { data: assignees } = useGetListAssigneesQuery('');
  useEffect(() => {
    setLabelPop(false);
  }, [isClicked]);
  return (
    <div
      onClick={() => {
        setLabelPop(true);
        setRenderType(type);
      }}
      className='flex h-[21px] cursor-pointer items-center px-4 text-[14px] text-primary-icon-gray'
    >
      {type}
      <a href='#' className='hidden sm:block'>
        <TriangleDownIcon fill='#57606A' />
      </a>

      {labelPop && (
        <div>
          <div
            onClick={(e) => {
              setLabelPop(false);
              e.stopPropagation();
            }}
            className='fixed top-0 left-0 z-10 h-full w-full bg-black opacity-40 sm:bg-transparent'
          />
          <div
            className={
              renderType !== 'Filters'
                ? `top-8' absolute left-[20px] right-[20px]  z-20 mx-auto flex min-h-[400px] max-h-[400px] flex-col rounded-xl border border-solid bg-white opacity-100 group-last:rounded-b-lg sm:min-h-fit sm:w-[300px] sm:border-stone-300 md:right-auto md:left-[5px] md:top-[25px] lg:right-[0px] lg:left-auto overflow-y-auto`
                : `top-8' absolute left-[20px] right-[20px]  z-20 mx-auto flex min-h-[800px] flex-col rounded-xl border border-solid bg-white opacity-100 group-last:rounded-b-lg sm:left-[-33%] sm:top-[23%] sm:min-h-fit sm:w-[300px]  sm:border-stone-300 md:right-auto md:left-[10%] md:top-[25%]  lg:left-[10%] lg:top-[22%]`
            }
          >
            <div className='flex h-[54px] items-center justify-between border-b-[1px] border-solid border-stone-300 p-[16px]'>
              <div className='text-[14px] font-semibold '>
                Filter by {renderType}
              </div>
              <div
                onClick={() => {
                  setIsClicked((prev) => !prev);
                }}
                className='text-primary-icon-gray'
              >
                X
              </div>
            </div>
            {!_.includes(['Sort', 'Filters'], type) && (
              <div className='border-b-[1px] border-solid border-stone-300 p-[16px] text-[14px] font-semibold'>
                <input
                  value={filterInput}
                  onChange={(e) => {
                    setFilterInput(e.target.value);
                  }}
                  type='text'
                  className='h-[32px] w-full rounded-lg border border-solid border-stone-300 px-[12px] py-[5px] font-medium'
                  placeholder={`Filter ${renderType}`}
                />
              </div>
            )}
            {_.includes(['Label', 'Assignee'], renderType) && (
              <div
                onClick={() => {
                  renderType === 'Label'
                    ? dispatch(resetLabelCondition())
                    : dispatch(addAssigneeCondition('none'));
                  setIsClicked((prev) => !prev);
                }}
                className='flex items-center justify-start  border-b-[1px] border-solid border-stone-300 p-[16px] text-[14px] font-semibold leading-[21px]'
              >
                <div
                  className={` mr-3 ${
                    _.includes(queryLabel, 'Unlabeled')
                      ? 'visible'
                      : 'invisible'
                  }`}
                >
                  <CheckIcon />
                </div>
                {renderType === 'Label' ? 'Unlabeled' : 'Assigned to nobody'}
              </div>
            )}
            <>
              {renderType === 'Label' &&
                labels?.map((label) => {
                  return (
                    <div key={label.id}>
                      <div
                        className={`flex flex-wrap items-center  justify-start  border-b-[1px] border-solid border-stone-300 p-[16px] text-[14px] font-semibold leading-[21px]  ${
                          _.includes(
                            label.name.toLowerCase(),
                            _.trim(filterInput.toLowerCase(), ' '),
                          )
                            ? ''
                            : _.includes(
                                label.description.toLowerCase(),
                                _.trim(filterInput.toLowerCase(), ' '),
                              )
                            ? ''
                            : 'hidden'
                        }`}
                        onClick={() => {
                          dispatch(addLabelCondition(label.name));
                          setIsClicked((prev) => !prev);
                        }}
                      >
                        <div
                          className={` mr-3 ${
                            _.includes(queryLabel, label.name)
                              ? 'visible'
                              : 'invisible'
                          }`}
                        >
                          <CheckIcon />
                        </div>
                        <div
                          style={{ backgroundColor: '#' + label.color }}
                          className={`mr-3 mt-2 flex h-[14px] w-[14px] self-start rounded-full`}
                        />
                        <div className='flex flex-col items-start justify-start'>
                          {label.name}
                          <div className='flex w-full self-end font-light'>
                            {label.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
            <>
              {renderType === 'Assignee' &&
                assignees?.map((assignee) => {
                  return (
                    <div
                      key={assignee.id}
                      className={`flex items-center justify-start p-[16px] text-[14px] font-semibold leading-[21px]  
                      ${
                        _.includes(
                          _.trim(assignee.login.toLowerCase(), ' '),
                          _.trim(filterInput.toLowerCase(), ' '),
                        )
                          ? ''
                          : 'hidden'
                      }`}
                      onClick={() => {
                        dispatch(addAssigneeCondition(assignee.login));
                        setIsClicked((prev) => !prev);
                      }}
                    >
                      <div
                        className={` mr-3 ${
                          _.includes(queryAssignee, assignee.login)
                            ? 'visible'
                            : 'invisible'
                        }`}
                      >
                        <CheckIcon />
                      </div>
                      <img
                        src={assignee.avatar_url}
                        alt='avatar_img'
                        className='mr-2 h-[20px] w-[20px] rounded-full'
                      />
                      {assignee.login}
                    </div>
                  );
                })}
            </>
            <>
              {renderType === 'Sort' &&
                sortList?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='flex items-center justify-start p-[16px] text-[14px] font-semibold leading-[21px]'
                      onClick={() => {
                        setIsClicked((prev) => !prev);
                        dispatch(addSortCondition(item.sort));
                      }}
                    >
                      <div
                        className={` mr-3 ${
                          querySort === item.sort ? 'visible' : 'invisible'
                        }`}
                      >
                        <CheckIcon />
                      </div>
                      {item.name}
                    </div>
                  );
                })}
            </>
            <>
              {renderType === 'Filters' &&
                filterList?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='flex items-center justify-start p-[16px] text-[14px] font-semibold leading-[21px]'
                      onClick={() => {
                        setIsClicked((prev) => !prev);
                        dispatch(addFilterCondition(item.filter));
                      }}
                    >
                      <div
                        className={` mr-3 ${
                          queryFilter === item.filter ? 'visible' : 'invisible'
                        }`}
                      >
                        <CheckIcon />
                      </div>
                      {item.name}
                    </div>
                  );
                })}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
