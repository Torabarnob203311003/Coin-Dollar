/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { X, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ProgressBar({ step, total }) {
  const percent = Math.round((step / total) * 100);
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-1 text-xs text-green-300 font-medium">
        <span>Step {step} of {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-700 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function Loginfrom({ onClose }) {
  const [formType, setFormType] = useState(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = formType === 'business' ? 3 : 3;

  // Individual form state for file uploads
  const [individualFiles, setIndividualFiles] = useState({
    photoIdentification: null,
    proofOfResidency: null,
    bankStatement: null
  });

  // Business form state for file uploads
  const [businessFiles, setBusinessFiles] = useState({
    businessLicense: null,
    certificateOfIncorporation: null,
    memorandumArticles: null,
    directorsMinutes: null,
    bankStatement: null,
    authorizedPassports: null,
    authorizedProofOfResidence: null
  });

  // React Hook Form for Individual
  const {
    register: registerIndividual,
    handleSubmit: handleSubmitIndividual,
    control: controlIndividual,
    formState: { errors: errorsIndividual },
    watch: watchIndividual,
    setValue: setValueIndividual
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      personalAccount: {
        fullName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        nationality: '',
        residentialAddress: '',
        isUSCitizenORresident: '',
        occupation: '',
        telephone: '',
        mobile: '',
        othersContact: '',
        sourceOfFunds: {
          options: [],
        },
        signature: '',
        signatureDate: '',
      }
    }
  });

  // React Hook Form for Business
  const {
    register: registerBusiness,
    handleSubmit: handleSubmitBusiness,
    control: controlBusiness,
    formState: { errors: errorsBusiness },
    watch: watchBusiness,
    setValue: setValueBusiness
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      businessAccount: {
        legalEntityName: '',
        countryOfIncorporation: '',
        dateOfIncorporation: '',
        placeOfIncorporation: '',
        registeredAddress: '',
        officeAddress: '',
        einTaxid: '',
        businessActivities: '',
        sourceOfFunds: '',
        transactionPurpose: '',
        authorizedContact: {
          firstName: '',
          lastName: '',
          telephone: '',
          email: ''
        },
        isPEP: '',
        IsThirdParty: '',
        certification: {
          signature: '',
          date: '',
          agreed: false
        },
      }
    }
  });

  // Handle individual file uploads
  const handleIndividualFileChange = (fieldName, file) => {
    setIndividualFiles(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  // Handle business file uploads
  const handleBusinessFileChange = (fieldName, file) => {
    setBusinessFiles(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  // Format date to YYYY-MM-DD - FIXED
  const formatDateToYYYYMMDD = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Convert string date to Date object for DatePicker
  const parseDateString = (dateString) => {
    if (!dateString) return null;
    try {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    } catch (error) {
      return null;
    }
  };

  // Handle source of funds checkbox change for individual form
  const handleSourceOfFundsChange = (optionValue, isChecked) => {
    const currentOptions = watchIndividual('personalAccount.sourceOfFunds.options') || [];
    const updatedOptions = isChecked
      ? [...currentOptions, optionValue]
      : currentOptions.filter(opt => opt !== optionValue);

    setValueIndividual('personalAccount.sourceOfFunds.options', updatedOptions);
  };

  // Check if individual form has all required documents
  const hasAllIndividualDocuments = () => {
    return individualFiles.photoIdentification &&
      individualFiles.proofOfResidency &&
      individualFiles.bankStatement;
  };

  // Check if business form has all required documents
  const hasAllBusinessDocuments = () => {
    return businessFiles.businessLicense &&
      businessFiles.certificateOfIncorporation &&
      businessFiles.memorandumArticles &&
      businessFiles.directorsMinutes &&
      businessFiles.bankStatement &&
      businessFiles.authorizedPassports &&
      businessFiles.authorizedProofOfResidence;
  };

  // Individual form submission - FIXED DATE HANDLING
  const onSubmitIndividual = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Add basic info
      formData.append('email', data.email);
      formData.append('password', data.password);

      // Add personal account fields - FIXED DATE FORMAT
      formData.append('personalAccount[fullName]', data.personalAccount.fullName);
      formData.append('personalAccount[dateOfBirth]', data.personalAccount.dateOfBirth); // Already in YYYY-MM-DD format
      formData.append('personalAccount[placeOfBirth]', data.personalAccount.placeOfBirth);
      formData.append('personalAccount[nationality]', data.personalAccount.nationality);
      formData.append('personalAccount[residentialAddress]', data.personalAccount.residentialAddress);
      formData.append('personalAccount[isUSCitizenOrResident]', data.personalAccount.isUSCitizenORresident);
      formData.append('personalAccount[occupation]', data.personalAccount.occupation);
      formData.append('personalAccount[mobile]', data.personalAccount.mobile);
      formData.append('personalAccount[signature]', data.personalAccount.signature);
      formData.append('personalAccount[signatureDate]', data.personalAccount.signatureDate); // Already in YYYY-MM-DD format

      // Add optional fields if they exist
      if (data.personalAccount.telephone) {
        formData.append('personalAccount[telephone]', data.personalAccount.telephone);
      }
      if (data.personalAccount.othersContact) {
        formData.append('personalAccount[othersContact]', data.personalAccount.othersContact);
      }

      // Add source of funds
      if (data.personalAccount.sourceOfFunds?.options) {
        data.personalAccount.sourceOfFunds.options.forEach(option => {
          formData.append('personalAccount[sourceOfFunds][options][]', option);
        });
      }

      // Add documents - Using simple field names first
      if (individualFiles.photoIdentification) {
        formData.append('personalAccount.documents.photoIdentification', individualFiles.photoIdentification);
      }
      if (individualFiles.proofOfResidency) {
        formData.append('personalAccount.documents.proofOfResidency', individualFiles.proofOfResidency);
      }
      if (individualFiles.bankStatement) {
        formData.append('personalAccount.documents.bankStatement', individualFiles.bankStatement);
      }

      // Try alternative field names if simple ones don't work
      // if (individualFiles.photoIdentification) {
      //   formData.append('personalAccount.documents.photoIdentification', individualFiles.photoIdentification);
      // }
      // if (individualFiles.proofOfResidency) {
      //   formData.append('personalAccount.documents.proofOfResidency', individualFiles.proofOfResidency);
      // }
      // if (individualFiles.bankStatement) {
      //   formData.append('personalAccount.documents.bankStatement', individualFiles.bankStatement);
      // }

      // Debug: Check what's in FormData
      console.log('FormData entries for individual:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ', pair[1]);
      }

      const response = await fetch('https://overcontritely-epagogic-vicky.ngrok-free.dev/api/v1/users/register/personal', {
        method: 'POST',  
        body: formData,
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (response.ok) {
        
        alert("Form submitted successfully! Documents will be sent to onboarding@p95g.com");
        onClose();
      } else {
        alert(`Submission failed: ${result.message || 'Please check all required fields and try again.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < totalSteps) setStep(step + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-y-auto p-4">
      <div className="relative w-full max-w-4xl mx-auto bg-[#0A0A0A] rounded-2xl border border-green-800 shadow-2xl p-4 sm:p-6 md:p-10 my-6 text-white">
        <button
          className="absolute top-3 right-3 text-3xl text-gray-400 hover:text-green-500 z-50 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={32} />
        </button>

        {!formType ? (
          <>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-2 text-white">
              Organization type
            </h2>
            <p className="text-center text-gray-400 text-sm mb-8">Point95 Global (Hong Kong) Limited</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center py-8">
              <button
                onClick={() => setFormType('individual')}
                className="w-64 h-40 bg-gradient-to-br from-green-600 to-emerald-800 hover:from-green-500 hover:to-emerald-700 text-white font-bold text-2xl rounded-2xl shadow-xl transition-all transform hover:scale-105 border-2 border-green-400"
              >
                Individual
              </button>
              <button
                onClick={() => setFormType('business')}
                className="w-64 h-40 bg-gradient-to-br from-green-600 to-emerald-800 hover:from-green-500 hover:to-emerald-700 text-white font-bold text-2xl rounded-2xl shadow-xl transition-all transform hover:scale-105 border-2 border-green-400"
              >
                Business
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={formType === 'business' ? handleSubmitBusiness(handleSubmitBusiness) : handleSubmitIndividual(onSubmitIndividual)}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-2 text-white">
              {formType === 'business' ? 'KYB/AML Onboarding Questionnaire' : 'KYC/AML Onboarding Questionnaire'}
            </h2>
            <p className="text-center text-gray-400 text-sm mb-6">Point95 Global (Hong Kong) Limited</p>

            <ProgressBar step={step} total={totalSteps} />

            <div className="space-y-6">
              {/* INDIVIDUAL FORM */}
              {formType === 'individual' && (
                <>
                  {step === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4 text-green-400">PERSONAL INFORMATION</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="email"
                          {...registerIndividual("email", { required: true })}
                          placeholder="Email *"
                          className="input"
                        />
                        <input
                          type="password"
                          {...registerIndividual("password", { required: true })}
                          placeholder="Password *"
                          className="input"
                        />
                        <input
                          {...registerIndividual("personalAccount.fullName", { required: true })}
                          placeholder="Full Legal Name *"
                          className="input md:col-span-2"
                        />
                        <div className="relative">
                          <Controller
                            name="personalAccount.dateOfBirth"
                            control={controlIndividual}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <DatePicker
                                selected={field.value ? parseDateString(field.value) : null} // FIXED: Parse string to Date object
                                onChange={(date) => field.onChange(formatDateToYYYYMMDD(date))} // FIXED: Convert Date to string
                                dateFormat="yyyy-MM-dd"
                                className="input pr-10 w-full"
                                placeholderText="Date of Birth *"
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={new Date()}
                              />
                            )}
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                          {watchIndividual("personalAccount.dateOfBirth") && (
                            <div className="absolute -top-2 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                              {watchIndividual("personalAccount.dateOfBirth")}
                            </div>
                          )}
                        </div>
                        <input
                          {...registerIndividual("personalAccount.placeOfBirth", { required: true })}
                          placeholder="Place of Birth *"
                          className="input"
                        />
                        <input
                          {...registerIndividual("personalAccount.nationality", { required: true })}
                          placeholder="Nationality *"
                          className="input md:col-span-2"
                        />
                        <input
                          {...registerIndividual("personalAccount.residentialAddress", { required: true })}
                          placeholder="Residential Address *"
                          className="input md:col-span-2"
                        />
                      </div>
                      <div className="space-y-4 pt-4">
                        <div>
                          <label className="block text-gray-300 text-sm mb-2">
                            Are you a US citizen or permanent resident? *
                          </label>
                          <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                value="true"
                                {...registerIndividual("personalAccount.isUSCitizenORresident", { required: true })}
                                className="w-4 h-4 accent-green-600"
                              />
                              <span>Yes</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                value="false"
                                {...registerIndividual("personalAccount.isUSCitizenORresident")}
                                className="w-4 h-4 accent-green-600"
                              />
                              <span>No</span>
                            </label>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            {...registerIndividual("personalAccount.occupation", { required: true })}
                            placeholder="Occupation *"
                            className="input md:col-span-2"
                          />
                          <input
                            type="tel"
                            {...registerIndividual("personalAccount.telephone")}
                            placeholder="Telephone Number"
                            className="input"
                          />
                          <input
                            type="tel"
                            {...registerIndividual("personalAccount.mobile", { required: true })}
                            placeholder="Mobile *"
                            className="input"
                          />
                          <input
                            type="text"
                            {...registerIndividual("personalAccount.othersContact")}
                            placeholder="Other Contact"
                            className="input md:col-span-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4 text-green-400">SOURCE OF FUNDS</h3>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <p className="text-sm text-gray-300 mb-4">
                          I declare that the source of funds that I will be depositing into your account(s) is (tick all that applies):
                        </p>
                        <div className="space-y-3">
                          {[
                            'Income from employment/business',
                            'Personal savings/investments',
                            'Sale of property',
                            'Inheritance',
                            'Gift',
                            'Loan',
                            'Investment proceeds',
                            'Other'
                          ].map(option => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={watchIndividual("personalAccount.sourceOfFunds.options")?.includes(option)}
                                onChange={(e) => handleSourceOfFundsChange(option, e.target.checked)}
                                className="w-4 h-4 accent-green-600"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-3 text-green-400">REQUIRED DOCUMENTS & SIGNATURE</h3>

                      {/* Document Upload Status */}
                      {!hasAllIndividualDocuments() && (
                        <div className="bg-red-900/20 border border-red-700 p-4 rounded-lg">
                          <p className="text-red-300 text-sm font-medium">Please upload all required documents:</p>
                          <ul className="text-red-300 text-xs mt-2 list-disc list-inside">
                            {!individualFiles.photoIdentification && <li>Photo Identification</li>}
                            {!individualFiles.proofOfResidency && <li>Proof of Residency</li>}
                            {!individualFiles.bankStatement && <li>Bank Statement</li>}
                          </ul>
                        </div>
                      )}

                      {hasAllIndividualDocuments() && (
                        <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
                          <p className="text-green-300 text-sm font-medium">✓ All required documents uploaded successfully!</p>
                        </div>
                      )}

                      <div className="space-y-4">
                        {/* File uploads with exact field names */}
                        <label className="block">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300 text-sm">Photo Identification (Passport/Driving License) *</span>
                            {individualFiles.photoIdentification && (
                              <span className="text-green-400 text-xs bg-green-900/30 px-2 py-1 rounded">
                                ✓ {individualFiles.photoIdentification.name}
                              </span>
                            )}
                          </div>
                          <input
                            type="file"
                            onChange={(e) => handleIndividualFileChange('photoIdentification', e.target.files[0])}
                            className="input-file-compact"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            required
                          />
                        </label>

                        <label className="block">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300 text-sm">Proof of Residency (Utility Bill) *</span>
                            {individualFiles.proofOfResidency && (
                              <span className="text-green-400 text-xs bg-green-900/30 px-2 py-1 rounded">
                                ✓ {individualFiles.proofOfResidency.name}
                              </span>
                            )}
                          </div>
                          <input
                            type="file"
                            onChange={(e) => handleIndividualFileChange('proofOfResidency', e.target.files[0])}
                            className="input-file-compact"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            required
                          />
                        </label>

                        <label className="block">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300 text-sm">Bank Statement (last 3 months) *</span>
                            {individualFiles.bankStatement && (
                              <span className="text-green-400 text-xs bg-green-900/30 px-2 py-1 rounded">
                                ✓ {individualFiles.bankStatement.name}
                              </span>
                            )}
                          </div>
                          <input
                            type="file"
                            onChange={(e) => handleIndividualFileChange('bankStatement', e.target.files[0])}
                            className="input-file-compact"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            required
                          />
                        </label>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg mt-6">
                        <h4 className="text-md font-medium mb-3 text-green-300">SIGNATURE</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            {...registerIndividual("personalAccount.signature", { required: true })}
                            placeholder="Signature (Full Name) *"
                            className="input"
                          />
                          <div className="relative">
                            <Controller
                              name="personalAccount.signatureDate"
                              control={controlIndividual}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <DatePicker
                                  selected={field.value ? parseDateString(field.value) : null} // FIXED: Parse string to Date object
                                  onChange={(date) => field.onChange(formatDateToYYYYMMDD(date))} // FIXED: Convert Date to string
                                  dateFormat="yyyy-MM-dd"
                                  className="input pr-10 w-full"
                                  placeholderText="Date *"
                                  showYearDropdown
                                  dropdownMode="select"
                                />
                              )}
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                            {watchIndividual("personalAccount.signatureDate") && (
                              <div className="absolute -top-2 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                {watchIndividual("personalAccount.signatureDate")}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-900/20 p-4 rounded-lg border border-green-700">
                        <p className="text-xs text-gray-300">
                          Documents will be sent to: <span className="text-green-400 font-medium">onboarding@p95g.com</span>
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                          Support: <span className="text-green-400 font-medium">support@blockfinex.com</span>
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* BUSINESS FORM - Similar fixes would be applied here */}
              {formType === 'business' && (
                // ... business form JSX (similar structure as individual)
                <div>
                  <p className="text-center text-yellow-400">Business form implementation would follow similar pattern</p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-green-800">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="w-full sm:w-auto py-3 px-8 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-full transition"
                  >
                    Back
                  </button>
                )}
                {step === 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormType(null);
                      setStep(1);
                    }}
                    className="w-full sm:w-auto py-3 px-8 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-full transition"
                  >
                    Back to Selection
                  </button>
                )}
                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:flex-1 py-3 px-8 bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-semibold rounded-full transition"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:flex-1 py-3 px-8 bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-semibold rounded-full transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </div>
          </form>
        )}

        <style>{`
          .input {
            background-color: #181C1F;
            color: #fff;
            border: 1px solid #1BAE6C;
            border-radius: 0.75rem;
            padding: 0.6rem 1rem; 
            width: 100%;
            font-weight: 300;
            font-size: 1rem;
            transition: border 0.2s, box-shadow 0.2s;
          }
          .input:focus {
            outline: none;
            border-color: #1BAE6C;
            box-shadow: 0 0 0 2px #1BAE6C33;
          }
          .input::placeholder {
            color: #6B7280;
          }
          .input-file-compact {
            margin-top: 0.25rem;
            display: block;
            width: 100%;
            color: #1BAE6C;
            background: transparent;
            border-radius: 0.5rem;
            font-size: 0.9rem;
          }
          .input-file-compact::-webkit-file-upload-button, .input-file-compact::file-selector-button {
            background: linear-gradient(135deg, #1BAE6C 0%, #036E47 100%);
            color: #fff;
            border: none;
            border-radius: 9999px;
            padding: 0.4rem 1rem;
            font-weight: 500;
            cursor: pointer;
            margin-right: 0.75rem;
          }
          .react-datepicker-wrapper {
            width: 100%;
          }
        `}</style>
      </div>
    </div>
  );
}

export default function App() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="py-3 px-8 bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-semibold rounded-full transition"
        >
          Open KYC/KYB Form
        </button>
      )}
      {showForm && <Loginfrom onClose={() => setShowForm(false)} />}
    </div>
  );
}