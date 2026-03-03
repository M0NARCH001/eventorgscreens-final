"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "lucide-react";
import Image from "next/image";

import EventForm from "./EventForm";
import TicketingForm from "./TicketingForm";
import SponsorshipForm from "./SponsorshipForm";
import FinalForm from "./FinalForm";

import {
  INITIAL_EVENT_FORM_DATA,
  STEP_FIELDS,
  PROGRESS_STEPS,
  EventFormData,
} from "@/lib/create-event-data";

import { validateEventForm } from "./validateEventform";
import styles from "./EventPage.module.css";

const stepFields = STEP_FIELDS;

interface EventPageProps {
  isDashboardMode?: boolean;
  startDirectly?: boolean;
  action?: string | null;
}

const SCROLL_OFFSET = 100;

function getScrollContainer(
  target: HTMLElement | null,
  mainContainerRef: React.RefObject<HTMLDivElement | null>,
  isDashboardMode: boolean
): HTMLElement | Window {
  if (isDashboardMode) {
    // In dashboard mode, scroll directly on window since the main element
    // doesn't have overflow: auto and isn't the actual scroll container
    return window;
  }

  if (mainContainerRef.current) return mainContainerRef.current;

  // Fallback to window
  return window;
}

// Calculate absolute scrollTop target in the container’s coordinate system
function getTargetScrollTop(container: HTMLElement | Window, target: HTMLElement, offset = 0) {
  if (container === window) {
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    return Math.max(0, y);
  }

  const el = container as HTMLElement;

  // target position in viewport + current container scroll - container top in viewport
  const y =
    target.getBoundingClientRect().top -
    el.getBoundingClientRect().top +
    el.scrollTop -
    offset;

  return Math.max(0, y);
}

