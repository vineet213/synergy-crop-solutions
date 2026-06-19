import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import cropService from "../../services/cropService.js";
import productService from "../../services/productService.js";

export default function CropFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      imageUrl: "",
      status: "active",
    },
  });

  useEffect(() => {
    productService.adminListProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    let mounted = true;
    setLoading(true);
    cropService.adminGetCrop(id)
      .then((data) => {
        if (!mounted) return;
        reset({
          name: data.name || "",
          slug: data.slug || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          status: data.status || "active",
        });
        setSelectedProducts((data.products || []).map((p) => p._id || p));
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load crop");
        navigate("/admin/crops");
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id, isEdit, reset, navigate]);

  const toggleProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((pid) => pid !== productId)
        : [...prev, productId]
    );
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        products: selectedProducts,
      };
      if (isEdit) {
        await cropService.adminUpdateCrop(id, payload);
      } else {
        await cropService.adminCreateCrop(payload);
      }
      navigate("/admin/crops");
    } catch (err) {
      console.error(err);
      alert("Failed to save crop");
    }
  };

  if (loading) return <main className="page-container"><p>Loading&hellip;</p></main>;

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? "Edit Crop" : "Create Crop"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Name *</label>
          <input {...register("name", { required: "Crop name is required" })} className="input-field" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input {...register("slug")} className="input-field" placeholder="Leave empty to auto-generate" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea {...register("description")} className="input-field" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input {...register("imageUrl")} className="input-field" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium">Related Products</label>
          <div className="card-shell max-h-48 overflow-y-auto space-y-1 p-2">
            {products.length === 0 ? (
              <p className="text-sm text-gray-500">No products available.</p>
            ) : (
              products.map((p) => (
                <label key={p._id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(p._id)}
                    onChange={() => toggleProduct(p._id)}
                  />
                  {p.name}
                </label>
              ))
            )}
          </div>
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
          <button type="button" onClick={() => navigate("/admin/crops")} className="button-base">
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
