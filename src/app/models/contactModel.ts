type contactAddress = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
}

type companyType = {
    name: string,
    catchPhrase: string,
    bs: string
}

export interface Contact {
    id: string | number,
    name: string,
    username: string,
    email: string,
    contact: string,
    address: contactAddress,
    phone: string,
    website: string,
    company: companyType
}