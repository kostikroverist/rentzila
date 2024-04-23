export const defaultPosition = {
    lat: 49.47311448871094,
    lng: 30.544871580076776,
    zoom: 6,
};


export const checkLength = (str: string) => {
    if (str.length >= 48) {
        return str.slice(0, 38) + "...";
    } else {
        return str;
    }
};
