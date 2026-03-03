"use client";

import React, { useState } from "react";
import { ChevronDownIcon, PlusIcon, TrashIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { EventFormData } from "./validateEventform";
import styles from "./FinalForm.module.css";

interface FinalFormProps {
    formData: EventFormData;
    setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    addArrayItem?: (arrayName: string, subField?: string, item?: Record<string, unknown>) => void;
    updateArrayField?: (arrayName: string, index: number, field: string, value: string) => void;
    removeArrayItem?: (arrayName: string, index: number) => void;
    formErrors: { [key: string]: string };
}

const FinalForm: React.FC<FinalFormProps> = ({
    formData,
    setFormData,
    formErrors = {},
}) => {
    const [openSections, setOpenSections] = useState({
        requirements: true,
        postEvent: true,
    });

    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section as keyof typeof openSections],
        }));
    };

    const handleAddStallPrice = () => {
        setFormData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                stallsPrices: [...(prev.requirements?.stallsPrices || []), { stallType: "", stallPrice: "" }],
            },
        }));
    };

    const handleRemoveStallPrice = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                stallsPrices: prev.requirements.stallsPrices.filter((_, i) => i !== index),
            },
        }));
    };

    const handleStallPriceChange = (index: number, field: string, value: string) => {
        setFormData((prev) => {
            const newStallsPrices = [...prev.requirements.stallsPrices];
            newStallsPrices[index] = { ...newStallsPrices[index], [field]: value };
            return {
                ...prev,
                requirements: {
                    ...prev.requirements,
                    stallsPrices: newStallsPrices,
                },
            };
        });
    };

    const handleRequirementChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const field = name.split(".")[1];
        setFormData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                [field]: value,
            },
        }));
    };

    const handlePostEventChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const field = name.split(".")[1];
        setFormData((prev) => ({
            ...prev,
            postEventFollowUp: {
                ...prev.postEventFollowUp,
                [field]: value,
            },
        }));
    };

    return (
        <div className={styles.container}>
            {/* Requirements Section */}
            <div className={styles.card}>
                <div onClick={() => toggleSection("requirements")} className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Requirements/Planning</h3>
                    <ChevronDownIcon
                        className={[
                            styles.chevron,
                            openSections.requirements ? styles.chevronOpen : "",
                        ].join(" ")}
                    />
                </div>

                {openSections.requirements && (
                    <div className={styles.cardContent}>
                        <div className={styles.contentStack}>
                            {/* Artists & Stalls Availability */}
                            <div className={styles.formRow}>
                                <div className={styles.field}>
                                    <label className={styles.floatLabel}>Artists / Singers / Special Guests</label>
                                    <Select
                                        value={formData.requirements?.artists}
                                        onValueChange={(value) =>
                                            handleRequirementChange({ target: { name: "requirements.artists", value } } as React.ChangeEvent<HTMLInputElement>)
                                        }
                                    >
                                        <SelectTrigger className={styles.selectTrigger}>
                                            <SelectValue placeholder="Select or type requirements" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Sound System Required">Sound System Required</SelectItem>
                                            <SelectItem value="Green Room Required">Green Room Required</SelectItem>
                                            <SelectItem value="Backstage Access">Backstage Access</SelectItem>
                                            <SelectItem value="Personal Makeup Artist">Personal Makeup Artist</SelectItem>
                                            <SelectItem value="Transportation Included">Transportation Included</SelectItem>
                                            <SelectItem value="Accommodation Required">Accommodation Required</SelectItem>
                                            <SelectItem value="Special Dietary Needs">Special Dietary Needs</SelectItem>
                                            <SelectItem value="Security Personnel">Security Personnel</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {formErrors["requirements.artists"] && (
                                        <span className={styles.error}>{formErrors["requirements.artists"]}</span>
                                    )}
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.floatLabel}>Stalls Availability</label>
                                    <Select
                                        value={formData.requirements?.stallsAvailability}
                                        onValueChange={(value) =>
                                            handleRequirementChange({ target: { name: "requirements.stallsAvailability", value } } as React.ChangeEvent<HTMLInputElement>)
                                        }
                                    >
                                        <SelectTrigger className={styles.selectTrigger}>
                                            <SelectValue placeholder="Select or type availability" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Available">Available</SelectItem>
                                            <SelectItem value="Limited Availability">Limited Availability</SelectItem>
                                            <SelectItem value="Not Available">Not Available</SelectItem>
                                            <SelectItem value="Pre-booking Required">Pre-booking Required</SelectItem>
                                            <SelectItem value="First Come First Serve">First Come First Serve</SelectItem>
                                            <SelectItem value="By Invitation Only">By Invitation Only</SelectItem>
                                            <SelectItem value="Contact for Availability">Contact for Availability</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {formErrors["requirements.stallsAvailability"] && (
                                        <span className={styles.error}>{formErrors["requirements.stallsAvailability"]}</span>
                                    )}
                                </div>
                            </div>

                            {/* Stalls Prices */}
                            <div style={{ marginTop: 8 }}>
                                <div className={styles.stallsHeader}>
                                    <label className={styles.stallsLabel}>Stalls</label>
                                    <button type="button" onClick={handleAddStallPrice} className={styles.addBtn}>
                                        <PlusIcon size={16} /> Add stall
                                    </button>
                                </div>

                                {formData.requirements?.stallsPrices?.map((stall, index) => (
                                    <div key={index} className={styles.stallRow}>
                                        <div className={styles.stallField}>
                                            <label className={styles.stallInlineLabel}>Stall Type</label>
                                            <input
                                                className={styles.input}
                                                value={stall.stallType}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                                                    handleStallPriceChange(index, "stallType", val);
                                                }}
                                                placeholder="e.g. Food, Merch"
                                            />
                                            {formErrors[`requirements.stallsPrices.${index}.stallType`] && (
                                                <span className={styles.error}>
                                                    {formErrors[`requirements.stallsPrices.${index}.stallType`]}
                                                </span>
                                            )}
                                        </div>

                                        <div className={[styles.stallField, styles.stallFieldSmall].join(" ")}>
                                            <label className={styles.stallInlineLabel}>Stall Price</label>
                                            <input
                                                className={styles.input}
                                                type="number"
                                                min="0"
                                                value={stall.stallPrice}
                                                onChange={(e) => handleStallPriceChange(index, "stallPrice", e.target.value)}
                                                placeholder="₹"
                                            />
                                            {formErrors[`requirements.stallsPrices.${index}.stallPrice`] && (
                                                <span className={styles.error}>
                                                    {formErrors[`requirements.stallsPrices.${index}.stallPrice`]}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveStallPrice(index)}
                                            className={styles.deleteBtn}
                                            aria-label="Remove stall"
                                        >
                                            <TrashIcon className={styles.trashIcon} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Post-Event Follow Up Section */}
            <div className={styles.card}>
                <div onClick={() => toggleSection("postEvent")} className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Post-Event Follow Up</h3>
                    <ChevronDownIcon
                        className={[
                            styles.chevron,
                            openSections.postEvent ? styles.chevronOpen : "",
                        ].join(" ")}
                    />
                </div>

                {openSections.postEvent && (
                    <div className={styles.cardContent}>
                        <div className={styles.textareaWrap}>
                            <label className={styles.floatLabel}>Feedback Request</label>
                            <textarea
                                className={styles.textarea}
                                name="postEventFollowUp.thankYouNote"
                                value={formData.postEventFollowUp?.thankYouNote || ""}
                                onChange={handlePostEventChange}
                                placeholder="Write a message to send to attendees after the event..."
                            />
                            {formErrors["postEventFollowUp.thankYouNote"] && (
                                <span className={styles.error}>{formErrors["postEventFollowUp.thankYouNote"]}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinalForm;
