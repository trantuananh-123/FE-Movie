import { Genre } from "./genre";

export class Movie {
    id!: number;
    country_id!: number;
    title!: string;
    name!: string;
    rate!: number;
    release_date!: number;
    runtime!: number;
    overview!: string;
    trailer_url!: string;
    movie_url!: string;
    poster_url!: string;
    age_restricted!: number;
    is_active!: Boolean;
    is_delete!: Boolean;
    created_date!: number;
    updated_date!: number;
    created_user_id!: string;
    updated_user_id!: string;
    genres!: Genre[];
}
