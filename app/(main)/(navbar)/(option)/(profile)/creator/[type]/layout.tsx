import CreatorContext from "./context/context";
import PanelPage  from "./panel";

const layout = ({
  dashboard,
  content,
  list,
}: {
  dashboard: React.ReactNode;
  content: React.ReactNode;
  list: React.ReactNode;
}) => {
  return (
    <CreatorContext>
      <main className="w-full p-4">
        <PanelPage />
        <section>{dashboard}</section>
        <section className="flex w-full h-auto">
          <div className="w-[12%] h-auto">{list}</div>
          <div className="w-[88%]">{content}</div>
        </section>
      </main>
    </CreatorContext>
  );
};

export default layout;
