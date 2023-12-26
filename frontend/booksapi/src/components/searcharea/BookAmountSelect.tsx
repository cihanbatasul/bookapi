import React from "react";
import { useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shadcncomponents/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcncomponents/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/shadcncomponents/ui/button";
import { cn } from "@/lib/utils";

import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setMaxBooks } from "@/store/filterReducer";

type Props = {};

const numbers = [
  { name: "Amount of results", value: 10 },
  { name: "10 (Standard)", value: 10 },
  { name: "20", value: 20 },
  { name: "30", value: 30 },
  { name: "40", value: 40 },
];

const BookAmountSelect = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(10);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setMaxBooks(value));
  }, [value]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-black font-normal dark:text-inherit"
        >
          {value
            ? numbers.find((amount) => amount.value === value)?.name
            : "Select amount of results"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opaciy-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {numbers.map((number) => (
              <CommandItem
                key={number.name}
                value={number.name}
                onSelect={(currentValue) => {
                  setValue(
                    parseInt(currentValue) === value
                      ? value
                      : parseInt(currentValue),
                  );
                  setOpen(false);
                }}
              >
                {number.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === number.value ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default BookAmountSelect;
