import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Contact } from '../app/models';

const { REACT_APP_BASE_URL } = process.env;

const emptyApi = createApi({
    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_BASE_URL}),
    endpoints: () => ({})
  })


const apiWithTag = emptyApi.enhanceEndpoints({addTagTypes: ['Users']})

export const contactsApi = apiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        contacts: builder.query<Contact[], void>({
            query: () => "users",
            providesTags: ["Users"],
        }),
        contact: builder.query<Contact, any>({
            query: ({ id }) => `users/${id}`
        }),
        addContact: builder.mutation<{}, Contact>({
            query: (contact) => ({
                url: "users",
                method: "POST",
                body: contact
            }),
            invalidatesTags: ['Users'],
        }),
        deleteContact: builder.mutation<{}, any>({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Users'],
        })
    })
})

export const { useContactQuery, useContactsQuery , useAddContactMutation, useDeleteContactMutation} = contactsApi;
