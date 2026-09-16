import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const lives = [
  {
    id: 1,
    title: "Career In Backend Web Development",
    date: "10 Nov 2022",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Career In Frontend Development",
    date: "10 Nov 2022",
    time: "08:30 PM",
  },
];

const LivesPage = async () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-100">Lives</h1>
        <p className="mt-1 text-sm text-purple-100/60">
          Manage your upcoming and past live sessions
        </p>
      </div>

      <div className="rounded-2xl border border-purple-900/40 bg-[#0f0720] p-4 sm:p-6">
        <DataTable columns={columns} data={lives} />
      </div>
    </div>
  );
};

export default LivesPage;