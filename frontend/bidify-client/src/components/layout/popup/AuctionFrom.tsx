import { useContext } from "react";
import Button from "../../common/Buttons/Button";
import "./AuctionForm.css";
import { AuctionsContext } from "../../../context/AuctionContext";

const AuctionForm = () => {
  const { form, setForm, createAuction, closeForm, updateAuction } =
    useContext(AuctionsContext);
  const isEdit = !form.isCreate && form.auctionId;
  const lockPrice = Boolean(isEdit && form.hasBids);

  const handleSubmit = async () => {
    const data = {
      title: form.title,
      description: form.description,
      startPrice: Number(form.startPrice),
      imageUrl: form.imageUrl,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    if (isEdit) {
      await updateAuction(form.auctionId!, data);
    } else {
      await createAuction(data);
    }
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
          type="text"
          value={form.startPrice}
          disabled={lockPrice}
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
          <Button onClick={closeForm} text="Cancel" />
        </div>
      </form>
    </section>
  );
};

export default AuctionForm;
