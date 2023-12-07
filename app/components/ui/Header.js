import Link from "next/link";

const Header = () => {
  return (
    <header className="px-10 py-5">
      <Link href="/" className="text-2xl font-bold text-green-600">
        ECG
      </Link>
    </header>
  );
};

export default Header;
