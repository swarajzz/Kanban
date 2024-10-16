import prisma from "../_lib/prisma";
import ColumnList from "../_components/ui/Column/ColumnList";
import EmptyPage from "../_components/ui/EmptyPage";

export default async function Board({
  params: { board: boardName },
}: {
  params: { board: string };
}) {
  const allColumns = await prisma.column.findMany({
    where: {
      board: {
        name: {
          contains: boardName.replace(/-/g, " "),
          mode: "insensitive",
        },
      },
    },
    include: {
      tasks: {
        include: {
          subTasks: true,
        },
      },
    },
  });

  console.log(allColumns);

  return (
    <div className="size-full overflow-auto bg-primary-600">
      {allColumns.length > 0 ? (
        <div className="flex gap-10 px-4 py-4">
          <ColumnList allColumns={allColumns} />
        </div>
      ) : (
        <EmptyPage
          title="The board is empty. Create a new column to get started"
          subTitle=""
          btnText="Add New Column"
        />
      )}
    </div>
  );
}
