import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import productService from "../../services/productService.js";

export default function ProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      category: "Bio Pesticides",
      description: "",
      price: "",
      images: "",
      status: "published",
    },
  });

  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    setLoading(true);
    productService.adminGetProduct(id)
      .then((data) => {
        if (!mounted) return;
        reset({
          ...data,
          images: (data.images || []).join(", "),
          price: data.price ?? "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load product");
        navigate("/admin/products");
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id, isEdit, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        images: data.images.split(",").map((s) => s.trim()).filter(Boolean),
        price: data.price ? Number(data.price) : undefined,
      };
      if (isEdit) {
        await productService.adminUpdateProduct(id, payload);
      } else {
        await productService.adminCreateProduct(payload);
      }
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    }
  };

  if (loading) return <main className="page-container"><p>Loading…</p></main>;

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? "Edit Product" : "Create Product"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Name *</label>
          <input {...register("name", { required: "Name is required" })} className="input-field" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input {...register("slug")} className="input-field" placeholder="Leave empty to auto-generate" />
        </div>
        <div>
          <label className="block text-sm font-medium">Category *</label>
          <select {...register("category", { required: true })} className="input-field">
            <option>Bio Pesticides</option>
            <option>Bio Fertilisers</option>
            <option>Fungicides</option>
            <option>Micro Nutrients</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input type="number" step="0.01" {...register("price")} className="input-field" placeholder="0.00" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea {...register("description")} className="input-field" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium">Images (comma-separated URLs)</label>
          <input {...register("images")} className="input-field" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select {...register("status")} className="input-field">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={isSubmitting} className="button-base button-primary">
            {isSubmitting ? "Saving…" : isEdit ? "Update" : "Create"}
          </button>
          <button type="button" onClick={() => navigate("/admin/products")} className="button-base">
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
