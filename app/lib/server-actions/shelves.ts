"use server";

import { unstable_noStore as noStore } from "next/cache";
import axios from "axios";
import {ShelveType} from "@/app/lib/definitions";
export async function getShelves() {
    noStore();
    let defaultResult = {
        message: null,
        shelves: null,
    };
    const serverUrl = process.env.SERVER_URL;

    try {

        const response = await axios.get(`${serverUrl}/users/5a8411b53ed02c04187ff02a/shelves`,);

        const result = response.data.map((dt: ShelveType) => {
            return {title: dt.title, id: dt.id};
        })

        return {...defaultResult, shelves: result};

    } catch (error) {
        console.error("error on get shelves", error);
        return {
            ...defaultResult,
            message: "Une erreur est survenue !",
        };
    }
}

export async function getShelveById({id} : {id: string}) {
    noStore();
    let defaultResult = {
        message: null,
        shelve: null,
    };
    const serverUrl = process.env.SERVER_URL;

    try {

        const response = await axios.get(`${serverUrl}/users/5a8411b53ed02c04187ff02a/shelves`,);

        const result = response.data.map((dt: ShelveType) => {
            return {title: dt.title, id: dt.id};
        })

        const shelve = result.find((sh : {title: string, id: string}) => sh.id === id);

        return {...defaultResult, shelve: shelve};

    } catch (error) {
        console.error("error on get shelve by id", error);
        return {
            ...defaultResult,
            message: "Une erreur est survenue !",
        };
    }
}