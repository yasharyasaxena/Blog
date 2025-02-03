import { useContext } from "react";
import { AuthContext } from "../App";

export default function Host() {
  const {
    auth: { token, name },
    setAuth,
  } = useContext(AuthContext);
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
