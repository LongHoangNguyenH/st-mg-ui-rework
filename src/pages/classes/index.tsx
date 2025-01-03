import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import {Search} from 'lucide-react'

const ClassesPage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[900px] bg-white min-h-screen rounded-sm pt-5 pl-5">
        <div className="">
          <div className='flex flex-row justify-between pr-5'>
            <Button>create new class</Button>
            <div className='flex flex-row'>
            <Button><Search/></Button>
            <Input type="search" placeholder="class name" className='w-[200px]'/>
            </div>
          </div>

          <Table className="mt-5">
            <TableCaption>List of All Classes.</TableCaption>
            <TableHeader className="border-b-2 bg-400 rounded-sm">
              <TableRow className="">
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead className="">Class Name</TableHead>
                <TableHead>Total of Student</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="text-black">
                <TableCell className="font-medium">0</TableCell>
                <TableCell>
                  <Link href="/classes/1">Class 1</Link>
                </TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="flex gap-3">
                  <Button className="bg-red-400 hover:bg-red-700">Delete</Button>
                  <Button className="bg-orange-400 hover:bg-orange-600">Update</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
