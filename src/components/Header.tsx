import Link from 'next/link';
import React from 'react';

const HeaderComponent = () => {
  return (
    <div className="bg-black flex flex-row justify-between">
      <div>
        <div className="py-5">
          <Link href="/">
            <span className="text-3xl px-5">STUDENT MANAGEMENT</span>
          </Link>
        </div>
        <div>
          <nav className="flex flex-row px-2 text-xl">
            <ul>
              <li className="rounded-sm px-3 py-3 hover:bg-gray-600 hover:text-orange-500">
                <Link href="/classes">
                  <span>Classes</span>
                </Link>
              </li>
            </ul>
            <ul>
              <li className="rounded-sm px-3 py-3 hover:bg-gray-600 hover:text-orange-500">
                <Link href="/students">
                  <span>Students</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}; 

export default HeaderComponent;
