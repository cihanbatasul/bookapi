import { motion } from "framer-motion"
import { FC } from "react"

interface props {
    text: string
    el?: keyof JSX.IntrinsicElements
    className?: string
}

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 100
    },
    visible: {
        opacity: 1,
        y: 0
    }
}

const StaggeredText: FC<props> = ({text, el:Wrapper = "p", className}: props) => {
  return (
    
     <Wrapper className={className}>
        <span className="sr-only">{text}</span>
        <motion.span 
        initial="hidden" animate="visible" transition={{staggerChildren: 0.1}}
        aria-hidden>{text.split(".").map((char) => (
            <motion.span
            variants={defaultAnimations}
            className={`inline-block ${className}`}
            >{char}</motion.span>
        ))}
        </motion.span>
        </Wrapper>
  )
}

export default StaggeredText