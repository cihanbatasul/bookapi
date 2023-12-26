import { motion, easeInOut } from "framer-motion"
type Props = {}

const Terminal = (props: Props) => {
    return (
        <div className="terminal_container pt-2  px-2 h-full w-full ">
            <div className="terminal_toolbar flex flex-row gap-2 bg-gray-700  items-center rounded-t-md">
                <div className="buttons flex flex-row gap-1 p-2">
                    <button className="rounded-full w-4 h-4 bg-red-700 "></button>
                    <button className="rounded-full w-4 h-4 bg-green-700 "></button>
                    <button className="rounded-full w-4 h-4 bg-gray-600"></button>
                </div>
                <p className="">cihan@admin: ~</p>
            </div>
            <div className="terminal_body flex flex-col  p-2 bg-blue-800 h-full rounded-b-lg gap-2">
                <div className="terminal_prompt flex flex-row items-center gap-2 text-sm">
                    <span className=" text-white">cihan@admin:</span>
                    <span className="text-fuchsia-300 ">~</span>
                    <span className="text-white ">$</span>
                    <span className="text-white" >install react</span>
                </div>

                <div className="terminal_prompt flex flex-row items-center gap-2 text-sm">
                    <span className=" text-white">cihan@admin:</span>
                    <span className="text-fuchsia-300 ">~</span>
                    <span className="text-white ">$</span>
                    <span className="text-white" > install tailwindcss
                    </span>

                </div>
                <div className="terminal_prompt flex flex-row items-center gap-2 text-sm">
                    <span className=" text-white">cihan@admin:</span>
                    <span className="text-fuchsia-300 ">~</span>
                    <span className="text-white ">$</span>
                    <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="h-4 w-1 bg-white"></motion.span>
                </div>
            </div>

        </div>
    )
}

export default Terminal