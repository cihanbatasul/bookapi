import { FC } from "react"


interface props {
    img: string
}


const UserIcon: FC<props> = ({img}) => {
  return (
    <div className={`e rounded-full   bg-gray-900 dark:bg-white w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[180px] lg:h-[180px]   bg-[url('${img}')] bg-cover shadow-xl	`}>
        
    </div>
  )
}

export default UserIcon