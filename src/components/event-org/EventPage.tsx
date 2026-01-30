"use client";
import React, { useState, useEffect } from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  PartyPopperIcon,
} from "lucide-react";
import EventForm from './EventForm';
import TicketingForm from './TicketingForm';
import SponsorshipForm from './SponsorshipForm';
import FinalForm from './FinalForm';
import {
  INITIAL_EVENT_FORM_DATA,
  STEP_FIELDS,
  PROGRESS_STEPS,
  EventFormData
} from "@/lib/create-event-data";
import { validateEventForm } from './validateEventform';

// Map each step to the keys it validates
const stepFields = STEP_FIELDS;

interface EventPageProps {
  isDashboardMode?: boolean;
  startDirectly?: boolean;
}

const EventPage: React.FC<EventPageProps> = ({ isDashboardMode = false, startDirectly = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCreateEvent, setShowCreateEvent] = useState(startDirectly);

  useEffect(() => {
    if (startDirectly) {
      setShowCreateEvent(true);
    }
  }, [startDirectly]);
  const [formData, setFormData] = useState<EventFormData>(INITIAL_EVENT_FORM_DATA);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [additionalPhotos, setAdditionalPhotos] = useState<File[]>([]);
  const [additionalPhotoPreviews, setAdditionalPhotoPreviews] = useState<string[]>([]);
  const [additionalPhotosError, setAdditionalPhotosError] = useState("");
  const [openSections, setOpenSections] = useState({
    "event-info": true,
    "date-time": true,
    "event-highlights": true,
    "photo-media": true,
    // Add missing sections initialized in child forms or toggled
    "ticketing": true,
    "sponsorship": true,
    "requirements": true,
    "postEvent": true,
    "contactInfo": true,
    "audience": true,
    "guidelines": true,
    "addOns": true,
    "discounts": true
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof openSections],
    }));
  };

  const progressSteps = PROGRESS_STEPS.map((step, index) => ({
    ...step,
    active: currentStep >= index + 1
  }));

  const formRef = React.useRef<HTMLDivElement>(null);
  const mainContainerRef = React.useRef<HTMLDivElement>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("eventFormData");
    const savedStep = localStorage.getItem("eventFormCurrentStep");
    const savedSections = localStorage.getItem("eventFormOpenSections");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error("Failed to parse saved form data", error);
      }
    }

    if (savedStep) {
      try {
        const parsedStep = parseInt(savedStep, 10);
        if (!isNaN(parsedStep) && parsedStep >= 1 && parsedStep <= 4) {
          setCurrentStep(parsedStep);
        }
      } catch (error) {
        console.error("Failed to parse saved step", error);
      }
    }

    if (savedSections) {
      try {
        setOpenSections(JSON.parse(savedSections));
      } catch (error) {
        console.error("Failed to parse saved sections", error);
      }
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("eventFormData", JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Save step and sections separately immediately on change
  useEffect(() => {
    localStorage.setItem("eventFormCurrentStep", currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("eventFormOpenSections", JSON.stringify(openSections));
  }, [openSections]);



  // Robust finder for the scrollable container
  const getScrollContainer = (element: HTMLElement | null): HTMLElement | null => {
    // 1. Dashboard Mode: We know exactly where the scrollbar is (on the <main> tag)
    if (isDashboardMode) {
      const main = document.querySelector('main');
      if (main) return main as HTMLElement;
    }

    // 2. Standalone Mode: The internal ref should be the scroller
    if (mainContainerRef.current) {
      return mainContainerRef.current;
    }

    // 3. Fallback: Try to find any scrollable parent (useful if structure changes)
    if (!element) return document.documentElement;
    let parent = element.parentElement;
    while (parent) {
      const style = window.getComputedStyle(parent);
      const overflowY = style.overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
        return parent;
      }
      parent = parent.parentElement;
    }

    return document.documentElement;
  };

  // Custom smooth scroll function
  const smoothScrollTo = (target: HTMLElement, duration: number) => {
    const container = getScrollContainer(target);
    if (!container) return;

    const targetTop = target.getBoundingClientRect().top;
    const containerTop = container.getBoundingClientRect().top;
    const offset = 100; // Header + padding offset

    const relativeDistance = targetTop - containerTop - offset;
    const startPosition = container.scrollTop;
    const distance = relativeDistance;
    let startTime: number | null = null;

    // Safety check
    if (Math.abs(distance) < 5) return;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);

      if (container === document.documentElement || container === document.body) {
        window.scrollTo(0, run);
      } else {
        container.scrollTo(0, run);
      }

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    // easeInOutCubic - smoother than Quad
    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    requestAnimationFrame(animation);
  };

  const handleGetStarted = () => {
    setShowCreateEvent(true);
    // Double RAF ensures we wait for React render + Browser Paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (formRef.current) {
          smoothScrollTo(formRef.current, 1500);
        }
      });
    });
  };

  // Simplified scroll helper to ensure consistent "Scroll to Top" behavior for form navigation
  const scrollToFormTop = () => {
    if (formRef.current) {
      // Use native scrollIntoView for reliable upward scrolling
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      // Validate all fields
      const errors = validateEventForm(formData);
      setFormErrors(errors);

      if (Object.keys(errors).length > 0) {
        // Find which step the first error belongs to
        const errorFields = Object.keys(errors);
        let jumpStep = 1;
        for (let i = 0; i < stepFields.length; i++) {
          if (errorFields.some(field => stepFields[i].some(key => field.startsWith(key)))) {
            jumpStep = i + 1;
            break;
          }
        }
        setCurrentStep(jumpStep);
        // Scroll to top of form with smooth animation
        setTimeout(scrollToFormTop, 100);
        return;
      }
      // Submit or finish here
      alert("Form Submitted (Simulated)");
      console.log(formData);
      // Optionally clear localStorage on successful submission
      // localStorage.removeItem("eventFormData");
    } else {
      setCurrentStep(currentStep + 1);
      setFormErrors({});
      // Scroll to top of form section with smooth animation
      setTimeout(scrollToFormTop, 100);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of form section with smooth animation
      setTimeout(scrollToFormTop, 100);
    }
  };

  // Generalized helper for robust string path updates (used by handleInputChange and others)
  const updateNestedState = <T extends object>(prevState: T, path: string[], value: unknown): T => {
    const [head, ...tail] = path;
    const obj = prevState as Record<string, unknown>;
    if (tail.length === 0) {
      return { ...obj, [head]: value } as unknown as T;
    }
    return {
      ...obj,
      [head]: updateNestedState((obj[head] as object) || {}, tail, value)
    } as unknown as T;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement; // Cast to Input to access checked/files generally
    const { name, value, type } = target;
    const checked = target.checked;
    const files = target.files;

    if (name === "eventPhoto") {
      const file = files?.[0];
      if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type)) {
          setPhotoError("Please upload a JPG, PNG, or GIF file.");
          setPhotoPreview(null);
          setFormData((prev) => {
            return { ...prev, eventPhoto: null };
          });
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setPhotoError("File size must be less than 5MB.");
          setPhotoPreview(null);
          setFormData((prev) => {
            return { ...prev, eventPhoto: null };
          });
          return;
        }
        setPhotoError("");
        setFormData((prev) => {
          return { ...prev, eventPhoto: file };
        });
        setPhotoPreview(URL.createObjectURL(file));
      } else {
        setPhotoError("");
        setPhotoPreview(null);
        setFormData((prev) => {
          return { ...prev, eventPhoto: null };
        });
      }
    } else if (name === "additionalPhotos") {
      const filesArray = Array.from(files || []);
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const previews: string[] = [];
      const filteredFiles: File[] = [];
      let error = "";

      filesArray.forEach((file) => {
        if (!validTypes.includes(file.type)) {
          error = "Please upload only JPG, PNG, or GIF files.";
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          error = "Each file size must be less than 5MB.";
          return;
        }
        filteredFiles.push(file);
        previews.push(URL.createObjectURL(file));
      });

      setAdditionalPhotos(filteredFiles);
      setAdditionalPhotoPreviews(previews);
      setAdditionalPhotosError(error);
    } else if (name.startsWith("transport.") || name.startsWith("addOns.")) {
      // Handle nested booleans for checkboxes
      // name is like "transport.publicTransport" or "addOns.giftHampers"
      // Wait, original logic used `name.startsWith("transport.")`. 
      // But in EventForm, toggle helper is used for transport. 
      // This might be fallback or used by checkboxes.
      // Logic for checkboxes in general:
      const path = name.split('.'); // e.g. ["transport", "publicTransport"]
      setFormData(prev => updateNestedState(prev, path, checked));

      // Handle side effects for addOns
      if (name.startsWith("addOns.")) {
        // e.g. addOns.giftHampers
        // If checking fails, maybe clear description?
      }

    } else {
      // General case
      const path = name.split('.');
      setFormData(prev => updateNestedState(prev, path, type === "checkbox" ? checked : value));
    }
  };

  const handleTransportToggle = (transportKey: string) => {
    setFormData((prev) => ({
      ...prev,
      transportOptions: {
        ...prev.transportOptions,
        [transportKey]: !prev.transportOptions[transportKey as keyof typeof prev.transportOptions],
      },
    }));
  };

  const addArrayItem = (arrayName: string) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [
        ...(prev[arrayName as keyof EventFormData] as Record<string, unknown>[]),
        arrayName === "artists" ? { name: "", genre: "" } :
          arrayName === "chefGuests" ? { name: "", specialty: "" } :
            arrayName === "attractions" ? { name: "", description: "" } :
              arrayName === "audienceCategory" ? { category: "", price: "", description: "" } :
                { name: "", logo: null, details: "" },
      ],
    }));
  };

  const updateArrayField = (arrayName: string, index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: (prev[arrayName as keyof EventFormData] as Record<string, unknown>[]).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeArrayItem = (arrayName: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: ((prev[arrayName as keyof EventFormData] as Record<string, unknown>[]) || []).filter((_, i) => i !== index),
    }));
  };



  return (
    <div ref={mainContainerRef} style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: isDashboardMode ? "auto" : "100vh",
      backgroundColor: isDashboardMode ? "transparent" : "white",
      overflowY: isDashboardMode ? "visible" : "auto"
    }}>
      <div style={{ flexGrow: 1 }}>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "52px",
            width: "100%",
            backgroundColor: isDashboardMode ? "transparent" : "white",
            minHeight: isDashboardMode ? "auto" : "100vh"
          }}
        >
          {/* HEADER & HERO */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "52px", width: "100%" }}>
            {/* Header */}
            {/* Internal Header Removed to use Dashboard Layout Header */}
            {/* Hero */}
            {!startDirectly && (
              <section className="hero-section" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: "24px", padding: "60px 100px", width: "100%", backgroundColor: "white" }}>
                <h1 style={{ fontFamily: "Poppins, Helvetica", fontWeight: 600, color: "#101828", fontSize: "52px", lineHeight: "62.4px" }}>
                  Promote Your Event with Baatasari
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: "24px", width: "100%" }} className="event-hero-flex">
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "40px", flex: 1 }}>
                    <p style={{ width: "100%", maxWidth: "608px", fontFamily: "Poppins, Helvetica", fontWeight: 500, color: "#484848", fontSize: "18px", lineHeight: "normal" }}>
                      Are you an event planner eager to highlight amazing talent? Look
                      no further than Baatasari — the perfect blend of creativity and
                      opportunity! <br />
                      In just 5 minutes, you can complete our form, making sure every
                      detail is tailored to your needs. Let us assist you in
                      connecting with the ideal performers and audiences.
                    </p>
                    <p style={{ fontFamily: "Outfit, Helvetica", fontWeight: 500, color: "black", fontSize: "16px", lineHeight: "24px" }}>
                      Become part of our dynamic community and let your event shine at
                      thrilling gatherings, live shows, and tailored showcases. <br />
                      Ready to elevate your event? Just take 5 minutes to complete the
                      form below — our team will reach out to ensure you're fully
                      prepared. Your event deserves the spotlight. Let's create
                      something extraordinary!
                    </p>
                    <button
                      onClick={handleGetStarted}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "16px",
                        padding: "12px 32px",
                        backgroundColor: "#0c1d37",
                        borderRadius: "30px",
                        color: "white",
                        cursor: "pointer"
                      }}
                    >
                      <a href='#create'><span style={{ fontFamily: "Poppins, Helvetica", fontWeight: 500, fontSize: "16px", lineHeight: "normal" }}>
                        Get Started
                      </span></a>
                      <ChevronDownIcon style={{ width: "24px", height: "24px" }} />
                    </button>
                  </div>
                  <div className="hero-image-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "50px 32px", flex: 1 }}>
                    {/* Placeholder for Hero Image */}
                    <div style={{ width: "100%", maxWidth: "399px", height: "400px", backgroundColor: "#f0f0f0", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                      <PartyPopperIcon style={{ width: "100px", height: "100px", color: "#ccc" }} />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
          {/* FORM SECTION */}
          {showCreateEvent && (
            <div
              id='create'
              ref={formRef}
              className="event-form-container"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "1240px",
                alignItems: "center",
                gap: "72px",
                padding: "30px 16px", // Reduced padding for mobile consistency
                borderRadius: "20px",
                backgroundColor: "white",
                minHeight: "800px", // ensure explicit height
                scrollMarginTop: "100px" // Ensure header doesn't cover top when scrolling
              }}
              aria-hidden={!showCreateEvent}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <h2 style={{ fontSize: "28px", fontWeight: 700, color: "black" }}>Create Event</h2>
                </div>
                {/* Mobile Progress Header */}
                <div className="mobile-progress-header">
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0c1d37", margin: 0 }}>
                    {progressSteps[currentStep - 1]?.label}
                  </h3>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                    Step {currentStep} of {progressSteps.length}
                  </div>
                </div>

                {/* Progress steps (Desktop) */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "1000px",
                    height: "70px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0",
                  }}
                  role="progressbar"
                  aria-label={`Event creation progress, step ${currentStep} of 4`}
                  className="progress-bar desktop-progress-bar"
                >
                  {progressSteps.map((step, index) => (
                    <React.Fragment key={step.number}>
                      {/* Step circle */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          minWidth: "80px",
                          zIndex: 2,
                        }}
                      >
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `2px solid ${step.active ? "#0c1d37" : "#a7c2df"}`,
                            backgroundColor: index + 1 < currentStep ? "#0c1d37" : (step.active ? "white" : "#f5f5f5"),
                            position: "relative",
                            zIndex: 2,
                            color: index + 1 < currentStep ? "#fff" : (step.active ? "#0c1d37" : "#a7c2df"),
                            transition: "background 0.2s"
                          }}
                        >
                          {index + 1 < currentStep ? (
                            // Filled circle with white tick
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0Z" fill="#0c1d37" />
                              <path d="M6 10.5L9 13.5L14 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            // Current or upcoming step: show number
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: step.active ? "#0c1d37" : "#a7c2df"
                              }}
                            >
                              {step.number}
                            </span>
                          )}
                        </div>
                        <span
                          style={{
                            marginTop: "12px",
                            textAlign: "center",
                            fontSize: "16px",
                            color: step.active ? "#0c1d37" : "#a7c2df",
                            maxWidth: "100px",
                            wordWrap: "break-word"
                          }}
                        >
                          {step.label}
                        </span>
                      </div>
                      {/* Connector line */}
                      {index < progressSteps.length - 1 && (
                        <div
                          style={{
                            flex: 1,
                            height: "4px",
                            background:
                              index + 1 < currentStep
                                ? "#0c1d37"
                                : "#a7c2df",
                            margin: "0 0px 0 0px",
                            minWidth: "24px",
                            maxWidth: "100%",
                            zIndex: 1,
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {/* Conditional Rendering of Form Sections */}
              <div style={{ width: "100%" }}>
                {currentStep === 1 && (
                  <EventForm
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    photoPreview={photoPreview}
                    setPhotoPreview={setPhotoPreview}
                    photoError={photoError}
                    setPhotoError={setPhotoError}
                    additionalPhotos={additionalPhotos}
                    setAdditionalPhotos={setAdditionalPhotos}
                    additionalPhotoPreviews={additionalPhotoPreviews}
                    setAdditionalPhotoPreviews={setAdditionalPhotoPreviews}
                    additionalPhotosError={additionalPhotosError}
                    setAdditionalPhotosError={setAdditionalPhotosError}
                    handleTransportToggle={handleTransportToggle}
                    addArrayItem={addArrayItem}
                    updateArrayField={updateArrayField}
                    openSections={openSections}
                    toggleSection={toggleSection}
                    formErrors={formErrors}
                  />
                )}
                {currentStep === 2 && (
                  <TicketingForm
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    addArrayItem={addArrayItem}
                    updateArrayField={updateArrayField}
                    removeArrayItem={removeArrayItem}
                    openSections={openSections}
                    toggleSection={toggleSection}
                    formErrors={formErrors}
                  // handlePrevious not needed as prop in TicketingForm usually, but passed just in case
                  />
                )}
                {currentStep === 3 && (
                  <SponsorshipForm
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    openSections={openSections}
                    toggleSection={toggleSection}
                    formErrors={formErrors}
                  />
                )}
                {currentStep === 4 && (
                  <FinalForm
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    // FinalForm uses internal generalized array updates or specific handlers
                    // Passing generalized ones if needed

                    formErrors={formErrors}
                  />
                )}
              </div>
            </div>
          )}
        </section>
      </div>
      {/* Navigation Section */}
      {showCreateEvent && (
        <div style={{ display: "flex", justifyContent: "center", padding: "8px 7%", backgroundColor: "white" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "800px",
            marginTop: "32px",
            paddingBottom: "100px" // Extra padding for mobile bottom nav
          }}>
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                backgroundColor: currentStep === 1 ? "#f3f4f6" : "white",
                color: currentStep === 1 ? "#9ca3af" : "#374151",
                cursor: currentStep === 1 ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: 500,
                visibility: currentStep === 1 ? "hidden" : "visible"
              }}
            >
              <ArrowLeftIcon size={20} />
              Previous
            </button>
            <button
              onClick={handleNext}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 32px",
                borderRadius: "8px",
                backgroundColor: "#0c1d37",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 500,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              }}
            >
              {currentStep === 4 ? "Submit" : "Proceed"}
              {currentStep !== 4 && <ArrowRightIcon size={20} />}
            </button>
          </div>
        </div>
      )}

      {/* Global localized styles in component */}
      <style key="responsive-styles">{`
        /* Responsive header and hero */
        @media (max-width: 1200px) {
          section[style*="padding: 60px 100px"] {
            padding: 40px 4vw !important;
          }
          .event-hero-flex {
            flex-direction: column !important;
            gap: 32px !important;
          }
          .event-hero-flex > div {
            width: 100% !important;
            max-width: 100vw !important;
          }
        }
        @media (max-width: 900px) {
          .event-hero-flex {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .event-hero-flex > div {
            width: 100% !important;
            max-width: 100vw !important;
            padding: 0 !important;
          }
          h1 {
            font-size: 32px !important;
            line-height: 40px !important;
          }
          .event-form-container {
            padding: 16px 4vw !important;
            border-radius: 12px !important;
            gap: 32px !important;
          }
          .progress-bar {
            max-width: 98vw !important;
            min-width: 0 !important;
            height: 56px !important;
          }
          /* Form row stacking for tablet */
          .form-row {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .form-row > div {
            width: 100% !important;
            min-width: 0 !important;
            flex: 1 1 100% !important;
          }
        }
        @media (max-width: 700px) {
          section[style*="padding: 60px 100px"] {
            padding: 24px 2vw !important;
            min-height: auto !important;
          }
          h1 {
            font-size: 22px !important;
            line-height: 28px !important;
          }
          .event-form-container {
            padding: 8px 2vw !important;
            border-radius: 8px !important;
            gap: 18px !important;
          }
          .progress-bar {
            max-width: 100vw !important;
            min-width: 0 !important;
            height: auto !important;
            padding: 8px !important;
            margin-bottom: 16px !important;
          }
          .progress-bar > div {
            min-width: 60px !important;
          }
          .progress-bar > div > div:first-child {
            width: 28px !important;
            height: 28px !important;
          }
          .progress-bar > div > span {
            font-size: 11px !important;
            max-width: 70px !important;
          }
          /* Create Event header */
          .event-form-container h2 {
            font-size: 22px !important;
          }
          .event-hero-flex {
            gap: 12px !important;
          }
          .event-hero-flex > div {
            padding: 0 !important;
          }
          /* Form card responsiveness */
          .card {
            padding: 12px !important;
          }
          /* Input field responsiveness */
          input, textarea, select {
            font-size: 14px !important;
            padding: 8px 12px !important;
          }
          /* Button responsiveness */
          button {
            padding: 8px 16px !important;
            font-size: 13px !important;
          }
          /* Time picker popup */
          div[style*="width: 280px"] {
            width: 240px !important;
            padding: 12px !important;
          }
        }
          /* Mobile Simplification */
          .mobile-progress-header {
            display: none;
            text-align: center;
            margin-bottom: 24px;
            width: 100%;
          }
          .desktop-progress-bar {
            display: flex;
          }

        @media (max-width: 768px) {
          .mobile-progress-header {
            display: flex !important;
            flex-direction: column;
            align-items: center;
          }
          .desktop-progress-bar {
            display: none !important;
          }
          /* Ensure form container padding is comfortable */
          .event-form-container {
             padding-top: 24px !important;
          }
        }
        
          @media (max-width: 480px) {
          /* Hero section - completely left aligned */
          .hero-section {
            padding: 16px 8px 16px 8px !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }
          .hero-section * {
            text-align: left !important;
          }
          .hero-section h1 {
            padding: 0 !important;
            margin: 0 0 16px 0 !important;
          }
          .hero-section p {
            padding: 0 !important;
            margin: 0 0 12px 0 !important;
            max-width: 100% !important;
          }
          .hero-section div {
            padding-left: 0 !important;
            margin-left: 0 !important;
          }
          section[style*="padding: 60px 100px"] {
            padding: 16px 8px !important;
          }
          /* HIDE notification and search icons on mobile */
          .header-notification,
          .header-search {
            display: none !important;
          }
          /* HIDE hero image on mobile */
          .hero-image-container {
            display: none !important;
          }
          /* LEFT-ALIGN all text on mobile */
          section, section div, section p, section span, section h1, section h2 {
            text-align: left !important;
            align-items: flex-start !important;
          }
          h1, h2, h3, p {
            text-align: left !important;
            padding-left: 0 !important;
            margin-left: 0 !important;
          }
          /* Hero section heading */
          h1 {
            font-size: 24px !important;
            line-height: 32px !important;
            text-align: left !important;
            padding-left: 0 !important;
          }
          /* Hero section subtext/description */
          section p, section span {
            font-size: 15px !important;
            line-height: 1.5 !important;
            text-align: left !important;
            padding-left: 0 !important;
            margin-left: 0 !important;
          }
          /* All h2 headings */
          h2 {
            font-size: 20px !important;
            text-align: left !important;
          }
          /* All h3 headings */
          h3 {
            font-size: 18px !important;
            text-align: left !important;
          }
          /* Get Started button text */
          section button span {
            font-size: 15px !important;
          }
          /* Hero flex container should take full width and align left */
          .event-hero-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            padding-left: 0 !important;
            margin-left: 0 !important;
          }
          .event-hero-flex > div:first-child {
            width: 100% !important;
            align-items: flex-start !important;
            padding-left: 0 !important;
            margin-left: 0 !important;
          }
          /* Entire section should align left */
          section {
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }
          section > div {
            align-items: flex-start !important;
            padding-left: 0 !important;
            margin-left: 0 !important;
          }
          .event-form-container {
            padding: 2px 1vw !important;
            border-radius: 4px !important;
            gap: 8px !important;
          }
          .progress-bar {
            max-width: 100vw !important;
            min-width: 0 !important;
            height: 28px !important;
          }
          /* Form card responsiveness */
          .card {
            padding: 12px !important;
            border-radius: 8px !important;
          }
          /* Create Event header */
          .event-form-container h2 {
            font-size: 22px !important;
            margin-bottom: 16px !important;
          }
          /* Section headers in cards */
          .card h3, h3 {
            font-size: 18px !important;
          }
          /* Labels */
          label {
            font-size: 14px !important;
          }
          /* Progress bar on mobile */
          .progress-bar {
            flex-direction: column !important;
            height: auto !important;
            gap: 12px !important;
            padding: 16px 12px !important;
            margin-bottom: 24px !important;
          }
          .progress-bar > div {
            flex-direction: row !important;
            min-width: 100% !important;
            justify-content: flex-start !important;
            gap: 12px !important;
          }
          .progress-bar > div > div:first-child {
            width: 32px !important;
            height: 32px !important;
            min-width: 32px !important;
          }
          .progress-bar > div > span {
            margin-top: 0 !important;
            text-align: left !important;
            font-size: 14px !important;
          }
          /* Hide connector lines on mobile */
          .progress-bar > div[style*="height: 4px"] {
            display: none !important;
          }
          /* All flex containers should stack */
          div[style*="display: flex"][style*="align-items"] {
            flex-wrap: wrap !important;
          }
          /* Input field responsiveness */
          input, textarea, select {
            font-size: 16px !important;
            height: auto !important;
            min-height: 48px !important;
            padding: 12px !important;
          }
          /* Button responsiveness */
          button {
            padding: 10px 16px !important;
            font-size: 14px !important;
          }
          /* Sponsor/stall input groups */
          div[style*="display: flex"][style*="gap: 12px"] {
            flex-direction: column !important;
            gap: 12px !important;
          }
          /* Time picker popup */
          div[style*="width: 280px"],
          div[style*="width: 240px"] {
            width: 260px !important;
            padding: 16px !important;
          }
          /* Progress step labels - keep readable */
          span[style*="font-size: 14px"] {
            font-size: 14px !important;
          }
          /* Prev/Next buttons */
          div[style*="justify-content: space-between"] button {
            padding: 12px 20px !important;
            gap: 8px !important;
            font-size: 14px !important;
          }
          /* Form container spacing */
          .event-form-container {
            gap: 24px !important;
            padding: 16px 12px !important;
          }
          /* BASE FONT SIZE - make all text bigger */
          .event-form-container {
            font-size: 16px !important;
          }
          /* All paragraph text */
          p {
            font-size: 15px !important;
            line-height: 1.5 !important;
          }
          /* All span text */
          span {
            font-size: 14px !important;
          }
          /* Floating labels above inputs */
          span[style*="position: absolute"][style*="top:"] {
            font-size: 13px !important;
          }
          /* Description/helper text */
          p[style*="fontSize: 14px"],
          p[style*="font-size: 14px"] {
            font-size: 14px !important;
          }
          /* List items */
          li {
            font-size: 15px !important;
          }
          /* Option text in selects */
          option {
            font-size: 16px !important;
          }
          /* Placeholder text */
          ::placeholder {
            font-size: 15px !important;
          }
          /* Error messages */
          span[style*="color: red"] {
            font-size: 13px !important;
          }
          /* Small helper text - keep it readable */
          span[style*="fontSize: 11px"],
          span[style*="font-size: 11px"],
          span[style*="fontSize: 12px"],
          span[style*="font-size: 12px"] {
            font-size: 12px !important;
          }
          /* Transport options wrapping */
          .transport-options {
            flex-wrap: wrap !important;
            gap: 8px !important;
          }
          .transport-options button {
            padding: 8px 12px !important;
            font-size: 12px !important;
          }

          /* Hide the huge gap spacer or adjust it */
          
          .hero-section {
            padding: 40px 24px !important;
            gap: 32px !important;
          }
          
          .event-hero-flex {
            flex-direction: column !important;
            gap: 32px !important;
          }
          
          .hero-image-container {
            padding: 0 !important;
            width: 100% !important;
          }

          .event-form-container {
            padding: 32px 24px !important;
            gap: 32px !important;
            min-height: auto !important;
          }

          /* FONT SCALING FIXES */
          /* Target the specific heavy fonts to "zoom out" visually */
          .hero-section h1 {
            font-size: 32px !important;
            line-height: 1.2 !important;
          }
          .hero-section p {
            font-size: 15px !important;
            line-height: 1.5 !important;
            max-width: 100% !important;
          }
          .hero-section span {
             font-size: 14px !important;
          }
          
          /* Form Headers */
          h2[style*="fontSize: 28px"], 
          h2[style*="font-size: 28px"] {
             font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EventPage;
