import { Genre } from "./genre";

export class Movie {
    id!: number;
    countryId!: number;
    title!: string;
    name!: string;
    rate!: number;
    releaseDate!: number;
    runtime!: number;
    overview!: string;
    trailerUrl!: string;
    movieUrl!: string;
    posterUrl!: string;
    age_restricted!: number;
    isActive!: Boolean;
    isDelete!: Boolean;
    createdDate!: number;
    updatedDate!: number;
    createdUserId!: string;
    updatedUserId!: string;
    genres!: Genre[];
}
