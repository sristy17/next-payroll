"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Building2, Calendar, User, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

/**
 * Validation schema (Zod)
 */
const businessSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters long")
    .max(100, "Business name cannot exceed 100 characters")
    .regex(/^[a-zA-Z0-9&\s]+$/, "Only letters, numbers and & allowed"),

  businessType: z.string().min(1, "Business type is required"),

  industry: z
    .string()
    .regex(/^[a-zA-Z\s]*$/, "Only letters and spaces allowed")
    .optional(),

  establishedDate: z.any().optional(), // handled by calendar, not validated here

  registrationNumber: z
    .string()
    .max(15, "Registration number cannot exceed 15 characters")
    .regex(/^[a-zA-Z0-9]*$/, "Only letters and numbers allowed")
    .optional(),

  panNumber: z
    .string()
    .length(10, "PAN must be exactly 10 characters")
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),

  gstNumber: z
    .string()
    .length(15, "GST must be exactly 15 characters")
    .regex(/^[0-9A-Z]{15}$/, "Invalid GST number format")
    .optional(),

  contactPerson: z.string().min(2, "Contact person name is required"),

  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  website: z.string().url("Invalid website URL").optional(),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

export default function AddBusiness() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    industry: "",
    registrationNumber: "",
    panNumber: "",
    gstNumber: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    establishedDate: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [valid, setValid] = useState<Record<string, boolean>>({});
  const debounceTimers = useRef<Record<string, any>>({});

  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach((t) => {
        if (t) clearTimeout(t);
      });
    };
  }, []);

  const validateField = (name: string, value: any) => {
  const shape = (businessSchema as any).shape || {};
  const fieldSchema = shape[name] ?? z.any();
  const single = z.object({ [name]: fieldSchema });

  const result = single.safeParse({ [name]: value });

  if (!result.success) {
    setErrors((prev) => ({ ...prev, [name]: result.error.issues[0].message }));
    setValid((prev) => ({ ...prev, [name]: false }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setValid((prev) => ({ ...prev, [name]: true }));

    // ⏳ Auto-hide success message after 2s
    setTimeout(() => {
      setValid((prev) => ({ ...prev, [name]: false }));
    }, 2000);

    return true;
  }
};

  const scheduleFieldValidation = (name: string, value: any) => {
    if (debounceTimers.current[name]) {
      clearTimeout(debounceTimers.current[name]);
    }
    debounceTimers.current[name] = setTimeout(() => {
      validateField(name, value);
      debounceTimers.current[name] = null;
    }, 700);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    let value = e.target.value;

    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "panNumber") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    } else if (name === "gstNumber") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
    } else if (name === "registrationNumber") {
      value = value.replace(/[^A-Z0-9]/gi, "").slice(0, 15);
    } else if (name === "businessName") {
      value = value.slice(0, 100);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setValid((prev) => ({ ...prev, [name]: false }));

    scheduleFieldValidation(name, value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    if (debounceTimers.current[name]) {
      clearTimeout(debounceTimers.current[name]);
      debounceTimers.current[name] = null;
    }
    validateField(name, (formData as any)[name]);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = businessSchema.parse(formData);
      console.log("Validated business data:", validatedData);
      setErrors({});
      setValid({});
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          fieldErrors[field] = issue.message;
        });
        setErrors(fieldErrors);
        const invalids: Record<string, boolean> = {};
        Object.keys(fieldErrors).forEach((k) => (invalids[k] = false));
        setValid((prev) => ({ ...prev, ...invalids }));
      } else {
        console.error(err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const showError = (field: string) => !!errors[field];
  const showSuccess = (field: string) => valid[field] && !errors[field];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <Navbar
          title="Add New Business"
          description="Set up your business profile for payroll and tax management"
        />

        <main className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Name */}
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Enter business name"
                    required
                    maxLength={100}
                  />
                  {showError("businessName") && (
                    <p className="text-red-500 text-sm">
                      {errors.businessName}
                    </p>
                  )}
                  {!showError("businessName") &&
                    showSuccess("businessName") && (
                      <p className="text-green-600 text-sm">Ok</p>
                    )}
                </div>

                {/* Business Type */}
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value: string) =>
                      handleSelectChange("businessType", value)
                    }
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole_proprietorship">
                        Sole Proprietorship
                      </SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="private_limited">
                        Private Limited Company
                      </SelectItem>
                      <SelectItem value="public_limited">
                        Public Limited Company
                      </SelectItem>
                      <SelectItem value="llp">
                        Limited Liability Partnership
                      </SelectItem>
                      <SelectItem value="trust">Trust</SelectItem>
                      <SelectItem value="society">Society</SelectItem>
                    </SelectContent>
                  </Select>
                  {showError("businessType") && (
                    <p className="text-red-500 text-sm">
                      {errors.businessType}
                    </p>
                  )}
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="e.g., Technology, Healthcare"
                    maxLength={50}
                  />
                  {showError("industry") && (
                    <p className="text-red-500 text-sm">{errors.industry}</p>
                  )}
                  {!showError("industry") && showSuccess("industry") && (
                    <p className="text-green-600 text-sm">OK</p>
                  )}
                </div>

                {/* Established Date */}
                <div className="space-y-2">
                  <Label htmlFor="establishedDate">Established Date</Label>
                  <Input
                    id="establishedDate"
                    name="establishedDate"
                    type="date"
                    value={formData.establishedDate}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>

            {/* Legal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                Legal & Registration Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Registration Number */}
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">
                    Registration Number
                  </Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Company registration number"
                    maxLength={15}
                  />
                  {showError("registrationNumber") && (
                    <p className="text-red-500 text-sm">
                      {errors.registrationNumber}
                    </p>
                  )}
                  {!showError("registrationNumber") &&
                    showSuccess("registrationNumber") && (
                      <p className="text-green-600 text-sm">OK</p>
                    )}
                </div>

                {/* PAN */}
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number *</Label>
                  <Input
                    id="panNumber"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="ABCDE1234F"
                    required
                    maxLength={10}
                    className="uppercase"
                  />
                  {showError("panNumber") && (
                    <p className="text-red-500 text-sm">{errors.panNumber}</p>
                  )}
                  {!showError("panNumber") && showSuccess("panNumber") && (
                    <p className="text-green-600 text-sm">OK</p>
                  )}
                </div>

                {/* GST */}
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="22AAAAA0000A1Z5"
                    maxLength={15}
                    className="uppercase"
                  />
                  {showError("gstNumber") && (
                    <p className="text-red-500 text-sm">{errors.gstNumber}</p>
                  )}
                  {!showError("gstNumber") && showSuccess("gstNumber") && (
                    <p className="text-green-600 text-sm">OK</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-600" />
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Person */}
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Full name of contact person"
                    required
                    maxLength={60}
                  />
                  {showError("contactPerson") && (
                    <p className="text-red-500 text-sm">
                      {errors.contactPerson}
                    </p>
                  )}
                  {!showError("contactPerson") &&
                    showSuccess("contactPerson") && (
                      <p className="text-green-600 text-sm">OK</p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="business@example.com"
                    required
                    maxLength={80}
                  />
                  {showError("email") && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                  {!showError("email") && showSuccess("email") && (
                    <p className="text-green-600 text-sm">OK</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="9876543210"
                    required
                    maxLength={10}
                  />
                  {showError("phone") && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                  {!showError("phone") && showSuccess("phone") && (
                    <p className="text-green-600 text-sm">OK</p>
                  )}
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="https://www.example.com"
                    maxLength={200}
                  />
                  {showError("website") && (
                    <p className="text-red-500 text-sm">{errors.website}</p>
                  )}
                  {!showError("website") && showSuccess("website") && (
                    <p className="text-green-600 text-sm">OK</p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Business Description
              </h2>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Brief description of your business activities..."
                  rows={4}
                  maxLength={500}
                  className="resize-none"
                />
                {showError("description") && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
                {!showError("description") && showSuccess("description") && (
                  <p className="text-green-600 text-sm">OK</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoBack}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Business"}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
