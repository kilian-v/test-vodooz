
export type BookType = {
  "id"?: string,
  "authors"?:     {
    "id"?: string,
    "name"?: string,
    "slug"?: string
  }[],
  "book"?: {
    "id"?: string,
    "slug"?: string
  },
  "can"?: {
    "sample"?: boolean
  },
  "form"?: string,
  "language"?: string,
  "short_title"?: string,
  "title"?: string,
  "description"?: string,
  "extents"?: {
    "gl_pages"?: number
  },
  "isbn"?: string,
  "publisher"?: string,
  "subjects"?: {
    "bisac"?: string[
    ],
    "clil"?: string[]
  },
  "tags"?: string[
  ],
  "image"?: string,
  "adult"?: boolean,
  "is_free"?: boolean,
  "average_rating": number,
  prices?: {amount: number, currency: string, includes_taxes: boolean}[]
}

export type UserType = {
  id?: string,
  name?: string,
  username?: string,
  cover?: string,
  image?: string
};


export type ShelveType = {
  id?: string,
  slug?: string,
  last_modified?: number,
  title?: string,
  user?: UserType
};

