import CreatorsContext from "./context/context";

const Layout = ({
  modal,
  creators,
}: {
  modal: React.ReactNode;
  creators: React.ReactNode;
}) => {
  return (
    <CreatorsContext>
      {modal}
      {creators}
      {/* <section className="w-full h-auto">{children}</section> */}
    </CreatorsContext>
  );
};

export default Layout;
