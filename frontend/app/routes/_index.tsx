import type { MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Spaces App" },
    { name: "description", content: "Welcome to Spaces app, your space!" },
  ];
};

export default function Index() {
  const data = useLoaderData<{ message: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Welcome to <span className="text-blue-600">Spaces</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Your personal space for organizing thoughts, ideas, and memories.
          Simple, secure, and designed for you.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/spaces"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Spaces</h3>
            <p className="text-gray-600">
              Create unlimited spaces to organize your content exactly how you want.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Share & Collaborate</h3>
            <p className="text-gray-600">
              Share your spaces with others and collaborate in real-time.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your data is encrypted and secure. You control who sees what.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p className="text-blue-100 mb-8">
            Join thousands of users who are already organizing their digital life with Spaces.
          </p>
          <Link
            to="/signup"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors inline-block"
          >
            Create Your Space
          </Link>
        </div>
      </div>
    </div>
  );
}
