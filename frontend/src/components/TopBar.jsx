export function TopBar() {
    return (
      <>
        <div className="flex justify-between items-center p-3 bg-emerald-100">
          <div className="flex items-center">
            <div className="w-16 h-16 mr-2">
              <img
                src="http://tinyurl.com/yzxxt5dc"
                alt="Department Logo"
                className="object-contain h-full"
              />
            </div>
            <div className="text-sm font-semibold">
              <p>Department of Social Welfare and Empowerment</p>
              <p>Government of India</p>
            </div>
          </div>
          <div className="w-12 h-12">
            <img
              src="http://tinyurl.com/yeaenu5p"
              alt="Indian Flag"
              className="object-contain h-full"
            />
          </div>
        </div>
        <hr className="border-gray-200" />
      </>
    );
  }
  