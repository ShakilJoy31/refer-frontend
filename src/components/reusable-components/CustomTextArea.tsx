export const TextareaField: React.FC<{
  label?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
}> = ({ label, placeholder, value, onChange, errorMessage, className, icon, name }) => (
  <div className="flex flex-col w-full mb-4">
    {label && (
      <label className="mb-1 text-sm font-medium text-gray-700 dark:text-white">
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <div className="absolute top-2 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <textarea
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        className={className}
      />
      {errorMessage && (
        <div className="mt-1 text-sm text-red-500">{errorMessage}</div>
      )}
    </div>
  </div>
);


//  className={`w-full bg-white px-4 py-2 border rounded-md text-gray-700 dark:bg-black dark:text-white ${
//         errorMessage ? "border-red-500" : "border-gray-300"
//       } focus:outline-none focus:ring-2 ${
//         errorMessage ? "focus:ring-red-500" : "focus:ring-blue-500"
//       }`}