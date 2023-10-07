import { Fragment, useEffect, useRef, useState } from "react"
import { Button } from "../shared/ui/button/Button"
import { Input } from "../shared/ui/input/Input"
import { Label } from "../shared/ui/label/Label"
import { AiOutlineSend } from "react-icons/ai"
import { useForm } from "react-hook-form"
import { FiUser } from "react-icons/fi"
import { Card, CardContent } from "../shared/ui/card/Card"

export const Chat = () => {
    const [messages, setMessages] = useState<{message: string | undefined}[]>([])
    const [replies, setReplies] = useState<{reply: string | undefined}[]>([])
    const [message, setMessage] = useState<string | undefined>()
    const [reply, setReply] = useState<string | undefined>()

    const {register, handleSubmit, reset} = useForm()

    const onSubmit = (data) => {
        console.log(data)
        if (!data) {
            return
        }
        if(data.message !== undefined) {
            setMessage(data.message)

            setReply(data.message)
        }
    }
    // const conversation = _.zip(messages, replies)

    useEffect( () => {
        if (!message) return;
        setReply(message)
        setMessages([...messages, {message}])
        reset()
    }, [message])
    
    useEffect( () => {
        if (!reply) return;
        const timer = setTimeout(() => {
            console.log("run after 1 second")
        }, 1000)
        setReplies([...replies, {reply}])

        return () => clearTimeout(timer)
    }, [reply])

    const chatBox = useRef(null)
    
    // useEffect(() => chatBox.current.scrollIntoView(false), [messages])

  return (
    <div className="chat flex flex-col justify-between items-center bg-secondary">
        <div className="flex p-2 bg-day w-full h-14 justify-start gap-2 items-center">
            <Label htmlFor="to">To:</Label>
            <Input id="to" placeholder="Enter name, email or phone number" className="border-none shadow-none h-full bg-day"/>
        </div>
        <div className=" message-content flex flex-col justify-start items-center px-10 bg-secondary w-full mt-4 " ref={chatBox}>
            { messages?.map((item, index) => {
                const messageReply = replies[index].reply;
                return (

                <Fragment key={index}>
                    <div className="flex justify-between items-center w-full mt-5">
                        <div className="flex justify-start items-start w-full gap-1.5">
                            <div className="flex items-center justify-center h-10 w-10 bg-day rounded-full">
                                <FiUser size={20}/>
                            </div>
                            <Card className="w-full">

                                <div className="flex w-full bg-day border-2 border-l-primary h-10 text-center justify-start px-2 items-center text-base">
                                    <p>
                                        You: {item.message}
                                        
                                    </p>
                                </div>
                                <CardContent className="p-2">
                                    
                                                <div className="flex justify-start items-start w-full gap-1.5">
                                                    <div className="flex items-center justify-center h-10 w-10 bg-day rounded-full">
                                                        <FiUser size={20}/>
                                                    </div>
                                                    <div className="flex w-full bg-day border-2 border-l-night h-10 justify-start px-2 items-center text-base">
                                                        <p>
                                                            GPT: Your question was: {messageReply}
                                                        </p>
                                                    </div>
                                                </div>
                                            
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    
                </Fragment>
            )})
            }
        </div>
        <div className=" bottom-0 my-4 flex justify-between items-center w-full px-10">
            <form className="flex justify-between w-full items-center gap-1.5" onSubmit={handleSubmit(onSubmit)}>
                <Input className="bg-day h-12" placeholder="Type a message..." type="text" {...register("message", {required: true})}/>
                <Button type="submit" onSubmit={(e) => onSubmit(e)}>
                    <AiOutlineSend size={20} color="white"/>
                </Button>
            </form>
        </div>
    </div>
  )
}
