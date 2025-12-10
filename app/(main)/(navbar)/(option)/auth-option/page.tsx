import ModalAuth from "../@intercept/(.)auth-option/modal";

const page = () => {
  const currentPath = "auth-option";

  return <ModalAuth currentPath={currentPath} />;
};

export default page;
