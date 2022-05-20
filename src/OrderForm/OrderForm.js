import { Component } from 'react';
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

class OrderForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.currentTarget.elements);
  };

  handleInputValueChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxValueChange = (event) => {
    this.setState({ regulations: event.target.checked });
  };

  render() {
    const { firstName, lastName, address, city, regulations } = this.state;
    const isSubmitButtonEnabled = formValidate(
      firstName,
      lastName,
      address,
      city,
      regulations,
    );

    const firstNameId = nanoid();
    const lastNameId = nanoid();
    const addressId = nanoid();
    const cityId = nanoid();
    const regulationsId = nanoid();

    return (
      <div>
        <StyledForm onSubmit={this.handleSubmit}>
          <label htmlFor={firstNameId}>First name:</label>
          <StyledInput
            id={firstNameId}
            name="firstName"
            placeholder="First name"
            value={this.state.firstName}
            onChange={this.handleInputValueChange}
          />

          <label htmlFor={lastNameId}>Last name:</label>
          <StyledInput
            id={lastNameId}
            name="lastName"
            placeholder="Last name"
            value={this.state.lastName}
            onChange={this.handleInputValueChange}
          />

          <label htmlFor={addressId}>Address:</label>
          <StyledInput
            id={addressId}
            name="address"
            placeholder="Address"
            value={this.state.address}
            onChange={this.handleInputValueChange}
          />

          <label htmlFor={cityId}>City:</label>
          <StyledInput
            id={cityId}
            name="city"
            placeholder="City"
            value={this.state.city}
            onChange={this.handleInputValueChange}
          />

          <Checkbox>
            <label htmlFor={regulationsId}>Accept Regulations:</label>
            <input
              id={regulationsId}
              type="checkbox"
              name="regulations"
              value={this.state.regulations}
              onChange={this.handleCheckboxValueChange}
            />
          </Checkbox>

          <SubmitButton disabled={!isSubmitButtonEnabled}>Submit</SubmitButton>
        </StyledForm>
      </div>
    );
  }
}

export default OrderForm;
