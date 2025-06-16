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
import { toast } from 'react-toastify';

function SharePost() {
  const [showDrop, setShowDrop] = useState(false);
  const path = window.location.href;
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(path);
      toast.success('Link copied to clipboard!');
      setShowDrop(false);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="relative">
      <button
        onClick={() => setShowDrop(true)}
        className="flex items-center gap-1 text-sm py-[0.5rem]"
      >
        <CiShare1 className="text-2xl" />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size="w-[12rem]">
        <Button click={copyLink} title="Copy Link" icon={<BiLink className="text-xl" />} />
        <TwitterShareButton url={path} className="w-full">
          <Button
            click={() => setShowDrop(false)}
            title="Share On Twitter"
            icon={<BiLogoTwitter className="text-xl" />}
          />
        </TwitterShareButton>
        <FacebookShareButton url={path} className="w-full">
          <Button
            click={() => setShowDrop(false)}
            title="Share On Facebook"
            icon={<BiLogoFacebookCircle className="text-xl" />}
          />  
        </FacebookShareButton>
        <LinkedinShareButton url={path} className="w-full">
          <Button
            click={() => setShowDrop(false)}
            title="Share On Linkedin"
            icon={<BiLogoLinkedinSquare className="text-xl" />}
          />      
        </LinkedinShareButton>
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
