import Link from "next/link";


export default function Nav() {

  return (

 <nav className=" p-10 hidden md:flex gap-8 justify-center sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 shadow-sm ">
              <Link
                href={"/"}
                className="text-gray-600 hover:text-sand font-medium transition-colors text-2xl"
              >
                Home
              </Link>
              <Link
                href={"/products"}
                className="text-gray-600 hover:text-sand font-medium transition-colors text-2xl"
              >
                Products
              </Link>
              <Link
                href={"/simulator"}
                className="text-gray-600 hover:text-sand font-medium transition-colors text-2xl"
              >
                Simulador
              </Link>
              <Link
                href={"/onboarding"}
                className="text-gray-600 hover:text-sand font-medium transition-colors text-2xl"
              >
                Onboarding
              </Link>
              
            </nav>
  );
 }