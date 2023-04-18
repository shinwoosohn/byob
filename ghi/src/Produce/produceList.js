import React from "react";
import { useGetAllProduceQuery } from "../store/produceApi";

export default function produceList() {
  const { data: produceData } = useGetProduceQuery();

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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
