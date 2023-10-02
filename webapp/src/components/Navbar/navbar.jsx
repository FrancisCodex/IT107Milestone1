import Image from "next/image";
import Logo from "../../assets/logo.svg"
import Logo2 from "../../assets/suitslogo1.png"


const Navbar = () => {
    return <div>
    <nav class="flex justify-between bg-transparent text-black w-screen fixed shadow-md backdrop-blur-md top-0">
      <div class="px-5 xl:px-12 py-6 flex w-full items-center">
        <a class="text-3xl font-bold font-heading" href="#">
        <Image class="h-9" src={Logo} alt="logo"/>

        </a>
        <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li><a class="hover:text-gray-200" href="/#">Home</a></li>
          <li><a class="hover:text-gray-200" href="#">Category</a></li>
          <li><a class="hover:text-gray-200" href="#">Collections</a></li>
          <li><a class="hover:text-gray-200" href="#">Contact Us</a></li>
        </ul>
        <div class="hidden xl:flex items-center space-x-5">
          {/* Wishlist */}
          <a class="hover:text-red-800" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </a>
          {/* Cart */}
          <a class="flex items-center hover:text-red-800" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            <span class="flex absolute -mt-5 ml-4">
              <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                </span>
              </span>
          </a>
          
          {/* Profile */}
          <a class="flex items-center hover:text-red-800" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
          </a>
          
        </div>
      </div>
      <a class="xl:hidden flex mr-6 items-center" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span class="flex absolute -mt-5 ml-4">
          <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
          </span>
        </span>
      </a>
      <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
      </a>
    </nav>
  </div>;
};
export default Navbar;



        {/* <nav class="flex justify-between py-4 bg-white/80
            backdrop-blur-md shadow-md w-full
            fixed top-0 left-0 right-0 z-10">

            <div class="flex items-center mx-10">
                <a class="cursor-pointer">
                    <h3 class="text-3xl font-medium text-blue-500">
                        <Image class=" object-cover"
                            src={Logo} alt="Store Logo"/>
                    </h3>
                </a>
            </div>
            <div class="items-center hidden space-x-8 lg:flex">
                <a class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Home
                </a>

                <a class="flex text-gray-600 
                    cursor-pointer transition-colors duration-300
                    hover:text-blue-600">
                    Shop
                </a>

                <a class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Team
                </a>

                <a class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Contact Us
                </a>


                <a class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    About Us
                </a>
            </div>

            <div class="flex items-center space-x-5 mx-10">
                <a class="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Register
                </a>

                <a class="flex text-gray-600 
                    cursor-pointer transition-colors duration-300
                     hover:text-blue-600">
                    Login
                </a>
            </div>
        </nav> */}