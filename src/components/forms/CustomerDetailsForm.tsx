import React from 'react';
import { useAssessmentStore } from '../../store/assessmentStore';

interface CustomerDetailsFormProps {
  onNext: () => void;
  isAtturraBranded?: boolean; // Injected by Layout
}

export const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({ onNext, isAtturraBranded }) => {
  const { customerDetails, setCustomerDetail } = useAssessmentStore();

  const primaryColorClass = isAtturraBranded ? 'bg-atturra-600 hover:bg-atturra-700 focus:ring-atturra-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetail(name as any, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-3xl mx-auto">
      <div className={`px-6 py-5 border-b border-gray-200 ${isAtturraBranded ? 'bg-atturra-50' : 'bg-gray-50'}`}>
        <h2 className={`text-lg font-medium leading-6 ${isAtturraBranded ? 'text-atturra-900' : 'text-gray-900'}`}>
          Customer Assessment Details
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Capture basic details about the customer and the scope of this readiness assessment.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              name="customerName"
              id="customerName"
              required
              value={customerDetails.customerName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="E.g., Acme Corp"
            />
          </div>

          <div>
            <label htmlFor="workshopDate" className="block text-sm font-medium text-gray-700">Workshop Date</label>
            <input
              type="date"
              name="workshopDate"
              id="workshopDate"
              required
              value={customerDetails.workshopDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <div>
            <label htmlFor="consultantName" className="block text-sm font-medium text-gray-700">Consultant Name</label>
            <input
              type="text"
              name="consultantName"
              id="consultantName"
              value={customerDetails.consultantName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">Customer Contact Name</label>
            <input
              type="text"
              name="contactName"
              id="contactName"
              value={customerDetails.contactName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Key Stakeholder"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="businessUnit" className="block text-sm font-medium text-gray-700">Business Unit or Team</label>
            <input
              type="text"
              name="businessUnit"
              id="businessUnit"
              value={customerDetails.businessUnit}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="E.g., Engineering, Marketing, Entire Organisation"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="assessmentScope" className="block text-sm font-medium text-gray-700">Assessment Scope</label>
            <textarea
              name="assessmentScope"
              id="assessmentScope"
              rows={3}
              value={customerDetails.assessmentScope}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="What specific AI agents, initiatives, or capabilities are being assessed?"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">General Notes</label>
            <textarea
              name="notes"
              id="notes"
              rows={2}
              value={customerDetails.notes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Any additional context..."
            />
          </div>
          
        </div>

        <div className="pt-4 flex justify-end border-t border-gray-100">
          <button
            type="submit"
            className={`inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${primaryColorClass} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
          >
            Start Assessment Setup
          </button>
        </div>
      </form>
    </div>
  );
};
