import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, ApolloProvider, createHttpLink, split, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {getMainDefinition} from '@apollo/client/utilities';
import { BrowserRouter } from 'react-router-dom';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";



const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

//GraphQLWsLink
/*const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
  }

})*/

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
  }),
);

const splitLink = split( 
  ({query}) => {
    const definition = getMainDefinition(query)
    return(
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

/*const getAuth=() => {
  const token = localStorage.getItem('token')
  return token ? `bearer ${token}` : null
}*/

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: splitLink,

  /*link: new HttpLink({
    headers:{
      authorization: getAuth()
    },
    uri: 'http://localhost:4000/graphql',
  })*/
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
