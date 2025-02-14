import { FaPhone, FaEnvelope, FaEye, FaUser } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import ManegerPanel from './ManegerPanel';
import { useState } from 'react';
import './List.css';
import { useDispatch } from 'react-redux';
import { changeStar } from '../app/contactsSlice';

const One = (props) => {
    const { contact, openContactDetails } = props;

    const [value, setValue] = useState(contact.isMain);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const dispatch = useDispatch();

    const handleOpenContactDetails = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const handleCloseContactDetails = () => {
        setIsModalOpen(false);
        setSelectedContact(null);
    };

    return (
        <>
            <tr>
                <td style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        src={contact.src}
                        alt={`${contact.firstName} ${contact.lastName}`}
                    />
                    {contact.contactType}
                </td>

                <td>{contact.firstName} {contact.lastName}</td>
                <td>{contact.role}</td>

                <td className="contact-icons" style={{ display: 'flex', gap: '10px' }}>
                    <FaUser className="contact-icon" />
                    {contact.contactDetails.phoneNumbers.length > 0 && <FaPhone className="contact-icon" />}
                    {contact.contactDetails.emails.length > 0 && <FaEnvelope className="contact-icon" />}
                </td>

                <td>
                    <Rating
                        max={1}
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            if (newValue === null) newValue = 0;
                            setValue(newValue);
                            const updatedContact = { ...contact, isMain: newValue };
                            dispatch(changeStar(updatedContact));
                        }}
                    />
                </td>
                <td>
                    <button onClick={() => handleOpenContactDetails(contact)}>
                        <FaEye />
                    </button>
                </td>
            </tr>
            {isModalOpen && selectedContact && (
                <ManegerPanel
                    item={selectedContact}
                    closeContactDetails={handleCloseContactDetails}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </>
    );
};

export default One;

