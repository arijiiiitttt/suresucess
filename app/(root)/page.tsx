

import InterviewCard from '@/components/InterviewCard';
import { Button } from '@/components/ui/button';
import { get } from 'http';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRobot, FaArrowRight } from 'react-icons/fa';
import { FcGraduationCap } from "react-icons/fc";
import { FcAssistant } from "react-icons/fc";
import { getCurrentUser, getInterviewsByUserId } from '@/lib/actions/auth.action';



const page = async () => {


  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getInterviewsByUserId({ userId: user?.id! }),
  ])



  const hasPastInterviews = userInterviews?.length > 0;

  const hasUpcomingInterviews = latestInterviews?.length > 0;

  return (
    <div className="min-h-[70vh] flex flex-col justify-center">
      <section className="container mx-auto px-4 sm:px-6 py-6">
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Yellow background div - positioned behind */}
          <div className="absolute inset-0 translate-x-1 translate-y-1 bg-yellow-400 rounded-2xl border-2 border-black" />

          {/* White card - positioned above */}
          <div className="relative w-full bg-white rounded-2xl border border-black p-4 sm:p-5 md:p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="flex flex-col gap-3 w-full md:w-[60%]">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-lg border-2 border-black w-fit">
                  <FaRobot className="text-lg" />
                  <span className="font-medium text-sm">AI Interview Practice</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight text-left">
                  Get Interview-Ready with AI-Powered Practice & Feedback
                </h2>
                <p className="text-sm text-gray-700 text-left">
                  Practice real interview questions & get instant feedback to improve your skills.
                </p>

                <Button
                  asChild
                  className="group bg-yellow-400 hover:bg-red-500 hover:text-white text-black font-semibold px-6 py-3 rounded-lg transition-all duration-200 border-2 border-black w-fit text-base"
                >
                  <Link href="/interview" className="flex items-center gap-2">
                    Start an Interview
                    <FaArrowRight className="transform text-lg transition-transform duration-200 group-hover:translate-x-2" />
                  </Link>
                </Button>
              </div>

              <div className="relative w-full md:w-[40%] flex justify-center">
                <div className="relative w-[200px] sm:w-[240px] md:w-[280px]">
                  <Image
                    src="/mainimg.png"
                    alt="AI Interview Assistant"
                    width={300}
                    height={300}
                    className="z-10 w-full h-auto rounded-lg object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FcGraduationCap size={24} />
            <h2 className="text-xl font-bold">Your Interviews</h2>
          </div>
          <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-yellow-400 rounded-lg border-2 border-black" />
            {/* <Button
              asChild
              className="relative bg-white hover:bg-gray-50 text-black font-medium px-3 py-1.5 rounded-lg transition-all duration-200 border-2 border-black text-sm"
            >
              <Link href="/interview">Add Interview</Link>
            </Button> */}
          </div>
        </div>

        <div className="interviews-section">
          {
            hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))
            ) : (
              <div className="text-center text-gray-500">
                No interviews found. Start practicing now!
              </div>
            )}

        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FcAssistant size={24} />
            <h2 className="text-xl font-bold">Take an Interview</h2>
          </div>
          <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-yellow-400 rounded-lg border-2 border-black" />
            {/* <Button
              asChild
              className="relative bg-white hover:bg-gray-50 text-black font-medium px-3 py-1.5 rounded-lg transition-all duration-200 border-2 border-black text-sm"
            >
              <Link href="/interview">View All</Link>
            </Button> */}
          </div>
        </div>

        <div className="interviews-section">
          {
            hasUpcomingInterviews ? (
              latestInterviews?.map((interview) => (
                <InterviewCard  {...interview} key={interview.id}/>
              ))
            ) : (
              <div className="text-center text-gray-500">
                There are no new interviews available at the moment. Please check back later!
              </div>
            )}
        </div>
      </section>
    </div>
  );
};

export default page; 