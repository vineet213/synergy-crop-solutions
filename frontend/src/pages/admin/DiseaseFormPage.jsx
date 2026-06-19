import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import diseaseService from "../../services/diseaseService.js";
import productService from "../../services/productService.js";

export default function DiseaseFormPage() {
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
      symptoms: "",
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
    diseaseService.adminGetDisease(id)
      .then((data) => {
        if (!mounted) return;
        reset({
          name: data.name || "",
          slug: data.slug || "",
          description: data.description || "",
          symptoms: data.symptoms || "",
          status: data.status || "active",
        });
        setSelectedProducts((data.products || []).map((p) => p._id || p));
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load disease");
        navigate("/admin/diseases");
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
        await diseaseService.adminUpdateDisease(id, payload);
      } else {
        await diseaseService.adminCreateDisease(payload);
      }
      navigate("/admin/diseases");
    } catch (err) {
      console.error(err);
      alert("Failed to save disease");
    }
  };

  if (loading) return <main className="page-container"><p>Loading&hellip;</p></main>;

  return (
    <main className="page-container">
      <h1 className="page-title">{isEdit ? "Edit Disease" : "Create Disease"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Name *</label>
          <input {...register("name", { required: "Disease name is required" })} className="input-field" />
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
          <label className="block text-sm font-medium">Symptoms</label>
          <textarea {...register("symptoms")} className="input-field" rows={3} placeholder="e.g. Yellowing leaves, stunted growth" />
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
          <button type="button" onClick={() => navigate("/admin/diseases")} className="button-base">
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
