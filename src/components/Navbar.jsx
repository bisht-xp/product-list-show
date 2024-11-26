import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white w-full border-b-[2px] border-b-gray-400">
      <div className="flex justify-start items-center gap-4 mx-5 my-2 md:mx-10">
        <img src="/monk-svg.svg" alt="logo" />
        <span>Monk Upsell & Cross-sell</span>
      </div>
    </div>
  );
};

export default Navbar;
