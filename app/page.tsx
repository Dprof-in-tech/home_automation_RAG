/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useChat } from "@ai-sdk/react";
import { Message } from "ai";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Loader = () => {
  return (
    <div className="flex items-center gap-1 h-5">
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
    </div>
  );
};

 const PrompSuggestionsRow = ({ onClick }: { onClick: any }) => {
  const prompts = [
    "What is Home Automation?",
    "Why automate your home?",
    "How can i automate my home?",
    "What are the benefits of home automation?",
  ];

  return (
    <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center w-full">
      {prompts.map((prompt, index) => {
        return (
          <div
            key={`suggestion-${index}`}
            className="relative max-w-fit flex flex-col items-start"
          >
            <button
              className="bg-[#0078FE] text-white rounded-2xl px-4 py-3 text-[12px] md:text-sm text-left w-fit"
              onClick={() => {
                onClick(prompt);
              }}
            >
              {prompt}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default function Home() {
  const {
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    messages,
  } = useChat();
  const Messages = !messages || messages.length === 0;

  const handlePrompt = (text: any) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      content: text,
      role: "user",
    };

    append(msg);
  };
  return (
    <div className="bg-black w-full min-h-screen h-full flex flex-col items-center justify-between gap-[2rem] px-8 py-4  md:py-[4rem]">
      <section className="flex flex-col gap-auto justify-between h-fit">
        <h1 className="text-2xl font-semibold text-center my-4">
          Home Automation GPT
        </h1>
        {Messages ? (
          <div className="mx-auto w-full text-center flex flex-col items-center px-4">
            <p className="w-full md:max-w-1/2 mx-auto">
              The Ultimate place for engineering freaks and DIY experts ! Ask
              AUTOMATE anything about home automation and it will be sure to
              give you the most up-to-date answers. We hope you enjoy!
            </p>
            <br />

            <PrompSuggestionsRow onClick={handlePrompt} />
          </div>
        ) : (
          <div className="md:max-w-[60%] mx-auto w-full px-4 relative flex flex-col gap-2 mt-4">
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isUser ? "justify-end items-end" : "justify-start items-start"
                  } w-full`}
                >
                  <div className={`flex flex-col ${
                    isUser ? "justify-end items-end" : "justify-start"
                  } w-fit`}>
                    <div
                      className={`${
                        isUser ? "bg-[#0078FE]" : "bg-[#202020]"
                      } text-white rounded-2xl px-4 py-3 text-sm text-left max-w-[80%] space-y-2`}
                    >
                      <ReactMarkdown
                        components={{
                          p: ({ ...props }) => (
                            <p className="mb-2 leading-snug" {...props} />
                          ),
                          code: ({
                            inline,
                            children,
                            ...props
                          }: {
                            inline?: boolean;
                            children?: React.ReactNode;
                          }) =>
                            inline ? (
                              <code
                                className="bg-gray-700 px-1 py-0.5 rounded text-[0.85em]"
                                {...props}
                              >
                                {children}
                              </code>
                            ) : (
                              <pre
                                className="bg-gray-800 p-3 rounded text-sm overflow-x-auto"
                                {...props}
                              >
                                <code>{children}</code>
                              </pre>
                            ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    <div
                      className={`flex gap-2 my-2 ${
                        isUser ? "justify-end" : "justify-start"
                      } w-full text-xs text-gray-400`}
                    >
                      <p>{message.role === "assistant" ? "NOVA" : "YOU"}</p>
                      <p>
                        {message?.createdAt
                          ? new Date(message.createdAt)
                              .toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })
                              .toLowerCase()
                          : "Unknown time"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && <Loader />}
          </div>
        )}
      </section>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center w-full justify-center self-end"
      >
        <input
          type="text"
          className="bg-transparent backdrop-blur-lg px-4 py-4 rounded-full border border-[#efefef] text-[#efefef] w-full md:w-7/12 mx-auto"
          onChange={handleInputChange}
          value={input}
          placeholder="Question you want to ask?"
        />
        <button
          type="submit"
          className="absolute right-3 md:right-[21.5%] p-2 rounded-full border border-[#efefef] text-[#efefef]"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
}
