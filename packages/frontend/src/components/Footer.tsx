import React, { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from 'react';

import Member from './Member';

interface Props {
    name: string;
    img: string;
    my: boolean;
    speaking: boolean;
    background: string;
}

export default function Footer(props: PropsWithChildren<{}>) {
    const [offset, setOffset] = useState<number | undefined>(undefined);
    const [height, setHeight] = useState<number>(0);
    const [style, setStyle] = useState<CSSProperties>({});
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (elementRef.current) {
            const boundingRect = elementRef.current.getBoundingClientRect();
            if (!offset) {
                setOffset(boundingRect.y);
            }

            if (height !== boundingRect.height) {
                setHeight(boundingRect.height);
            }
        }
    });

    useEffect(() => {
        if (offset) {
            setStyle({ position: 'fixed', bottom: offset, zIndex: 99 });
        }
    }, [offset]);

    return (
        <>
            <div ref={elementRef} style={style}>
                <div
                    className="w-full border-t-4 border-pink-500 z-layout sm:flex items-center content-center justify-end"
                    style={{ height: 'calc(env(safe-area-inset-bottom, 0px) + 64px)' }}
                >
                    <Member
                        name={"dummy"}
                        img={"dummy"}
                        my={true}
                        speaking={true}
                        background={"dummy"}>
                    </Member>
                </div>
                {props.children}
            </div>
            <div style={{ visibility: 'hidden', height }} />
        </>
    );
}