import client from '@/lib/graphql/apolloClient';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { GET_ALL_STUDENTS, GET_STUDENT_BYID } from '@/lib/graphql/student.action';
import Link from 'next/link';
import { studentType } from '@/types/studentType';

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_ALL_STUDENTS,
  });

  const paths = data.findAllStudent.map((studentItem: { id: string }) => ({
    params: { id: studentItem.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params!;
  const { data } = await client.query({
    query: GET_STUDENT_BYID,
    variables: { id },
  });

  return {
    props: {
      studentData: data.findOneStudent,
    },
  };
};

const StudentPageDetail = ({ studentData }: { studentData: studentType }) => {
  console.log(studentData);
  return (
    <div className="flex justify-center">
      <div className="w-[900px] bg-white min-h-screen rounded-sm pt-5 pl-5 pr-5 ">
        <div className="flex justify-center">
          <Card className="w-[550px]">
            <CardHeader className="items-center">
              <CardTitle>STUDENT INFORMATION DETAIL</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Student ID</Label>
                    <div className="flex flex-row">
                      <Input id="classId" disabled placeholder={studentData.id} />
                      <Button>
                        <Copy />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="className">Student Name</Label>
                    <div className="flex flex-row">
                      <Input id="className" disabled placeholder={studentData.studentName} className="text-black" />
                      <Button>
                        <Copy />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="className">Class ID</Label>
                    <div className="flex flex-row">
                      <Input id="className" disabled placeholder={studentData.cls['id']} className="text-black" />
                      <Button>
                        <Copy />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="className">Class ID</Label>
                    <div className="flex flex-row">
                      <Input
                        id="className"
                        disabled
                        placeholder={studentData.cls['className']}
                        className="text-black"
                      />
                      <Button>
                        <Copy />
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link href="/students">Back</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentPageDetail;
