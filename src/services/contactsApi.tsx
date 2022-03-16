import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Contact } from '../app/models';

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com'}),
    endpoints: (builder) => ({
        contacts: builder.query<Contact[], void>({
            query: () => "users"
        })
    })
})

export const { useContactsQuery } = contactsApi;
