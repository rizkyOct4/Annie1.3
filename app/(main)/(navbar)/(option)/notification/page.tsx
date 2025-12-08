import TestNotification from "./test";
import GetToken from "@/_lib/middleware/get-token";

const Page = async () => {
  const token = await GetToken();
  const { id, name, role } = token || {};
  
  return (
    <div>
      <TestNotification />
      <p>Welcome, {name}</p>
      <p>Welcome, {id}</p>
    </div>
  );
};

export default Page;
