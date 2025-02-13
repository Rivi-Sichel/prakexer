
// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useForm, useFieldArray } from 'react-hook-form';
// // // import { useDispatch } from 'react-redux';
// // // import { updateContact, addContact } from '../app/contactsSlice';
// // // import { Box, Drawer, Typography, IconButton, TextField, Button, Divider, Avatar } from '@mui/material';
// // // import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
// // // import { Select, MenuItem } from '@mui/material';
// // // import { Edit as EditIcon } from '@mui/icons-material';
// // // import Flag from 'react-world-flags';

// // // const ManegerPanel = ({ item, isModalOpen, setIsModalOpen }) => {
// // //     const dispatch = useDispatch();
// // //     const [isEditing, setIsEditing] = useState(false);
// // //     const { register, handleSubmit, control, reset } = useForm({
// // //         defaultValues: item || { contactDetails: { phoneNumbers: [], emails: [], country: '' } }
// // //     });
// // //     const itemto = item;

// // //     const previousItemRef = useRef();
// // //     let isMod = isModalOpen;

// // //     useEffect(() => {
// // //         reset(item || { contactDetails: { phoneNumbers: [], emails: [] } });
// // //         previousItemRef.current = item;
// // //     }, [item, reset]);

// // //     const { fields: phoneFields, append: phoneAppend, remove: phoneRemove } = useFieldArray({
// // //         control, name: "contactDetails.phoneNumbers"
// // //     });
// // //     const { fields: emailFields, append: emailAppend, remove: emailRemove } = useFieldArray({
// // //         control, name: "contactDetails.emails"
// // //     });

// // //     const onSubmit = (data) => {
// // //         if (itemto) {
// // //             dispatch(updateContact(data));  // עדכון קשר קיים
// // //         } else {
// // //             dispatch(addContact(data));  // הוספת קשר חדש
// // //         }
// // //         closeContactDetails();  // סגירת הפאנל
// // //     };

// // //     const closeContactDetails = () => {
// // //         setIsModalOpen(false);  // סוגר את ה־Drawer
// // //         setIsEditing(false);  // מבטל את מצב העריכה
// // //     };

// // //     const onCancel = () => {
// // //         reset(item || { contactDetails: { phoneNumbers: [], emails: [], country: '' } });
// // //         setIsEditing(false);
// // //     };

// // //     const renderEditMode = () => (
// // //         <form onSubmit={handleSubmit(onSubmit)}>
// // //             <TextField disabled={itemto} label="First Name" {...register("firstName")} fullWidth margin="normal" />
// // //             <TextField disabled={itemto} label="Last Name" {...register("lastName")} fullWidth margin="normal" />
// // //             <TextField disabled={itemto} label="Role" {...register("role")} fullWidth margin="normal" />

// // //             {/* Phone Numbers Section */}
// // //             {phoneFields.map((field, index) => (
// // //                 <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }} >
// // //                     <TextField label="Phone" {...register(`contactDetails.phoneNumbers.${index}.number`)} fullWidth />
// // //                     <Select {...register(`contactDetails.phoneNumbers.${index}.type`)} fullWidth>
// // //                         <MenuItem value="Work">Work</MenuItem>
// // //                         <MenuItem value="Home">Home</MenuItem>
// // //                         <MenuItem value="Mobile">Mobile</MenuItem>
// // //                     </Select>
// // //                     <IconButton onClick={() => phoneRemove(index)}><EditIcon /></IconButton>
// // //                 </Box>
// // //             ))}
// // //             <Button startIcon={<AddIcon />} onClick={() => phoneAppend({ number: '', type: '' })} sx={{ mt: 1 }}>Add Phone</Button>

// // //             {/* Emails Section */}
// // //             {emailFields.map((field, index) => (
// // //                 <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }} >
// // //                     <TextField label="Email" {...register(`contactDetails.emails.${index}.email`)} fullWidth />
// // //                     <Select {...register(`contactDetails.emails.${index}.type`)} fullWidth>
// // //                         <MenuItem value="Work">Work</MenuItem>
// // //                         <MenuItem value="Personal">Personal</MenuItem>
// // //                         <MenuItem value="Other">Other</MenuItem>
// // //                     </Select>
// // //                     <IconButton onClick={() => emailRemove(index)}><EditIcon /></IconButton>
// // //                 </Box>
// // //             ))}
// // //             <Button startIcon={<AddIcon />} onClick={() => emailAppend({ email: '', type: '' })} sx={{ mt: 1 }}>Add Email</Button>

