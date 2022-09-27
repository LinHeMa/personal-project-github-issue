import {
  CommentIcon,
  CommitIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
  TriangleDownIcon,
} from "@primer/octicons-react";
import React from "react";
import Label from "../label/Label";
import avatar from "../../images/github_avatar.png";
import PopupMenu from "./PopupMenu";

const subtitleList: string[] = ["Label", "Assignee", "Sort"];

const IssueListItem = () => {
  return (
    <div className="container  md:px-6 lg:px-8 mx-auto mt-4 ">
      <div className="flex items-center  justify-between px-4 bg-primary-bg-gray border-solid border border-stone-300 sm:rounded-t-lg p-7 md:justify-start">
        <input type="checkbox" className="mr-4 hidden sm:block" />
        {subtitleList.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer h-[21px] flex items-center px-4 text-primary-icon-gray text-[14px]"
          >
            {item}
            <a href="#" className="hidden sm:block">
              <TriangleDownIcon fill="#57606A" />
            </a>
          </div>
        ))}
      </div>
      <div className="flex h-[85px] md:h-[62.31px] border-b-[1px] sm:border sm:border-t-[0px] border-solid  border-stone-300 last:rounded-b-lg">
        <div className="flex justify-center items-start pl-[10px] py-[12.5px]">
          <input type="checkbox" className="mr-4 hidden sm:block" />
        </div>
        <div className="pl-4 pt-5  self-start">
          <IssueOpenedIcon fill="#1a7f37" />
        </div>
        <div className="p-5 pl-3 pr-4 flex  flex-col items-start md:flex-row md:flex-wrap md:justify-start  ">
          <h1 className="font-semibold text-[16px] leading-5">很多bug喔</h1>
          <div className="flex mt-3 flex-col  items-start leading-5 md:mt-0 md:ml-2 ">
            <Label
              text="Label"
              bgColor="#eeeccc"
              borderColor="transparent"
              fontWeight="700"
            />
          </div>
          <a className="whitespace-pre mt-3 text-primary-icon-gray md:w-full text-start">
            #id opened 10 days ago by LinHeMa
          </a>
        </div>
        <div className="hidden sm:flex ml-auto  items-start pt-5 pr-4 ">
          <div className="flex group">
            <img
              src={avatar}
              className="h-[20px] w-[20px] rounded-full mr-[-12px] group-hover:mr-2"
            />
            <img
              src={avatar}
              className="h-[20px] w-[20px] rounded-full mr-[-12px] group-hover:mr-2 "
            />
            <img
              src={avatar}
              className="h-[20px] w-[20px] rounded-full mr-8  md:mr-[40px]"
            />
          </div>
          <div className="flex items-center">
            <CommentIcon fill="#57606A" />
            <p className="pl-2">3</p>
          </div>
        </div>
      </div>
      <PopupMenu />
    </div>
  );
};

export default IssueListItem;
