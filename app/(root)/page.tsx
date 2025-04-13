"use client";

import InterviewCard from '@/components/InterviewCard';
import { Button } from '@/components/ui/button';
import { dummyInterviews } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRobot, FaArrowRight } from 'react-icons/fa';
import { FcGraduationCap } from "react-icons/fc";
import { FcAssistant } from "react-icons/fc";

const page = () => {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Yellow background div - positioned behind */}
          <div className="absolute inset-0 translate-x-2 top-1 translate-y-2 bg-yellow-400 rounded-2xl border-3 border-black" />

          {/* White card - positioned above */}
          <div className="relative w-full bg-white rounded-2xl border-1 border-black p-5 sm:p-7 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
              <div className="flex flex-col gap-4 w-full md:w-[60%]">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-lg border-2 border-black w-fit">
                  <FaRobot className="text-lg" />
                  <span className="font-medium text-sm">AI Interview Practice</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight text-left">
  Get Interview-Ready with AI-Powered Practice & Feedback
</h2>
<p className="text-sm sm:text-base text-gray-700 text-left mt-2">
  Practice real interview questions & get instant feedback to improve your skills.
</p>


                <Button
                  asChild
                  className="group bg-yellow-400 hover:bg-red-500 hover:text-white text-black font-semibold px-8 py-4 rounded-lg transition-all duration-200 border-2 border-black w-fit text-lg"
                >
                  <Link href="/interview" className="flex items-center gap-3">
                    Start an Interview
                    <FaArrowRight className="transform text-xl transition-transform duration-200 group-hover:translate-x-2" />
                  </Link>
                </Button>
              </div>






              <div className="relative w-full md:w-[40%] flex justify-center">
                <div className="relative w-[280px] sm:w-[320px] md:w-[380px]">
                  {/* Yellow circle background for image */}
                  <Image
                    src="/mainimg.png"
                    alt="AI Interview Assistant"
                    width={300}
                    height={300}
                    className=" z-10 w-full h-auto sm:rounded-full md:rounded-md lg:rounded-md object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 flex flex-col gap-6 mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"> {/* Group icon and heading */}
            <FcGraduationCap size={32} /> {/* Adjusted size for better alignment */}
            <h2 className="text-2xl font-bold">Your Interviews</h2>
          </div>
          <div className="relative">
            {/* Yellow background for button */}
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-yellow-400 rounded-lg border-2 border-black" />
            <Button
              asChild
              className="relative bg-white hover:bg-gray-50 text-black font-medium px-4 py-2 rounded-lg transition-all duration-200 border-2 border-black"
            >
              {/* Add button content here */}
              Add Interview
            </Button>
          </div>
        </div>

        <div className="interviews-section">
          {dummyInterviews.map((interview, index) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 flex flex-col gap-6 mt-8">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2"> {/* Grouping the icon and text */}
      <FcAssistant size={32} />

          <h2 className="text-2xl font-bold">Take an Interview</h2>
          <div className="relative">
            {/* Yellow background for button */}
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-yellow-400 rounded-lg border-2 border-black" />
            <Button
              asChild
              className="relative bg-white hover:bg-gray-50 text-black font-medium px-4 py-2 rounded-lg transition-all duration-200 border-2 border-black"
            >

            </Button>
          </div>
        </div>
        </div>

        <div className="interviews-section">
          {dummyInterviews.map((interview, index) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>
    </>
  );
};

export default page; 