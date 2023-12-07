import Link from "next/link";

const Header = () => {
  return (
    <header className="px-10 py-5 flex justify-between">
      <Link href="/" className="text-2xl font-bold text-green-600">
        ECG
      </Link>
      <div>
        <Link
          href="/signin"
          className="pr-2 border-r border-solid border-green-800">
          Sign in
        </Link>
        <Link href="/signup" className="pl-2">
          Sign up
        </Link>
      </div>
    </header>
  );
};

export default Header;
