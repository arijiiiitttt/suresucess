"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { Button } from "./ui/button";
import { FaCamera, FaTrash, FaEdit } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
// import { interviewer } from "@/constants";
// import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("/user-avatar.png");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved profile image on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      
      // Convert image to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('profileImage', base64String);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Cleanup function to revoke object URLs
  useEffect(() => {
    return () => {
      if (profileImage.startsWith('blob:')) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    // const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    //   console.log("handleGenerateFeedback");

    //   const { success, feedbackId: id } = await createFeedback({
    //     interviewId: interviewId!,
    //     userId: userId!,
    //     transcript: messages,
    //     feedbackId,
    //   });

    //   if (success && id) {
    //     router.push(`/interview/${interviewId}/feedback`);
    //   } else {
    //     console.log("Error saving feedback");
    //     router.push("/");
    //   }
    // };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
      setShowContextMenu(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDeleteImage = () => {
    setProfileImage("/user-avatar.png");
    localStorage.removeItem('profileImage');
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Yellow background div */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 bg-yellow-400 rounded-2xl border-3 border-black" />
        
        {/* Main white card */}
        <div className="relative w-full bg-white rounded-2xl border border-black p-4 sm:p-6 md:p-8">
          <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
            {/* Profile Cards Container */}
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 place-items-center">
              {/* AI Interviewer Card */}
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <div className="relative">
                  <Image
                    src="/mainimg.png"
                    alt="profile-image"
                    width={160}
                    height={160}
                    className="object-cover rounded-full size-[100px] sm:size-[120px] md:size-[164px]"
                  />
                  {isSpeaking && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-green-500 rounded-full animate-ping" />
                  )}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 text-center tracking-tight">AI Interviewer</h3>
              </div>

              {/* User Profile Card */}
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                <div className="relative">
                  <div className="relative group">
                    <Image
                      src={profileImage}
                      alt="Editable Profile Image"
                      width={120}
                      height={120}
                      className="rounded-full object-cover size-[120px] sm:size-[140px] md:size-[164px] border-2 border-gray-100 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    />
                    {/* Upload Overlay */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FaCamera className="text-white text-2xl sm:text-3xl md:text-4xl" />
                    </div>
                    {/* Upload Indicator */}
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  {/* Settings Button with Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="absolute -bottom-2 -right-2 group bg-white hover:bg-gray-50 text-black font-medium p-2.5 sm:p-3.5 md:p-4.5 rounded-full transition-all duration-200 border-2 border-black"
                    >
                      <SlSettings className="plus-icon text-[1.8em] sm:text-[1.8em] md:text-[1.8em] transition-transform duration-300" />
                    </button>
                    {/* Dropdown Menu */}
                    {showDropdown && (
                      <div className="absolute -right-2 top-0 translate-x-full ml-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <button
                          onClick={() => {
                            fileInputRef.current?.click();
                            setShowDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <FaEdit className="text-sm" />
                          Edit Image
                        </button>
                        <button
                          onClick={handleDeleteImage}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <FaTrash className="text-sm" />
                          Delete Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 text-center tracking-tight">{userName}</h3>
              </div>
            </div>

            {/* Transcript Section */}
            {messages.length > 0 && (
              <div className="w-full max-w-2xl mx-auto">
                <div className="relative">
                  {/* Yellow background for transcript */}
                  <div className="absolute inset-0 translate-x-2 translate-y-2 bg-yellow-400 rounded-lg border-2 border-black" />
                  <div className="relative bg-white rounded-lg border border-black p-4">
                    <p
                      key={lastMessage}
                      className={cn(
                        "text-sm sm:text-base text-gray-700 transition-opacity duration-500 text-center tracking-tight",
                        "animate-fadeIn opacity-100"
                      )}
                    >
                      {lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Call Button Section */}
            <div className="w-full flex justify-center">
              {callStatus !== "ACTIVE" ? (
                <Button
                  className="relative group bg-white hover:bg-gray-50 text-black font-medium px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg transition-all duration-200 border-2 border-black text-base sm:text-lg md:text-xl"
                  onClick={() => handleCall()}
                >
                  {/* Yellow background for button */}
                  <div className="absolute inset-0 translate-x-2 translate-y-2 bg-yellow-400 rounded-lg border-2 border-black -z-10" />
                  <span className="relative flex items-center gap-2">
                    {callStatus === "INACTIVE" || callStatus === "FINISHED" ? (
                      <>
                        Start Interview
                        <span
                          className={cn(
                            "absolute -top-1 -right-1 bg-yellow-400 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full opacity-75",
                            callStatus === "CONNECTING" ? "bg-yellow-400 animate-ping" : "hidden"
                          )}
                        />
                      </>
                    ) : (
                      ". . ."
                    )}
                  </span>
                </Button>
              ) : (
                <Button
                  className="relative group bg-white hover:bg-red-500 hover:text-white text-black font-medium px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg transition-all duration-200 border-black text-base  sm:text-lg md:text-xl"
                  onClick={() => handleDisconnect()}
                >
                  {/* Yellow background for button */}
                  <div className="absolute inset-0 translate-x-2 translate-y-2 bg-yellow-400 rounded-lg border-2 border-black -z-10" />
                  <span className="relative">End Interview</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent;
