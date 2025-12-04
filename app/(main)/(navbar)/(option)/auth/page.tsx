import ModalAuth from "../@intercept/(.)auth/modal";

const page = () => {
  const currentPath = "auth";

  return <ModalAuth currentPath={currentPath} />;
};

export default page;
