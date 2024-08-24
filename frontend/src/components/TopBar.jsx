export function TopBar() {
    return (
      <>
        <div className="flex justify-center md:justify-between items-center px-3 py-4 md:py-2">
          <div className="flex items-center">
            <div className="w-16 mr-2">
              <img
                src="goi.jpg"
                alt="Department Logo"
              />
            </div>
            <div className="text-sm md:text-md lg:text-xl font-semibold">
              <p>Department of Social Welfare and Empowerment</p>
              <p>Government of India</p>
            </div>
          </div>
          <div className="w-14 h-14 mt-5 hidden md:block">
            <img
              src="http://tinyurl.com/yeaenu5p"
              alt="Indian Flag"
            />
          </div>
        </div>
        <hr className="border-gray-200" />
      </>
    );
  }
  