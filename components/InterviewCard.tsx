import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';
import { IoCalendar } from "react-icons/io5";
import { FaStarHalfAlt } from "react-icons/fa";

const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("DD MMM YYYY");

  return (
    <div className="relative w-full max-w-[360px] group my-4">
      {/* Yellow Background Div - Clean offset effect */}
      <div className="absolute top-2 left-2 -z-10 w-full h-full bg-yellow-400 rounded-xl border-3 border-black" />
      
      {/* Main Card */}
      <div className="relative w-full bg-white rounded-xl border border-black">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image 
                  src={getRandomInterviewCover()} 
                  alt="cover image" 
                  width={60} 
                  height={60} 
                  className="rounded-full object-cover size-[60px] border-2 border-gray-100"
                />
                <div className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {normalizedType}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {role} Interview
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-gray-600">
                    <IoCalendar size={14} />
                    <span className="text-sm">{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <FaStarHalfAlt size={14} />
                    <span className="text-sm">{feedback?.totalScore || '---'}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="mt-4">
            <p className="text-gray-600 text-sm line-clamp-2">
              {feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills!"}
            </p>
          </div>

          {/* Footer Section */}
          <div className="mt-6 flex items-center justify-between">
            <DisplayTechIcons techStack={techstack} />
            <Button 
              className="bg-yellow-400 hover:bg-red-500 hover:text-white text-black font-medium px-4 py-2 rounded-lg transition-colors duration-200 border border-black"
              asChild
            >
              <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId}`}>
                {feedback ? "View Feedback" : "Start Interview"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;