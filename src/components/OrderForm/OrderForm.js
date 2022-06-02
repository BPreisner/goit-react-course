import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import {
  StyledForm,
  StyledInput,
  SubmitButton,
  Checkbox,
} from './OrderForm.styles';

const formValidate = (firstName, lastName, address, city, regulations) => {
  if (firstName.length < 3) {
    return false;
  }

  if (lastName.length < 4) {
    return false;
  }

  if (address.length < 5) {
    return false;
  }

  if (city.length < 3) {
    return false;
  }

  if (!regulations) {
    return false;
  }

  return true;
};

const OrderForm = () => {
  const inputRef = useRef(); // { current: }
  const firstNameId = useRef(nanoid());
  const lastNameId = useRef(nanoid());
  const addressId = useRef(nanoid());
  const cityId = useRef(nanoid());
  const regulationsId = useRef(nanoid());

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.currentTarget.elements);
  };

  const handleInputValueChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxValueChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      regulations: event.target.checked,
    }));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { firstName, lastName, address, city, regulations } = formState;

  const isSubmitButtonEnabled = formValidate(
    firstName,
    lastName,
    address,
    city,
    regulations,
  );

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor={firstNameId.current}>First name:</label>
        <StyledInput
          ref={inputRef}
          id={firstNameId.current}
          name="firstName"
          placeholder="First name"
          value={formState.firstName}
          onChange={handleInputValueChange}
        />

        <label htmlFor={lastNameId.current}>Last name:</label>
        <StyledInput
          id={lastNameId.current}
          name="lastName"
          placeholder="Last name"
          value={formState.lastName}
          onChange={handleInputValueChange}
        />

        <label htmlFor={addressId.current}>Address:</label>
        <StyledInput
          id={addressId.current}
          name="address"
          placeholder="Address"
          value={formState.address}
          onChange={handleInputValueChange}
        />

        <label htmlFor={cityId.current}>City:</label>
        <StyledInput
          id={cityId.current}
          name="city"
          placeholder="City"
          value={formState.city}
          onChange={handleInputValueChange}
        />

        <Checkbox>
          <label htmlFor={regulationsId}>Accept Regulations:</label>
          <input
            id={regulationsId}
            type="checkbox"
            name="regulations"
            value={formState.regulations}
            onChange={handleCheckboxValueChange}
          />
        </Checkbox>

        <SubmitButton disabled={!isSubmitButtonEnabled}>Submit</SubmitButton>
      </StyledForm>
    </div>
  );
};

export default OrderForm;
