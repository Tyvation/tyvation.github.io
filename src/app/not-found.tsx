import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='fixed left-1/2 -translate-x-1/2'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}