type Header = {
  Authorization?: string;
};

export default function githubTokenHeader(): Header {
  const token: string | null = localStorage.getItem("token");

  if (token !== null) {
    return { Authorization: `token ${token}` };
  }

  return {};
}
