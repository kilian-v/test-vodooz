"use client";

import clsx from 'clsx'
import React, {useCallback, useEffect, useState} from "react";
import {CiSearch} from "react-icons/ci";
import {IoGrid, IoListOutline} from "react-icons/io5";
import {FaCheck, FaChevronDown, FaFilter} from "react-icons/fa6";
import {useAppDispatch, useAppSelector} from "@/app/lib/store/hooks";
import {changeCurrentShelve, changePage, changeSearch, changeView} from "@/app/lib/store/slices/dashboard";
import {ShelveType} from "@/app/lib/definitions";
import {getShelves} from "@/app/lib/server-actions/shelves";
import {Label, Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/react";

export function DashboardPageHeader() {

    const dispatch = useAppDispatch();

    const [timer, setTimer] = useState< NodeJS.Timeout | undefined>()

    const view = useAppSelector(
        (state) => state.dashboard.view,
    );

    const currentShelve = useAppSelector(
        (state) => state.dashboard.currentShelve,
    );

    const [shelves, setShelves] = useState<ShelveType[]>([]);
    const [loadingShelves, setLoadingShelves] = useState(false);

    const getShelvesOnClient = useCallback(async () => {
        setLoadingShelves(true);
        const data = await getShelves();

        const response = data.shelves !== null ? data.shelves : [];

        const newResponse = [{id: "0", title: "Tous les livres"}].concat(response);

        setShelves(newResponse);


        setLoadingShelves(false);

    }, []);


    useEffect(() => {
        getShelvesOnClient()
    }, [getShelvesOnClient])

    return (
        <div className="w-full my-5 flex flex-col md:flex-row md:items-center md:justify-between  font-montserrat text-black gap-7 ">

            <div className=" flex flex-row items-center gap-4">
                <span>Collection </span>
                <div className="w-56">
                    <Listbox value={currentShelve} onChange={(value) => {
                        dispatch(changeCurrentShelve(value));
                    }}>
                        <div className="relative ">
                            <ListboxButton
                                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <span className="block truncate">{currentShelve?.title ?? "Tous les livres"}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FaChevronDown aria-hidden="true" className="h-5 w-5 text-gray-400"/>
          </span>
                            </ListboxButton>

                            <ListboxOptions
                                transition
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                            >
                                {shelves.map((shelve) => (
                                    <ListboxOption
                                        key={shelve.id}
                                        value={shelve}
                                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                    >
                                        <span
                                            className="block truncate font-normal group-data-[selected]:font-semibold">{shelve.title}</span>

                                        <span
                                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <FaCheck aria-hidden="true" className="h-5 w-5"/>
              </span>
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </div>
                    </Listbox>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-7 md:items-center justify-end">
                <div className="relative rounded-md w-full md:w-80 ">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center md:pl-3">
                        <CiSearch aria-hidden="true" className="h-5 w-5 text-black"/>
                    </div>
                    <input
                        id="search-book"
                        name="search-book"
                        type="text"
                        placeholder="Rechercher nom, auteur, édition ......"
                        className="bg-main-orange block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-0  placeholder:text-black placeholder:text-opacity-60 font-medium focus:ring-0  sm:text-sm sm:leading-6"
                        onChange={(e) => {
                            clearTimeout(timer);

                            let newTimer = setTimeout(() => {
                                dispatch(changeSearch(e.target.value));
                                dispatch(changePage(1));
                            }, 500);

                            setTimer(newTimer);


                        }}
                    />
                </div>

                <div className="md:self-center flex flex-row gap-3">
                    <button onClick={() => {
                        if (view === "list") dispatch(changeView("grid"));
                    }}>
                        <IoGrid
                            className={clsx(view === "grid" ? "text-black" : "text-black text-opacity-55", "h-5 w-5 text-black hover:text-opacity-75")}/>
                    </button>
                    <button onClick={() => {
                        if (view === "grid") dispatch(changeView("list"));
                    }}>
                        <IoListOutline
                            className={clsx(view === "list" ? "text-black" : "text-black text-opacity-55", "h-7 w-7 text-black hover:text-opacity-75")}/>
                    </button>

                </div>

            </div>

        </div>
    )
}