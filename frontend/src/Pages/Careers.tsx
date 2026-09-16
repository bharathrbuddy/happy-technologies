import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import {
  ArrowRight,
  Search,
  Code2,
  X,
  Upload,
  CheckCircle2,
  Share2,
} from 'lucide-react';

import { Helmet } from 'react-helmet-async';

import { careerOpenings } from '../data/siteData';


const icons = {
  'frontend-manager': Code2,
  'web-developer': Code2,
  'seo-specialist': Search,
};


const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://happy-technologies-backend.onrender.com';


const MAX_FILE_SIZE = 5 * 1024 * 1024;


const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];


const ALLOWED_EXTENSIONS = [
  '.pdf',
  '.doc',
  '.docx',
];


type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  experience?: string;
  resume?: string;
  submit?: string;
};


export default function Careers() {

  const [selectedJob, setSelectedJob] =
    useState<string | null>(null);

  const [resume, setResume] =
    useState<File | null>(null);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isSuccess, setIsSuccess] =
    useState(false);

  const resumeInputRef =
    useRef<HTMLInputElement>(null);


  /*
   * Share individual job
   */

  const handleShare = async (
    jobTitle: string
  ) => {

    const shareData = {
      title:
        `${jobTitle} - Happy Technologies`,

      text:
        `Check out this ${jobTitle} opportunity at Happy Technologies.`,

      url:
        window.location.href,
    };


    try {

      if (
        typeof navigator.share === 'function'
      ) {

        if (
          typeof navigator.canShare !== 'function' ||
          navigator.canShare(shareData)
        ) {

          await navigator.share(
            shareData
          );

          return;

        }

      }


      await navigator.clipboard.writeText(
        window.location.href
      );


      alert(
        'Job link copied to clipboard!'
      );


    } catch (error) {

      if (
        error instanceof DOMException &&
        error.name === 'AbortError'
      ) {

        return;

      }


      console.error(
        'Share failed:',
        error
      );


      try {

        await navigator.clipboard.writeText(
          window.location.href
        );


        alert(
          'Job link copied to clipboard!'
        );


      } catch {

        alert(
          'Unable to share this job.'
        );

      }

    }

  };


  /*
   * Open resume picker
   */

  const handleUploadClick = () => {

    if (!isSubmitting) {

      resumeInputRef.current?.click();

    }

  };


  /*
   * Resume validation
   */

  const handleResumeChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];


    setErrors((previous) => ({
      ...previous,
      resume: undefined,
    }));


    if (!file) {

      setResume(null);

      return;

    }


    const fileName =
      file.name.toLowerCase();


    const hasValidExtension =
      ALLOWED_EXTENSIONS.some(
        (extension) =>
          fileName.endsWith(extension)
      );


    const hasValidMimeType =
      ALLOWED_FILE_TYPES.includes(
        file.type
      );


    if (
      !hasValidExtension ||
      !hasValidMimeType
    ) {

      setResume(null);


      setErrors((previous) => ({
        ...previous,
        resume:
          'Please upload a PDF, DOC or DOCX file.',
      }));


      event.target.value = '';


      return;

    }


    if (file.size > MAX_FILE_SIZE) {

      setResume(null);


      setErrors((previous) => ({
        ...previous,
        resume:
          'Resume size must be less than 5MB.',
      }));


      event.target.value = '';


      return;

    }


    setResume(file);

  };


  /*
   * Validate form
   */

  const validateForm = (
    form: HTMLFormElement
  ): FormErrors => {

    const formData =
      new FormData(form);


    const name =
      String(
        formData.get('name') || ''
      ).trim();


    const email =
      String(
        formData.get('email') || ''
      ).trim();


    const phone =
      String(
        formData.get('phone') || ''
      ).trim();


    const company =
      String(
        formData.get('company') || ''
      ).trim();


    const experience =
      String(
        formData.get('experience') || ''
      ).trim();


    const validationErrors:
      FormErrors = {};


    /*
     * Name
     */

    if (!name) {

      validationErrors.name =
        'Please enter your name.';

    } else if (name.length < 2) {

      validationErrors.name =
        'Name must contain at least 2 characters.';

    } else if (name.length > 60) {

      validationErrors.name =
        'Name cannot exceed 60 characters.';

    } else if (
      !/^[A-Za-zÀ-ÖØ-öø-ÿ.'\-\s]+$/.test(
        name
      )
    ) {

      validationErrors.name =
        'Please enter a valid name.';

    }


    /*
     * Email
     */

    if (!email) {

      validationErrors.email =
        'Please enter your email address.';

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
        email
      )
    ) {

      validationErrors.email =
        'Please enter a valid email address.';

    }


    /*
     * Phone
     */

    const normalizedPhone =
      phone.replace(
        /[\s()-]/g,
        ''
      );


    if (!phone) {

      validationErrors.phone =
        'Please enter your phone number.';

    } else if (
      !/^\+?[1-9]\d{9,14}$/.test(
        normalizedPhone
      )
    ) {

      validationErrors.phone =
        'Please enter a valid phone number.';

    }


    /*
     * Company - optional
     */

    if (company.length > 100) {

      validationErrors.company =
        'Company name cannot exceed 100 characters.';

    }


    /*
     * Experience
     */

    if (!experience) {

      validationErrors.experience =
        'Please enter your experience.';

    } else if (
      !/^(?:0|[1-4]?\d|50)(?:\.\d{1,2})?(?:\s*(?:years?|yrs?))?$/i.test(
        experience
      )
    ) {

      validationErrors.experience =
        'Please enter valid experience, e.g. 5 years.';

    }


    /*
     * Resume
     */

    if (!resume) {

      validationErrors.resume =
        'Please upload your resume.';

    }


    return validationErrors;

  };


  /*
   * Submit application
   */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    if (isSubmitting) {

      return;

    }


    const form =
      event.currentTarget;


    setErrors({});

    setIsSuccess(false);


    /*
     * Validate
     */

    const validationErrors =
      validateForm(form);


    if (
      Object.keys(validationErrors).length > 0
    ) {

      setErrors(validationErrors);

      return;

    }


    if (!resume) {

      setErrors({
        resume:
          'Please upload your resume.',
      });

      return;

    }


    try {

      setIsSubmitting(true);


      /*
       * FormData automatically includes
       * text fields + selected resume.
       */

      const formData =
        new FormData(form);


      const response =
        await fetch(
          `${API_URL}/api/career`,
          {
            method: 'POST',
            body: formData,
          }
        );


      let result: {
        success?: boolean;
        message?: string;
      };


      try {

        result =
          await response.json();

      } catch {

        throw new Error(
          'Unexpected response from server.'
        );

      }


      if (
        !response.ok ||
        !result.success
      ) {

        throw new Error(
          result.message ||
            'Unable to submit application.'
        );

      }


      /*
       * Success
       */

      setIsSuccess(true);


      /*
       * Wait briefly so user sees
       * success message before closing.
       */

      setTimeout(() => {

        setSelectedJob(null);

        setResume(null);

        setErrors({});

        setIsSuccess(false);


        if (resumeInputRef.current) {

          resumeInputRef.current.value = '';

        }

      }, 1800);


    } catch (error) {

      console.error(
        'Career application error:',
        error
      );


      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : 'Unable to submit your application. Please try again.',
      });


    } finally {

      setIsSubmitting(false);

    }

  };


  /*
   * Open application
   */

  const handleApply = (
    jobTitle: string
  ) => {

    setSelectedJob(jobTitle);

    setResume(null);

    setErrors({});

    setIsSuccess(false);


    if (resumeInputRef.current) {

      resumeInputRef.current.value = '';

    }

  };


  /*
   * Close application
   */

  const handleCloseModal = () => {

    if (isSubmitting) {

      return;

    }


    setSelectedJob(null);

    setResume(null);

    setErrors({});

    setIsSuccess(false);


    if (resumeInputRef.current) {

      resumeInputRef.current.value = '';

    }

  };


  return (

    <>

      <Helmet>

        <title>
          Careers | Happy Technologies
        </title>


        <meta
          name="description"
          content="Explore career opportunities at Happy Technologies. Join our team as a Frontend Manager, Web Developer or SEO Specialist."
        />

      </Helmet>


      <main className="careers-page">


        {/* =====================================
            CURRENT OPENINGS
        ====================================== */}

        <section className="careers-openings">

          <div className="container">


            <div className="section-heading">

              <span className="eyebrow">
                CURRENT OPENINGS
              </span>


              <h2>

                Find your next
                <span> opportunity.</span>

              </h2>


              <p>

                Explore our current opportunities
                and find a role that matches your
                skills and experience.

              </p>

            </div>


            {/* JOB LIST */}

            <div className="career-list">

              {careerOpenings.map((job) => {

                const Icon =
                  icons[
                    job.id as keyof typeof icons
                  ];


                return (

                  <article
                    className="career-card"
                    key={job.id}
                  >


                    {/* ICON */}

                    <div className="career-icon">

                      <Icon size={24} />

                    </div>


                    {/* JOB INFO */}

                    <div className="career-info">


                      {/* JOB TITLE + SHARE */}

                      <div className="career-title-row">

                        <h3>
                          {job.title}
                        </h3>


                        <button
                          type="button"
                          className="career-job-share"
                          onClick={() =>
                            handleShare(
                              job.title
                            )
                          }
                          aria-label={
                            `Share ${job.title}`
                          }
                          title={
                            `Share ${job.title}`
                          }
                        >

                          <Share2 size={17} />

                        </button>

                      </div>


                      <div className="career-meta">

                        <span>
                          {job.type}
                        </span>


                        <span>
                          {job.location}
                        </span>

                      </div>


                      <p className="career-skills">

                        {job.skills.join(' / ')}

                      </p>


                      <p className="career-description">

                        {job.description}

                      </p>


                      {/* DETAILS */}

                      <details className="career-details">

                        <summary>

                          View responsibilities &
                          requirements

                        </summary>


                        <div className="career-details-content">


                          {/* RESPONSIBILITIES */}

                          <div>

                            <h4>
                              Responsibilities
                            </h4>


                            <ul>

                              {job.responsibilities.map(
                                (item) => (

                                  <li key={item}>

                                    {item}

                                  </li>

                                )
                              )}

                            </ul>

                          </div>


                          {/* REQUIREMENTS */}

                          <div>

                            <h4>
                              Requirements
                            </h4>


                            <ul>

                              {job.requirements.map(
                                (item) => (

                                  <li key={item}>

                                    {item}

                                  </li>

                                )
                              )}

                            </ul>

                          </div>


                        </div>

                      </details>

                    </div>


                    {/* APPLY */}

                    <button
                      type="button"
                      className="career-apply"
                      onClick={() =>
                        handleApply(
                          job.title
                        )
                      }
                    >

                      Apply Now

                      <ArrowRight size={16} />

                    </button>


                  </article>

                );

              })}

            </div>

          </div>

        </section>


        {/* =====================================
            APPLICATION MODAL
        ====================================== */}

        {selectedJob && (

          <div
            className="career-modal-overlay"
            onClick={handleCloseModal}
          >

            <div
              className="career-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >


              {/* CLOSE */}

              <button
                type="button"
                className="career-modal-close"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                aria-label="Close"
              >

                <X size={20} />

              </button>


              {/* HEADER */}

              <span className="eyebrow">
                CAREER APPLICATION
              </span>


              <h2>

                Apply for
                <span>
                  {' '}
                  {selectedJob}
                </span>

              </h2>


              <p className="career-modal-description">

                Submit your details and resume.
                We'll review your application and
                get back to you if your profile
                matches the role.

              </p>


              {/* =================================
                  SUCCESS MESSAGE
              ================================= */}

              {isSuccess && (

                <div className="career-success">

                  <CheckCircle2 size={24} />


                  <div>

                    <strong>
                      Application submitted!
                    </strong>


                    <span>

                      Thank you. We'll review your
                      application.

                    </span>

                  </div>

                </div>

              )}


              {/* =================================
                  FORM
              ================================= */}

              {!isSuccess && (

                <form
                  className="career-application-form"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  noValidate
                >

                {/* POSITION */}

                <div className="career-form-group">

                  <label htmlFor="career-position">
                    Position
                  </label>

                  <input
                    id="career-position"
                    type="text"
                    name="jobTitle"
                    value={selectedJob}
                    readOnly
                  />

                </div>

                  {/* NAME */}

                  <div className="career-form-group">

                    <label htmlFor="career-name">
                      Name *
                    </label>


                    <input
                      id="career-name"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      autoComplete="name"
                      maxLength={60}
                      required
                      disabled={isSubmitting}
                      aria-invalid={
                        !!errors.name
                      }
                    />


                    {errors.name && (

                      <span className="career-error">

                        {errors.name}

                      </span>

                    )}

                  </div>


                  {/* EMAIL */}

                  <div className="career-form-group">

                    <label htmlFor="career-email">
                      Email *
                    </label>


                    <input
                      id="career-email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      maxLength={100}
                      required
                      disabled={isSubmitting}
                      aria-invalid={
                        !!errors.email
                      }
                    />


                    {errors.email && (

                      <span className="career-error">

                        {errors.email}

                      </span>

                    )}

                  </div>


                  {/* PHONE */}

                  <div className="career-form-group">

                    <label htmlFor="career-phone">
                      Phone Number *
                    </label>


                    <input
                      id="career-phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 9876543210"
                      autoComplete="tel"
                      maxLength={16}
                      required
                      disabled={isSubmitting}
                      aria-invalid={
                        !!errors.phone
                      }
                    />


                    {errors.phone && (

                      <span className="career-error">

                        {errors.phone}

                      </span>

                    )}

                  </div>


                  {/* COMPANY */}

                  <div className="career-form-group">

                    <label htmlFor="career-company">
                      Current Company
                    </label>


                    <input
                      id="career-company"
                      type="text"
                      name="company"
                      placeholder="Your current company"
                      autoComplete="organization"
                      maxLength={100}
                      disabled={isSubmitting}
                      aria-invalid={
                        !!errors.company
                      }
                    />


                    {errors.company && (

                      <span className="career-error">

                        {errors.company}

                      </span>

                    )}

                  </div>


                  {/* EXPERIENCE */}

                  <div className="career-form-group">

                    <label htmlFor="career-experience">
                      Experience *
                    </label>


                    <input
                      id="career-experience"
                      type="text"
                      name="experience"
                      placeholder="e.g. 5 years"
                      maxLength={20}
                      required
                      disabled={isSubmitting}
                      aria-invalid={
                        !!errors.experience
                      }
                    />


                    {errors.experience && (

                      <span className="career-error">

                        {errors.experience}

                      </span>

                    )}

                  </div>


                  {/* RESUME */}

                  <div className="career-form-group">

                    <label>
                      Resume *
                    </label>


                    <button
                      type="button"
                      className={`career-upload ${
                        resume
                          ? 'career-upload-selected'
                          : ''
                      } ${
                        errors.resume
                          ? 'career-upload-error'
                          : ''
                      }`}
                      onClick={handleUploadClick}
                      disabled={isSubmitting}
                    >

                      {resume ? (

                        <>

                          <CheckCircle2
                            size={22}
                          />


                          <div className="career-upload-text">

                            <strong>
                              {resume.name}
                            </strong>


                            <span>
                              Resume selected ✓
                            </span>

                          </div>

                        </>

                      ) : (

                        <>

                          <Upload size={20} />


                          <div className="career-upload-text">

                            <strong>
                              Upload Resume
                            </strong>


                            <span>
                              Click to choose your
                              resume
                            </span>

                          </div>

                        </>

                      )}

                    </button>


                    {/* FILE INPUT */}

                    <input
                      ref={resumeInputRef}
                      id="career-resume"
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      required
                      onChange={handleResumeChange}
                      className="career-file-input"
                      disabled={isSubmitting}
                    />


                    {errors.resume ? (

                      <span className="career-error">

                        {errors.resume}

                      </span>

                    ) : (

                      <small>

                        PDF, DOC or DOCX • Maximum 5MB

                      </small>

                    )}

                  </div>


                  {/* SUBMIT ERROR */}

                  {errors.submit && (

                    <div className="career-submit-error">

                      {errors.submit}

                    </div>

                  )}


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="btn btn-primary career-submit"
                    disabled={isSubmitting}
                  >

                    {isSubmitting ? (

                      <>

                        <span className="career-spinner" />

                        Submitting...

                      </>

                    ) : (

                      <>

                        Submit Application

                        <ArrowRight size={17} />

                      </>

                    )}

                  </button>


                </form>

              )}

            </div>

          </div>

        )}


      </main>

    </>

  );

}