import { Field } from 'formik';
import { validTypes } from '../../../mock/data';

const QuestionDropdown = ({ question, name, questionTypes }) => {
    if (!validTypes.includes(question?.questionType)) {
        return null; // Render nothing if questionType is not in validTypes
    }
    return (
        <div className="w-3/4">
            <label className="text-white">Question Text</label>
            <Field
                as="select"
                name={name}
                className="px-4 py-2 rounded-md border w-full border-gray-400 text-gray-700"
            >
                {questionTypes.map(type => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
            </Field>
        </div>
    );
}

export default QuestionDropdown