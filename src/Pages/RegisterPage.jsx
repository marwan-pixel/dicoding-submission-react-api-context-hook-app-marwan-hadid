import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../Components/RegisterInput";
import { register } from "../utils/api";
function RegisterPage() {
  const navigate = useNavigate();
  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <RegisterInput register={onRegisterHandler} />
      <p>
        Kembali ke <Link to="/">Masuk</Link>{" "}
      </p>
    </section>
  );
}

export default RegisterPage;
