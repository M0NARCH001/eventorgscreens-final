"use client";
import React, { useState } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  CalendarIcon,
  ClockIcon,
  Upload,
} from "lucide-react";
import { EventFormData } from "./validateEventform";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import TimePicker from "@/components/ui/TimePicker";
import { EVENT_CATEGORIES, TRANSPORT_OPTIONS } from "@/lib/create-event-data";

interface EventFormProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  photoPreview: string | null;
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

  const handleTimeUpdate = (field: "time" | "endTime", value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Responsive style for mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
  const containerWidth = isMobile ? 'auto' : '100%';
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "32px", width: containerWidth }}>
      {/* Event Information Section */}
      <div
        className="event-form-section"
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #7e7e7e",
          marginBottom: "32px"
        }}
      >
        <div style={{ width: containerWidth, backgroundColor: "white", borderRadius: "16px", border: "1px solid #7e7e7e" }}>
          <div
            onClick={() => toggleSection("event-info")}
            style={{
              padding: "30px 32px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "100%",
              cursor: "pointer"
            }}
          >
            <h3 style={{ fontSize: "24px", fontWeight: 500, color: "black" }}>
              Event Information
            </h3>
            {openSections["event-info"] ? (
              <ChevronUpIcon style={{ width: "24px", height: "24px" }} />
            ) : (
              <ChevronDownIcon style={{ width: "24px", height: "24px" }} />
            )}
          </div>
          {openSections["event-info"] && (
            <div style={{ padding: "0 32px 32px" }}>
              <div className="form-row" style={{ display: "flex", alignItems: "flex-start", gap: "40px", width: "100%", flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", width: isMobile ? "100%" : "258px", minWidth: "200px", flex: isMobile ? "1 1 100%" : "1 1 258px", maxWidth: "100%" }}>
                  <label htmlFor="eventPhoto" style={{ cursor: "pointer", display: "block", width: "100%" }}>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      height: isMobile ? "auto" : "388px",
                      minHeight: isMobile ? "200px" : "388px",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "13px",
                      padding: "20px 24px",
                      backgroundColor: "white",
                      borderRadius: "12px",
                      border: "1px dashed #b5b5b5",
                      width: "100%"
                    }}>
                      <input
                        type="file"
                        name="eventPhoto"
                        onChange={handleInputChange}
                        accept="image/jpeg,image/png,image/gif"
                        style={{ display: "none" }}
                        id="eventPhoto"
                      />
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Uploaded event photo preview"
                          style={{ height: "256px", width: isMobile ? 'auto' : 'auto', objectFit: "contain", maxWidth: "100%" }}
                        />
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                          <Upload style={{ width: "24px", height: "24px", color: "#1e1e1e" }} />
                          <span style={{ fontFamily: "Inter, Helvetica", fontWeight: 400, color: "#1e1e1e", fontSize: "18px" }}>
                            Upload Image
                          </span>
                        </div>
                      )}
                    </div>
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "16px", gap: "5px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e1e1e", textAlign: "center" }}>
                      Upload a high-quality image for your event
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e1e1e", textAlign: "center" }}>
                      Formats: PNG, JPG, JPEG
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e1e1e", textAlign: "center" }}>
                      Accepted aspect ratio: 4:3
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px", flex: "1 1 300px", minWidth: "0" }}>
                  <div className="form-row" style={{ display: "flex", alignItems: "center", gap: "40px", width: "100%", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, position: "relative" }}>
                      <input
                        style={{
                          height: "56px",
                          padding: "4px 16px",
                          border: "1px solid #79747e",
                          borderRadius: "4px",
                          width: "100%",
                          fontSize: "16px",
                          color: "#1f2937"
                        }}
                        placeholder="Enter event title"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleInputChange}
                      />
                      <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                        Event Name
                      </span>
                      {formErrors.eventName && (
                        <span style={{ color: "red", fontSize: "12px" }}>{formErrors.eventName}</span>
                      )}
                    </div>
                    <div style={{ flex: 1, position: "relative" }}>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        style={{
                          height: "56px",
                          padding: "4px 16px",
                          border: "1px solid #79747e",
                          borderRadius: "4px",
                          width: "100%",
                          fontSize: "16px",
                          backgroundColor: "white",
                          color: "#1f2937"
                        }}
                      >
                        <option value="">Select the Category</option>
                        {EVENT_CATEGORIES.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                        Category
                      </span>
                      {formErrors.category && (
                        <span style={{ color: "red", fontSize: "12px" }}>{formErrors.category}</span>
                      )}
                    </div>
                  </div>
                  <div style={{ width: "100%", position: "relative" }}>
                    <textarea
                      style={{
                        height: "64px",
                        padding: "4px 16px",
                        border: "1px solid #79747e",
                        borderRadius: "4px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#1f2937"
                      }}
                      placeholder='Write a catchy tagline, e.g., "Unleash Your Inner Techie!"'
                      name="tagline"
                      value={formData.tagline}
                      onChange={handleInputChange}
                    />
                    <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                      Tagline
                    </span>
                    {formErrors.tagline && (
                      <span style={{ color: "red", fontSize: "12px" }}>{formErrors.tagline}</span>
                    )}
                  </div>
                  <div style={{ width: "100%", position: "relative" }}>
                    <textarea
                      style={{
                        height: "144px",
                        padding: "4px 16px",
                        border: "1px solid #79747e",
                        borderRadius: "4px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#1f2937"
                      }}
                      placeholder="Describe about the event, including purpose and experience"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                    <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                      Description
                    </span>
                    {formErrors.description && (
                      <span style={{ color: "red", fontSize: "12px" }}>{formErrors.description}</span>
                    )}
                  </div>
                  <div style={{ width: "100%", position: "relative" }}>
                    <textarea
                      style={{
                        height: "64px",
                        padding: "4px 16px",
                        border: "1px solid #79747e",
                        borderRadius: "4px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#1f2937"
                      }}
                      placeholder="List speakers, MCs, DJs, or any special hosts"
                      name="personnel"
                      value={formData.personnel}
                      onChange={handleInputChange}
                    />
                    <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                      Customized Personnel
                    </span>
                    {formErrors.personnel && (
                      <span style={{ color: "red", fontSize: "12px" }}>{formErrors.personnel}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Date & Time Section */}
      <div
        className="event-form-section"
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #7e7e7e",
          marginBottom: "32px"
        }}
      >
        <div style={{ width: containerWidth, backgroundColor: "white", borderRadius: "16px", border: "1px solid #7e7e7e" }}>
          <div
            onClick={() => toggleSection("date-time")}
            style={{
              padding: "30px 32px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "100%",
              cursor: "pointer"
            }}
          >
            <h3 style={{ fontSize: "24px", fontWeight: 500, color: "black" }}>
              Date & Time
            </h3>
            {openSections["date-time"] ? (
              <ChevronUpIcon style={{ width: "24px", height: "24px" }} />
            ) : (
              <ChevronDownIcon style={{ width: "24px", height: "24px" }} />
            )}
          </div>
          {openSections["date-time"] && (
            <div style={{ padding: "0 32px 32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Date, Start Time, End Time Row */}
                {/* Date, Start Time, End Time Row */}
                <div className="form-row" style={{ display: "flex", alignItems: "flex-start", gap: "16px", width: "100%", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 200px", position: "relative", minWidth: "150px" }}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date && "text-muted-foreground"
                          )}
                          style={{
                            height: "56px",
                            padding: "4px 16px",
                            border: "1px solid #79747e",
                            borderRadius: "4px",
                            fontSize: "16px",
                            color: formData.date ? "#1f2937" : "#79747e",
                            backgroundColor: "transparent",
                          }}
                        >
                          {formData.date ? format(new Date(formData.date), "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" style={{ position: "absolute", right: "16px", top: "16px", width: "24px", height: "24px", color: "gray" }} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date ? new Date(formData.date) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              // Ensure we format it as YYYY-MM-DD for the form state
                              const formatted = format(date, "yyyy-MM-dd");
                              // Mock event object to reuse existing handler if needed, or update directly
                              // Since handleInputChange expects an event, checking if we can update directly.
                              // setFormData is available.
                              setFormData(prev => ({ ...prev, date: formatted }));
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px", zIndex: 10 }}>
                      Start Date
                    </span>
                    {formErrors.date && (
                      <span style={{ color: "red", fontSize: "12px" }}>{formErrors.date}</span>
                    )}
                  </div>

                  <div style={{ flex: "1 1 200px", position: "relative", minWidth: "150px" }}>
                    <input
                      type="text"
                      readOnly
                      style={{
                        height: "56px",
                        padding: "4px 16px",
                        border: "1px solid #79747e",
                        borderRadius: "4px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#1f2937",
                        cursor: "pointer"
                      }}
                      value={formData.time || ""}
                      onClick={() => setShowStartTimePicker(true)}
                      placeholder="HH:MM AM/PM"
                    />
                    <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                      Start Time
                    </span>
                    <ClockIcon style={{ position: "absolute", right: "16px", top: "16px", color: "gray", width: "24px", height: "24px", pointerEvents: "none" }} />
                    {formErrors.time && (
                      <span style={{ color: "red", fontSize: "12px" }}>{formErrors.time}</span>
                    )}
                    {showStartTimePicker && (
                      <TimePicker
                        initialTime={formData.time}
                        onTimeChange={(val) => handleTimeUpdate("time", val)}
                        onClose={() => setShowStartTimePicker(false)}
                      />
                    )}
                  </div>
                  <div style={{ flex: "1 1 200px", position: "relative", minWidth: "150px" }}>
                    <input
                      type="text"
                      readOnly
                      style={{
                        height: "56px",
                        padding: "4px 16px",
                        border: "1px solid #79747e",
                        borderRadius: "4px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#1f2937",
                        cursor: "pointer"
                      }}
                      value={formData.endTime || ""}
                      onClick={() => setShowEndTimePicker(true)}
                      placeholder="HH:MM AM/PM"
                    />
                    <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                      End Time
                    </span>
                    <ClockIcon style={{ position: "absolute", right: "16px", top: "16px", color: "gray", width: "24px", height: "24px", pointerEvents: "none" }} />
                    {formErrors.endTime && (
                      <span style={{ color: "red", fontSize: "12px" }}>{formErrors.endTime}</span>
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
                <div style={{ height: "24px" }}></div> {/* Line break */}
                {/* Venue, Google Maps URL Row */}
                <div className="form-row" style={{ display: "flex", alignItems: "flex-start", gap: "40px", width: "100%", flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 250px", position: "relative", minWidth: "250px" }}>
                    <input
                      style={{
                        height: "56px",
                        padding: "4px 16px",
                        border: "1px solid #79747e",
                        borderRadius: "4px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#1f2937"
                      }}
                      placeholder="Enter the full address or venue name"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                    />
                    <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                      Venue
                    </span>
                    {formErrors.venue && (
                      <span style={{ color: "red", fontSize: "12px" }}>{formErrors.venue}</span>
                    )}
                  </div>
                  <div style={{ flex: "1 1 250px", position: "relative", minWidth: "250px" }}>
                    <input
                      style={{
                        height: "56px",
                        padding: "4px 16px",
                        border: "1px solid #79747e",
                        borderRadius: "4px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#1f2937"
                      }}
                      placeholder="Enter the Google Maps link of the venue"
                      name="googleMapsUrl"
                      value={formData.googleMapsUrl}
                      onChange={handleInputChange}
                    />
                    <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                      Google Maps URL
                    </span>
                    {formErrors.googleMapsUrl && (
                      <span style={{ color: "red", fontSize: "12px" }}>{formErrors.googleMapsUrl}</span>
                    )}
                  </div>
                </div>
                <div style={{ height: "24px" }}></div> {/* Line break */}
                {/* Transport to Event, Entry Side Row */}
                <div className="form-row" style={{ display: "flex", alignItems: "flex-start", gap: "40px", width: "100%", flexWrap: "wrap" }}>
                  {/* Transport to Event input */}
                  <div style={{ flex: "1 1 250px", position: "relative", minWidth: "250px" }}>
                    <input
                      style={{
                        height: "56px",
                        padding: "4px 16px",
                        border: "1px solid #79747e",
                        borderRadius: "4px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#1f2937"
                      }}
                      placeholder="Describe how to reach the event"
                      name="transportToEvent"
                      value={formData.transportToEvent || ""}
                      onChange={handleInputChange}
                    />
                    <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                      Transport to Event
                    </span>
                    {formErrors.transportToEvent && (
                      <span style={{ color: "red", fontSize: "12px" }}>{formErrors.transportToEvent}</span>
                    )}
                  </div>
                  {/* Entry Side input */}
                  <div style={{ flex: "1 1 250px", position: "relative", minWidth: "250px" }}>
                    <input
                      style={{
                        height: "56px",
                        padding: "4px 16px",
                        border: "1px solid #79747e",
                        borderRadius: "4px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#1f2937"
                      }}
                      placeholder="Enter Entry Side details"
                      name="entrySide"
                      value={formData.entrySide || ""}
                      onChange={handleInputChange}
                    />
                    <span style={{ position: "absolute", top: "-12px", left: "-4px", padding: "0 4px", backgroundColor: "white", color: "#79747e", fontSize: "14px" }}>
                      Entry Side
                    </span>
                    {formErrors.entrySide && (
                      <span style={{ color: "red", fontSize: "12px" }}>{formErrors.entrySide}</span>
                    )}
                  </div>
                </div>
                <div style={{ height: "24px" }}></div> {/* Line break */}
                {/* Transport Availability Subheading and Options */}
                <div>
                  <span style={{ color: "#79747e", fontSize: "14px", marginBottom: "8px", display: "block", fontWeight: 600 }}>
                    Transport Availability
                  </span>
                  <div className="transport-options" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {TRANSPORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleTransportToggle(option.value)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "9999px",
                          fontSize: "12px",
                          backgroundColor: formData.transportOptions[option.value as keyof typeof formData.transportOptions] ? "#3b82f6" : "white",
                          color: formData.transportOptions[option.value as keyof typeof formData.transportOptions] ? "white" : "#7e7e7e",
                          border: "1px solid #7e7e7e",
                          cursor: "pointer"
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Event Highlights Section */}
      <div
        className="event-form-section"
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #7e7e7e",
          marginBottom: "32px"
        }}
      >
        <div style={{ width: containerWidth, backgroundColor: "white", borderRadius: "16px", border: "1px solid #7e7e7e" }}>
          <div
            onClick={() => toggleSection("event-highlights")}
            style={{
              padding: "30px 32px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "100%",
              cursor: "pointer"
            }}
          >
            <h3 style={{ fontSize: "24px", fontWeight: 500, color: "black" }}>
              Event Highlights
            </h3>
            {openSections["event-highlights"] ? (
              <ChevronUpIcon style={{ width: "24px", height: "24px" }} />
            ) : (
              <ChevronDownIcon style={{ width: "24px", height: "24px" }} />
            )}
          </div>
          {openSections["event-highlights"] && (
            <div style={{ padding: "0 32px 32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ width: "100%" }}>
                  <div style={{ position: "relative" }}>
                    <span style={{ color: "#79747e", fontSize: "14px", marginBottom: "8px", display: "block" }}>
                      Add Any Artists Attending the Event
                    </span>
                    {formData.artists.map((artist, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "12px" }}>
                        <div style={{ flex: 1 }}>
                          <input
                            style={{
                              height: "56px",
                              padding: "4px 16px",
                              border: "1px solid #79747e",
                              borderRadius: "4px",
                              width: "100%",
                              fontSize: "16px",
                              color: "#1f2937"
                            }}
                            placeholder="Artist Name"
                            value={artist.name}
                            onChange={(e) => updateArrayField("artists", index, "name", e.target.value)}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <input
                            style={{
                              height: "56px",
                              padding: "4px 16px",
                              border: "1px solid #79747e",
                              borderRadius: "4px",
                              width: "100%",
                              fontSize: "16px",
                              color: "#1f2937"
                            }}
                            placeholder="Genre of Artist"
                            value={artist.genre}
                            onChange={(e) => updateArrayField("artists", index, "genre", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
