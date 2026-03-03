"use client";

import React from "react";
import { ChevronDownIcon, PlusIcon, TrashIcon } from "lucide-react";
import { EventFormData } from "./validateEventform";
import styles from "./SponsorshipForm.module.css";

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
    openSections,
    toggleSection,
    formErrors = {},
}) => {
    const sponsors =
        (formData.sponsors as {
            titleSponsors: SponsorItem[];
            coPartners: SponsorItem[];
            mediaPartners: SponsorItem[];
        }) || {
            titleSponsors: [],
            coPartners: [],
            mediaPartners: [],
        };

    const handleAddSponsor = (typeId: string) => {
        setFormData((prev) => {
            const currentSponsors = (prev.sponsors as unknown as SponsorsState) || {
                titleSponsors: [],
                coPartners: [],
                mediaPartners: [],
            };

            return {
                ...prev,
                sponsors: {
                    ...currentSponsors,
                    [typeId]: [...(currentSponsors[typeId] || []), { name: "", website: "" }],
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
                    [typeId]: (currentSponsors[typeId] || []).filter((_, i) => i !== index),
                },
            };
        });
    };

    const handleSponsorChange = (typeId: string, index: number, field: string, value: string) => {
        setFormData((prev) => {
            const currentSponsors = prev.sponsors as unknown as SponsorsState;
            const updatedList = [...(currentSponsors[typeId] || [])];
            if (updatedList[index]) updatedList[index] = { ...updatedList[index], [field]: value };

            return {
                ...prev,
                sponsors: {
                    ...currentSponsors,
                    [typeId]: updatedList,
                },
            };
        });
    };

    const updateContactInfo = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            contactInfo: {
                ...prev.contactInfo,
                [field]: value,
            },
        }));
    };

    return (
        <div className={styles.container}>
            {/* Sponsorship Information Section */}
            <div className={styles.card}>
                <div onClick={() => toggleSection("sponsorship")} className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Sponsorship Information</h3>
                    <ChevronDownIcon
                        className={[
                            styles.chevron,
                            openSections.sponsorship ? styles.chevronOpen : "",
                        ].join(" ")}
                    />
                </div>

                {openSections.sponsorship && (
                    <div className={styles.cardContent}>
                        {/* Title Sponsors */}
                        <div className={styles.block}>
                            <div className={styles.blockHeader}>
                                <label className={styles.blockLabel}>Title Sponsors</label>
                                <button type="button" onClick={() => handleAddSponsor("titleSponsors")} className={styles.addBtn}>
                                    <PlusIcon size={16} /> Add
                                </button>
                            </div>

                            {sponsors.titleSponsors?.map((sponsor, index) => (
                                <div key={index} className={styles.row}>
                                    <div className={styles.col}>
                                        <input
                                            type="text"
                                            placeholder="Sponsor Name"
                                            value={sponsor.name}
                                            onChange={(e) => handleSponsorChange("titleSponsors", index, "name", e.target.value)}
                                            className={styles.input}
                                        />
                                        {formErrors[`sponsors.titleSponsors.${index}.name`] && (
                                            <span className={styles.error}>{formErrors[`sponsors.titleSponsors.${index}.name`]}</span>
                                        )}
                                    </div>

                                    <div className={styles.col}>
                                        <input
                                            type="text"
                                            placeholder="Website (Optional)"
                                            value={sponsor.website}
                                            onChange={(e) => handleSponsorChange("titleSponsors", index, "website", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSponsor("titleSponsors", index)}
                                        className={styles.deleteBtn}
                                        aria-label="Remove title sponsor"
                                    >
                                        <TrashIcon className={styles.trashIcon} />
                                    </button>
                                </div>
                            ))}

                            {sponsors.titleSponsors?.length === 0 && <p className={styles.emptyText}>No title sponsors added.</p>}
                        </div>

                        {/* Co-Partners */}
                        <div className={styles.block}>
                            <div className={styles.blockHeader}>
                                <label className={styles.blockLabel}>Co-Partners</label>
                                <button type="button" onClick={() => handleAddSponsor("coPartners")} className={styles.addBtn}>
                                    <PlusIcon size={16} /> Add
                                </button>
                            </div>

                            {sponsors.coPartners?.map((sponsor, index) => (
                                <div key={index} className={styles.row}>
                                    <div className={styles.col}>
                                        <input
                                            type="text"
                                            placeholder="Sponsor Name"
                                            value={sponsor.name}
                                            onChange={(e) => handleSponsorChange("coPartners", index, "name", e.target.value)}
                                            className={styles.input}
                                        />
                                        {formErrors[`sponsors.coPartners.${index}.name`] && (
                                            <span className={styles.error}>{formErrors[`sponsors.coPartners.${index}.name`]}</span>
                                        )}
                                    </div>

                                    <div className={styles.col}>
                                        <input
                                            type="text"
                                            placeholder="Website (Optional)"
                                            value={sponsor.website}
                                            onChange={(e) => handleSponsorChange("coPartners", index, "website", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSponsor("coPartners", index)}
                                        className={styles.deleteBtn}
                                        aria-label="Remove co-partner"
                                    >
                                        <TrashIcon className={styles.trashIcon} />
                                    </button>
                                </div>
                            ))}

                            {sponsors.coPartners?.length === 0 && <p className={styles.emptyText}>No co-partners added.</p>}
                        </div>

                        {/* Media Partners */}
                        <div className={styles.block}>
                            <div className={styles.blockHeader}>
                                <label className={styles.blockLabel}>Media Partners</label>
                                <button type="button" onClick={() => handleAddSponsor("mediaPartners")} className={styles.addBtn}>
                                    <PlusIcon size={16} /> Add
                                </button>
                            </div>

                            {sponsors.mediaPartners?.map((sponsor, index) => (
                                <div key={index} className={styles.row}>
                                    <div className={styles.col}>
                                        <input
                                            type="text"
                                            placeholder="Sponsor Name"
                                            value={sponsor.name}
                                            onChange={(e) => handleSponsorChange("mediaPartners", index, "name", e.target.value)}
                                            className={styles.input}
                                        />
                                        {formErrors[`sponsors.mediaPartners.${index}.name`] && (
                                            <span className={styles.error}>{formErrors[`sponsors.mediaPartners.${index}.name`]}</span>
                                        )}
                                    </div>

                                    <div className={styles.col}>
                                        <input
                                            type="text"
                                            placeholder="Website (Optional)"
                                            value={sponsor.website}
                                            onChange={(e) => handleSponsorChange("mediaPartners", index, "website", e.target.value)}
                                            className={styles.input}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSponsor("mediaPartners", index)}
                                        className={styles.deleteBtn}
                                        aria-label="Remove media partner"
                                    >
                                        <TrashIcon className={styles.trashIcon} />
                                    </button>
                                </div>
                            ))}

                            {sponsors.mediaPartners?.length === 0 && <p className={styles.emptyText}>No media partners added.</p>}
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Information Section */}
            <div className={styles.card}>
                <div onClick={() => toggleSection("contactInfo")} className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Contact Information</h3>
                    <ChevronDownIcon
                        className={[
                            styles.chevron,
                            openSections.contactInfo ? styles.chevronOpen : "",
                        ].join(" ")}
                    />
                </div>

                {openSections.contactInfo && (
                    <div className={styles.cardContent}>
                        <div className={styles.contactGrid}>
                            {/* Mobile + Email */}
                            <div className={styles.contactRow}>
                                <div className={styles.field}>
                                    <label className={styles.floatLabel}>Mobile Number</label>
                                    <input
                                        type="tel"
                                        value={formData.contactInfo.mobile || "+91 "}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            let inputWithoutPrefix = val.startsWith("+91 ") ? val.slice(4) : val;

                                            if (!val.startsWith("+91 ")) {
                                                inputWithoutPrefix = val.replace(/^\+91\s?/, "").replace(/[^0-9]/g, "");
                                            }

                                            if (/^\d*$/.test(inputWithoutPrefix) && inputWithoutPrefix.length <= 10) {
                                                updateContactInfo("mobile", "+91 " + inputWithoutPrefix);
                                            }
                                        }}
                                        className={styles.contactInput}
                                        placeholder="Enter mobile number"
                                    />
                                    {formErrors["contactInfo.mobile"] && (
                                        <span className={styles.fieldError}>{formErrors["contactInfo.mobile"]}</span>
                                    )}
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.floatLabel}>Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.contactInfo.email}
                                        onChange={(e) => updateContactInfo("email", e.target.value)}
                                        className={styles.contactInput}
                                        placeholder="example@email.com"
                                    />
                                    {formErrors["contactInfo.email"] && (
                                        <span className={styles.fieldError}>{formErrors["contactInfo.email"]}</span>
                                    )}
                                </div>
                            </div>

                            {/* Website */}
                            <div className={styles.fieldFull}>
                                <label className={styles.floatLabel}>Website</label>
                                <input
                                    type="url"
                                    value={formData.contactInfo.website}
                                    onChange={(e) => updateContactInfo("website", e.target.value)}
                                    className={styles.contactInput}
                                    placeholder="https://www.example.com"
                                />
                            </div>

                            {/* Additional Links */}
                            <div className={styles.fieldFullSm}>
                                <label className={styles.floatLabel}>Additional Links</label>
                                <input
                                    type="text"
                                    value={formData.contactInfo.additionalLinks}
                                    onChange={(e) => updateContactInfo("additionalLinks", e.target.value)}
                                    className={styles.contactInput}
                                    placeholder="Social media, portfolio, etc."
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SponsorshipForm;
