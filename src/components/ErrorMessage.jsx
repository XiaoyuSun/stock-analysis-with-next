import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2"
      role="alert"
    >
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{message}</span>
    </div>
  );
}
