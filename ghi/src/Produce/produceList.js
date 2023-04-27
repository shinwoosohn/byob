import React from "react";
import { Link } from "react-router-dom";
import { useGetAllProduceQuery } from "../store/produceApi";

export default function ProduceList() {
  const { data: produceData, isError, isLoading } = useGetAllProduceQuery()

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <div
        className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p className="font-bold">Something went wrong with loading data...</p>
      </div>
    );
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Weight</th>
            <th>Description</th>
            <th>Image</th>
            <th>Expiration Date</th>
            <th>Decorative</th>
            <th>Available</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {produceData.map((produce) => {
            return (
              <tr key={produce.id}>
                <td>{produce.quantity}</td>
                <td>{produce.weight}</td>
                <td>{produce.description}</td>
                <td>{produce.image_url}</td>
                <td>{produce.exp_date}</td>
                <td>{produce.is_decorative}</td>
                <td>{produce.is_available}</td>
                <td>{produce.price}</td>
                <Link to='user/id/produce/edit'>
                  <button>Edit</button>
                </Link>
                {/* add button to delete */}
                {/* <Link to='/produce/delete'>
                  <button>Edit</button>
                </Link> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
