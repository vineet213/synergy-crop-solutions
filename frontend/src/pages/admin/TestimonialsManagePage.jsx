import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useConfirm from "../../hooks/useConfirm.jsx";
import testimonialService from "../../services/testimonialService.js";

export default function TestimonialsManagePage() {
  const { confirm, ConfirmDialog } = useConfirm();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await testimonialService.adminListTestimonials();
      setTestimonials(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    const confirmed = await confirm("Are you sure you want to delete this testimonial? This action cannot be undone.", "Delete testimonial");
    if (!confirmed) return;
    try {
      await testimonialService.adminDeleteTestimonial(id);
      setTestimonials((p) => p.filter((x) => x._id !== id));
      toast.success("Testimonial deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete testimonial");
    }
  };

  return (
    <main className="page-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Testimonials</h1>
        <Link to="/admin/testimonials/new" className="button-base button-primary">Create testimonial</Link>
      </div>

      {loading ? (
        <p>Loading&hellip;</p>
      ) : error ? (
        <div className="empty-state card-shell">
          <h2>Failed to load testimonials</h2>
          <p>{error}</p>
          <button onClick={load} className="button-base button-primary">Retry</button>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="empty-state card-shell">
          <h2>No testimonials yet</h2>
          <p>Create your first testimonial to showcase customer feedback.</p>
          <Link to="/admin/testimonials/new" className="button-base button-primary">Create testimonial</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div key={t._id} className="card-shell flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{t.customerName}</h3>
                <p className="text-sm text-gray-600">
                  {t.location ? `${t.location}  · ` : ""}
                  {t.rating ? `${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}  · ` : ""}
                  <span className={`badge badge-${t.status === "active" ? "brand" : "soft"}`}>{t.status}</span>
                  {t.isFeatured && <span className="badge badge-brand ml-1">Featured</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/admin/testimonials/${t._id}/edit`} className="button-base">Edit</Link>
                <button onClick={() => handleDelete(t._id)} className="button-base button-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {ConfirmDialog}
    </main>
  );
}
