
export interface Announcement {
    img: string;
    title: string;
    description: string;
    price: number;
    location: number[];
    city: string | undefined;
    region: string | undefined;
    town: string | undefined;
    village: string | undefined;
}