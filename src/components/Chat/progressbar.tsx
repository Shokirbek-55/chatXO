import { FC } from 'react';
// @ts-ignore
import ProgressBar from '@ramonak/react-progress-bar';

export type ProgressState = {
    progress: number;
};

interface Props {
    progress: ProgressState;
}
const ProgressBarView: FC<Props> = ({ progress }: any) => {
    return <div style={{ marginBottom: '30px' }}>{progress > 0 && <ProgressBar completed={progress} />}</div>;
};

export default ProgressBarView;
