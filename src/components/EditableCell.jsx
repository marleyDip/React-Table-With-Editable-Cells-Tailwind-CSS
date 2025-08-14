import { Check, Edit3, X } from "lucide-react";

function EditableCell() {
  return (
    // <div className="group relative px-3 py-3 cursor-pointer border border-transparent hover:border-indigo-200 rounded-lg  hover:shadow-sm hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
    //   <div className="flex items-center justify-between">
    //     <span className="group-hover:text-indigo-700 font-medium transition-colors duration-300">
    //       Value
    //     </span>
    //     <Edit3 size={12} className="text-indigo-400" />
    //   </div>
    // </div>

    /* conditional rendering design */
    <div className="flex items-center space-x-2 min-w-0">
      <input
        type="text"
        className={`flex-1 px-3 py-2 border-2 rounded-lg focus:ring-2 focus:outline-none text-sm transition-all duration-300`}
        placeholder={`Enter`}
      />

      <div className="flex space-x-1">
        <button
          className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transform hover:scale-110 active:scale-95 transition-all duration-200"
          title="Save Changes"
        >
          <Check size={16} />
        </button>

        <button
          className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transform hover:scale-110 active:scale-95 transition-all duration-200"
          title="Save Changes"
        >
          <X size={16} />
        </button>
      </div>
    </div>
    /* conditional rendering design */
  );
}

export default EditableCell;
