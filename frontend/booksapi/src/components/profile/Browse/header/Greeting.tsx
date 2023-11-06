import browsepic from '@/assets/browse.png'
type Props = {
    username: string
}

const Greeting = (props: Props) => {
    return (
        <div>
            <div className='text-2xl'>Hello, {props.username}!</div>
            <div className='flex justify-end'>
                <img className='w-[800px]' src={browsepic}></img>
            </div>
        </div>
    )
}

export default Greeting