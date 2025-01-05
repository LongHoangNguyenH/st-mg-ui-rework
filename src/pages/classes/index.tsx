import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { GET_ALL_CLASSES } from '@/lib/graphql/Classes.action';
import { InferGetServerSidePropsType } from 'next';
import client from '@/lib/graphql/apolloClient';

export const getServerSideProps = async () => {
  try {
    const { data, error, loading } = await client.query({
      query: GET_ALL_CLASSES,
    });
    return {
      props: {
        listClasses: data.findAll || [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        listClasses: [],
      },
    };
  }
};

const ClassesPage = ({ listClasses }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex justify-center">
      <div className="w-[900px] bg-white min-h-screen rounded-sm pt-5 pl-5">
        <div className="">
          <div className="flex flex-row justify-between pr-5">
            <Button>
              <Link href="/classes/create">create new class</Link>
            </Button>
            <div className="flex flex-row">
              <Button>
                <Search />
              </Button>
              <Input type="search" placeholder="class name" className="w-[200px]" />
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
              {listClasses.map((classItem: any, index: number) => (
                <TableRow key={index} className="text-black">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <Link href={`/classes/${classItem.id}`} className="hover:text-blue-400">
                      {classItem.className}
                    </Link>
                  </TableCell>
                  <TableCell>total</TableCell>
                  <TableCell className="flex gap-3">
                    <Button className="bg-red-400 hover:bg-red-700">Delete</Button>
                    <Button className="bg-orange-400 hover:bg-orange-600">Update</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
