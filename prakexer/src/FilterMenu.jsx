import React, { useState } from "react";
import { Popover, IconButton, Box, Typography, MenuItem, Select, Switch, Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

const FilterMenu = ({ onFilter }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [filters, setFilters] = useState({
        contactType: "All",
        tags: "All",
        isActive: "All",
        mainContact: 0,
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSave = () => {
        onFilter(filters);
        handleClose();
    };

    const handleClearAll = () => {
        setFilters({
            contactType: "All",
            tags: "All",
            isActive: "All",
            mainContact: 0,
        });
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <FilterAltIcon />
            </IconButton>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Box sx={{ p: 2, width: 250 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Filter</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box display="flex" justifyContent="flex-start" mt={1}>
                        <Button
                            onClick={handleClearAll}
                            variant="contained"
                            sx={{
                                borderRadius: "20px",
                                backgroundColor: "#bdbdbd",
                                color: "black",
                                textTransform: "none",
                                padding: "4px 8px",
                                fontSize: "0.8rem",
                                "&:hover": { backgroundColor: "#afafaf" },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <CloseIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                            Clear all
                        </Button>
                    </Box>
                    {/* מפעילה חיפוש על סוג האיש קשר */}
                    <Typography variant="body2" mt={2}>Contact Type</Typography>
                    <Select fullWidth value={filters.contactType} onChange={(e) => setFilters({ ...filters, contactType: e.target.value })}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Freelancer">Freelancer</MenuItem>
                        <MenuItem value="Employee">Employee</MenuItem>
                        <MenuItem value="Resident">Resident</MenuItem>
                    </Select>

                    {/* מפעילה חיפוש על סוג התגים */}

                    <Typography variant="body2" mt={2}>Tags</Typography>
                    <Select fullWidth value={filters.tags} onChange={(e) => setFilters({ ...filters, tags: e.target.value })}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                        <MenuItem value="Renovation">Renovation</MenuItem>
                        <MenuItem value="Fire Safety">Fire Safety</MenuItem>
                    </Select>

                    {/* מפעילה חיפוש על סטטוס הפעילות של האיש */}


                    <Typography variant="body2" mt={2}>Active Contact</Typography>
                    <Select
                        fullWidth
                        value={filters.isActive === undefined ? "All" : filters.isActive}
                        onChange={(e) => {
                            const value = e.target.value === "All" ? undefined : e.target.value;
                            setFilters({
                                ...filters,
                                isActive: value
                            });
                        }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </Select>

                    {/* מבצעת סינון בן אנשים ראשיים , לשאינם */}

                    <Typography variant="body2" mt={2}>Main Contact</Typography>
                    <Switch
                        checked={filters.mainContact}
                        onChange={(e) => setFilters({ ...filters, mainContact: e.target.checked })}
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    </Box>
                </Box>
            </Popover>
        </div>
    );
};

export default FilterMenu;