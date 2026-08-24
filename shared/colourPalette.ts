export type PaintColor = {
    name: string;
    hex: string;
};

export const PAINT_COLOR_OPTIONS: PaintColor[] = [
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

export const PAINT_COLOR_HEXES = PAINT_COLOR_OPTIONS.map(c => c.hex);