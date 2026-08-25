import { useState } from "react";
import { Box } from "@mui/material";

import type { Category } from "../types";

interface Props {
  categories: Category[];
  navigate: ReturnType<any>;
  mobile?: boolean;
}

const CategoryDropdown = ({
  categories,
  navigate,
  mobile = false,
}: Props) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <Box>
      {categories.map((category) => {
        const hasChildren =
          category.subcategories &&
          category.subcategories.length > 0;

        const isExpanded = expanded.includes(category._id);

        return (
          <Box key={category._id}>
            <Box
              sx={{
                position: "relative",
                px: 2,
                py: 1,
                cursor: "pointer",
                whiteSpace: "nowrap",

                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },

                // Desktop only: show submenu on hover
                ...(!mobile && {
                  "&:hover .children": {
                    display: "block",
                  },
                }),
              }}
            >
              <Box
                onClick={(e) => {
                  // Categories with subcategories are only used to open/close their submenu.
                  if (hasChildren) {
                    if (mobile) {
                      e.stopPropagation();
                      toggleExpanded(category._id);
                    }

                    return;
                  }

                  // Categories without subcategories navigate to their category page.
                  navigate(`/shop/${category.slug}`);
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {category.name}

                {hasChildren && (
                  <Box
                    component="span"
                    sx={{
                      ml: 3,
                      fontSize: "1.1rem",
                      lineHeight: 1,
                    }}
                  >
                    {mobile ? (isExpanded ? "−" : "+") : "›"}
                  </Box>
                )}
              </Box>

              {/* Desktop submenu */}
              {!mobile && hasChildren && (
                <Box
                  className="children"
                  sx={{
                    display: "none",
                    position: "absolute",
                    left: "calc(100% - 1px)",
                    top: 0,
                    bgcolor: "white",
                    minWidth: 220,
                    boxShadow: 3,
                    zIndex: 1500,

                    // Keeps submenu open while moving mouse
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      left: "-10px",
                      top: 0,
                      width: "10px",
                      height: "100%",
                    },
                  }}
                >
                  <CategoryDropdown
                    categories={category.subcategories!}
                    navigate={navigate}
                  />
                </Box>
              )}
            </Box>

            {/* Mobile submenu */}
            {mobile && hasChildren && isExpanded && (
              <Box
                sx={{
                  pl: 2,
                  ml: 2,
                  borderLeft: "1px solid #e5e5e5",
                }}
              >
                <CategoryDropdown
                  categories={category.subcategories!}
                  navigate={navigate}
                  mobile
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default CategoryDropdown;