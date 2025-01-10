'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GET_ALL_CLASSES } from '@/lib/graphql/Classes.action';
import client from '@/lib/graphql/apolloClient';

export function ClassMenuDropDown({ onClassSelect }: { onClassSelect: (className: string) => void }) {
  const [position, setPosition] = React.useState('bottom');
  const [currentClass, setCurrentClass] = React.useState('classes');
  const [listClasses, setListClasses] = React.useState([]);

  React.useEffect(() => {
    client
      .query({ query: GET_ALL_CLASSES, fetchPolicy: 'no-cache' })
      .then(({ data }) => setListClasses(data.findAllClasses));
  }, [setListClasses]);

  const handleClassSelect = (className: string, classId: string) => {
    setCurrentClass(className);
    onClassSelect(classId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">{currentClass}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Class</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {listClasses.length > 0 ? (
            listClasses.map((cls: any, index: any) => (
              <DropdownMenuRadioItem
                key={index}
                value={cls.id}
                onClick={() => handleClassSelect(cls.className, cls.id)}
              >
                {cls.className}
              </DropdownMenuRadioItem>
            ))
          ) : (
            <DropdownMenuRadioItem value="top">There no class here</DropdownMenuRadioItem>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
