import ModalListItem from "./components/modal";

const page = async ({ params }: { params: Promise<{ type: string }> }) => {
  const pathUrl = (await params).type;

  return <ModalListItem currentPath={pathUrl} />;
};

export default page;
