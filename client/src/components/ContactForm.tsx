import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ContactFormProps {
  language: "en" | "ar";
}

export default function ContactForm({ language }: ContactFormProps) {
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success(
        isArabic
          ? "تم إرسال الرسالة بنجاح!"
          : "Message sent successfully!"
      );
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error(
        isArabic
          ? "حدث خطأ في إرسال الرسالة"
          : "Error sending message"
      );
      console.error(error);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      ...formData,
      language,
    });
  };

  const labels = {
    firstName: isArabic ? "الاسم الأول" : "First Name",
    lastName: isArabic ? "الاسم الأخير" : "Last Name",
    email: isArabic ? "البريد الإلكتروني" : "Email",
    phone: isArabic ? "رقم الهاتف" : "Phone Number",
    company: isArabic ? "الشركة" : "Company",
    subject: isArabic ? "الموضوع" : "Subject",
    message: isArabic ? "الرسالة" : "Message",
    send: isArabic ? "إرسال" : "Send Message",
  };

  return (
    <form onSubmit={handleSubmit} dir={dir} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {labels.firstName}
          </label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={labels.firstName}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {labels.lastName}
          </label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={labels.lastName}
            required
            className="w-full"
          />
        </div>
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {labels.email}
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={labels.email}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {labels.phone}
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={labels.phone}
            className="w-full"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {labels.company}
        </label>
        <Input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder={labels.company}
          className="w-full"
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {labels.subject}
        </label>
        <Input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={labels.subject}
          required
          className="w-full"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-2">
          {labels.message}
        </label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={labels.message}
          required
          rows={5}
          className="w-full"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={submitMutation.isPending}
        className="btn-primary w-full md:w-auto flex items-center gap-2"
      >
        {submitMutation.isPending && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        {labels.send}
      </Button>
    </form>
  );
}
