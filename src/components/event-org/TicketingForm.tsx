"use client";

import React, { useCallback, useRef } from "react";
import { ChevronDownIcon, PlusIcon, TrashIcon } from "lucide-react";
import { EventFormData, ADD_ON_OPTIONS, TARGET_AUDIENCE_OPTIONS } from "@/lib/create-event-data";
import styles from "./TicketingForm.module.css";

interface TicketingFormProps {
    formData: EventFormData;
    setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // kept for compatibility, not used (same as your file)
    addArrayItem: (arrayName: string) => void;
    updateArrayField: (arrayName: string, index: number, field: string, value: string) => void;
    removeArrayItem: (arrayName: string, index: number) => void;
    openSections: { [key: string]: boolean };
    toggleSection: (section: string) => void;
    formErrors: { [key: string]: string };
}

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
    const percent = (v: number) => ((v - min) / (max - min)) * 100;

    const startDrag = (thumb: "min" | "max") => () => {
        const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
            const clientX = "touches" in moveEvent ? moveEvent.touches[0]?.clientX : moveEvent.clientX;
            if (!clientX || !trackRef.current) return;

            const rect = trackRef.current.getBoundingClientRect();
            const percentVal = clamp((clientX - rect.left) / rect.width, 0, 1);
            let value = Math.round(percentVal * (max - min) + min);

            if (thumb === "min") {
                value = clamp(value, min, valueMax - minGap);
                onChange({ min: value, max: valueMax });
            } else {
                value = clamp(value, valueMin + minGap, max);
                onChange({ min: valueMin, max: value });
            }
        };

        const stopHandler = () => {
            document.removeEventListener("mousemove", moveHandler);
            document.removeEventListener("touchmove", moveHandler);
            document.removeEventListener("mouseup", stopHandler);
            document.removeEventListener("touchend", stopHandler);
        };

        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("touchmove", moveHandler);
        document.addEventListener("mouseup", stopHandler);
        document.addEventListener("touchend", stopHandler);
    };

    const minLeft = `calc(${percent(valueMin)}% - 12px)`;
    const maxLeft = `calc(${percent(valueMax)}% - 12px)`;

    return (
        <div className={styles.sliderRoot}>
            <div ref={trackRef} className={styles.sliderTrack} />

            <div
                className={styles.sliderFill}
                style={{
                    left: percent(valueMin) + "%",
                    width: percent(valueMax) - percent(valueMin) + "%",
                }}
            />

            <div
                className={[styles.sliderThumb, styles.sliderThumbMin].join(" ")}
                style={{ left: minLeft }}
                onMouseDown={startDrag("min")}
                onTouchStart={startDrag("min")}
                tabIndex={0}
                aria-label="Minimum value"
                role="slider"
                aria-valuenow={valueMin}
                aria-valuemin={min}
                aria-valuemax={valueMax - minGap}
            />

            <div
                className={[styles.sliderThumb, styles.sliderThumbMax].join(" ")}
                style={{ left: maxLeft }}
                onMouseDown={startDrag("max")}
                onTouchStart={startDrag("max")}
                tabIndex={0}
                aria-label="Maximum value"
                role="slider"
                aria-valuenow={valueMax}
                aria-valuemin={valueMin + minGap}
                aria-valuemax={max}
            />

            <span className={[styles.sliderLabel, styles.sliderLabelMin].join(" ")} style={{ left: `calc(${percent(valueMin)}% - 16px)` }}>
                {valueMin}
            </span>
            <span className={[styles.sliderLabel, styles.sliderLabelMax].join(" ")} style={{ left: `calc(${percent(valueMax)}% - 16px)` }}>
                {valueMax}
            </span>
        </div>
    );
};

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
    // your local handleInputChange (keeps your "no debounce" behavior)
    const localHandleInputChange = useCallback(
        (name: string, value: string | number | boolean) => {
            setFormData((prev) => {
                const newFormData = { ...prev };
                const nameParts = name.split(".");
                let current = newFormData as unknown as Record<string, unknown>;

                for (let i = 0; i < nameParts.length - 1; i++) {
                    if (!current[nameParts[i]]) current[nameParts[i]] = {};
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
            ...(prev.enableOffers ? { ticketName: "", ticketQuantity: "", discountType: "", discountAmount: "", discountCode: "" } : {}),
        }));
    }, [setFormData]);

    const handleTicketTypeChange = useCallback(
        (type: string) => {
            setFormData((prev) => ({
                ...prev,
                ticketType: type,
                ...(type === "free" ? { audienceCategory: [{ category: "", price: "", description: "" }], refundPolicy: "" } : {}),
            }));
        },
        [setFormData]
    );

    const handleAddOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; checked: boolean } }) => {
            const { name, checked } = e.target;
            const addOnId = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                addOns: { ...prev.addOns, [addOnId]: checked },
            }));
        },
        [setFormData]
    );

    const addOnOptions = ADD_ON_OPTIONS;
    const audienceTypes = TARGET_AUDIENCE_OPTIONS;
    const audienceCategory = formData.audienceCategory || [{ category: "", price: "", description: "" }];

    return (
        <div className={styles.container}>
            {/* Ticketing Section */}
            <div className={styles.card}>
                <div
                    onClick={() => toggleSection("ticketing")}
                    onKeyDown={(e) => e.key === "Enter" && toggleSection("ticketing")}
                    className={styles.cardHeader}
                    role="button"
                    tabIndex={0}
                    aria-expanded={openSections.ticketing}
                    aria-controls="ticketing-section"
                >
                    <h3 className={styles.cardTitle}>Ticketing</h3>
                    <span>
                        <ChevronDownIcon className={styles.chevron} />
                    </span>
                </div>

                <div className={styles.collapse} style={{ maxHeight: openSections.ticketing ? "2000px" : "0" }}>
                    <div className={styles.cardContent}>
                        <div className={styles.stack16}>
                            {/* Paid/Free Toggle */}
                            <div className={styles.toggleWrap}>
                                <div className={styles.toggle}>
                                    <div
                                        className={styles.toggleHighlight}
                                        style={{ left: formData.ticketType === "paid" ? 0 : "50%" }}
                                    />
                                    <button
                                        type="button"
                                        className={[
                                            styles.toggleBtn,
                                            formData.ticketType === "paid" ? styles.toggleBtnActive : styles.toggleBtnInactive,
                                        ].join(" ")}
                                        onClick={() => handleTicketTypeChange("paid")}
                                        aria-pressed={formData.ticketType === "paid"}
                                        tabIndex={0}
                                    >
                                        Paid
                                    </button>
                                    <button
                                        type="button"
                                        className={[
                                            styles.toggleBtn,
                                            formData.ticketType === "free" ? styles.toggleBtnActive : styles.toggleBtnInactive,
                                        ].join(" ")}
                                        onClick={() => handleTicketTypeChange("free")}
                                        aria-pressed={formData.ticketType === "free"}
                                        tabIndex={0}
                                    >
                                        Free
                                    </button>
                                </div>
                            </div>

                            {formErrors.ticketType && <span className={styles.error}>{formErrors.ticketType}</span>}

                            {/* Audience Category Fields */}
                            {formData.ticketType === "paid" && (
                                <>
                                    {audienceCategory.map((type, index) => (
                                        <div key={index} className={styles.audienceCategory}>
                                            <div className={styles.audienceCategoryHeader}>
                                                <h3 className={styles.subTitle}>Category {index + 1}</h3>

                                                {audienceCategory.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeArrayItem("audienceCategory", index)}
                                                        className={styles.deleteBtn}
                                                        aria-label={`Remove audience category ${index + 1}`}
                                                    >
                                                        <TrashIcon className={styles.trashIcon} />
                                                    </button>
                                                )}
                                            </div>

                                            <div className={styles.rowWrap}>
                                                <div className={styles.field}>
                                                    <label htmlFor={`category-${index}`} className={styles.floatLabel}>
                                                        Audience Category
                                                    </label>
                                                    <input
                                                        id={`category-${index}`}
                                                        type="text"
                                                        name={`audienceCategory.${index}.category`}
                                                        value={type.category || ""}
                                                        onChange={(e) => updateArrayField("audienceCategory", index, "category", e.target.value)}
                                                        className={styles.input48}
                                                        placeholder="Ex: Gold Pass"
                                                    />
                                                    {formErrors[`audienceCategory.${index}.category`] && (
                                                        <span className={styles.error}>{formErrors[`audienceCategory.${index}.category`]}</span>
                                                    )}
                                                </div>

                                                <div className={styles.field}>
                                                    <label htmlFor={`price-${index}`} className={styles.floatLabel}>
                                                        Price
                                                    </label>
                                                    <input
                                                        id={`price-${index}`}
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        name={`audienceCategory.${index}.price`}
                                                        value={type.price || ""}
                                                        onChange={(e) => updateArrayField("audienceCategory", index, "price", e.target.value)}
                                                        className={styles.input48}
                                                        placeholder="₹"
                                                    />
                                                    {formErrors[`audienceCategory.${index}.price`] && (
                                                        <span className={styles.error}>{formErrors[`audienceCategory.${index}.price`]}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className={styles.fieldWide}>
                                                <label htmlFor={`description-${index}`} className={styles.floatLabel}>
                                                    Description
                                                </label>
                                                <textarea
                                                    id={`description-${index}`}
                                                    name={`audienceCategory.${index}.description`}
                                                    value={type.description || ""}
                                                    onChange={(e) => updateArrayField("audienceCategory", index, "description", e.target.value)}
                                                    className={styles.textarea120}
                                                    placeholder="Describe the ticket"
                                                />
                                                {formErrors[`audienceCategory.${index}.description`] && (
                                                    <span className={styles.error}>{formErrors[`audienceCategory.${index}.description`]}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <div className={styles.addBtnRow}>
                                        <button type="button" onClick={() => addArrayItem("audienceCategory")} className={styles.linkBtn}>
                                            <PlusIcon size={16} /> Add Category
                                        </button>
                                    </div>

                                    <div className={styles.stack16}>
                                        <h3 className={styles.subTitle}>Refund Policy</h3>
                                        <div className={styles.fieldWide}>
                                            <label htmlFor="refundPolicy" className={styles.floatLabel}>
                                                Refund Policy <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                id="refundPolicy"
                                                name="refundPolicy"
                                                value={formData.refundPolicy || ""}
                                                onChange={(e) => localHandleInputChange(e.target.name, e.target.value)}
                                                className={[
                                                    styles.input48,
                                                    formErrors.refundPolicy ? styles.input48ErrorBorder : "",
                                                ].join(" ")}
                                                placeholder="Mention if tickets are refundable and under what conditions"
                                                aria-describedby="refundPolicy-error"
                                                aria-invalid={!formData.refundPolicy}
                                            />
                                            {formErrors.refundPolicy && <span className={styles.error}>{formErrors.refundPolicy}</span>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Guidelines/Rules Section */}
            <div className={styles.card}>
                <div
                    onClick={() => toggleSection("guidelines")}
                    onKeyDown={(e) => e.key === "Enter" && toggleSection("guidelines")}
                    className={styles.cardHeader}
                    role="button"
                    tabIndex={0}
                    aria-expanded={openSections.guidelines}
                    aria-controls="guidelines-section"
                >
                    <h3 className={styles.cardTitle}>Guidelines/Rules</h3>
                    <span>
                        <ChevronDownIcon className={styles.chevron} />
                    </span>
                </div>

                <div className={styles.collapse} style={{ maxHeight: openSections.guidelines ? "1000px" : "0" }}>
                    <div className={styles.cardContent}>
                        <div className={styles.fieldWide} style={{ marginTop: 16 }}>
                            <label htmlFor="guidelines" className={styles.floatLabel}>
                                Guidelines
                            </label>
                            <textarea
                                id="guidelines"
                                name="guidelines"
                                value={formData.guidelines || ""}
                                onChange={(e) => localHandleInputChange(e.target.name, e.target.value)}
                                className={styles.textarea120}
                                placeholder="Enter The Guidelines"
                                aria-describedby="guidelines-error"
                            />
                            {formErrors.guidelines && <span className={styles.error}>{formErrors.guidelines}</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add-Ons Section */}
            {formData.ticketType === "paid" && (
                <div className={styles.card}>
                    <div
                        onClick={() => toggleSection("addOns")}
                        onKeyDown={(e) => e.key === "Enter" && toggleSection("addOns")}
                        className={styles.cardHeader}
                        role="button"
                        tabIndex={0}
                        aria-expanded={openSections.addOns}
                        aria-controls="addOns-section"
                    >
                        <h3 className={styles.cardTitle}>Add-Ons</h3>
                        <span>
                            <ChevronDownIcon className={styles.chevron} />
                        </span>
                    </div>

                    <div className={styles.collapse} style={{ maxHeight: openSections.addOns ? "100%" : "0" }}>
                        <div className={styles.cardContent}>
                            <div className={styles.stack16}>
                                <div className={styles.pills}>
                                    {addOnOptions.map((option) => {
                                        const active = !!formData.addOns?.[option.id];
                                        return (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => handleAddOnChange({ target: { name: `addOns.${option.id}`, checked: !active } })}
                                                className={[styles.pill, active ? styles.pillActive : ""].join(" ")}
                                            >
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                {formData.addOns?.giftHampers && (
                                    <div className={styles.fieldWide}>
                                        <label htmlFor="giftHampersDescription" className={styles.floatLabel}>
                                            Gift Hampers
                                        </label>
                                        <input
                                            id="giftHampersDescription"
                                            name="addOns.giftHampersDescription"
                                            value={formData.addOns.giftHampersDescription || ""}
                                            onChange={(e) => localHandleInputChange(e.target.name, e.target.value)}
                                            className={styles.input40}
                                            placeholder="Describe the contents of gift hampers (if any)"
                                        />
                                        {formErrors["addOns.giftHampersDescription"] && (
                                            <span className={styles.error}>{formErrors["addOns.giftHampersDescription"]}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Discounts/Offers Section */}
            {formData.ticketType === "paid" && (
                <div className={styles.card}>
                    <div
                        onClick={() => toggleSection("discounts")}
                        onKeyDown={(e) => e.key === "Enter" && toggleSection("discounts")}
                        className={styles.cardHeader}
                        role="button"
                        tabIndex={0}
                        aria-expanded={openSections.discounts}
                        aria-controls="discounts-section"
                    >
                        <h3 className={styles.cardTitle}>Discounts/Offers</h3>
                        <span>
                            <ChevronDownIcon className={styles.chevron} />
                        </span>
                    </div>

                    <div className={styles.collapse} style={{ maxHeight: openSections.discounts ? "1000px" : "0" }}>
                        <div className={styles.cardContent}>
                            <div className={styles.stack16}>
                                <div className={styles.discountRow}>
                                    <div className={styles.fieldMin180}>
                                        <label htmlFor="ticketName" className={styles.floatLabel}>
                                            Ticket Name
                                        </label>
                                        <input
                                            id="ticketName"
                                            name="ticketName"
                                            value={formData.ticketName || ""}
                                            onChange={(e) => localHandleInputChange(e.target.name, e.target.value)}
                                            className={styles.input40}
                                            placeholder="Enter ticket name"
                                        />
                                        {formErrors.ticketName && <span className={styles.error}>{formErrors.ticketName}</span>}
                                    </div>

                                    <div className={styles.fieldMin180}>
                                        <label htmlFor="ticketQuantity" className={styles.floatLabel}>
                                            Ticket Quantity
                                        </label>
                                        <input
                                            id="ticketQuantity"
                                            name="ticketQuantity"
                                            type="number"
                                            min="1"
                                            value={formData.ticketQuantity || ""}
                                            onChange={(e) => localHandleInputChange(e.target.name, e.target.value)}
                                            className={styles.input40}
                                            placeholder="Enter quantity"
                                        />
                                        {formErrors.ticketQuantity && <span className={styles.error}>{formErrors.ticketQuantity}</span>}
                                    </div>
                                </div>

                                <div className={styles.switchRow}>
                                    <label className={styles.switchLabel} htmlFor="enableOffers">
                                        Enable Offers
                                    </label>
                                    <div
                                        className={[styles.switch, formData.enableOffers ? styles.switchOn : ""].join(" ")}
                                        onClick={handleEnableOffersToggle}
                                        onKeyDown={(e) => e.key === "Enter" && handleEnableOffersToggle()}
                                        role="switch"
                                        tabIndex={0}
                                        aria-checked={formData.enableOffers}
                                    >
                                        <div className={[styles.switchThumb, formData.enableOffers ? styles.switchThumbOn : ""].join(" ")} />
                                    </div>
                                </div>

                                {formData.enableOffers && (
                                    <div className={styles.stack16}>
                                        <div className={styles.discountTypeRow}>
                                            <button
                                                type="button"
                                                className={[
                                                    styles.discountTypeBtn,
                                                    formData.discountType === "flat" ? styles.discountTypeBtnActive : "",
                                                ].join(" ")}
                                                onClick={() => setFormData((prev) => ({ ...prev, discountType: "flat" }))}
                                                onKeyDown={(e) => e.key === "Enter" && setFormData((prev) => ({ ...prev, discountType: "flat" }))}
                                                aria-pressed={formData.discountType === "flat"}
                                                tabIndex={0}
                                            >
                                                Flat discount
                                            </button>

                                            <button
                                                type="button"
                                                className={[
                                                    styles.discountTypeBtn,
                                                    formData.discountType === "percentage" ? styles.discountTypeBtnActive : "",
                                                ].join(" ")}
                                                onClick={() => setFormData((prev) => ({ ...prev, discountType: "percentage" }))}
                                                onKeyDown={(e) => e.key === "Enter" && setFormData((prev) => ({ ...prev, discountType: "percentage" }))}
                                                aria-pressed={formData.discountType === "percentage"}
                                                tabIndex={0}
                                            >
                                                Percentage
                                            </button>
                                        </div>

                                        <div className={styles.discountInputsRow}>
                                            <div className={styles.fieldMin120}>
                                                <label htmlFor="discountAmount" className={styles.floatLabel}>
                                                    Discount Amount
                                                </label>
                                                <input
                                                    id="discountAmount"
                                                    name="discountAmount"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={formData.discountAmount || ""}
                                                    onChange={(e) => localHandleInputChange(e.target.name, e.target.value)}
                                                    className={styles.input40}
                                                    placeholder="Amount"
                                                />
                                                {formErrors.discountAmount && <span className={styles.error}>{formErrors.discountAmount}</span>}
                                            </div>

                                            <div className={styles.fieldMin180}>
                                                <label htmlFor="discountCode" className={styles.floatLabel}>
                                                    Discount Code
                                                </label>
                                                <input
                                                    id="discountCode"
                                                    name="discountCode"
                                                    type="text"
                                                    value={formData.discountCode || ""}
                                                    onChange={(e) => localHandleInputChange(e.target.name, e.target.value)}
                                                    className={styles.input40}
                                                    placeholder="Enter code"
                                                />
                                                {formErrors.discountCode && <span className={styles.error}>{formErrors.discountCode}</span>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Audience Section */}
            <div className={styles.card}>
                <div
                    onClick={() => toggleSection("audience")}
                    onKeyDown={(e) => e.key === "Enter" && toggleSection("audience")}
                    className={styles.cardHeader}
                    role="button"
                    tabIndex={0}
                    aria-expanded={openSections.audience}
                    aria-controls="audience-section"
                >
                    <h3 className={styles.cardTitle}>Audience</h3>
                    <span>
                        <ChevronDownIcon className={styles.chevron} />
                    </span>
                </div>

                <div className={styles.collapse} style={{ maxHeight: openSections.audience ? "1000px" : "0" }}>
                    <div className={styles.cardContent}>
                        <div className={styles.stack12}>
                            <div className={styles.targetBlock}>
                                <h3 className={[styles.subTitle, styles.leftPad8].join(" ")}>Target Audience</h3>

                                <div className={[styles.tagRow, styles.leftPad8].join(" ")}>
                                    {audienceTypes.map((audience) => {
                                        const active = !!formData.targetAudience?.[audience];
                                        return (
                                            <div
                                                key={audience}
                                                className={[styles.tag, active ? styles.tagActive : ""].join(" ")}
                                                onClick={() => handleAudienceSelection(audience)}
                                                onKeyDown={(e) => e.key === "Enter" && handleAudienceSelection(audience)}
                                                role="button"
                                                tabIndex={0}
                                                aria-pressed={active}
                                            >
                                                <span className={styles.tagText}>{audience}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className={styles.ageBlock}>
                                <h3 className={styles.subTitle}>Age range</h3>

                                <div className={styles.sliderWrap}>
                                    <DualThumbSlider
                                        min={0}
                                        max={100}
                                        valueMin={formData.audienceRange?.min ?? 0}
                                        valueMax={formData.audienceRange?.max ?? 100}
                                        onChange={({ min, max }) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                audienceRange: { min, max },
                                            }))
                                        }
                                    />

                                    <div className={styles.minMaxRow}>
                                        <span>Min: {formData.audienceRange?.min ?? 0}</span>
                                        <span>Max: {formData.audienceRange?.max ?? 100}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketingForm;
