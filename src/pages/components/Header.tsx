import React from "react";

const HeaderComponent = () => {
  return (
    <div className='bg-black'>
      <div className='py-5'>
        <span className='text-3xl px-5'>STUDENT MANAGEMENT</span>
      </div>
      <div>
        <nav className='flex flex-row px-2 text-xl'>
          <ul>
            <li className='rounded-sm px-3 hover:bg-gray-600 hover:text-orange-500'>
              <span>Classes</span>
            </li>
          </ul>
          <ul>
            <li className='rounded-sm px-3 hover:bg-gray-600 hover:text-orange-500'>Students</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderComponent;
