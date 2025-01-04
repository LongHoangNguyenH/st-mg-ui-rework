import { ClassSchema } from '@/components/Classschema';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const CreateClassPage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[900px] bg-white min-h-screen rounded-sm pt-5 pl-5 pr-5">
        <Button className="hover:bg-gray-600 hover:text-orange-500">
          <Link href="/classes">Back To List Class</Link>
        </Button>
        <div className="mt-5">
          <ClassSchema />
        </div>
      </div>
    </div>
  );
};

export default CreateClassPage;
