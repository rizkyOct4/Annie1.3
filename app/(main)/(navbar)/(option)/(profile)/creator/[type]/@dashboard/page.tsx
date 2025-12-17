import Dashboard from "./components/dashboard";

const page = async ({ params }: { params: Promise<{ type: string }> }) => {
  const currentPath = (await params)?.type;

  return <Dashboard currentPath={currentPath} />;
};

export default page;
