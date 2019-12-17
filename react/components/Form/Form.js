import React, { useState } from "react";
import { useApolloClient } from "react-apollo";
import Form from "../../Form";
import createDocument from "../../mutations/createDocument.gql";
import { Input, Button } from "vtex.styleguide";
import styles from './form.css'

const FromContent = () => {

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    document: ""
  });

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setUser(...user, { [name]: value });
  };

  handleSendForm = () => {
    client.mutation({
      variables: {
        acronym: "PV",
        document: {
          fields: [
            {
              key: "lastname",
              value: user.lastname
            },
            {
              key: "phone",
              value: user.phone
            },
            {
              key: "email",
              value: user.email
            },
            {
              key: "document",
              value: user.document
            },
            {
              key: "firstname",
              value: user.firstname
            }
          ]
        }
      }
    });
  };

  console.log(user);

  const { firstname, lastname, phone, email, document } = user;

  const inputFields = ['firstname', 'lastname', 'email', 'phone', 'document']

  return (
    <div id="form" className={styles.form}>
      <div>
        <h3>Formulário de compra</h3>
        <form>
          {
            inputFields.map(field => {
              return (
                <Input
                required
                autoFocus
                label={field}
                id={field}
                name={field}
                value={[field]}
                onChange={handleChange}
                placeholder={field}
              />
              )
            })
          }
          <Button onClick={handleSendForm} >Enviar</Button>
        </form>
      </div>
    </div>
  );
};

export default FromContent;
