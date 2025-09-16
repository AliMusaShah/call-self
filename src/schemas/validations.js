import * as Yup from "yup";

export const addCustomerSchema = Yup.object().shape({
  customerName: Yup.string()
    .required("Customer name is required")
    .min(2, "Name must be at least 2 characters"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .required("Phone is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  address: Yup.string().required("Address is required"),

  city: Yup.string().required("City is required"),

  state: Yup.string().required("State is required"),

  zipCode: Yup.string()
    .matches(/^\d{5}$/, "Zip Code must be 5 digits")
    .required("Zip Code is required"),
});
export const assignTaskSchema = Yup.object().shape({
  inspectorId: Yup.string().required("Inspector is required"),
  formId: Yup.string().required("form is required"),

  priority: Yup.string().required("Priority is required"),

  inspectionDate: Yup.date()
    .required("Inspection date is required")
    .min(new Date(), "Inspection date cannot be in the past"),

  notes: Yup.string()
    .required("Note is required")
    .max(500, "Notes cannot exceed 500 characters"),
});
export const serviceValidationSchema = Yup.object().shape({
  // Service Name - Required, between 3-100 characters
  serviceName: Yup.string()
    .required("Service name is required")
    .min(3, "Service name must be at least 3 characters")
    .max(100, "Service name must not exceed 100 characters"),

  // Category - Required
  category: Yup.string().required("Category is required"),

  // Status - Required
  status: Yup.string().required("Status is required"),

  // Base Price - Required, must be a positive number
  basePrice: Yup.number()
    .required("Base price is required")
    .typeError("Base price must be a number")
    .positive("Base price must be a positive number")
    .test(
      "is-decimal",
      "Base price cannot have more than 2 decimal places",
      (value) => !value || /^\d+(\.\d{1,2})?$/.test(value.toString())
    ),

  // Discount Type - Required when discount percentage is provided
  discountType: Yup.string().required("Discount type is required"),

  // Discount Percentage - Optional, must be between 0-100
  discountPercentage: Yup.number()
    .typeError("Discount percentage must be a number")
    .min(0, "Discount percentage cannot be negative")
    .max(100, "Discount percentage cannot exceed 100%")
    .required("Discount Percentage is Required"),

  // Tax Class - Required when VAT amount is provided
  taxClass: Yup.string().required("tax Class is Required"),

  // VAT Amount - Optional, must be between 0-100
  VATAmount: Yup.number()
    .typeError("VAT amount must be a number")
    .min(0, "VAT amount cannot be negative")
    .max(100, "VAT amount cannot exceed 100%")
    .required("vat Amount is Required"),

  // Description - Optional, max 500 characters
  description: Yup.string()
    .max(500, "Description must not exceed 500 characters")
    .required("Description is Required"),
});
export const certificateValidationSchema = Yup.object().shape({
  // Customer - Required field
  customer_uid: Yup.string().required("Please select a customer"),

  // Certificate Type - Required field
  certificateType: Yup.string().required("Certificate type is required"),

  // Rating Type - Required field
  ratingType: Yup.string().required("Rating type is required"),

  // Current Rating - Required field with pattern validation
  currentRating: Yup.number()
    .required("Current rating is required")
    .max(5, "Current rating cannot be more than 5")
    .min(1, "Current rating cannot be less than 1"),

  // Expired Date - Required field with future date validation
  expiredDate: Yup.date().required("Expiration date is required"),
  // .min(
  //   new Date(new Date().setHours(0, 0, 0, 0)),
  //   "Expiration date cannot be in the past"
  // )
});
export const adduserValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),

  email: Yup.string().required("Email is required"),

  role: Yup.string().required("Role is required"),

  password: Yup.string().required("Password is required"),
});
