'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CLASS_MAX_LENGTH } from '@/constants/error';

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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-black text-2xl'>Class Name</FormLabel>
              <FormControl>
                <Input className='text-black' placeholder="Class Name" {...field} />
              </FormControl>
              <FormDescription>Fill class name need to create</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='hover:bg-gray-600 hover:text-orange-500' type="submit">Submit</Button>
      </form>
    </Form>
  );
}
