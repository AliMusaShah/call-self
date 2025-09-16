const InspectionSection = ({ children }) => (
    <div className="mt-6 p-4 border border-gray-300 rounded-2xl bg-white">
        <h3 className="font-semibold text-lg capitalize">Findings & Recommendations</h3>
        <p className=" capitalize">Below is our findings and recommendation based on the condition of your premises:</p>

        {children}
    </div>
);
export default InspectionSection;  