/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { X, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

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
        einTaxId: '',
        businessActivities: '',
        sourceOfFunds: '',
        transactionPurpose: '',
        authorizedContact: {
          firstName: '',
          lastName: '',
          telephone: '',
          email: ''
        },
        isPEP: 'false',
        isThirdParty: 'false',
        bankInformation: {
          bankName: '',
          bankAddress: '',
          accountNumber: '',
          swiftCode: '',
          routingNumber: ''
        },
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
    const submitToast = toast.loading('Submitting individual application...');

    try {
      const formData = new FormData();

      // Add basic info
      formData.append('email', data.email);
      formData.append('password', data.password);

      // Add personal account fields - FIXED DATE FORMAT
      formData.append('personalAccount[fullName]', data.personalAccount.fullName);
      formData.append('personalAccount[dateOfBirth]', data.personalAccount.dateOfBirth);
      formData.append('personalAccount[placeOfBirth]', data.personalAccount.placeOfBirth);
      formData.append('personalAccount[nationality]', data.personalAccount.nationality);
      formData.append('personalAccount[residentialAddress]', data.personalAccount.residentialAddress);
      formData.append('personalAccount[isUSCitizenOrResident]', data.personalAccount.isUSCitizenORresident);
      formData.append('personalAccount[occupation]', data.personalAccount.occupation);
      formData.append('personalAccount[mobile]', data.personalAccount.mobile);
      formData.append('personalAccount[signature]', data.personalAccount.signature);
      formData.append('personalAccount[signatureDate]', data.personalAccount.signatureDate);

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

      // Add documents
      if (individualFiles.photoIdentification) {
        formData.append('personalAccount.documents.photoIdentification', individualFiles.photoIdentification);
      }
      if (individualFiles.proofOfResidency) {
        formData.append('personalAccount.documents.proofOfResidency', individualFiles.proofOfResidency);
      }
      if (individualFiles.bankStatement) {
        formData.append('personalAccount.documents.bankStatement', individualFiles.bankStatement);
      }

      const response = await fetch('https://overcontritely-epagogic-vicky.ngrok-free.dev/api/v1/users/register/personal', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Individual application submitted successfully!', { id: submitToast });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error(`Submission failed: ${result.message || 'Please check all required fields'}`, { id: submitToast });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Network error. Please try again.', { id: submitToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Business form submission - FIXED DATE HANDLING
  const onSubmitBusiness = async (data) => {
    setIsSubmitting(true);
    const submitToast = toast.loading('Submitting business application...');

    try {
      const formData = new FormData();

      // Add basic info
      formData.append('email', data.email);
      formData.append('password', data.password);

      // Add business account fields
      formData.append('businessAccount[legalEntityName]', data.businessAccount.legalEntityName);
      formData.append('businessAccount[countryOfIncorporation]', data.businessAccount.countryOfIncorporation);
      formData.append('businessAccount[dateOfIncorporation]', data.businessAccount.dateOfIncorporation);
      formData.append('businessAccount[placeOfIncorporation]', data.businessAccount.placeOfIncorporation);
      formData.append('businessAccount[registeredAddress]', data.businessAccount.registeredAddress);
      formData.append('businessAccount[officeAddress]', data.businessAccount.officeAddress);
      formData.append('businessAccount[einTaxId]', data.businessAccount.einTaxId);
      formData.append('businessAccount[businessActivities]', data.businessAccount.businessActivities);
      formData.append('businessAccount[sourceOfFunds]', data.businessAccount.sourceOfFunds);
      formData.append('businessAccount[transactionPurpose]', data.businessAccount.transactionPurpose);

      // Add authorized contact
      formData.append('businessAccount[authorizedContact][firstName]', data.businessAccount.authorizedContact.firstName);
      formData.append('businessAccount[authorizedContact][lastName]', data.businessAccount.authorizedContact.lastName);
      formData.append('businessAccount[authorizedContact][telephone]', data.businessAccount.authorizedContact.telephone);
      formData.append('businessAccount[authorizedContact][email]', data.businessAccount.authorizedContact.email);

      // Add PEP and Third Party info
      formData.append('businessAccount[isPEP]', data.businessAccount.isPEP);
      formData.append('businessAccount[isThirdParty]', data.businessAccount.isThirdParty);

      // Add bank information
      formData.append('businessAccount[bankInformation][bankName]', data.businessAccount.bankInformation.bankName);
      formData.append('businessAccount[bankInformation][bankAddress]', data.businessAccount.bankInformation.bankAddress);
      formData.append('businessAccount[bankInformation][accountNumber]', data.businessAccount.bankInformation.accountNumber);
      formData.append('businessAccount[bankInformation][swiftCode]', data.businessAccount.bankInformation.swiftCode);
      formData.append('businessAccount[bankInformation][routingNumber]', data.businessAccount.bankInformation.routingNumber);

      // Add certification
      formData.append('businessAccount[certification][signature]', data.businessAccount.certification.signature);
      formData.append('businessAccount[certification][date]', data.businessAccount.certification.date);
      formData.append('businessAccount[certification][agreed]', data.businessAccount.certification.agreed.toString());

      // Add business documents
      if (businessFiles.businessLicense) {
        formData.append('businessAccount.documents.businessLicense', businessFiles.businessLicense);
      }
      if (businessFiles.certificateOfIncorporation) {
        formData.append('businessAccount.documents.certificateOfIncorporation', businessFiles.certificateOfIncorporation);
      }
      if (businessFiles.memorandumArticles) {
        formData.append('businessAccount.documents.memorandumArticles', businessFiles.memorandumArticles);
      }
      if (businessFiles.directorsMinutes) {
        formData.append('businessAccount.documents.directorsMinutes', businessFiles.directorsMinutes);
      }
      if (businessFiles.bankStatement) {
        formData.append('businessAccount.documents.bankStatement', businessFiles.bankStatement);
      }
      if (businessFiles.authorizedPassports) {
        formData.append('businessAccount.documents.authorizedPassports', businessFiles.authorizedPassports);
      }
      if (businessFiles.authorizedProofOfResidence) {
        formData.append('businessAccount.documents.authorizedProofOfResidence', businessFiles.authorizedProofOfResidence);
      }

      const response = await fetch('https://overcontritely-epagogic-vicky.ngrok-free.dev/api/v1/users/register/business', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Business application submitted successfully!', { id: submitToast });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        toast.error(`Submission failed: ${result.message || 'Please check all required fields'}`, { id: submitToast });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Network error. Please try again.', { id: submitToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    // Validate current step before proceeding
    if (step === 1) {
      if (formType === 'individual') {
        const individualData = watchIndividual();
        if (!individualData.email || !individualData.password || !individualData.personalAccount.fullName) {
          toast.error('Please fill all required fields in step 1');
          return;
        }
      } else if (formType === 'business') {
        const businessData = watchBusiness();
        if (!businessData.email || !businessData.password || !businessData.businessAccount.legalEntityName) {
          toast.error('Please fill all required fields in step 1');
          return;
        }
      }
    }

    if (step < totalSteps) setStep(step + 1);
  };

  const handleBackToSelection = () => {
    toast.success('Returning to organization type selection');
    setFormType(null);
    setStep(1);
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
                onClick={() => {
                  setFormType('individual');
                  toast.success('Individual account selected');
                }}
                className="w-64 h-40 bg-gradient-to-br from-green-600 to-emerald-800 hover:from-green-500 hover:to-emerald-700 text-white font-bold text-2xl rounded-2xl shadow-xl transition-all transform hover:scale-105 border-2 border-green-400"
              >
                Individual
              </button>
              <button
                onClick={() => {
                  setFormType('business');
                  toast.success('Business account selected');
                }}
                className="w-64 h-40 bg-gradient-to-br from-green-600 to-emerald-800 hover:from-green-500 hover:to-emerald-700 text-white font-bold text-2xl rounded-2xl shadow-xl transition-all transform hover:scale-105 border-2 border-green-400"
              >
                Business
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={formType === 'business' ? handleSubmitBusiness(onSubmitBusiness) : handleSubmitIndividual(onSubmitIndividual)}>
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
                                selected={field.value ? parseDateString(field.value) : null}
                                onChange={(date) => field.onChange(formatDateToYYYYMMDD(date))}
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
                                  selected={field.value ? parseDateString(field.value) : null}
                                  onChange={(date) => field.onChange(formatDateToYYYYMMDD(date))}
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

              {/* BUSINESS FORM */}
              {formType === 'business' && (
                <>
                  {step === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4 text-green-400">BUSINESS INFORMATION</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="email"
                          {...registerBusiness("email", { required: true })}
                          placeholder="Email *"
                          className="input"
                        />
                        <input
                          type="password"
                          {...registerBusiness("password", { required: true })}
                          placeholder="Password *"
                          className="input"
                        />
                        <input
                          {...registerBusiness("businessAccount.legalEntityName", { required: true })}
                          placeholder="Legal Entity Name *"
                          className="input md:col-span-2"
                        />
                        <input
                          {...registerBusiness("businessAccount.countryOfIncorporation", { required: true })}
                          placeholder="Country of Incorporation *"
                          className="input"
                        />
                        <div className="relative">
                          <Controller
                            name="businessAccount.dateOfIncorporation"
                            control={controlBusiness}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <DatePicker
                                selected={field.value ? parseDateString(field.value) : null}
                                onChange={(date) => field.onChange(formatDateToYYYYMMDD(date))}
                                dateFormat="yyyy-MM-dd"
                                className="input pr-10 w-full"
                                placeholderText="Date of Incorporation *"
                                showYearDropdown
                                dropdownMode="select"
                                maxDate={new Date()}
                              />
                            )}
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                          {watchBusiness("businessAccount.dateOfIncorporation") && (
                            <div className="absolute -top-2 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                              {watchBusiness("businessAccount.dateOfIncorporation")}
                            </div>
                          )}
                        </div>
                        <input
                          {...registerBusiness("businessAccount.placeOfIncorporation", { required: true })}
                          placeholder="Place of Incorporation *"
                          className="input"
                        />
                        <input
                          {...registerBusiness("businessAccount.registeredAddress", { required: true })}
                          placeholder="Registered Address *"
                          className="input md:col-span-2"
                        />
                        <input
                          {...registerBusiness("businessAccount.officeAddress", { required: true })}
                          placeholder="Office Address *"
                          className="input md:col-span-2"
                        />
                        <input
                          {...registerBusiness("businessAccount.einTaxId", { required: true })}
                          placeholder="EIN/Tax ID *"
                          className="input"
                        />
                        <input
                          {...registerBusiness("businessAccount.businessActivities", { required: true })}
                          placeholder="Business Activities *"
                          className="input"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4 text-green-400">CONTACT & BANKING INFORMATION</h3>

                      <div className="bg-gray-900 p-4 rounded-lg mb-6">
                        <h4 className="text-lg font-medium mb-3 text-green-300">AUTHORIZED CONTACT</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            {...registerBusiness("businessAccount.authorizedContact.firstName", { required: true })}
                            placeholder="First Name *"
                            className="input"
                          />
                          <input
                            {...registerBusiness("businessAccount.authorizedContact.lastName", { required: true })}
                            placeholder="Last Name *"
                            className="input"
                          />
                          <input
                            type="tel"
                            {...registerBusiness("businessAccount.authorizedContact.telephone", { required: true })}
                            placeholder="Telephone *"
                            className="input"
                          />
                          <input
                            type="email"
                            {...registerBusiness("businessAccount.authorizedContact.email", { required: true })}
                            placeholder="Email *"
                            className="input"
                          />
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg mb-6">
                        <h4 className="text-lg font-medium mb-3 text-green-300">BUSINESS DETAILS</h4>
                        <div className="space-y-4">
                          <input
                            {...registerBusiness("businessAccount.sourceOfFunds", { required: true })}
                            placeholder="Source of Funds *"
                            className="input"
                          />
                          <input
                            {...registerBusiness("businessAccount.transactionPurpose", { required: true })}
                            placeholder="Transaction Purpose *"
                            className="input"
                          />

                          <div>
                            <label className="block text-gray-300 text-sm mb-2">
                              Is this a Politically Exposed Person (PEP)? *
                            </label>
                            <div className="flex gap-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  value="true"
                                  {...registerBusiness("businessAccount.isPEP", { required: true })}
                                  className="w-4 h-4 accent-green-600"
                                />
                                <span>Yes</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  value="false"
                                  {...registerBusiness("businessAccount.isPEP")}
                                  className="w-4 h-4 accent-green-600"
                                />
                                <span>No</span>
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-300 text-sm mb-2">
                              Is this a Third Party account? *
                            </label>
                            <div className="flex gap-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  value="true"
                                  {...registerBusiness("businessAccount.isThirdParty", { required: true })}
                                  className="w-4 h-4 accent-green-600"
                                />
                                <span>Yes</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  value="false"
                                  {...registerBusiness("businessAccount.isThirdParty")}
                                  className="w-4 h-4 accent-green-600"
                                />
                                <span>No</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg">
                        <h4 className="text-lg font-medium mb-3 text-green-300">BANK INFORMATION</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            {...registerBusiness("businessAccount.bankInformation.bankName", { required: true })}
                            placeholder="Bank Name *"
                            className="input"
                          />
                          <input
                            {...registerBusiness("businessAccount.bankInformation.bankAddress", { required: true })}
                            placeholder="Bank Address *"
                            className="input"
                          />
                          <input
                            {...registerBusiness("businessAccount.bankInformation.accountNumber", { required: true })}
                            placeholder="Account Number *"
                            className="input"
                          />
                          <input
                            {...registerBusiness("businessAccount.bankInformation.swiftCode", { required: true })}
                            placeholder="SWIFT Code *"
                            className="input"
                          />
                          <input
                            {...registerBusiness("businessAccount.bankInformation.routingNumber", { required: true })}
                            placeholder="Routing Number *"
                            className="input"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-3 text-green-400">REQUIRED DOCUMENTS & CERTIFICATION</h3>

                      {/* Document Upload Status */}
                      {!hasAllBusinessDocuments() && (
                        <div className="bg-red-900/20 border border-red-700 p-4 rounded-lg">
                          <p className="text-red-300 text-sm font-medium">Please upload all required documents:</p>
                          <ul className="text-red-300 text-xs mt-2 list-disc list-inside">
                            {!businessFiles.businessLicense && <li>Business License</li>}
                            {!businessFiles.certificateOfIncorporation && <li>Certificate of Incorporation</li>}
                            {!businessFiles.memorandumArticles && <li>Memorandum & Articles</li>}
                            {!businessFiles.directorsMinutes && <li>Director's Minutes</li>}
                            {!businessFiles.bankStatement && <li>Bank Statement</li>}
                            {!businessFiles.authorizedPassports && <li>Authorized Passports</li>}
                            {!businessFiles.authorizedProofOfResidence && <li>Authorized Proof of Residence</li>}
                          </ul>
                        </div>
                      )}

                      {hasAllBusinessDocuments() && (
                        <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
                          <p className="text-green-300 text-sm font-medium">✓ All required documents uploaded successfully!</p>
                        </div>
                      )}

                      <div className="space-y-4">
                        {/* Business document uploads */}
                        {[
                          { key: 'businessLicense', label: 'Business License *' },
                          { key: 'certificateOfIncorporation', label: 'Certificate of Incorporation *' },
                          { key: 'memorandumArticles', label: 'Memorandum & Articles *' },
                          { key: 'directorsMinutes', label: "Director's Minutes *" },
                          { key: 'bankStatement', label: 'Bank Statement (last 3 months) *' },
                          { key: 'authorizedPassports', label: 'Authorized Passports *' },
                          { key: 'authorizedProofOfResidence', label: 'Authorized Proof of Residence *' }
                        ].map(({ key, label }) => (
                          <label key={key} className="block">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300 text-sm">{label}</span>
                              {businessFiles[key] && (
                                <span className="text-green-400 text-xs bg-green-900/30 px-2 py-1 rounded">
                                  ✓ {businessFiles[key].name}
                                </span>
                              )}
                            </div>
                            <input
                              type="file"
                              onChange={(e) => handleBusinessFileChange(key, e.target.files[0])}
                              className="input-file-compact"
                              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                              required
                            />
                          </label>
                        ))}
                      </div>

                      <div className="bg-gray-900 p-4 rounded-lg mt-6">
                        <h4 className="text-md font-medium mb-3 text-green-300">CERTIFICATION</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            {...registerBusiness("businessAccount.certification.signature", { required: true })}
                            placeholder="Signature (Authorized Person) *"
                            className="input"
                          />
                          <div className="relative">
                            <Controller
                              name="businessAccount.certification.date"
                              control={controlBusiness}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <DatePicker
                                  selected={field.value ? parseDateString(field.value) : null}
                                  onChange={(date) => field.onChange(formatDateToYYYYMMDD(date))}
                                  dateFormat="yyyy-MM-dd"
                                  className="input pr-10 w-full"
                                  placeholderText="Date *"
                                  showYearDropdown
                                  dropdownMode="select"
                                />
                              )}
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                            {watchBusiness("businessAccount.certification.date") && (
                              <div className="absolute -top-2 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                {watchBusiness("businessAccount.certification.date")}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              {...registerBusiness("businessAccount.certification.agreed", { required: true })}
                              className="w-4 h-4 accent-green-600"
                            />
                            <span className="text-sm text-gray-300">
                              I agree to the terms and conditions *
                            </span>
                          </label>
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
                    onClick={handleBackToSelection}
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
                    disabled={isSubmitting || (formType === 'individual' && !hasAllIndividualDocuments()) || (formType === 'business' && !hasAllBusinessDocuments())}
                    className={`w-full sm:flex-1 py-3 px-8 bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-semibold rounded-full transition ${(isSubmitting || (formType === 'individual' && !hasAllIndividualDocuments()) || (formType === 'business' && !hasAllBusinessDocuments())) ? 'opacity-50 cursor-not-allowed' : ''
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
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0A0A0A',
            color: '#fff',
            border: '1px solid #1BAE6C',
          },
          success: {
            iconTheme: {
              primary: '#1BAE6C',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#1BAE6C',
              secondary: '#fff',
            },
          },
        }}
      />

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