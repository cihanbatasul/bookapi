import { ShelvesResponse } from "@/views/UserProfile";
import { ScrollArea } from "@/shadcncomponents/ui/scroll-area";
type Shelves = Awaited<Promise<ShelvesResponse>>;

type Props = {
    data: Shelves;
};

const Favs = ({ data }: Props) => {
    return (
        <div className="flex flex-col">

            <h1 className="text-3xl pb-16">Favorites</h1>
            <div className="flex flex-col  md:flex-col lg:flex-row flex-wrap ">
                {data.AllShelves.map((shelf) => (
                    (shelf.shelf && shelf.shelfType === "fav") &&  // Check if shelf is not null
                    shelf.shelf.map((book) => (
                        <div className="flex flex-row gap-3 h-56 sm:w-full md:w-full lg:w-[600px] " key={book.bookID}> {/* Added a unique key */}
                            <img className="" src={book.picture} alt="book image" />
                            <div className="flex flex-col gap-3    text-justify ">
                                <p className="font-bold">{book.title}</p>
                                <p className="font-extralight">{book.author}</p>
                                <ScrollArea >{book.description}</ScrollArea>
                            </div>
                        </div>
                    ))
                ))}
            </div>
        </div>
    );
};

export default Favs;