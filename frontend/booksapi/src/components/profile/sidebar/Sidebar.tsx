import { cn } from "@/lib/utils"
import { Button } from "@/shadcncomponents/ui/button"
import { ScrollArea } from "@/shadcncomponents/ui/scroll-area"

import { ShelvesResponse, Shelf, UserBook } from "@/views/UserProfile"

import { Library, Book, Pen, BookOpenCheck, FolderClock, FolderCheck, FolderHeart, FolderOpen } from "lucide-react"
import { Dispatch } from "react"


type Shelves = Awaited<Promise<ShelvesResponse>>

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    libraries?: Shelves
    sideBarAction: Dispatch<React.SetStateAction<string>>
}

const Sidebar = ({ className, libraries, sideBarAction }: Props) => {
    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Discover
                    </h2>
                    <div className="space-y-1">

                        <Button variant="ghost" className="w-full justify-start" onClick={() => sideBarAction("browse")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <rect width="7" height="7" x="3" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="14" rx="1" />
                                <rect width="7" height="7" x="3" y="14" rx="1" />
                            </svg>
                            Browse
                        </Button>

                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Library
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => sideBarAction("libraries")}>
                            <Library className="mr-2 h-4 w-4" />
                            Libraries
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => sideBarAction("books")}>
                            <Book className="mr-2 w-4 h-4" />
                            All Books
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => sideBarAction("authors")}>
                            <Pen className="mr-2 w-4 h-4" />
                            Your Authors
                        </Button>

                    </div>
                </div>
                <div className="py-2">
                    <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                        Your Libraries
                    </h2>
                    <ScrollArea className="h-[300px] px-1">
                        <div className="space-y-1 p-2">
                            {libraries?.AllShelves.map((library, i) => (
                                <Button
                                    key={`${library}-${i}`}
                                    variant="ghost"
                                    className="w-full justify-start font-normal"
                                    onClick={() => sideBarAction(library.shelfType)}
                                >
                                    {library.shelfType === "curr" ? <FolderOpen className="mr-2 w-4 h-4" /> : library.shelfType === "fav" ? <FolderHeart className="mr-2 w-4 h-4" /> : library.shelfType === "wtr" ? <FolderClock className="mr-2 w-4 h-4" /> : <FolderCheck className="mr-2 w-4 h-4" />}
                                    {library.shelfType === "curr" ? "Currently Reading" : library.shelfType === "fav" ? "Favorites" : library.shelfType === "wtr" ? "Want To Read" : "Finished"}
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
