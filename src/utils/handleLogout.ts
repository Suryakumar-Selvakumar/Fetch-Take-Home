import { toast } from "sonner";

const handleLogout = async (
  setIsLoggedIn: (value: boolean) => void
): Promise<void> => {
  try {
    const res = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (res.ok) {
      toast.info("Logout Successful");
      setIsLoggedIn(false);
    }
  } catch (err) {
    console.error(err);
  }
};

export default handleLogout;
