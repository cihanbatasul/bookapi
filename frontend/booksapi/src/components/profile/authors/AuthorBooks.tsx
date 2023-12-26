import { useEffect, useState } from 'react'
import { VolumeInfoWithImages, Query } from '@/components/book/queryResult/interfaces'
import { Separator } from '@/shadcncomponents/ui/separator'

import authorBookImg from '@/assets/placeholderbook.png'
type Props = {
    author: string
    navigate: NavigateFunction
}

import { Card, CardContent, CardFooter } from '@/shadcncomponents/ui/card'
import { Button } from '@/shadcncomponents/ui/button'
import { NavigateFunction } from 'react-router-dom'


const AuthorBooks = (props: Props) => {
    const [books, setBooks] = useState<Awaited<VolumeInfoWithImages[]>>([])

    const fetchAuthorBooks = async () => {
        try {
            let apiUrl = `http://localhost:5000/authorbooks?query=&inauthor=${props.author}`
            const response = await fetch(apiUrl, {
                method: "GET",
                credentials: "include"
            })

            if (response.ok) {
                const data = await response.json()

                if (data.items && Array.isArray(data.items)) {
                    const bookData = await Promise.all(
                        data.items.map(async (item: Query) => {
                            const imageResponse = await fetch(`http://localhost:5000/getimg?id=${item.id}`)
                            if (imageResponse.ok) {
                                const imageData = await imageResponse.json()
                                return { query: item, imageLinks: imageData }
                            }
                            return null
                        })
                    )

                    setBooks(bookData.filter(book => book !== null))
                }
            }
        } catch (error) {
            console.error("Error fetching authors books", error)
        }
    }

    useEffect(() => {
        fetchAuthorBooks()
    }, [])

    useEffect(() => {
        console.log(books)

    }, [books])
    return (
        <div className='flex flex-col pb-16 '>
            <h1 className='scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl'>{props.author}</h1>
            <Separator className='m-6' />
            <div className='flex flex-row gap-3 flex-wrap'>
                {books?.length > 0 && books?.map((book) => (
                    <Card className='flex flex-col items-center justify-between w-[300px]' key={book.query.id}>
                        <CardContent className='h-80 gap-3 p-3 flex flex-col items-center '>
                            <p className='font-bold'>{book.query.volumeInfo.title}</p>
                            {book.imageLinks.thumbnail ? <img src={book.imageLinks.thumbnail} /> : <img width={'162px'} src={authorBookImg} />}
                        </CardContent>
                        <CardFooter><Button onClick={() => props.navigate(`/book/${book.query.id}`)}>View full book</Button></CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default AuthorBooks

