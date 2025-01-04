'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CLASS_MAX_LENGTH } from '@/constants/error';
import { useMutation } from '@apollo/client';
import { CREATECLASS, GETALLCLASSES } from '@/lib/graphql/classes/Classes.action';
import { useState } from 'react';

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

  const [CreateClass, { data, loading, error }] = useMutation(CREATECLASS, {
    refetchQueries: [{ query: GETALLCLASSES }],
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.className);
    try {
      await CreateClass({ variables: { className: values.className }});
      form.reset();
      alert('Class created successfully!')
      console.log('data: ',data)
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
        <Button disabled={loading} className="hover:bg-gray-600 hover:text-orange-500" type="submit">
          {loading ? 'Creating...':'Submit'}
        </Button>
      </form>
    </Form>
  );
}
