import { Field, FieldArray } from 'formik';
import { SpecificValidTypesForAnswers } from '../../../mock/data';

const AnswersField = ({ question, index, questionIndex }) => {
    if (!SpecificValidTypesForAnswers.includes(question?.questionType)) {
        return null; // Render nothing if questionType is not in validTypes
    }

    const answersFieldName = `sections.${index}.questions.${questionIndex}.answers`;

    return (
        <div className="w-1/2">
            <FieldArray name={answersFieldName}>
                {({ remove: removeAnswer, push: pushAnswer, form }) => {
                    const answers = form.values?.sections?.[index]?.questions?.[questionIndex]?.answers || [];
                    if (answers.length === 0) {
                        // Initialize with one empty answer if none exist
                        form.setFieldValue(answersFieldName, [{ ans: '' }]);
                    }

                    return (

                        <>
                            {question?.answers && question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="flex items-center gap-2 my-4">
                                    <Field
                                        type="text"
                                        name={`${answersFieldName}.${answerIndex}.ans`}
                                        placeholder={`Enter an answer choice`}
                                        className="px-4 py-2 rounded-md border w-full border-gray-400 text-gray-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeAnswer(answerIndex)}
                                        className="px-2 py-1 bg-[var(--defaultBlue)] text-white rounded-full hover:bg-sky-500 cursor-pointer"
                                        disabled={question.answers.length <= 1}
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => pushAnswer({ ans: '' })}
                                        className="px-2 py-1 bg-[var(--defaultBlue)]  text-white rounded-full hover:bg-sky-500 cursor-pointer "
                                    >
                                        +
                                    </button>
                                </div>
                            ))}

                        </>
                    )
                }
                }
            </FieldArray>
        </div>
    )
}

export default AnswersField