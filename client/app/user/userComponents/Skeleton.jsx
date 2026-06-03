export const ExpertDetailsSkeleton = () => {
    return (
        <div className="md:max-w-lg mx-auto bg-white z-50 w-full fixed top-0 left-1/2 -translate-x-1/2 h-full animate-">

            {/* Cover */}
            <div className="relative">
                <div className="h-64 bg-slate-100" />

                <div className="absolute top-5 left-5 size-10 rounded-full">
                    <div className="skeleton w-full h-full rounded-full" />
                </div>
                <div className="flex items-center absolute top-5 right-5 gap-3">
                    <div className="w-20 h-8 rounded-full skeleton" />

                    <div className="size-10 rounded-full skeleton" />
                </div>
            </div>

            {/* Profile Card */}
            <div className="-mt-20 mx-3 bg-white rounded-2xl shadow-md p-4 relative z-50">

                <div className="h-7 w-44 rounded skeleton mb-3" />

                <div className="flex gap-2 mb-3">
                    <div className="h-4 w-14 rounded skeleton" />
                    <div className="h-4 w-20 rounded skeleton" />
                </div>

                <div className="h-4 w-24 rounded skeleton mb-5" />

                <div className="flex items-center gap-4">

                    <div className="h-6 w-16 rounded skeleton" />

                    <div className="h-6 w-16 rounded skeleton" />

                    <div className="h-10 flex-1 rounded-full skeleton" />

                    <div className="h-10 flex-1 rounded-full skeleton" />
                </div>
            </div>

            <div className="p-5 space-y-3">
                <div className="h-6 w-28 mt-5 rounded skeleton" />
                {/* services charge */}
                {[1, 2].map((item) => (
                    <div
                        key={item}
                        className="flex justify-between"
                    >
                        <div className="h-6 w-28 rounded skeleton" />
                        <div className="h-6 w-20 rounded skeleton" />
                    </div>
                ))}

                {/* Service Charges */}
                <div className="rounded-xl p-4 mt-6">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="flex justify-between mb-3"
                        >
                            <div className="h-6 w-full rounded skeleton" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const HomePageSkeleton = () => {
    return (
        <div className="md:max-w-lg mx-auto bg-white z-50 w-full fixed top-0 left-1/2 -translate-x-1/2 h-full p-5">

            {/* Cover */}
            <div className="flex flex-col gap-3">
                {/* navbar */}
                <div className="flex items-center justify-between">
                    <div className="w-30 h-10 skeleton rounded-full bg-slate-100" />
                    <div className="skeleton w-8 h-8 rounded-full" />
                </div>

                {/* welcome  */}
                <div className="flex items-center justify-between">
                    <div className="w-40 h-7 skeleton rounded-full bg-slate-100" />
                    <div className="skeleton w-20 h-8 rounded-md" />
                </div>

                {/* image  */}
                <div className="h-64 skeleton rounded-2xl"></div>

                {/* category */}
                <div className="flex items-center justify-between">
                    <div className="w-40 h-7 skeleton rounded-full bg-slate-100" />
                    <div className="skeleton w-15 h-7 rounded-full" />
                </div>

                <div className="grid grid-cols-4 gap-3">
                    {
                        Array(8).fill(0).map((_, index) => (
                            <div key={index} className="skeleton h-17 rounded-lg"></div>
                        ))
                    }
                </div>

                    {/* popular experts */}
                <div className="flex items-center justify-between">
                    <div className="w-40 h-7 skeleton rounded-full bg-slate-100" />
                    <div className="skeleton w-15 h-7 rounded-full" />
                </div>

                <div className="skeleton h-17 rounded-lg"></div>
                <div className="skeleton h-17 rounded-lg"></div>
            </div>
        </div>
    );
}