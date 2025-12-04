const layout = ({
  children,
  intercept,
}: {
  children: React.ReactNode;
  intercept: React.ReactNode;
}) => {
  return (
    <>
      {children}
      {intercept}
    </>
  );
};

export default layout;
