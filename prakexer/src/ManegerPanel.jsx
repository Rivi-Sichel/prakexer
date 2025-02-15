import React, { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateContact, addContact, changeStar } from '../app/contactsSlice';
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
    let isMod = isModalOpen;

    useEffect(() => {
        reset(item || { contactDetails: { phoneNumbers: [], emails: [], country: '', mailingAddress: '', billingInformation: '', preferredLanguage: '' } });
        previousItemRef.current = item;
    }, [item, reset]);

    const { fields: phoneFields, append: phoneAppend, remove: phoneRemove } = useFieldArray({
        control, name: "contactDetails.phoneNumbers"
    });
    const { fields: emailFields, append: emailAppend, remove: emailRemove } = useFieldArray({
        control, name: "contactDetails.emails"
    });


    //פונקציה ששולחת ושומרת את הנתונים
    const onSubmit = (data) => {
        if (!itemto) {
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


    //     //פונקציה שמופעלת על פרמטר שמתקבל בפרופס ומציגה לו את כל הנתונים
    //     //יש לה כפתור שמוביל לעריכה של הטופס

    const renderViewMode = () => (
        <Box sx={{ p: 2 }}>
            <Avatar sx={{ width: 80, height: 80, mb: 2, mx: 'auto' }} >
                <img src={item?.src} alt="Avatar" />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Contact Details</Typography>
            {console.log(item.isMain)
            }
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>{item?.isMain === 1 ? "Main contact" : ""}</Typography>
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
            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Preferred Language</Typography>
            <Typography variant="body1">
                <Flag code={getFlagCodeForLanguage(item?.contactDetails?.preferredLanguage)} style={{ width: 20, height: 15, marginRight: 8 }} />
                {item?.contactDetails?.preferredLanguage}
            </Typography>

            {/* Phone */}
            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Phone</Typography>
            {item?.contactDetails.phoneNumbers.map((phone, index) => (
                <Typography key={index} variant="body1">{phone.type} - {phone.number}</Typography>
            ))}

            {/* Email */}
            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Email</Typography>
            {item?.contactDetails.emails.map((email, index) => (
                <Typography key={index} variant="body1">{email.type} - {email.email}</Typography>
            ))}

            {/* Mailing Address */}
            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Mailing Address</Typography>
            <Typography variant="body1">{item?.mailingAddress}</Typography>

            {/* Billing Information */}
            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>Billing Information</Typography>
            <Typography variant="body1">{item?.billingInformation}</Typography>






            <Button variant="outlined" fullWidth onClick={() => setIsEditing(true)} sx={{ mt: 3 }}>Edit</Button>
        </Box>
    );



    //פונקציה שמופעלת על אובייקט שמועבר אליה בפרופס.
    //     //אם היא קיבלה אוביקט שהוא null - נותנת לערוך את השדות
    //     //אם היא קיבלה אובייקט היא מציגה את הנתונים שלו
    //     //חלקם ניתנים לעריכה וחלקם לא
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

            {/* Preferred Language with Flag */}
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

            {/* Phone & Email Accordion */}
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
                    <Typography>Contact Details (Phone & Email)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* Phone Numbers Section */}
                    {phoneFields.map((field, index) => (
                        <Box disabled={itemto} key={field.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
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
                            <IconButton onClick={() => phoneRemove(index)}><EditIcon /></IconButton>
                        </Box>
                    ))}
                    <Button startIcon={<AddIcon />} onClick={() => phoneAppend({ number: '', type: '' })} sx={{ mt: 1 }}>Add Phone</Button>

                    {/* Emails Section */}
                    {emailFields.map((field, index) => (
                        <Box disabled={itemto} key={field.id} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
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
                            <IconButton onClick={() => emailRemove(index)}><EditIcon /></IconButton>
                        </Box>
                    ))}
                    <Button startIcon={<AddIcon />} onClick={() => emailAppend({ email: '', type: '' })} sx={{ mt: 1 }}>Add Email</Button>
                </AccordionDetails>
            </Accordion>


            {/* Mailing Address Accordion */}
            <Accordion defaultExpanded={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
                    <Typography>Mailing Address</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        disabled={itemto}

                        label="Address"
                        {...register("mailingAddress", { required: "Mailing Address is required" })}
                        fullWidth
                        margin="normal"
                        error={!!errors.mailingAddress}
                        helperText={errors.mailingAddress ? errors.mailingAddress.message : ""}
                    />
                    <TextField
                        disabled={itemto}

                        label="Comment"
                        {...register("comment", { required: "Comment is required" })}
                        fullWidth
                        margin="normal"
                        error={!!errors.comment}
                        helperText={errors.comment ? errors.comment.message : ""}
                    />
                </AccordionDetails>
            </Accordion>

            {/* Billing Information Accordion */}
            <Accordion defaultExpanded={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel2a-header">
                    <Typography>Billing Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        disabled={itemto}
                        label="Name for Invoice"
                        {...register("billingInformation", { required: "Billing Information is required" })}
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

    )


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
                {/* אם אתה על מצב עריכה או שאין לך אובייקט - תפעיל את העריכה- אחרת תציג את מצב ההצגה */}

                {isEditing || !item ? renderEditMode() : renderViewMode()}
            </Box>
        </Drawer>
    );
};

export default ManegerPanel;










