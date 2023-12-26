import { Switch as SwitchUI } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { setEpubs } from '../../store/filterReducer'
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';

const Switch = () => {
  const [checked, setChecked] = useState(false);
  const dispatch: AppDispatch = useDispatch()
  const handleEpubClick = (value: boolean) => {
    dispatch(setEpubs(value))
  }

  useEffect(() => {
    handleEpubClick(checked)
  }, [checked]);

  return (
    <div className='flex flex-row gap-2 pt p-3 '>
      <span className='text-sm text-black  dark:text-inherit'>Epubs mit Download</span>

      <SwitchUI
        checked={checked}
        onChange={setChecked}
        className={`${checked ? 'bg-blue-600 dark:bg-gray-600 ' : 'bg-blue-200 dark:bg-gray-800'} relative inline-flex  h-6 w-11 items-center rounded-full`}
      >
        <span className='sr-only'>Auf Epubs mit Download einschränken</span>
        <span
          className={`${checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white  transition`}
        />
      </SwitchUI>
    </div>
  );
};

export default Switch;
