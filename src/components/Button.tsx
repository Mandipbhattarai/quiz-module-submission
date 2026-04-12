import Link from "next/link";

interface ButtonType {
  title: string;
  location: string;
}

const Button = ({ title, location }: ButtonType) => {
  return (
    <Link
      className="bg-blue-600 hover:bg-blue-800 text-gray-300 px-4 py-2 rounded"
      href={location}
    >
      {title}
    </Link>
  );
};

export default Button;
