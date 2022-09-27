import {
  CheckIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
  MilestoneIcon,
  SearchIcon,
  TagIcon,
} from "@primer/octicons-react";
import React from "react";
import Button from "../../components/button/Button";
import BiFunctionButton from "../button/BiFunctionButton";
import IssueListItem from "./IssueListItem";

export default function IssueList() {
  return (
    <>
      <div className="flex container px-4 md:px-6 lg:px-8 mx-auto flex-wrap   justify-center ">
        <div className="md:order-2 md:ml-4">
          <BiFunctionButton
            icon={<TagIcon />}
            text="Labels"
            number={1}
            iconRight={<MilestoneIcon />}
            textRight="Milestones"
            numberRight={2}
          />
        </div>
        <button className="flex  items-center whitespace-pre bg-primary-green rounded-md   ml-auto md:ml-4 md:order-3	text-[#ffffff] w-fit px-4 py-[5x] text-sm font-medium">
          New<div className="hidden md:block"> issue</div>
        </button>
        <div className="flex  border-solid border  border-gray-300 rounded-md w-full md:w-6/12 my-6 md:my-0 bg-primary-bg-gray ">
          <Button text="Filters" hasDropDown={true} />
          <div className="flex relative pl-8 pr-3 py-[5px] items-center w-full  ">
            <div className="absolute left-0 ">
              <SearchIcon size={16} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="is:issue is:open"
              className=" bg-primary-bg-gray"
            />
          </div>
        </div>
        <div className="flex items-center mr-auto md:order-4 md:mt-4 lg:hidden">
          <a href="#" className="flex items-center">
            <IssueOpenedIcon />
            <p className="ml-1 ">4 Open</p>
          </a>
          <a href="#" className="flex items-center">
            <CheckIcon />
            <p className="ml-1">1 Closed</p>
          </a>
        </div>
      </div>
      <IssueListItem />
    </>
  );
}
