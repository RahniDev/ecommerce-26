import {
    Box,
    Typography,
    Divider,
    Slider,
} from "@mui/material";

import { PRODUCT_COLOR_OPTIONS } from "../../../shared/colourPalette";
import type { FilterState } from "../types";

type FiltersProps = {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

const Filters = ({ filters, setFilters }: FiltersProps) => {

    const handleCheckbox = (
        filterName: "size" | "colors",
        value: string
    ) => {
        const current = [...filters[filterName]];

        const updated = current.includes(value)
            ? current.filter(v => v !== value)
            : [...current, value];

        setFilters(prev => ({
            ...prev,
            [filterName]: updated,
        }));
    };

    return (
        <>
            <Typography fontWeight={600}>
                Price (€)
            </Typography>

            <Slider
                value={filters.price}
                onChange={(_, value) =>
                    setFilters(prev => ({
                        ...prev,
                        price: value as number[],
                    }))
                }
                valueLabelDisplay="auto"
                min={0}
                max={200}
            />

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight={600} mb={1}>
                Colour
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 18px)",
                    gap: 1,
                }}
            >
                {PRODUCT_COLOR_OPTIONS.map(color => {
                    const selected = filters.colors.includes(color.hex);

                    return (
                        <Box
                            key={color.hex}
                            onClick={() =>
                                handleCheckbox("colors", color.hex)
                            }
                            title={color.hex}
                            sx={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                cursor: "pointer",
                                backgroundColor: color.hex,
                                border: selected
                                    ? "3px solid #111"
                                    : color.hex === "white"
                                        ? "1px solid #ccc"
                                        : "1px solid transparent",
                                boxSizing: "border-box",
                                transform: selected
                                    ? "scale(1.08)"
                                    : "scale(1)",
                                transition: "all 0.15s ease",
                            }}
                        />
                    );
                })}
            </Box>

            {filters.colors.length > 0 && (
                <Typography
                    sx={{
                        mt: 2,
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontSize: 14,
                    }}
                    onClick={() =>
                        setFilters(prev => ({
                            ...prev,
                            colors: [],
                        }))
                    }
                >
                    Remove colour filter
                </Typography>
            )}
        </>
    );
};

export default Filters;