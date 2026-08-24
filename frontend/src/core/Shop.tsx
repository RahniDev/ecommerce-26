import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Divider,
    Slider,
    Paper,
    Chip,
    Pagination
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import ProductCard from "./ProductCard";
import Layout from "./Layout";
import type { IProduct } from "../types";
import { API } from '../config'
import { PAINT_COLOR_OPTIONS } from "../../../shared/colourPalette";

const Shop = () => {
    const DEFAULT_FILTERS = {
        material: [] as string[],
        price: [0, 5000] as number[],
        size: [] as string[],
        colors: [] as string[]
    };
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showFilters, setShowFilters] = useState<boolean>(true);
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const PRODUCTS_PER_PAGE = 12;

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const handleCheckbox = (
        filterName: "material" | "size" | "colors",
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

    useEffect(() => {
        setPage(1);
    }, [filters]);

    useEffect(() => {
        loadProducts();
    }, [filters, page]);

    const loadProducts = async () => {
        try {
            const response = await fetch(`${API}/products/filter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    order: "desc",
                    sortBy: "createdAt",
                    filters,
                    limit: PRODUCTS_PER_PAGE,
                    skip: (page - 1) * PRODUCTS_PER_PAGE,
                }),
            });

            const data = await response.json();

            setProducts(data.data || []);
            setTotalPages(data.totalPages);
            setTotalProducts(data.total);

        } catch (err) {
            console.error(err);
        }
    };

    const isDefaultPrice =
        filters.price[0] === DEFAULT_FILTERS.price[0] &&
        filters.price[1] === DEFAULT_FILTERS.price[1];

    const clearAllFilters = () => {
        setFilters(DEFAULT_FILTERS);
    };

    const removeFilter = (
        filterName: "material" | "size" | "colors" | "price",
        value?: string
    ) => {
        if (filterName === "price") {
            setFilters(prev => ({
                ...prev,
                price: DEFAULT_FILTERS.price,
            }));
            return;
        }

        setFilters(prev => ({
            ...prev,
            [filterName]: prev[filterName].filter(item => item !== value),
        }));
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [page]);

    const selectedFilters = [
        ...filters.size.map(value => ({
            key: `size-${value}`,
            label: value,
            filterName: "size" as const,
            value,
        })),
        ...filters.material.map(value => ({
            key: `material-${value}`,
            label: value,
            filterName: "material" as const,
            value,
        })),
        ...filters.colors.map(value => ({
            key: `color-${value}`,
            label: value,
            filterName: "colors" as const,
            value,
        })),
        ...(!isDefaultPrice
            ? [
                {
                    key: "price",
                    label: `€${filters.price[0]} – €${filters.price[1]}`,
                    filterName: "price" as const,
                },
            ]
            : []),
    ];
    const SIDEBAR_WIDTH = 260;
    return (
        <Layout title="" description="Browse all paintings">
            <Box>
                {/* Top actions */}
                <Box sx={{ mb: 3, display: "flex" }}>
                    <Button
                        onClick={() => setShowFilters(prev => !prev)}
                        sx={{
                            cursor: "pointer",
                            textDecoration: "underline",
                            fontSize: 14,
                            border: "1px solid black",
                            justifyContent: "center",
                            color: "text.secondary",
                            "&:hover": {
                                color: "text.primary",
                            },
                        }}
                    >
                        {showFilters ? "Hide filters" : "Show filters"}
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 4,
                        alignItems: "flex-start",
                        minHeight: "100vh"
                    }}
                >
                    {/* Filters */}
                    {showFilters && (
                        <Paper
                            sx={{
                                width: SIDEBAR_WIDTH,
                                flexShrink: 0,
                            }}
                            elevation={0}
                        >
                            <Typography variant="h6" gutterBottom>
                                Filters
                            </Typography>
                            <Divider sx={{ my: 2 }} />
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
                                max={5000}
                            />
                            <Divider sx={{ my: 2 }} />
                            <Typography fontWeight={600} mb={1}>
                                Colour
                            </Typography>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(6, 15px)",
                                    gap: 1,
                                }}
                            >
                                {PAINT_COLOR_OPTIONS.map((color) => {
                                    const selected = filters.colors.includes(color.hex);

                                    return (
                                        <Box
                                            key={color.hex}
                                            onClick={() => handleCheckbox("colors", color.hex)}
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
                                                transform: selected ? "scale(1.08)" : "scale(1)",
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
                        </Paper>
                    )}

                    {/* Products */}
                    <Box sx={{ flex: 1, minWidth: 0, alignSelf: "flex-start" }}>
                        {selectedFilters.length > 0 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 2,
                                }}
                            >
                                <Button
                                    onClick={clearAllFilters}
                                    variant="text"
                                    sx={{
                                        minWidth: "auto",
                                        p: 0,
                                        mr: 1,
                                        textTransform: "none",
                                        textDecoration: "underline",
                                        color: "text.primary",
                                        fontWeight: 500,
                                    }}
                                >
                                    Clear all
                                </Button>

                                {selectedFilters.map(filter => {
                                    if (filter.filterName === "colors") {
                                        return (
                                            <Chip
                                                key={filter.key}
                                                label={
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <Box
                                                            sx={{
                                                                width: 14,
                                                                height: 14,
                                                                borderRadius: "50%",
                                                                backgroundColor: filter.value,
                                                                border:
                                                                    filter.value === "#FFFFFF" || filter.value === "white"
                                                                        ? "1px solid #ccc"
                                                                        : "1px solid transparent",
                                                            }}
                                                        />
                                                    </Box>
                                                }
                                                onDelete={() => removeFilter("colors", filter.value)}
                                                sx={{
                                                    height: 36,
                                                    borderRadius: "999px",
                                                    bgcolor: "#fafafa",
                                                    border: "1px solid #ddd",
                                                    "& .MuiChip-deleteIcon": {
                                                        fontSize: 18,
                                                    },
                                                }}
                                            />
                                        );
                                    }

                                    return (
                                        <Chip
                                            key={filter.key}
                                            label={filter.label}
                                            onDelete={() =>
                                                filter.filterName === "price"
                                                    ? removeFilter("price")
                                                    : removeFilter(filter.filterName, filter.value)
                                            }
                                            sx={{
                                                height: 36,
                                                borderRadius: "999px",
                                                bgcolor: "#fafafa",
                                                border: "1px solid #ddd",
                                                fontSize: 14,
                                                "& .MuiChip-deleteIcon": {
                                                    fontSize: 18,
                                                },
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        )}

                        <Typography color="text.secondary" mb={4}>
                            {totalProducts} products found
                        </Typography>

                        <Masonry
                            columns={{
                                xs: 1,
                                sm: 2,
                                md: 3,
                            }}
                            spacing={3}
                        >
                            {products.map(product => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </Masonry>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: 5,
                            }}
                        >
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                                color="primary"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default Shop;