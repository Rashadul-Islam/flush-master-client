import React from 'react';

const FooterEnd = () => {
    return (
        <div style={{ overflow: 'hidden', backgroundColor: "rgb(106,106,106)" }} className="pt-2 shadow-lg">
            <p className="text-center text-white pt-1">© {new Date().getFullYear()} - Flush-Master. Created by <span className="text-warning">Rashadul Islam</span> All rights reserved.</p>
        </div>
    );
};

export default FooterEnd;