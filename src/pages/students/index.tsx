import { AlertClassNotSelect } from '@/components/AlertDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import client from '@/lib/graphql/apolloClient';
import { DELETE_A_STUDENT, GET_ALL_STUDENTS } from '@/lib/graphql/student.action';
import { studentType } from '@/types/studentType';
import { useMutation } from '@apollo/client';
import { Search } from 'lucide-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import React, { useCallback } from 'react';

export const getServerSideProps: GetServerSideProps<{ listStudents: studentType[] }> = async ({}) => {
  try {
    const { data } = await client.query({
      query: GET_ALL_STUDENTS,
    });
    return {
      props: {
        listStudents: data.findAllStudent || [],
      },
    };
  } catch (error) {
    return {
      props: {
        listStudents: [],
      },
    };
  }
};

const StudentsPage = ({ listStudents }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [removeStudent] = useMutation(DELETE_A_STUDENT, { refetchQueries: ['findAllStudent'] });

  const submitRemoveStudent = useCallback(
    async (id: string) => {
      console.log(id)
      try {
        await removeStudent({ variables: { id } });
        alert('Student Deleted Successfully');
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('An unexpected error orccurred.');
        }
      }
    },
    [removeStudent],
  );

  return (
    <div className="flex justify-center">
      <div className="w-[900px] bg-white min-h-screen rounded-sm pt-5 pl-5 mr-5">
        <div className="">
          <div className="flex flex-row justify-between pr-5">
            <div className="flex flex-row justify-between pr-5">
              <div className="text-black">
                <div className="flex flex-row">
                  <Button>
                    <Search />
                  </Button>
                  <Input type="search" placeholder="Class Name" className="w-[200px]" />
                </div>

                <div className="flex flex-row mt-5">
                  <Button>
                    <Search />
                  </Button>
                  <Input type="search" placeholder="Student Name" className="w-[200px]" />
                </div>
              </div>
            </div>

            <div className="mt-8 mr-10">
              <Button>
                <Link href="students/create">Create New Student</Link>
              </Button>
            </div>
          </div>
          <Table className="mt-5">
            <TableCaption>List of All Students.</TableCaption>
            <TableHeader className="border-b-2 bg-400 rounded-sm">
              <TableRow className="">
                <TableHead className="w-[50px]">No</TableHead>
                <TableHead className="">Class Name</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {listStudents.length > 0 ? (
              listStudents.map((studentItem: any, index: number) => (
                <TableBody>
                  <TableRow key={index} className="text-black">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <Link href={`/classes/${studentItem.classId}`} className="hover:text-blue-400">
                        {studentItem.className}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/students/${studentItem.id}`} className="hover:text-blue-400">
                        {studentItem.studentName}
                      </Link>
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Button className="bg-red-400 hover:bg-red-700" onClick={() => submitRemoveStudent(studentItem.id)}>
                        Delete
                      </Button>
                      <Button className="bg-orange-400 hover:bg-orange-600">
                        <Link href={`students/update/${studentItem.id}`}>Update</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            ) : (
              <div className="w-full flex justify-center">
                <span className="text-black mt-10">No students found Please create new student</span>
              </div>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