// // //             {/* Country Select with Flag */}
// // //             <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
// // //                 <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Country</Typography>
// // //                 <Select
// // //                     {...register(`contactDetails.country`)}
// // //                     defaultValue={item?.contactDetails?.country || ''} // Default value in case of null or undefined
// // //                     fullWidth
// // //                 >
// // //                     <MenuItem value="IL">
// // //                         <Flag code="IL" style={{ width: 20, height: 15, marginRight: 8 }} />
// // //                         Israel
// // //                     </MenuItem>
// // //                     <MenuItem value="US">
// // //                         <Flag code="US" style={{ width: 20, height: 15, marginRight: 8 }} />
// // //                         United States
// // //                     </MenuItem>
// // //                     <MenuItem value="DE">
// // //                         <Flag code="DE" style={{ width: 20, height: 15, marginRight: 8 }} />
// // //                         Germany
// // //                     </MenuItem>
// // //                 </Select>
// // //             </Box>

// // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
// // //                 <Button variant="outlined" onClick={onCancel}>Cancel</Button>
// // //                 <Button variant="contained" color="primary" type="submit">Save</Button>
// // //             </Box>
// // //         </form>
// // //     );

// // //     const renderViewMode = () => (
// // //         <Box sx={{ p: 2 }}>
// // //             <Avatar sx={{ width: 80, height: 80, mb: 2, mx: 'auto' }} >
// // //                 <img src={item?.src} alt="Avatar" />
// // //             </Avatar>
// // //             <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Contact Details</Typography>
// // //             <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>Main contact</Typography>
// // //             <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>{item?.address}</Typography>
// // //             <Divider sx={{ my: 2 }} />
// // //             <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Name</Typography>
// // //             <Typography variant="body1">{item?.firstName} {item?.lastName}</Typography>
// // //             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Role</Typography>
// // //             <Typography variant="body1">{item?.role}</Typography>
// // //             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Contact Type</Typography>
// // //             <Typography variant="body1">{item?.contactType}</Typography>
// // //             <Typography variant="body1">{item?.contactDetails?.preferredLanguage}</Typography>
// // //             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Phone</Typography>
// // //             {item?.contactDetails.phoneNumbers.map((phone, index) => (
// // //                 <Typography key={index} variant="body1">{phone.type} - {phone.number}</Typography>
// // //             ))}
// // //             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Email</Typography>
// // //             {item?.contactDetails.emails.map((email, index) => (
// // //                 <Typography key={index} variant="body1">{email.type} - {email.email}</Typography>
// // //             ))}

// // //             {/* Display the selected country with flag */}
// // //             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Country</Typography>
// // //             <Typography variant="body1">
// // //                 {item?.contactDetails?.country && (
// // //                     <>
// // //                         <Flag code={item.contactDetails.country} style={{ width: 20, height: 15, marginRight: 8 }} />
// // //                         {item?.contactDetails?.country === 'IL' && 'Israel'}
// // //                         {item?.contactDetails?.country === 'US' && 'United States'}
// // //                         {item?.contactDetails?.country === 'DE' && 'Germany'}
// // //                     </>
// // //                 )}
// // //             </Typography>

// // //             <Button variant="outlined" fullWidth onClick={() => setIsEditing(true)} sx={{ mt: 3 }}>Edit</Button>
// // //         </Box>
// // //     );

// // //     return (
// // //         <Drawer anchor="right" open={isMod} onClose={closeContactDetails}>
// // //             <Box sx={{ width: 400, p: 2, overflowY: 'auto' }}>
// // //                 <IconButton onClick={closeContactDetails} sx={{ position: 'absolute', top: 8, right: 8 }}>
// // //                     <CloseIcon />
// // //                 </IconButton>
// // //                 {isEditing || !item ? renderEditMode() : renderViewMode()}
// // //             </Box>
// // //         </Drawer>
// // //     );
// // // };

// // // export default ManegerPanel;


// // import React, { useState, useEffect, useRef } from 'react';
// // import { useForm, useFieldArray } from 'react-hook-form';
// // import { useDispatch } from 'react-redux';
// // import { updateContact, addContact } from '../app/contactsSlice';
// // import { Box, Drawer, Typography, IconButton, TextField, Button, Divider, Avatar } from '@mui/material';
// // import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
// // import { Select, MenuItem } from '@mui/material';
// // import { Edit as EditIcon } from '@mui/icons-material';
// // import Flag from 'react-world-flags';

// // const ManegerPanel = ({ item, isModalOpen, setIsModalOpen }) => {
// //     const dispatch = useDispatch();
// //     const [isEditing, setIsEditing] = useState(false);
// //     const { register, handleSubmit, control, reset, setValue } = useForm({
// //         defaultValues: item || { contactDetails: { phoneNumbers: [], emails: [], country: '' } }
// //     });
// //     const itemto = item;



