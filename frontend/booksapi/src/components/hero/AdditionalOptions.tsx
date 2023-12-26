import { motion, useAnimate, stagger } from "framer-motion"
import { FC } from "react"

interface props {
    onChange: (input: string, functionName: string) => void
}

const AdditionalOptions: FC<props> = ({onChange}) => {

    const parent = {
        hidden: {opacity: 0, y: -100},
        show: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.2,
                
            }
        }
    }

    const options  = {
        hidden: {opacity: 0, y: -50},
        show: {
            opacity: 1,
            y: 0,
        }
    }

    return (
    <motion.div
    variants={parent}
    initial="hidden"
    animate="show"
    >

    <motion.div 
    variants={options}
    className="flex flex-col gap-3 text-center">

    <motion.div>
    <motion.div className="text-sm">
    All die Optionen sollten möglichst im Zusammenspiel mit dem initialen Suchtext angegeben werden 
    </motion.div>
    </motion.div>

    <motion.div 
    variants={options}
    className="flex flex-col gap-2">
        <motion.div className="text-sm">
        Geben Sie einen Authoren ein, nach dem gesucht werden soll
        </motion.div>
        <input 
        onChange={(e) => onChange(e.target.value, "inAuthor")}
        className="rounded-md p-1 text-center text-[#949aa7] m-auto" placeholder="Author"/>
    </motion.div>

    <motion.div 
    variants={options}
    className="flex flex-col gap-2">
        <motion.div className="text-sm ">
            Geben Sie eine ISBN-Nummer ein, nach der gesucht werden soll
        </motion.div>
        <input 
        onChange={(e) => onChange(e.target.value, "isbn")}
        className="rounded-md p-1 text-center text-[#949aa7]  m-auto" placeholder="ISBN"/>
    </motion.div>


    <motion.div 
    variants={options}
    className="flex flex-col gap-2">
        <motion.div className="text-sm ">
            Geben Sie eine bevorzugte Kategorie ein, in die das Buch fällt
        </motion.div>
        <input 
        onChange={(e) => onChange(e.target.value, "subject")}
        className="rounded-md p-1 text-center text-[#949aa7] m-auto" placeholder="Kategorie"/>
    </motion.div>


    <motion.div
    variants={options}
    className="flex flex-col gap-2">
        <motion.div className="text-sm">
            Geben Sie ein, welche Wörter im Titel enthalten sein sollen
        </motion.div>
        <input 
        onChange={(e) => onChange(e.target.value, "inTitle")}        
        className="rounded-md p-1 m-auto text-center text-[#949aa7] " placeholder="Titel soll enthalten"/>
    </motion.div>
</motion.div>

{/* <motion.div className="flex flex-row gap-3">
<motion.div

className="cursor-pointer"
onClick={ebooks ? () => handleEbookClick(false) : () => handleEbookClick(true)}>
             Nur Ebooks
        </motion.div>
{ebooks &&  <motion.div className="text-sm">         
    <motion.div
    className="cursor-pointer"
    initial={{opacity: 0, x: -50}}
    animate={{opacity: 1, x: 0}}
    transition={{duration: 0.5, ease: easeIn}}
    onClick={() => handleEbookCategory("free-ebooks")}
    >
        Nur kostenlose Ebooks
    </motion.div>
    <motion.div
    className="cursor-pointer"
    initial={{opacity: 0, x: -50}}
    animate={{opacity: 1, x: 0}}
    transition={{duration: 1, ease: easeIn}}
    onClick={() => handleEbookCategory("paid-ebooks")}
    >
        Nur kostenpflichtige Ebooks
    </motion.div>
    </motion.div>
}        </motion.div>  */}
</motion.div>

  )
}

export default AdditionalOptions