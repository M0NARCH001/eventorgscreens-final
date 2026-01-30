"use client";
import React, { useCallback, useRef } from 'react';
import {
    ChevronDownIcon,
    PlusIcon,
    TrashIcon,
} from "lucide-react";
import { EventFormData, ADD_ON_OPTIONS, TARGET_AUDIENCE_OPTIONS } from "@/lib/create-event-data";

interface TicketingFormProps {
    formData: EventFormData;
    setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    addArrayItem: (arrayName: string) => void;
    updateArrayField: (arrayName: string, index: number, field: string, value: string) => void;
    removeArrayItem: (arrayName: string, index: number) => void;
    openSections: { [key: string]: boolean };
    toggleSection: (section: string) => void;
    formErrors: { [key: string]: string };
}



const TicketingForm: React.FC<TicketingFormProps> = ({
    formData,
    setFormData,
    addArrayItem,
    updateArrayField,
    removeArrayItem,
    openSections = {},
    toggleSection,
    formErrors = {},
}) => {
    // Handle input change (removed debounce to fix lag)
    const handleInputChange = useCallback(
        (name: string, value: string | number | boolean) => {
            setFormData((prev) => {
                const newFormData = { ...prev };
                const nameParts = name.split('.');
                let current = newFormData as unknown as Record<string, unknown>;
                for (let i = 0; i < nameParts.length - 1; i++) {
                    if (!current[nameParts[i]]) {
                        current[nameParts[i]] = {};
                    }
                    current = current[nameParts[i]] as Record<string, unknown>;
                }
                current[nameParts[nameParts.length - 1]] = value;
                return newFormData;
            });
        },
        [setFormData]
    );

    const handleAudienceSelection = useCallback(
        (audience: string) => {
            setFormData((prev) => ({
                ...prev,
                targetAudience: {
                    ...prev.targetAudience,
                    [audience]: !prev.targetAudience[audience],
                },
            }));
        },
        [setFormData]
    );

    const handleEnableOffersToggle = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            enableOffers: !prev.enableOffers,
            ...(prev.enableOffers
                ? { ticketName: '', ticketQuantity: '', discountType: '', discountAmount: '', discountCode: '' }
                : {}),
        }));
    }, [setFormData]);

    const handleTicketTypeChange = useCallback(
        (type: string) => {
            setFormData((prev) => ({
                ...prev,
                ticketType: type,
                ...(type === 'free'
                    ? { audienceCategory: [{ category: '', price: '', description: '' }], refundPolicy: '' }
                    : {}),
            }));
        },
        [setFormData]
    );

    const handleAddOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; checked: boolean } }) => {
            const { name, checked } = e.target;
            const addOnId = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                addOns: { ...prev.addOns, [addOnId]: checked },
            }));
        },
        [setFormData]
    );

    const addOnOptions = ADD_ON_OPTIONS;

    const audienceTypes = TARGET_AUDIENCE_OPTIONS;

    const audienceCategory = formData.audienceCategory || [{ category: '', price: '', description: '' }];

    return (
        <>
            {/* Ticketing Section */}
            <div className="card" style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #7e7e7e',
                padding: '0px',
                marginBottom: '32px',
                boxShadow: 'none',
                maxWidth: '100%',
            }}>
                <div
                    onClick={() => toggleSection('ticketing')}
                    onKeyDown={(e) => e.key === 'Enter' && toggleSection('ticketing')}
                    style={{
                        padding: '30px 32px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={openSections.ticketing}
                    aria-controls="ticketing-section"
                >
                    <h3 style={{ fontSize: '24px', fontWeight: 500, color: 'black' }}>
                        Ticketing
                    </h3>
                    <span>
                        <ChevronDownIcon style={{ width: '24px', height: '24px' }} />
                    </span>
                </div>
                <div
                    style={{
                        maxHeight: openSections.ticketing ? '2000px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <div className="card-content" style={{ padding: '0 32px 32px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                            {/* Paid/Free Toggle */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '8px',
                                    marginTop: '4px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        width: '220px',
                                        height: '44px',
                                        background: '#f3f4f6',
                                        borderRadius: '9999px',
                                        border: '1px solid #e5e7eb',
                                        overflow: 'hidden',
                                        margin: '0 auto',
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: formData.ticketType === 'paid' ? 0 : '50%',
                                            width: '50%',
                                            height: '100%',
                                            background: '#bfdbfe',
                                            borderRadius: '9999px',
                                            transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)',
                                            zIndex: 1,
                                        }}
                                    />
                                    <button
                                        type="button"
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            border: 'none',
                                            background: 'transparent',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            zIndex: 2,
                                            color: formData.ticketType === 'paid' ? '#1e40af' : '#374151',
                                            transition: 'color 0.2s',
                                        }}
                                        onClick={() => handleTicketTypeChange('paid')}
                                        aria-pressed={formData.ticketType === 'paid'}
                                        tabIndex={0}
                                    >
                                        Paid
                                    </button>
                                    <button
                                        type="button"
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            border: 'none',
                                            background: 'transparent',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            zIndex: 2,
                                            color: formData.ticketType === 'free' ? '#1e40af' : '#374151',
                                            transition: 'color 0.2s',
                                        }}
                                        onClick={() => handleTicketTypeChange('free')}
                                        aria-pressed={formData.ticketType === 'free'}
                                        tabIndex={0}
                                    >
                                        Free
                                    </button>
                                </div>
                            </div>
                            {/* Error for ticketType */}
                            {formErrors.ticketType && (
                                <span style={{ color: "red", fontSize: "12px" }}>{formErrors.ticketType}</span>
                            )}
                            {/* Audience Category Fields */}
                            {formData.ticketType === 'paid' && (
                                <>
                                    {audienceCategory.map((type, index) => (
                                        <div
                                            key={index}
                                            className="audience-category"
                                            style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingRight: '40px' }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'black' }}>
                                                    Category {index + 1}
                                                </h3>
                                                {audienceCategory.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeArrayItem('audienceCategory', index)}
                                                        className="delete-btn"
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 0,
                                                            padding: "8px",
                                                            color: "#ef4444",
                                                            background: "none",
                                                            border: "none",
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                        aria-label={`Remove audience category ${index + 1}`}
                                                    >
                                                        <TrashIcon className="trash-icon" />
                                                    </button>
                                                )}
                                            </div>


                                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%' }}>
                                                <div className="audience-card" style={{ flex: '1', position: 'relative', minWidth: '200px' }}>
                                                    <label
                                                        htmlFor={`category-${index}`}
                                                        style={{
                                                            display: 'block',
                                                            fontSize: '12px',
                                                            fontWeight: 500,
                                                            color: '#374151',
                                                            backgroundColor: 'white',
                                                            marginTop: '-10px',
                                                            marginLeft: '12px',
                                                            padding: '0 4px',
                                                            position: 'absolute',
                                                        }}
                                                    >
                                                        Audience Category
                                                    </label>
                                                    <input
                                                        id={`category-${index}`}
                                                        type="text"
                                                        name={`audienceCategory.${index}.category`}
                                                        value={type.category || ''}
                                                        onChange={(e) => updateArrayField('audienceCategory', index, 'category', e.target.value)}
                                                        style={{
                                                            width: '100%',
                                                            height: '48px',
                                                            padding: '12px 16px',
                                                            border: '1px solid #9ca3af',
                                                            borderRadius: '6px',
                                                            fontSize: '14px',
                                                            color: '#1f2937',
                                                            transition: 'border-color 0.3s ease-in-out, box-shadow 0.2s ease-in-out',
                                                            outline: 'none',
                                                        }}
                                                        placeholder="Ex: Gold Pass"
                                                    />
                                                    {/* Error for audienceCategory.category */}
                                                    {formErrors[`audienceCategory.${index}.category`] && (
                                                        <span style={{ color: "red", fontSize: "12px" }}>{formErrors[`audienceCategory.${index}.category`]}</span>
                                                    )}
                                                </div>
                                                <div className="audience-card" style={{ flex: '1 1 200px', position: 'relative', minWidth: '200px' }}>
                                                    <label
                                                        htmlFor={`price-${index}`}
                                                        style={{
                                                            display: 'block',
                                                            fontSize: '12px',
                                                            fontWeight: 500,
                                                            color: '#374151',
                                                            backgroundColor: 'white',
                                                            marginTop: '-10px',
                                                            marginLeft: '12px',
                                                            padding: '0 4px',
                                                            position: 'absolute',
                                                        }}
                                                    >
                                                        Price
                                                    </label>
                                                    <input
                                                        id={`price-${index}`}
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        name={`audienceCategory.${index}.price`}
                                                        value={type.price || ''}
                                                        onChange={(e) => updateArrayField('audienceCategory', index, 'price', e.target.value)}
                                                        style={{
                                                            width: '100%',
                                                            height: '48px',
                                                            padding: '12px 16px',
                                                            border: '1px solid #9ca3af',
                                                            borderRadius: '6px',
                                                            fontSize: '14px',
                                                            color: '#1f2937',
                                                            transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                            outline: 'none',
                                                        }}
                                                        placeholder="₹"
                                                    />
                                                    {/* Error for audienceCategory.price */}
                                                    {formErrors[`audienceCategory.${index}.price`] && (
                                                        <span style={{ color: "red", fontSize: "12px" }}>
                                                            {formErrors[`audienceCategory.${index}.price`]}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <label
                                                    htmlFor={`description-${index}`}
                                                    style={{
                                                        display: 'block',
                                                        fontSize: '12px',
                                                        fontWeight: 500,
                                                        color: '#374151',
                                                        backgroundColor: 'white',
                                                        marginTop: '-10px',
                                                        marginLeft: '12px',
                                                        padding: '0 4px',
                                                        position: 'absolute',
                                                    }}
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    id={`description-${index}`}
                                                    name={`audienceCategory.${index}.description`}
                                                    value={type.description || ''}
                                                    onChange={(e) => updateArrayField('audienceCategory', index, 'description', e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        height: '120px',
                                                        padding: '12px 16px',
                                                        border: '1px solid #9ca3af',
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        color: '#1f2937',
                                                        resize: 'vertical',
                                                        transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                        outline: 'none',
                                                    }}
                                                    placeholder="Describe the ticket"
                                                />
                                                {/* Error for audienceCategory.description */}
                                                {formErrors[`audienceCategory.${index}.description`] && (
                                                    <span style={{ color: "red", fontSize: "12px" }}>
                                                        {formErrors[`audienceCategory.${index}.description`]}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                                        <button
                                            type="button"
                                            onClick={() => addArrayItem('audienceCategory')}
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
                                            <PlusIcon size={16} /> Add Category
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: '500', color: 'black' }}>
                                            Refund Policy
                                        </h3>
                                        <div style={{ position: 'relative' }}>
                                            <label
                                                htmlFor="refundPolicy"
                                                style={{
                                                    display: 'block',
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    color: '#374151',
                                                    backgroundColor: 'white',
                                                    marginTop: '-10px',
                                                    marginLeft: '12px',
                                                    padding: '0 4px',
                                                    position: 'absolute',
                                                }}
                                            >
                                                Refund Policy <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input
                                                id="refundPolicy"
                                                name="refundPolicy"
                                                value={formData.refundPolicy || ''}
                                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    height: '48px',
                                                    padding: '12px 16px',
                                                    border: `1px solid ${formErrors.refundPolicy ? '#ef4444' : 'black'}`,
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    color: '#1f2937',
                                                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                    outline: 'none',
                                                }}
                                                placeholder="Mention if tickets are refundable and under what conditions"
                                                aria-describedby="refundPolicy-error"
                                                aria-invalid={!formData.refundPolicy}
                                            />
                                            {/* Error for refundPolicy */}
                                            {formErrors.refundPolicy && (
                                                <span style={{ color: "red", fontSize: "12px" }}>{formErrors.refundPolicy}</span>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div >
                    </div >
                </div >
            </div >

            {/* Guidelines/Rules Section */}
            < div className="card" style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #7e7e7e',
                padding: '0px',
                marginBottom: '32px',
                boxShadow: 'none',
                maxWidth: '100%',
            }
            }>
                <div
                    onClick={() => toggleSection('guidelines')}
                    onKeyDown={(e) => e.key === 'Enter' && toggleSection('guidelines')}
                    style={{
                        padding: '30px 32px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={openSections.guidelines}
                    aria-controls="guidelines-section"
                >
                    <h3 style={{ fontSize: '24px', fontWeight: 500, color: 'black' }}>
                        Guidelines/Rules
                    </h3>
                    <span>
                        <ChevronDownIcon style={{ width: '24px', height: '24px' }} />
                    </span>
                </div>
                <div
                    style={{
                        maxHeight: openSections.guidelines ? '1000px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <div className="card-content" style={{ padding: '0 32px 32px' }}>
                        <div style={{ marginTop: '16px', position: 'relative' }}>
                            <label
                                htmlFor="guidelines"
                                style={{
                                    display: 'block',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    color: '#374151',
                                    backgroundColor: 'white',
                                    marginTop: '-10px',
                                    marginLeft: '12px',
                                    padding: '0 4px',
                                    position: 'absolute',
                                }}
                            >
                                Guidelines
                            </label>
                            <textarea
                                id="guidelines"
                                name="guidelines"
                                value={formData.guidelines || ''}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '120px',
                                    padding: '12px 16px',
                                    border: '1px solid #9ca3af',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    color: '#1f2937',
                                    resize: 'vertical',
                                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    outline: 'none',
                                }}
                                placeholder="Enter The Guidelines"
                                aria-describedby="guidelines-error"
                            />
                            {/* Error for guidelines */}
                            {formErrors.guidelines && (
                                <span style={{ color: "red", fontSize: "12px" }}>{formErrors.guidelines}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div >

            {/* Add-Ons Section */}
            {
                formData.ticketType === 'paid' && (
                    <div className="card" style={{
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        border: '1px solid #7e7e7e',
                        padding: '0px',
                        marginBottom: '32px',
                        boxShadow: 'none',
                        maxWidth: '100%',
                    }}>
                        <div
                            onClick={() => toggleSection('addOns')}
                            onKeyDown={(e) => e.key === 'Enter' && toggleSection('addOns')}
                            style={{
                                padding: '30px 32px',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                width: '100%',
                                cursor: 'pointer',
                            }}
                            role="button"
                            tabIndex={0}
                            aria-expanded={openSections.addOns}
                            aria-controls="addOns-section"
                        >
                            <h3 style={{ fontSize: '24px', fontWeight: 500, color: 'black' }}>
                                Add-Ons
                            </h3>
                            <span>
                                <ChevronDownIcon style={{ width: '24px', height: '24px' }} />
                            </span>
                        </div>
                        <div
                            style={{
                                maxHeight: openSections.addOns ? '100%' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <div className="card-content" style={{ padding: '0 32px 32px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', width: '100%' }}>
                                        {addOnOptions.map((option) => (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => handleAddOnChange({ target: { name: `addOns.${option.id}`, checked: !formData.addOns[option.id] } })}
                                                style={{
                                                    padding: "8px 16px",
                                                    borderRadius: "9999px",
                                                    fontSize: "12px",
                                                    backgroundColor: formData.addOns[option.id] ? "#bfdbfe" : "#f3f4f6",
                                                    color: "black",
                                                    border: formData.addOns[option.id] ? "1px solid #2563eb" : "1px solid #e5e7eb",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s ease-in-out",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                    {formData.addOns.giftHampers && (
                                        <div style={{ position: 'relative' }}>
                                            <label
                                                htmlFor="giftHampersDescription"
                                                style={{
                                                    display: 'block',
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    color: '#374151',
                                                    backgroundColor: 'white',
                                                    marginTop: '-10px',
                                                    marginLeft: '12px',
                                                    padding: '0 4px',
                                                    position: 'absolute',
                                                }}
                                            >
                                                Gift Hampers
                                            </label>
                                            <input
                                                id="giftHampersDescription"
                                                name="addOns.giftHampersDescription"
                                                value={formData.addOns.giftHampersDescription || ''}
                                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                    padding: '8px 16px',
                                                    border: '1px solid #9ca3af',
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                    outline: 'none',
                                                }}
                                                placeholder="Describe the contents of gift hampers (if any)"
                                            />
                                            {/* Error for giftHampersDescription */}
                                            {formErrors['addOns.giftHampersDescription'] && (
                                                <span style={{ color: "red", fontSize: "12px" }}>
                                                    {formErrors['addOns.giftHampersDescription']}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div >
                    </div >
                )
            }

            {/* Discounts/Offers Section */}
            {
                formData.ticketType === 'paid' && (
                    <div className="card" style={{
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        border: '1px solid #7e7e7e',
                        padding: '0px',
                        marginBottom: '32px',
                        boxShadow: 'none',
                        maxWidth: '100%',
                    }}>
                        <div
                            onClick={() => toggleSection('discounts')}
                            onKeyDown={(e) => e.key === 'Enter' && toggleSection('discounts')}
                            style={{
                                padding: '30px 32px',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                width: '100%',
                                cursor: 'pointer',
                            }}
                            role="button"
                            tabIndex={0}
                            aria-expanded={openSections.discounts}
                            aria-controls="discounts-section"
                        >
                            <h3 style={{ fontSize: '24px', fontWeight: 500, color: 'black' }}>
                                Discounts/Offers
                            </h3>
                            <span>
                                <ChevronDownIcon style={{ width: '24px', height: '24px' }} />
                            </span>
                        </div>
                        <div
                            style={{
                                maxHeight: openSections.discounts ? '1000px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <div className="card-content" style={{ padding: '0 32px 32px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                                        <div style={{ flex: '1 1 200px', position: 'relative', minWidth: '180px' }}>
                                            <label
                                                htmlFor="ticketName"
                                                style={{
                                                    display: 'block',
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    color: '#374151',
                                                    backgroundColor: 'white',
                                                    marginTop: '-10px',
                                                    marginLeft: '12px',
                                                    padding: '0 4px',
                                                    position: 'absolute',
                                                }}
                                            >
                                                Ticket Name
                                            </label>
                                            <input
                                                id="ticketName"
                                                name="ticketName"
                                                value={formData.ticketName || ''}
                                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                    padding: '8px 16px',
                                                    border: '1px solid #9ca3af',
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                    outline: 'none',
                                                }}
                                                placeholder="Enter ticket name"
                                            />
                                            {/* Error for ticketName */}
                                            {formErrors.ticketName && (
                                                <span style={{ color: "red", fontSize: "12px" }}>{formErrors.ticketName}</span>
                                            )}
                                        </div>
                                        <div style={{ flex: '1 1 200px', position: 'relative', minWidth: '180px' }}>
                                            <label
                                                htmlFor="ticketQuantity"
                                                style={{
                                                    display: 'block',
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    color: '#374151',
                                                    backgroundColor: 'white',
                                                    marginTop: '-10px',
                                                    marginLeft: '12px',
                                                    padding: '0 4px',
                                                    position: 'absolute',
                                                }}
                                            >
                                                Ticket Quantity
                                            </label>
                                            <input
                                                id="ticketQuantity"
                                                name="ticketQuantity"
                                                type="number"
                                                min="1"
                                                value={formData.ticketQuantity || ''}
                                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    height: '40px',
                                                    padding: '8px 16px',
                                                    border: '1px solid #9ca3af',
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                    outline: 'none',
                                                }}
                                                placeholder="Enter quantity"
                                            />
                                            {/* Error for ticketQuantity */}
                                            {formErrors.ticketQuantity && (
                                                <span style={{ color: "red", fontSize: "12px" }}>{formErrors.ticketQuantity}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <label
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: '#374151',
                                            }}
                                            htmlFor="enableOffers"
                                        >
                                            Enable Offers
                                        </label>
                                        <div
                                            style={{
                                                width: '48px',
                                                height: '24px',
                                                borderRadius: '9999px',
                                                backgroundColor: formData.enableOffers ? '#2563eb' : '#d1d5db',
                                                position: 'relative',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.3s ease-in-out',
                                            }}
                                            onClick={handleEnableOffersToggle}
                                            onKeyDown={(e) => e.key === 'Enter' && handleEnableOffersToggle()}
                                            role="switch"
                                            tabIndex={0}
                                            aria-checked={formData.enableOffers}
                                        >
                                            <div
                                                style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#ffffff',
                                                    position: 'absolute',
                                                    top: '3px',
                                                    left: formData.enableOffers ? '27px' : '3px',
                                                    transition: 'left 0.3s ease-in-out',
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {formData.enableOffers && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    flexWrap: 'wrap',
                                                    gap: '12px',
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    style={{
                                                        flex: '1 1 auto',
                                                        minWidth: '120px',
                                                        padding: '12px 20px',
                                                        borderRadius: '9999px',
                                                        backgroundColor: formData.discountType === 'flat' ? '#bfdbfe' : '#f3f4f6',
                                                        border: formData.discountType === 'flat' ? '1px solid #2563eb' : '1px solid #e5e7eb',
                                                        fontSize: '14px',
                                                        fontWeight: 500,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease-in-out',
                                                    }}
                                                    onClick={() => setFormData((prev) => ({ ...prev, discountType: 'flat' }))}
                                                    onKeyDown={(e) => e.key === 'Enter' && setFormData((prev) => ({ ...prev, discountType: 'flat' }))}
                                                    aria-pressed={formData.discountType === 'flat'}
                                                    tabIndex={0}
                                                >
                                                    Flat discount
                                                </button>
                                                <button
                                                    type="button"
                                                    style={{
                                                        flex: '1 1 auto',
                                                        minWidth: '120px',
                                                        padding: '12px 20px',
                                                        borderRadius: '9999px',
                                                        backgroundColor: formData.discountType === 'percentage' ? '#bfdbfe' : '#f3f4f6',
                                                        border: formData.discountType === 'percentage' ? '1px solid #2563eb' : '1px solid #e5e7eb',
                                                        fontSize: '14px',
                                                        fontWeight: 500,
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease-in-out',
                                                    }}
                                                    onClick={() => setFormData((prev) => ({ ...prev, discountType: 'percentage' }))}
                                                    onKeyDown={(e) => e.key === 'Enter' && setFormData((prev) => ({ ...prev, discountType: 'percentage' }))}
                                                    aria-pressed={formData.discountType === 'percentage'}
                                                    tabIndex={0}
                                                >
                                                    Percentage
                                                </button>
                                            </div>
                                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%' }}>
                                                <div style={{ flex: '1 1 150px', position: 'relative', minWidth: '120px' }}>
                                                    <label
                                                        htmlFor="discountAmount"
                                                        style={{
                                                            display: 'block',
                                                            fontSize: '12px',
                                                            fontWeight: 500,
                                                            color: '#374151',
                                                            backgroundColor: 'white',
                                                            marginTop: '-10px',
                                                            marginLeft: '12px',
                                                            padding: '0 4px',
                                                            position: 'absolute',
                                                        }}
                                                    >
                                                        Discount Amount
                                                    </label>
                                                    <input
                                                        id="discountAmount"
                                                        name="discountAmount"
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={formData.discountAmount || ''}
                                                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '8px 16px',
                                                            border: '1px solid #9ca3af',
                                                            borderRadius: '6px',
                                                            fontSize: '14px',
                                                            transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                            outline: 'none',
                                                        }}
                                                        placeholder="Amount"
                                                    />
                                                    {/* Error for discountAmount */}
                                                    {formErrors.discountAmount && (
                                                        <span style={{ color: "red", fontSize: "12px" }}>{formErrors.discountAmount}</span>
                                                    )}
                                                </div>
                                                <div style={{ flex: '1 1 180px', position: 'relative', minWidth: '180px' }}>
                                                    <label
                                                        htmlFor="discountCode"
                                                        style={{
                                                            display: 'block',
                                                            fontSize: '12px',
                                                            fontWeight: 500,
                                                            color: '#374151',
                                                            backgroundColor: 'white',
                                                            marginTop: '-10px',
                                                            marginLeft: '12px',
                                                            padding: '0 4px',
                                                            position: 'absolute',
                                                        }}
                                                    >
                                                        Discount Code
                                                    </label>
                                                    <input
                                                        id="discountCode"
                                                        name="discountCode"
                                                        type="text"
                                                        value={formData.discountCode || ''}
                                                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                                        style={{
                                                            width: '100%',
                                                            height: '40px',
                                                            padding: '8px 16px',
                                                            border: '1px solid #9ca3af',
                                                            borderRadius: '6px',
                                                            fontSize: '14px',
                                                            transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                                            outline: 'none',
                                                        }}
                                                        placeholder="Enter code"
                                                    />
                                                    {/* Error for discountCode */}
                                                    {formErrors.discountCode && (
                                                        <span style={{ color: "red", fontSize: "12px" }}>{formErrors.discountCode}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Audience Section */}
            <div className="card" style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #7e7e7e',
                padding: '0px',
                marginBottom: '32px',
                boxShadow: 'none',
                maxWidth: '100%',
            }}>
                <div
                    onClick={() => toggleSection('audience')}
                    onKeyDown={(e) => e.key === 'Enter' && toggleSection('audience')}
                    style={{
                        padding: '30px 32px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={openSections.audience}
                    aria-controls="audience-section"
                >
                    <h3 style={{ fontSize: '24px', fontWeight: 500, color: 'black' }}>
                        Audience
                    </h3>
                    <span>
                        <ChevronDownIcon style={{ width: '24px', height: '24px' }} />
                    </span>
                </div>
                <div
                    style={{
                        maxHeight: openSections.audience ? '1000px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <div className="card-content" style={{ padding: '0 32px 32px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                            <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'black', paddingLeft: '8px' }}>
                                    Target Audience
                                </h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', width: '100%', paddingLeft: '8px' }}>
                                    {audienceTypes.map((audience) => (
                                        <div
                                            key={audience}
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: '9999px',
                                                border: formData.targetAudience[audience] ? '1px solid #2563eb' : '1px solid #e5e7eb',
                                                backgroundColor: formData.targetAudience[audience] ? '#bfdbfe' : '#f3f4f6',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease-in-out',
                                            }}
                                            onClick={() => handleAudienceSelection(audience)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAudienceSelection(audience)}
                                            role="button"
                                            tabIndex={0}
                                            aria-pressed={formData.targetAudience[audience]}
                                        >
                                            <span style={{ fontSize: '14px', fontWeight: 500, color: 'black' }}>
                                                {audience}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '8px', marginTop: '8px', width: '100%' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 500, color: 'black' }}>
                                    Age range
                                </h3>
                                <div style={{ width: '90%', margin: '0 auto', padding: '8px 0' }}>
                                    <DualThumbSlider
                                        min={0}
                                        max={100}
                                        valueMin={formData.audienceRange?.min ?? 0}
                                        valueMax={formData.audienceRange?.max ?? 100}
                                        onChange={({ min, max }) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                audienceRange: { min, max }
                                            }))
                                        }
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#374151', marginTop: 4 }}>
                                        <span>Min: {formData.audienceRange?.min ?? 0}</span>
                                        <span>Max: {formData.audienceRange?.max ?? 100}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
          .container {
            padding: 16px;
          }
          .card {
            padding: 16px;
            border-radius: 4px;
            margin-bottom: 16px;
          }
          .card-content {
            padding: 0 8px 16px !important;
          }
          .card input:not([type="checkbox"]),
          .card textarea {
            padding: 12px;
            font-size: 14px;
          }
          .card label {
            left: 8px;
          }
          .card .audience-card {
            margin-bottom: 8px;
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
        


        @media (min-width: 1200px) {
          .card {
            padding: 20px;
          }
          .card-content {
            padding: 0 32px 32px !important;
          }
        }
      `}</style>
        </>
    );
};

function clamp(val: number, min: number, max: number) {
    return Math.max(min, Math.min(val, max));
}

const minGap = 10;

interface DualThumbSliderProps {
    min: number;
    max: number;
    valueMin: number;
    valueMax: number;
    onChange: (values: { min: number; max: number }) => void;
}

const DualThumbSlider: React.FC<DualThumbSliderProps> = ({ min = 0, max = 100, valueMin, valueMax, onChange }) => {
    const trackRef = useRef<HTMLDivElement>(null);

    // Convert value to percent
    const percent = (v: number) => ((v - min) / (max - min)) * 100;

    // Mouse/touch drag logic
    const startDrag = (thumb: 'min' | 'max') => (e: React.MouseEvent | React.TouchEvent) => {
        // e.preventDefault(); // Might interfere with touch scrolling if not careful, but fine for slider
        const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
            let clientX;
            if ('touches' in moveEvent) {
                clientX = moveEvent.touches[0].clientX;
            } else {
                clientX = moveEvent.clientX;
            }

            if (!trackRef.current) return;
            const rect = trackRef.current.getBoundingClientRect();
            const percentVal = clamp((clientX - rect.left) / rect.width, 0, 1);
            let value = Math.round(percentVal * (max - min) + min);

            if (thumb === 'min') {
                value = clamp(value, min, valueMax - minGap);
                onChange({ min: value, max: valueMax });
            } else {
                value = clamp(value, valueMin + minGap, max);
                onChange({ min: valueMin, max: value });
            }
        };
        const stopHandler = () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('mouseup', stopHandler);
            document.removeEventListener('touchend', stopHandler);
        };
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('mouseup', stopHandler);
        document.addEventListener('touchend', stopHandler);
    };

    return (
        <div style={{ position: 'relative', height: 48, margin: '24px 0' }}>
            {/* Track */}
            <div
                ref={trackRef}
                style={{
                    position: 'absolute',
                    top: 22,
                    left: 0,
                    right: 0,
                    height: 8,
                    background: '#ddd',
                    borderRadius: 4,
                    zIndex: 1,
                }}
            />
            {/* Fill */}
            <div
                style={{
                    position: 'absolute',
                    top: 22,
                    left: percent(valueMin) + '%',
                    width: (percent(valueMax) - percent(valueMin)) + '%',
                    height: 8,
                    background: 'linear-gradient(90deg, #667eea 0%, #2563eb 100%)',
                    borderRadius: 4,
                    zIndex: 2,
                    transition: 'all 0.1s',
                }}
            />
            {/* Min Thumb */}
            <div
                style={{
                    position: 'absolute',
                    top: 18,
                    left: `calc(${percent(valueMin)}% - 12px)`,
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '3px solid #667eea',
                    borderRadius: '50%',
                    cursor: 'grab',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    zIndex: 3,
                    transition: 'all 0.2s',
                }}
                onMouseDown={startDrag('min')}
                onTouchStart={startDrag('min')}
                tabIndex={0}
                aria-label="Minimum value"
                role="slider"
                aria-valuenow={valueMin}
                aria-valuemin={min}
                aria-valuemax={valueMax - minGap}
            />
            {/* Max Thumb */}
            <div
                style={{
                    position: 'absolute',
                    top: 18,
                    left: `calc(${percent(valueMax)}% - 12px)`,
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '3px solid #2563eb',
                    borderRadius: '50%',
                    cursor: 'grab',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    zIndex: 3,
                    transition: 'all 0.2s',
                }}
                onMouseDown={startDrag('max')}
                onTouchStart={startDrag('max')}
                tabIndex={0}
                aria-label="Maximum value"
                role="slider"
                aria-valuenow={valueMax}
                aria-valuemin={valueMin + minGap}
                aria-valuemax={max}
            />
            {/* Labels */}
            <span style={{
                position: 'absolute',
                top: -8,
                left: `calc(${percent(valueMin)}% - 16px)`,
                fontSize: 12,
                color: '#667eea',
                fontWeight: 600,
                background: 'white',
                padding: '0 2px',
                borderRadius: 3,
                zIndex: 5,
                pointerEvents: 'none',
            }}>
                {valueMin}
            </span>
            <span style={{
                position: 'absolute',
                top: -8,
                left: `calc(${percent(valueMax)}% - 16px)`,
                fontSize: 12,
                color: '#2563eb',
                fontWeight: 600,
                background: 'white',
                padding: '0 2px',
                borderRadius: 3,
                zIndex: 5,
                pointerEvents: 'none',
            }}>
                {valueMax}
            </span>
        </div>
    );
}

export default TicketingForm;
