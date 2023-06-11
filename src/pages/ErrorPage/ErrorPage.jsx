import { Helmet } from 'react-helmet-async';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  <Helmet>
    <title>Error | Krafti - Summer Camp Learning School</title>
  </Helmet>
  const { error, status } = useRouteError()

  return (
    <section className='flex items-center p-16 bg-blue-600 text-white'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-16'>
        <div className="row w-48">
          <img className="mx-auto rounded-md" src="https://i.ibb.co/nfqdyjR/summer-camp-error.png" alt="error-image" />
        </div>

        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl text-indigo-200'>
            <span className='sr-only'>Error</span> {status || 404}
          </h2>
          <p className='text-2xl font-semibold md:text-3xl mb-8'>
            {error?.message}
          </p>
          <Link
            to='/'
            className='px-8 py-3 font-semibold rounded bg-cyan-200 text-gray-900'
          >
            Back to the Homepage
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage