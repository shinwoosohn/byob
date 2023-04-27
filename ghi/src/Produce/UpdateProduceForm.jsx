import React from "react";
import { useState, useEffect } from "react";
import {
  useUpdateProduceMutation,
  useDeleteProduceMutation,
} from "../store/produceApi";
import { useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const UpdateProduceFrom = () => {
  const { user_id, produce_id } = useParams();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [expDate, setExpDate] = useState("");
  const [price, setPrice] = useState("");

  const [updateProduce, result] = useUpdateProduceMutation({
    user_id,
    produce_id,
  });

  const [isDecorative, setIsDecorative] = React.useState(true);
  const handleChangeDecorative = (event) => {
    setIsDecorative(event.target.checked);
  };

  const [isAvailable, setIsAvailable] = React.useState(true);
  const handleChangeAvailable = (event) => {
    setIsAvailable(event.target.checked);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);
  };

  const handleWeightChange = (event) => {
    const value = event.target.value;
    setWeight(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleImageUrlChange = (event) => {
    const value = event.target.value;
    setImageUrl(value);
  };

  const handleExpDateChange = (event) => {
    const value = event.target.value;
    setExpDate(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleReset = () => {
    setName("");
    setQuantity("");
    setWeight("");
    setDescription("");
    setImageUrl("");
    setExpDate("");
    setIsDecorative(false);
    setIsAvailable(false);
    setPrice("");
  };

  useEffect(() => {
    if (result.isSuccess) {
      handleReset();
    }
  }, [result.isSuccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateProduce({
      user_id,
      produce_id,
      data: {
        name: name,
        quantity: parseInt(quantity),
        weight: parseInt(weight),
        description: description,
        image_url: imageUrl,
        exp_date: expDate,
        is_decorative: isDecorative,
        is_available: isAvailable,
        price: parseFloat(price),
      },
    });
  };

  // async function handleDeleteProduce(produce) {
  //   const
  // }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-9 sm:py-215 lg:max-w-20xl lg:px-8">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Update A Produce
            </h1>
            <form onSubmit={handleSubmit} id="create-produce-form">
              <div>
                <label htmlFor="produce">Name</label>
                <input
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="style">Quantity</label>
                <input
                  value={quantity}
                  onChange={handleQuantityChange}
                  placeholder="Quantity"
                  required
                  type="text"
                  name="quantity"
                  id="quantity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="style">Weight</label>
                <input
                  value={weight}
                  onChange={handleWeightChange}
                  placeholder="Weight"
                  required
                  type="text"
                  name="weight"
                  id="weight"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="style">Description</label>
                <input
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Description"
                  required
                  type="text"
                  name="description"
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="style">Image Url</label>
                <input
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  placeholder="imageUrl"
                  required
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label htmlFor="style">Expiration Date</label>
                <input
                  value={expDate}
                  onChange={handleExpDateChange}
                  placeholder="Expiration Date"
                  required
                  type="date"
                  name="expirationDate"
                  id="expirationDate"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isAvailable}
                        onChange={handleChangeAvailable}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Available"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isDecorative}
                        onChange={handleChangeDecorative}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Decorative"
                  />
                </FormGroup>
              </div>

              <div>
                <label htmlFor="style">Price</label>
                <input
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="price"
                  required
                  type="text"
                  name="price"
                  id="price"
                  pattern="^\d{1,3}(?:,\d{3})*\.\d{2}$"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Update
                </button>
              </div>

              <div>
                {/* <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleDeleteProduce}
                >
                  Delete
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduceFrom;