// //     const previousItemRef = useRef();
// //     let isMod = isModalOpen;

// //     useEffect(() => {
// //         reset(item || { contactDetails: { phoneNumbers: [], emails: [] } });
// //         previousItemRef.current = item;
// //     }, [item, reset]);

// //     const { fields: phoneFields, append: phoneAppend, remove: phoneRemove } = useFieldArray({
// //         control, name: "contactDetails.phoneNumbers"
// //     });
// //     const { fields: emailFields, append: emailAppend, remove: emailRemove } = useFieldArray({
// //         control, name: "contactDetails.emails"
// //     });

// //     const onSubmit = (data) => {
// //         if (itemto) {
// //             dispatch(updateContact(data));  // עדכון קשר קיים
// //         } else {
// //             dispatch(addContact(data));  // הוספת קשר חדש
// //         }
// //         closeContactDetails();  // סגירת הפאנל
// //     };

// //     const closeContactDetails = () => {
// //         setIsModalOpen(false);  // סוגר את ה־Drawer
// //         setIsEditing(false);  // מבטל את מצב העריכה
// //     };

// //     const onCancel = () => {
// //         reset(item || { contactDetails: { phoneNumbers: [], emails: [], country: '' } });
// //         setIsEditing(false);
// //     };

// //     const handleImageChange = (e) => {
// //         const file = e.target.files[0];
// //         if (file) {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 setValue("src", reader.result);  // Set image source in form state
// //             };
// //             reader.readAsDataURL(file);
// //         }
// //     };

// //     const renderEditMode = () => (
// //         <form onSubmit={handleSubmit(onSubmit)}>
// //             {/* Avatar Section */}
// //             <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, position: 'relative' }}>
// //                 <Avatar sx={{ width: 80, height: 80 }} src={item?.src} />
// //                 <IconButton component="label" sx={{
// //                     position: 'absolute', bottom: 0, right: 0, zIndex: 1,
// //                     backgroundColor: 'white', borderRadius: '50%', padding: 0,
// //                 }}>
// //                     <EditIcon />
// //                     <input
// //                         type="file"
// //                         hidden
// //                         accept="image/*"
// //                         onChange={handleImageChange}
// //                     />
// //                 </IconButton>
// //             </Box>
// //             <TextField disabled={itemto} label="id" {...register("id")} fullWidth margin="normal" />
// //             <TextField disabled={itemto} label="First Name" {...register("firstName")} fullWidth margin="normal" />
// //             <TextField disabled={itemto} label="Last Name" {...register("lastName")} fullWidth margin="normal" />
// //             <TextField disabled={itemto} label="Role" {...register("role")} fullWidth margin="normal" />

// //             {/* Phone Numbers Section */}
// //             {phoneFields.map((field, index) => (
// //                 <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }} >
// //                     <TextField label="Phone" {...register(`contactDetails.phoneNumbers.${index}.number`)} fullWidth />
// //                     <Select {...register(`contactDetails.phoneNumbers.${index}.type`)} fullWidth>
// //                         <MenuItem value="Work">Work</MenuItem>
// //                         <MenuItem value="Home">Home</MenuItem>
// //                         <MenuItem value="Mobile">Mobile</MenuItem>
// //                     </Select>
// //                     <IconButton onClick={() => phoneRemove(index)}><EditIcon /></IconButton>
// //                 </Box>
// //             ))}
// //             <Button startIcon={<AddIcon />} onClick={() => phoneAppend({ number: '', type: '' })} sx={{ mt: 1 }}>Add Phone</Button>

// //             {/* Emails Section */}
// //             {emailFields.map((field, index) => (
// //                 <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }} >
// //                     <TextField label="Email" {...register(`contactDetails.emails.${index}.email`)} fullWidth />
// //                     <Select {...register(`contactDetails.emails.${index}.type`)} fullWidth>
// //                         <MenuItem value="Work">Work</MenuItem>
// //                         <MenuItem value="Personal">Personal</MenuItem>
// //                         <MenuItem value="Other">Other</MenuItem>
// //                     </Select>
// //                     <IconButton onClick={() => emailRemove(index)}><EditIcon /></IconButton>
// //                 </Box>
// //             ))}
// //             <Button startIcon={<AddIcon />} onClick={() => emailAppend({ email: '', type: '' })} sx={{ mt: 1 }}>Add Email</Button>

