import React from 'react';
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
    "Need Plumber",
    "We Are Always Here For You",
    "Order Soon"
];

const BannerText = () => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const intervalId = setInterval(() =>
            setIndex(index => index + 1),
            3000 // every 3 seconds
        );
        return () => clearTimeout(intervalId);
    }, []);
    return (
            <h4 className="text-white">
                <TextTransition
                    text={TEXTS[index % TEXTS.length]}
                    springConfig={presets.wobbly}
                />
            </h4>
    );
};

export default BannerText;