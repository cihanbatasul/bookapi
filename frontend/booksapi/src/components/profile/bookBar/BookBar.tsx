import React from 'react'
import BookCard from './BookCard'
type Props = {}

const BookBar = (props: Props) => {
    return (
        <div className="col-span-1 w-full sticky top-0 h-screen flex items-center">
            <div className="relative w-full aspect-square rounded-2xl bg-gray-300">
                <BookCard />
            </div>
        </div>
    )
}

export default BookBar