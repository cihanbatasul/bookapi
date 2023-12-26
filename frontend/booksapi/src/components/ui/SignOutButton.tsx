import { Button } from "@/shadcncomponents/ui/button"
type Props = {
    onClick: () => void
}

const SignOutButton = ({ onClick }: Props) => {
    return (
        <Button variant="ghost" className="text-red-600 antialiased" onClick={onClick}>
            Sign Out
        </Button>
    )
}

export default SignOutButton