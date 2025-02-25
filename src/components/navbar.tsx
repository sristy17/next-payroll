export default function Navbar(){
   return (
    <>
    <nav className="w-fit h-20 gap-20 flex ml-[45rem]">
    <div className="flex gap-2 justify-center items-center mt-10">
      <div>
      <input 
           type="text" 
           placeholder="     Search..." 
          className="px-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-transparent absolute left-80 top-12"
        />
         <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-80 top-12 m-1" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1"><circle cx="11" cy="11" r="5.5"/><path stroke-linecap="round" stroke-linejoin="round" d="m15 15l4 4"/></g></svg>
      </div>
        <div className="ml-[16rem]">
        <button
                  type="submit"
                  className="absolute top-12 w-40 py-2 px-4 bg-gradient-to-br from-green-700 to-black text-white font-semibold rounded-md shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >

                  + Add Business
                  
                </button>
        </div>

        <div className="absolute top-12 ml-[43rem]">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18.5q.625 0 1.063-.437T13.5 17h-3q0 .625.438 1.063T12 18.5M7 16h10v-2h-1v-2.6q0-1.525-.788-2.787T13 7V5.5h-2V7q-1.425.35-2.212 1.613T8 11.4V14H7zm3-2v-3q0-.825.588-1.412T12 9t1.413.588T14 11v3zm2 8q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
        </div>
        <div className="absolute top-10 ml-[50rem]">
        <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21"/></g></svg>
        </div>
    </div>

    </nav>

    </>
   ) 
}