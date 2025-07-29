export default function NotFound() {
  return (
    <div className="container text-center">
      <div className="mt-6">
        <h1 className="mb-3">404 - Page Not Found</h1>
        <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="mb-2">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}