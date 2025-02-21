import HomeSection from '@/components/HomeSection'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <section className="lg:py-sm px-sm py-md mt-3xs-xl col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5" aria-labelledby={"404 Not Found"}>
            <h1 className='text-9xl font-lato font-black'>404</h1>
            <p className='text-lg font-medium'>Looks like you got lost! Let&rsquo;s get you back <Link href={`/`} className="text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200">home</Link>!</p>
        </section>
    )
}

export default NotFound