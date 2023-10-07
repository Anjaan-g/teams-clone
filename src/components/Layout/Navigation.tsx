import {BsSearch} from "react-icons/bs"

export const Navigation = () => {
  return (
    <nav className="fixed z-50 top-0 bg-primary  w-full h-16 justify-between pt-3 items-center">
        <div className="flex justify-between items-center gap-2 px-10">
            <div className="flex items-center ml-24 sm:ml-32 md:ml-40 lg:ml-56 w-[500px] bg-day h-10 rounded-lg">
                <div className="flex ps-3 items-center justify-center gap-4 w-[490px] h-9">
                    <BsSearch size={20}/>
                    <input type="text" placeholder="Search" className="w-full border-none h-9 ps-2"/>
                </div>
            </div>
            <div className="flex font-medium bg-day rounded-full h-10 w-10 items-center justify-center text-center">P</div>
        </div>
    </nav>
  )
}
