import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

interface Step {
  id: string;
  value: string;
}

interface Steps {
  name: Step;
  gender: Step;
  age: Step;
  amount: Step;
  people: Step;
  roomArea: Step;
  bedType: Step;
}

interface RoomOption {
  room_type_id: number;
  room_type_name: string;
  area_in_square_feet: number;
  max_capacity: number;
}

interface ReviewProps {
  steps?: Steps;
}


function Review(props: ReviewProps) {
  const [state, setState] = useState({
    name: "",
    gender: "",
    age: "",
    amount: "",
    people: "",
    roomArea: "",
    bedType: "",
  });
  const [roomOptions, setRoomOptions] = useState(null);

  useEffect(() => {
    const { steps } = props;
    if (steps) {
      console.log("Entered");
      const { name, gender, age, amount, people, roomArea, bedType } = steps;
      setState({
        name: name.value,
        gender: gender.value,
        age: age.value,
        amount: amount.value,
        people: people.value,
        roomArea: roomArea.value,
        bedType: bedType.value,
      });

      fetch("https://ibe-team-15-api-management.azure-api.net/api/v1/chat/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          gender: gender.value,
          age: parseInt(age.value),
          amount: parseInt(amount.value),
          people: parseInt(people.value),
          roomArea: roomArea.value,
          bedType: bedType.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update state with response data
          console.log(data);
          setRoomOptions(data);
        })
        .catch((error) => console.error("Error fetching room options:", error));
    }
  }, []);

  const { name, gender, age, amount, people, roomArea, bedType } = state;

  return (
    <div style={{ width: "100%" }}>
      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{gender}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{age}</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>{amount}$</td>
          </tr>
          <tr>
            <td>People</td>
            <td>{people}</td>
          </tr>
          <tr>
            <td>Room Area</td>
            <td>{roomArea}</td>
          </tr>
          <tr>
            <td>Bed Type</td>
            <td>{bedType}</td>
          </tr>
        </tbody>
      </table>
    
      <RoomOptions roomOptions={roomOptions || []} people={parseInt(state.people)} />
    </div>
  );
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

interface RoomOptionsProps {
  roomOptions: RoomOption[];
  people:number;
}

export const RoomOptions: React.FC<RoomOptionsProps> = ({ roomOptions,people }) => {
  if (!roomOptions) {
    return <div>No room options available</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <h3>Best Room Options</h3>
      <ul>
        {roomOptions.map((option) => (
          <li key={option.room_type_id}>
            <strong>{option.room_type_name}</strong> - Capacity:{" "}
            {option.max_capacity}, Area: {option.area_in_square_feet} sqft,
            Rooms required:{Math.ceil(people / option.max_capacity)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;
