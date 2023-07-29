/*
 *  Copyright (c) 2018-present, Evgeny Nadymov
 *
 * This source code is licensed under the GPL v.3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useEffect } from 'react';
import './Waveform.css';

const defaultData = `GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQRChYECGFOAZwH/////////FUmpZpkq17GDD0JATYCGQ2hyb21lV0GGQ2hyb21lFlSua7+uvdeBAXPFh6IIYlVBzlaDgQKGhkFfT1BVU2Oik09wdXNIZWFkAQEAAIC7AAAAAADhjbWERzuAAJ+BAWJkgSAfQ7Z1Af/////////ngQCjRQqBAACA+4P9H/0+iqQJWV1IUwYQ299s24/d0VB6fCDnOHkuO3HMbK/0P9h+qKP9xuWBh9ZVww3AlceY4r1X3MXQlXx19d1q+5u29RrGiCiEZA2dTz5enVwhC393TikqkGgMDX6ynhrr8SmuKUfeAf2KYsIu3DsOv9LgZKfx7RxfEycZJGFcQhsX/vr6MgtT6wk3K7AOZa3Vz5bwWcoIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASrWuatSkTemxIUFqVxBkYSUpMylwGF62bioks595ALidbFhHjsiLhOF37QYGGC+vdBjjOFGyRM38tbfsYhFEhCAklQGXjNXN5PYokxeNKidNCKcEdNlDQkgUHmwGyL`;

const waveformCache = new Map();

function getNormalizedWaveform(data: string) {
    if (waveformCache.has(data)) {
        return waveformCache.get(data);
    }

    const bytes = Array.from(atob(data)).map(x => x.charCodeAt(0) & 0xFF);
    const waveform: number[] = [];
    const barsCount = Math.floor(bytes.length * 8 / 5);
    for (let i = 0; i < barsCount; i++) {
        const byteIndex = Math.floor(i * 5 / 8);
        const barPadding = i * 5 % 8;

        const bits = bytes[byteIndex] | (((byteIndex + 1 < bytes.length) ? bytes[byteIndex + 1] : 0) << 8)
        waveform.push(((bits >>> barPadding) & 0x1F) / 31.0);
    }

    for (let i = 0; i < (100 - barsCount); i++) {
        waveform.push(0);
    }

    waveformCache.set(data, waveform);

    return waveform;
}

const Waveform = ({ data, dragging, value }: {
    data?: string,
    dragging: boolean,
    value: number,
}) => {
    const [waveformData, setWaveformData] = useState(defaultData);

    useEffect(() => {
        if (!data) {
            setWaveformData(defaultData);
            return;
        }

        fetch(data)
            .then((response) => response.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result?.toString().split(',')[1] || ''
                    console.log(base64data);
                    setWaveformData(base64data);
                };
                reader.readAsDataURL(blob);
            })
            .catch((error) => {
                console.error('Error fetching audio data:', error);
            });
    }, [data]);
    
    const waveform = getNormalizedWaveform(waveformData);

    const transition: any = dragging ? null : 'width 0.25s'
    const waveformMaxHeight = 23;

    const d = waveform
        .filter((x: any, index: number) => index % 2 === 1)
        .map((x: number, index: number) => {
            const height = Math.min(Math.max(2, x * waveformMaxHeight), waveformMaxHeight);
            const y = waveformMaxHeight - Math.floor(height);
            return `M${1 + 4 * index + 1},${y + 1}v${Math.floor(height) - 2}Z`;
        })
        .join('');

    const svg = (
        <svg className='waveform-bars' viewBox='0 0 202 32'>
            <path d={d} />
        </svg>
    );

    return (
        <div className='waveform'>
            <div className='waveform-content'>
                <div className='waveform-background'>{svg}</div>
                <div className='waveform-progress' style={{ transition, width: value * 100 + '%' }}>
                    {svg}
                </div>
            </div>
        </div>
    );
};


export default Waveform;
