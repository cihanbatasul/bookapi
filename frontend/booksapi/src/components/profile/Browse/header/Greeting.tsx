import browsepic from '@/assets/browse.png'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcncomponents/ui/card';
import { useEffect, useState } from 'react';
import { UserBook } from '@/views/UserProfile';
import { ScrollArea } from '@/shadcncomponents/ui/scroll-area';
type Props = {
    username: string;
};

const Greeting = (props: Props) => {
    const [latestBooks, setLatestBooks] = useState<UserBook[]>([]);


    const retrieveLatestBooks = async () => {
        const apiUrl = `http://localhost:5000/latest/`;
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setLatestBooks(data);
            } else {
                console.error('Failed to retrieve the latest books');
            }
        } catch (error) {
            console.error('Network error', error);
        }
    };

    useEffect(() => {
        retrieveLatestBooks();
    }, []);

    return (
        <div className='flex justify-between flex-col pb-3 md:pb-6 lg:pb-16'>
            <p className='text-2xl font-bold pb-16'>Browse</p>
            <div className='flex items-center  pb-3 md:pb-6 lg:pb-16'>
                <div className='w-64 flex flex-col '><p className='text-3xl font-medium'>
                    Hello {props.username}!</p>
                    <p className='font-light'>Check out your libraries!</p>
                </div>
                <div className='lg:w-[600px]  '>
                    <img src={browsepic} />
                </div>
            </div>
            <div className='flex flex-col md:flex-row lg:flex-row gap-3 md:gap-6 lg:gap-12'>
                <div className='flex flex-col'>
                    <p className='pb-12 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl '>Your latest books</p>
                    <div className='flex flex-col md:flex-row lg:flex-row gap-3 mx-auto'>

                        {latestBooks ? latestBooks.map((book, index) => (
                            <Card key={index} className={`$ w-full h-full md:w-[450px] md:h-[180px] overflow-hidden flex items-center justify-center shadow-2xl border-none`}>
                                <CardContent className=' rounded-xl border-none flex gap-3 p-3 items-center'>
                                    <img className='shadow-md rounded-sm h-40  cursor-pointer ease-in-out' src={book.picture} alt='book thumbnail'></img>
                                    <div className='flex flex-col gap-3'>
                                        <p className='font-bold'>{book.title}</p>
                                        <p className='font-light'>{book.author}</p>
                                        <ScrollArea className='max-h-24   shadow-inner'><p>{book.description}</p></ScrollArea>

                                    </div>
                                </CardContent>
                            </Card>
            )): <p className="w-full text-center">No books yet!</p>}
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Greeting;
