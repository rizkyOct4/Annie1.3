import TestNotification from "./test";
import GetToken from "@/_lib/middleware/get-token";
// import { auth } from "@/auth";

const Page = async () => {
  const token = await GetToken();
  const { id, name, role } = token || {};
  // const session = await auth();
  // console.log(`page:`, session.user);

  return (
    <div>
      <TestNotification />
      <p>Welcome, {name}</p>
      <p>id, {id}</p>
    </div>
  );
};

export default Page;
