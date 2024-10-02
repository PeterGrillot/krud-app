import React, { FormEvent, useEffect, useState } from 'react';
import './App.css';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';


const HEADERS: Omit<RequestInit, 'method'> = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  }
}

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Array<CustomerType>>([]);

  async function fetchData() {
    const response = await fetch(
      'http://0.0.0.0:8080/customer',
      {
        method: 'GET',
        ...HEADERS,
      }
    );
    console.log(response);
    const body = await response.json();
    setCustomers(body);
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  const submitForm = async (event: FormEvent<HTMLFormElement>, customer: CustomerFormSubmitType): Promise<void> => {
    event.preventDefault();
    const newCustomer = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email
    }
    const response = await fetch(
      'http://0.0.0.0:8080/customer',
      {
        method: 'POST',
        ...HEADERS,
        body: JSON.stringify(newCustomer)
      }
    );
    const body = await response.text();
    setMessage(body);
    fetchData();
  }

  useEffect(() => {
    setTimeout(() => setMessage(null), 3000)
  }, [message]);

  const handleDeleteUser = async (id: string) => {
    const response = await fetch(
      `http://0.0.0.0:8080/customer/${id}`,
      {
        method: 'DELETE',
        ...HEADERS,
      }
    );
    const body = await response.text();
    setMessage(body);
    fetchData();
  }

  const handleUpdateCustomer = async (event: FormEvent<HTMLFormElement>, customer: CustomerFormSubmitType) => {
    event.preventDefault();
    const response = await fetch(
      'http://0.0.0.0:8080/customer',
      {
        method: 'PATCH',
        ...HEADERS,
        body: JSON.stringify(customer)
      }
    );
    const body = await response.text();
    setMessage(body);
    fetchData();
  }

  return (
    <div className="App">
      <h1>Customer List</h1>
      <CustomerList
        customers={customers}
        updateCustomer={handleUpdateCustomer}
        deleteUser={handleDeleteUser}
      />
      <h2>Add Customer Form</h2>
      <CustomerForm
        firstName={""}
        lastName={""}
        email={""}
        submitForm={submitForm}
      />
      {message ? (
        <div className="message">
          <p><i>👋</i>{message}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
