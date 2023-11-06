import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface props {
  bookID: string;
}

const AddToShelveButton: FC<props> = ({ ...props }) => {
  const handleAddToShelve = async (input: string) => {
    try {
      const apiURL = `http://localhost:5000/add/`;
      const data = {
        bookID: props.bookID,
        shelf: input,
      };

      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (response.ok) {
        console.log("book added to shelf successfully");
      } else {
        console.error("Failed to add book to shelf.");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <div className=" w-64 md:w-56 lg:w-56 m-auto">
      <Menu
        as="div"
        className="w-64 md:w-56 lg:w-56 relative inline-block text-left"
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-blue-600/90 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Add To Shelf
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-1/2 right-1/2 -translate-x-1/2  mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white  shadow-lg ring-1 ring-black/5 focus:outline-none ">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleAddToShelve("wtr")}
                    className={`${
                      active ? "bg-blue-600 text-white" : "text-gray-900  "
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-center`}
                  >
                    Want To Read
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleAddToShelve("read")}
                    className={`${
                      active ? "bg-blue-600 text-white" : "text-gray-900 "
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-center`}
                  >
                    Read
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleAddToShelve("curr")}
                    className={`${
                      active ? "bg-blue-600 text-white" : "text-gray-900 "
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-center`}
                  >
                    Currently Reading
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleAddToShelve("fav")}
                    className={`${
                      active ? "bg-blue-600 text-white" : "text-gray-900 "
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm justify-center`}
                  >
                    Favorites
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default AddToShelveButton;

