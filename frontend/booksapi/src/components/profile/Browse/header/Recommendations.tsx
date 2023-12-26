import { ShelvesResponse } from "@/views/UserProfile"
type Shelves = Awaited<Promise<ShelvesResponse>>
import { Shelf } from "@/views/UserProfile"
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle
} from '@/shadcncomponents/ui/card'
import { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store/store"
import { setRecommendations } from "@/store/userReducer"
type Props = {
    data: Shelves
}



const Recommendations = (props: Props) => {

    const dispatch: AppDispatch = useDispatch()
    const recommendations = useSelector((state: RootState) => state.user.recommendations)

    // const fetchRecommendations = async () => {

    //     try {
    //         let apiURL = `http://localhost:5000/recommendations/`
    //         const response = await fetch(apiURL, {
    //             method: "GET",
    //             headers: { "Content-Type": "application/json" },
    //             credentials: "include"
    //         })
    //         if (response.ok) {
    //             console.log("api call success")
    //             const data = await response.json()
    //             dispatch(setRecommendations(data))
    //         }
    //     } catch (error) {
    //         console.log("erorr with the api call ", error)
    //     }
    // }

    // useEffect(() => {
    //     fetchRecommendations()
    // }, [])

    return (
        <div className="flex flex-col ">
            <h1 className="pt-12 pb-12 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl ">Recommended for you</h1>
            <div className="flex flex-col md:flex-row lg:flex-row  gap-3 md:gap-6 lg:gap-6 flex-wrap  ">
                {recommendations.map((rec, index) => (
                    <p key={index}>{rec}</p>
                ))}
            </div>
        </div>
    )
}

export default Recommendations