import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import productService from "../../services/productService.js";

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ defaultValues: { name: "", category: "Bio Fertilizers", price: "" } });

  const onSubmit = async (data) => {
    try {
      await productService.adminCreateProduct(data);
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  };

  return (
    <main className="page-container">
      <h1 className="page-title">Create Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input {...register("name", { required: true })} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select {...register("category")} className="input-field">
            <option>Bio Fertilizers</option>
            <option>Bio Pesticides</option>
            <option>Consortia Products</option>
            <option>Liquid Nutrition</option>
            <option>Organic Inputs</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input {...register("price")} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea {...register("description")} className="input-field" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="button-base button-primary">Create</button>
          <button type="button" onClick={() => navigate(-1)} className="button-base">Cancel</button>
        </div>
      </form>
    </main>
  );
}
