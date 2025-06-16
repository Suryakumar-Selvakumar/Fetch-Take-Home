import { toast } from "sonner";

const handleLogout = async (
  setIsLoggedIn: (value: boolean) => void,
  navigate: (value: string) => void
): Promise<void> => {
  try {
    const res: Response = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (res.ok) {
      setTimeout(() => toast.info("Logout Successful"), 1500);
      setIsLoggedIn(false);
      navigate("/");
    }
  } catch (err) {
    console.error(err);
  }
};

export default handleLogout;
