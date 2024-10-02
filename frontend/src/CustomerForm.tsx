import * as React from 'react';

const NEW_USER_ID = "new-customer-form" ;

type Props = 
  Omit<CustomerType, 'id' | 'joinDate'> &
  {
    id?: string
    joinDate?: string
    submitForm: (
      event: React.FormEvent<HTMLFormElement>,
      customer: CustomerFormSubmitType) => void
  }

const CustomerForm = ({
  id = NEW_USER_ID,
  firstName,
  lastName,
  email,
  joinDate = "",
  submitForm
}: Props) => {
  const [firstNameState, setFirstName] = React.useState<string>(firstName);
  const [lastNameState, setLastName] = React.useState<string>(lastName);
  const [emailState, setEmail] = React.useState<string>(email);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const customer = {
      id,
      firstName: firstNameState,
      lastName: lastNameState,
      email: emailState,
      joinDate
    }
    console.log(customer)
    submitForm(event, customer)
  }
  return (
    <details className="details">
      <summary className="summary">{id === NEW_USER_ID ? "Create" : "Edit"} Customer</summary>
        <form className="form" action="submit" onSubmit={handleSubmit}>
          <input className="input" defaultValue={firstNameState} placeholder="First Name" type="text" onChange={(event) => setFirstName(event.currentTarget.value)}/>
          <input className="input" defaultValue={lastNameState} placeholder="Last Name" type="text" onChange={(event) => setLastName(event.currentTarget.value)}/>
          <input className="input" defaultValue={emailState} placeholder="email" type="email" onChange={(event) => setEmail(event.currentTarget.value)}/>
          <input className="input" disabled={(
              !firstNameState ||
              !lastNameState ||
              !emailState
            )}
            type="submit"
            value={`${id === NEW_USER_ID ? "Create" : "Edit"} Customer`}
          />
        </form>
    </details>
  )
}

export default CustomerForm