"use client";


import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi2";
import Image from "next/image";
import {GiRoundStar} from "react-icons/gi";
import {useAppDispatch, useAppSelector} from "@/app/lib/store/hooks";

import {BookType} from "@/app/lib/definitions";
import {getBooks} from "@/app/lib/server-actions/books";
import {changeCurrentShelve, changePage, changePerPage} from "@/app/lib/store/slices/dashboard";
import {ImSpinner10} from "react-icons/im";
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/react";
import {FaCheck, FaChevronDown} from "react-icons/fa6";


export function DashboardPageBody() {


    const dispatch = useAppDispatch();



    const view = useAppSelector(
        (state) => state.dashboard.view,
    );

    const perPage = useAppSelector(
        (state) => state.dashboard.perPage,
    );

    const page = useAppSelector(
        (state) => state.dashboard.page,
    );

    const currentShelve = useAppSelector(
        (state) => state.dashboard.currentShelve,
    );

    const search = useAppSelector(
        (state) => state.dashboard.search,
    );

    const itemEls = useRef<(HTMLDivElement | null)[]>([]);


    const [books, setBooks] = useState<BookType[]>([]);
    const [loadingBooks, setLoadingBooks] = useState(true);


    const getAllBooks = useCallback(async () => {

        setLoadingBooks(true);
            const data = await getBooks({shelveId: currentShelve?.id ? currentShelve.id === "0" ? "" : currentShelve.id : "", search, perPage, page});

            const booksData = data.books as BookType[] | null;


            setBooks(booksData ?? []);

        setLoadingBooks(false);

    }, [currentShelve, page, perPage, search]);


    const getAuthors = useCallback((authors?: {
        id?: string,
        "name"?: string,
        "slug"?: string
    }[]) => {

        let authorsString = "";

        if (authors !== undefined) {
            for (let i = 0; i < authors.length; i++) {
                if (i === authors.length + 1)
                    authorsString = authorsString.concat(`${authors[i].name},`)
                else
                    authorsString = authorsString.concat(`${authors[i].name}`)
            }
        }

        if (authorsString.length > 0) return authorsString
        else return "-";

    }, [])

    const generatePerPageOption = () => {
        const size = 10;
        const array = [];

        for (let i = 1; i < size + 1; i++) {
            array.push(`${(5 * i)}`);
        }

        return array
    }





    useEffect(() => {
        getAllBooks();
    }, [getAllBooks])



    return (
        <div
            className="my-5 p-5 md:p-14 flex flex-col gap-5 items-start font-montserrat text-black min-h-[calc(100vh-theme(space.80))]  max-h-screen overflow-scroll bg-light-main-orange rounded-2xl">
            <div className=" flex flex-col md:flex-row items-start md:items-center md:justify-between w-full gap-4 md:gap-0">
                <h3 className=" text-2xl">{currentShelve?.title ?? "-"}</h3>
                <div className="flex flex-row items-center gap-4">
                    <button disabled={page === 1} onClick={() => {
                        dispatch(changePage(page - 1))
                    }}
                            className="rounded-full border-[1px] p-1 border-black hover:border-opacity-75 flex justify-center ">
                        <HiOutlineChevronLeft className="h-6 w-6 text-black group-hover:text-opacity-75"/></button>
                    <span>{page}</span>
                    <button disabled={books.length === 0 || books.length < perPage} onClick={() => {
                        dispatch(changePage(page + 1))
                    }}
                            className="rounded-full border-[1px] p-1 border-black hover:border-opacity-75 flex justify-center ">
                        <HiOutlineChevronRight className="h-6 w-6 text-black group-hover:text-opacity-75"/></button>
                </div>
            </div>

            <div className=" flex flex-row items-center md:justify-end gap-4 w-full">
                <span className="text-sm md:text-base ">Éléments par page </span>
                <div className="w-20">
                    <Listbox value={perPage} onChange={(value) => {
                        dispatch(changePerPage(value));
                    }}>
                        <div className="relative ">
                            <ListboxButton
                                className="relative w-full cursor-default rounded-md bg-white py-1.5 px-1 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <span className="block truncate">{perPage ?? "Veuillez selectionner un élément"}</span>

                            </ListboxButton>

                            <ListboxOptions
                                transition
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                            >
                                {generatePerPageOption().map((page) => (
                                    <ListboxOption
                                        key={page}
                                        value={page}
                                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                    >
                                        <span
                                            className="block truncate font-normal group-data-[selected]:font-semibold">{page}</span>

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

            {
                loadingBooks ? <div className="flex items-center justify-center mt-auto h-[40vh]  w-full ">
                    <ImSpinner10 className="h-10 w-10 animate-spin "/>
                </div> : (books.length === 0) ?
                    <div className="flex items-center justify-center mt-auto h-[40vh]  w-full ">
                        <span className="text-center text-3xl font-medium">Pas de livres</span>
                    </div> : <>
                        {
                            view === "grid" ? (<div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-10">
                                {
                                    books.map((book, index) => <a key={`book-${index}`}
                                                                  href={`/dashboard/book/${book.book?.slug}`}
                                                                  className="flex flex-col items-start gap-4 ">
                                        <div className="w-full flex flex-row items-center justify-end gap-1 ">
                                            <GiRoundStar className="h-4 w-4 text-[#fca72c]"/>
                                            <span className="text-sm font-semibold">{book.average_rating}</span>
                                        </div>
                                        <Image
                                            src={book.image ?? ""}
                                            alt={"country-flag"}
                                            className="h-72 w-56 rounded-sm shadow-custom-shadow transition duration-300 hover:scale-110"
                                            width={100}
                                            height={100}
                                            priority={false}
                                        />

                                        <div className="flex flex-col gap-1 font-medium max-w-64">
                                            <span className=" text-lg">{book.title}</span>
                                            <span
                                                className="text-base text-black text-opacity-65">by {getAuthors(book.authors)}</span>
                                        </div>

                                    </a>)
                                }

                            </div>) : (<div className="mt-16 flex flex-col gap-5 w-full">

                                {
                                    books.map((book, index) => <a key={`book-list-${index}`}
                                                                  href={`/dashboard/book/${book.book?.slug}`}
                                                                  className="flex flex-col">
                                        <div
                                            className="flex flex-col md:flex-row items-center justify-between gap-5  rounded-xl w-full p-5"
                                            onMouseEnter={(e) => {
                                                if (itemEls.current[index])
                                                    itemEls.current[index].style.transform = "rotateY(0deg)";
                                            }} onMouseLeave={(e) => {
                                            if (itemEls.current[index])
                                                itemEls.current[index].style.transform = "rotateY(-30deg)";
                                        }}>

                                            <div
                                                className="w-fit h-fit p-5 flex items-center justify-center perspective-900">
                                                <div

                                                    ref={(element) => {
                                                        itemEls.current[index] = element
                                                    }}
                                                    className="relative -rotate-y-30 preserve-3d transition-transform-075s w-28 h-36"
                                                >
                                                    <Image src={book.image ?? ""} alt="ok" width={100} height={100}
                                                           className="absolute shadow-image-shadow w-full h-full  z-[3] rounded-r"/>
                                                    <div
                                                        className="absolute h-[90%] w-[20%]  m-auto top-0 bottom-0 right-0  bg-white z-[2]  "
                                                        style={{transform: "rotateY(90deg) translateX(160%) "}}/>
                                                    <div
                                                        className=" absolute h-full w-full  left-0  bg-black z-[3] rounded-r  "
                                                        style={{transform: "translateZ(-60px) rotateY(-10deg) translateX(-5%) "}}/>

                                                </div>
                                            </div>
                                            <div className="flex flex-col md:w-1/3 items-center md:items-end text-center md:text-right gap-2">
                                                <span className="text-lg">{book.title}</span>
                                                <span
                                                    className="text-base text-black text-opacity-65">by {getAuthors(book.authors)}</span>
                                                <div className="w-full flex flex-row justify-center md:justify-end gap-1 ">
                                                    <GiRoundStar className="h-4 w-4 text-[#fca72c]"/>
                                                    <span className="text-sm font-semibold">{book.average_rating}</span>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="w-full h-[0.5px] bg-black"/>
                                    </a>)
                                }

                            </div>)
                        }
                    </>
            }


        </div>
    )
}