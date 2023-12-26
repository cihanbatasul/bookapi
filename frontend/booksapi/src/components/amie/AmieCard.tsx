import { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import Lottie from 'lottie-react'
import filterAnimation from '@/assets/lottie-filter.json'
import searchAnimation from '@/assets/lottie-search.json'
import libraryAnimation from '@/assets/lottie-library.json'
type Props = {
    gradient: string
    children: React.ReactNode
} & CardProps

type CardProps = {
    id: string
}

export const FeaturedCard = (props: Props) => {
    const inViewFeature = useSelector((state: RootState) => state.designer.inViewFeature)

    return <div id={props.id} className={`md:absolute md:inset-0 md:h-full w-full rounded-2xl bg-gradient-to-br ${inViewFeature === props.id ? 'opacity-100' : 'opacity-0'} ${props.gradient}`} >{props.children}</div>
}

export const BookFinding = (props: CardProps) => {
    return (
        <FeaturedCard id={props.id} gradient="from-lime-400 via-blue-500 to-purple-400" ><Lottie animationData={searchAnimation}/></FeaturedCard>
    )
}

export const Criteria = (props: CardProps) => {
    return (
        <FeaturedCard id={props.id} gradient="from-blue-300 via-lime-600 to-indigo-200" ><Lottie animationData={filterAnimation}/></FeaturedCard>
    )
}

export const Libraries = (props: CardProps) => {
    return (
        <FeaturedCard id={props.id} gradient=" from-transparent via-purple-400 to-emerald-500" ><Lottie animationData={libraryAnimation}/></FeaturedCard>
    )
}


