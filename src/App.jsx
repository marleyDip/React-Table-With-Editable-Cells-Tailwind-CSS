import EditableTable from "./components/EditableTable";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-200 via-teal-200 to-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <EditableTable />

          {/* technical Details */}
          <div className="p-8 bg-gradient-to-t from-gray-900 to-gray-800 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Technical Implements
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-indigo-300">
                  Key Features
                </h4>

                <ul>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>

                    <span>React Hooks for statement management</span>
                  </li>

                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>

                    <span>Tailwind CSS for responsive design</span>
                  </li>

                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>

                    <span>Lucide React Icons</span>
                  </li>

                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>

                    <span>Keyboard navigation support</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-indigo-300">
                  User Experience
                </h4>

                <ul>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>

                    <span>Smooth animation & transitions</span>
                  </li>

                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>

                    <span>Hover effects and micro-interactions</span>
                  </li>

                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>

                    <span>Mobile-first responsive design</span>
                  </li>

                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>

                    <span>Accessibility-focused interactions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* technical Details */}
        </div>
      </div>
    </div>
  );
}

export default App;
