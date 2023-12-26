import Greeting from "./header/Greeting";
import { ShelvesResponse } from "@/views/UserProfile";
import Libraries from "./header/Libraries";
import { Dispatch, SetStateAction } from "react";
type Props = {
  data: ShelvesResponse;
  onClick: Dispatch<SetStateAction<string>>;
};

const Browse = (props: Props) => {
  return (
    <div className=" relative w-full flex flex-col ">
      <Greeting username={props.data.userName} />
      <Libraries onClick={props.onClick} data={props.data} />
    </div>
  );
};

export default Browse;
