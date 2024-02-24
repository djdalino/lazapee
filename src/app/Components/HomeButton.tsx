'use client'

import { BiHome } from 'react-icons/bi'
import { useRouter } from 'next/navigation'

export function HomeButton(props: { name?: string }) {
  const router = useRouter()
  const redirectToPage = () => {
    router.push('/')
  }

  return (
    <button
      className='btn btn-outline btn-info w-full'
      onClick={redirectToPage}
    >
      <BiHome size='2rem' />
      {props.name}
    </button>
  )
}
