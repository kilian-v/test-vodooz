"use client";

import {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {Dialog, DialogPanel, Menu, Transition, TransitionChild} from "@headlessui/react";


import clsx from "clsx";



import { usePathname } from "next/navigation";
import { Logo } from "@/app/components/Logo";

import Image from "next/image";
import DashboardHeader from "@/app/dashboard/components/DashboardHeader";
import {FaXmark} from "react-icons/fa6";
import {AiFillHome} from "react-icons/ai";
import {GrTransaction} from "react-icons/gr";
import {FiUser, FiUsers} from "react-icons/fi";
import {HiCog6Tooth, HiOutlineBanknotes, HiOutlineCog6Tooth} from "react-icons/hi2";
import {GiStack} from "react-icons/gi";
import {FaCog} from "react-icons/fa";
import {BsFillBookmarkHeartFill} from "react-icons/bs";
import {RiHomeSmile2Fill, RiHomeSmile2Line, RiStackLine} from "react-icons/ri";
import {MdOutlineBookmarks, MdOutlineLibraryBooks} from "react-icons/md";
import {IoLibraryOutline} from "react-icons/io5";
import {TbLibrary} from "react-icons/tb";
import {getShelves} from "@/app/lib/server-actions/shelves";

const navi = [
  {
    name: "Home",
    href: "/dashboard",
    icon: RiHomeSmile2Line,
    current: true,
    subLinks: ["/dashboard/book"],
    subElems: [
/*      {name: "En cours de lecture", tag: "already-read", color: "bg-red-600"},
      {name: "Déjà lu", tag: "already-read", color: "bg-purple-600"},
      {name: "Envie de lire", tag: "already-read", color: "bg-orange-600"},
      {name: "Acheté", tag: "already-read", color: "bg-blue-600"},*/
    ],
  },
  {
    name: "Magasin",
    href: "/dashboard/store",
    icon: IoLibraryOutline,
    current: false,
    subLinks: [],
    subElems: [],
  },
  {
    name: "Passages favoris",
    href: "/dashboard/highlights",
    icon: TbLibrary,
    current: false,
    subLinks: [],
    subElems: [],
  },
  {
    name: "Liste de souhaits",
    href: "/dashboard/saved",
    icon: MdOutlineBookmarks,
    current: false,
    subLinks: [],
    subElems: [],
  },
  {
    name: "Paramètres",
    href: "/dashboard/settings",
    icon: HiOutlineCog6Tooth,
    current: false,
    subLinks: [],
    subElems: [],
  },
];



function SidebarSkeleton() {
  return (
    <div role="status" className="w-full animate-pulse">
      <div className="h-8 bg-gray-200 rounded-md mb-2.5"></div>
      <div className="h-8 bg-gray-200 rounded-md mb-2.5"></div>
      <div className="h-8 bg-gray-200 rounded-md mb-2.5"></div>
      <div className="h-8 bg-gray-200 rounded-md mb-2.5"></div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

function SubElemsSkeleton() {
  return (
      <div role="status" className="mt-5 w-full animate-pulse">
        <div className="h-5 bg-light-main-orange bg-opacity-50 rounded-md mb-2.5"></div>
        <div className="h-5 bg-light-main-orange bg-opacity-50 rounded-md mb-2.5"></div>
        <div className="h-5 bg-light-main-orange bg-opacity-50 rounded-md mb-2.5"></div>
        <div className="h-5 bg-light-main-orange bg-opacity-50 rounded-md mb-2.5"></div>

        <span className="sr-only">Loading...</span>
      </div>
  );
}


export default function Sidebar({children}: { children: React.ReactNode }) {

  const pathName = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [navigation, setNavigation] = useState<{name: string, href: string, icon: any, current: boolean, subLinks: string[], subElems: {name: string, tag: string, color: string}[]}[]>([
    {
      name: "Home",
      href: "/dashboard",
      icon: RiHomeSmile2Line,
      current: true,
      subLinks: ["/dashboard/book"],
      subElems: [],
    },
    {
      name: "Magasin",
      href: "/dashboard/store",
      icon: IoLibraryOutline,
      current: false,
      subLinks: [],
      subElems: [],
    },
    {
      name: "Passages favoris",
      href: "/dashboard/highlights",
      icon: TbLibrary,
      current: false,
      subLinks: [],
      subElems: [],
    },
    {
      name: "Liste de souhaits",
      href: "/dashboard/saved",
      icon: MdOutlineBookmarks,
      current: false,
      subLinks: [],
      subElems: [],
    },
    {
      name: "Paramètres",
      href: "/dashboard/settings",
      icon: HiOutlineCog6Tooth,
      current: false,
      subLinks: [],
      subElems: [],
    },
  ]);



  return (
    <div className="font-poppins">
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <FaXmark
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-main-orange px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <div className="flex flex-row text-black text-2xl font-medium font-montserrat items-center gap-4">
                      <BsFillBookmarkHeartFill className="h-7 w-7"/>
                      BOOKLY
                    </div>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                      <div className="-mx-2 space-y-3">
                          {navigation.map((item) => (
                            <div key={item.name}>
                              <a
                                href={item.href}
                                className={clsx(
                                  item.href.endsWith(pathName) || item.subLinks.some((subLink) => pathName.startsWith(subLink))
                                    ? "bg-light-main-orange"
                                    : "hover:bg-light-main-orange",
                                  "group text-black gap-x-3 rounded-md px-2 py-3.5 text-sm leading-6 font-semibold flex",
                                )}
                              >
                                <item.icon
                                  className={clsx(
                                    "text-black",
                                    "h-6 w-6 shrink-0",
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </div>
                          ))}
                        </div>
                      </li>

                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-main-orange px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center my-4">
            <div className="flex flex-row text-black text-2xl font-medium font-inter items-center gap-4">
              <BsFillBookmarkHeartFill className="h-7 w-7"/>
              BOOKLY
            </div>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex  flex-col gap-y-7">

              <li>
                <div className="-mx-2 space-y-3">
                  {navigation.map((item) => (
                      <div key={item.name}>
                        <a
                            href={item.href}
                            className={clsx(
                                item.href.endsWith(pathName) || item.subLinks.some((subLink) => pathName.startsWith(subLink))
                                    ? "bg-light-main-orange"
                                    : "hover:bg-light-main-orange",
                                "group text-black gap-x-3 rounded-md px-2 py-3.5 text-sm leading-6 font-medium flex flex-row",
                            )}
                        >
                          <item.icon
                              className={clsx(
                                  "text-black",
                                  "h-6 w-6 shrink-0",
                              )}
                              aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </div>
                  ))}
                </div>
              </li>


            </ul>

          </nav>


        </div>
      </div>

      <div className="lg:pl-72 bg-main-orange">
        <DashboardHeader setSidebarOpen={setSidebarOpen}/>

        <div className="p-4 sm:p-2  xl:p-6 ">{children}</div>
      </div>
    </div>
  );
}
