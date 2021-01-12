import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../modules/auth";
import firebase from "firebase/app";

// authサービスをインポート
import { authApp, githubProvider } from "../fbConfig";
import { User } from "@firebase/auth-types";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import GithubLogin from "../components/GithubLogin";

const Login = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const onLogin = React.useCallback(
    function (user: User, token?: string) {
      dispatch(login(user, token));
    },
    [dispatch]
  );

  return (
    <Layout>
      <h1 className="text-5xl text-center text-gray-700 bg-primary dark:text-gray-100">
        DocDocHub, Login
      </h1>
      <div style={{ textAlign: "center" }}>
        <a
          href="#"
          style={{
            textDecoration: "none",
            fontFamily: "helvetica",
            fontWeight: "bold",
            color: "#ddd",
            backgroundColor: "black",
            height: "30px",
            display: "inline-block",
            padding: "1px 12px 0 0",
            borderRadius: "5px",
            marginTop: "30px",
          }}
          onClick={async () => {
            try {
              // TODO method化する
              authApp
                .signInWithPopup(githubProvider)
                .then(function (result) {
                  if (result.credential !== null && result.user !== null) {
                    const token = (result.credential as firebase.auth.OAuthCredential)
                      .accessToken;

                    // TODO ここ治したい
                    if (token) localStorage.setItem("token", token);

                    onLogin(result.user);
                    router.push("/");
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            } catch (error) {
              alert(error.message);
            }
          }}
        >
          <GithubLogin />
        </a>
      </div>
    </Layout>
  );
};

export default Login;
