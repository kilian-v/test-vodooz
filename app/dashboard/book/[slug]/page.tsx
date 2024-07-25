"use client";

import {useParams} from "next/navigation";
import {GiRoundStar} from "react-icons/gi";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import Image from "next/image";
import {BookType} from "@/app/lib/definitions";
import {getBookBySlug} from "@/app/lib/server-actions/books";
import {ImSpinner10} from "react-icons/im";

export default function BookPage() {

    const params = useParams<{ slug: string;}>()

    const [book, setBook] = useState<BookType>();
    const [loadingBook, setLoadingBook] = useState(false);

    const getAuthors = useMemo(() => {
        {

            const authors = book?.authors ?? [];

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

        }
    }, [book?.authors])

    const getLanguageName = useMemo(() => {
        const languageNames = new Intl.DisplayNames(['fr'], { type: 'language' });



        return languageNames.of(book?.language ?? "en");
    }, [book?.language])

    const getPrice = useMemo(() => {
        let label = "GRATUIT"

        const prices = book?.prices ?? [];

        let price = prices.find((elem) => elem.currency === "USD");

        if (book?.is_free === false) label = "PAYANT";

        if (price?.amount) label = `${price.amount} $`

        return label;
    }, [book])

    const getBookBySlugOnClient = useCallback( async (

    ) => {
        setLoadingBook(true);
        const data = await getBookBySlug({slug: params.slug})

        const bookData = data.book
        setBook(data.book);

        setLoadingBook(false);

    }, [params.slug])

    useEffect(() => {
        getBookBySlugOnClient();
    }, [getBookBySlugOnClient])



    return (loadingBook || book === undefined ? <div className="flex items-center justify-center mt-auto h-[40vh]  w-full ">
            <ImSpinner10 className="h-10 w-10 animate-spin text-black"/>
        </div> : <div className="flex flex-col relative font-montserrat text-black ">
            <div className="flex flex-col self-end gap-8 max-w-lg">
                <span className="font-semibold text-4xl">{book?.title}</span>
                <span className="font-medium text-2xl">{getAuthors}</span>
                <div className="w-full flex flex-row items-center justify-start gap-1 ">
                    <GiRoundStar className="h-4 w-4 text-[#fca72c]"/>
                    <span className="text-xl font-medium">{book?.average_rating}</span>
                </div>
            </div>

            <Image
                src={book?.image ?? ""}
                alt={`book-${params.slug}`}
                className="md:absolute mt-10 md:mt-0 left-40  h-96 w-72 rounded-r-md shadow-custom-shadow transition duration-300"
                width={100}
                height={100}
                priority={false}
            />

            <div className="mt-16 w-full bg-white flex flex-col">
                <div className="w-full flex flex-row items-end justify-end ">
                    <div className="w-full md:w-1/2 flex flex-col items-center  pr-0 md:pr-20">
                        <div className="mt-14 w-full flex ">
                            <span
                                className=" w-fit flex text-center mx-auto text-pretty break-all text-2xl font-semibold">{getPrice}</span>
                        </div>
                        <div className="mt-14 h-[0.5px] bg-black w-full"/>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row px-5 md:px-28 py-10 gap-16">
                    <div className="flex flex-col max-w-lg">
                        <h3 className="text-xl font-medium">Description</h3>
                        <div className="mt-5" dangerouslySetInnerHTML={{__html: book?.description ?? ""}}/>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-5">
                            <h3 className="text-xl font-medium">Éditeur</h3>
                            <div className="">
                                <span>{book?.publisher ?? "-"}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h3 className="text-xl font-medium">Langues</h3>
                            <div className="capitalize">
                                <span>{getLanguageName ?? "-"}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h3 className="text-xl font-medium">Paperback</h3>
                            <div className="">
                                <span>{book?.extents?.gl_pages ? `${book?.extents?.gl_pages} pages` : `-`}<br/>{`ISBN ${book?.isbn}`}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}