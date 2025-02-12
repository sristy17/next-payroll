export default function Dashboard(){
    return(
        <>
        {/* left */}
        <div className="w-[25%] bg-gradient-to-br rounded-3xl m-2 from-green-900 to-black flex items-left justify-start absolute top-0 bottom-0 flex-col">
            <div className="flex flex-row font-bold text-3xl text-white p-4 m-5">
            <div className="w-12 h-12 rounded-3 ">
            <img src="/logo.png" alt="logo" />
            </div>
            <div className="font-sans text-xl text-white absolute top-12 left-28 space-y-3">
            Next Payroll
            </div>
            </div>
            <div className="font-sans text-xl text-white p-3 ml-5 mt-0 space-y-3 ">
                    <ul>Dashboard</ul>
                    <ul>Analytics</ul>
                    <ul>Payment</ul>
                    <ul>Desposit</ul>
                    <ul>Moneybox</ul>
                    <ul>Securities</ul>
            </div>
            <div className="font-sans text-xl text-white p-3 ml-5 mt-0 space-y-3">
                <ul>Help</ul>
                <ul>Settings</ul>
            </div>
            <div className="font-sans text-xl text-white p-3 ml-5 mt-0 space-y-3 absolute -bottom-0">
                Profile
            </div>
        </div>

        {/* right */}

        <div className="">
            <nav>

            </nav>
        </div>
        </>
    )
}