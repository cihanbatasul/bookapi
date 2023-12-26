import Guy from "@/assets/hero.jpg";
import { Button } from "@/shadcncomponents/ui/button";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
type Props = {
  onScrollRef: React.RefObject<HTMLDivElement>;
};

const HeroNew = (props: Props) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const handleScroll = () => {
    if (props.onScrollRef.current) {
      window.scrollTo({
        top: props.onScrollRef.current.offsetTop - 100,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="h-fit lg:min-h-screen md:min-w-[768px] lg:min-w-[768px] max-w-7xl pt-14 m-auto px-6 pb-16 antialiased ">
      <div className="grid w-full h-full md:grid-rows-hero-grid lg:grid-rows-hero-grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 ">
        <div className=" row-span-2 col-span-1  md:col-span-3 lg:col-span-3  flex flex-col h-full rounded-tr-2xl ">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-center h-full flex items-center justify-center gap-6 rounded-bl-2xl text-black dark:text-gray-200">
            <span>Book</span> <span>Discovery</span>
          </h1>
          <div className="flex flex-row justify-between h-full ">
            <div className="w-full bg-background rounded-tr-2xl"></div>
            <h1 className="w-full text-5xl md:text-7xl lg:text-8xl rounded-bl-2xl text-black dark:text-gray-200 ">
              made easy
            </h1>
          </div>
        </div>
        <div className="row-span-3 col-span-2  p-5 overflow-clip">
          <img className="rounded-2xl object-cover" src={Guy} />
        </div>
        <div className="md:row-span-3 lg:col-span-2  flex flex-col h-full w-full ">
          <div className=" h-[130px] rounded-r-2xl rounded-bl-2xl ">
            <h1 className="w-full text-5xl  md:text-7xl lg:text-8xl text-black dark:text-gray-200">
              books api
            </h1>
          </div>
          <div className="flex flex-col gap-3 justify-center h-full text-black dark:text-inherit ">
            <p className="text-xl">
              Welcome to my books api website. This site was built using the
              Google Books API. Feel free to search for books and add them to
              your library to get recommendations.
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleScroll}>Search for book</Button>
            {!isLoggedIn && (
              <Button
                className="text-black dark:text-gray-300"
                onClick={() => navigate("/user")}
                variant={"outline"}
              >
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroNew;
