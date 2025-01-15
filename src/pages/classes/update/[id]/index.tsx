import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GET_ALL_CLASSES, GET_CLASS_BYID, UPDATE_CLASS } from '@/lib/graphql/Classes.action';
import { useMutation, useQuery } from '@apollo/client';
import { Copy } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const UpdateClassPage = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const [updateClass] = useMutation(UPDATE_CLASS, {
    refetchQueries:[{query: GET_ALL_CLASSES}],
  });

  const { data, loading } = useQuery(GET_CLASS_BYID, {
    variables: { id },
    skip: !id,
  });

  const [currentClass, setCurrentClass] = useState("");
  const [newClassName, setNewClassName] = useState(" ");

  useEffect(() => {
    if (data && data.findOneClass) {
      setCurrentClass(data.findOneClass.className);
    }
  }, [data]);

  const submitUpdateClass = useCallback(async () => {
    try {
      await updateClass({
        variables: {
          id: id,
          className: newClassName,
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
  }, [id, newClassName, updateClass]);

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

  return (
    <div className="flex justify-center">
      <div className="w-[900px] bg-white min-h-screen rounded-sm pt-5 pl-5">
        <div className="flex justify-center">
          <Card className="w-[550px]">
            <CardHeader className="items-center">
              <CardTitle>CLASS INFORMATION DETAIL</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">ClassId</Label>
                    <div className="flex flex-row">
                      <Input id="classId" disabled placeholder={`${id}`} />
                      <Button onClick={() => handleCopyClick(`${id}`)} variant="default">
                        <Copy />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="className">ClassName</Label>
                    <div className="flex flex-row">
                      <Input
                        id="className"
                        className="text-black"
                        placeholder={`${currentClass}`}
                        onChange={(e) => setNewClassName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link href={'/classes'}>Back</Link>
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

export default UpdateClassPage;
