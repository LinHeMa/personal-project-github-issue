import {
  CommentIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
} from "@primer/octicons-react";
import React from "react";
import Label from "../label/Label";
import { Root } from "../../sevices/api/issueApi";

type ItemProps = {
  data: Root;
};
export function timeCalc(time: string) {
  const createdTime = new Date(time).getTime();
  const nowTime = +new Date();
  const timeDiff = Math.floor((nowTime - createdTime) / 1000);

  const monthNamesEn = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (timeDiff < 10) {
    return "now";
  } else if (timeDiff < 60) {
    return `${timeDiff} seconds ago`;
  } else if (timeDiff < 3600) {
    return `${Math.ceil(timeDiff / 60)} minutes ago`;
  } else if (timeDiff < 86400) {
    return `${Math.ceil(timeDiff / 3600)} hours ago`;
  } else if (timeDiff < 2592000) {
    return `${Math.ceil(timeDiff / 86400)} days ago`;
  } else {
    return `${new Date(time).getDate()} ${
      monthNamesEn[new Date(time).getMonth()]
    }`;
  }
}
const Item: React.FC<ItemProps> = ({ data }) => {
  const {
    title,
    labels,
    state,
    number,
    comments,
    assignees,
    created_at,
    user,
  } = data;
  return (
    <div className="last:rounded-b-lg">
      <div className="flex h-[85px] border-b-[1px] border-solid border-stone-300   sm:border  sm:border-t-[0px] md:h-[62.31px]">
        <div className="flex items-start justify-center py-[12.5px] pl-[10px]">
          <input type="checkbox" className="mr-4 hidden lg:block" />
        </div>
        <div className="self-start pl-4  pt-5">
          {state === "open" ? (
            <IssueOpenedIcon fill="#1a7f37" />
          ) : (
            <IssueClosedIcon fill="#8250df" />
          )}
        </div>
        <div className="flex flex-col items-start p-5  pl-3 pr-4 md:flex-row md:flex-wrap md:justify-start  ">
          <h1 className="text-[16px] font-semibold leading-5">{title}</h1>
          <div className="mt-3 flex  items-start leading-5 md:mt-0 md:ml-2 ">
            {labels.map((label) => {
              return (
                <Label
                  text={label.name}
                  key={label.id}
                  bgColor={"#" + label.color}
                  borderColor="transparent"
                  fontWeight="700"
                />
              );
            })}
          </div>
          <a className="mt-3 whitespace-pre text-start text-primary-icon-gray md:w-full">
            #{number} opened {timeCalc(created_at)} by {user.login}
          </a>
        </div>
        <div className="ml-auto hidden items-start  pt-5 pr-4 sm:flex ">
          <div className="group mr-4  flex">
            {assignees.length > 0
              ? assignees.map((assignee, index) => {
                  return (
                    <img
                      key={assignee.id}
                      src={assignee.avatar_url}
                      className={`h-[20px] w-[20px] rounded-full transition-all duration-300 ease-in-out ${
                        index === assignees.length - 1 ? "" : "mr-[-12px]"
                      }  ${assignees.length !== 1 && "group-hover:mr-2"}`}
                    />
                  );
                })
              : null}
          </div>
          <div className="group flex items-center hover:cursor-pointer">
            {comments ? (
              <CommentIcon fill="#57606A" />
            ) : (
              <CommentIcon fill="#57606A" className=" invisible" />
            )}
            <p className="pl-2">
              {comments ? (
                comments
              ) : (
                <span className=" invisible">{comments}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
