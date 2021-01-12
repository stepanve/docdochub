import React from "react";
import Link from "next/link";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { AuthUserInfo, logout } from "../modules/auth";
import { useRouter } from "next/router";

const Header = () => {
  const auth: AuthUserInfo = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const router = useRouter();

  return (
    <header>
      <nav>
        <ul className="flex items-center justify-between p-8">
          <li>
            <Link href="/">
              <a className="text-green-500 no-underline text-accent-1 dark:text-green-300">
                Home
              </a>
            </Link>
          </li>
          <ul className="flex items-center justify-between space-x-4">
            {auth.isLoggedin && (
              <Link href="/my-bookshelfs">
                <a>自分の本棚</a>
              </Link>
            )}
            <li></li>
            {auth.isLoggedin ? (
              <li>
                <a
                  href="#"
                  onClick={async (event) => {
                    try {
                      event.preventDefault();
                      router.push("/");
                      dispatch(logout());
                      localStorage.removeItem("token");
                    } catch (error) {
                      alert(error.message);
                    }
                  }}
                >
                  ログアウト
                </a>
              </li>
            ) : (
              <li>
                <a href="/login">ログイン</a>
              </li>
            )}
          </ul>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
