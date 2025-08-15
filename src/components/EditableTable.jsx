import {
  DollarSign,
  Filter,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

import EditableCell from "./EditableCell";
import { useMemo, useState } from "react";

const INITIAL_DATA = [
  {
    id: "1",
    name: "Alexandra Chen",
    email: "alexandra@company.com",
    role: "Senior Developer",
    department: "Engineering",
    salary: 95000,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@company.com",
    role: "UX Designer",
    department: "Design",
    salary: 78000,
  },
  {
    id: "3",
    name: "Sarah Williams",
    email: "sarah@company.com",
    role: "Product Manager",
    department: "Product",
    salary: 105000,
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "david@company.com",
    role: "Data Analyst",
    department: "Analytics",
    salary: 72000,
  },
  {
    id: "5",
    name: "Emily Thompson",
    email: "emily@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    salary: 88000,
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james@company.com",
    role: "Marketing Lead",
    department: "Marketing",
    salary: 82000,
  },
];

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Product",
  "Analytics",
  "Marketing",
  "Sales",
  "HR",
];

const getDepartmentColor = (department) => {
  const colors = {
    Engineering: "bg-blue-100 text-blue-800",
    Design: "bg-purple-100 text-purple-800",
    Product: "bg-green-100 text-green-800",
    Analytics: "bg-orange-100 text-orange-800",
    Marketing: "bg-pink-100 text-pink-800",
    Sales: "bg-yellow-100 text-yellow-800",
    HR: "bg-indigo-100 text-indigo-800",
  };
  return colors[department] || "bg-gray-100 text-gray-800";
};

