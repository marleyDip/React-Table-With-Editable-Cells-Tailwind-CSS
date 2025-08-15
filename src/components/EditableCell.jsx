import { Check, Edit3, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function EditableCell({
  value,
  rowId,
  filled,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  type = "text",
}) {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const inputRef = useRef(null);
  const [editValue, setEditValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const formatValue = (val) => {
    if (type === "number" && typeof val === "number") {
      return filled === "salary"
        ? `${val.toLocaleString("bn-bd")}`
        : val.toString();
    }
    return val.toString();
  };

  const validateInput = (val) => {
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val.toString());
    }
    if (type === "number") {
      return !isNaN(Number(val)) && Number(val) >= 0;
    }
    return val.toString().trim().length > 0;
  };

  const handleSave = () => {
    if (validateInput(editValue)) {
      const finalValue = type === "number" ? Number(editValue) : editValue;
      onSave(rowId, filled, finalValue);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsValid(true);
    onCancel();
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 min-w-0">
        <input
          ref={inputRef}
          type={type}
          value={editValue}
          onChange={(e) => {
            setEditValue(e.target.value);
            setIsValid(true);
          }}
          className={`flex-1 px-3 py-2 border-2 rounded-lg focus:ring-2 focus:outline-none text-sm transition-all duration-300 capitalize`}
          placeholder={`Enter ${filled}`}
        />

        <div className="flex space-x-1">
          <button
            className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transform hover:scale-110 active:scale-95 transition-all duration-200 capitalize"
            title="Save Changes"
            onClick={handleSave}
          >
            <Check size={16} />
          </button>

          <button
            className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transform hover:scale-110 active:scale-95 transition-all duration-200"
            title="No Changes"
            onClick={handleCancel}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative px-3 py-3 cursor-pointer border border-transparent hover:border-indigo-200 rounded-lg  hover:shadow-sm hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
      <div
        className="flex items-center justify-between"
        onMouseDown={() => setShowEditIcon(true)}
        onMouseLeave={() => setShowEditIcon(false)}
      >
        <span
          className="group-hover:text-indigo-700 font-medium transition-colors duration-300"
          onClick={() => onEdit(rowId, filled)}
        >
          {formatValue(value)}
        </span>

        {showEditIcon && <Edit3 size={12} className="text-indigo-400" />}
      </div>
    </div>
  );
}

export default EditableCell;
