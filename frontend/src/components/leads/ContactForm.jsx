import { useState } from "react";
import { useForm } from "react-hook-form";
import leadService from "../../services/leadService.js";
import Button from "../ui/Button.jsx";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { name: "", email: "", phone: "", company: "", message: "" },
  });

  const onSubmit = async (data) => {
    try {
      await leadService.createPublicLead(data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="card-shell" style={{ padding: "2rem", textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.5rem", color: "var(--brand)" }}>Thank you!</h3>
        <p className="card-description">We have received your inquiry and will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-block">
      <div>
        <label className="block text-sm font-medium">Name *</label>
        <input {...register("name", { required: "Name is required" })} className="input-field" placeholder="Your full name" />
        {errors.name && <p className="text-sm text-red-600" style={{ marginTop: "0.25rem" }}>{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Email *</label>
        <input type="email" {...register("email", { required: "Email is required" })} className="input-field" placeholder="your@email.com" />
        {errors.email && <p className="text-sm text-red-600" style={{ marginTop: "0.25rem" }}>{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input {...register("phone")} className="input-field" placeholder="+91-9876543210" />
      </div>
      <div>
        <label className="block text-sm font-medium">Company / Farm Name</label>
        <input {...register("company")} className="input-field" placeholder="Your farm or organization" />
      </div>
      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea {...register("message")} className="input-field" rows={4} placeholder="How can we help you?" />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Send Inquiry"}
      </Button>
    </form>
  );
}
