import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/solid'
import { AppDispatch, RootState } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { setMaxBooks} from '../../store/filterReducer'

const numbers = [
    {name: 'Suchergebnismenge', value: 10},
  { name: '10 (Standard)', value: 10 },
  { name: '20', value: 20 },
  { name: '30', value: 30 },
  { name: '40', value: 40 },
]

export default function Example() {
  const [selected, setSelected] = useState(numbers[0])
  const [maximumBooks, setMaximumBooks] = useState(numbers[0].value)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(setMaxBooks(maximumBooks))
  }, [maximumBooks])

  return (
    <div className="w-fit ">
      <Listbox value={selected} onChange={setSelected} >
        <div className="relative ">
          <Listbox.Button className="relative w-full  rounded-lg bg-blue-600 dark:bg-transparent text-white dark:text-gray-600 px-3 py-2  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm cursor-pointer text-center flex flex-row ">
            {selected.name}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-white dark:text-gray-600  ml-2" aria-hidden="true" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white dark:bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm   ">
              {numbers.map((number, numberIdx) => (
                <Listbox.Option
                  key={numberIdx}
                  onClick={() => setMaximumBooks(number.value)}              
                  className={({ active }) =>
                    `relative  select-none py-2 pl-10 pr-4 w-full text-center cursor-pointer ${
                      active ? ' dark:bg-gray-700 text-inherit dark:text-white' : 'text-black dark:text-inherit '
                    }`
                  }
                  value={number}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {number.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
