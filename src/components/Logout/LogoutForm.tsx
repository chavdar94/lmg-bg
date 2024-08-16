import { signOut } from "@/app/login/actions";

const LogoutForm = () => {
  return (
    <form action={signOut}>
      <button type="submit">
        <span className="w-full text-start uppercase">изход</span>
      </button>
    </form>
  );
};
export default LogoutForm;
