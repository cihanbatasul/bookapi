import Greeting from "./header/Greeting"
import { ShelvesResponse } from "@/views/UserProfile"
import Libraries from "./header/Libraries"
import Recommendations from "./header/Recommendations"
type Props = {
    data: ShelvesResponse
}

const Browse = (props: Props) => {
    return (
        <div className="h-screen w-full flex flex-col ">
            <Greeting username={props.data.userName} />
            <Libraries data={props.data} />
            <Recommendations data={props.data} />
        </div>
    )
}

export default Browse