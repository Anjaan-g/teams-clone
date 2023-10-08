// @ts-nocheck
import { useState } from "react";
import { Button } from "../shared/ui/button/Button";
import { Input } from "../shared/ui/input/Input";
import { Label } from "../shared/ui/label/Label";
import { AiOutlineSend } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import { FiUser, FiEdit } from "react-icons/fi";
import { MdReply } from "react-icons/md";
import { Card, CardContent } from "../shared/ui/card/Card";
import classNames from "classnames";
import React from "react";

interface Chat {
    id: number;
    text: string;
    replies: Reply[];
}

interface Reply {
    id: number;
    text: string;
}

export const Chat = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const { control, handleSubmit, reset } = useForm();
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [creatingThread, setCreatingThread] = useState(false);
    const [replyText, setReplyText] = useState<string>("");

    const handleReply = (chatId: number) => {
        setReplyingTo(prevReplyingTo =>
            prevReplyingTo === chatId ? null : chatId,
        );
    };

    const gptReply = (chatText: string) => {
        return `AI: Thank you for your message: "${chatText}". This is an automated reply from the AI.`;
    };

    const handleReplySubmit = () => {
        if (replyText.trim() !== "") {
            if (replyingTo !== null) {
                const updatedChats = chats.map(chat =>
                    chat.id === replyingTo
                        ? {
                              ...chat,
                              replies: [
                                  ...chat.replies,
                                  {
                                      id: Math.floor(Math.random() * 1000),
                                      text: replyText,
                                  },
                              ],
                          }
                        : chat,
                );
                setChats(updatedChats);
                setReplyText("");
                setReplyingTo(null);

                // Simulate GPT Reply
                const aiReply = gptReply(replyText);
                const updatedChatsWithAIReply = updatedChats.map(chat =>
                    chat.id === replyingTo
                        ? {
                              ...chat,
                              replies: [
                                  ...chat.replies,
                                  {
                                      id: Math.floor(Math.random() * 1000),
                                      text: aiReply,
                                  },
                              ],
                          }
                        : chat,
                );
                setChats(updatedChatsWithAIReply);
                reset();
            }
        }
    };

    const handleCreateThread = () => {
        setCreatingThread(true);
    };

    const handleCreateThreadSubmit = ({
        threadText,
    }: {
        threadText: string;
    }) => {
        const newThreadId = Math.floor(Math.random() * 1000);
        const newThreadMessage: Chat = {
            id: newThreadId,
            text: threadText,
            replies: [
                {
                    id: newThreadId + 1,
                    text: gptReply(threadText)
                }
            ],
        };
        setChats([...chats, newThreadMessage]);
        setReplyText("");
        setReplyingTo(null);
        reset()

    };

    return (
        <div className="chat flex flex-col justify-between items-start w-full">
            <div className="message-content flex flex-col justify-between items-start px-10 w-full min-h-full overflow-y-scroll ">
                {chats.map(chat => (
                    <>
                        <div className="flex justify-between items-center w-full mt-5">
                            <div className="flex justify-start items start w-full gap-1 5">
                                <div className="flex items-center justify-center h-10 w-10 bg-day rounded-full">
                                    <FiUser size={20} />
                                </div>

                                <Card
                                    key={chat.id}
                                    className="w-full mb-4 overflow-y-scroll max-h-[500px]"
                                >
                                    <div className="flex w-full bg-day border-2 border-l-primary h-14 text-center justify-start px-2 items-center text-base">
                                        <div className="flex flex-col justify-start items-start">
                                            <p>You:</p>
                                            <p>{chat.text}</p>
                                        </div>
                                    </div>
                                    <CardContent>
                                        {chat.replies.map(reply => (
                                            <div
                                                className="flex w-full bg-day border-2 border-l-primary h-10 text-center justify-start px-2 items-center text-base"
                                                key={reply.id}
                                            >
                                                {reply.text}
                                            </div>
                                        ))}
                                        {replyingTo === chat.id && (
                                            <div className=" w-full flex justify-start mt-1">
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        handleReplySubmit();
                                                    }}
                                                    className="flex items-center justify-start w-full"
                                                >
                                                    <Controller
                                                        name="replyText"
                                                        control={control}
                                                        defaultValue=""
                                                        render={({ field }) => (
                                                            <input
                                                                type="text"
                                                                {...field}
                                                                className="reply-input h-9 w-full ps-2"
                                                                value={
                                                                    replyText
                                                                }
                                                                placeholder="Type your reply"
                                                                onChange={e =>
                                                                    setReplyText(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    />
                                                    <Button
                                                        variant="default"
                                                        size="icon"
                                                        type="submit"
                                                        className="reply-Button bg-none "
                                                        // onClick={handleReplySubmit}
                                                    >
                                                        <AiOutlineSend
                                                            size={20}
                                                        />
                                                    </Button>
                                                </form>
                                            </div>
                                        )}
                                    </CardContent>
                                    <Button
                                        variant="link"
                                        onClick={() => handleReply(chat.id)}
                                        className="text-black"
                                    >
                                        <MdReply size={20} />
                                        Reply
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <div className="create-thread-Button fixed bottom-2 my-4 flex mx-4 w-full h-12">
                {!creatingThread && (
                    <Button
                        onClick={handleCreateThread}
                        className="flex justify-start gap-1.5 text-white"
                    >
                        <FiEdit size={20} /> Create New Thread
                    </Button>
                )}
                {creatingThread && (
                    <form
                        onSubmit={handleSubmit(handleCreateThreadSubmit)}
                        className="flex justify-start items-center gap-1.5 w-4/5 mr-10"
                    >
                        <Controller
                            name="threadText"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="new-thread-input w-full h-10 ps-2"
                                    placeholder="Type a new message"
                                />
                            )}
                        />
                        <Button type="submit">
                            <AiOutlineSend size={20} /> Send
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};
