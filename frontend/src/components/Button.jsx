export function Button({label, onClick = null, loading}) {
    return <div className="w-4/5 flex justify-center my-3">
        <button
          type="submit"
          disabled={loading}
          className=" w-full py-3 bg-slate-800 rounded-md text-white font-semibold hover:bg-slate-900 focus:outline-none focus:bg-indigo-700 flex items-center justify-center"
          onClick={onClick}>
          {loading ? (
            <>
              <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 border-t-white border-indigo-500 rounded-full mr-2"></div>
              Loading
            </>
          ) : (
            label
          )}
        </button>    </div>
}