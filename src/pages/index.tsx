import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

export default function Home() {
  return (
    <div className='flex justify-center'>
      <div className="w-[900px] bg-white min-h-screen rounded-sm pt-5 pl-5">
        <button className="bg-gray-500 text-white rounded-sm px-3 py-3 hover:bg-gray-600 hover:text-orange-500">
          <Link href='/classes/create'>Create New Student</Link>
        </button>


      </div>  
    </div>
  );
}
