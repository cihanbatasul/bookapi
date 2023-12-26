import { RootState, AppDispatch } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { setMaxBooks } from "../../store/filterReducer"



const Select = () => {
const dispatch = useDispatch()
const number = useSelector((state: RootState) => state.filter.maxBooks)
const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    const int = parseInt(selectedValue)
    dispatch(setMaxBooks(int))
    
  }


  return (
<div className="w-full md:w-[50%] lg:w-[50%] ">
<label htmlFor="underline_select" className="sr-only">Underline select</label>
<select id="underline_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-black dark:border-light focus:outline-none focus:ring-0 focus:border-gray-200 peer text-center"
onChange={handleSelectChange}>
    <option selected>Suchergebnismenge</option>
    <option value="10">10 (Standard)</option>
    <option value="20">20</option>
    <option value="30">30</option>
    <option value="40">40</option>
</select>
</div>
  )
}

export default Select