// //             {/* Country Select with Flag */}
// //             <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
// //                 <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Country</Typography>
// //                 <Select
// //                     {...register(`contactDetails.country`)}
// //                     defaultValue={item?.contactDetails?.country || ''} // Default value in case of null or undefined
// //                     fullWidth
// //                 >
// //                     <MenuItem value="IL">
// //                         <Flag code="IL" style={{ width: 20, height: 15, marginRight: 8 }} />
// //                         Israel
// //                     </MenuItem>
// //                     <MenuItem value="US">
// //                         <Flag code="US" style={{ width: 20, height: 15, marginRight: 8 }} />
// //                         United States
// //                     </MenuItem>
// //                     <MenuItem value="DE">
// //                         <Flag code="DE" style={{ width: 20, height: 15, marginRight: 8 }} />
// //                         Germany
// //                     </MenuItem>
// //                 </Select>
// //             </Box>

// //             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
// //                 <Button variant="outlined" onClick={onCancel}>Cancel</Button>
// //                 <Button variant="contained" color="primary" type="submit">Save</Button>
// //             </Box>
// //         </form>
// //     );

// //     const renderViewMode = () => (
// //         <Box sx={{ p: 2 }}>
// //             <Avatar sx={{ width: 80, height: 80, mb: 2, mx: 'auto' }} >
// //                 <img src={item?.src} alt="Avatar" />
// //             </Avatar>
// //             <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Contact Details</Typography>
// //             {item?.isMain==1?<Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>Main contact</Typography>:''}
// //             <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>{item?.address}</Typography>
// //             <Divider sx={{ my: 2 }} />
// //             <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Name</Typography>
// //             <Typography variant="body1">{item?.firstName} {item?.lastName}</Typography>
// //             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Role</Typography>
// //             <Typography variant="body1">{item?.role}</Typography>
// //             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Contact Type</Typography>
// //             <Typography variant="body1">{item?.contactType}</Typography>
// //             <Typography variant="body1">{item?.contactDetails?.preferredLanguage}</Typography>
// //             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Phone</Typography>
// //             {item?.contactDetails.phoneNumbers.map((phone, index) => (
// //                 <Typography key={index} variant="body1">{phone.type} - {phone.number}</Typography>
// //             ))}
// //             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Email</Typography>
// //             {item?.contactDetails.emails.map((email, index) => (
// //                 <Typography key={index} variant="body1">{email.type} - {email.email}</Typography>
// //             ))}

// //             {/* Display the selected country with flag */}
// //             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Country</Typography>
// //             <Typography variant="body1">
// //                 {item?.contactDetails?.country && (
// //                     <>
// //                         <Flag code={item.contactDetails.country} style={{ width: 20, height: 15, marginRight: 8 }} />
// //                         {item?.contactDetails?.country === 'IL' && 'Israel'}
// //                         {item?.contactDetails?.country === 'US' && 'United States'}
// //                         {item?.contactDetails?.country === 'DE' && 'Germany'}
// //                     </>
// //                 )}
// //             </Typography>

// //             <Button variant="outlined" fullWidth onClick={() => setIsEditing(true)} sx={{ mt: 3 }}>Edit</Button>
// //         </Box>
// //     );

// //     return (
// //         // <Drawer anchor="right" open={isModalOpen} onClose={closeContactDetails}>

// //         <Drawer anchor="right" open={isModalOpen} onClose={closeContactDetails}>
// //             <Box sx={{ width: 400, p: 2, overflowY: 'auto' }}>
// //                 <IconButton onClick={closeContactDetails} sx={{ position: 'absolute', top: 8, right: 8 }}>
// //                     <CloseIcon />
// //                 </IconButton>
// //                 {isEditing || !item ? renderEditMode() : renderViewMode()}
// //             </Box>
// //         </Drawer>
// //     );
// // };

// // export default ManegerPanel;


// import React, { useState, useEffect, useRef } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { updateContact, addContact } from '../app/contactsSlice';
// import { Box, Drawer, Typography, IconButton, TextField, Button, Divider, Avatar, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
// import { Add as AddIcon, Close as CloseIcon, Edit as EditIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
// import Flag from 'react-world-flags';

// const ManegerPanel = ({ item, isModalOpen, setIsModalOpen }) => {
//     const dispatch = useDispatch();
//     const [isEditing, setIsEditing] = useState(false);
//     const { register, handleSubmit, control, reset, setValue } = useForm({
//         defaultValues: item || { contactDetails: { phoneNumbers: [], emails: [], country: '', mailingAddress: '', billingInformation: '' } }
//     });
//     const itemto = item;

