// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { IoMdClose } from "react-icons/io"; // Import close icon

// function ProgressBar({ step, total }) {
//   const percent = Math.round((step / total) * 100);
//   return (
//     <div className="w-full mb-6">
//       <div className="flex justify-between mb-1 text-xs text-green-300 font-medium">
//         <span>Step {step} of {total}</span>
//         <span>{percent}%</span>
//       </div>
//       <div className="w-full bg-gray-800 rounded-full h-2">
//         <div
//           className="bg-gradient-to-r from-green-500 to-emerald-700 h-2 rounded-full transition-all duration-300"
//           style={{ width: `${percent}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// function Loginfrom({ onClose }) {
//   const [step, setStep] = useState(1);
//   const totalSteps = 3;
//   const [incorpDate, setIncorpDate] = useState(null);
//   const [dob, setDob] = useState(null);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//       <div className="relative w-full max-w-2xl mx-auto bg-[#0A0A0A] rounded-2xl border border-green-800 shadow-2xl p-2 sm:p-4 md:p-10 my-6 text-white min-h-[90vh] flex flex-col justify-center">
//         {/* Close Icon */}
//         <button
//           className="absolute top-3 right-3 text-3xl text-gray-400 hover:text-green-500 z-50 focus:outline-none"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           <IoMdClose />
//         </button>
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4 sm:mb-6 text-white">
//           Business Onboarding Form
//         </h2>
//         <ProgressBar step={step} total={totalSteps} />
//         <form
//           className="space-y-6 flex-1 flex flex-col justify-between"
//           onSubmit={e => {
//             e.preventDefault();
//             if (step < totalSteps) setStep(step + 1);
//             else alert("Form submitted!");
//           }}
//         >
//           {/* Step 1: Business Details */}
//           {step === 1 && (
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-medium mb-2 text-green-400">Business Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input type="text" placeholder="Legal Name" className="input" required />
//                   <input type="text" placeholder="Registration Number" className="input" required />
//                   <DatePicker
//                     selected={incorpDate}
//                     onChange={date => setIncorpDate(date)}
//                     dateFormat="dd/MM/yyyy"
//                     placeholderText="Incorporation Date"
//                     className="input"
//                     required
//                     showMonthDropdown
//                     showYearDropdown
//                     dropdownMode="select"
//                   />
//                   <input type="text" placeholder="Country" className="input" required />
//                   <input type="text" placeholder="Address" className="input md:col-span-2" required />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Business Documents & Ownership */}
//           {step === 2 && (
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-medium mb-2 text-green-400">Business Documents</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <label className="block">
//                     <span className="text-gray-300 text-sm">Certificate of Incorporation</span>
//                     <input type="file" className="input-file" required />
//                   </label>
//                   <label className="block">
//                     <span className="text-gray-300 text-sm">Articles of Association</span>
//                     <input type="file" className="input-file" required />
//                   </label>
//                   <label className="block md:col-span-2">
//                     <span className="text-gray-300 text-sm">Proof of Address</span>
//                     <input type="file" className="input-file" required />
//                   </label>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium mb-2 text-green-400">Ownership & Management</h3>
//                 <textarea
//                   className="input"
//                   rows={3}
//                   placeholder="List of directors, shareholders, UBOs"
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           {/* Step 3: Individuals, Financial, Activity */}
//           {step === 3 && (
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-medium mb-2 text-green-400">Individuals (KYC on UBOs/Directors)</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input type="text" placeholder="Full Name" className="input" required />
//                   <DatePicker
//                     selected={dob}
//                     onChange={date => setDob(date)}
//                     dateFormat="dd/MM/yyyy"
//                     placeholderText="Date of Birth"
//                     className="input"
//                     required
//                     showMonthDropdown
//                     showYearDropdown
//                     dropdownMode="select"
//                   />
//                   <input type="text" placeholder="Nationality" className="input" required />
//                   <input type="text" placeholder="ID/Passport Number" className="input" required />
//                   <label className="block md:col-span-2">
//                     <span className="text-gray-300 text-sm">Proof of Address</span>
//                     <input type="file" className="input-file" required />
//                   </label>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium mb-2 text-green-400">Financial Info</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input type="text" placeholder="Tax ID" className="input" required />
//                   <input type="text" placeholder="Bank Account Details" className="input" required />
//                   <label className="block md:col-span-2">
//                     <span className="text-gray-300 text-sm">Financial Statements (optional)</span>
//                     <input type="file" className="input-file" />
//                   </label>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-lg font-medium mb-2 text-green-400">Business Activity</h3>
//                 <input type="text" placeholder="Nature of Business" className="input mb-3" required />
//                 <input type="url" placeholder="Website" className="input mb-3" required />
//                 <input type="text" placeholder="Licenses (if regulated)" className="input" />
//               </div>
//             </div>
//           )}

//           <div className="flex flex-col sm:flex-row gap-4 mt-8">
//             {step > 1 && (
//               <button
//                 type="button"
//                 className="w-full sm:w-auto py-3 px-8 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-full transition"
//                 onClick={() => setStep(step - 1)}
//               >
//                 Back
//               </button>
//             )}
//             {step < totalSteps ? (
//               <button
//                 type="submit"
//                 className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-semibold rounded-full transition"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-semibold rounded-full transition"
//               >
//                 Submit
//               </button>
//             )}
//           </div>
//         </form>

//         {/* Tailwind custom input styles */}
//         <style>{`
//           .input {
//             background-color: #181C1F;
//             color: #fff;
//             border: 1px solid #1BAE6C;
//             border-radius: 0.75rem;
//             padding: 0.75rem 1rem;
//             margin-bottom: 0.5rem;
//             width: 100%;
//             font-family: 'Funnel Sans', sans-serif;
//             font-weight: 300;
//             font-size: 1rem;
//             transition: border 0.2s, box-shadow 0.2s;
//           }
//           .input:focus {
//             outline: none;
//             border-color: #1BAE6C;
//             box-shadow: 0 0 0 2px #1BAE6C33;
//           }
//           .input-file {
//             margin-top: 0.25rem;
//             display: block;
//             width: 100%;
//             color: #1BAE6C;
//             background: transparent;
//             border-radius: 0.5rem;
//             font-size: 0.95rem;
//           }
//           .input-file::-webkit-file-upload-button {
//             background: linear-gradient(135deg, #1BAE6C 0%, #036E47 100%);
//             color: #fff;
//             border: none;
//             border-radius: 9999px;
//             padding: 0.5rem 1.25rem;
//             font-weight: 500;
//             cursor: pointer;
//             margin-right: 1rem;
//           }
//           .input-file::file-selector-button {
//             background: linear-gradient(135deg, #1BAE6C 0%, #036E47 100%);
//             color: #fff;
//             border: none;
//             border-radius: 9999px;
//             padding: 0.5rem 1.25rem;
//             font-weight: 500;
//             cursor: pointer;
//             margin-right: 1rem;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

// export default Loginfrom;
