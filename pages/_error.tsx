// Components
import { NextPageContext } from 'next';
import ErrorLayout from '../layouts/Error';

interface Props {
  statusCode: number;
}

export default function ErrorPage({ 
  statusCode 
}: Props) {
  return (
    <ErrorLayout>
      <p>
        {statusCode
          ? `A ${statusCode} error occurred on the server`
          : 'An error occurred on the client'}
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