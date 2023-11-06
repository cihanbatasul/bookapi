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

type Props = {
    data: Shelves
}

const shelfNames: Record<string, string> = {
    "curr": "Currently Reading",
    "fav": "Favorites",
    "wtr": "Plan To Read",
    "read": "Finished Reading"
}

const assignShelfName = (shelfType: string) => shelfNames[shelfType]

const Recommendations = (props: Props) => {
    return (
        <div className="flex flex-col ">
            <h1 className="pt-12 pb-12 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl ">Recommended for you</h1>
            <div className="flex flex-col md:flex-row lg:flex-row  gap-3 md:gap-6 lg:gap-6 flex-wrap  ">
                {props.data.AllShelves.map((shelf: Shelf) => (
                    <Card className="h-72 w-full md:w-44 lg:w-48  flex flex-col justify-between border-none">
                        <CardContent><p className="text-center font-bold">{assignShelfName(shelf.shelfType)}</p></CardContent>
                        <CardFooter><p className="text-sm text-gray-500">Books in this library: {shelf.shelf ? shelf.shelf.length : "No Books"}</p></CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Recommendations