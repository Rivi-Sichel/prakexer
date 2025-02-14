import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateContact, addContact } from '../app/contactsSlice';
import { Box, Drawer, Typography, IconButton, TextField, Button, Divider, Avatar, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon, Edit as EditIcon, ExpandMore as ExpandMoreIcon, Phone as PhoneIcon, Mail as MailIcon } from '@mui/icons-material';
import Flag from 'react-world-flags';

const ManegerPanel = ({ item, isModalOpen, setIsModalOpen }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: item || { contactDetails: { phoneNumbers: [], emails: [], country: '', mailingAddress: '', billingInformation: '', preferredLanguage: '' } }
    });
    const itemto = item;

    const previousItemRef = useRef();

    useEffect(() => {
        reset(item || { contactDetails: { phoneNumbers: [], emails: [], country: '', mailingAddress: '', billingInformation: '', preferredLanguage: '' } });
        previousItemRef.current = item;
    }, [item, reset]);

    const onSubmit = (data) => {
        if (!itemto) {
            const lastId = state.arr.length ? state.arr[state.arr.length - 1].id : 0;
            data.id = lastId + 1;
            data.isMain = 1;
            data.isActive = true;
        }

        if (itemto) {
            dispatch(updateContact(data));
        } else {
            dispatch(addContact(data));
        }
        closeContactDetails();
    };

    const closeContactDetails = () => {
        setIsModalOpen(false);
        setIsEditing(false);
    };

    const onCancel = () => {
        reset(item || { contactDetails: { phoneNumbers: [], emails: [], country: '', mailingAddress: '', billingInformation: '', preferredLanguage: '' } });
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue("src", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getFlagCodeForLanguage = (language) => {
        switch (language) {
            case 'Hebrew':
                return 'IL';
            case 'English':
                return 'US';
            case 'German':
                return 'DE';
            case 'French':
                return 'FR';
            default:
                return 'US';
        }
    };

    const renderEditMode = () => (
        <form onSubmit={handleSubmit(onSubmit)}>
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

            <TextField
                disabled={itemto}
                label="First Name"
                {...register("firstName", { required: "First Name is required" })}
                fullWidth margin="normal"
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
            />
            <TextField
                disabled={itemto}
                label="Last Name"
                {...register("lastName", { required: "Last Name is required" })}
                fullWidth margin="normal"
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
            />
            <TextField
                label="Role"
                {...register("role", { required: "Role is required" })}
                fullWidth margin="normal"
                error={!!errors.role}
                helperText={errors.role ? errors.role.message : ""}
            />

            <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Preferred Language</Typography>
                <Select
                    disabled={itemto}
                    {...register("contactDetails.preferredLanguage", { required: "Preferred Language is required" })}
                    fullWidth
                    defaultValue={item?.contactDetails?.preferredLanguage || ''}
                    error={!!errors.contactDetails?.preferredLanguage}
                >
                    <MenuItem value="Hebrew">
                        <Flag code="IL" style={{ width: 20, height: 15, marginRight: 8 }} />
                        Hebrew
                    </MenuItem>
                    <MenuItem value="English">
                        <Flag code="US" style={{ width: 20, height: 15, marginRight: 8 }} />
                        English
                    </MenuItem>
                    <MenuItem value="German">
                        <Flag code="DE" style={{ width: 20, height: 15, marginRight: 8 }} />
                        German
                    </MenuItem>
                    <MenuItem value="French">
                        <Flag code="FR" style={{ width: 20, height: 15, marginRight: 8 }} />
                        French
                    </MenuItem>
                </Select>
            </Box>

            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
                    <Typography>Contact Details (Phone & Email)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {item?.contactDetails?.phoneNumbers?.map((field, index) => (
                        <Box disabled={itemto} key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                            <PhoneIcon />
                            <TextField
                                label="Phone"
                                disabled={itemto}
                                {...register(`contactDetails.phoneNumbers.${index}.number`, { required: "Phone number is required" })}
                                fullWidth
                                error={!!errors.contactDetails?.phoneNumbers?.[index]?.number}
                                helperText={errors.contactDetails?.phoneNumbers?.[index]?.number?.message}
                            />
                            <Select {...register(`contactDetails.phoneNumbers.${index}.type`)} fullWidth>
                                <MenuItem value="Work">Work</MenuItem>
                                <MenuItem value="Home">Home</MenuItem>
                                <MenuItem value="Mobile">Mobile</MenuItem>
                            </Select>
                        </Box>
                    ))}
                    <Button startIcon={<AddIcon />} sx={{ mt: 1 }}>Add Phone</Button>

                    {/* Emails Section */}
                    {item?.contactDetails?.emails?.map((field, index) => (
                        <Box disabled={itemto} key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                            <MailIcon />
                            <TextField
                                label="Email"
                                disabled={itemto}
                                {...register(`contactDetails.emails.${index}.email`, {
                                    required: "Email is required",
                                    pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: "Invalid email" }
                                })}
                                fullWidth
                                error={!!errors.contactDetails?.emails?.[index]?.email}
                                helperText={errors.contactDetails?.emails?.[index]?.email?.message}
                            />
                            <Select {...register(`contactDetails.emails.${index}.type`)} fullWidth>
                                <MenuItem value="Work">Work</MenuItem>
                                <MenuItem value="Personal">Personal</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </Box>
                    ))}
                    <Button startIcon={<AddIcon />} sx={{ mt: 1 }}>Add Email</Button>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
                    <Typography>Mailing Address</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        label="Address"
                        disabled={itemto}
                        {...register("mailingAddress", { required: "Mailing Address is required" })}
                        fullWidth
                        margin="normal"
                        error={!!errors.mailingAddress}
                        helperText={errors.mailingAddress ? errors.mailingAddress.message : ""}
                    />
                    <TextField
                        disabled={itemto}
                        label="Comment"
                        fullWidth
                        margin="normal"
                        error={!!errors.comment}
                        helperText={errors.comment ? errors.comment.message : ""}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
                    <Typography>Billing Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        disabled={itemto}
                        label="Name for Invoice"
                        fullWidth
                        margin="normal"
                        error={!!errors.billingInformation}
                        helperText={errors.billingInformation ? errors.billingInformation.message : ""}
                    />
                </AccordionDetails>
            </Accordion>

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
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>{item?.isMain === 1 ? "Main contact" : ""}</Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>{item?.address}</Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Name</Typography>
            <Typography variant="body1">{item?.firstName} {item?.lastName}</Typography>

            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Role</Typography>
            <Typography variant="body1">{item?.role}</Typography>

            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Contact Type</Typography>
            <Typography variant="body1">{item?.contactType}</Typography>

            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Preferred Language</Typography>
            <Typography variant="body1">
                <Flag code={getFlagCodeForLanguage(item?.contactDetails?.preferredLanguage)} style={{ width: 20, height: 15, marginRight: 8 }} />
                {item?.contactDetails?.preferredLanguage}
            </Typography>

            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Phone</Typography>
            {item?.contactDetails.phoneNumbers.map((phone, index) => (
                <Typography key={index} variant="body1">{phone.type} - {phone.number}</Typography>
            ))}

            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Email</Typography>
            {item?.contactDetails.emails.map((email, index) => (
                <Typography key={index} variant="body1">{email.type} - {email.email}</Typography>
            ))}

            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Mailing Address</Typography>
            <Typography variant="body1">{item?.mailingAddress}</Typography>

            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Billing Information</Typography>
            <Typography variant="body1">{item?.billingInformation}</Typography>

            <Button variant="outlined" fullWidth onClick={() => setIsEditing(true)} sx={{ mt: 3 }}>Edit</Button>
        </Box>
    );

    return (
        <Drawer
            anchor="right"
            open={isModalOpen}
            onClose={closeContactDetails}
        >
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
