import { useContext } from "react";
import Button from "../../common/Buttons/Button";
import "./AuctionForm.css";
import { AuctionsContext } from "../../../context/AuctionContext";

const AuctionForm = () => {
  const { form, setForm, createAuction, closeCreate } =
    useContext(AuctionsContext);

  const handleSubmit = async () => {
    await createAuction({
      title: form.title,
      description: form.description,
      startPrice: Number(form.startPrice),
      imageUrl: form.imageUrl,
    });
  };

  return (
    <section className="modal-overlay">
      <form className="modal">
        <h2>Create Auction</h2>
        <label>Title</label>
        <input
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <label>Image URL</label>
        <input
          value={form.imageUrl}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, imageUrl: e.target.value }))
          }
        />
        <label>Start price</label>
        <input
          type="number"
          value={form.startPrice}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, startPrice: e.target.value }))
          }
        />
        <label>Description</label>
        <textarea
          className="description-input"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <div className="modal-buttons">
          <Button onClick={handleSubmit} text="Save" />
          <Button onClick={closeCreate} text="Cancel" />
        </div>
      </form>
    </section>
  );
};

export default AuctionForm;
