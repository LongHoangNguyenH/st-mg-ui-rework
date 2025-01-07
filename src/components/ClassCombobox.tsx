'use client'
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { GET_ALL_CLASSES } from '@/lib/graphql/Classes.action';
import { useQuery } from '@apollo/client';

export function ClassCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const { data, error, loading } = useQuery(GET_ALL_CLASSES);

  const listClasses = data.map((classItem: { id: string; className: string }) => ({
    value: classItem.id,
    label: classItem.className,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between text-black">
          {value ? listClasses.find((classes: any) => classes.value === value)?.label : 'Select class...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search class..." className="h-9" />
          <CommandList>
            <CommandEmpty>No class found.</CommandEmpty>
            <CommandGroup>
              {listClasses.map((classItem:any) => (
                <CommandItem
                  key={classItem.value}
                  value={classItem.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {classItem.label}
                  <Check className={cn('ml-auto', value === classItem.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ClassCombobox;