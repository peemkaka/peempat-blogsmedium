import React, { useEffect, useRef } from 'react';

function DropDown({ children, size, showDrop, setShowDrop }) {
  const dropRef = useRef(null);
  useEffect(() => {
    const clickOutSide = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setShowDrop(false); 
      }
    };
    window.addEventListener('mousedown', clickOutSide);
    return () => {
      window.removeEventListener('mousedown', clickOutSide);
    };
  }, []);
  return (
    <>
      {showDrop && (
        <div
          ref={dropRef}
          className={`${size} shadow-xl rounded-md flex flex-col absolute right-0 top-[2rem] bg-white`}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default DropDown;
