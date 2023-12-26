import React from "react";
import {
  Command,
  CommandItem,
  CommandGroup,
} from "@/shadcncomponents/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shadcncomponents/ui/popover";
import { Button } from "@/shadcncomponents/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { AppDispatch } from "@/store/store";
import { setOpenModal } from "@/store/designReducer";
import { useDispatch } from "react-redux";

const Filterr = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();

  const modalValues = [
    { value: "inAuthor", label: "Author" },
    { value: "inTitle", label: "Title" },
    { value: "isbn", label: "ISBN" },
    { value: "subject", label: "Category" },
  ];

  const handleFilterClick = (input: string) => {
    dispatch(setOpenModal({ truth: true, modalTitle: input }));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] font-normal justify-between text-black dark:text-inherit"
        >
          Options
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opaciy-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {modalValues.map((item) => (
              <CommandItem
                key={item.label}
                value={item.value}
                onSelect={() => {
                  handleFilterClick(item.value);
                  setOpen(false);
                }}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Filterr;
