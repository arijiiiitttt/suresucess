"use client";

import InterviewCard from '@/components/InterviewCard';
import { Button } from '@/components/ui/button';
import { dummyInterviews } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRobot, FaArrowRight } from 'react-icons/fa';

const page = () => {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 py-12">
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Yellow background div - positioned behind */}
          <div className="absolute inset-0 translate-x-2 translate-y-2 bg-yellow-400 rounded-2xl border-2 border-black" />
          
          {/* White card - positioned above */}
          <div className="relative w-full bg-white rounded-2xl border-2 border-black p-6 sm:p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <div className="flex flex-col gap-6 w-full md:w-[60%]">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg border-2 border-black w-fit">
                  <FaRobot className="text-xl" />
                  <span className="font-medium">AI Interview Practice</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Get Interview-Ready with AI-Powered Practice & Feedback
                </h2>
                
                <p className="text-base sm:text-lg text-gray-700">
                  Practice real interview questions & get instant feedback to improve your skills.
                </p>

                <Button 
                  asChild 
                  className="group bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-3 rounded-lg transition-all duration-200 border-2 border-black w-fit"
                >
                  <Link href="/interview" className="flex items-center gap-2">
                    Start an Interview
                    <FaArrowRight className="transform transition-transform duration-200 group-hover:translate-x-2" />
                  </Link>
                </Button>
              </div>

              <div className="relative w-full md:w-[40%] flex justify-center">
                <div className="relative w-[280px] sm:w-[320px] md:w-[380px]">
                  {/* Yellow circle background for image */}
                  <div className="absolute inset-0 translate-x-2 translate-y-2 bg-yellow-400 rounded-full border-2 border-black" />
                  <Image
                    src="/robot.png"
                    alt="AI Interview Assistant"
                    width={400}
                    height={400}
                    className="relative z-10 w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 flex flex-col gap-6 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Your Interviews</h2>
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

        <div className="interviews-section">
          {dummyInterviews.map((interview, index) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 flex flex-col gap-6 mt-8">
        <div className="flex items-center justify-between">
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