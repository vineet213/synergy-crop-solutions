import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import distributorService from "../../services/distributorService.js";

export default function DistributorFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      "address.street": "",
      "address.city": "",
      "address.state": "",
      "address.zip": "",
      serviceableStates: "",
      products: "",
      certifications: "",
      status: "active",
      website: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    setLoading(true);
    distributorService.adminGetDistributor(id)
      .then((data) => {
        if (!mounted) return;
        reset({
          ...data,
          "address.street": data.address?.street || "",
          "address.city": data.address?.city || "",
          "address.state": data.address?.state || "",
          "address.zip": data.address?.zip || "",
          serviceableStates: (data.serviceableStates || []).join(", "),
          products: (data.products || []).join(", "),
          certifications: (data.certifications || []).join(", "),
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load distributor");
        navigate("/admin/distributors");
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id, isEdit, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        address: {
          street: data["address.street"],
          city: data["address.city"],
          state: data["address.state"],
          zip: data["address.zip"],
        },
        serviceableStates: data.serviceableStates.split(",").map((s) => s.trim()).filter(Boolean),
        products: data.products.split(",").map((s) => s.trim()).filter(Boolean),
        certifications: data.certifications.split(",").map((s) => s.trim()).filter(Boolean),
      };
      delete payload["address.street"];
      delete payload["address.city"];
      delete payload["address.state"];
      delete payload["address.zip"];

      if (isEdit) {
        await distributorService.adminUpdateDistributor(id, payload);
      } else {
        await distributorService.adminCreateDistributor(payload);
      }
      navigate("/admin/distributors");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save distributor");
    }
  };

  if (loading) return <main className="page-container"><p>Loading…</p></main>;

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? "Edit Distributor" : "Add Distributor"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Name *</label>
          <input {...register("name", { required: "Name is required" })} className="input-field" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Company *</label>
          <input {...register("company", { required: "Company is required" })} className="input-field" />
          {errors.company && <p className="text-sm text-red-600">{errors.company.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email *</label>
          <input type="email" {...register("email", { required: "Email is required" })} className="input-field" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Phone *</label>
          <input {...register("phone", { required: "Phone is required" })} className="input-field" />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Street</label>
          <input {...register("address.street")} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium">City *</label>
          <input {...register("address.city", { required: "City is required" })} className="input-field" />
          {errors["address.city"] && <p className="text-sm text-red-600">{errors["address.city"].message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">State *</label>
          <input {...register("address.state", { required: "State is required" })} className="input-field" />
          {errors["address.state"] && <p className="text-sm text-red-600">{errors["address.state"].message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">ZIP</label>
          <input {...register("address.zip")} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium">Serviceable States (comma-separated)</label>
          <input {...register("serviceableStates")} className="input-field" placeholder="e.g. Maharashtra, Gujarat, Karnataka" />
        </div>
        <div>
          <label className="block text-sm font-medium">Products (comma-separated)</label>
          <input {...register("products")} className="input-field" placeholder="e.g. Bio Pesticides, Fertilisers" />
        </div>
        <div>
          <label className="block text-sm font-medium">Certifications (comma-separated)</label>
          <input {...register("certifications")} className="input-field" placeholder="e.g. ISO 9001, Organic Certified" />
        </div>
        <div>
          <label className="block text-sm font-medium">Website</label>
          <input {...register("website")} className="input-field" placeholder="https://" />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select {...register("status")} className="input-field">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea {...register("description")} className="input-field" rows={3} />
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? "Saving…" : isEdit ? "Update" : "Create"}
          </button>
          <button type="button" onClick={() => navigate("/admin/distributors")} className="button-base">
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
