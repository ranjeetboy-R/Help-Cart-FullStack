import React from 'react'
import PageComponent from './userComponents/pageComponent'

const page = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/get-allProviders`, {
    method: "GET",
    credentials: "include",
    next: {revalidate: 600}
  })

  const data = await res.json();

  return <PageComponent experts={data?.providers} />
}

export default page