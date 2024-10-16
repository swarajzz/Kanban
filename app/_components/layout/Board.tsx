import EmptyPage from "../ui/EmptyPage";

function Board() {
  return (
    <EmptyPage
      title="Welcome to Kanban Task Management"
      subTitle="You can start selecting a created board or if you want you can create a new one"
      btnText="Add new Board"
    />
  );
}

export default Board;
