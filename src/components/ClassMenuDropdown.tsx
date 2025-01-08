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
import { useQuery } from '@apollo/client';
import { GET_ALL_CLASSES } from '@/lib/graphql/Classes.action';
import client from '@/lib/graphql/apolloClient';

export function ClassMenuDropDown() {
  const [position, setPosition] = React.useState('bottom');
  const [currentClass, setCurrentClass] = React.useState('Classes');
  const [listClasses, setListClasses] = React.useState([]);

  React.useEffect(() => {
    client
      .query({ query: GET_ALL_CLASSES, fetchPolicy: 'no-cache' })
      .then(({ data }) => setListClasses(data.findAllClasses));
  }, [setListClasses]);

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
              <DropdownMenuRadioItem key={index} value={cls.id} onClick={() => setCurrentClass(cls.className)}>
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
