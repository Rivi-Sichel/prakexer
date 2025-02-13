// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';

// const Eyes = ({ item, closeContactDetails }) => {
//     const [open, setOpen] = React.useState(true);

//     const toggleDrawer = (newOpen) => (event) => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//             return;
//         }

//         setOpen(newOpen);
//         if (!newOpen) {
//             closeContactDetails(); 
//         }
//     };

//     return (
//         <Drawer
//             anchor="right"
//             open={open}
//             onClose={toggleDrawer(false)}
//         >
//             <Box
//                 sx={{ width: 300, p: 2 }}
//                 role="presentation"
//             >
//                 <div className="contact-details-popup">
//                     <h2>{item.firstName} {item.lastName}</h2>
//                     <p>Address: {item.address}</p>
//                     <p>Preferred Language: {item.contactDetails.preferredLanguage}</p>
//                     <p>
//                         Phone: {item.contactDetails.phoneNumbers.map((phone, idx) => (
//                             <span key={idx}>
//                                 {phone.number} ({phone.type})<br />
//                             </span>
//                         ))}
//                     </p>
//                     <p>
//                         Email: {item.contactDetails.emails.map((email, idx) => (
//                             <span key={idx}>
//                                 {email.email} ({email.type})<br />
//                             </span>
//                         ))}
//                     </p>
//                     <p>Name for Invoice: {item.mailingAddress}</p>
//                     <p>Accounting Ref: {item.accountingRef}</p>
//                     <p>VAT number: {item.vatNumber}</p>
//                 </div>
//             </Box>
//         </Drawer>
//     );
// };

// export default Eyes;



import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
const Eyes = ({ item, closeContactDetails, onSave }) => {
    const [formData, setFormData] = useState(item);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        onSave(formData);
        closeContactDetails();
    };

    return (
        <Drawer anchor="right" open={!!item} onClose={closeContactDetails}>
            <Box sx={{ width: 400, p: 2 }}>
                <h2>Edit Contact</h2>
                <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Phone" name="phone" value={formData.contactDetails.phoneNumbers[0].number} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Email" name="email" value={formData.contactDetails.emails[0].email} onChange={handleChange} fullWidth margin="normal" />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="outlined" onClick={closeContactDetails}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Eyes;
