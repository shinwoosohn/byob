import React from "react";
import { useState, useEffect } from "react";
import { useCreateProduceMutation } from "../store/produceApi";
const CreateProduceForm = () => {
  const [produce, setProduce] = useState("");
  const [amount, setAmount] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [createProduce, result] = useCreateProduceMutation();

  const handleProduceChange = (event) => {
    const value = event.target.value;
    setProduce(value);
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const handleWeightChange = (event) => {
    const value = event.target.value;
    setWeight(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value;
    setExpirationDate(value);
  };

  const handlePictureUrlChange = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProduce({
      produce: produce,
      amount: amount,
      weight: weight,
      description: description,
      expirationDate: expirationDate,
      pictureUrl: pictureUrl,
    });
    event.target.reset();
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Create A Produce
            </h1>
            <form onChange={handleSubmit} id="create-produce-form">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <label htmlFor="produce">Produce</label>
                <input
                  value={produce}
                  onChange={handleProduceChange}
                  placeholder="Produce"
                  required
                  type="text"
                  name="produce"
                  id="produce"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <label htmlFor="style">Amount</label>
                <input
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Picture"
                  required
                  type="text"
                  name="amount"
                  id="amount"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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

              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <label htmlFor="style">Amount</label>
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

              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <label htmlFor="style">Expiration Date</label>
                <input
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  placeholder="Expiration Date"
                  required
                  type="text"
                  name="expirationDate"
                  id="expirationDate"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <label htmlFor="style">Picture Url</label>
                <input
                  value={pictureUrl}
                  onChange={handlePictureUrlChange}
                  placeholder="Picture Url"
                  required
                  type="text"
                  name="pictureUrl"
                  id="pictureUrl"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduceForm;
