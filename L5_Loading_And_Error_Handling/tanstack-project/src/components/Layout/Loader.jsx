import { ColorRing } from "react-loader-spinner";

import React from "react";

const Loader = () => {
    return (
        <div className="flex justify-center aling-center min-h-screen">
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#00BFFF", "#6A5ACD", "#FF8C00", "#FFD700", "#808080"]}
            />
        </div>
    );
};

export default Loader;
