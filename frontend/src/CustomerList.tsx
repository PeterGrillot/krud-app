import * as React from 'react';
import CustomerForm from './CustomerForm';

type Props = {
  customers: Array<CustomerType>
  updateCustomer: (event: React.FormEvent<HTMLFormElement>, customer: CustomerFormSubmitType) =>  void
  deleteUser: (id: string) => void
}

const CustomerList = ({customers, updateCustomer, deleteUser}: Props) => {
  return (
    <ul className="list">
      {customers.map(customer => (
        <li key={customer.id}>
          <div className="customer">
            <label className="label">First Name:</label>
            <p>{customer.firstName}</p>
          </div>
          <div className="customer"><
            label className="label">Last Name:</label>
            <p>{customer.lastName}</p>
          </div>
          <div className="customer">
            <label className="label">Email:</label>
            <p>{customer.email}</p>
          </div>
          <div className="customer">
            <label className="label">Member Since:</label>
            <p>{new Date(customer.joinDate).toLocaleDateString()}</p>
          </div>
          <CustomerForm
            id={customer.id}
            firstName={customer.firstName}
            lastName={customer.lastName}
            email={customer.email}
            joinDate={customer.joinDate}
            submitForm={updateCustomer}
          />
          <button onClick={() => deleteUser(customer.id)}><i>🗑️</i> Delete User</button>
        </li>
      ))}
      </ul>
  )
}

export default CustomerList