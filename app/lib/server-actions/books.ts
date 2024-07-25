"use server";

import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import axios from "axios";
import {BookType} from "@/app/lib/definitions";

export async function getBooks({shelveId, perPage = 10, page = 1, search = ""}: {
    shelveId: string,
    perPage?: number,
    page?: number,
    search?: string
}) {
    noStore();
    let defaultResult = {
        message: null,
        books: null,
    };
    let books = [];
    const serverUrl = process.env.SERVER_URL;

    const limit = perPage;
    const offset = (page - 1) * perPage

    try {

        const response = await axios.get(shelveId.length > 0 ? `${serverUrl}/shelves/${shelveId}/forms?offset=${offset}&limit=${limit}` : `${serverUrl}/users/5a8411b53ed02c04187ff02a/shelves/all/forms?offset=${offset}&limit=${limit}`,);


        const result = response.data;

        for (let elem of result) {

            const formId = shelveId.length > 0 ? elem : elem.form

            const bookResponse = await axios.get(`${serverUrl}/forms/${formId}`);


            const bookData = bookResponse.data;


            const bookLookupResponse = await axios.get(`${serverUrl}/books/lookup?slug=${bookData.book.slug}`)


            books.push({...bookData, average_rating: ((bookLookupResponse.data?.average_rating ?? 0).toFixed(2))});
        }


        const lowerSearch = search.toLowerCase()
        const searchNumber = parseFloat(search);
        const newBooks = search.length > 0 ? books.filter((bookElem: BookType) => {
            return bookElem.title?.toLowerCase().includes(lowerSearch)
            || bookElem.authors?.some((bookAuthor) => bookAuthor.name?.includes(lowerSearch))
            || bookElem.description?.includes(lowerSearch)
            || bookElem.language?.includes(lowerSearch)
            || bookElem.isbn?.includes(lowerSearch)
            || bookElem.publisher?.includes(lowerSearch)

        }) : books



        return {...defaultResult, books: newBooks};

    } catch (error) {
        console.error("error on get books", error);
        return {
            ...defaultResult,
            message: "Une erreur est survenue !",
        };
    }
}

export async function getBookBySlug({slug}: { slug: string, }) {
    noStore();
    let defaultResult = {
        message: null,
        book: null,
    };

    const serverUrl = process.env.SERVER_URL;


    try {

        const bookLookupResponse = await axios.get(`${serverUrl}/books/lookup?slug=${slug}`)

        const formId = bookLookupResponse.data.forms.epub;
        const average_rating = (bookLookupResponse.data?.average_rating ?? 0).toFixed(2);

        const bookResponse = await axios.get(`${serverUrl}/forms/${formId}`);




        const result = bookResponse.data;


        return {...defaultResult, book: {...result, average_rating}};

    } catch (error) {
        console.error("error on get book by slug", error);
        return {
            ...defaultResult,
            message: "Une erreur est survenue !",
        };
    }
}