function EditableTable() {
  const [data, setData] = useState(INITIAL_DATA);
  //console.log(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [editingCell, setEditingCell] = useState(null);
  const [history, setHistory] = useState(INITIAL_DATA);
  const [historyIndex, setHistoryIndex] = useState(0);

  const filteredData = useMemo(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter((row) => row.department === departmentFilter);
    }
    return filtered;
  }, [data, searchTerm, departmentFilter]);

  const getTotalSalary = () => {
    return filteredData.reduce((sum, row) => sum + row.salary, 0);
  };

  const getAverageSalary = () => {
    return filteredData.length > 0
      ? Math.round(getTotalSalary() / filteredData.length)
      : 0;
  };

  const handleEdit = (rowId, field) => {
    setEditingCell({ rowId, field });
  };

  const handleCancel = () => {
    setEditingCell(null);
  };

  const getFieldType = (field) => {
    if (field === "email") return "email";
    if (field === "salary") return "number";
    return "text";
  };

  const handleSave = (rowId, field, value) => {
    const newData = data.map((row) =>
      row.id === rowId ? { ...row, [field]: value } : row
    );
    setData(newData);
    SaveToHistory(newData);
    setEditingCell(null);
  };

  const SaveToHistory = (newData) => {
    // Keep only the history entries up to the current position (discarding any "redo" items)
    const newHistory = history.slice(0, historyIndex + 1);

    // Add the new data to the end
    newHistory.push(newData);

    // Update the state with the new history array
    setHistory(newHistory);

    // Move the index pointer to the new last element
    setHistoryIndex(newHistory.length - 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-r-gray-100">
      {/* info */}
      <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <User size={28} className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Employee Directory
              </h2>
              <p className="text-indigo-100 text-sm">
                Manage your team with easy
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-white ">
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm group">
              <User
                size={16}
                className="transform group-hover:rotate-[360deg] group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-semibold">{filteredData.length}</span>
              <span className="text-indigo-100">Employees</span>
            </div>

            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm group">
              <DollarSign
                size={16}
                className="transform group-hover:rotate-[360deg] group-hover:scale-110 transition-transform duration-300"
              />

              <span className="font-semibold">
                {getTotalSalary().toLocaleString("en-BD", {
                  style: "currency",
                  currency: "BDT",
                })}
              </span>
              <span className="text-indigo-100">Total</span>
            </div>

            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm group">
              <TrendingUp
                size={16}
                className="transform group-hover:rotate-[360deg] group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-semibold">
                {getAverageSalary().toLocaleString("bn-BD", {
                  style: "currency",
                  currency: "BDT",
                })}
              </span>
              <span className="text-indigo-100">Avg</span>
            </div>
          </div>
        </div>
      </div>
      {/* info */}

      {/* controls */}
      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex flex-wrap items-center gap-3">
            <button className="group flex items-center space-x-2 px-4 py-2.5 text-white font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-xl transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transition-all duration-300 ease-out backdrop-blur-sm">
              <div className="p-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                <Plus
                  size={18}
                  className="transform group-hover:rotate-[360deg] group-hover:scale-105 group-hover:active:scale-95 transition-transform duration-200"
                />
              </div>
              <span>Add Employee</span>
            </button>

            <button className="group flex items-center space-x-2 px-4 py-2.5 text-white font-semibold bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-xl transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transition-all duration-300 ease-out backdrop-blur-sm">
              <div className="p-1 rounded-full bg-gradient-to-r from-green-500 to-sky-600 text-white">
                <RotateCcw
                  size={18}
                  className="transform group-hover:rotate-[360deg] group-hover:scale-105 group-hover:active:scale-95 transition-transform duration-200"
                />
              </div>
              <span>Undo</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                values={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Employees"
                className="w-full sm:w-80 bg-white shadow-md hover:shadow-lg rounded-xl appearance-none pl-12 pr-8 py-3 border border-gray-300  focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-out"
              />
            </div>

            <div className="relative">
              <Filter
                size={18}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />

              <select
                type="text"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                placeholder="Search Departments"
                className="w-full sm:w-80 bg-white shadow-md hover:shadow-lg rounded-xl appearance-none cursor-pointer pl-12 pr-4 py-3 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-out"
              >
                <option value="">All Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* controls */}

      {/* table */}
      <div className="overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
            <tr>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Employee
              </th>

              <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Content
              </th>

              <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Position
              </th>

              <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Department
              </th>

              <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Salary
              </th>

              <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredData.map((row, index) => {
              return (
                <tr
                  className={`hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/100"
                  }`}
                >
                  <td className="px-8 py-4">
                    <EditableCell
                      value={row.name}
                      rowId={row.id}
                      filled="name"
                      isEditing={
                        editingCell?.rowId === row.id &&
                        editingCell?.field === "name"
                      }
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      type={getFieldType("name")}
                      onSave={handleSave}
                    />
                  </td>

                  <td className="px-8 py-4">
                    <EditableCell
                      value={row.email}
                      rowId={row.id}
                      filled="email"
                      isEditing={
                        editingCell?.rowId === row.id &&
                        editingCell?.field === "email"
                      }
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      type={getFieldType("email")}
                      onSave={handleSave}
                    />
                  </td>

                  <td className="px-8 py-4">
                    <EditableCell
                      value={row.role}
                      rowId={row.id}
                      filled="role"
                      isEditing={
                        editingCell?.rowId === row.id &&
                        editingCell?.field === "role"
                      }
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      type={getFieldType("role")}
                      onSave={handleSave}
                    />
                  </td>

                  <td className="px-8 py-4">
                    <div className="flex items-center">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getDepartmentColor(
                          row.department
                        )}`}
                      >
                        {row.department}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-4">
                    <EditableCell
                      value={row.salary}
                      rowId={row.id}
                      filled="salary"
                      isEditing={
                        editingCell?.rowId === row.id &&
                        editingCell?.field === "salary"
                      }
                      onEdit={handleEdit}
                      onCancel={handleCancel}
                      type={getFieldType("salary")}
                      onSave={handleSave}
                    />
                  </td>

                  <td>
                    <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transform hover:scale-110 active:scale-95  transition-all duration-300">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* conditional rendering */}
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Users className="mx-auto mb-4 opacity-0" />
            </div>

            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Employees Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
        {/* conditional rendering */}
      </div>
      {/* table */}

      {/* footer */}
      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center space-y-3 lg:space-y-0">
          <div className="text-sm text-gray-600">
            Showing <span>{filteredData.length} </span> of
            <span> {data.length}</span> Employees
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <DollarSign size={16} className="text-green-600" />
              <span>
                Total Budget:
                <strong className="text-green-600">
                  ৳ {getTotalSalary().toLocaleString("bn-BD")}
                </strong>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <TrendingUp size={16} className="text-green-600" />
              <span>
                Average:
                <strong className="text-green-600">
                  ৳ {getAverageSalary().toLocaleString("bn-BD")}
                </strong>
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-lg font-semibold text-gray-700">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://marleydip.netlify.app/"
            target="_blank"
            className="text-purple-600 hover:text-emerald-600"
          >
            Md Sofian Hasan
          </a>
          . All Right Reserved
        </div>
      </div>
      {/* footer */}
    </div>
  );
}

export default EditableTable;
