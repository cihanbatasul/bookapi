import { motion } from "framer-motion"
import { Button } from "@/shadcncomponents/ui/button"
import SignOutButton from "./SignOutButton"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"

import { Separator } from "@/shadcncomponents/ui/separator"

import { UserCircle, User } from "lucide-react"
import { Link } from "react-router-dom"


type Props = {
    signoutOnClick: () => void
}

const UserDropDown = ({ signoutOnClick }: Props) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger>
                <Button className="rounded-r-none border-r-0" variant="outline" size="icon"><UserCircle className="" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 bg-background rounded-md" align="center">
                <DropdownMenuItem>
                    <motion.div className="flex flex-row gap-3 items-center justify-center">
                        <User />
                        <Link to={"/profile"}>Profile</Link>
                    </motion.div>
                </DropdownMenuItem>

                <Separator className="mt-2 mb-2" />
                <DropdownMenuItem>
                    <SignOutButton onClick={signoutOnClick} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropDown