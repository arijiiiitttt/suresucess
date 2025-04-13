

import { isAuthenticated } from "@/lib/actions/auth.action";

import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";



const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect('/sign-in');
  return (
    <div className="root-layout">
      <nav className="w-full py-4 fixed top-0 left-0 z-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center md:justify-start justify-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-lg font-bold">S</span>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">SureSuccess</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-[72px]">{children}</div>
      <div>


      </div>
    </div>
  );
};

export default RootLayout;