//     const previousItemRef = useRef();
//     let isMod = isModalOpen;

//     useEffect(() => {
//         reset(item || { contactDetails: { phoneNumbers: [], emails: [], country: '', mailingAddress: '', billingInformation: '' } });
//         previousItemRef.current = item;
//     }, [item, reset]);

//     const { fields: phoneFields, append: phoneAppend, remove: phoneRemove } = useFieldArray({
//         control, name: "contactDetails.phoneNumbers"
//     });
//     const { fields: emailFields, append: emailAppend, remove: emailRemove } = useFieldArray({
//         control, name: "contactDetails.emails"
//     });

//     const onSubmit = (data) => {
//         if (itemto) {
//             dispatch(updateContact(data));  // עדכון קשר קיים
//         } else {
//             dispatch(addContact(data));  // הוספת קשר חדש
//         }
//         closeContactDetails();  // סגירת הפאנל
//     };

//     const closeContactDetails = () => {
//         setIsModalOpen(false); // סוגר את ה־Drawer
//         setIsEditing(false); // מבטל את מצב העריכה
//     };

//     const onCancel = () => {
//         reset(item || { contactDetails: { phoneNumbers: [], emails: [], country: '', mailingAddress: '', billingInformation: '' } });
//         setIsEditing(false);
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setValue("src", reader.result);  // Set image source in form state
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const renderEditMode = () => (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             {/* Avatar Section */}
//             <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, position: 'relative' }}>
//                 <Avatar sx={{ width: 80, height: 80 }} src={item?.src || '/path/to/default/avatar.png'} />
//                 <IconButton component="label" sx={{
//                     position: 'absolute', bottom: 0, right: 0, zIndex: 1,
//                     backgroundColor: 'white', borderRadius: '50%', padding: 0,
//                 }}>
//                     <EditIcon />
//                     <input
//                         type="file"
//                         hidden
//                         accept="image/*"
//                         onChange={handleImageChange}
//                     />
//                 </IconButton>
//             </Box>

//             <TextField disabled={itemto} label="First Name" {...register("firstName")} fullWidth margin="normal" />
//             <TextField disabled={itemto} label="Last Name" {...register("lastName")} fullWidth margin="normal" />
//             <TextField disabled={itemto} label="Role" {...register("role")} fullWidth margin="normal" />

//             {/* Accordion for Phone Numbers and Emails (Open by default) */}
//             <Accordion defaultExpanded={true}>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
//                     <Typography>Contact Details (Phone & Email)</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     {/* Phone Numbers Section */}
//                     {phoneFields.map((field, index) => (
//                         <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
//                             <TextField label="Phone" {...register(`contactDetails.phoneNumbers.${index}.number`)} fullWidth />
//                             <Select {...register(`contactDetails.phoneNumbers.${index}.type`)} fullWidth>
//                                 <MenuItem value="Work">Work</MenuItem>
//                                 <MenuItem value="Home">Home</MenuItem>
//                                 <MenuItem value="Mobile">Mobile</MenuItem>
//                             </Select>
//                             <IconButton onClick={() => phoneRemove(index)}><EditIcon /></IconButton>
//                         </Box>
//                     ))}
//                     <Button startIcon={<AddIcon />} onClick={() => phoneAppend({ number: '', type: '' })} sx={{ mt: 1 }}>Add Phone</Button>

//                     {/* Emails Section */}
//                     {emailFields.map((field, index) => (
//                         <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
//                             <TextField label="Email" {...register(`contactDetails.emails.${index}.email`)} fullWidth />
//                             <Select {...register(`contactDetails.emails.${index}.type`)} fullWidth>
//                                 <MenuItem value="Work">Work</MenuItem>
//                                 <MenuItem value="Personal">Personal</MenuItem>
//                                 <MenuItem value="Other">Other</MenuItem>
//                             </Select>
//                             <IconButton onClick={() => emailRemove(index)}><EditIcon /></IconButton>
//                         </Box>
//                     ))}
//                     <Button startIcon={<AddIcon />} onClick={() => emailAppend({ email: '', type: '' })} sx={{ mt: 1 }}>Add Email</Button>
//                 </AccordionDetails>
//             </Accordion>

//             {/* Accordion for Mailing Address (Closed by default) */}
//             <Accordion defaultExpanded={false}>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
//                     <Typography>Mailing Address</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <TextField
//                         label="Mailing Address"
//                         {...register("contactDetails.mailingAddress")}
//                         fullWidth
//                         margin="normal"
//                     />
//                     <TextField
//                         label="Comment"
//                         {...register("contactDetails.comment")}
//                         fullWidth
//                         margin="normal"
//                     />
//                 </AccordionDetails>
//             </Accordion>

//             {/* Accordion for Billing Information (Closed by default) */}
//             <Accordion defaultExpanded={false}>
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel3a-header">
//                     <Typography>Billing Information</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <TextField
//                         label="Name for invoice"
//                         {...register("contactDetails.billingInformation")}
//                         fullWidth
//                         margin="normal"
//                     />
//                 </AccordionDetails>
//             </Accordion>

//             {/* Country Select with Flag */}
//             <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Country</Typography>
//                 <Select
//                     {...register(`contactDetails.country`)}
//                     defaultValue={item?.contactDetails?.country || ''} // Default value in case of null or undefined
//                     fullWidth
//                 >
//                     <MenuItem value="IL">
//                         <Flag code="IL" style={{ width: 20, height: 15, marginRight: 8 }} />
//                         Israel
//                     </MenuItem>
//                     <MenuItem value="US">
//                         <Flag code="US" style={{ width: 20, height: 15, marginRight: 8 }} />
//                         United States
//                     </MenuItem>
//                     <MenuItem value="DE">
//                         <Flag code="DE" style={{ width: 20, height: 15, marginRight: 8 }} />
//                         Germany
//                     </MenuItem>
//                 </Select>
//             </Box>

//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                 <Button variant="outlined" onClick={onCancel}>Cancel</Button>
//                 <Button variant="contained" color="primary" type="submit">Save</Button>
//             </Box>
//         </form>
//     );

//     const renderViewMode = () => (
//         <Box sx={{ p: 2 }}>
//             <Avatar sx={{ width: 80, height: 80, mb: 2, mx: 'auto' }} >
//                 <img src={item?.src} alt="Avatar" />
//             </Avatar>
//             <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Contact Details</Typography>
//             <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>Main contact</Typography>
//             <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>{item?.address}</Typography>
//             <Divider sx={{ my: 2 }} />
//             <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Name</Typography>
//             <Typography variant="body1">{item?.firstName} {item?.lastName}</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Role</Typography>
//             <Typography variant="body1">{item?.role}</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Contact Type</Typography>
//             <Typography variant="body1">{item?.contactType}</Typography>
//             <Typography variant="body1">{item?.contactDetails?.preferredLanguage}</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Phone</Typography>
//             {item?.contactDetails.phoneNumbers.map((phone, index) => (
//                 <Typography key={index} variant="body1">{phone.type} - {phone.number}</Typography>
//             ))}
//             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Email</Typography>
//             {item?.contactDetails.emails.map((email, index) => (
//                 <Typography key={index} variant="body1">{email.type} - {email.email}</Typography>
//             ))}

//             {/* Display the selected country with flag */}
//             <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Country</Typography>
//             <Typography variant="body1">
//                 {item?.contactDetails?.country && (
//                     <>
//                         <Flag code={item.contactDetails.country} style={{ width: 20, height: 15, marginRight: 8 }} />
//                         {item?.contactDetails?.country === 'IL' && 'Israel'}
//                         {item?.contactDetails?.country === 'US' && 'United States'}
//                         {item?.contactDetails?.country === 'DE' && 'Germany'}
//                     </>
//                 )}
//             </Typography>

//             <Button variant="outlined" fullWidth onClick={() => setIsEditing(true)} sx={{ mt: 3 }}>Edit</Button>
//         </Box>
//     );

//     return (
//         <Drawer anchor="right" open={isMod} onClose={closeContactDetails}>
//             <Box sx={{ width: 400, p: 2, overflowY: 'auto' }}>
//                 <IconButton onClick={closeContactDetails} sx={{ position: 'absolute', top: 8, right: 8 }}>
//                     <CloseIcon />
//                 </IconButton>
//                 {isEditing || !item ? renderEditMode() : renderViewMode()}
//             </Box>
//         </Drawer>
//     );
// };

// export default ManegerPanel;

import React, { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateContact, addContact } from '../app/contactsSlice';
import { Box, Drawer, Typography, IconButton, TextField, Button, Divider, Avatar, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon, Edit as EditIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import Flag from 'react-world-flags';

const ManegerPanel = ({ item, isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, control, reset, setValue } = useForm({
        defaultValues: item || { contactDetails: { phoneNumbers: [], emails: [], country: '', mailingAddress: '', billingInformation: '' } }
    });
    const itemto = item;

    const previousItemRef = useRef();
    let isMod = isModalOpen;

    useEffect(() => {
        reset(item || { contactDetails: { phoneNumbers: [], emails: [], country: '', mailingAddress: '', billingInformation: '' } });
        previousItemRef.current = item;
    }, [item, reset]);

    const { fields: phoneFields, append: phoneAppend, remove: phoneRemove } = useFieldArray({
        control, name: "contactDetails.phoneNumbers"
    });
    const { fields: emailFields, append: emailAppend, remove: emailRemove } = useFieldArray({
        control, name: "contactDetails.emails"
    });

    const onSubmit = (data) => {
        if (itemto) {
            dispatch(updateContact(data));  // עדכון קשר קיים
        } else {
            dispatch(addContact(data));  // הוספת קשר חדש
        }
        closeContactDetails();  // סגירת הפאנל
    };

    const closeContactDetails = () => {
        setIsModalOpen(false); // סוגר את ה־Drawer
        setIsEditing(false); // מבטל את מצב העריכה
    };

    const onCancel = () => {
        reset(item || { contactDetails: { phoneNumbers: [], emails: [], country: '', mailingAddress: '', billingInformation: '' } });
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue("src", reader.result);  // Set image source in form state
            };
            reader.readAsDataURL(file);
        }
    };

    const renderEditMode = () => (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Avatar Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, position: 'relative' }}>
                <Avatar sx={{ width: 80, height: 80 }} src={item?.src || '/path/to/default/avatar.png'} />
                <IconButton component="label" sx={{
                    position: 'absolute', bottom: 0, right: 0, zIndex: 1,
                    backgroundColor: 'white', borderRadius: '50%', padding: 0,
                }}>
                    <EditIcon />
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </IconButton>
            </Box>

            <TextField disabled={itemto} label="First Name" {...register("firstName")} fullWidth margin="normal" />
            <TextField disabled={itemto} label="Last Name" {...register("lastName")} fullWidth margin="normal" />
            <TextField disabled={itemto} label="Role" {...register("role")} fullWidth margin="normal" />

            {/* Accordion for Phone Numbers and Emails (Open by default) */}
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
                    <Typography>Contact Details (Phone & Email)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* Phone Numbers Section */}
                    {phoneFields.map((field, index) => (
                        <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                            <TextField label="Phone" {...register(`contactDetails.phoneNumbers.${index}.number`)} fullWidth />
                            <Select {...register(`contactDetails.phoneNumbers.${index}.type`)} fullWidth>
                                <MenuItem value="Work">Work</MenuItem>
                                <MenuItem value="Home">Home</MenuItem>
                                <MenuItem value="Mobile">Mobile</MenuItem>
                            </Select>
                            <IconButton onClick={() => phoneRemove(index)}><EditIcon /></IconButton>
                        </Box>
                    ))}
                    <Button startIcon={<AddIcon />} onClick={() => phoneAppend({ number: '', type: '' })} sx={{ mt: 1 }}>Add Phone</Button>

                    {/* Emails Section */}
                    {emailFields.map((field, index) => (
                        <Box key={field.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                            <TextField label="Email" {...register(`contactDetails.emails.${index}.email`)} fullWidth />
                            <Select {...register(`contactDetails.emails.${index}.type`)} fullWidth>
                                <MenuItem value="Work">Work</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            <IconButton onClick={() => emailRemove(index)}><EditIcon /></IconButton>
                        </Box>
                    ))}
                    <Button startIcon={<AddIcon />} onClick={() => emailAppend({ email: '', type: '' })} sx={{ mt: 1 }}>Add Email</Button>
                </AccordionDetails>
            </Accordion>

            {/* Accordion for Mailing Address (Closed by default) */}
            <Accordion defaultExpanded={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
                    <Typography>Mailing Address</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        disabled={itemto}
                        label="Mailing Address"
                        {...register("contactDetails.mailingAddress")}
                        fullWidth
                        margin="normal"
                        defaultValue={item?.mailingAddress || "Halapid 9"}  // אם אין שדה בג'ייסון, יופיע ברירת מחדל
                    />
                    <TextField
                        disabled={itemto}
                        label="Comment"
                        {...register("contactDetails.comment")}
                        fullWidth
                        margin="normal"
                        defaultValue={item?.comment }  // אם אין שדה בג'ייסון, יופיע ברירת מחדל
                    />
                </AccordionDetails>
            </Accordion>

            {/* Accordion for Billing Information (Closed by default) */}
            <Accordion  defaultExpanded={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel3a-header">
                    <Typography>Billing Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        disabled={itemto}
                        label="Name for invoice"
                        {...register("contactDetails.billingInformation")}
                        fullWidth
                        margin="normal"
                        defaultValue={item?.billingInformation }  // אם אין שדה בג'ייסון, יופיע ברירת מחדל
                    />
                    <TextField
                        disabled={itemto}
                        label="Accounting Ref"
                        {...register("contactDetails.accountingRef")}
                        fullWidth
                        margin="normal"
                        defaultValue={item?.accountingRef}  // אם אין שדה בג'ייסון, יופיע ברירת מחדל
                    />
                    <TextField
                        label="VAT number"
                        {...register("contactDetails.vatNumber")}
                        fullWidth
                        margin="normal"
                        defaultValue={item?.vatNumber }  // אם אין שדה בג'ייסון, יופיע ברירת מחדל
                    />
                </AccordionDetails>
            </Accordion>

            {/* Country Select with Flag */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Country</Typography>
                <Select
                    {...register(`contactDetails.country`)}
                    defaultValue={item?.contactDetails?.country || 'IL'} // ברירת מחדל אם לא נמצא שדה
                    fullWidth
                >
                    <MenuItem value="IL">
                        <Flag code="IL" style={{ width: 20, height: 15, marginRight: 8 }} />
                        Israel
                    </MenuItem>
                    <MenuItem value="US">
                        <Flag code="US" style={{ width: 20, height: 15, marginRight: 8 }} />
                        United States
                    </MenuItem>
                    <MenuItem value="DE">
                        <Flag code="DE" style={{ width: 20, height: 15, marginRight: 8 }} />
                        Germany
                    </MenuItem>
                </Select>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
                <Button variant="contained" color="primary" type="submit">Save</Button>
            </Box>
        </form>
    );

    const renderViewMode = () => (
    <Box sx={{ p: 2 }}>
        <Avatar sx={{ width: 80, height: 80, mb: 2, mx: 'auto' }} >
            <img src={item?.src} alt="Avatar" />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Contact Details</Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>
            {item?.isMain === 1 ? "Main contact" : ""}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>{item?.address}</Typography>
        <Divider sx={{ my: 2 }} />

        {/* Name */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Name</Typography>
        <Typography variant="body1">{item?.firstName} {item?.lastName}</Typography>

        {/* Role */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Role</Typography>
        <Typography variant="body1">{item?.role}</Typography>

        {/* Contact Type */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Contact Type</Typography>
        <Typography variant="body1">{item?.contactType}</Typography>

        {/* Preferred Language */}
        <Typography variant="body1">{item?.contactDetails?.preferredLanguage}</Typography>

        {/* Phone Numbers */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Phone</Typography>
        {item?.contactDetails.phoneNumbers.map((phone, index) => (
            <Typography key={index} variant="body1">{phone.type} - {phone.number}</Typography>
        ))}

        {/* Emails */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Email</Typography>
        {item?.contactDetails.emails.map((email, index) => (
            <Typography key={index} variant="body1">{email.type} - {email.email}</Typography>
        ))}

        {/* Mailing Address */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Mailing Address</Typography>
        <Typography variant="body1">{item?.contactDetails?.mailingAddress || "N/A"}</Typography>

        {/* Billing Information */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Billing Information</Typography>
        <Typography variant="body1">{item?.contactDetails?.billingInformation || "N/A"}</Typography>

        {/* Accounting Ref */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Accounting Ref</Typography>
        <Typography variant="body1">{item?.contactDetails?.accountingRef || "N/A"}</Typography>

        {/* VAT Number */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>VAT Number</Typography>
        <Typography variant="body1">{item?.contactDetails?.vatNumber || "N/A"}</Typography>

        {/* Country */}
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Country</Typography>
        <Typography variant="body1">
            {item?.contactDetails?.country && (
                <>
                    <Flag code={item.contactDetails.country} style={{ width: 20, height: 15, marginRight: 8 }} />
                    {item?.contactDetails?.country === 'IL' && 'Israel'}
                    {item?.contactDetails?.country === 'US' && 'United States'}
                    {item?.contactDetails?.country === 'DE' && 'Germany'}
                </>
            )}
        </Typography>

        <Button variant="outlined" fullWidth onClick={() => setIsEditing(true)} sx={{ mt: 3 }}>Edit</Button>
    </Box>
);

    return (
        <Drawer anchor="right" open={isMod} onClose={closeContactDetails}>
            <Box sx={{ width: 400, p: 2, overflowY: 'auto' }}>
                <IconButton onClick={closeContactDetails} sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <CloseIcon />
                </IconButton>
                {isEditing || !item ? renderEditMode() : renderViewMode()}
            </Box>
        </Drawer>
    );
};

export default ManegerPanel;

