import React, { useState } from 'react';
import DropDown from '../../../../utils/DropDown';
import { CiShare1 } from 'react-icons/ci';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import {
  BiLink,
  BiLogoFacebookCircle,
  BiLogoTwitter,
  BiLogoLinkedinSquare,
  BiLogoFacebook,
  BiLogoLinkedin,
} from 'react-icons/bi';

function SharePost() {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setShowDrop(!showDrop)}
        className="flex items-center gap-1 text-sm py-[0.5rem]"
      >
        <CiShare1 className="text-2xl" />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[12rem]">
        <Button click="" title="Copy Link" icon={<BiLink className="text-xl" />} />
        <Button click="" title="Share On Twitter" icon={<BiLogoTwitter className="text-xl" />} />
        <Button click="" title="Share On Facebook" icon={<BiLogoFacebook className="text-xl" />} />
        <Button click="" title="Share On Linkedin" icon={<BiLogoLinkedin className="text-xl" />} />
      </DropDown>
    </div>
  );
}

export default SharePost;

const Button = ({ click, title, icon }) => {
  return (
    <button
      onClick={click}
      className="p-2 hover:bg-gray-200 hover:text-black/80  w-full text-sm text-left flex items-center gap-2 cursor-pointer
      text-gray-500
      "
    >
      {icon}
      <span className="text-[0.8rem]">{title}</span>
    </button>
  );
};
