// 'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@apollo/client';
import { CREATE_CLASS } from '@/lib/graphql/Classes.action';

const ClassSchema = z.object({
  className: z.string().max(9).min(2).nonempty(),
});

export function CreateClassForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof ClassSchema>>({
    resolver: zodResolver(ClassSchema),
    defaultValues: {
      className: '',
    },
  });

  const [createClassMutation, { loading }] = useMutation(CREATE_CLASS);

  async function onSubmit(values: z.infer<typeof ClassSchema>) {
    try {
      await createClassMutation({
        variables: { className: values.className },
      });
      form.reset();
    } catch (error) {
      console.log(error);
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
                <Input
                  required
                  className="text-black"
                  placeholder="Class Name"
                  {...field}
                />
              </FormControl>
              <FormDescription>Fill class name need to create</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="hover:bg-gray-600 hover:text-orange-500" type="submit">
          {loading ? 'Creating...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
