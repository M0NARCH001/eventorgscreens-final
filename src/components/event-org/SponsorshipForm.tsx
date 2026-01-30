"use client";
import React, { useState, useEffect } from "react";
import { ChevronDownIcon, PlusIcon, XIcon, TrashIcon } from "lucide-react";
import { EventFormData } from "./validateEventform";

interface SponsorshipFormProps {
    formData: EventFormData;
    setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    openSections: { [key: string]: boolean };
    toggleSection: (section: string) => void;
    formErrors: { [key: string]: string };
}

interface SponsorItem {
    name: string;
    website: string;
}

interface SponsorsState {
    titleSponsors: SponsorItem[];
    coPartners: SponsorItem[];
    mediaPartners: SponsorItem[];
    [key: string]: SponsorItem[];
}

const SponsorshipForm: React.FC<SponsorshipFormProps> = ({
    formData,
    setFormData,
    handleInputChange,
    openSections,
    toggleSection,
    formErrors = {},
}) => {

    // Helper to ensure sponsors structure exists
    const sponsors = formData.sponsors as {
        titleSponsors: { name: string; website: string }[];
        coPartners: { name: string; website: string }[];
        mediaPartners: { name: string; website: string }[];
    } || {
        titleSponsors: [],
        coPartners: [],
        mediaPartners: [],
    };

    const handleAddSponsor = (typeId: string) => {
        setFormData((prev) => {
            const currentSponsors = prev.sponsors as unknown as SponsorsState; // Cast to specific object type
            return {
                ...prev,
                sponsors: {
                    ...currentSponsors,
                    [typeId]: [...(currentSponsors[typeId] || []), { name: '', website: '' }],
                },
            };
        });
    };

    const handleRemoveSponsor = (typeId: string, index: number) => {
        setFormData((prev) => {
            const currentSponsors = prev.sponsors as unknown as SponsorsState;
            return {
                ...prev,
                sponsors: {
                    ...currentSponsors,
                    [typeId]: currentSponsors[typeId].filter((_, i) => i !== index),
                },
            };
        });
    };

    const handleSponsorChange = (typeId: string, index: number, field: string, value: string) => {
        setFormData((prev) => {
            const currentSponsors = prev.sponsors as unknown as SponsorsState;
            const updatedList = [...(currentSponsors[typeId] || [])];
            if (updatedList[index]) {
                updatedList[index] = { ...updatedList[index], [field]: value };
            }
            return {
                ...prev,
                sponsors: {
                    ...currentSponsors,
                    [typeId]: updatedList,
                },
            };
        });
    };

    // Helper for contact info updates to keep code clean similar to original
    const updateContactInfo = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            contactInfo: {
                ...prev.contactInfo,
                [field]: value
            }
        }));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
            {/* Sponsorship Information Section */}
            <div className="card" style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #7e7e7e',
                padding: '0px',
                boxShadow: 'none',
                maxWidth: '100%',
            }}>
                <div
                    onClick={() => toggleSection('sponsorship')}
                    style={{
                        padding: '30px 32px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                >
                    <h3 style={{ fontSize: '24px', fontWeight: 500, color: 'black' }}>
                        Sponsorship Information
                    </h3>
                    {openSections.sponsorship ? (
                        <ChevronDownIcon style={{ width: '24px', height: '24px', transform: 'rotate(180deg)', transition: 'transform 0.3s' }} />
                    ) : (
                        <ChevronDownIcon style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }} />
                    )}
                </div>

                {openSections.sponsorship && (
                    <div className="card-content" style={{ padding: '0 32px 32px' }}>
                        {/* Title Sponsors */}
                        <div style={{ marginBottom: "24px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                <label style={{ fontSize: "16px", fontWeight: 500, color: "black" }}>Title Sponsors</label>
                                <button
                                    type="button"
                                    onClick={() => handleAddSponsor("titleSponsors")}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        background: "none",
                                        border: "none",
                                        color: "#2563eb",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                    }}
                                >
                                    <PlusIcon size={16} /> Add
                                </button>
                            </div>
                            {sponsors.titleSponsors?.map((sponsor, index) => (
                                <div key={index} className="form-row" style={{ position: "relative", display: "flex", gap: "16px", marginBottom: "12px", alignItems: "flex-start", flexWrap: "wrap", paddingRight: "40px" }}>
                                    <div style={{ flex: 1, minWidth: "200px" }}>
                                        <input
                                            type="text"
                                            placeholder="Sponsor Name"
                                            value={sponsor.name}
                                            onChange={(e) => handleSponsorChange("titleSponsors", index, "name", e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                borderRadius: "8px",
                                                border: "1px solid #d1d5db",
                                                fontSize: "14px",
                                                outline: "none"
                                            }}
                                        />
                                        {formErrors[`sponsors.titleSponsors.${index}.name`] && (
                                            <span style={{ color: "red", fontSize: "12px" }}>{formErrors[`sponsors.titleSponsors.${index}.name`]}</span>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, minWidth: "200px" }}>
                                        <input
                                            type="text"
                                            placeholder="Website (Optional)"
                                            value={sponsor.website}
                                            onChange={(e) => handleSponsorChange("titleSponsors", index, "website", e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                borderRadius: "8px",
                                                border: "1px solid #d1d5db",
                                                fontSize: "14px",
                                                outline: "none"
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSponsor("titleSponsors", index)}
                                        className="delete-btn"
                                        style={{
                                            position: "absolute",
                                            top: "0",
                                            right: "0",
                                            padding: "8px",
                                            color: "#ef4444",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TrashIcon className="trash-icon" />
                                    </button>
                                </div>
                            ))}
                            {sponsors.titleSponsors?.length === 0 && (
                                <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>No title sponsors added.</p>
                            )}
                        </div>

                        {/* Co-Partners */}
                        <div style={{ marginBottom: "24px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                <label style={{ fontSize: "16px", fontWeight: 500, color: "black" }}>Co-Partners</label>
                                <button
                                    type="button"
                                    onClick={() => handleAddSponsor("coPartners")}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        background: "none",
                                        border: "none",
                                        color: "#2563eb",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                    }}
                                >
                                    <PlusIcon size={16} /> Add
                                </button>
                            </div>
                            {sponsors.coPartners?.map((sponsor, index) => (
                                <div key={index} className="form-row" style={{ position: "relative", display: "flex", gap: "16px", marginBottom: "12px", alignItems: "flex-start", flexWrap: "wrap", paddingRight: "40px" }}>
                                    <div style={{ flex: 1, minWidth: "200px" }}>
                                        <input
                                            type="text"
                                            placeholder="Sponsor Name"
                                            value={sponsor.name}
                                            onChange={(e) => handleSponsorChange("coPartners", index, "name", e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                borderRadius: "8px",
                                                border: "1px solid #d1d5db",
                                                fontSize: "14px",
                                                outline: "none"
                                            }}
                                        />
                                        {formErrors[`sponsors.coPartners.${index}.name`] && (
                                            <span style={{ color: "red", fontSize: "12px" }}>{formErrors[`sponsors.coPartners.${index}.name`]}</span>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, minWidth: "200px" }}>
                                        <input
                                            type="text"
                                            placeholder="Website (Optional)"
                                            value={sponsor.website}
                                            onChange={(e) => handleSponsorChange("coPartners", index, "website", e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                borderRadius: "8px",
                                                border: "1px solid #d1d5db",
                                                fontSize: "14px",
                                                outline: "none"
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSponsor("coPartners", index)}
                                        className="delete-btn"
                                        style={{
                                            position: "absolute",
                                            top: "0",
                                            right: "0",
                                            padding: "8px",
                                            color: "#ef4444",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TrashIcon className="trash-icon" />
                                    </button>
                                </div>
                            ))}
                            {sponsors.coPartners?.length === 0 && (
                                <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>No co-partners added.</p>
                            )}
                        </div>

                        {/* Media Partners */}
                        <div style={{ marginBottom: "24px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                                <label style={{ fontSize: "16px", fontWeight: 500, color: "black" }}>Media Partners</label>
                                <button
                                    type="button"
                                    onClick={() => handleAddSponsor("mediaPartners")}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        background: "none",
                                        border: "none",
                                        color: "#2563eb",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        cursor: "pointer",
                                    }}
                                >
                                    <PlusIcon size={16} /> Add
                                </button>
                            </div>
                            {sponsors.mediaPartners?.map((sponsor, index) => (
                                <div key={index} className="form-row" style={{ position: "relative", display: "flex", gap: "16px", marginBottom: "12px", alignItems: "flex-start", flexWrap: "wrap", paddingRight: "40px" }}>
                                    <div style={{ flex: 1, minWidth: "200px" }}>
                                        <input
                                            type="text"
                                            placeholder="Sponsor Name"
                                            value={sponsor.name}
                                            onChange={(e) => handleSponsorChange("mediaPartners", index, "name", e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                borderRadius: "8px",
                                                border: "1px solid #d1d5db",
                                                fontSize: "14px",
                                                outline: "none"
                                            }}
                                        />
                                        {formErrors[`sponsors.mediaPartners.${index}.name`] && (
                                            <span style={{ color: "red", fontSize: "12px" }}>{formErrors[`sponsors.mediaPartners.${index}.name`]}</span>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, minWidth: "200px" }}>
                                        <input
                                            type="text"
                                            placeholder="Website (Optional)"
                                            value={sponsor.website}
                                            onChange={(e) => handleSponsorChange("mediaPartners", index, "website", e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                borderRadius: "8px",
                                                border: "1px solid #d1d5db",
                                                fontSize: "14px",
                                                outline: "none"
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSponsor("mediaPartners", index)}
                                        className="delete-btn"
                                        style={{
                                            position: "absolute",
                                            top: "0",
                                            right: "0",
                                            padding: "8px",
                                            color: "#ef4444",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TrashIcon className="trash-icon" />
                                    </button>
                                </div>
                            ))}
                            {sponsors.mediaPartners?.length === 0 && (
                                <p style={{ fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>No media partners added.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Information Section */}
            <div className="card" style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #7e7e7e',
                padding: '0px',
                boxShadow: 'none',
                maxWidth: '100%',
            }}>
                <div
                    onClick={() => toggleSection('contactInfo')}
                    style={{
                        padding: '30px 32px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                >
                    <h3 style={{ fontSize: '24px', fontWeight: 500, color: 'black' }}>
                        Contact Information
                    </h3>
                    {openSections.contactInfo ? (
                        <ChevronDownIcon style={{ width: '24px', height: '24px', transform: 'rotate(180deg)', transition: 'transform 0.3s' }} />
                    ) : (
                        <ChevronDownIcon style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }} />
                    )}
                </div>

                {openSections.contactInfo && (
                    <div className="card-content" style={{ padding: '0 32px 32px' }}>
                        <div style={{ display: "grid", gap: "24px", marginTop: "16px" }}>
                            {/* Mobile & Email Row */}
                            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", width: "100%" }}>
                                <div style={{ flex: "1 1 250px", position: "relative", minWidth: "250px" }}>
                                    <label style={{
                                        position: "absolute",
                                        top: "-10px",
                                        left: "12px",
                                        backgroundColor: "white",
                                        padding: "0 4px",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#374151",
                                        zIndex: 1
                                    }}>
                                        Mobile Number
                                    </label>
                                    <div style={{ position: "relative", width: "100%" }}>
                                        <input
                                            type="tel"
                                            value={formData.contactInfo.mobile || '+91 '}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // Extract the part after '+91 '
                                                let inputWithoutPrefix = val.startsWith('+91 ') ? val.slice(4) : val;

                                                // If the user managed to mess up the prefix, try to salvage
                                                if (!val.startsWith('+91 ')) {
                                                    inputWithoutPrefix = val.replace(/^\+91\s?/, '').replace(/[^0-9]/g, '');
                                                }

                                                // Allow only numbers
                                                if (/^\d*$/.test(inputWithoutPrefix)) {
                                                    // Limit to 10 digits
                                                    if (inputWithoutPrefix.length <= 10) {
                                                        updateContactInfo("mobile", '+91 ' + inputWithoutPrefix);
                                                    }
                                                }
                                            }}
                                            style={{
                                                width: "100%",
                                                padding: "12px 16px",
                                                border: "1px solid #9ca3af",
                                                borderRadius: "4px",
                                                fontSize: "14px",
                                                outline: "none",
                                                color: "#1f2937"
                                            }}
                                            placeholder="Enter mobile number"
                                        />
                                    </div>
                                    {formErrors["contactInfo.mobile"] && (
                                        <span style={{ color: "red", fontSize: "12px", position: "absolute", bottom: "-20px", left: "0" }}>{formErrors["contactInfo.mobile"]}</span>
                                    )}
                                </div>
                                <div style={{ flex: "1 1 250px", position: "relative", minWidth: "250px" }}>
                                    <label style={{
                                        position: "absolute",
                                        top: "-10px",
                                        left: "12px",
                                        backgroundColor: "white",
                                        padding: "0 4px",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#374151"
                                    }}>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.contactInfo.email}
                                        onChange={(e) => updateContactInfo("email", e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: "12px 16px",
                                            border: "1px solid #9ca3af",
                                            borderRadius: "4px",
                                            fontSize: "14px",
                                            outline: "none",
                                            color: "#1f2937"
                                        }}
                                        placeholder="example@email.com"
                                    />
                                    {formErrors["contactInfo.email"] && (
                                        <span style={{ color: "red", fontSize: "12px", position: "absolute", bottom: "-20px", left: "0" }}>{formErrors["contactInfo.email"]}</span>
                                    )}
                                </div>
                            </div>

                            {/* Website */}
                            <div style={{ position: "relative", marginTop: "12px" }}>
                                <label style={{
                                    position: "absolute",
                                    top: "-10px",
                                    left: "12px",
                                    backgroundColor: "white",
                                    padding: "0 4px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "#374151"
                                }}>
                                    Website
                                </label>
                                <input
                                    type="url"
                                    value={formData.contactInfo.website}
                                    onChange={(e) => updateContactInfo("website", e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        border: "1px solid #9ca3af",
                                        borderRadius: "4px",
                                        fontSize: "14px",
                                        outline: "none",
                                        color: "#1f2937"
                                    }}
                                    placeholder="https://www.example.com"
                                />
                            </div>

                            {/* Additional Links */}
                            <div style={{ position: "relative", marginTop: "8px" }}>
                                <label style={{
                                    position: "absolute",
                                    top: "-10px",
                                    left: "12px",
                                    backgroundColor: "white",
                                    padding: "0 4px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "#374151"
                                }}>
                                    Additional Links
                                </label>
                                <input
                                    type="text"
                                    value={formData.contactInfo.additionalLinks}
                                    onChange={(e) => updateContactInfo("additionalLinks", e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        border: "1px solid #9ca3af",
                                        borderRadius: "4px",
                                        fontSize: "14px",
                                        outline: "none",
                                        color: "#1f2937"
                                    }}
                                    placeholder="Social media, portfolio, etc."
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        /* Base / Desktop Defaults */
        .delete-btn {
            height: 40px;
            width: 40px;
        }
        .delete-btn .trash-icon {
            width: 20px;
            height: 20px;
        }

        @media (max-width: 768px) {
          .card-content {
            padding: 0 16px 16px !important;
          }
          input {
             font-size: 16px !important; /* Prevent zoom on mobile */
          }
          /* Responsive Delete Button for Mobile */
          .delete-btn {
            height: 50px;
            width: 50px;
          }
          .delete-btn .trash-icon {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
        </div>
    );
};

export default SponsorshipForm;
