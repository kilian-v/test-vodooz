
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import clsx from "clsx";
import {FaBars, FaBell, FaChevronDown, FaRegBell} from "react-icons/fa6";
import {IoNotifications, IoNotificationsOutline} from "react-icons/io5";


export default function DashboardHeader({
  setSidebarOpen,
}: {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) {




  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4  bg-main-orange px-4  sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <FaBars className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-black hover:text-opacity-70"
        >
          <span className="sr-only">View notifications</span>
          <IoNotificationsOutline className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div
          className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
          aria-hidden="true"
        />

        {/* Profile dropdown */}
        <Menu as="div" className="relative">
          {
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100 border border-black">
                <svg
                  className="h-full w-full text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              {/*<span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {"Kilian"}
                </span>
                <FaChevronDown
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>*/}
            </MenuButton>
          }
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 flex flex-col gap-5 items-center origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem>
                    {({ focus }) => (
                        <div className="flex flex-col">
                            <span className="text-black">John Doe</span>

                        </div>
                    )}
                </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
