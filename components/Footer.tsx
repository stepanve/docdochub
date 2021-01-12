import React from "react";
import Link from "next/link";

const Footer = () => (
  <footer className="bg-green-400 mt-3 text-white">
    <nav>
      <ul className="flex items-center justify-between p-3">
        <li>
          <Link href="/">
            <a className="no-underline">運営元</a>
          </Link>
          <Link href="/">
            <a className="no-underline"></a>
          </Link>
        </li>
        <ul className="flex items-center justify-between space-x-4">
          <li>
            <Link href="/about">
              <a>利用規約</a>
            </Link>
          </li>
          <li>
            <Link href="/users">
              <a>プライバシーポリシー</a>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  </footer>
);

export default Footer;
