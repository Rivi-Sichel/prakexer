// import React, { useState, useMemo, useCallback } from 'react';

// import { useSelector } from 'react-redux';
// import { Button, IconButton, TextField } from '@mui/material';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import Filter from './Filter';
// import One from './One';
// import ManegerPanel from './ManegerPanel';

// const List = () => {

//     const contacts = useSelector(state => state.contacts.arr);
//     const [item, setItem] = useState(null); // ה-state לאחסון הקשר הנבחר או החדש
//     const [isEditing, setIsEditing] = useState(false); // ניהול מצב העריכה
//     const [isModalOpen, setIsModalOpen] = useState(false);


//     const [searchTerm, setSearchTerm] = useState('');
//     const [contactDetails, setContactDetails] = useState(null);
//     const [isFilterOpen, setIsFilterOpen] = useState(false);

//     // חישוב רשימת אנשי הקשר המסוננים
//     const filteredContacts = useMemo(() => {
//         return contacts.filter(contact =>
//             `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     }, [contacts, searchTerm]);

//     // פתיחת פרטי קשר
//     const openContactDetails = useCallback(() => {
//         setContactDetails();
//         setIsModalOpen(true);
//         setItem(null);
//         setIsEditing(true); // להפעיל את המצב של עריכה


//     }, []);

//     // סגירת פרטי קשר
//     const closeContactDetails = useCallback(() => {
//         setContactDetails(null);
//     }, []);

//     // הצגת/הסתרת פילטר
//     const toggleFilter = useCallback(() => {
//         setIsFilterOpen(prev => !prev);
//     }, []);

//     // כפתור יצירת קשר חדש
//     const handleNewContactClick = () => {
//         // יצירת אובייקט חדש (null במקרה זה יראה שדות ריקים)
//         setItem(null); // או כל דרך אחרת לשלוח אובייקט ריק לפאנל
//         setIsEditing(true); // להפעיל את המצב של עריכה
//         setIsModalOpen(true);
//         console.log("isModalOpen set to true");
//     };




//     return (
//         <div>
//             {/* שדה חיפוש */}
//             <TextField
//                 label="Search"
//                 variant="outlined"
//                 size="small"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 fullWidth
//                 style={{ marginBottom: '10px' }}
//             />

//             {/* כפתור פילטר */}
//             <IconButton onClick={toggleFilter}>
//                 <FilterAltIcon />
//             </IconButton>
//             {/* פאנל עם פרטי הקשר */}
//             {/* {item == null && <ManegerPanel item={item} closeContactDetails={() => setItem(null)} status="true" />} */}

//             {/* כפתור יצירת קשר חדש */}
//             {/* <button
//                 variant="contained"
//                 onClick={handleNewContactClick}
//                 sx={{ mb: 2 }}
//             >
//                 New Contact
//             </button> */}
//             {/* <Button onClick={() => openContactDetails()}>
//                 יצירת איש קשר
//             </Button> */}

//             <Button onClick={handleNewContactClick}>
//                 יצירת איש קשר
//             </Button>

//             {/* {isModalOpen && (
//                 <ManegerPanel closeContactDetails={handleNewContactClick} />
//             )} */}

//             {isModalOpen &&
//              (
//                 <ManegerPanel item={item} closeContactDetails={closeContactDetails} isModalOpen={isModalOpen}
//                 setIsModalOpen={setIsModalOpen} />
//             )}
//             {/* {isModalOpen && selectedContact && (
//                 <ManegerPanel  closeContactDetails={handleNewContactClick}  status="true"/>
//             )} */}




//             {/* טבלה */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Contact Type</th>
//                         <th>Name</th>
//                         <th>Role</th>
//                         <th>Contact Details</th>
//                         <th>Main Contact</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredContacts.map((contact, index) => (
//                         <One key={contact.id || index} contact={contact} openContactDetails={openContactDetails} />
//                     ))}
//                 </tbody>
//             </table>

//             {/* פאנל עם פרטי הקשר */}
//             {/* {contactDetails && <ManegerPanel item={contactDetails} closeContactDetails={closeContactDetails} />} */}
//         </div>
//     );
// };

// export default List;


import React, { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, IconButton, TextField, Box, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import Filter from './Filter';
import One from './One';
import ManegerPanel from './ManegerPanel';

const List = () => {

    const contacts = useSelector(state => state.contacts.arr);
    const [item, setItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [contactDetails, setContactDetails] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [filterOptions, setFilterOptions] = useState({
        contactType: 'All',
        tags: 'All',
        activeContact: 'All',
        mainContact: false,
    });

    const uniqueContactTypes = useMemo(() => {
        const types = new Set(contacts.map(contact => contact.contactType));
        return Array.from(types);
    }, [contacts]);

    const uniqueTags = useMemo(() => {
        const tags = new Set(contacts.map(contact => contact.tags).flat()); // Assuming tags is an array
        return Array.from(tags);
    }, [contacts]);


    const handleFilterChange = (filterType, value) => {
        setFilterOptions({ ...filterOptions, [filterType]: value });
    };

    const handleClearFilter = () => {
        setFilterOptions({
            contactType: 'All',
            tags: 'All',
            activeContact: 'All',
            mainContact: false,
        });
    };

    const filteredContacts = useMemo(() => {
        return contacts.filter(contact => {
            const nameMatch = `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
            const typeMatch = filterOptions.contactType === 'All' || contact.contactType === filterOptions.contactType;
            const tagMatch = filterOptions.tags === 'All' || (Array.isArray(contact.tags) && contact.tags.includes(filterOptions.tags)); // Handle array of tags
            const activeMatch = filterOptions.activeContact === 'All' || contact.active === (filterOptions.activeContact === 'Active');
            const mainMatch = filterOptions.mainContact === false || contact.mainContact === filterOptions.mainContact;

            return nameMatch && typeMatch && tagMatch && activeMatch && mainMatch;
        });
    }, [contacts, searchTerm, filterOptions]);


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
        console.log("isModalOpen set to true");
    };




    return (
        <div>
            {/* Search */}
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                style={{ marginBottom: '10px' }}
            />

            {/* Filter Button */}
            <IconButton onClick={toggleFilter}>
                <FilterAltIcon />
            </IconButton>

            {/* Filter Component */}
            {/* {isFilterOpen && (
                <Filter
                    filterOptions={filterOptions}
                    handleFilterChange={handleFilterChange}
                    uniqueContactTypes={uniqueContactTypes}
                    uniqueTags={uniqueTags}
                    onClear={handleClearFilter}
                />
            )} */}


            <Button onClick={handleNewContactClick}>
                יצירת איש קשר
            </Button>

            {isModalOpen &&
             (
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
                    {filteredContacts.map((contact, index) => (
                        <One key={contact.id || index} contact={contact} openContactDetails={openContactDetails} />
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default List;