// Components
import { NextPageContext } from 'next';
import ErrorLayout from '../layouts/Error';
import Image from '../components/Image';

interface Props {
  statusCode: number;
}

export default function ErrorPage({ 
  statusCode 
}: Props) {
  return (
    <ErrorLayout>
      <p>
        {statusCode != 418
          ? `An error occured with status code ${statusCode}`
          : 'An unknown error occured'}
        {statusCode == 418 && teapot()}
      </p>
    </ErrorLayout>
  );
}

// Get error information
ErrorPage.getInitialProps = ({ 
  res, 
  err 
}: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

// Easter Egg
function teapot(){
  return (
    <>
      <p>
        If you're looking for coffee you're in the wrong place
      </p>
      <div>
        <Image src='/teapot.svg' alt='Teapot outline' />
      </div>
    </>
  );
};