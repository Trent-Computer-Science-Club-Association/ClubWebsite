// Components
import ErrorLayout from '../layouts/Error';

export default function ErrorPage() {
  return (
    <ErrorLayout>
      <p>
        404 - Page not found <br/>
        This page may be in development or may not exist at this time
      </p>
    </ErrorLayout>
  );
}