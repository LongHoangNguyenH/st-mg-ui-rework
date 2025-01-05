'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CLASS_MAX_LENGTH } from '@/constants/error';
import { useMutation } from '@apollo/client';
import { CREATE_CLASS, GET_ALL_CLASSES } from '@/lib/graphql/Classes.action';
import { useState } from 'react';
import client from '@/lib/graphql/apolloClient';

const formSchema = z.object({
  className: z.string().max(9, {
    message: CLASS_MAX_LENGTH,
  }),
});

export function ClassSchema() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.className);
    try {
      console.log('start here')
      const { data } = await client.mutate({
        mutation: CREATE_CLASS,
        variables: { CREATE_CLASSInput: { className: values.className } },
        refetchQueries: [{ query: GET_ALL_CLASSES }],
      });
      console.log('step here')
      form.reset();
      alert('Class created successfully!');
      console.log('data: ', data);  
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black text-2xl">Class Name</FormLabel>
              <FormControl>
                <Input required className="text-black" placeholder="Class Name" {...field} />
              </FormControl>
              <FormDescription>Fill class name need to create</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="hover:bg-gray-600 hover:text-orange-500" type="submit">
          {/* {loading ? 'Creating...' : 'Submit'} */}
          Submit
        </Button>
      </form>
    </Form>
  );
}
