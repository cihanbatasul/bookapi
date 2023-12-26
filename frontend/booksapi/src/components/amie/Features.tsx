import { inView, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import { setInViewFeature } from "@/store/designReducer"
import { RootState, AppDispatch } from "@/store/store"
import { useSelector, useDispatch } from "react-redux"
type Props = {
    children: React.ReactNode
    id: string
}

export const FeatureTitle = (props: Props) => {
    const ref = useRef<HTMLParagraphElement>(null)
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" })
    const inViewFeature = useSelector((state: RootState) => state.designer.inViewFeature)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (isInView) {
            dispatch(setInViewFeature(props.id))
        }
        if (!isInView && inViewFeature === props.id) {
            dispatch(setInViewFeature(null))
        }
    }, [isInView, props.id, setInViewFeature, inViewFeature])

    return (
        <p ref={ref} className={`text-5xl py-16 transition-colors ${isInView ? "text-black dark:text-white" : "text-gray-300 dark:text-gray-900"}`}>{props.children}</p>
    )
}