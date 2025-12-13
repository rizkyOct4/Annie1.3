import CustomizeContext from "./context/context";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <CustomizeContext>{children}</CustomizeContext>;
};

export default layout;