// Custom smooth scroll using RAF for consistent animation
function smoothScrollTo(container: HTMLElement | Window, top: number, duration = 600) {
  const start = container === window ? window.scrollY : (container as HTMLElement).scrollTop;
  const distance = top - start;
  if (Math.abs(distance) < 2) return;

  let startTime: number | null = null;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (time: number) => {
    if (startTime === null) startTime = time;
    const progress = Math.min(1, (time - startTime) / duration);
    const y = start + distance * easeInOutCubic(progress);

    if (container === window) {
      window.scrollTo(0, y);
    } else {
      (container as HTMLElement).scrollTop = y;
    }

    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

const EventPage: React.FC<EventPageProps> = ({
  isDashboardMode = false,
  startDirectly = false,
  action = null,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCreateEvent, setShowCreateEvent] = useState(startDirectly);

  useEffect(() => {
    if (startDirectly) setShowCreateEvent(true);
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
    ticketing: true,
    sponsorship: true,
    requirements: true,
    postEvent: true,
    contactInfo: true,
    audience: true,
    guidelines: true,
    addOns: true,
    discounts: true,
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
    active: currentStep >= index + 1,
  }));

  const formRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Load saved state
  useEffect(() => {
    const savedData = localStorage.getItem("eventFormData");
    const savedStep = localStorage.getItem("eventFormCurrentStep");
    const savedSections = localStorage.getItem("eventFormOpenSections");

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (action === "reschedule" || action === "repeat") {
          parsedData.date = "";
          parsedData.endDate = "";
          parsedData.time = "";
          parsedData.endTime = "";
        }
        setFormData((prev) => ({ ...prev, ...parsedData }));
      } catch { }
    }

    if (savedStep) {
      const parsedStep = parseInt(savedStep, 10);
      if (!isNaN(parsedStep) && parsedStep >= 1 && parsedStep <= 4) {
        setCurrentStep(parsedStep);
      }
    }

    if (savedSections) {
      try {
        setOpenSections(JSON.parse(savedSections));
      } catch { }
    }
  }, []);

  // Persist form data (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem("eventFormData", JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(t);
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("eventFormCurrentStep", currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("eventFormOpenSections", JSON.stringify(openSections));
  }, [openSections]);

  // When the form becomes visible, scroll to it once (reliable)
  useLayoutEffect(() => {
    if (!showCreateEvent) return;
    if (!formRef.current) return;

    const container = getScrollContainer(formRef.current, mainContainerRef, isDashboardMode);
    const top = getTargetScrollTop(container, formRef.current, SCROLL_OFFSET);

    // Slight delay helps when CSS/layout transitions exist
    requestAnimationFrame(() => {
      smoothScrollTo(container, top, 450);
    });
  }, [showCreateEvent, isDashboardMode]);

  const handleGetStarted = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowCreateEvent(true);
  };

  const scrollToFormTop = () => {
    if (!formRef.current) return;
    const container = getScrollContainer(formRef.current, mainContainerRef, isDashboardMode);
    const top = getTargetScrollTop(container, formRef.current, SCROLL_OFFSET);
    smoothScrollTo(container, top, 350);
  };

  const handleNext = () => {
    if (currentStep === 4) {
      const errors = validateEventForm(formData);
      setFormErrors(errors);

      if (Object.keys(errors).length > 0) {
        const errorFields = Object.keys(errors);
        let jumpStep = 1;
        for (let i = 0; i < stepFields.length; i++) {
          if (errorFields.some((field) => stepFields[i].some((key) => field.startsWith(key)))) {
            jumpStep = i + 1;
            break;
          }
        }
        setCurrentStep(jumpStep);
        setTimeout(scrollToFormTop, 0);
        return;
      }

      alert("Form Submitted (Simulated)");
      console.log(formData);
      return;
    }

    setCurrentStep((s) => s + 1);
    setFormErrors({});
    setTimeout(scrollToFormTop, 0);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      setTimeout(scrollToFormTop, 0);
    }
  };

  const updateNestedState = <T extends object,>(
    prevState: T,
    path: string[],
    value: unknown
  ): T => {
    const [head, ...tail] = path;
    const obj = prevState as Record<string, unknown>;
    if (tail.length === 0) return { ...obj, [head]: value } as unknown as T;

    return {
      ...obj,
      [head]: updateNestedState((obj[head] as object) || {}, tail, value),
    } as unknown as T;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
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
          setFormData((prev) => ({ ...prev, eventPhoto: null }));
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          setPhotoError("File size must be less than 5MB.");
          setPhotoPreview(null);
          setFormData((prev) => ({ ...prev, eventPhoto: null }));
          return;
        }
        setPhotoError("");
        setFormData((prev) => ({ ...prev, eventPhoto: file }));
        setPhotoPreview(URL.createObjectURL(file));
      } else {
        setPhotoError("");
        setPhotoPreview(null);
        setFormData((prev) => ({ ...prev, eventPhoto: null }));
      }
      return;
    }

    if (name === "additionalPhotos") {
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
      return;
    }

    if (name.startsWith("transport.") || name.startsWith("addOns.")) {
      const path = name.split(".");
      setFormData((prev) => updateNestedState(prev, path, checked));
      return;
    }

    const path = name.split(".");
    setFormData((prev) =>
      updateNestedState(prev, path, type === "checkbox" ? checked : value)
    );
  };

  const handleTransportToggle = (transportKey: string) => {
    setFormData((prev) => ({
      ...prev,
      transportOptions: {
        ...prev.transportOptions,
        [transportKey]:
          !prev.transportOptions[transportKey as keyof typeof prev.transportOptions],
      },
    }));
  };

  const addArrayItem = (arrayName: string) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [
        ...(prev[arrayName as keyof EventFormData] as Record<string, unknown>[]),
        arrayName === "artists"
          ? { name: "", genre: "" }
          : arrayName === "chefGuests"
            ? { name: "", specialty: "" }
            : arrayName === "attractions"
              ? { name: "", description: "" }
              : arrayName === "audienceCategory"
                ? { category: "", price: "", description: "" }
                : { name: "", logo: null, details: "" },
      ],
    }));
  };

  const updateArrayField = (arrayName: string, index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: (prev[arrayName as keyof EventFormData] as Record<string, unknown>[]).map(
        (item, i) => (i === index ? { ...item, [field]: value } : item)
      ),
    }));
  };

  const removeArrayItem = (arrayName: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: (
        (prev[arrayName as keyof EventFormData] as Record<string, unknown>[]) || []
      ).filter((_, i) => i !== index),
    }));
  };

  return (
    <div
      ref={mainContainerRef}
      className={[
        styles.page,
        isDashboardMode ? styles.pageDashboard : styles.pageStandalone,
      ].join(" ")}
    >
      <div className={styles.pageBody}>
        <section className={[styles.shell, isDashboardMode ? styles.shellDashboard : ""].join(" ")}>
          <div className={styles.headerBlock}>
            {!startDirectly && (
              <section className={styles.heroSection}>
                <h1 className={styles.heroTitle}>Promote Your Event with Baatasari</h1>

                <div className={styles.heroFlex}>
                  <div className={styles.heroLeft}>
                    <p className={styles.heroP1}>
                      Are you an event planner eager to highlight amazing talent? Look no further than
                      Baatasari — the perfect blend of creativity and opportunity!
                      <br />
                      In just 5 minutes, you can complete our form, making sure every detail is tailored
                      to your needs. Let us assist you in connecting with the ideal performers and
                      audiences.
                    </p>

                    <p className={styles.heroP2}>
                      Become part of our dynamic community and let your event shine at thrilling
                      gatherings, live shows, and tailored showcases.
                      <br />
                      Ready to elevate your event? Just take 5 minutes to complete the form below — our
                      team will reach out to ensure you&apos;re fully prepared. Your event deserves the
                      spotlight. Let&apos;s create something extraordinary!
                    </p>

                    <a href="#create" onClick={handleGetStarted} className={styles.getStartedBtn}>
                      <span className={styles.getStartedText}>Get Started</span>
                      <ChevronDownIcon className={styles.getStartedIcon} />
                    </a>
                  </div>

                  <div className={styles.heroImageContainer}>
                    <div className={styles.heroImagePlaceholder} style={{ position: "relative", background: "transparent", padding: 0 }}>
                      <Image
                        src="/event_hero_landing.png"
                        alt="Event celebration with crowd and stage"
                        fill
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {showCreateEvent && (
            <div id="create" ref={formRef} className={styles.formContainer} aria-hidden={!showCreateEvent}>
              <div className={styles.formHeaderBlock}>
                <div className={styles.formHeaderRow}>
                  <h2 className={styles.formTitle}>Create Event</h2>
                </div>

                <div className={styles.mobileProgressHeader}>
                  <h3 className={styles.mobileStepTitle}>{progressSteps[currentStep - 1]?.label}</h3>
                  <div className={styles.mobileStepMeta}>
                    Step {currentStep} of {progressSteps.length}
                  </div>
                </div>

                <div
                  className={styles.desktopProgressBar}
                  role="progressbar"
                  aria-label={`Event creation progress, step ${currentStep} of 4`}
                >
                  {progressSteps.map((step, index) => {
                    const done = index + 1 < currentStep;
                    const active = step.active;

                    return (
                      <React.Fragment key={step.number}>
                        <div
                          className={styles.stepItem}
                          onClick={() => {
                            setCurrentStep(Number(step.number));
                            setTimeout(scrollToFormTop, 0);
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setCurrentStep(Number(step.number));
                              setTimeout(scrollToFormTop, 0);
                            }
                          }}
                        >
                          <div
                            className={[
                              styles.stepCircle,
                              active ? styles.stepCircleActive : "",
                              done ? styles.stepCircleDone : "",
                            ].join(" ")}
                          >
                            {done ? (
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <path
                                  d="M6 10.5L9 13.5L14 8.5"
                                  stroke="#fff"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <span style={{ fontSize: 14, fontWeight: 500 }}>{step.number}</span>
                            )}
                          </div>

                          <span className={[styles.stepLabel, active ? styles.stepLabelActive : ""].join(" ")}>
                            {step.label}
                          </span>
                        </div>

                        {index < progressSteps.length - 1 && (
                          <div className={[styles.connector, done ? styles.connectorDone : ""].join(" ")} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              <div className={styles.formStage}>
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
                    formErrors={formErrors}
                  />
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {showCreateEvent && (
        <div className={styles.navOuter}>
          <div className={styles.navInner}>
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={[styles.prevBtn, currentStep === 1 ? styles.prevBtnDisabled : ""].join(" ")}
            >
              <ArrowLeftIcon size={20} />
              Previous
            </button>

            <button onClick={handleNext} className={styles.nextBtn}>
              {currentStep === 4 ? "Submit" : "Proceed"}
              {currentStep !== 4 && <ArrowRightIcon size={20} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
