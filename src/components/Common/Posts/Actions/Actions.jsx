import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import DropDown from '../../../../utils/DropDown';

function Actions() {
  const [showDrop, setShowDrop] = useState(false);

  const handleclick = () => {
    setShowDrop(!showDrop);
  }

  return (
    <div className="relative">
      <button>
        <BsThreeDots onClick={handleclick} className="text-xl flex justify-center items-center" />
      </button>
      <DropDown showDrop={showDrop} setShowDrop={setShowDrop} size={'w-[7rem]'}>
        <Button click="" title="Edit Story" />
        <Button click="" title="Delete Story" />
      </DropDown>
    </div>
  );
}

export default Actions;

const Button = ({ click, title }) => {
  return (
    <button
      onClick={click}
      className={`p-2 hover:bg-gray-100 hover:text-black/80 w-full text-sm text-left
        ${title === 'Delete Story' ? 'text-red-600' : 'text-black/60'}`}
    >
      {title}
    </button>
  );
};
