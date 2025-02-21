import Link from 'next/link';
import * as React from 'react';
import { NavContent } from './NavContent';

function Navbar() {
  return (
    <header className="flex h-16 py-2 items-center justify-center font-lato" role="banner">
      <Link href="/" className="mr-auto">
        <h1 className="font-bold text-2xl leading-5 transition-colors">
          Jonah Bedouch<b className="text-primary-600 dark:text-primary-500 font-black">.</b>
        </h1>
      </Link>

      <NavContent />
    </header>
  );
}

export default Navbar;
