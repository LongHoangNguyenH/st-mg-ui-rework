import client from '@/lib/graphql/apolloClient';
import { GET_ALL_CLASSES, GET_CLASS_BYID } from '@/lib/graphql/Classes.action';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: GET_ALL_CLASSES,
  });

  const paths = data.findAll.map((classItem: { id: string }) => ({
    params: { id: classItem.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params!;
  const { data } = await client.query({
    query: GET_CLASS_BYID,
    variables: { id },
  });

  return {
    props: {
      classData: data.findOne,
    },
  };
};

const ClassDetailPage = ({ classData }: { classData: { id: string; className: string } }) => {
  return (
    <div className="flex justify-center">
      <div className="w-[900px] bg-white min-h-screen rounded-sm pt-5 pl-5 pr-5 ">
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
                      <Input id="classId" disabled placeholder={classData.id} />
                      <Button>
                        <Copy />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="className">ClassName</Label>
                    <div className='flex flex-row'>
                      <Input id="className" disabled placeholder={classData.className} className="text-black" />
                      <Button>
                        <Copy />
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Back</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;
