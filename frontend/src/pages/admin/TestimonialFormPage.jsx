import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import testimonialService from "../../services/testimonialService.js";

export default function TestimonialFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      customerName: "",
      location: "",
      testimonial: "",
      rating: "",
      crop: "",
      isFeatured: false,
      status: "active",
    },
  });

  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    setLoading(true);
    testimonialService.adminGetTestimonial(id)
      .then((data) => {
        if (!mounted) return;
        reset({
          ...data,
          rating: data.rating ?? "",
          isFeatured: data.isFeatured ?? false,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load testimonial");
        navigate("/admin/testimonials");
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id, isEdit, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        rating: data.rating ? Number(data.rating) : undefined,
        isFeatured: Boolean(data.isFeatured),
      };
      if (isEdit) {
        await testimonialService.adminUpdateTestimonial(id, payload);
      } else {
        await testimonialService.adminCreateTestimonial(payload);
      }
      navigate("/admin/testimonials");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save testimonial");
    }
  };

  if (loading) return <main className="page-container"><p>Loading&hellip;</p></main>;

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? "Edit Testimonial" : "Create Testimonial"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Customer Name *</label>
          <input {...register("customerName", { required: "Customer name is required" })} className="input-field" />
          {errors.customerName && <p className="text-sm text-red-600">{errors.customerName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input {...register("location")} className="input-field" placeholder="e.g. Maharashtra, India" />
        </div>
        <div>
          <label className="block text-sm font-medium">Testimonial *</label>
          <textarea {...register("testimonial", { required: "Testimonial is required" })} className="input-field" rows={4} />
          {errors.testimonial && <p className="text-sm text-red-600">{errors.testimonial.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Rating (1-5)</label>
          <input type="number" min="1" max="5" {...register("rating")} className="input-field" placeholder="5" />
        </div>
        <div>
          <label className="block text-sm font-medium">Crop</label>
          <input {...register("crop")} className="input-field" placeholder="e.g. Rice, Wheat" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" {...register("isFeatured")} />
            Featured testimonial
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select {...register("status")} className="input-field">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? "Saving&hellip;" : isEdit ? "Update" : "Create"}
          </button>
          <button type="button" onClick={() => navigate("/admin/testimonials")} className="button-base">
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
