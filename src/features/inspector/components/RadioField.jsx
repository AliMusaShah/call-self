import { Field } from 'formik';

const RadioField = ({ name, label, value, onChange, checked }) => {
    return (
        <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
                <Field
                    type="radio"
                    name={name}
                    value={value}
                    className="border-gray-400"
                    onChange={onChange}
                    checked={checked}
                />
                <span className="text-gray-700">{label}</span>
            </label>
        </div>
    );
};

export default RadioField;