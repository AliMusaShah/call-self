import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { FiTrash } from 'react-icons/fi';
import CustomButton from '../../../components/CustomButton';
import { dropdownTypes, questionTypes, starRating, validTypes } from '../../../mock/data';
import AnswersField from './AnswersField';
import DateTimeField from './DateTimeField';
import FileUploadField from './FileUploadField';
import QuestionDropdown from './QuestionDropdown';
import { useAddInspectionFormMutation, useGetInspectionFormByIdQuery, useUpdateInspectionFormMutation } from '../../../api/apiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomLoader from '../../../components/CustomLoader';
import ScopeOfWork from './ScopeOfWork';
import { toast } from 'react-toastify';

const AddNewForm = () => {
    const { state } = useLocation();
    const [addInspectionForm,] = useAddInspectionFormMutation()
    const { data: fromById, isLoading: isLoadingForm } = useGetInspectionFormByIdQuery(state?.formId, {
        skip: !state?.formId,
        refetchOnMountOrArgChange: true
    })
    const [updateInspectionForm,] = useUpdateInspectionFormMutation()
    const navigate = useNavigate();
    // console.log('Form Type Value:', fromById?.data); // Add this to debug

    // const initialValues = {
    //     title: fromById?.data?.title || '',
    //     formType: fromById?.data?.formType || '',
    //     sections: [
    //         {
    //             heading: '',
    //             standardInfo: {
    //                 findings: false,
    //                 possibleRootCauses: false,
    //                 recommendations: false
    //             },
    //             questions: [
    //                 {
    //                     questionText: '',
    //                     questionType: questionTypes[0].value, // Default to the first question type
    //                 }
    //             ]
    //         }
    //     ]
    // }
    const initialValues = {
        title: fromById?.data?.title || '',
        formType: fromById?.data?.formType || '',
        sections: fromById?.data?.sections ? fromById.data.sections.map(section => ({
            heading: section.heading || '',
            standardInfo: {
                findings: section.standardInfo?.findings || true,
                possibleRootCauses: section.standardInfo?.possibleRootCauses || true,
                recommendations: section.standardInfo?.recommendations || true,
                meterReadings: section.standardInfo?.meterReadings || true

            },
            questions: section.questions ? section.questions.map(question => ({
                questionText: question.questionText || '',
                questionType: question.questionType || questionTypes[0].value,
                options: question.options || [],
                answers: question.answers || [],
                ...(question.questionType !== 'Single Text Box' && { scaleType: question.scaleType || '' }),
                allowedFileTypes: question.allowedFileTypes || [],
                dateTimeOptions: question.dateTimeOptions || undefined,
                _id: question._id // Keep the ID if you need it for updates
            })) : [
                {
                    questionText: '',
                    questionType: questionTypes[0].value,
                    options: [],
                    answers: [],
                    ...(questionTypes[0].value !== 'Single Text Box' && { scaleType: '' }),
                    allowedFileTypes: []
                }
            ]
        })) : [
            {
                heading: '',
                standardInfo: {
                    findings: true,
                    possibleRootCauses: true,
                    recommendations: true,
                    meterReadings: true
                },
                questions: [
                    {
                        questionText: '',
                        questionType: questionTypes[0].value,
                        options: [],
                        answers: [],
                        ...(questionTypes[0].value !== 'Single Text Box' && { scaleType: '' }),
                        allowedFileTypes: []
                    }
                ]
            }
        ],
        ScopeOfWork: fromById?.data?.ScopeOfWork || [{ text: '' }],
    }

    const boolType = ['Yes', 'No'];



    const getOptionsForQuestionType = (type) => {
        switch (type) {
            case 'Single Text Box':
                return;
            case 'Single Numeric Box':
                return;
            case 'Multiple Choice':
                return boolType;
            case 'Dropdown':
                return [];
            case 'Star Rating':
                return;
            case 'Checkboxes':
                return boolType;
            case 'Date / Time': {
                const dateTimeOptions = {
                    collectDate: false,
                    collectTime: false,
                    dateFormat: [
                        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' }
                    ]
                };
                return dateTimeOptions;
            }
            case 'File Upload':
                return [];
            default:
                return [];
        }
    }

    const handleSubmit = async (values) => {
        // console.log(values, 'values')

        try {
            if (state?.formId) {
                await updateInspectionForm({ id: state?.formId, payload: values }).unwrap()
            }
            else {

                await addInspectionForm(values).unwrap()
            }
            navigate(-1)
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message)
        }
    }

    return (
        <div className='p-4 bg-white'>
            <h1>Add New Form</h1>
            {isLoadingForm ? <CustomLoader /> : <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
                            <div className="space-y-2">
                                <label className="text-gray-700">Form Title</label>
                                <Field
                                    name="title"
                                    type="text"
                                    className="w-full px-4 py-2 rounded-md border border-gray-400 text-gray-700"
                                    placeholder="Enter Name"
                                />
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-gray-700">Form Type</label>
                                <Field
                                    as="select"
                                    name="formType"
                                    className="w-full px-4 py-2 rounded-md border border-gray-400 text-gray-700"
                                >
                                    <option value="">Select Type</option>
                                    <option value="master">Master</option>
                                    <option value="Post-Inspection">Post-Inspection</option>
                                    <option value="Pre-Inspection">Pre-Inspection</option>
                                </Field>
                                <ErrorMessage
                                    name="formType"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                        </div>

                        <FieldArray name="sections">
                            {({ remove, push }) => (
                                <div>
                                    {values.sections.length > 0 &&
                                        values.sections.map((section, index) => (
                                            <div key={index}>
                                                <div className="">
                                                    <div className='flex justify-between items-center'>
                                                        <h2 className="text-lg font-semibold">Section {index + 1}</h2>

                                                        {values.sections.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className="mt-4 bg-red-500 text-white px-2 py-2 rounded-md cursor-pointer hover:bg-red-600"
                                                            >
                                                                <FiTrash />
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className="space-y-2 bg-[var(--defaultBgColor)]">
                                                            <div className='flex justify-between items-center'>
                                                                <label className="text-gray-700">Section Heading</label>
                                                                <div className='flex justify-between items-center'>
                                                                    <h3 className="text-lg font-semibold mx-2">Standard Information:</h3>
                                                                    <div className="flex items-center">
                                                                        <label className="mr-2">
                                                                            <Field
                                                                                type="checkbox"
                                                                                name={`sections.${index}.standardInfo.findings`}
                                                                            />
                                                                            Findings
                                                                        </label>
                                                                        <label className="mr-2">
                                                                            <Field
                                                                                type="checkbox"
                                                                                name={`sections.${index}.standardInfo.possibleRootCauses`}
                                                                            />
                                                                            Possible Root Causes
                                                                        </label>
                                                                        <label className="mr-2">
                                                                            <Field
                                                                                type="checkbox"
                                                                                name={`sections.${index}.standardInfo.recommendations`}
                                                                            />
                                                                            Recommendations
                                                                        </label>
                                                                        <label className="mr-2">
                                                                            <Field
                                                                                type="checkbox"
                                                                                name={`sections.${index}.standardInfo.meterReadings`}
                                                                            />
                                                                            Meter Readings
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <Field
                                                                name={`sections.${index}.heading`}
                                                                type="text"
                                                                className="w-full px-4 py-2 rounded-md border border-gray-400 text-gray-700"
                                                                placeholder="Enter Section Heading"
                                                            />
                                                            <ErrorMessage
                                                                name={`sections.${index}.heading`}
                                                                component="div"
                                                                className="text-red-500 text-sm"
                                                            />

                                                            {/* Questions Section */}
                                                            <FieldArray name={`sections.${index}.questions`}>
                                                                {({ remove: removeQuestion, push: pushQuestion }) => (
                                                                    <div>
                                                                        {section.questions.map((question, questionIndex) => (
                                                                            <div key={questionIndex} className=" p-3 mt-3 rounded bg-white">
                                                                                <div className='flex justify-between items-center mb-2'>
                                                                                    <h4 className="font-medium">Question {questionIndex + 1}</h4>
                                                                                    {section.questions.length > 1 && (
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => removeQuestion(questionIndex)}
                                                                                            className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                                                                                        >
                                                                                            <FiTrash />
                                                                                        </button>
                                                                                    )}
                                                                                </div>

                                                                                <div className='flex justify-between items-center gap-3'>
                                                                                    <div className='w-3/4'>
                                                                                        <label className="text-gray-700">Question Text</label>
                                                                                        <Field
                                                                                            name={`sections.${index}.questions.${questionIndex}.questionText`}
                                                                                            type="text"
                                                                                            className="px-4 py-2 rounded-md border w-full border-gray-400 text-gray-700"
                                                                                            placeholder="Enter Question"
                                                                                        />
                                                                                        <ErrorMessage
                                                                                            name={`sections.${index}.questions.${questionIndex}.questionText`}
                                                                                            component="div"
                                                                                            className="text-red-500 text-sm"
                                                                                        />
                                                                                    </div>
                                                                                    <QuestionDropdown
                                                                                        key={question.id || questionIndex}
                                                                                        question={question}
                                                                                        name={`sections.${index}.questions.${questionIndex}.scaleType`}
                                                                                        questionTypes={values?.sections[index]?.questions[questionIndex]?.questionType === 'Star Rating' ? starRating
                                                                                            // :                   values?.sections[index]?.questions[questionIndex]?.questionType === 'Single Numeric Box' ? numericBoxTypes
                                                                                            : dropdownTypes}
                                                                                    />

                                                                                    <div className='w-1/4'>
                                                                                        <label className="text-gray-700">Question Type</label>
                                                                                        <Field
                                                                                            name={`sections.${index}.questions.${questionIndex}.questionType`}
                                                                                            as="select"
                                                                                            className="px-4 py-2 rounded-md border w-full border-gray-400 text-gray-700"
                                                                                            onChange={
                                                                                                (e) => {
                                                                                                    const selectedType = e.target.value;
                                                                                                    setFieldValue(`sections.${index}.questions.${questionIndex}.questionType`, selectedType);
                                                                                                    if (selectedType === 'Date / Time') {
                                                                                                        setFieldValue(`sections.${index}.questions.${questionIndex}.dateTimeOptions`, getOptionsForQuestionType(selectedType));
                                                                                                    } else {
                                                                                                        setFieldValue(`sections.${index}.questions.${questionIndex}.options`, getOptionsForQuestionType(selectedType));
                                                                                                        setFieldValue(`sections.${index}.questions.${questionIndex}.dateTimeOptions`, undefined)
                                                                                                    }
                                                                                                    if (validTypes.includes(selectedType)) {
                                                                                                        setFieldValue(`sections.${index}.questions.${questionIndex}.answers`, [{ ans: '' }]);
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        >
                                                                                            {/* <option value="" selected>Select type</option> */}
                                                                                            {questionTypes.map(type => (
                                                                                                <option key={type.value} value={type.value}>
                                                                                                    {type.label}
                                                                                                </option>
                                                                                            ))}
                                                                                        </Field>
                                                                                        <ErrorMessage
                                                                                            name={`sections.${index}.questions.${questionIndex}.questionType`}
                                                                                            component="div"
                                                                                            className="text-red-500 text-sm"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                {/* <FieldArray>
                                                                                    {({ remove: removeAnswer, push: pushAnswer }) => (
                                                                                        <>
                                                                                            {question?.answers && question.answers.map((answer, answerIndex) => (
                                                                                                <div>
                                                                                                    <Field
                                                                                                        key={answerIndex}
                                                                                                        type="text"
                                                                                                        name={`sections.${index}.questions.${questionIndex}.answers.${answerIndex}`}
                                                                                                    />
                                                                                                </div>
                                                                                            ))}
                                                                                        </>
                                                                                    )}
                                                                                </FieldArray> */}

                                                                                <AnswersField
                                                                                    question={question}
                                                                                    index={index}
                                                                                    questionIndex={questionIndex}
                                                                                />
                                                                                <FileUploadField
                                                                                    question={question}
                                                                                    name={`sections.${index}.questions.${questionIndex}.allowedFileTypes`}
                                                                                    values={values}
                                                                                    setFieldValue={setFieldValue}
                                                                                    index={index}
                                                                                    questionIndex={questionIndex}
                                                                                />
                                                                                <DateTimeField
                                                                                    question={question}
                                                                                    name={`sections.${index}.questions.${questionIndex}`}
                                                                                    values={values}
                                                                                    setFieldValue={setFieldValue}
                                                                                    index={index}
                                                                                    questionIndex={questionIndex}
                                                                                    getOptionsForQuestionType={getOptionsForQuestionType}
                                                                                />

                                                                            </div>
                                                                        ))}

                                                                        <div className='flex justify-end items-center gap-3 mt-2'>
                                                                            <CustomButton
                                                                                size='md'
                                                                                type="button"
                                                                                onClick={() => pushQuestion({
                                                                                    questionText: '',
                                                                                    questionType: '',
                                                                                    options: []
                                                                                })}
                                                                            >
                                                                                Add Question
                                                                            </CustomButton>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </FieldArray>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Add Section button - only show after the last section */}
                                                {index === values.sections.length - 1 && (
                                                    <div className=''>
                                                        <CustomButton
                                                            size='md'
                                                            type="button"
                                                            onClick={() => push({
                                                                heading: '',
                                                                standardInfo: {
                                                                    findings: true,
                                                                    possibleRootCauses: false,
                                                                    recommendations: true
                                                                },
                                                                questions: [
                                                                    {
                                                                        questionText: '',
                                                                        questionType: '',
                                                                        options: []
                                                                    }
                                                                ]
                                                            })}
                                                        >
                                                            Add Section
                                                        </CustomButton>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </FieldArray>
                        <ScopeOfWork values={values} />

                        <div className="flex justify-end gap-4">
                            <CustomButton type="button" size="md" variant='secondary'>
                                Cancel
                            </CustomButton>
                            <CustomButton type="submit" size="md" isLoading={isSubmitting} >
                                Save
                            </CustomButton>
                        </div>
                    </Form>
                )}
            </Formik>}
        </div>
    )
}

export default AddNewForm