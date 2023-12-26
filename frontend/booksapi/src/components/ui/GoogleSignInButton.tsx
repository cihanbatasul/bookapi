import { Button } from "@/shadcncomponents/ui/button"
import { Mail } from "lucide-react"
import google from '@/assets/google.svg'

type Props = {}

const GoogleSignInButton = (props: Props) => {
    return (

        <Button variant={'outline'} className="w-[100px] h-auto m-auto shadow-2xl border-slate-300 dark:border-gray-800 mb-6 "  ><img className="w-7 " src={google} /></Button>
    )
}

export default GoogleSignInButton