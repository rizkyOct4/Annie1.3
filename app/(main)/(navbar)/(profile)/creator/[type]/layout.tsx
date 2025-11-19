import Dashboard from "./nav-dashboard";
import CreatorContext from "./data/context";

const layout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <CreatorContext>
      <Dashboard />
      {children}
      {modal}
    </CreatorContext>
  );
};

export default layout;
