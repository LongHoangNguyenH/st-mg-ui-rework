import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { ClassMenuDropDown } from './ClassMenuDropdown';
import { useMutation } from '@apollo/client';
import { CREATE_STUDENT } from '@/lib/graphql/student.action';
import { AlertClassNotSelect } from './AlertDialog';

const formSchema = z.object({
  studentName: z
    .string()
    .max(50)
    .min(1)
    .regex(/^[a-z A-Z]+$/)
    .nonempty(),
  classId: z.string().max(36).min(36).nonempty(),
});

const CreateStudentForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: '',
      classId: '',
    },
  });

  const [createStudentMutation, { loading }] = useMutation(CREATE_STUDENT, { refetchQueries: ['findAllStudent'] });
  const [selectedClass, setSelectedClass] = useState('classes');

  const handleClassSelect = (className: string) => {
    setSelectedClass(className);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createStudentMutation({
      variables: {
        classId: selectedClass,
        studentName: values.studentName,
      },
    });
    alert('Create Student Successfully');
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black text-2xl">Student Name</FormLabel>
              <FormControl>
                <Input required className="text-black" placeholder="Class Name" {...field} />
              </FormControl>
              <FormDescription>Fill student name need to create</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="classId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black mr-5">Select Class Name</FormLabel>
              <ClassMenuDropDown onClassSelect={handleClassSelect} />
            </FormItem>
          )}
        />

        {selectedClass == 'classes' ? (
          <AlertClassNotSelect />
        ) : (
          <Button
            className="hover:bg-gray-600 hover:text-orange-500"
            type="submit"
            onClick={() => {
              onSubmit(form.getValues());
            }}
          >
            {loading ? 'Creating...' : 'Submit'}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CreateStudentForm;
