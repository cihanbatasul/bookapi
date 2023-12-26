import { ShelvesResponse } from "@/views/UserProfile"
type Shelves = Awaited<Promise<ShelvesResponse>>
import { Shelf } from "@/views/UserProfile"
import { Dispatch, SetStateAction } from "react"

import {
    Card,
    CardContent,
    CardFooter,
} from '@/shadcncomponents/ui/card'
import { Button } from "@/shadcncomponents/ui/button"

import { LibraryBig } from "lucide-react"

type Props = {
    data: Shelves
    onClick: Dispatch<SetStateAction<string>>
}

const shelfNames: Record<string, string> = {
    "curr": "Currently Reading",
    "fav": "Favorites",
    "wtr": "Plan To Read",
    "read": "Finished Reading"
}

const assignShelfName = (shelfType: string) => shelfNames[shelfType]

const Libraries = (props: Props) => {
    return (
        <div className="flex flex-col pb-12 ">
            <div className="pb-12">
                <h1 className=" pb-12 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl ">Your Libraries</h1>
                <h2 className="text-sm scroll-m-2">You have {props.data.AllShelves.length} libraries.</h2>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row  gap-3 md:gap-6 lg:gap-6 flex-wrap  ">
                {props.data.AllShelves.map((shelf: Shelf) => (
                    <Card
                        className="h-72 w-full md:w-44 lg:w-48  flex flex-col justify-between p-3">
                        <CardContent className="h-full flex flex-col justify-between items-center "><p className="text-center font-bold">{assignShelfName(shelf.shelfType)}</p>
                            <LibraryBig strokeWidth={"0.8px"} width={"55px"} height={"h-auto"} />
                            <Button className="w-full"
                                onClick={() => props.onClick(shelf.shelfType)} variant={"outline"}>View Shelf</Button>
                        </CardContent>
                        <CardFooter>{shelf.shelf && shelf.shelf.length === 1
                            ? <p className="text-sm text-gray-500 m-auto p-0 "><span className="text-green-600">{shelf.shelf.length}</span> Book </p>
                            : shelf.shelf && shelf.shelf.length > 1
                                ? <p className="text-sm text-gray-500 m-auto p-0 "><span className="text-green-600">{shelf.shelf.length}</span> Books </p>
                                : <p className="text-sm text-gray-500 m-auto p-0 ">No Books </p>
                        }</CardFooter>
                    </Card>
                ))}
            </div>
        </div >
    )
}

export default Libraries
