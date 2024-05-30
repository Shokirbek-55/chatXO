import { FC } from 'react';
//@ts-ignore
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
    progress: number;
}

const CircleProgress: FC<Props> = ({ progress }) => {
    return <div>{<CircularProgressbar value={progress} text={`${progress}%`} />}</div>;
};

export default CircleProgress;
