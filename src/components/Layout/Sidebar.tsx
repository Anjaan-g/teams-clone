import {BsCameraVideo, BsFilter} from "react-icons/bs"
import {FiEdit,FiUser} from "react-icons/fi"
import { Button } from "../shared/ui/button/Button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../shared/ui/accordion/Accordion"
export const Sidebar = () => {
  return (
    <aside className="sidebar flex flex-col justify-between w-3/12 min-w-[300px] p-2 bg-secondary border  shadow-gray-400  drop-shadow-lg">
        <div className="flex flex-col">
          <div className="flex justify-between items-center h-full">
              <h3 className="text-xl font-bold">Chat</h3>
              <div className="flex items-center gap-3 justify-end">
                  <div className="h-8 w-8 rounded-full bg-day flex items-center justify-center cursor-pointer"><BsFilter size={20}/></div>
                  <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer"><BsCameraVideo size={20} color="white"/></div>
                  <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center cursor-pointer"><FiEdit size={20} /></div>
              </div>
          </div>
          <hr className="my-3 border-day"/>
        </div>
        <div className="flex flex-col ">
          <Accordion type="single" collapsible> 
            <AccordionItem value="recent">
              <AccordionTrigger>Recent</AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-start gap-2 items-center bg-white p-2 rounded-lg">
                  <div className="h-8 w-8 bg-primary flex justify-center items-center rounded-full"><FiUser size={20} color="white"/></div>
                  <p className="text-base">New Chat</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex h-full w-full justify-center items-end">
          <Button className="w-full">
            Create new Chat
          </Button>
        </div>
    </aside>
  )
}
