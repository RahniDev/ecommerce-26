export type ProductColor = {
    name: string;
    hex: string;
};

export const PRODUCT_COLOR_OPTIONS: ProductColor[] = [
    {
        name: "White",
        hex: "#FFFFFF"
    },
    {
        name: "Black",
        hex: "#000000"
    },
    {
        name: "Coffee",
        hex: "#cd9d6d"
    },
    {

        name: "Light Pink",
        hex: "#fdb4ed"
    },
    {
        name: "Light Blue",
        hex: "#58adde"
    },
    {
        name: "Red",
        hex: "#c80d0d"
    },
    {
        name: "Blue",
        hex: "#255a94"
    },
    {
        name: "Purple",
        hex: "#955495"
    },
    {
        name: "Cream",
        hex: "#fefccf",
    },
    {
        name: "Green",
        hex: "#68a868"
    },
    {
        name: "Orange",
        hex: "#FFA500",
    }
];

export const PRODUCT_COLOR_HEXES = PRODUCT_COLOR_OPTIONS.map(c => c.hex);