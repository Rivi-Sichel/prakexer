import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, IconButton, TextField, Box, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import One from './One';
import ManegerPanel from './ManegerPanel';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterMenu from './FilterMenu';

const List = () => {
    const contacts = useSelector(state => state.contacts.arr);
    const [item, setItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [contactDetails, setContactDetails] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [filterOptions, setFilterOptions] = useState({
        contactType: 'All',
        tags: 'All',
        activeContact: 'All',
        mainContact: false,
        preferredLanguage: 'All',
        country: 'All',
    });

    const applyFilters = (filters) => {
        setFilterOptions(filters); 
        const filtered = contacts.filter(contact => {
            const contactTypeMatch = filters.contactType === 'All' || contact.contactType === filters.contactType;
            const tagMatch = filters.tags === 'All' || contact.tags.includes(filters.tags);
            const mainContactMatch = filters.mainContact === false || contact.isMain === 1; 

            return contactTypeMatch && tagMatch && mainContactMatch;
        });

        setFilteredContacts(filtered); 
    };


    const searchFilteredContacts = filteredContacts.filter(contact =>
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openContactDetails = useCallback(() => {
        setContactDetails();
        setIsModalOpen(true);
        setItem(null);
        setIsEditing(true);
    }, []);

    const closeContactDetails = useCallback(() => {
        setContactDetails(null);
    }, []);

    const toggleFilter = useCallback(() => {
        setIsFilterOpen(prev => !prev);
    }, []);


    const handleNewContactClick = () => {
        setItem(null);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    useEffect(() => {
        applyFilters(filterOptions);
    }, [contacts, filterOptions]); 

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Typography variant="body2" sx={{ marginLeft: '10px' }}>
                    {searchFilteredContacts.length} Contacts
                </Typography>
            </Box>

            <IconButton onClick={toggleFilter}>
                <FilterAltIcon />
            </IconButton>

            {isFilterOpen && <FilterMenu onFilter={applyFilters} />}

            <Button onClick={handleNewContactClick}>
                יצירת איש קשר
            </Button>

            {isModalOpen && (
                <ManegerPanel item={item} closeContactDetails={closeContactDetails} isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen} />
            )}

            <table>
                <thead>
                    <tr>
                        <th>Contact Type</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Contact Details</th>
                        <th>Main Contact</th>
                        <th>...</th>
                    </tr>
                </thead>
                <tbody>
                    {searchFilteredContacts.map((contact, index) => (
                        <One key={contact.id || index} contact={contact} openContactDetails={openContactDetails} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
