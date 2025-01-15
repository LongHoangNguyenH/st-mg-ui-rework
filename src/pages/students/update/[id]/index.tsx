import { ClassMenuDropDown } from '@/components/ClassMenuDropdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GET_ALL_STUDENTS, GET_STUDENT_BYID, UPDATE_STUDENT } from '@/lib/graphql/student.action';
import { useMutation, useQuery } from '@apollo/client';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const UpdateStudentPage = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    refetchQueries: [{ query: GET_ALL_STUDENTS }],
  });

  const { data, loading } = useQuery(GET_STUDENT_BYID, {
    variables: { id },
    skip: !id,
  });

  const [currentStudent, setCurrentStudent] = useState(Object);
  const [newClassId, setNewClassId] = useState('');
  const [newStudentName, setNewStudentName] = useState('');

  useEffect(() => {
    if (data && data.findOneStudent) {
      setCurrentStudent(data.findOneStudent);
      setNewClassId(data.findOneStudent.cls['id']);
      setNewStudentName(data.findOneStudent.studentName);
    }
  }, [data]);

  const submitUpdateClass = useCallback(async () => {
    try {
      await updateStudent({
        variables: {
          id: id,
          classId: newClassId,
          studentName: newStudentName,
        },
      });
      alert('Update class successfully');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('unexpected error');
      }
    }
  }, [id, newClassId, newStudentName, updateStudent]);

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert('Copied to clipboard');
      },
      err => {
        console.log(err);
      },
    );
  };

  const handleSelect = useCallback((classId: string) => {
    setNewClassId(classId);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-[900px] bg-white min-h-screen rounded-sm pt-5 pl-5">
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
                      <Input id="classId" disabled placeholder={`${id}`} />
                      <Button onClick={() => handleCopyClick(`${id}`)} variant="default">
                        <Copy />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="className">Student Name</Label>
                    <div className="flex flex-row">
                      <Input
                        id="studentName"
                        className="text-black"
                        placeholder={`${currentStudent.studentName}`}
                        onChange={e => setNewStudentName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="className">Class Name</Label>
                    <ClassMenuDropDown
                      onClassSelect={handleSelect}
                      currentParentClass={currentStudent?.cls['className']}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link href={'/students'}>Back</Link>
              </Button>
              <Button onClick={() => submitUpdateClass()} variant="default">
                {loading ? 'Loading...' : 'Update'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentPage;
