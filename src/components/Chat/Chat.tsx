// @ts-nocheck
import { useState } from "react";
import { Button } from "../shared/ui/button/Button";
import { Input } from "../shared/ui/input/Input";
import { Label } from "../shared/ui/label/Label";
import { AiOutlineSend } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import { FiUser, FiEdit } from "react-icons/fi";
import { Card, CardContent } from "../shared/ui/card/Card";
import classNames from "classnames";

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

    const handleNewChatSubmit = ({ newChat }: { newChat: string }) => {
        const newChatMessage: Chat = {
            id: Math.floor(Math.random() * 1000),
            text: newChat,
            replies: [],
        };
        setChats([...chats, newChatMessage]);
        reset();
    };

    const handleReply = (chatId: number) => {
        setReplyingTo(chatId);
    };

    const handleReplySubmit = ({ replyText }: { replyText: string }) => {
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
            setReplyingTo(null);
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
            replies: [],
        };
        setChats([...chats, newThreadMessage]);
        reset();
        setCreatingThread(false);
    };

    return (
        <div className="chat flex flex-col justify-between items-center w-full">
            <div className="message-content flex flex-col justify-between items-start px-10 w-full">
                {chats.map(chat => (
                    <>
                        <div className="flex justify-between items-center w-full mt-5">
                            <div className="flex justify-start items start w-full gap-1 5">
                                <div className="flex items-center justify-center h-10 w-10 bg-day rounded-full">
                                    <FiUser size={20} />
                                </div>

                                <Card
                                    key={chat.id}
                                    className="w-full mb-4"
                                >
                                    <div className="flex w-full bg-day border-2 border-l-primary h-14 text-center justify-start px-2 items-center text-base">
                                        <div className="flex flex-col">
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
                                            <div className=" w-full flex justify-start">
                                                <form
                                                    onSubmit={handleSubmit(
                                                        handleReplySubmit,
                                                    )}
                                                >
                                                    <Controller
                                                        name="replyText"
                                                        control={control}
                                                        defaultValue=""
                                                        render={({ field }) => (
                                                            <input
                                                                type="text"
                                                                {...field}
                                                                className="reply-input"
                                                                placeholder="Type your reply"
                                                            />
                                                        )}
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        type="submit"
                                                        className="reply-Button bg-none"
                                                    >
                                                        Reply
                                                    </Button>
                                                </form>
                                            </div>
                                        )}
                                    </CardContent>
                                    <Button
                                        onClick={() => handleReply(chat.id)}
                                    >
                                        Reply
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </>
                ))}
                <div className="create-thread-Button bottom-0 my-4 flex justify-start ">
                    {!creatingThread && (
                        <Button
                            onClick={handleCreateThread}
                            className="flex justify-start gap-1.5 text-white"
                        >
                            {" "}
                            <FiEdit size={20} /> Create New Thread
                        </Button>
                    )}
                    {creatingThread && (
                        <form
                            onSubmit={handleSubmit(handleCreateThreadSubmit)}
                            className="flex justify-start gap-1.5"
                        >
                            <Controller
                                name="threadText"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="new-thread-input"
                                        placeholder="Type a new message"
                                    />
                                )}
                            />
                            <Button type="submit">Send</Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
