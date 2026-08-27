import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    Chip,
    Pagination,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";

import ProductCard from "./ProductCard";
import Layout from "./Layout";
import Filters from "./Filters";
import type { FilterState, IProduct } from "../types";
import { API } from "../config";

const DEFAULT_FILTERS: FilterState = {
    material: [],
    price: [0, 5000],
    size: [],
    colors: [],
};

const SIDEBAR_WIDTH = 260;
const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showFilters, setShowFilters] = useState(true);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [filters, setFilters] =
        useState<FilterState>(DEFAULT_FILTERS);
    const [mobileFilters, setMobileFilters] =
        useState<FilterState>(DEFAULT_FILTERS);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    const openMobileFilters = () => {
        setMobileFilters(filters);
        setMobileFiltersOpen(true);
    };

    const saveMobileFilters = () => {
        setFilters(mobileFilters);
        setMobileFiltersOpen(false);
    };

    // Close mobile filters without saving
    const closeMobileFilters = () => {
        setMobileFiltersOpen(false);
    };

    const clearAllFilters = () => {
        setFilters(DEFAULT_FILTERS);
    };

    // Remove an individual filter
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
            [filterName]: prev[filterName].filter(
                item => item !== value
            ),
        }));
    };

    // Whenever the applied filters change, return to page 1.
    useEffect(() => {
        setPage(1);
    }, [filters]);

    // Load products whenever the applied filters or page changes.
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

    // Check whether the price filter is still at its default range.
    const isDefaultPrice =
        filters.price[0] === DEFAULT_FILTERS.price[0] &&
        filters.price[1] === DEFAULT_FILTERS.price[1];


    // Create filter chips
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

    // Scroll to top whenever page changes.
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [page]);

    return (
        <Layout
            title=""
            description="Browse all handmade products"
        >
            <Box>
                <Box
                    sx={{
                        mb: 3,
                        display: "flex",
                    }}
                >
                    {/* DESKTOP BUTTON */}
                    <Button
                        onClick={() =>
                            setShowFilters(prev => !prev)
                        }
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },

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
                        {showFilters
                            ? "Hide filters"
                            : "Show filters"}
                    </Button>


                    {/* MOBILE BUTTON */}
                    <Button
                        onClick={openMobileFilters}
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none",
                            },

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
                        Show filters
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        gap: 4,
                        alignItems: "flex-start",
                        minHeight: "100vh",
                    }}
                >
                    {/* DESKTOP FILTER SIDEBAR */}
                    {showFilters && (
                        <Paper
                            elevation={0}
                            sx={{
                                width: SIDEBAR_WIDTH,
                                flexShrink: 0,

                                display: {
                                    xs: "none",
                                    md: "block",
                                },
                            }}
                        >
                            <Typography
                                variant="h6"
                                gutterBottom
                            >
                                Filters
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                                <Filters
                                    filters={filters}
                                    setFilters={setFilters}
                                />
                            </Box>
                        </Paper>
                    )}
                    {/* MOBILE FILTERS */}
                    {mobileFiltersOpen && (
                        <Box
                            sx={{
                                display: {
                                    xs: "flex",
                                    md: "none",
                                },
                                position: "fixed",
                                inset: 0,
                                zIndex: 1300,
                                backgroundColor:
                                    "background.paper",
                                flexDirection: "column",
                                overflowY: "auto",
                                p: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                    mb: 3,
                                }}
                            >

                                <Typography variant="h5">
                                    Filters
                                </Typography>

                                <Button
                                    onClick={
                                        closeMobileFilters
                                    }
                                    sx={{
                                        color: "text.primary",
                                        minWidth: "auto",
                                    }}
                                >
                                    Close
                                </Button>
                            </Box>
                            <Filters
                                filters={mobileFilters}
                                setFilters={setMobileFilters}
                            />
                            <Box
                                sx={{
                                    mt: "auto",
                                    pt: 4,
                                    pb: 2,
                                }}
                            >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={
                                        saveMobileFilters
                                    }
                                >
                                    Save filters
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {/* PRODUCTS */}
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            alignSelf: "flex-start",
                        }}
                    >

                        {/* SELECTED FILTER CHIPS */}

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
                                        textDecoration:
                                            "underline",
                                        color: "text.primary",
                                        fontWeight: 500,
                                    }}
                                >
                                    Clear all
                                </Button>


                                {selectedFilters.map(filter => {

                                    if (
                                        filter.filterName ===
                                        "colors"
                                    ) {
                                        return (
                                            <Chip
                                                key={filter.key}
                                                label={
                                                    <Box
                                                        sx={{
                                                            display:
                                                                "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 14,
                                                                height: 14,
                                                                borderRadius:
                                                                    "50%",
                                                                backgroundColor:
                                                                    filter.value,
                                                                border:
                                                                    filter.value ===
                                                                        "#FFFFFF" ||
                                                                        filter.value ===
                                                                        "white"
                                                                        ? "1px solid #ccc"
                                                                        : "1px solid transparent",
                                                            }}
                                                        />
                                                    </Box>
                                                }
                                                onDelete={() =>
                                                    removeFilter(
                                                        "colors",
                                                        filter.value
                                                    )
                                                }
                                                sx={{
                                                    height: 36,
                                                    borderRadius:
                                                        "999px",
                                                    bgcolor:
                                                        "#fafafa",
                                                    border:
                                                        "1px solid #ddd",

                                                    "& .MuiChip-deleteIcon":
                                                    {
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
                                                filter.filterName ===
                                                    "price"
                                                    ? removeFilter(
                                                        "price"
                                                    )
                                                    : removeFilter(
                                                        filter.filterName,
                                                        filter.value
                                                    )
                                            }
                                            sx={{
                                                height: 36,
                                                borderRadius:
                                                    "999px",
                                                bgcolor:
                                                    "#fafafa",
                                                border:
                                                    "1px solid #ddd",
                                                fontSize: 14,

                                                "& .MuiChip-deleteIcon":
                                                {
                                                    fontSize: 18,
                                                },
                                            }}
                                        />
                                    );
                                })}

                            </Box>
                        )}

                        {/* PRODUCT COUNT */}
                        <Typography
                            color="text.secondary"
                            mb={4}
                        >
                            {totalProducts} products found
                        </Typography>

                        {/* PRODUCT GRID */}
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

                        {/* PAGINATION */}
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
                                onChange={(_, value) =>
                                    setPage(value)
                                }
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