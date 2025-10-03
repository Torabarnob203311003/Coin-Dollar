import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdClose } from "react-icons/io";

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
  // UPDATED: totalSteps is now 7
  const [step, setStep] = useState(1);
  const totalSteps = 7; 
  const [incorpDate, setIncorpDate] = useState(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-y-auto p-4">
      <div className="relative w-full max-w-4xl mx-auto bg-[#0A0A0A] rounded-2xl border border-green-800 shadow-2xl p-4 sm:p-6 md:p-10 my-6 text-white">
        <button
          className="absolute top-3 right-3 text-3xl text-gray-400 hover:text-green-500 z-50 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          <IoMdClose />
        </button>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-2 text-white">
          KYC/AML Onboarding Questionnaire
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">Point95 Global (Hong Kong) Limited</p>
        
        <ProgressBar step={step} total={totalSteps} />
        
        <form
          className="space-y-6"
          onSubmit={e => {
            e.preventDefault();
            if (step < totalSteps) setStep(step + 1);
            else alert("Form submitted! Documents will be sent to onboarding@p95g.com");
          }}
        >
          
          {/* ==============================================
            Step 1: Entity Details
            ==============================================
          */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">SECTION 1: ENTITY IDENTIFICATION</h3>
              
              <h4 className="text-md font-medium mb-3 text-green-300">COMPANY DETAILS</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Legal Entity Name *" className="input md:col-span-2" required />
                <input type="text" placeholder="Country of Incorporation/Citizenship *" className="input" required />
                <DatePicker
                  selected={incorpDate}
                  onChange={date => setIncorpDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Date of Incorporation *"
                  className="input"
                  required
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                <input type="text" placeholder="Place of Incorporation *" className="input" required />
                <input type="text" placeholder="Registered Address of Business *" className="input md:col-span-2" required />
                <input type="text" placeholder="Office Address (if different)" className="input md:col-span-2" />
              </div>
            </div>
          )}

          {/* =====================================================================
            Step 2: Business Profile & Tax ID
            =====================================================================
          */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">SECTION 2: BUSINESS PROFILE</h3>

              <div className="grid grid-cols-1 gap-3">
                <input type="text" placeholder="EIN/Tax Identification Number *" className="input" required />
              </div>
              
              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Please describe the nature of your business: *</label>
                  <textarea className="input" rows={3} placeholder="Describe your business activities..." required />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Please describe the source of your funds: *</label>
                  <textarea className="input" rows={3} placeholder="Describe the source of funds..." required />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Please describe the purpose of your transactions with the Firm: *</label>
                  <textarea className="input" rows={3} placeholder="Describe transaction purpose..." required />
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
            Step 3: Authorized Contact Details
            =====================================================================
          */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">SECTION 3: AUTHORIZED CONTACT</h3>
              
              <h4 className="text-md font-medium mb-3 text-green-300">INDIVIDUAL OPENING THIS ACCOUNT</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="First Name *" className="input" required />
                <input type="text" placeholder="Last Name *" className="input" required />
                <input type="tel" placeholder="Telephone *" className="input" required />
                <input type="email" placeholder="Email *" className="input" required />
              </div>
            </div>
          )}

          {/* ==================================================
            Step 4: Compliance Check (PEP & Third Party)
            ==================================================
          */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">SECTION 4: COMPLIANCE CHECK</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Are any directors or ultimate beneficial owners considered politically exposed persons (PEPs)? *
                  </label>
                  <p className="text-xs text-gray-400 mb-2">
                    (A PEP includes a foreign political public figure, an immediate family member, or a close associate.)
                  </p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pep" value="yes" className="w-4 h-4" required />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="pep" value="no" className="w-4 h-4" required />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>

              <h4 className="text-md font-medium mb-3 pt-4 text-green-300">THIRD PARTY TRANSACTION</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Are your transactions being conducted on behalf of a third party? *
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="thirdParty" value="yes" className="w-4 h-4" required />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="thirdParty" value="no" className="w-4 h-4" required />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    If yes, please describe policies or procedures:
                  </label>
                  <textarea className="input" rows={3} placeholder="Describe your AML/KYC policies..." />
                  <p className="text-xs text-gray-400 mt-2">
                    If you don't have policies, describe practices you use to identify third parties.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
            Step 5: Bank Information & Ownership
            ==================================================
          */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="border-b border-green-800 pb-4">
                <h3 className="text-xl font-semibold mb-2 text-green-400">SECTION 5: BANK & OWNERSHIP</h3>
                
                <h4 className="text-md font-medium mb-3 text-green-300">BANK INFORMATION</h4>
                <p className="text-xs text-gray-400 mb-4">
                  Bank account name must match the legal entity name.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" placeholder="Bank Name *" className="input md:col-span-2" required />
                  <input type="text" placeholder="Bank Address *" className="input md:col-span-2" required />
                  <input type="text" placeholder="Account Number *" className="input" required />
                  <input type="text" placeholder="SWIFT Code *" className="input" required />
                  <input type="text" placeholder="Routing Number (if applicable)" className="input md:col-span-2" />
                </div>
              </div>
              
              <div className="pt-4">
                <h4 className="text-md font-medium mb-3 text-green-300">OWNERSHIP / CONTROL INFORMATION</h4>
                <p className="text-xs text-gray-400 mb-4">
                  List directors and beneficial owners who own 25% or more of the equity interests.
                </p>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input type="text" placeholder="Legal Name of Individual or Entity *" className="input md:col-span-2" required />
                    <input type="number" placeholder="% of ownership *" className="input" min="0" max="100" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input type="text" placeholder="Legal Name of Individual or Entity" className="input md:col-span-2" />
                    <input type="number" placeholder="% of ownership" className="input" min="0" max="100" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =======================================================
            Step 6: Required Documents (Shrunk)
            =======================================================
          */}
          {step === 6 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-3 text-green-400">SECTION 6: REQUIRED DOCUMENTS</h3>
              
              <div className="border-b border-green-800 pb-4">
                <p className="text-xs text-gray-400 mb-4">Please upload the following documentation:</p>
                {/* Reduced vertical space (space-y-3 to space-y-2) */}
                <div className="space-y-2"> 
                  <label className="block"><span className="text-gray-300 text-sm">1. Business License/Registration and Certificate of Incorporation *</span><input type="file" className="input-file-compact" required /></label>
                  <label className="block"><span className="text-gray-300 text-sm">2. Memorandum and Articles of Association *</span><input type="file" className="input-file-compact" required /></label>
                  <label className="block"><span className="text-gray-300 text-sm">3. Directors Minutes (Authority to operate) *</span><input type="file" className="input-file-compact" required /></label>
                  <label className="block"><span className="text-gray-300 text-sm">4. Bank statement (last 3 months, in color) *</span><input type="file" className="input-file-compact" required /></label>
                  <label className="block"><span className="text-gray-300 text-sm">5. Authorized persons' passports and proof of residence *</span><input type="file" className="input-file-compact" multiple required /></label>
                  <label className="block"><span className="text-gray-300 text-sm">6. Section 5 individuals' passports and proof of residence *</span><input type="file" className="input-file-compact" multiple required /></label>
                  <label className="block"><span className="text-gray-300 text-sm">7. Corporate documents for entities listed in Section 5 (if applicable)</span><input type="file" className="input-file-compact" multiple /></label>
                </div>
              </div>
            </div>
          )}

          {/* =======================================================
            NEW Step 7: Certification (Final Step)
            =======================================================
          */}
          {step === 7 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">SECTION 7: CERTIFICATION & SUBMISSION</h3>

              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="text-md font-medium mb-3 text-green-300">CERTIFICATION</h4>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>
                    I hereby certify that I am authorized to provide the information in this document on behalf of the entity identified in Section 1 and, to the best of my knowledge, that the information provided is complete and accurate.
                  </p>
                  <p>
                    I further declare that the source of funds is legitimate from the capital/business operations of the entity identified in Section 1.
                  </p>
                  <div className="mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" required />
                      <span className="text-white">I agree to the above certification *</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <input type="text" placeholder="Signature (Full Name) *" className="input" required />
                    <input type="text" placeholder="Date *" className="input" required />
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

          {/* Navigation Buttons (Now controls 7 steps) */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-green-800">
            {step > 1 && (
              <button
                type="button"
                className="w-full sm:w-auto py-3 px-8 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-full transition"
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
            )}
            {step < totalSteps ? (
              <button
                type="submit"
                className="w-full sm:flex-1 py-3 px-8 bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-semibold rounded-full transition"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="w-full sm:flex-1 py-3 px-8 bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-semibold rounded-full transition"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>

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
          /* Custom style for more compact file inputs */
          .input-file-compact {
            margin-top: 0.25rem; /* Reduced margin */
            display: block;
            width: 100%;
            color: #1BAE6C;
            background: transparent;
            border-radius: 0.5rem;
            font-size: 0.9rem; /* Slightly smaller font for compactness */
          }
          .input-file-compact::-webkit-file-upload-button, .input-file-compact::file-selector-button {
            background: linear-gradient(135deg, #1BAE6C 0%, #036E47 100%);
            color: #fff;
            border: none;
            border-radius: 9999px;
            padding: 0.4rem 1rem; /* Smaller padding */
            font-weight: 500;
            cursor: pointer;
            margin-right: 0.75rem; /* Reduced margin */
          }
          input[type="radio"],
          input[type="checkbox"] {
            accent-color: #1BAE6C;
            cursor: pointer;
          }
          .react-datepicker-wrapper {
            width: 100%;
          }
          .react-datepicker-popper {
             z-index: 60;
          }
          .react-datepicker {
              border: 1px solid #1BAE6C;
              background-color: #0A0A0A; 
              font-family: inherit;
              border-radius: 0.5rem;
              padding: 0.5rem;
          }
          .react-datepicker__current-month,
          .react-datepicker__day-name,
          .react-datepicker__header select,
          .react-datepicker__day {
            color: #fff;
          }
        `}</style>
      </div>
    </div>
  );
}

export default Loginfrom;