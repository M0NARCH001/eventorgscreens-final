"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronUpIcon, ChevronDownIcon, CalendarIcon, ClockIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

import { EventFormData } from "./validateEventform";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import TimePicker from "@/components/ui/TimePicker";

import { cn } from "@/lib/utils";
import { EVENT_CATEGORIES, TRANSPORT_OPTIONS } from "@/lib/create-event-data";

import styles from "./EventForm.module.css";

interface EventFormProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;

  photoPreview: string | null;

  // not used in this snippet but kept in props list in your original
  setPhotoPreview: (preview: string | null) => void;
  photoError: string;
  setPhotoError: (error: string) => void;
  additionalPhotos: File[];
  setAdditionalPhotos: (photos: File[]) => void;
  additionalPhotoPreviews: string[];
  setAdditionalPhotoPreviews: (previews: string[]) => void;
  additionalPhotosError: string;
  setAdditionalPhotosError: (error: string) => void;

  handleTransportToggle: (transportKey: string) => void;
  addArrayItem: (arrayName: string) => void;
  updateArrayField: (arrayName: string, index: number, field: string, value: string) => void;

  openSections: { [key: string]: boolean };
  toggleSection: (section: string) => void;

  formErrors: { [key: string]: string };
}

const EventForm: React.FC<EventFormProps> = ({
  formData,
  setFormData,
  handleInputChange,
  photoPreview,
  handleTransportToggle,
  updateArrayField,
  openSections,
  toggleSection,
  formErrors = {},
}) => {
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Auto-grow refs
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const personnelRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [formData.description]);

  useEffect(() => {
    if (personnelRef.current) {
      personnelRef.current.style.height = "auto";
      personnelRef.current.style.height = `${personnelRef.current.scrollHeight}px`;
    }
  }, [formData.personnel]);

  const handleTimeUpdate = (field: "time" | "endTime", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.container}>
      {/* Event Information Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <div
            onClick={() => toggleSection("event-info")}
            className={styles.sectionHeader}
          >
            <h3 className={styles.sectionTitle}>Event Information</h3>
            {openSections["event-info"] ? (
              <ChevronUpIcon className={styles.chevron} />
            ) : (
              <ChevronDownIcon className={styles.chevron} />
            )}
          </div>

          {openSections["event-info"] && (
            <div className={styles.sectionBody}>
              <div className={cn(styles.row, styles.rowGap40, styles.alignStart)}>
                {/* Photo */}
                <div className={styles.photoCol}>
                  <label htmlFor="eventPhoto" className={styles.photoLabel}>
                    <div className={styles.photoDrop}>
                      <input
                        id="eventPhoto"
                        type="file"
                        name="eventPhoto"
                        onChange={handleInputChange}
                        accept="image/jpeg,image/png,image/gif"
                        className={styles.hiddenInput}
                      />

                      {photoPreview ? (
                        <Image
                          src={photoPreview}
                          alt="Uploaded event photo preview"
                          className={styles.photoPreview}
                          width={240}
                          height={360}
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                        />
                      ) : (
                        <div className={styles.uploadPlaceholder}>
                          <Upload className={styles.uploadIcon} />
                          <span className={styles.uploadText}>Upload Image</span>
                        </div>
                      )}
                    </div>
                  </label>

                  <div className={styles.photoHelp}>
                    <p className={styles.photoHelpText}>
                      Upload a high-quality image for your event
                    </p>
                    <p className={styles.photoHelpText}>Formats: PNG, JPG, JPEG</p>
                    <p className={styles.photoHelpText}>Accepted aspect ratio: 2:3 (Portrait)</p>
                  </div>
                </div>

                {/* Fields */}
                <div className={cn(styles.col, styles.flexGrow)} style={{ gap: 20 }}>
                  <div className={cn(styles.row, styles.rowGap40, styles.alignCenter)}>
                    <div className={cn(styles.field, styles.fieldFlex1)}>
                      <input
                        className={styles.input}
                        placeholder="Enter event title"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleInputChange}
                      />
                      <span className={styles.floatingLabel}>Event Name</span>
                      {formErrors.eventName && (
                        <span className={styles.error}>{formErrors.eventName}</span>
                      )}
                    </div>

                    <div className={cn(styles.field, styles.fieldFlex1)}>
                      <select
                        className={styles.select}
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select the Category</option>
                        {EVENT_CATEGORIES.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <span className={styles.floatingLabel}>Category</span>
                      {formErrors.category && (
                        <span className={styles.error}>{formErrors.category}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <textarea
                      ref={(e) => {
                        if (e) {
                          e.style.height = "auto";
                          e.style.height = `${e.scrollHeight}px`;
                        }
                      }}
                      className={cn(styles.textarea, styles.textareaSm)}
                      placeholder='Write a catchy tagline, e.g., "Unleash Your Inner Techie!"'
                      name="tagline"
                      value={formData.tagline}
                      onChange={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                        handleInputChange(e);
                      }}
                    />
                    <span className={styles.floatingLabel}>Tagline</span>
                    {formErrors.tagline && (
                      <span className={styles.error}>{formErrors.tagline}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <Textarea
                      ref={descriptionRef}
                      className={cn(styles.textarea, styles.textareaMd, "min-h-[144px] overflow-hidden")}
                      placeholder="Describe about the event, including purpose and experience"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                    <span className={styles.floatingLabel}>Description</span>
                    {formErrors.description && (
                      <span className={styles.error}>{formErrors.description}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <Textarea
                      ref={personnelRef}
                      className={cn(styles.textarea, styles.textareaSm, "min-h-[80px] overflow-hidden")}
                      placeholder="List speakers, MCs, DJs, or any special hosts"
                      name="personnel"
                      value={formData.personnel}
                      onChange={handleInputChange}
                    />
                    <span className={styles.floatingLabel}>Customized Personnel</span>
                    {formErrors.personnel && (
                      <span className={styles.error}>{formErrors.personnel}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Date & Time Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <div
            onClick={() => toggleSection("date-time")}
            className={styles.sectionHeader}
          >
            <h3 className={styles.sectionTitle}>Date &amp; Time</h3>
            {openSections["date-time"] ? (
              <ChevronUpIcon className={styles.chevron} />
            ) : (
              <ChevronDownIcon className={styles.chevron} />
            )}
          </div>

          {openSections["date-time"] && (
            <div className={styles.sectionBody}>
              <div className={styles.col} style={{ gap: 24 }}>
                {/* Date + start time + end time */}
                <div className={cn(styles.row, styles.rowGap16, styles.alignStart)}>
                  {/* Date */}
                  <div className={cn(styles.field, styles.fieldMin150)} style={{ flex: "1 1 200px" }}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            styles.dateButton,
                            formData.date ? styles.dateButtonActive : styles.dateButtonMuted
                          )}
                        >
                          {formData.date ? (
                            format(new Date(formData.date), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className={styles.calendarIcon} />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date ? new Date(formData.date) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              const formatted = format(date, "yyyy-MM-dd");
                              setFormData((prev) => ({ ...prev, date: formatted }));
                            }
                          }}
                          fromDate={new Date()}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <span className={styles.floatingLabel}>Start Date</span>
                    {formErrors.date && <span className={styles.error}>{formErrors.date}</span>}
                  </div>

                  {/* Start time */}
                  <div className={cn(styles.field, styles.fieldMin150)} style={{ flex: "1 1 200px" }}>
                    <input
                      type="text"
                      readOnly
                      className={styles.input}
                      value={formData.time || ""}
                      onClick={() => setShowStartTimePicker(true)}
                      placeholder="HH:MM AM/PM"
                      style={{ cursor: "pointer" }}
                    />
                    <span className={styles.floatingLabel}>Start Time</span>
                    <ClockIcon className={styles.clockIcon} />
                    {formErrors.time && <span className={styles.error}>{formErrors.time}</span>}

                    {showStartTimePicker && (
                      <TimePicker
                        initialTime={formData.time}
                        onTimeChange={(val) => handleTimeUpdate("time", val)}
                        onClose={() => setShowStartTimePicker(false)}
                      />
                    )}
                  </div>

                  {/* End time */}
                  <div className={cn(styles.field, styles.fieldMin150)} style={{ flex: "1 1 200px" }}>
                    <input
                      type="text"
                      readOnly
                      className={styles.input}
                      value={formData.endTime || ""}
                      onClick={() => setShowEndTimePicker(true)}
                      placeholder="HH:MM AM/PM"
                      style={{ cursor: "pointer" }}
                    />
                    <span className={styles.floatingLabel}>End Time</span>
                    <ClockIcon className={styles.clockIcon} />
                    {formErrors.endTime && (
                      <span className={styles.error}>{formErrors.endTime}</span>
                    )}

                    {showEndTimePicker && (
                      <TimePicker
                        initialTime={formData.endTime}
                        onTimeChange={(val) => handleTimeUpdate("endTime", val)}
                        onClose={() => setShowEndTimePicker(false)}
                      />
                    )}
                  </div>
                </div>

                <div className={styles.break24} />

                {/* Venue + Maps */}
                <div className={cn(styles.row, styles.rowGap40, styles.alignStart)}>
                  <div className={cn(styles.field, styles.fieldMin250)} style={{ flex: "1 1 250px" }}>
                    <input
                      className={styles.input}
                      placeholder="Enter the full address or venue name"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                    />
                    <span className={styles.floatingLabel}>Venue</span>
                    {formErrors.venue && <span className={styles.error}>{formErrors.venue}</span>}
                  </div>

                  <div className={cn(styles.field, styles.fieldMin250)} style={{ flex: "1 1 250px" }}>
                    <input
                      className={styles.input}
                      placeholder="Enter the Google Maps link of the venue"
                      name="googleMapsUrl"
                      value={formData.googleMapsUrl}
                      onChange={handleInputChange}
                    />
                    <span className={styles.floatingLabel}>Google Maps URL</span>
                    {formErrors.googleMapsUrl && (
                      <span className={styles.error}>{formErrors.googleMapsUrl}</span>
                    )}
                  </div>
                </div>

                <div className={styles.break24} />

                {/* Transport to Event + Entry Side */}
                <div className={cn(styles.row, styles.rowGap40, styles.alignStart)}>
                  <div className={cn(styles.field, styles.fieldMin250)} style={{ flex: "1 1 250px" }}>
                    <input
                      className={styles.input}
                      placeholder="Describe how to reach the event"
                      name="transportToEvent"
                      value={formData.transportToEvent || ""}
                      onChange={handleInputChange}
                    />
                    <span className={styles.floatingLabel}>Transport to Event</span>
                    {formErrors.transportToEvent && (
                      <span className={styles.error}>{formErrors.transportToEvent}</span>
                    )}
                  </div>

                  <div className={cn(styles.field, styles.fieldMin250)} style={{ flex: "1 1 250px" }}>
                    <input
                      className={styles.input}
                      placeholder="Enter Entry Side details"
                      name="entrySide"
                      value={formData.entrySide || ""}
                      onChange={handleInputChange}
                    />
                    <span className={styles.floatingLabel}>Entry Side</span>
                    {formErrors.entrySide && (
                      <span className={styles.error}>{formErrors.entrySide}</span>
                    )}
                  </div>
                </div>

                <div className={styles.break24} />

                {/* Transport Availability */}
                <div>
                  <span className={styles.transportLabel}>Transport Availability</span>
                  <div className={styles.transportOptions}>
                    {TRANSPORT_OPTIONS.map((option) => {
                      const active =
                        formData.transportOptions[
                        option.value as keyof typeof formData.transportOptions
                        ];

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleTransportToggle(option.value)}
                          className={cn(styles.chip, active && styles.chipActive)}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Highlights Section */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <div
            onClick={() => toggleSection("event-highlights")}
            className={styles.sectionHeader}
          >
            <h3 className={styles.sectionTitle}>Event Highlights</h3>
            {openSections["event-highlights"] ? (
              <ChevronUpIcon className={styles.chevron} />
            ) : (
              <ChevronDownIcon className={styles.chevron} />
            )}
          </div>

          {openSections["event-highlights"] && (
            <div className={styles.sectionBody}>
              <div className={styles.col} style={{ gap: 24 }}>
                <div style={{ width: "100%" }}>
                  <span style={{ color: "var(--gray-500)", fontSize: 14, marginBottom: 8, display: "block" }}>
                    Add Any Artists Attending the Event
                  </span>

                  {formData.artists.map((artist, index) => (
                    <div key={index} className={styles.artistRow}>
                      <div style={{ flex: 1 }}>
                        <input
                          className={styles.input}
                          placeholder="Artist Name"
                          value={artist.name}
                          onChange={(e) =>
                            updateArrayField("artists", index, "name", e.target.value)
                          }
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <input
                          className={styles.input}
                          placeholder="Genre of Artist"
                          value={artist.genre}
                          onChange={(e) =>
                            updateArrayField("artists", index, "genre", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventForm;
