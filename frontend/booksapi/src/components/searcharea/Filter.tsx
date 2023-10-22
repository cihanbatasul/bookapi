import { AnimatePresence, motion } from "framer-motion"
import { Fragment, useEffect, useRef, useState } from "react"
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/solid'
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { setEpubCategory} from "../../store/filterReducer";
import { setOpenModal } from "../../store/designReducer" 
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

const Filter = () => {
  const dispatch: AppDispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEpubCategory = (value: string | null) => {
     dispatch(setEpubCategory(value))
  }

  const handleFilterClick = (value: string) => {
      
    dispatch(setOpenModal({truth: true, modalTitle: value}))
  }

  return (

<Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue-600 dark:bg-transparent text-white dark:text-gray-600 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-900 ">
          Options
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-white dark:text-gray-600" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-400 rounded-md bg-white dark:bg-inherit shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  ">
          <div className="py-1  ">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => handleFilterClick("inAuthor")}
                  className={classNames(
                    active ? 'bg-gray-100 dark:bg-gray-700 dark:text-white' : 'text-black dark:text-gray-500 ',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Author
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={() => handleFilterClick("inTitle")}
                  className={classNames(
                    active ? 'bg-gray-100 dark:bg-gray-700 dark:text-white' : 'text-black dark:text-gray-500 ',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Title
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={() => handleFilterClick("isbn")}
                  className={classNames(
                    active ? 'bg-gray-100 dark:bg-gray-700 dark:text-white' : 'text-black dark:text-gray-500 ',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  ISBN
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={() => handleFilterClick("subject")}
                  className={classNames(
                    active ? 'bg-gray-100 dark:bg-gray-700 dark:text-white' : 'text-black dark:text-gray-500 ',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Category
                </a>
              )}
            </Menu.Item>
          </div>
          
        </Menu.Items>
      </Transition>
    </Menu>

  )
}

export default Filter